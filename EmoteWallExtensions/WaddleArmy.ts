const hubConnection = new HubConnection("chatHub");
hubConnection.addHandlers([
    new HubConnectionHandler("WaddleEntrance", handleWaddleEntrance)
]);

const waddleStartVelocity = 250;
let waddleOpacityBehavior = new OpacityBehavior([[0, 1], [0.9, 1], [1.5, 0.3]]);
let waddleVelocityBehavior = new VectorVelocityBehavior([[0, waddleStartVelocity], [0.9, waddleStartVelocity], [1.5, 1.8 * waddleStartVelocity]]);

async function handleWaddleEntrance(numWaves: number = 12, numWaddlesPerWave: number = 14) {
    let verticalSpaceOccupiedByWave = window.innerHeight;
    let dimensionsForIndividualWaddle = verticalSpaceOccupiedByWave / numWaddlesPerWave;
    let secondsBetweenWavesToKeepWavesAdjacent = dimensionsForIndividualWaddle / waddleStartVelocity;

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
    name: "Waddle Angle Changer";

    apply(overlayEmoteState: OverlayEmoteState): void {
        if (overlayEmoteState.elapsedSeconds > 3 && !overlayEmoteState.properties.has("waddleAngleChanged")) {
            overlayEmoteState.properties.set("waddleAngleChanged", true);
            let randomAngle = (Math.random() * Math.PI / 2) - (Math.PI / 4);
            overlayEmoteState.properties.set("angle", randomAngle);
        }
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}