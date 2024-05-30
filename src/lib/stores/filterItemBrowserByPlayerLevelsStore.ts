import { persisted } from 'svelte-persisted-store';
import { LocalStorageStoreNamesEnum } from '$lib/enums/LocalStorageStoreNamesEnum';
import type { InGameSkillNamesEnum } from '$lib/enums/InGameSkillNamesEnum';

export const filterItemsStore = persisted(LocalStorageStoreNamesEnum.FILTER_ITEMS_BY_PLAYER_SKILLS_STORE, {
    filterItemsByPlayerLevels: false,
    filterItemsBySkills: [] as InGameSkillNamesEnum[]
});
