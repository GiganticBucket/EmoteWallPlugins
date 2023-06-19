registerPlugin({
    name: "SlotsResults",
    TakesFullControl(message: TwitchMessage) {
        if (message.tags.username.toLowerCase() == "giganticbucketbot" && /You got .* \| .* \| .*/.test(message.text) && message.emotes.length >= 4) {
            showSlotsResult(message);
            return true;
        }
        else {
            return false;
        }
    },
    testButtons: [
        {
            buttonText: "Win",
            callback: () => simulateMessage(
                "GiganticBucket You got catJAM | catJAM | catJAM and won 2000 Donut Holes! DiscoShell DiscoShell DiscoShell You stayed at rank #9.",
                "giganticbucket",
                "giganticbucketbot")
        },
        {
            buttonText: "Loss",
            callback: () => simulateMessage(
                "GiganticBucket You got catJAM | catJAM | ratJAM and lost your 100 Donut Holes. DiscoShell You stayed at rank #9.",
                "giganticbucket",
                "giganticbucketbot")
        }
    ]
});

async function showSlotsResult(message: TwitchMessage) {
    let overlayEmotes: OverlayEmote[] = [];
    let won = message.text.includes(" and won ");

    let individualSlotEmoteSpace = won ? 200 : 100;
    for (let i = 0; i < 3; i++) {
        let individualSlotEmote = message.emotes[i];
        overlayEmotes.push(new OverlayEmote(
            individualSlotEmote,
            new OverlayEmoteState(6),
            new EmoteConfigurerList(...[{
                name: "IndividualSlotResultConfigurer",
                configure(startingOverlayEmote: OverlayEmote): void {
                    startingOverlayEmote.state.properties.set("angle", Math.PI / 2);
                    let left = i * individualSlotEmoteSpace;
                    startingOverlayEmote.state.image.style.left = `${left}px`;
                    startingOverlayEmote.state.image.style.top = `${0}px`;
                    startingOverlayEmote.state.image.height = individualSlotEmoteSpace * 0.9;
                    startingOverlayEmote.state.image.width = individualSlotEmoteSpace * 0.9;
                }
            }]),
            new EmoteBehaviorList()
        ));
    }

    if (won) {
        let celebrateEmote = message.emotes[message.emotes.length - 1];
        for (let i = 0; i < 10; i++) {
            overlayEmotes.push(new OverlayEmote(
                celebrateEmote,
                new OverlayEmoteState(6),
                new EmoteConfigurerList(new RandomStartPositionConfigurer(), new RandomStartDirectionConfigurer()),
                new EmoteBehaviorList(new ConstantVelocityBehavior(200),
                    new OpacityBehavior(AnimationGraph.fromArrays([[0, 1], [3, 1], [6, 0]])))
            ));
        }
    }

    await ActiveEmotesManager.startOverlayEmotes(overlayEmotes);
}