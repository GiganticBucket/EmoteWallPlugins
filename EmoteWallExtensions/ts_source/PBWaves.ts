const pbWavesTestButtons = [
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
    {
        buttonText: "(useHelicopters true)",
        callback: () => useHelicopters.trySetValue("true")
    },
    {
        buttonText: "(useHelicopters false)",
        callback: () => useHelicopters.trySetValue("false")
    }
];

const pbWavesExtensionName = "PB Wave";
let pbWavesConnection: HubConnection;

addOrUseExistingScriptReference("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js", () => {
    pbWavesConnection = new HubConnection("chatHub");
    pbWavesConnection.Connected.add(() => {
        pbWavesConnection.invoke("NotifyEmoteExtensionButtons", pbWavesExtensionName, pbWavesTestButtons.map(b => b.buttonText));
    });

    pbWavesConnection.addHandlers([
        new HubConnectionHandler("EmoteExtensionButtonClicked", pbWavesHandleRemoteButtonClicked)
    ]);
    pbWavesConnection.start();
});

function pbWavesHandleRemoteButtonClicked(targetExtensionName: string, buttonText: string) {
    console.log("pbWavesHandleRemoteButtonClicked: " + targetExtensionName + " -- " + buttonText);

    if (targetExtensionName != pbWavesExtensionName) {
        return;
    }

    let matchingButton = pbWavesTestButtons.find(b => b.buttonText == buttonText);
    matchingButton?.callback();
}

const numDudesOption = new BoundedIntegerOption("numDudes", 16, 1, 100);
const individualDudeJumpCountOption = new BoundedIntegerOption("individualDudeJumpCount", 1, 1, 10);

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

const extendBodyWhenInAirOption = new BooleanOption("extendBodyWhenInAir", false);

const useHelicopters = new BooleanOption("useHelicopters", false);

registerPlugin({
    name: pbWavesExtensionName,
    // customizableBehaviors: [waddleOpacityBehavior, waddleVelocityBehavior],
    options: [
        numDudesOption,
        singleJumpDurationSecondsOption,
        timeBetweenEndpointJumpsSecondsOption,
        individualDudeJumpCountOption,
        maxJumpHeightMultiplierOption,
        extendBodyWhenInAirOption,
        useHelicopters
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

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

async function handlePBWave(
    actualNumDudes: number = numDudesOption.currentValue,
    actualIndividualDudeJumpCount: number = individualDudeJumpCountOption.currentValue,
    actualSingleJumpDurationSeconds: number = singleJumpDurationSeconds,
    actualTimeBetweenEndpointJumpsSeconds: number = timeBetweenEndpointJumpsSeconds,
    actualMaxJumpHeightMultiplier: number = maxJumpHeightMultiplier,
    actualExtendBodyWhenInAir: boolean = extendBodyWhenInAirOption.currentValue) {

    let horizontalSpaceOccupiedByWave = window.innerWidth / actualNumDudes;
    let dimensionsForIndividualPBs = horizontalSpaceOccupiedByWave;

    let secondsBetweenPBs = actualTimeBetweenEndpointJumpsSeconds / actualNumDudes;
    let emoteDuration = actualSingleJumpDurationSeconds * actualIndividualDudeJumpCount;

    for (let i = 0; i < actualNumDudes; i++) {
        const longBoi = actualMaxJumpHeightMultiplier > 1 && actualExtendBodyWhenInAir;
        const pbEmoteData = useHelicopters.currentValue
            ? new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_519580cd3a1243b8b3aff6460e2e2de5/default/light/3.0", EmoteOriginKind.Twitch)
            : longBoi
                ? new EmoteData("macrop3PB", "https://gb-bot-site-frontend.vercel.app/macroPBLong.png", EmoteOriginKind.Other)
                : new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0", EmoteOriginKind.Twitch);

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

async function handlePBWaveCrowdWithWave() {
    handlePBWaveCrowd();
    await sleep(1000);
    handlePBWave(12, 1, 1.5, 2.2, 2.6, true);

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

        const aspectRatio = startingOverlayEmote.state.image.width / startingOverlayEmote.state.image.height;
        const width = this._emoteDimension;
        const height = width / aspectRatio;

        startingOverlayEmote.state.image.width = width;
        startingOverlayEmote.state.image.height = height;

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