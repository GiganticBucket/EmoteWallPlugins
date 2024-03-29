let defaultCooperSize = 200;
let cooperSizeConfigurer = new BoundedStartingSizeConfigurer(defaultCooperSize);
let cooperSizeOption = cooperSizeConfigurer.sizeOption;
cooperSizeOption.name = "cooperSize";
cooperSizeOption.defaultValueText = defaultCooperSize.toString();
let cooperEmoteName = "cooperPlugin.cooper";

registerPlugin({
    name: "CooperDetector",
    ModifyEmoteDataList: (message: TwitchMessage, emoteDataListBuilder: EmoteDataList): void => {
        if (message.text.toLowerCase().split(' ').includes("cooper")) {
            emoteDataListBuilder.add(new EmoteData(cooperEmoteName, "https://giganticbucket.github.io/EmoteWallPlugins/EmoteWallExtensions/assets/CooperCute.jpg"));
        }
    },
    ModifyUninitializedOverlayEmotes: (message: TwitchMessage, overlayEmotes: ReadonlyArray<OverlayEmote>) => {
        var cooperEmotes = overlayEmotes.filter(emote => emote.name == cooperEmoteName);
        if (cooperEmotes.length > 0) {
            let cooperConfigurers = cooperEmotes[0].configurers;
            cooperConfigurers.removeAllWithName(BoundedStartingSizeConfigurer.name); // ?
            cooperConfigurers.add(cooperSizeConfigurer); // ?

            cooperEmotes.forEach(cooperEmote => {
                cooperEmote.configurers = cooperConfigurers;
            });
        }
    },
    options: [
        cooperSizeOption
    ]
});