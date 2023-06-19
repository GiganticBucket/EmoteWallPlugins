let waddleHubConnection: HubConnection;

addOrUseExistingScriptReference("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js", () => {
    waddleHubConnection = new HubConnection("chatHub");
    waddleHubConnection.addHandlers([
        new HubConnectionHandler("WaddleEntrance", handleWaddleEntrance)
    ]);
    waddleHubConnection.start();
});

let defaultWaddleOpacitySpec: [number, number][] = [[0, 1], [0.9, 1], [1.5, 0.7]];
let waddleOpacityBehavior = new OpacityBehavior(AnimationGraph.fromArrays(defaultWaddleOpacitySpec));

let defaultWaddleVelocitySpec: [number, number][] = [[0, 250], [0.9, 250], [1.5, 450], [2.5, 450], [4, 950]];
let waddleVelocityBehavior = new VectorVelocityBehavior(AnimationGraph.fromArrays(defaultWaddleVelocitySpec));

let defaultNumWaves = 12;
let numWaves = defaultNumWaves;
let numWavesOption: IEditableOption = {
    name: "waddleNumWaves",
    defaultValueText: defaultNumWaves.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (Number.isSafeInteger(num) && num >= 1 && num <= 30) {
            numWaves = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => numWaves.toString()
};

let defaultNumWaddlesPerWave = 16;
let numWaddlesPerWave = defaultNumWaddlesPerWave;
let numWaddlesPerWaveOption: IEditableOption = {
    name: "waddleNumWaddlesPerWave",
    defaultValueText: defaultNumWaddlesPerWave.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (Number.isSafeInteger(num) && num >= 1 && num <= 30) {
            numWaddlesPerWave = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => numWaddlesPerWave.toString()
};

registerPlugin({
    name: "WaddleArmy",
    editableBehaviors: [waddleOpacityBehavior, waddleVelocityBehavior],
    options: [numWavesOption, numWaddlesPerWaveOption],
    testButtons: [
        {
            buttonText: "Test",
            callback: () => handleWaddleEntrance(numWaves, numWaddlesPerWave)
        }
    ]
});

async function handleWaddleEntrance(numWaves: number = 12, numWaddlesPerWave: number = 14) {
    let verticalSpaceOccupiedByWave = window.innerHeight;
    let dimensionsForIndividualWaddle = verticalSpaceOccupiedByWave / numWaddlesPerWave;

    // 250 is starting velocity from above, don't have a great way to make this dynamic with that presently
    let secondsBetweenWavesToKeepWavesAdjacent = dimensionsForIndividualWaddle / 250;

    for (let i = 0; i < numWaves; i++) {
        let waddleEmotesInWave: OverlayEmote[] = [];
        for (let j = 0; j < numWaddlesPerWave; j++) {
            let overlayEmote = new OverlayEmote(
                new EmoteData("WADDLE", "https://cdn.betterttv.net/emote/608b8d5639b5010444d08ee0/3x", EmoteOriginKind.BTTVChannel),
                new OverlayEmoteState(7),
                new EmoteConfigurerList(new WaddleConfigurer(dimensionsForIndividualWaddle, Math.floor(dimensionsForIndividualWaddle * j))),
                new EmoteBehaviorList(
                    waddleVelocityBehavior,
                    waddleOpacityBehavior,
                    new WaddleAngleChangerBehavior(),
                    new BounceOffWallsBehavior([true, false, true, false])
                ));

            waddleEmotesInWave.push(overlayEmote);
        }

        await ActiveEmotesManager.startOverlayEmotes(waddleEmotesInWave);
        await sleep(secondsBetweenWavesToKeepWavesAdjacent * 1000);
    }

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class WaddleConfigurer implements IOverlayEmoteConfigurer {
    constructor(private _waddleDimension: number, private _topPosition: number) {
    }

    name: "WaddleConfigurer";
    configure(startingOverlayEmote: OverlayEmote): void {
        startingOverlayEmote.state.properties.set("angle", 0);
        startingOverlayEmote.state.image.style.left = `${-1 * this._waddleDimension}px`;
        startingOverlayEmote.state.image.style.top = `${this._topPosition}px`;
        startingOverlayEmote.state.image.height = this._waddleDimension;
        startingOverlayEmote.state.image.width = this._waddleDimension;
    }
}

class WaddleAngleChangerBehavior implements IOverlayEmoteBehavior {
    name = "Waddle Angle Changer";
    defaultWaddleAngleChangeSeconds = 2;
    waddleAngleChangeSeconds = this.defaultWaddleAngleChangeSeconds;

    waddleAngleChangeSecondsOption: IEditableOption = {
        name: "waddleAngleChangeSeconds",
        defaultValueText: this.defaultWaddleAngleChangeSeconds.toString(),
        trySetValue: (text: string): boolean => {
            let num = Number(text);
            if (Number.isSafeInteger(num) && num >= 0) {
                this.waddleAngleChangeSeconds = num;
                return true;
            }
            else {
                return false;
            }
        },
        getCurrentValueText: () => this.waddleAngleChangeSeconds.toString()
    };

    apply(overlayEmoteState: OverlayEmoteState): void {
        if (overlayEmoteState.elapsedSeconds > this.waddleAngleChangeSeconds && !overlayEmoteState.properties.has("waddleAngleChanged")) {
            overlayEmoteState.properties.set("waddleAngleChanged", true);
            let randomAngle = (Math.random() * Math.PI / 2) - (Math.PI / 4);
            overlayEmoteState.properties.set("angle", randomAngle);
        }
    }
}