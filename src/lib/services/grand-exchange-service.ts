/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as Types from '../models/GrandExchangeProtocols';
import type { SvelteFetchFunction } from '../models/SvelteFetchFunction';

const headers = {
    'User-Agent': 'npm runelite | ge-skiller | Helps OSRS players turn their skilling processes into more valueable ' +
        'ventures. | Contact: jdechon1995@gmail.com'
};

const fetchData = async (svelteFetchFunction: SvelteFetchFunction, url: RequestInfo | URL) => {
    const response = await svelteFetchFunction(url, { headers });
    const data = await response.json();
    return data;
}

/**
 * Get the latest high and low prices for the items that we have data for,
 * and the Unix timestamp when that transaction took place
 * @param id - (optional) Item ID. If provided, will only display the latest price for this item.
 * @returns An associative array object.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const latest = async (fetchFunction: SvelteFetchFunction, id?: number): Promise<Types.FullTransactionData> => {
    const url = id
        ? `https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}`
        : `https://prices.runescape.wiki/api/v1/osrs/latest`;

    // return (await axios.get<{ data: any }>(url, { headers })).data.data;
    const response = await fetchData(fetchFunction, url);
    return response.data as Types.FullTransactionData;
};

// Mapping does not need to be updated often, so we can cache it.
const mappingCache: Types.FullMap = {};

/**
 * Gives a list of objects containing the name,
 * id, examine text, members status, lowalch, highalch,
 * GE buy limit, icon file name (on the wiki).
 *
 * The mapping is not updated often, so it is cached.
 * @returns An associative array object.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const mapping = async (fetchFunction: SvelteFetchFunction): Promise<Types.FullMap> => {

    const cached = Object.keys(mappingCache).length > 0;
    const url = "https://prices.runescape.wiki/api/v1/osrs/mapping";

    if (!cached) {
        const response = await fetchData(fetchFunction, url) as Types.MapData[];
        response.forEach((item) => mappingCache[item.id] = item);
    }

    return mappingCache;
};

/**
 * Gets the data from latest() and mapping() and combines them into MapData objects with added highValue and lowValue
 * properties. 
 * @param fetchFunction - The Svelte 
 * @returns 
 */
export const geDataCombined = async (fetchFunction: SvelteFetchFunction): Promise<Types.FullMapDataCombined> => {
    const geData = {} as Types.FullMapDataCombined;
    const latestPrices = await latest(fetchFunction);
    const itemMapping = await mapping(fetchFunction);

    Object.keys(latestPrices).forEach((itemId: string) => {
        const itemData = itemMapping[itemId];
        const highPrice = latestPrices[itemId].high;
        const lowPrice = latestPrices[itemId].low;
        geData[itemId] = { ...itemData, highPrice, lowPrice };
    });

    return geData;
};

/**
 * Gives 5 or 60 minute average of item high and low prices as well as the number traded
 * for the items that we have data on. Comes with a Unix timestamp indicating the block the data is from.
 * @param timestep - (optional) timestep to return prices for.
 * If provided, will display 5-minute averages for all items we have data on for this time.
 * The timestamp field represents the beginning of the 5-minute period being averaged
 * @returns An associative array object.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const prices = async (
    fetchFunction: SvelteFetchFunction,
    options: {
        timestep?: "5m" | "1h";
        timestamp?: number | string;
    }
): Promise<Types.TimeSeriesData> => {
    const { timestamp } = options || {};

    let { timestep } = options || {};
    if (timestep) timestep = timestep.toLowerCase() as "5m" | "1h";

    if (timestep !== "5m" && timestep !== "1h")
        console.error("interval must be '5m' or '1h'. Falling back to 5min, in future, this will be an error.");

    timestep = timestep ?? "5m";

    const url = timestamp
        ? `https://prices.runescape.wiki/api/v1/osrs/${timestep}?timestamp=${timestamp}`
        : `https://prices.runescape.wiki/api/v1/osrs/${timestep}`;

    const response = await fetchData(fetchFunction, url);

    Object.keys(response.data).forEach((key) => {
        (response as any).data[key].timestamp = response.timestamp;
    });

    return response.data;
};

/**
 * Gives a list of the high and low prices of item with the given id at the given interval, up to 300 maximum.
 * @param id - (required) Item id to return a time-series for.
 * @param timestep - (required) Timestep of the time-series. Valid options are "5m", "1h" and "6h".
 * @returns A timeseries array.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const timeseries = async (
    fetchFunction: SvelteFetchFunction,
    options: {
        timestep: "5m" | "1h" | "6h";
        id: number | string;
    }
): Promise<Types.TimeSeriesDataPoint[]> => {
    const { timestep, id } = options || {};

    const url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${timestep}&id=${id}`;

    // const response = (await axios.get<{ data: any }>(url, { headers })).data;
    const response = await fetchData(fetchFunction, url);
    return response.data.data[id] ?? response.data.data;
};
