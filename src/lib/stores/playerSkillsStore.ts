import { LocalStorageStoreNamesEnum } from '$lib/enums/LocalStorageStoreNamesEnum';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import type { Writable } from 'svelte/store';

export type PlayerSkillsStoreType = Record<InGameSkillNamesEnum, number>;

export const playerSkillsStore: Writable<PlayerSkillsStoreType> =
    localStorageStore(LocalStorageStoreNamesEnum.PLAYER_SKILLS_STORE, {
        [InGameSkillNamesEnum.CRAFTING]: 0,
        [InGameSkillNamesEnum.FLETCHING]: 0,
        [InGameSkillNamesEnum.SMITHING]: 0
    });
