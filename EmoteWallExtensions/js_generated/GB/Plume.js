Plume_Setup();
function Plume_Setup() {
    const extensionName = "Le Plume";
    const plumesPerRowOption = new BoundedIntegerOption("plumesPerRow", 12, 1, 30);
    const numRowsOption = new BoundedIntegerOption("numRows", 3, 1, 20);
    const dropDurationSecondsOption = new BoundedNumericOption("dropDurationSeconds", 3, 0.01, 5);
    const timeBetweenRowsSecondsOption = new BoundedNumericOption("timeBetweenRowsSeconds", 0.3, 0.01, 5);
    const testButtons = [
        {
            buttonText: "Drop Plumes",
            callback: () => dropPlumes()
        }
    ];
    let gbBotConnection;
    addOrUseExistingScriptReference("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js", () => {
        gbBotConnection = new HubConnection("chatHub");
        gbBotConnection.Connected.add(() => {
            gbBotConnection.invoke("NotifyEmoteExtensionButtons", extensionName, testButtons.map(b => b.buttonText));
        });
        gbBotConnection.addHandlers([
            new HubConnectionHandler("EmoteExtensionButtonClicked", gbBotRemoteButtonClicked),
            new HubConnectionHandler("RequestEmoteExtensionButtons", () => {
                gbBotConnection.invoke("NotifyEmoteExtensionButtons", extensionName, testButtons.map(b => b.buttonText));
            }),
        ]);
        gbBotConnection.start();
    });
    function gbBotRemoteButtonClicked(targetExtensionName, buttonText) {
        console.log("gbBotRemoteButtonClicked: " + targetExtensionName + " -- " + buttonText);
        if (targetExtensionName != extensionName) {
            return;
        }
        let matchingButton = testButtons.find(b => b.buttonText == buttonText);
        matchingButton === null || matchingButton === void 0 ? void 0 : matchingButton.callback();
    }
    registerPlugin({
        name: extensionName,
        options: [
            plumesPerRowOption,
            numRowsOption,
            dropDurationSecondsOption,
            timeBetweenRowsSecondsOption
        ],
        testButtons: testButtons
    });
    async function dropPlumes() {
        for (let i = 0; i < numRowsOption.currentValue; i++) {
            launchPlumeRow(plumesPerRowOption.currentValue);
            await sleep(timeBetweenRowsSecondsOption.currentValue * 1000);
        }
    }
    async function launchPlumeRow(numPlumes) {
        const emoteDuration = dropDurationSecondsOption.currentValue * 1000;
        const horizontalSpacePerColumn = window.innerWidth / numPlumes;
        const plumeDimensions = horizontalSpacePerColumn * 0.6;
        const initialLeftDistanceWithinPlumeColumn = (horizontalSpacePerColumn - plumeDimensions) / 2;
        let plumeEmotes = [];
        for (let i = 0; i < numPlumes; i++) {
            plumeEmotes.push(new OverlayEmote(new EmoteData("lePlume", "https://giganticbucket.github.io/EmoteWallPlugins/EmoteWallExtensions/assets/plume.png", EmoteOriginKind.Other), new OverlayEmoteState(emoteDuration), new EmoteConfigurerList(new PlumeConfigurer(plumeDimensions, horizontalSpacePerColumn * i + initialLeftDistanceWithinPlumeColumn)), new EmoteBehaviorList(new PlumeBehavior(plumeDimensions, horizontalSpacePerColumn * i, horizontalSpacePerColumn))));
        }
        await ActiveEmotesManager.startOverlayEmotes(plumeEmotes);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    class PlumeConfigurer {
        constructor(_emoteDimension, _leftPosition) {
            this._emoteDimension = _emoteDimension;
            this._leftPosition = _leftPosition;
        }
        configure(startingOverlayEmote) {
            startingOverlayEmote.state.properties.set("angle", Math.PI / 2);
            startingOverlayEmote.state.image.style.top = `${0}px`;
            startingOverlayEmote.state.image.style.left = `${this._leftPosition}px`;
            startingOverlayEmote.state.image.width = this._emoteDimension;
            startingOverlayEmote.state.image.height = this._emoteDimension;
            startingOverlayEmote.state.image.style.zIndex = Math.floor(1 + window.innerWidth - this._emoteDimension).toString();
        }
    }
    class PlumeBehavior {
        constructor(_imageDimension, _columnLeftValue, _columnWidth) {
            this._imageDimension = _imageDimension;
            this._columnLeftValue = _columnLeftValue;
            this._columnWidth = _columnWidth;
            this._imageLeftOscillationDistance = _columnWidth - _imageDimension;
        }
        apply(overlayEmoteState) {
            // Vertical position
            const percentOfDropElapsed = overlayEmoteState.elapsedSeconds / (overlayEmoteState.duration / 1000);
            const imageTopEnd = window.innerHeight;
            const imageTopStart = -this._imageDimension;
            const totalDropDistance = imageTopEnd - imageTopStart;
            const dropDistanceNow = totalDropDistance * percentOfDropElapsed;
            const currentTopValue = imageTopStart + dropDistanceNow;
            overlayEmoteState.image.style.top = `${currentTopValue}px`;
            // Horizontal position
            const numOscillations = 4;
            const oscillationPeriodPercent = 1 / numOscillations;
            const percentOfCurrentOscillation = (percentOfDropElapsed % oscillationPeriodPercent) / oscillationPeriodPercent;
            const currentLeftValuePercentOfOscillationDistance = (Math.sin(percentOfCurrentOscillation * Math.PI * 2) // [-1, 1]
                + 1) // [0, 2]
                / 2; // [0, 1]
            debugger;
            const currentLeftValue = this._columnLeftValue + (currentLeftValuePercentOfOscillationDistance * this._imageLeftOscillationDistance);
            overlayEmoteState.image.style.left = `${currentLeftValue}px`;
        }
    }
}
//# sourceMappingURL=Plume.js.map