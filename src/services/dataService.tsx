import {RowData} from "@/model/RowData";

const apiUrl = "/api/data";

export async function getDataForNames(names: string[]): Promise<RowData[]> {
    return await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(names),
    }).then(res => res.json())
        .catch(err => console.log(err));
}