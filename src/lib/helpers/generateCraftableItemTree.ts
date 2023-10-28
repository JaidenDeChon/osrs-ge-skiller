import type { GameItem } from '$lib/models/GameItem';
import type { SvelteFetchFunction } from '../models/SvelteFetchFunction';
import { geDataCombined } from '$lib/services/grand-exchange-service';

export async function generateCreatableItemTree(fetchFunction: SvelteFetchFunction): Promise<GameItem> {
    // const geData = await geDataCombined(fetchFunction);
}
