let defaultCooperSize = 200;
let cooperSizeConfigurer = new BoundedStartingSizeConfigurer(defaultCooperSize);
let cooperSizeOption = cooperSizeConfigurer.sizeOption;
cooperSizeOption.name = "cooperSize";
cooperSizeOption.defaultValueText = defaultCooperSize.toString();
registerPlugin({
  name: "Cooper Detector",
  ModifyEmoteDataList: (message, emoteDataListBuilder) => {
    if (message.text.toLowerCase().split(' ').includes("cooper")) {
      emoteDataListBuilder.add(new EmoteData("cooper", "https://giganticbucket.github.io/EmoteWallExtensions/assets/CooperCute.jpg", EmoteOriginKind.Other));
    }
  },
  ModifyUninitializedOverlayEmotes: (message, overlayEmotes) => {
    var cooperEmotes = overlayEmotes.filter(emote => emote.name == "cooper");

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
  options: [cooperSizeOption]
});
