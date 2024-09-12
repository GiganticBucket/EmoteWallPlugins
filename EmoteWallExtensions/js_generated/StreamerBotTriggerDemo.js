const streamerBot = new StreamerBotWebsocket("ws://localhost:9094/");
// 1) Respond to a Streamer.bot "Action" based on its name. This does not allow for parameters.
streamerBot.registerActionHandlers({ name: "DoMuncherYosh", handler: () => startMuncherYosh() });
// 2) A Streamer.bot C# "Sub-Action" with custom data. This allows you to pass arbitrary data.
// Here's the C# Sub-Action 'Execute' code to trigger #2 above with custom data:
//      CPH.WebsocketBroadcastJson(System.Text.Json.JsonSerializer.Serialize(new { name = "DoWaddles", count = 7 }));
//	    return true;
streamerBot.registerCustomEventHandlers({ name: "DoWaddles", handler: data => startWaddle(data.count) });
// Alternatively, all handlers can be specified during construction:
//      const streamerBot = new StreamerBotWebsocket("ws://localhost:9094/",
//          [{ name: "DoMuncherYosh", handler: () => startMuncherYosh() }],
//          [{ name: "DoWaddles", handler: data => startWaddle(data.count) }]
//);
async function startWaddle(count) {
    const waddleEmoteData = new EmoteData("StreamerBotDemoWaddle", "https://cdn.betterttv.net/emote/608b8d5639b5010444d08ee0/3x", EmoteOriginKind.BTTVChannel);
    await startEmotes(waddleEmoteData, count);
}
async function startMuncherYosh() {
    const muncherYoshEmoteData = new EmoteData("StreamerBotDemoMuncherYosh", "https://cdn.betterttv.net/emote/64025af4e1d9a8e7b2885011/3x", EmoteOriginKind.BTTVChannel);
    await startEmotes(muncherYoshEmoteData, 1);
}
async function startEmotes(emoteData, count) {
    let overlayEmotes = [];
    for (let i = 0; i < count; i++) {
        overlayEmotes.push(new OverlayEmote(emoteData, new OverlayEmoteState(4), new EmoteConfigurerList(new RandomStartDirectionConfigurer()), new EmoteBehaviorList(new ConstantVelocityBehavior(1700), new BounceOffWallsBehavior([true, true, true, true]))));
    }
    await ActiveEmotesManager.startOverlayEmotes(overlayEmotes);
}
//# sourceMappingURL=StreamerBotTriggerDemo.js.map