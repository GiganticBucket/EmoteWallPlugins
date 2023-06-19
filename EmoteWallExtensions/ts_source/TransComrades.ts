const transPrideOpacityBehavior = new OpacityBehavior(AnimationGraph.fromArrays([[0, 1], [0.2, 0.7], [3.2, 0.5], [4, 0]]));
const transPrideConstVelocityBehavior = new ConstantVelocityBehavior(500);
const transPrideBehaviorList = new EmoteBehaviorList(transPrideOpacityBehavior, transPrideConstVelocityBehavior);

let numPrideWavesOption = new BoundedIntegerOption("numWaves", 3, 1, 50);
let numPerCornerPerWave = new BoundedIntegerOption("numPerCornerPerWave", 10, 2, 20);
let millisecondsBetweenWaves = new BoundedIntegerOption("millisecondsBetweenWaves", 500, 50, 1000);

registerPlugin({
    name: "TransComrades",
    editableBehaviors: [transPrideOpacityBehavior, transPrideConstVelocityBehavior],
    options: [numPrideWavesOption, numPerCornerPerWave, millisecondsBetweenWaves],
    ModifyEmoteDataList(message: TwitchMessage, emoteDataListBuilder: EmoteDataList) {
        if (message.text.includes("TRANS COMRADES")) {
            LaunchTransPrideEmotes();
        }

        async function LaunchTransPrideEmotes() {
            let sharedConfigurers = [
                new BoundedStartingSizeConfigurer(80),
                new DurationConfigurer(5)];

            let numPerCornerLaunch = numPerCornerPerWave.currentValue;
            let numPerWave = numPerCornerPerWave.currentValue * 2;

            let bottomLeftConfigurerList = new EmoteConfigurerList(new StartOnSideConfigurer("bottomleft"), ...sharedConfigurers);
            let bottomRightConfigurerList = new EmoteConfigurerList(new StartOnSideConfigurer("bottomright"), ...sharedConfigurers);

            let alternatingConfigurerLists = [bottomLeftConfigurerList, bottomRightConfigurerList];

            for (let wave = 0; wave < numPrideWavesOption.currentValue; wave++) {
                let emotesInWave: OverlayEmote[] = [];
                for (let i = 0; i < numPerWave; i++) {
                    let overlayEmote = new OverlayEmote(
                        new EmoteData("TransgenderPride", "https://static-cdn.jtvnw.net/emoticons/v2/307827377/default/light/3.0"),
                        new OverlayEmoteState(4),
                        alternatingConfigurerLists[i % 2],
                        transPrideBehaviorList);

                    let positionWithinCornerLaunch = Math.floor(i / 2);
                    let fractionThroughCornerLaunch = positionWithinCornerLaunch / (numPerCornerLaunch - 1);

                    let angleWithinRange = Math.PI / 2 * fractionThroughCornerLaunch;
                    let absoluteAngle = i % 2 == 0 ? angleWithinRange : (Math.PI / 2 + angleWithinRange);
                    overlayEmote.state.properties.set("angle", -1 * absoluteAngle);

                    emotesInWave.push(overlayEmote);
                }

                ActiveEmotesManager.startOverlayEmotes(emotesInWave);
                await sleep(millisecondsBetweenWaves.currentValue);
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