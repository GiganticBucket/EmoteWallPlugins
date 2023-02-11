registerPlugin({
    name: "Emote Exploder",
    ModifyEmoteDataList: (message, emoteDataListBuilder) => {
        if (!message.isBroadcaster) {
            return;
        }
        const explodeCommandBaseText = "!emoteexplode";
        if (message.isBroadcaster && message.text.toLowerCase().startsWith(explodeCommandBaseText)) {
            let multiplier = 30;
            let command = message.text.split(" ")[0];
            if (command.length > explodeCommandBaseText.length) {
                let suffix = command.substring(explodeCommandBaseText.length);
                let suffixNum = Number(suffix);
                if (suffixNum > 0) {
                    multiplier = suffixNum;
                }
            }
            for (let emote of message.emotes) {
                for (let i = 0; i < multiplier; i++) {
                    emoteDataListBuilder.add(new EmoteData(emote.name, emote.url, EmoteOriginKind.Other));
                }
            }
        }
    },
});
//# sourceMappingURL=EmoteExploder.js.map