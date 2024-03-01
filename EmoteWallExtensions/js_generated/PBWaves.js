let defaultNumDudes = 16;
let numDudes = defaultNumDudes;
let numDudesOption = {
    name: "numDudes",
    defaultValueText: defaultNumDudes.toString(),
    trySetValue: (text) => {
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
let individualDudeJumpCountOption = {
    name: "individualDudeJumpCount",
    defaultValueText: defaultIndividualDudeJumpCount.toString(),
    trySetValue: (text) => {
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
let maxJumpHeightMultiplierOption = {
    name: "maxJumpHeightMultiplier",
    defaultValueText: defaultMaxJumpHeightMultiplier.toString(),
    trySetValue: (text) => {
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
let singleJumpDurationSecondsOption = {
    name: "singleJumpDurationSeconds",
    defaultValueText: defaultSingleJumpDurationSeconds.toString(),
    trySetValue: (text) => {
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
let timeBetweenEndpointJumpsSecondsOption = {
    name: "timeBetweenEndpointJumpsSeconds",
    defaultValueText: defaultTimeBetweenEndpointJumpsSeconds.toString(),
    trySetValue: (text) => {
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
let extendBodyWhenInAir = new BooleanOption("extendBodyWhenInAir", false);
registerPlugin({
    name: "PB Wave",
    // customizableBehaviors: [waddleOpacityBehavior, waddleVelocityBehavior],
    options: [
        numDudesOption,
        singleJumpDurationSecondsOption,
        timeBetweenEndpointJumpsSecondsOption,
        individualDudeJumpCountOption,
        maxJumpHeightMultiplierOption,
        extendBodyWhenInAir
    ],
    testButtons: [
        {
            buttonText: "[Use Current Options]",
            callback: () => handlePBWave()
        },
        {
            buttonText: "Bouncy",
            callback: () => handlePBWave(22, 4, 0.7, 1.4, 1, false)
        },
        {
            buttonText: "Big Dudes",
            callback: () => handlePBWave(6, 1, 2, 2, 1, false)
        },
        {
            buttonText: "Jumpers",
            callback: () => handlePBWave(12, 1, 1.5, 1.8, 4, false)
        },
        {
            buttonText: "Tall Jumpers",
            callback: () => handlePBWave(12, 1, 1.5, 1.8, 4, true)
        },
        {
            buttonText: "Rolling Wave",
            callback: () => handlePBWave(30, 5, 0.6, 1.4, 4, true)
        },
        {
            buttonText: "Crowd",
            callback: () => handlePBWaveCrowd()
        },
        {
            buttonText: "Crowd with Wave",
            callback: () => handlePBWaveCrowdWithWave()
        }
    ]
});
async function handlePBWave(actualNumDudes = numDudes, actualIndividualDudeJumpCount = individualDudeJumpCount, actualSingleJumpDurationSeconds = singleJumpDurationSeconds, actualTimeBetweenEndpointJumpsSeconds = timeBetweenEndpointJumpsSeconds, actualMaxJumpHeightMultiplier = maxJumpHeightMultiplier, actualExtendBodyWhenInAir = extendBodyWhenInAir.currentValue) {
    let horizontalSpaceOccupiedByWave = window.innerWidth / actualNumDudes;
    let dimensionsForIndividualPBs = horizontalSpaceOccupiedByWave;
    let secondsBetweenPBs = actualTimeBetweenEndpointJumpsSeconds / actualNumDudes;
    let emoteDuration = actualSingleJumpDurationSeconds * actualIndividualDudeJumpCount;
    for (let i = 0; i < actualNumDudes; i++) {
        const longBoi = actualMaxJumpHeightMultiplier > 1 && actualExtendBodyWhenInAir;
        const pbEmoteData = longBoi
            ? new EmoteData("macrop3PB", "https://gb-bot-site-frontend.vercel.app/macroPBLong.png", EmoteOriginKind.Other)
            : new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0", EmoteOriginKind.Twitch);
        let overlayEmote = new OverlayEmote(pbEmoteData, new OverlayEmoteState(emoteDuration), new EmoteConfigurerList(new PBConfigurer(horizontalSpaceOccupiedByWave, Math.floor(dimensionsForIndividualPBs * i))), new EmoteBehaviorList(new PBBehavior(horizontalSpaceOccupiedByWave, actualSingleJumpDurationSeconds, actualMaxJumpHeightMultiplier)));
        await ActiveEmotesManager.startOverlayEmotes([overlayEmote]);
        await sleep(secondsBetweenPBs * 1000);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
async function handlePBWaveCrowdWithWave() {
    handlePBWaveCrowd();
    await sleep(1000);
    handlePBWave(12, 1, 1.5, 2.2, 2.6, true);
    function sleep(ms) {
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
        let overlayEmote = new OverlayEmote(pbEmoteData, new OverlayEmoteState(thisDudeDuration), new EmoteConfigurerList(new PBConfigurer(thisDudeDimensions, thisDudeLeftPosition)), new EmoteBehaviorList(new PBBehavior(thisDudeDimensions, thisDudeSingleJumpDurationSeconds, 1)));
        await ActiveEmotesManager.startOverlayEmotes([overlayEmote]);
        await sleep(delayBetweenDudeStartsSeconds * 1000);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class PBConfigurer {
    constructor(_emoteDimension, _leftPosition) {
        this._emoteDimension = _emoteDimension;
        this._leftPosition = _leftPosition;
    }
    configure(startingOverlayEmote) {
        startingOverlayEmote.state.properties.set("angle", Math.PI / 2);
        startingOverlayEmote.state.image.style.top = `${window.innerHeight}px`;
        startingOverlayEmote.state.image.style.left = `${this._leftPosition}px`;
        const aspectRatio = startingOverlayEmote.state.image.width / startingOverlayEmote.state.image.height;
        const width = this._emoteDimension;
        const height = width / aspectRatio;
        startingOverlayEmote.state.image.width = width;
        startingOverlayEmote.state.image.height = height;
        startingOverlayEmote.state.image.style.zIndex = Math.floor(1 + window.innerWidth - this._emoteDimension).toString();
    }
}
class PBBehavior {
    constructor(_emoteDimension, _singleJumpDurationSeconds, _maxJumpHeightMultiplier) {
        this._emoteDimension = _emoteDimension;
        this._singleJumpDurationSeconds = _singleJumpDurationSeconds;
        this._maxJumpHeightMultiplier = _maxJumpHeightMultiplier;
        console.log("making pbbehavior with " + _emoteDimension + " and " + _singleJumpDurationSeconds);
    }
    apply(overlayEmoteState) {
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
//# sourceMappingURL=PBWaves.js.map