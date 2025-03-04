import {getTypeDataByName} from "@/services/api/typeService";
import {NextApiRequest, NextApiResponse} from "next";
import {getPriceForTypes} from "@/services/api/priceService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;

    if (typeof data !== "object" || data === null || data === undefined) {
        res.status(415).send("Missing json content-type")
    }

    if (!Array.isArray(data) || !data.every(i => typeof i === "string" && i !== "")) {
        res.status(415).send("Must be an array of names")
    }

    const types = data.map((i: string) => getTypeDataByName(i));
    const priceData = await getPriceForTypes(types);

    res.status(200).json(priceData.map(d => { return { id: d.type.id, name: d.type.name, volume: d.type.volume, buy: d.buy, sell: d.sell, rate: d.rate } }));
}