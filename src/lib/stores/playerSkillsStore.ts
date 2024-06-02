import { persisted } from 'svelte-persisted-store';
import { LocalStorageStoreNamesEnum } from '$lib/enums/LocalStorageStoreNamesEnum';
import { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';

export type PlayerSkillsStoreType = Record<InGameSkillNamesEnum, number>;

export const playerSkillsStore = persisted(LocalStorageStoreNamesEnum.PLAYER_SKILLS_STORE, {
    [InGameSkillNamesEnum.CRAFTING]: 1,
    [InGameSkillNamesEnum.FLETCHING]: 1,
    [InGameSkillNamesEnum.SMITHING]: 1
});
