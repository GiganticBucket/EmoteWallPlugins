let shouldFilterPepeEmotesDefault = true;
let shouldFilterPepeEmotes = shouldFilterPepeEmotesDefault;
let shouldFilterPepeEmotesOption: IEditableOption = {
    name: "shouldFilterPepe",
    defaultValueText: shouldFilterPepeEmotesDefault.toString(),
    trySetValue: (text: string): boolean => {
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
    getCurrentValueText: (): string => shouldFilterPepeEmotes.toString()
};

registerPlugin({
    name: "Pepe Filter",
    ModifyEmoteDataList: (message: TwitchMessage, emoteDataListBuilder: EmoteDataList) => {
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