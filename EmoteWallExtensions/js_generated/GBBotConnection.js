const gbBotExtensionName = "GBBot Example";
const gbBotTestButtons = [
    {
        buttonText: "My Button 1",
        callback: () => { gbBotStartWaddles(1); }
    },
    {
        buttonText: "My Button 2",
        callback: () => { gbBotStartWaddles(2); }
    },
];
let gbBotConnection;
addOrUseExistingScriptReference("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js", () => {
    gbBotConnection = new HubConnection("chatHub");
    gbBotConnection.Connected.add(() => {
        gbBotConnection.invoke("NotifyEmoteExtensionButtons", gbBotExtensionName, gbBotTestButtons.map(b => b.buttonText));
    });
    gbBotConnection.addHandlers([
        new HubConnectionHandler("EmoteExtensionButtonClicked", gbBotRemoteButtonClicked)
    ]);
    gbBotConnection.start();
});
function gbBotRemoteButtonClicked(targetExtensionName, buttonText) {
    console.log("gbBotRemoteButtonClicked: " + targetExtensionName + " -- " + buttonText);
    if (targetExtensionName != gbBotExtensionName) {
        return;
    }
    let matchingButton = gbBotTestButtons.find(b => b.buttonText == buttonText);
    matchingButton === null || matchingButton === void 0 ? void 0 : matchingButton.callback();
}
registerPlugin({
    name: gbBotExtensionName,
    testButtons: gbBotTestButtons,
});
async function gbBotStartWaddles(count) {
    const waddleEmoteData = new EmoteData("GBBotDemoWaddle", "https://cdn.betterttv.net/emote/608b8d5639b5010444d08ee0/3x", EmoteOriginKind.BTTVChannel);
    await gbBotStartEmotes(waddleEmoteData, count);
}
async function gbBotStartEmotes(emoteData, count) {
    let overlayEmotes = [];
    for (let i = 0; i < count; i++) {
        overlayEmotes.push(new OverlayEmote(emoteData, new OverlayEmoteState(4), new EmoteConfigurerList(new RandomStartDirectionConfigurer()), new EmoteBehaviorList(new ConstantVelocityBehavior(1700), new BounceOffWallsBehavior([true, true, true, true]))));
    }
    await ActiveEmotesManager.startOverlayEmotes(overlayEmotes);
}
//# sourceMappingURL=GBBotConnection.js.map