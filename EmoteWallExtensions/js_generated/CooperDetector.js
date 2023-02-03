"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmoteWallEntryPoint_1 = require("./externaltypes/EmoteWall/EmoteWallEntryPoint");
let defaultCooperSize = 200;
let cooperSizeConfigurer = new EmoteWallEntryPoint_1.BoundedStartingSizeConfigurer(defaultCooperSize);
let cooperSizeOption = cooperSizeConfigurer.sizeOption;
cooperSizeOption.name = "cooperSize";
cooperSizeOption.defaultValueText = defaultCooperSize.toString();
let cooperEmoteName = "cooperPlugin.cooper";
(0, EmoteWallEntryPoint_1.registerPlugin)({
    name: "Cooper Detector",
    ModifyEmoteDataList: (message, emoteDataListBuilder) => {
        if (message.text.toLowerCase().split(' ').includes("cooper")) {
            emoteDataListBuilder.add(new EmoteWallEntryPoint_1.EmoteData(cooperEmoteName, "https://giganticbucket.github.io/EmoteWallExtensions/assets/CooperCute.jpg"));
        }
    },
    ModifyUninitializedOverlayEmotes: (message, overlayEmotes) => {
        var cooperEmotes = overlayEmotes.filter(emote => emote.name == cooperEmoteName);
        if (cooperEmotes.length > 0) {
            let cooperConfigurers = new EmoteWallEntryPoint_1.EmoteConfigurerList(...EmoteWallEntryPoint_1.OverlayEmoteFactory.defaultConfigurers);
            cooperConfigurers.removeAllWithName(EmoteWallEntryPoint_1.BoundedStartingSizeConfigurer.name);
            cooperConfigurers.add(cooperSizeConfigurer);
            cooperConfigurers.add(new EmoteWallEntryPoint_1.RandomStartPositionConfigurer());
            cooperEmotes.forEach(cooperEmote => {
                cooperEmote.configurers = cooperConfigurers;
            });
        }
    },
    options: [
        cooperSizeOption
    ]
});
//# sourceMappingURL=CooperDetector.js.map