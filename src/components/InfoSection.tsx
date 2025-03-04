import styles from "@/app/page.module.css";
import {formatNumber} from "@/utils/formatNumber";
import React from "react";

interface InfoSectionProps {
    volume: number,
    sell: number,
    buy: number,
    buyback: number,
}

function formatOrZero(value: number): string {
    const format = formatNumber(value, 2)
    return format == "" ? "0" : format;
}

export default function InfoSection({ volume, sell, buy, buyback }: InfoSectionProps) {
    return (
        <div>
            <p className={styles["info-text"]}>
                <strong>Volume:</strong> {formatOrZero(volume)} m3
            </p>
            <p className={styles["info-text"]}>
                <strong>Jita Sell:</strong> {formatOrZero(sell)} ISK
            </p>
            <p className={styles["info-text"]}>
                <strong>Jita Buy:</strong> {formatOrZero(buy)} ISK
            </p>
            <p className={styles["buyback-text"]}>
                <strong>Buyback Price:</strong> {formatOrZero(buyback)} ISK
            </p>
            <p className={styles["remote-buyback-text"]}>
                <strong>Remote Buyback Price:</strong> {formatOrZero(buyback * 0.95)} ISK
            </p>
        </div>
    )
}