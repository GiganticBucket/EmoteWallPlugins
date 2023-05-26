let defaultCooperSize = 200;
let cooperSizeConfigurer = new BoundedStartingSizeConfigurer(defaultCooperSize);
let cooperSizeOption = cooperSizeConfigurer.sizeOption;
cooperSizeOption.name = "cooperSize";
cooperSizeOption.defaultValueText = defaultCooperSize.toString();
let cooperEmoteName = "cooperPlugin.cooper";

registerPlugin({
    name: "Cooper Detector",
    ModifyEmoteDataList: (message: TwitchMessage, emoteDataListBuilder: EmoteDataList): void => {
        if (message.text.toLowerCase().split(' ').includes("cooper")) {
            emoteDataListBuilder.add(new EmoteData(cooperEmoteName, "https://giganticbucket.github.io/EmoteWallPlugins/EmoteWallExtensions/assets/CooperCute.jpg"));
        }
    },
    ModifyUninitializedOverlayEmotes: (message: TwitchMessage, overlayEmotes: ReadonlyArray<OverlayEmote>) => {
        var cooperEmotes = overlayEmotes.filter(emote => emote.name == cooperEmoteName);
        if (cooperEmotes.length > 0) {
            let cooperConfigurers = new EmoteConfigurerList(...OverlayEmoteFactory.defaultConfigurers);
            cooperConfigurers.removeAllWithName(BoundedStartingSizeConfigurer.name);
            cooperConfigurers.add(cooperSizeConfigurer);
            cooperConfigurers.add(new RandomStartPositionConfigurer());

            cooperEmotes.forEach(cooperEmote => {
                cooperEmote.configurers = cooperConfigurers;
            });
        }
    },
    options: [
        cooperSizeOption
    ]
});