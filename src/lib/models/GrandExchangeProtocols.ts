/**
 * Latest high and low prices for the items that we have data for, and the Unix timestamp when that transaction took place.
 * @property high - The high price.
 * @property highTime - The Unix timestamp when that transaction took place.
 * @property low - The low price.
 * @property lowTime - The Unix timestamp when that transaction took place.
 */
export type TransactionData = {
    high: number;
    highTime: number;
    low: number;
    lowTime: number;
};

export type FullTransactionData = {
    [key: string]: TransactionData;
};

/**
 * An item's descrption.
 * @property examine - The examine text.
 * @property id - The id.
 * @property members - States if it's members-only.
 * @property lowalch - The low alch value.
 * @property limit - The Grand Exchange limit.
 * @property value - The value.
 * @property highalch - The high alch price.
 * @property icon - The icon location.
 * @property name - The name.
 */
export type MapData = {
    examine: string;
    id: number;
    members: boolean;
    lowalch?: number;
    limit?: number;
    value: number;
    highalch?: number;
    icon: string;
    name: string;
};

/**
 * A list of objects containing the name, id, examine text, members status, lowalch, highalch, GE buy limit, icon file name (on the wiki).
 */
export type FullMap = {
    [key: string]: MapData;
};

/** A combined type of MapData and low alch/high alch values. */
export type MapDataCombined = MapData & { highPrice: number, lowPrice: number };

/** An object with a string for a key and the above type for a value. */
export type FullMapDataCombined = {
    [key: string]: MapData & { highPrice: number, lowPrice: number }
}

/**
 * A list of the high and low prices of an item.
 * @property avgHighPrice - The average high price.
 * @property highPriceVolume - The high price volume.
 * @property avgLowPrice - The average low price.
 * @property lowPriceVolume - The low price volume.
 * @property timestamp - The timestamp of the data.
 */
export interface TimeSeriesDataPoint {
    avgHighPrice: number | null;
    highPriceVolume: number;
    avgLowPrice: number | null;
    lowPriceVolume: number;
    timestamp: number;
}

/**
 * An assorted list of the high and low prices of an item.
 */
export interface TimeSeriesData {
    [key: string]: TimeSeriesDataPoint;
}
