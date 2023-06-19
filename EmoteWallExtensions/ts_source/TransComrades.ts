const transPrideOpacityBehavior = new OpacityBehavior(AnimationGraph.fromArrays([[0, 1], [0.2, 0.7], [3.2, 0.5], [4, 0]]));
const transPrideConstVelocityBehavior = new ConstantVelocityBehavior(500);
const transPrideBehaviorList = new EmoteBehaviorList(transPrideOpacityBehavior, transPrideConstVelocityBehavior);

class BoundedIntegerOption implements IEditableOption {
    readonly defaultValueText: string;
    currentValue: number;

    constructor(readonly name: string, defaultValue: number, readonly lowerBound: number, readonly upperBound: number) {
        this.defaultValueText = defaultValue.toString();
        this.currentValue = defaultValue;
    }

    getCurrentValueText(): string {
        return this.currentValue.toString();
    }

    trySetValue(text: string): boolean {
        let num = Number(text);
        if (Number.isSafeInteger(num) && num >= this.lowerBound && num <= this.upperBound) {
            this.currentValue = num;
            return true;
        }
        else {
            return false;
        }
    }
}

let numPrideWavesOption = new BoundedIntegerOption("numWaves", 3, 1, 10);

registerPlugin({
    name: "Trans Comrades",
    editableBehaviors: [transPrideOpacityBehavior, transPrideConstVelocityBehavior],
    options: [numPrideWavesOption],
    ModifyEmoteDataList(message: TwitchMessage, emoteDataListBuilder: EmoteDataList) {
        if (message.text.includes("TRANS COMRADES")) {
            LaunchTransPrideEmotes();
        }

        async function LaunchTransPrideEmotes() {
            let sharedConfigurers = [
                new BoundedStartingSizeConfigurer(80),
                new DurationConfigurer(5)];

            let numPerWave = 20;
            let numPerCornerLaunch = numPerWave / 2;

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
                    let fractionThroughCornerLaunch = positionWithinCornerLaunch / numPerCornerLaunch;

                    let angleWithinRange = Math.PI / 2 * fractionThroughCornerLaunch;
                    let absoluteAngle = i % 2 == 0 ? angleWithinRange : (Math.PI / 2 + angleWithinRange + Math.PI / 2 /numPerCornerLaunch);
                    overlayEmote.state.properties.set("angle", -1 * absoluteAngle);

                    emotesInWave.push(overlayEmote);
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