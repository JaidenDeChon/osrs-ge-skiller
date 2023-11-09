const headers = {
  "User-Agent": "npm runelite | ge-skiller | Helps OSRS players turn their skilling processes into more valueable ventures. | Contact: jdechon1995@gmail.com"
};
const fetchData = async (url) => {
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};
const latest = async (id) => {
  const url = id ? `https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}` : `https://prices.runescape.wiki/api/v1/osrs/latest`;
  const response = await fetchData(url);
  return response.data;
};
const mappingCache = {};
const mapping = async () => {
  const cached = Object.keys(mappingCache).length > 0;
  const url = "https://prices.runescape.wiki/api/v1/osrs/mapping";
  if (!cached) {
    const response = await fetchData(url);
    response.forEach((item) => mappingCache[item.id] = item);
  }
  return mappingCache;
};
const geDataCombined = async () => {
  const geData = {};
  const latestPrices = await latest();
  const itemMapping = await mapping();
  Object.keys(latestPrices).forEach((itemId) => {
    const itemData = itemMapping[itemId];
    const highPrice = latestPrices[itemId].high;
    const highTime = latestPrices[itemId].highTime;
    const lowPrice = latestPrices[itemId].low;
    const lowTime = latestPrices[itemId].lowTime;
    geData[itemId] = { ...itemData, highPrice, highTime, lowPrice, lowTime };
  });
  return geData;
};
function addMarketInfoToGameItem(gameItem, geData) {
  const gameItemCopy = { ...gameItem };
  const itemGeData = geData[gameItemCopy.id];
  gameItemCopy.examineText = itemGeData.examine;
  gameItemCopy.highAlch = itemGeData.highalch;
  gameItemCopy.lowAlch = itemGeData.lowalch;
  gameItemCopy.highPrice = itemGeData.highPrice;
  gameItemCopy.highTime = itemGeData.highTime;
  gameItemCopy.lowPrice = itemGeData.lowPrice;
  gameItemCopy.lowTime = itemGeData.lowTime;
  if (gameItemCopy.creationSpecs && gameItemCopy.creationSpecs.ingredients.length > 0) {
    for (const ingredient of gameItemCopy.creationSpecs.ingredients) {
      ingredient.item = addMarketInfoToGameItem(ingredient.item, geData);
    }
  }
  return gameItemCopy;
}
function addMarketInfoToGameItems(gameItems, geData) {
  const items = [];
  for (const gameItem of gameItems)
    items.push(addMarketInfoToGameItem(gameItem, geData));
  return items;
}
var InGameSkillNamesEnum = /* @__PURE__ */ ((InGameSkillNamesEnum2) => {
  InGameSkillNamesEnum2["CRAFTING"] = "crafting";
  InGameSkillNamesEnum2["SMITHING"] = "smithing";
  InGameSkillNamesEnum2["FLETCHING"] = "fletching";
  return InGameSkillNamesEnum2;
})(InGameSkillNamesEnum || {});
var GameItemIdsEnum = /* @__PURE__ */ ((GameItemIdsEnum2) => {
  GameItemIdsEnum2["BLACK_DRAGON_LEATHER"] = "2509";
  GameItemIdsEnum2["BLACK_DRAGONHIDE_BODY"] = "2503";
  GameItemIdsEnum2["BLACK_DRAGONHIDE_CHAPS"] = "2497";
  GameItemIdsEnum2["BLACK_DRAGONHIDE_VAMBRACES"] = "2487";
  GameItemIdsEnum2["BLUE_DRAGON_LEATHER"] = "2505";
  GameItemIdsEnum2["BLUE_DRAGONHIDE_BODY"] = "2499";
  GameItemIdsEnum2["BLUE_DRAGONHIDE_CHAPS"] = "2493";
  GameItemIdsEnum2["BLUE_DRAGONHIDE_VAMBRACES"] = "2491";
  GameItemIdsEnum2["GREEN_DRAGON_LEATHER"] = "1745";
  GameItemIdsEnum2["GREEN_DRAGONHIDE_BODY"] = "1135";
  GameItemIdsEnum2["GREEN_DRAGONHIDE_CHAPS"] = "1099";
  GameItemIdsEnum2["GREEN_DRAGONHIDE_VAMBRACES"] = "1065";
  GameItemIdsEnum2["HAMMER"] = "2347";
  GameItemIdsEnum2["HARD_LEATHER"] = "1743";
  GameItemIdsEnum2["HARD_LEATHER_BODY"] = "1131";
  GameItemIdsEnum2["IRON_NAILS"] = "4820";
  GameItemIdsEnum2["KNIFE"] = "946";
  GameItemIdsEnum2["LEATHER"] = "1741";
  GameItemIdsEnum2["LEATHER_GLOVES"] = "1059";
  GameItemIdsEnum2["LEATHER_BOOTS"] = "1061";
  GameItemIdsEnum2["LEATHER_COWL"] = "1167";
  GameItemIdsEnum2["LEATHER_VAMBRACES"] = "1063";
  GameItemIdsEnum2["LEATHER_BODY"] = "1129";
  GameItemIdsEnum2["LEATHER_CHAPS"] = "1095";
  GameItemIdsEnum2["NEEDLE"] = "1733";
  GameItemIdsEnum2["RED_DRAGON_LEATHER"] = "2507";
  GameItemIdsEnum2["RED_DRAGONHIDE_BODY"] = "2501";
  GameItemIdsEnum2["RED_DRAGONHIDE_CHAPS"] = "2495";
  GameItemIdsEnum2["RED_DRAGONHIDE_VAMBRACES"] = "2489";
  GameItemIdsEnum2["SNAKESKIN"] = "6289";
  GameItemIdsEnum2["SNAKESKIN_BOOTS"] = "6328";
  GameItemIdsEnum2["SNAKESKIN_VAMBRACES"] = "6330";
  GameItemIdsEnum2["SNAKESKIN_BANDANA"] = "6326";
  GameItemIdsEnum2["SNAKESKIN_CHAPS"] = "6324";
  GameItemIdsEnum2["SNAKESKIN_BODY"] = "6322";
  GameItemIdsEnum2["SNAKESKIN_SHIELD"] = "22272";
  GameItemIdsEnum2["THREAD"] = "1734";
  GameItemIdsEnum2["WILLOW_LOGS"] = "1519";
  GameItemIdsEnum2["WILLOW_SHIELD"] = "22254";
  return GameItemIdsEnum2;
})(GameItemIdsEnum || {});
var GameItemNamesEnum = /* @__PURE__ */ ((GameItemNamesEnum2) => {
  GameItemNamesEnum2["BLACK_DRAGON_LEATHER"] = "Black dragon leather";
  GameItemNamesEnum2["BLACK_DRAGONHIDE_BODY"] = "Black d'hide body";
  GameItemNamesEnum2["BLACK_DRAGONHIDE_CHAPS"] = "Black d'hide chaps";
  GameItemNamesEnum2["BLACK_DRAGONHIDE_VAMBRACES"] = "Black d'hide vambraces";
  GameItemNamesEnum2["BLUE_DRAGON_LEATHER"] = "Blue dragon leather";
  GameItemNamesEnum2["BLUE_DRAGONHIDE_BODY"] = "Blue d'hide body";
  GameItemNamesEnum2["BLUE_DRAGONHIDE_CHAPS"] = "Blue d'hide chaps";
  GameItemNamesEnum2["BLUE_DRAGONHIDE_VAMBRACES"] = "Blue d'hide vambraces";
  GameItemNamesEnum2["GREEN_DRAGON_LEATHER"] = "Green dragon leather";
  GameItemNamesEnum2["GREEN_DRAGONHIDE_BODY"] = "Green d'hide body";
  GameItemNamesEnum2["GREEN_DRAGONHIDE_CHAPS"] = "Green d'hide chaps";
  GameItemNamesEnum2["GREEN_DRAGONHIDE_VAMBRACES"] = "Green d'hide vambraces";
  GameItemNamesEnum2["HAMMER"] = "Hammer";
  GameItemNamesEnum2["HARD_LEATHER"] = "Hard leather";
  GameItemNamesEnum2["HARD_LEATHER_BODY"] = "Hard leather body";
  GameItemNamesEnum2["IRON_NAILS"] = "Iron nails";
  GameItemNamesEnum2["KNIFE"] = "Knife";
  GameItemNamesEnum2["LEATHER"] = "Leather";
  GameItemNamesEnum2["LEATHER_GLOVES"] = "Leather gloves";
  GameItemNamesEnum2["LEATHER_BOOTS"] = "Leather boots";
  GameItemNamesEnum2["LEATHER_COWL"] = "Leather cowl";
  GameItemNamesEnum2["LEATHER_VAMBRACES"] = "Leather vambraces";
  GameItemNamesEnum2["LEATHER_BODY"] = "Leather body";
  GameItemNamesEnum2["LEATHER_CHAPS"] = "Leather chaps";
  GameItemNamesEnum2["NEEDLE"] = "Needle";
  GameItemNamesEnum2["RED_DRAGON_LEATHER"] = "Red dragon leather";
  GameItemNamesEnum2["RED_DRAGONHIDE_BODY"] = "Red d'hide body";
  GameItemNamesEnum2["RED_DRAGONHIDE_CHAPS"] = "Red d'hide chaps";
  GameItemNamesEnum2["RED_DRAGONHIDE_VAMBRACES"] = "Red d'hide vambraces";
  GameItemNamesEnum2["SNAKESKIN"] = "Snakeskin";
  GameItemNamesEnum2["SNAKESKIN_BOOTS"] = "Snakeskin boots";
  GameItemNamesEnum2["SNAKESKIN_VAMBRACES"] = "Snakeskin vambraces";
  GameItemNamesEnum2["SNAKESKIN_BANDANA"] = "Snakeskin bandana";
  GameItemNamesEnum2["SNAKESKIN_CHAPS"] = "Snakeskin d'hide chaps";
  GameItemNamesEnum2["SNAKESKIN_BODY"] = "Snakeskin body";
  GameItemNamesEnum2["SNAKESKIN_SHIELD"] = "Snakeskin shield";
  GameItemNamesEnum2["THREAD"] = "Thread";
  GameItemNamesEnum2["WILLOW_LOGS"] = "Willow logs";
  GameItemNamesEnum2["WILLOW_SHIELD"] = "Willow shield";
  return GameItemNamesEnum2;
})(GameItemNamesEnum || {});
var GameItemImageFilenamesEnum = /* @__PURE__ */ ((GameItemImageFilenamesEnum2) => {
  GameItemImageFilenamesEnum2["SNAKESKIN"] = "snakeskin.png";
  GameItemImageFilenamesEnum2["SNAKESKIN_BOOTS"] = "snakeskin-boots.png";
  GameItemImageFilenamesEnum2["SNAKESKIN_VAMBRACES"] = "snakeskin-vambraces.png";
  GameItemImageFilenamesEnum2["SNAKESKIN_BANDANA"] = "snakeskin-bandana.png";
  GameItemImageFilenamesEnum2["SNAKESKIN_CHAPS"] = "snakeskin-chaps.png";
  GameItemImageFilenamesEnum2["SNAKESKIN_BODY"] = "snakeskin-body.png";
  GameItemImageFilenamesEnum2["SNAKESKIN_SHIELD"] = "snakeskin-shield.png";
  GameItemImageFilenamesEnum2["BLACK_DRAGON_LEATHER"] = "black-dragon-leather.png";
  GameItemImageFilenamesEnum2["BLACK_DRAGONHIDE_BODY"] = "black-dragonhide-body.png";
  GameItemImageFilenamesEnum2["BLACK_DRAGONHIDE_CHAPS"] = "black-dragonhide-chaps.png";
  GameItemImageFilenamesEnum2["BLACK_DRAGONHIDE_VAMBRACES"] = "black-dragonhide-vambraces.png";
  GameItemImageFilenamesEnum2["BLUE_DRAGON_LEATHER"] = "blue-dragon-leather.png";
  GameItemImageFilenamesEnum2["BLUE_DRAGONHIDE_BODY"] = "blue-dragonhide-body.png";
  GameItemImageFilenamesEnum2["BLUE_DRAGONHIDE_CHAPS"] = "blue-dragonhide-chaps.png";
  GameItemImageFilenamesEnum2["BLUE_DRAGONHIDE_VAMBRACES"] = "blue-dragonhide-vambraces.png";
  GameItemImageFilenamesEnum2["GREEN_DRAGON_LEATHER"] = "green-dragon-leather.png";
  GameItemImageFilenamesEnum2["GREEN_DRAGONHIDE_BODY"] = "green-dragonhide-body.png";
  GameItemImageFilenamesEnum2["GREEN_DRAGONHIDE_CHAPS"] = "green-dragonhide-chaps.png";
  GameItemImageFilenamesEnum2["GREEN_DRAGONHIDE_VAMBRACES"] = "green-dragonhide-vambraces.png";
  GameItemImageFilenamesEnum2["HAMMER"] = "hammer.png";
  GameItemImageFilenamesEnum2["HARD_LEATHER"] = "hard-leather.png";
  GameItemImageFilenamesEnum2["HARD_LEATHER_BODY"] = "hard-leather-body.png";
  GameItemImageFilenamesEnum2["IRON_NAILS"] = "iron-nails.png";
  GameItemImageFilenamesEnum2["KNIFE"] = "knife.png";
  GameItemImageFilenamesEnum2["LEATHER"] = "leather.png";
  GameItemImageFilenamesEnum2["LEATHER_GLOVES"] = "leather-gloves.png";
  GameItemImageFilenamesEnum2["LEATHER_BOOTS"] = "leather-boots.png";
  GameItemImageFilenamesEnum2["LEATHER_COWL"] = "leather-cowl.png";
  GameItemImageFilenamesEnum2["LEATHER_VAMBRACES"] = "leather-vambraces.png";
  GameItemImageFilenamesEnum2["LEATHER_BODY"] = "leather-body.png";
  GameItemImageFilenamesEnum2["LEATHER_CHAPS"] = "leather-chaps.png";
  GameItemImageFilenamesEnum2["NEEDLE"] = "needle.png";
  GameItemImageFilenamesEnum2["RED_DRAGON_LEATHER"] = "red-dragon-leather.png";
  GameItemImageFilenamesEnum2["RED_DRAGONHIDE_BODY"] = "red-dragonhide-body.png";
  GameItemImageFilenamesEnum2["RED_DRAGONHIDE_CHAPS"] = "red-dragonhide-chaps.png";
  GameItemImageFilenamesEnum2["RED_DRAGONHIDE_VAMBRACES"] = "red-dragonhide-vambraces.png";
  GameItemImageFilenamesEnum2["THREAD"] = "thread.png";
  GameItemImageFilenamesEnum2["WILLOW_LOGS"] = "willow-logs.png";
  GameItemImageFilenamesEnum2["WILLOW_SHIELD"] = "willow-shield.png";
  return GameItemImageFilenamesEnum2;
})(GameItemImageFilenamesEnum || {});
function assembleGameItem(gameItemEnumsKey) {
  const id = GameItemIdsEnum[gameItemEnumsKey];
  const name = GameItemNamesEnum[gameItemEnumsKey];
  const image = GameItemImageFilenamesEnum[gameItemEnumsKey];
  return { id, name, image };
}
var GameItemEnumKeysEnum = /* @__PURE__ */ ((GameItemEnumKeysEnum2) => {
  GameItemEnumKeysEnum2["BLACK_DRAGON_LEATHER"] = "BLACK_DRAGON_LEATHER";
  GameItemEnumKeysEnum2["BLACK_DRAGONHIDE_BODY"] = "BLACK_DRAGONHIDE_BODY";
  GameItemEnumKeysEnum2["BLACK_DRAGONHIDE_CHAPS"] = "BLACK_DRAGONHIDE_CHAPS";
  GameItemEnumKeysEnum2["BLACK_DRAGONHIDE_VAMBRACES"] = "BLACK_DRAGONHIDE_VAMBRACES";
  GameItemEnumKeysEnum2["BLUE_DRAGON_LEATHER"] = "BLUE_DRAGON_LEATHER";
  GameItemEnumKeysEnum2["BLUE_DRAGONHIDE_BODY"] = "BLUE_DRAGONHIDE_BODY";
  GameItemEnumKeysEnum2["BLUE_DRAGONHIDE_CHAPS"] = "BLUE_DRAGONHIDE_CHAPS";
  GameItemEnumKeysEnum2["BLUE_DRAGONHIDE_VAMBRACES"] = "BLUE_DRAGONHIDE_VAMBRACES";
  GameItemEnumKeysEnum2["GREEN_DRAGON_LEATHER"] = "GREEN_DRAGON_LEATHER";
  GameItemEnumKeysEnum2["GREEN_DRAGONHIDE_BODY"] = "GREEN_DRAGONHIDE_BODY";
  GameItemEnumKeysEnum2["GREEN_DRAGONHIDE_CHAPS"] = "GREEN_DRAGONHIDE_CHAPS";
  GameItemEnumKeysEnum2["GREEN_DRAGONHIDE_VAMBRACES"] = "GREEN_DRAGONHIDE_VAMBRACES";
  GameItemEnumKeysEnum2["HARD_LEATHER"] = "HARD_LEATHER";
  GameItemEnumKeysEnum2["HARD_LEATHER_BODY"] = "HARD_LEATHER_BODY";
  GameItemEnumKeysEnum2["IRON_NAILS"] = "IRON_NAILS";
  GameItemEnumKeysEnum2["KNIFE"] = "KNIFE";
  GameItemEnumKeysEnum2["LEATHER"] = "LEATHER";
  GameItemEnumKeysEnum2["LEATHER_BODY"] = "LEATHER_BODY";
  GameItemEnumKeysEnum2["LEATHER_BOOTS"] = "LEATHER_BOOTS";
  GameItemEnumKeysEnum2["LEATHER_CHAPS"] = "LEATHER_CHAPS";
  GameItemEnumKeysEnum2["LEATHER_COWL"] = "LEATHER_COWL";
  GameItemEnumKeysEnum2["LEATHER_GLOVES"] = "LEATHER_GLOVES";
  GameItemEnumKeysEnum2["LEATHER_VAMBRACES"] = "LEATHER_VAMBRACES";
  GameItemEnumKeysEnum2["NEEDLE"] = "NEEDLE";
  GameItemEnumKeysEnum2["RED_DRAGON_LEATHER"] = "RED_DRAGON_LEATHER";
  GameItemEnumKeysEnum2["RED_DRAGONHIDE_BODY"] = "RED_DRAGONHIDE_BODY";
  GameItemEnumKeysEnum2["RED_DRAGONHIDE_CHAPS"] = "RED_DRAGONHIDE_CHAPS";
  GameItemEnumKeysEnum2["RED_DRAGONHIDE_VAMBRACES"] = "RED_DRAGONHIDE_VAMBRACES";
  GameItemEnumKeysEnum2["SNAKESKIN"] = "SNAKESKIN";
  GameItemEnumKeysEnum2["SNAKESKIN_BANDANA"] = "SNAKESKIN_BANDANA";
  GameItemEnumKeysEnum2["SNAKESKIN_BODY"] = "SNAKESKIN_BODY";
  GameItemEnumKeysEnum2["SNAKESKIN_BOOTS"] = "SNAKESKIN_BOOTS";
  GameItemEnumKeysEnum2["SNAKESKIN_CHAPS"] = "SNAKESKIN_CHAPS";
  GameItemEnumKeysEnum2["SNAKESKIN_SHIELD"] = "SNAKESKIN_SHIELD";
  GameItemEnumKeysEnum2["SNAKESKIN_VAMBRACES"] = "SNAKESKIN_VAMBRACES";
  GameItemEnumKeysEnum2["THREAD"] = "THREAD";
  GameItemEnumKeysEnum2["WILLOW_LOGS"] = "WILLOW_LOGS";
  GameItemEnumKeysEnum2["WILLOW_SHIELD"] = "WILLOW_SHIELD";
  return GameItemEnumKeysEnum2;
})(GameItemEnumKeysEnum || {});
function leather() {
  return assembleGameItem(GameItemEnumKeysEnum.LEATHER);
}
function thread() {
  return assembleGameItem(GameItemEnumKeysEnum.THREAD);
}
function needle() {
  return assembleGameItem(GameItemEnumKeysEnum.NEEDLE);
}
function leatherGloves() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_GLOVES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 13.8 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 1 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function leatherBoots() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_BOOTS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 16.3 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 7 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function leatherCowl() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_COWL);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 18.5 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 9 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function leatherVambraces() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_VAMBRACES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 22 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 11 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function leatherBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 25 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 14 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function leatherChaps() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.LEATHER_CHAPS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 27 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 18 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function hardLeatherBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.HARD_LEATHER_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 35 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 28 }],
    ingredients: [
      {
        item: leather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
const leatherItemTrees = [
  leatherGloves(),
  leatherBoots(),
  leatherCowl(),
  leatherVambraces(),
  leatherBody(),
  leatherChaps(),
  hardLeatherBody()
];
function snakeskin() {
  return assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN);
}
function snakeskinBoots() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_BOOTS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 30 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 45 }],
    ingredients: [
      {
        item: snakeskin(),
        amount: 6,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function snakeskinVambraces() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_VAMBRACES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 35 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 47 }],
    ingredients: [
      {
        item: snakeskin(),
        amount: 8,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function snakeskinBandana() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_BANDANA);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 45 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 48 }],
    ingredients: [
      {
        item: snakeskin(),
        amount: 5,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function snakeskinChaps() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_CHAPS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 50 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 51 }],
    ingredients: [
      {
        item: snakeskin(),
        amount: 12,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function snakeskinBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 55 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 53 }],
    ingredients: [
      {
        item: snakeskin(),
        amount: 15,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function ironNails() {
  return assembleGameItem(GameItemEnumKeysEnum.IRON_NAILS);
}
function willowLogs() {
  return assembleGameItem(GameItemEnumKeysEnum.WILLOW_LOGS);
}
function knife() {
  return assembleGameItem(GameItemEnumKeysEnum.KNIFE);
}
function willowShield() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.WILLOW_SHIELD);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.FLETCHING, experienceAmount: 83 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.FLETCHING, skillLevel: 42 }],
    ingredients: [
      {
        item: willowLogs(),
        amount: 8,
        consumedDuringCreation: true
      },
      {
        item: knife(),
        amount: 1,
        consumedDuringCreation: true
      }
    ]
  };
  return gameItem;
}
function snakeskinShield() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.SNAKESKIN_SHIELD);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 100 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 56 }],
    ingredients: [
      {
        item: snakeskin(),
        amount: 2,
        consumedDuringCreation: true
      },
      {
        item: ironNails(),
        amount: 15,
        consumedDuringCreation: true
      },
      {
        item: willowShield(),
        amount: 1,
        consumedDuringCreation: true
      }
    ]
  };
  return gameItem;
}
const snakeskinItemTrees = [
  snakeskinBoots(),
  snakeskinVambraces(),
  snakeskinBandana(),
  snakeskinChaps(),
  snakeskinBody(),
  snakeskinShield()
];
function blueDragonLeather() {
  return assembleGameItem(GameItemEnumKeysEnum.BLUE_DRAGON_LEATHER);
}
function blueDragonhideVambraces() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLUE_DRAGONHIDE_VAMBRACES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 70 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 66 }],
    ingredients: [
      {
        item: blueDragonLeather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function blueDragonhideChaps() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLUE_DRAGONHIDE_CHAPS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 140 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 68 }],
    ingredients: [
      {
        item: blueDragonLeather(),
        amount: 2,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function blueDragonhideBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLUE_DRAGONHIDE_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 210 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 71 }],
    ingredients: [
      {
        item: blueDragonLeather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
const blueDragonhideItemTrees = [
  blueDragonhideVambraces(),
  blueDragonhideChaps(),
  blueDragonhideBody()
];
function greenDragonLeather() {
  return assembleGameItem(GameItemEnumKeysEnum.GREEN_DRAGON_LEATHER);
}
function greenDragonhideVambraces() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.GREEN_DRAGONHIDE_VAMBRACES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 62 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 57 }],
    ingredients: [
      {
        item: greenDragonLeather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function greenDragonhideChaps() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.GREEN_DRAGONHIDE_CHAPS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 124 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 60 }],
    ingredients: [
      {
        item: greenDragonLeather(),
        amount: 2,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function greenDragonhideBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.GREEN_DRAGONHIDE_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 186 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 63 }],
    ingredients: [
      {
        item: greenDragonLeather(),
        amount: 3,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
const greenDragonhideItemTrees = [
  greenDragonhideVambraces(),
  greenDragonhideChaps(),
  greenDragonhideBody()
];
function blackDragonLeather() {
  return assembleGameItem(GameItemEnumKeysEnum.BLACK_DRAGON_LEATHER);
}
function blackDragonhideVambraces() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLACK_DRAGONHIDE_VAMBRACES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 86 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 79 }],
    ingredients: [
      {
        item: blackDragonLeather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function blackDragonhideChaps() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLACK_DRAGONHIDE_CHAPS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 172 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 82 }],
    ingredients: [
      {
        item: blackDragonLeather(),
        amount: 2,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function blackDragonhideBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.BLACK_DRAGONHIDE_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 258 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 84 }],
    ingredients: [
      {
        item: blackDragonLeather(),
        amount: 2,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
const blackDragonhideItemTrees = [
  blackDragonhideVambraces(),
  blackDragonhideChaps(),
  blackDragonhideBody()
];
function redDragonLeather() {
  return assembleGameItem(GameItemEnumKeysEnum.RED_DRAGON_LEATHER);
}
function redDragonhideVambraces() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.RED_DRAGONHIDE_VAMBRACES);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 78 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 73 }],
    ingredients: [
      {
        item: redDragonLeather(),
        amount: 1,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function redDragonhideChaps() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.RED_DRAGONHIDE_CHAPS);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 156 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 75 }],
    ingredients: [
      {
        item: redDragonLeather(),
        amount: 2,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
function redDragonhideBody() {
  const gameItem = assembleGameItem(GameItemEnumKeysEnum.RED_DRAGONHIDE_BODY);
  gameItem.creationSpecs = {
    experienceGranted: [{ skillName: InGameSkillNamesEnum.CRAFTING, experienceAmount: 234 }],
    requiredSkills: [{ skillName: InGameSkillNamesEnum.CRAFTING, skillLevel: 77 }],
    ingredients: [
      {
        item: redDragonLeather(),
        amount: 3,
        consumedDuringCreation: true
      },
      {
        item: thread(),
        amount: 0.2,
        consumedDuringCreation: true
      },
      {
        item: needle(),
        amount: 1,
        consumedDuringCreation: false
      }
    ]
  };
  return gameItem;
}
const redDragonhideItemTrees = [
  redDragonhideVambraces(),
  redDragonhideChaps(),
  redDragonhideBody()
];
async function populateGameItems(items, itemsBySkill2, resetLists = false) {
  const geData = await geDataCombined();
  if (resetLists) {
    items.length = 0;
    itemsBySkill2.length = 0;
  }
  function completeGameItemsAndAddToLists(skillName, gameItemsToComplete, categoryName) {
    let itemsBySkillObject = itemsBySkill2.find((obj) => obj.skillName === skillName);
    if (!itemsBySkillObject) {
      const itemsBySkillNewLength = itemsBySkill2.push({ skillName, categories: [] });
      itemsBySkillObject = itemsBySkill2[itemsBySkillNewLength - 1];
    }
    const completedItems = addMarketInfoToGameItems(gameItemsToComplete, geData);
    items.push(...completedItems);
    itemsBySkillObject.categories.push({ categoryName, items: completedItems });
  }
  completeGameItemsAndAddToLists(
    InGameSkillNamesEnum.CRAFTING,
    leatherItemTrees,
    "Leather armor"
  );
  completeGameItemsAndAddToLists(
    InGameSkillNamesEnum.CRAFTING,
    snakeskinItemTrees,
    "Snakeskin armor"
  );
  completeGameItemsAndAddToLists(
    InGameSkillNamesEnum.CRAFTING,
    blueDragonhideItemTrees,
    "Blue d'hide armor"
  );
  completeGameItemsAndAddToLists(
    InGameSkillNamesEnum.CRAFTING,
    greenDragonhideItemTrees,
    "Green d'hide armor"
  );
  completeGameItemsAndAddToLists(
    InGameSkillNamesEnum.CRAFTING,
    redDragonhideItemTrees,
    "Red d'hide armor"
  );
  completeGameItemsAndAddToLists(
    InGameSkillNamesEnum.CRAFTING,
    blackDragonhideItemTrees,
    "Black d'hide armor"
  );
}
let allGameItems = [];
let itemsBySkill = [];
async function populateGameItemCaches() {
  allGameItems.length = 0;
  itemsBySkill.length = 0;
  await populateGameItems(allGameItems, itemsBySkill, true);
}
async function checkEmpty() {
  if (!allGameItems.length || !itemsBySkill.length)
    await populateGameItemCaches();
}
async function getItemById(itemId) {
  await checkEmpty();
  const foundItem = allGameItems.find((item) => item.id === itemId);
  return foundItem ?? null;
}
async function getItemsBySkill(skillName) {
  await checkEmpty();
  if (skillName)
    return itemsBySkill.find((skill) => skill.skillName === skillName) ?? null;
  else
    return itemsBySkill;
}
export {
  getItemsBySkill as a,
  getItemById as g,
  populateGameItemCaches as p
};
