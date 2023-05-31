registerPlugin({
    name: "Trans Comrades",
    ModifyEmoteDataList(message: TwitchMessage, emoteDataListBuilder: EmoteDataList) {
        if (message.text.includes("TRANS COMRADES")) {
            LaunchTransPrideEmotes();
        }

        async function LaunchTransPrideEmotes() {
            let defaultConfigurers = new EmoteConfigurerList(...OverlayEmoteFactory.defaultConfigurers);

            let configurerBottomLeft = new EmoteConfigurerList(...defaultConfigurers.valuesSnapshot);
            configurerBottomLeft.replaceEntryWithNameOrAppend(InitialPositionConfigurer.name,
                    new StartOnSideConfigurer("bottomleft"));

            let configurerBottomRight = new EmoteConfigurerList(...defaultConfigurers.valuesSnapshot);
            configurerBottomRight.replaceEntryWithNameOrAppend(InitialPositionConfigurer.name,
                    new StartOnSideConfigurer("bottomright"));

            let configurers = [configurerBottomLeft, configurerBottomRight];

            let behaviors = new EmoteBehaviorList(...OverlayEmoteFactory.defaultBehaviors);
            behaviors.removeAllWithName("BounceOffWalls");
            behaviors.removeAllWithName("Gravity");
            behaviors.removeAllWithName("VelocityGraph");
            behaviors.replaceEntryWithNameOrAppend("VelocityConstant", new ConstantVelocityBehavior(500));
            behaviors.replaceEntryWithNameOrAppend("Opacity", new OpacityBehavior(
                AnimationGraph.fromArrays([[0, 1], [0.2, 0.7], [3.2, 0.5], [4, 0]])));

            for (let wave = 0; wave < 4; wave++){
                let emotesInWave: OverlayEmote[] = [];
                for (let i = 0; i < 50; i++) {
                    emotesInWave.push(new OverlayEmote(
                        new EmoteData("TransgenderPride", "https://static-cdn.jtvnw.net/emoticons/v2/307827377/default/light/3.0"),
                        new OverlayEmoteState(4),
                        configurers[i % 2],
                        behaviors));
                }

                ActiveEmotesManager.startOverlayEmotes(emotesInWave);
                await sleep(550);
            }

            function sleep(ms: number): Promise<void> {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }
    },
    testButtons: [{
        buttonText: "Test",
        callback() {
            simulateMessage("I LOVE MY TRANS COMRADES", "GiganticBucket", "WhatsUpDot");
        }
    }]
});