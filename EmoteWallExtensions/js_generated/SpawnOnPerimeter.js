const sideNames = ["left", "right", "top", "bottom", "topleft", "topright", "bottomleft", "bottomright", "none", "all"];
const sideToStartDefault = "all";
let sideToStart = sideToStartDefault;
let startOnLeftWallConfigurers = new EmoteConfigurerList(...OverlayEmoteFactory.defaultConfigurers);
startOnLeftWallConfigurers.replaceEntryWithNameOrAppend(RandomStartPositionConfigurer.name, {
    name: "Start on perimeter",
    configure: (startingOverlayEmote) => {
        if (sideToStart == "none") {
            return;
        }
        if (sideToStart == "all") {
            // Pick a side randomly, consider having this be weighted by side length
            let randomSideIndex = Math.floor(Math.random() * 4);
            let randomSideName = ["left", "right", "top", "bottom"][randomSideIndex];
            applySideToStart(startingOverlayEmote, randomSideName);
            return;
        }
        applySideToStart(startingOverlayEmote, sideToStart);
    }
});
function applySideToStart(startingOverlayEmote, sideName) {
    let yBound = window.innerHeight - startingOverlayEmote.state.image.height;
    let xBound = window.innerWidth - startingOverlayEmote.state.image.width;
    let left, top;
    switch (sideName) {
        case "left":
            left = 0;
            top = Math.random() * yBound;
            break;
        case "right":
            left = xBound;
            top = Math.random() * yBound;
            break;
        case "top":
            left = Math.random() * xBound;
            top = 0;
            break;
        case "bottom":
            left = Math.random() * xBound;
            top = yBound;
            break;
        case "topleft":
            left = 0;
            top = 0;
            break;
        case "topright":
            left = xBound;
            top = 0;
            break;
        case "bottomleft":
            left = 0;
            top = yBound;
            break;
        case "bottomright":
            left = xBound;
            top = yBound;
            break;
    }
    startingOverlayEmote.state.image.style.left = `${left}px`;
    startingOverlayEmote.state.image.style.top = `${top}px`;
}
let sideToStartOption = {
    name: "sideToStart",
    defaultValueText: sideToStartDefault,
    getCurrentValueText() {
        return sideToStart;
    },
    trySetValue(text) {
        var cleanedText = text.trim().toLowerCase();
        if (sideNames.includes(cleanedText)) {
            sideToStart = cleanedText;
            return true;
        }
        else {
            return false;
        }
    }
};
registerPlugin({
    name: "Start on side",
    overrideDefaultConfigurers: startOnLeftWallConfigurers.toImmutable(),
    options: [sideToStartOption]
});
//# sourceMappingURL=SpawnOnPerimeter.js.map