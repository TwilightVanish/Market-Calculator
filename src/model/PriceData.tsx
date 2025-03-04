import {Type} from "@/model/Type";

export interface PriceData {
    type: Type;
    buy: number;
    sell: number;
    rate: number;
}