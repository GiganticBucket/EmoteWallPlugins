const pbWavesTestButtons = [
    {
        buttonText: "[Test Current Options]",
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
        buttonText: "Rolling Wave 2",
        callback: () => handleOverlappingWaves()
    },
    {
        buttonText: "Crowd",
        callback: () => handlePBWaveCrowd()
    },
    {
        buttonText: "Crowd with Wave",
        callback: () => handlePBWaveCrowdWithWave()
    },
];
const pbWavesExtensionName = "PB Wave";
const numDudesOption = new BoundedIntegerOption("numDudes", 16, 1, 100);
const individualDudeJumpCountOption = new BoundedIntegerOption("individualDudeJumpCount", 1, 1, 10);
const maxJumpHeightMultiplierOption = new BoundedNumericOption("maxJumpHeightMultiplier", 1, 0.5, 50);
const timeBetweenEndpointJumpsSecondsOption = new BoundedNumericOption("timeBetweenEndpointJumpsSeconds", 1, 0.1, 5);
const extendBodyWhenInAirOption = new BooleanOption("extendBodyWhenInAir", false);
const singleJumpDurationSecondsOption = new BoundedNumericOption("singleJumpDurationSeconds", 1, 0.1, 3);
registerPlugin({
    name: pbWavesExtensionName,
    options: [
        numDudesOption,
        singleJumpDurationSecondsOption,
        timeBetweenEndpointJumpsSecondsOption,
        individualDudeJumpCountOption,
        maxJumpHeightMultiplierOption,
        extendBodyWhenInAirOption,
    ],
    testButtons: pbWavesTestButtons,
});
async function handleOverlappingWaves() {
    const numWaves = 4;
    const secondsBetweenWaves = 0.2;
    for (let i = 0; i < numWaves; i++) {
        handlePBWave(30, 3, 0.6, 1.4, 4, true);
        await sleep(secondsBetweenWaves * 1000);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
async function handlePBWave(numDudes = numDudesOption.currentValue, individualDudeJumpCount = individualDudeJumpCountOption.currentValue, singleJumpDurationSeconds = singleJumpDurationSecondsOption.currentValue, timeBetweenEndpointJumpsSeconds = timeBetweenEndpointJumpsSecondsOption.currentValue, maxJumpHeightMultiplier = maxJumpHeightMultiplierOption.currentValue, extendBodyWhenInAir = extendBodyWhenInAirOption.currentValue) {
    let horizontalSpaceOccupiedByWave = window.innerWidth / numDudes;
    let dimensionsForIndividualPBs = horizontalSpaceOccupiedByWave;
    let secondsBetweenPBs = timeBetweenEndpointJumpsSeconds / numDudes;
    let emoteDuration = singleJumpDurationSeconds * individualDudeJumpCount;
    for (let i = 0; i < numDudes; i++) {
        const longBoi = maxJumpHeightMultiplier > 1 && extendBodyWhenInAir;
        const pbEmoteData = longBoi
            ? new EmoteData("macrop3PB", "https://gb-bot-site-frontend.vercel.app/macroPBLong.png", EmoteOriginKind.Other)
            : new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0", EmoteOriginKind.Twitch);
        let overlayEmote = new OverlayEmote(pbEmoteData, new OverlayEmoteState(emoteDuration), new EmoteConfigurerList(new PBConfigurer(horizontalSpaceOccupiedByWave, Math.floor(dimensionsForIndividualPBs * i))), new EmoteBehaviorList(new PBBehavior(horizontalSpaceOccupiedByWave, singleJumpDurationSeconds, maxJumpHeightMultiplier)));
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
    const numCrowdDudes = 400;
    const timeBetweenFirstAndLastJumpStartSeconds = 3;
    const delayBetweenDudeStartsSeconds = timeBetweenFirstAndLastJumpStartSeconds / numCrowdDudes;
    for (let i = 0; i < numCrowdDudes; i++) {
        let pbEmoteData = new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0", EmoteOriginKind.Twitch);
        let thisDudeSingleJumpDurationSeconds = 0.8 + Math.random() * 1.5;
        let thisDudeJumpCount = 1;
        let thisDudeDimensions = 50 + Math.floor(Math.random() * 150);
        let thisDudeDuration = thisDudeSingleJumpDurationSeconds * thisDudeJumpCount;
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
    }
    apply(overlayEmoteState) {
        const percentOfWaveElapsed = (overlayEmoteState.elapsedSeconds / this._singleJumpDurationSeconds) % 1;
        let percentOfJumpHeight = Math.sin(percentOfWaveElapsed * Math.PI);
        let travelDistanceRange = this._emoteDimension * this._maxJumpHeightMultiplier;
        let travelDistanceNow = percentOfJumpHeight * travelDistanceRange;
        let topPixelsAboveBottom = travelDistanceNow;
        overlayEmoteState.image.style.top = `${window.innerHeight - topPixelsAboveBottom}px`;
    }
}
//# sourceMappingURL=PBWaves.js.map