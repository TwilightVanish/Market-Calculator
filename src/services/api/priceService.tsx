import {Type} from "@/model/Type";
import {PriceData} from "@/model/PriceData";
import {getRates} from "@/services/api/rateService";

const priceCheckUrl = "https://market.fuzzwork.co.uk/aggregates/?region=10000002&types=";

export async function getPriceForTypes(types: Type[]): Promise<PriceData[]> {
    const ids = types.map(t => t.id).join(',');
    const res = await fetch(priceCheckUrl + ids)
        .then(r => r.json())
        .catch(e => console.error(e))

    const rates = await getRates(types.map(t => t.id))

    return types.map(t => {
        const data = res[t.id];
        const rate = rates.find(r => r.type == t.id)?.percentage;
        return { type: t, buy: +parseFloat(data.buy.percentile).toFixed(2), sell: +parseFloat(data.sell.percentile).toFixed(2), rate: rate ?? 90}
    })
}