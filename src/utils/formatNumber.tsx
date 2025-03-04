export function formatNumber(value: number | null | undefined, places: number): string {
    return value ? (+value.toFixed(places)).toLocaleString("en-US") : "";
}