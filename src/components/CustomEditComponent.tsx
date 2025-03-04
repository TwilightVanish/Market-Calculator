import React from "react";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import {setRate} from "@/services/rateService";

export default function CustomEditComponent(props: GridRenderEditCellParams) {
    async function update(target: string) {
        const {id} = props;
        if (!target) return;

        const res = await setRate(id.toString(), target);
        if (!res) return;
    }

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") await update(e.currentTarget.value);
    }

    const handleExit = async (e: React.FocusEvent<HTMLInputElement>) => {
        await update(e.currentTarget.value);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, field} = props;
        const target = e.currentTarget.value;

        if (!target) return;

        const newValue = parseInt(target);
        if (newValue >= 0 && newValue <= 200) {
            props.api.setEditCellValue({id, field, value: newValue});
        }
    }

    return (
        <input
            type="number"
            value={props.value}
            onKeyDown={handleKeyPress}
            onBlur={handleExit}
            onChange={handleChange}
            min={0}
            max={200}
            step={1}
            style={{
                width: "100%",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#2a2a2a",
                color: "#EAE2F8",
            }}
        />
    );
}