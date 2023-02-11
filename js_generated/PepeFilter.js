let shouldFilterPepeEmotesDefault = true;
let shouldFilterPepeEmotes = shouldFilterPepeEmotesDefault;
let shouldFilterPepeEmotesOption = {
    name: "shouldFilterPepe",
    defaultValueText: shouldFilterPepeEmotesDefault.toString(),
    trySetValue: (text) => {
        if (text.toLowerCase() === "true") {
            shouldFilterPepeEmotes = true;
            return true;
        }
        else if (text.toLowerCase() === "false") {
            shouldFilterPepeEmotes = false;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => shouldFilterPepeEmotes.toString()
};
registerPlugin({
    name: "Pepe Filter",
    ModifyEmoteDataList: (message, emoteDataListBuilder) => {
        if (!shouldFilterPepeEmotes) {
            return;
        }
        for (let emoteDataInOriginalList of emoteDataListBuilder.valuesSnapshot) {
            if (knownGlobalPepeEmotes.includes(emoteDataInOriginalList.name)) {
                emoteDataListBuilder.remove(emoteDataInOriginalList);
            }
        }
    },
    options: [shouldFilterPepeEmotesOption]
});
let knownGlobalPepeEmotes = [
    "RarePepe",
    "FeelsBirthdayMan",
    "FeelsBadMan",
    "FeelsGoodMan",
    "bUrself",
    "monkaS",
    "feelsAmazingMan"
];
//# sourceMappingURL=PepeFilter.js.map