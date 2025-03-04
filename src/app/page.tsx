"use client";

import styles from './page.module.css';
import React, {useEffect, useRef, useState} from "react";
import {getDataForNames} from "@/services/dataService";
import {useSession} from "next-auth/react";
import {isAdmin} from "@/services/adminService";
import LoginButton from "@/components/LoginButton";
import DataTable from "@/components/DataTable";
import {RowData} from "@/model/RowData";
import InfoSection from "@/components/InfoSection";

export default function Home() {
    const [rows, setRows] = useState<RowData[]>([]);
    const [admin, setAdmin] = useState(false);

    const session = useSession().data

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const statsRef = useRef({volume: 0, sell: 0, buy: 0, buyback: 0});

    useEffect(() => {
        (async () => setAdmin(await isAdmin()))();
    }, []);

    async function appraise() {
        if (!textAreaRef.current) return;
        const lines = textAreaRef.current.value
            .split('\n')
            .map(line => {
                const [part1 = '', part2 = ''] = line.trim().split('\t');
                const quantity1 = /^\d+$/.test(part1) ? parseInt(part1) : null;
                const quantity2 = /^\d+$/.test(part2) ? parseInt(part2) : null;

                if (quantity1 && part2) return { name: part2.trim(), quantity: quantity1 };
                if (quantity2 && part1) return { name: part1.trim(), quantity: quantity2 };

                return null;
            })
            .filter(x => x && x.quantity > 0) as { name: string; quantity: number }[]

        const nameToQuantity = new Map(lines.map(({name, quantity}) => [name, quantity]));
        const priceData = await getDataForNames([...nameToQuantity.keys()]);

        const merged = priceData.map(d => ({
            ...d,
            quantity: nameToQuantity.get(d.name) || 0
        }));

        statsRef.current = {
            volume: merged.reduce((sum, i) => sum + i.quantity * i.volume, 0),
            sell: merged.reduce((sum, i) => sum + i.quantity * i.sell, 0),
            buy: merged.reduce((sum, i) => sum + i.quantity * i.buy, 0),
            buyback: merged.reduce((sum, i) => sum + i.quantity * i.buy * i.rate / 100, 0)
        };

        setRows(merged.map((row, i) => ({
            ...row,
            id: row.id == -1 ? -1 * (i + 1) : row.id,
            price: row.buy * row.quantity * row.rate / 100
        })));
    }

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.title}>Buyback Calculator</h1>
            </header>
            <main className="layout">
                <section className="left-panel">
                    <h2 className={styles.textTitle}>Appraisal</h2>
                    <textarea className="textarea" placeholder="Enter appraisal items..." ref={textAreaRef}></textarea>
                    <section className={styles["info-section"]}>
                        <section className={styles["info-text-left"]}>
                            <InfoSection {...statsRef.current} />
                        </section>
                        <section className={styles["appraise-button-right"]}>
                            <button className={styles["appraise-button"]} onClick={appraise}>Appraise!</button>
                        </section>
                    </section>
                </section>

                {/* Right Panel */}
                <section className={styles["right-panel"]}>
                    <DataTable rows={rows} admin={admin}/>
                </section>
                <LoginButton session={session} admin={admin}></LoginButton>
            </main>
        </>
    );
}