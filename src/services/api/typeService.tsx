import typesDataRaw from '@/services/api/data/types.json';
import {Type} from "@/model/Type";

interface TypeData {
    [key: string]: Type;
}

let typeCache: TypeData;

const loadTypes = (): TypeData => {
    if (!typeCache) {
        typeCache = typesDataRaw as unknown as TypeData;
    }

    return typeCache;
}

export function getTypeDataByName(name : string) : Type {
    const types = loadTypes();
    const result = types[name];

    if (!result) return { name: name, id: -1, volume: 0 }

    result.name = name;
    return result;
}