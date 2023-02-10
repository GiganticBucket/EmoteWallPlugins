registerPlugin({
    name: "Wide Emotes",
    ModifyUninitializedOverlayEmotes(message: TwitchMessage, overlayEmotes: readonly OverlayEmote[]) {
        let lowercaseWords = message.text.toLowerCase().split(' ');
        if (lowercaseWords.includes("wide") || lowercaseWords.includes("w!")) {
            for (let overlayEmote of overlayEmotes) {
                overlayEmote.configurers.replaceEntryWithNameOrAppend(
                    BoundedStartingSizeConfigurer.name,
                    new ExplicitStartingDimensionsConfigurer(50, 260));
            }
        }
    }
});