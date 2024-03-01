let defaultNumDudes = 16;
let numDudes = defaultNumDudes;
let numDudesOption: IEditableOption = {
    name: "numDudes",
    defaultValueText: defaultNumDudes.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (Number.isSafeInteger(num) && num >= 1 && num <= 100) {
            numDudes = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => numDudes.toString()
};

let defaultIndividualDudeJumpCount = 1;
let individualDudeJumpCount = defaultIndividualDudeJumpCount;
let individualDudeJumpCountOption: IEditableOption = {
    name: "individualDudeJumpCount",
    defaultValueText: defaultIndividualDudeJumpCount.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (Number.isSafeInteger(num) && num >= 1 && num <= 10) {
            individualDudeJumpCount = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => individualDudeJumpCount.toString()
};

let defaultMaxJumpHeightMultiplier = 1;
let maxJumpHeightMultiplier = defaultMaxJumpHeightMultiplier;
let maxJumpHeightMultiplierOption: IEditableOption = {
    name: "maxJumpHeightMultiplier",
    defaultValueText: defaultMaxJumpHeightMultiplier.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (!Number.isNaN(num) && num >= 0.5 && num <= 50) {
            maxJumpHeightMultiplier = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => maxJumpHeightMultiplier.toString()
};

let defaultSingleJumpDurationSeconds = 1;
let singleJumpDurationSeconds = defaultSingleJumpDurationSeconds;
let singleJumpDurationSecondsOption: IEditableOption = {
    name: "singleJumpDurationSeconds",
    defaultValueText: defaultSingleJumpDurationSeconds.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (!Number.isNaN(num) && num >= 0.1 && num <= 3) {
            singleJumpDurationSeconds = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => singleJumpDurationSeconds.toString()
};

let defaultTimeBetweenEndpointJumpsSeconds = 1;
let timeBetweenEndpointJumpsSeconds = defaultTimeBetweenEndpointJumpsSeconds;
let timeBetweenEndpointJumpsSecondsOption: IEditableOption = {
    name: "timeBetweenEndpointJumpsSeconds",
    defaultValueText: defaultTimeBetweenEndpointJumpsSeconds.toString(),
    trySetValue: (text: string): boolean => {
        let num = Number(text);
        if (!Number.isNaN(num) && num >= 0.1 && num <= 5) {
            timeBetweenEndpointJumpsSeconds = num;
            return true;
        }
        else {
            return false;
        }
    },
    getCurrentValueText: () => timeBetweenEndpointJumpsSeconds.toString()
};

registerPlugin({
    name: "PB Wave",
    // customizableBehaviors: [waddleOpacityBehavior, waddleVelocityBehavior],
    options: [
        numDudesOption,
        singleJumpDurationSecondsOption,
        timeBetweenEndpointJumpsSecondsOption,
        individualDudeJumpCountOption,
        maxJumpHeightMultiplierOption
    ],
    testButtons: [
        {
            buttonText: "[Use Current Options]",
            callback: () => handlePBWave()
        },
        {
            buttonText: "Bouncy",
            callback: () => handlePBWave(22, 4, 0.7, 1.4, 1)
        },
        {
            buttonText: "Big Dudes",
            callback: () => handlePBWave(6, 1, 2, 2, 1)
        },
        {
            buttonText: "Jumpers",
            callback: () => handlePBWave(12, 1, 1.5, 1.8, 4)
        },
        {
            buttonText: "Crowd",
            callback: () => handlePBWaveCrowd()
        }
    ]
});

async function handlePBWave(
    actualNumDudes: number = numDudes,
    actualIndividualDudeJumpCount: number = individualDudeJumpCount,
    actualSingleJumpDurationSeconds: number = singleJumpDurationSeconds,
    actualTimeBetweenEndpointJumpsSeconds: number = timeBetweenEndpointJumpsSeconds,
    actualMaxJumpHeightMultiplier: number = maxJumpHeightMultiplier) {

    let horizontalSpaceOccupiedByWave = window.innerWidth / actualNumDudes;
    let dimensionsForIndividualPBs = horizontalSpaceOccupiedByWave;

    let secondsBetweenPBs = actualTimeBetweenEndpointJumpsSeconds / actualNumDudes;
    let emoteDuration = actualSingleJumpDurationSeconds * actualIndividualDudeJumpCount;

    for (let i = 0; i < actualNumDudes; i++) {
        let pbEmoteData = new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0", EmoteOriginKind.Twitch);
        let overlayEmote = new OverlayEmote(
            pbEmoteData,
            new OverlayEmoteState(emoteDuration),
            new EmoteConfigurerList(
                new PBConfigurer(horizontalSpaceOccupiedByWave, Math.floor(dimensionsForIndividualPBs * i))),
            new EmoteBehaviorList(
                new PBBehavior(horizontalSpaceOccupiedByWave, actualSingleJumpDurationSeconds, actualMaxJumpHeightMultiplier)
            ));

        await ActiveEmotesManager.startOverlayEmotes([overlayEmote]);
        await sleep(secondsBetweenPBs * 1000);
    }

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

async function handlePBWaveCrowd() {
    const actualNumDudes = 400;
    const timeBetweenFirstAndLastJumpStartSeconds = 3;
    const delayBetweenDudeStartsSeconds = timeBetweenFirstAndLastJumpStartSeconds / actualNumDudes;

    for (let i = 0; i < actualNumDudes; i++) {
        let pbEmoteData = new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0", EmoteOriginKind.Twitch);

        let thisDudeSingleJumpDurationSeconds = 0.8 + Math.random() * 1.5;
        let thisDudeJumpCount = 1; // + Math.floor((Math.random() * 2));

        let thisDudeDimensions = 50 + Math.floor(Math.random() * 150);
        let thisDudeDuration = thisDudeSingleJumpDurationSeconds * thisDudeJumpCount;

        //let thisDudeLeftPositionRange = window.innerWidth - thisDudeDimensions;
        //let thisDudeLeftPosition = Math.floor(Math.random() * thisDudeLeftPositionRange);
        let thisDudeLeftPosition = Math.floor(Math.random() * window.innerWidth - thisDudeDimensions / 2);

        let overlayEmote = new OverlayEmote(
            pbEmoteData,
            new OverlayEmoteState(thisDudeDuration),
            new EmoteConfigurerList(
                new PBConfigurer(thisDudeDimensions, thisDudeLeftPosition)),
            new EmoteBehaviorList(
                new PBBehavior(thisDudeDimensions, thisDudeSingleJumpDurationSeconds, 1)
            ));

        await ActiveEmotesManager.startOverlayEmotes([overlayEmote]);
        await sleep(delayBetweenDudeStartsSeconds * 1000);
    }

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class PBConfigurer implements IOverlayEmoteConfigurer {
    constructor(private _emoteDimension: number, private _leftPosition: number) {
    }

    name: "PBConfigurer";
    configure(startingOverlayEmote: OverlayEmote): void {
        startingOverlayEmote.state.properties.set("angle", Math.PI / 2);
        startingOverlayEmote.state.image.style.top = `${window.innerHeight}px`;
        startingOverlayEmote.state.image.style.left = `${this._leftPosition}px`;
        startingOverlayEmote.state.image.height = this._emoteDimension;
        startingOverlayEmote.state.image.width = this._emoteDimension;

        startingOverlayEmote.state.image.style.zIndex = Math.floor(1 + window.innerWidth - this._emoteDimension).toString();
    }
}

class PBBehavior implements IOverlayEmoteBehavior {
    constructor(private _emoteDimension: number, private _singleJumpDurationSeconds: number, private _maxJumpHeightMultiplier: number) {
        console.log("making pbbehavior with " + _emoteDimension + " and " + _singleJumpDurationSeconds);
    }

    name: "PBBehavior";
    apply(overlayEmoteState: OverlayEmoteState): void {
        const percentOfWaveElapsed = (overlayEmoteState.elapsedSeconds / this._singleJumpDurationSeconds) % 1;
        //if (percentOfWaveElapsed > 1) {
        //    overlayEmoteState.duration = 0;
        //}

        //let percentOfHeightShowing = percentOfWaveElapsed < 0.5
        //    ? percentOfWaveElapsed / 0.5
        //    : 1 - ((percentOfWaveElapsed - 0.5) / 0.5);

        let percentOfJumpHeight = Math.sin(percentOfWaveElapsed * Math.PI);
        let travelDistanceRange = this._emoteDimension * this._maxJumpHeightMultiplier;
        let travelDistanceNow = percentOfJumpHeight * travelDistanceRange;
        let topPixelsAboveBottom = travelDistanceNow;

        overlayEmoteState.image.style.top = `${window.innerHeight - topPixelsAboveBottom}px`;
    }
}