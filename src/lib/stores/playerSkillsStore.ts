import { LocalStorageStoreNamesEnum } from '$lib/enums/LocalStorageStoreNamesEnum';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';
import type { Writable } from 'svelte/store';

export const playerSkillsStore: Writable<Record<InGameSkillNamesEnum, number>> =
    localStorageStore(LocalStorageStoreNamesEnum.PLAYER_SKILLS_STORE, {
        [InGameSkillNamesEnum.CRAFTING]: 0,
        [InGameSkillNamesEnum.FLETCHING]: 0,
        [InGameSkillNamesEnum.SMITHING]: 0
    });
