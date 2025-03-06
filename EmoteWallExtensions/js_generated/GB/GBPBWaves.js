GB_PBWaves_Setup();
function GB_PBWaves_Setup() {
    const numDudesOption = new BoundedIntegerOption("numDudes", 16, 1, 100);
    const individualDudeJumpCountOption = new BoundedIntegerOption("individualDudeJumpCount", 1, 1, 10);
    const maxJumpHeightMultiplierOption = new BoundedNumericOption("maxJumpHeightMultiplier", 1, 0.5, 50);
    const timeBetweenEndpointJumpsSecondsOption = new BoundedNumericOption("timeBetweenEndpointJumpsSeconds", 1, 0.1, 5);
    const extendBodyWhenInAirOption = new BooleanOption("extendBodyWhenInAir", false);
    const singleJumpDurationSecondsOption = new BoundedNumericOption("singleJumpDurationSeconds", 1, 0.1, 3);
    const gbBotTestButtonsPBWaves = [
        {
            buttonText: "[Test Current Options]",
            callback: () => launchPBWave()
        },
        {
            buttonText: "Small Wave x4",
            callback: () => launchPBWave(22, 4, 0.7, 1.4, 1, false)
        },
        {
            buttonText: "6 Big Dudes",
            callback: () => launchPBWave(6, 1, 2, 2, 1, false)
        },
        {
            buttonText: "Medium Jumpers",
            callback: () => launchPBWave(12, 1, 1.5, 1.8, 4, false)
        },
        {
            buttonText: "Medium Jumpers w/Body",
            callback: () => launchPBWave(12, 1, 1.5, 1.8, 4, true)
        },
        {
            buttonText: "Tall Wave x5",
            callback: () => launchPBWave(30, 5, 0.6, 1.4, 4, true)
        },
        {
            buttonText: "Tall Wave x4 x3",
            callback: () => launchOverlappingWaves()
        },
        {
            buttonText: "Crowd",
            callback: () => launchWaveCrowd()
        },
        {
            buttonText: "Crowd w/ Wave x1",
            callback: () => launchCrowdWithWave()
        },
        {
            buttonText: "Small Crowd w/ Wave x1",
            callback: () => launchCrowdWithSmallWave()
        }
    ];
    let gbBotConnectionPBWaves;
    addOrUseExistingScriptReference("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js", () => {
        gbBotConnectionPBWaves = new HubConnection("chatHub");
        gbBotConnectionPBWaves.Connected.add(() => {
            gbBotConnectionPBWaves.invoke("NotifyEmoteExtensionButtons", "PB Waves", gbBotTestButtonsPBWaves.map(b => b.buttonText));
        });
        gbBotConnectionPBWaves.addHandlers([
            new HubConnectionHandler("EmoteExtensionButtonClicked", gbBotRemoteButtonClickedPBWaves),
            new HubConnectionHandler("RequestEmoteExtensionButtons", () => {
                gbBotConnectionPBWaves.invoke("NotifyEmoteExtensionButtons", "PB Waves", gbBotTestButtonsPBWaves.map(b => b.buttonText));
                launchPBWave(6, 1, 2, 2, 1, false);
            }),
        ]);
        gbBotConnectionPBWaves.start();
    });
    function gbBotRemoteButtonClickedPBWaves(targetExtensionName, buttonText) {
        console.log("gbBotRemoteButtonClicked: " + targetExtensionName + " -- " + buttonText);
        if (targetExtensionName != "PB Waves") {
            return;
        }
        let matchingButton = gbBotTestButtonsPBWaves.find(b => b.buttonText == buttonText);
        matchingButton === null || matchingButton === void 0 ? void 0 : matchingButton.callback();
    }
    registerPlugin({
        name: "PB Waves",
        options: [
            numDudesOption,
            singleJumpDurationSecondsOption,
            timeBetweenEndpointJumpsSecondsOption,
            individualDudeJumpCountOption,
            maxJumpHeightMultiplierOption,
            extendBodyWhenInAirOption,
        ],
        testButtons: gbBotTestButtonsPBWaves,
        ModifyEmoteDataList: (message, emoteDataListBuilder) => {
            console.log('zzz message from ' + message.username);
            console.log('zzz emotes ' + JSON.stringify(emoteDataListBuilder.valuesSnapshot));
            if (["macrophaje", "giganticbucket"].includes(message.username.toLowerCase()) && emoteDataListBuilder.valuesSnapshot.some(e => e.name == "macrop3PB")) {
                launchCrowdWithSmallWave();
                emoteDataListBuilder.removeAllWithName("macrop3PB");
            }
        }
    });
    async function launchOverlappingWaves() {
        const numWaves = 4;
        const secondsBetweenWaves = 0.2;
        for (let i = 0; i < numWaves; i++) {
            launchPBWave(30, 3, 0.6, 1.4, 4, true);
            await sleep(secondsBetweenWaves * 1000);
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    async function launchPBWave(numDudes = numDudesOption.currentValue, individualDudeJumpCount = individualDudeJumpCountOption.currentValue, singleJumpDurationSeconds = singleJumpDurationSecondsOption.currentValue, timeBetweenEndpointJumpsSeconds = timeBetweenEndpointJumpsSecondsOption.currentValue, maxJumpHeightMultiplier = maxJumpHeightMultiplierOption.currentValue, extendBodyWhenInAir = extendBodyWhenInAirOption.currentValue) {
        let horizontalSpaceOccupiedByWave = window.innerWidth / numDudes;
        let dimensionsForIndividualPBs = horizontalSpaceOccupiedByWave;
        let secondsBetweenPBs = timeBetweenEndpointJumpsSeconds / numDudes;
        let emoteDuration = singleJumpDurationSeconds * individualDudeJumpCount;
        for (let i = 0; i < numDudes; i++) {
            const longBoi = maxJumpHeightMultiplier > 1 && extendBodyWhenInAir;
            const pbEmoteData = longBoi
                //? new EmoteData("macrop3PB", "https://gb-bot-site-frontend.vercel.app/macroPBLong.png", EmoteOriginKind.Other)
                ? new EmoteData("macrop3PB", longBoyEmoteUrl, EmoteOriginKind.Other)
                : new EmoteData("macrop3PB", emoteUrl, EmoteOriginKind.Twitch);
            let overlayEmote = new OverlayEmote(pbEmoteData, new OverlayEmoteState(emoteDuration), new EmoteConfigurerList(new PBConfigurer(horizontalSpaceOccupiedByWave, Math.floor(dimensionsForIndividualPBs * i))), new EmoteBehaviorList(new PBBehavior(horizontalSpaceOccupiedByWave, singleJumpDurationSeconds, maxJumpHeightMultiplier)));
            await ActiveEmotesManager.startOverlayEmotes([overlayEmote]);
            await sleep(secondsBetweenPBs * 1000);
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    async function launchCrowdWithWave() {
        launchWaveCrowd();
        await sleep(1000);
        launchPBWave(12, 1, 1.5, 2.2, 2.6, true);
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    async function launchCrowdWithSmallWave() {
        launchWaveCrowd(50, 120);
        await sleep(1000);
        launchPBWave(16, 1, 1.5, 2.2, 1.8, true);
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    const macroPBURL = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_8c56f65d08314e6cb9f40791f5db3fe7/default/light/3.0";
    const gbYay = "https://static-cdn.jtvnw.net/emoticons/v2/306572193/default/light/3.0";
    const gbTurnblock = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_7da0e914b3294cf895a8ebdd12d04d03/default/light/3.0";
    const gbHeli = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_519580cd3a1243b8b3aff6460e2e2de5/default/light/3.0";
    const gbCooperRoll = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c6b03ec35ed2489eb6dbe21dedee0a94/default/light/3.0";
    const emoteUrl = gbHeli;
    const gbLongBoiEmoteUrl = "C:\\Users\\dpoes\\Downloads\\gbyaylong.png";
    const macroLongBoiEmoteUrl = "";
    const longBoyEmoteUrl = gbLongBoiEmoteUrl;
    async function launchWaveCrowd(minDimensions = 50, maxDimensions = 200) {
        const numCrowdDudes = 400;
        const timeBetweenFirstAndLastJumpStartSeconds = 3;
        const delayBetweenDudeStartsSeconds = timeBetweenFirstAndLastJumpStartSeconds / numCrowdDudes;
        for (let i = 0; i < numCrowdDudes; i++) {
            let pbEmoteData = new EmoteData("macrop3PB", emoteUrl, EmoteOriginKind.Twitch);
            let thisDudeSingleJumpDurationSeconds = 0.8 + Math.random() * 1.5;
            let thisDudeJumpCount = 1;
            let thisDudeDimensions = minDimensions + Math.floor(Math.random() * (maxDimensions - minDimensions));
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
}
//# sourceMappingURL=GBPBWaves.js.map