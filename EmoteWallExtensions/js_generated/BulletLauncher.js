registerPlugin({
    name: "BarrelRoll",
    ModifyEmoteDataList(message, emoteDataListBuilder) {
        const barrelRollEmoteNames = ["gigant15BarrelRoll"];
        let barrelRolls = emoteDataListBuilder.valuesSnapshot.filter(e => barrelRollEmoteNames.includes(e.name));
        if (barrelRolls.length > 0) {
            for (let barrelRollEmoteName of barrelRollEmoteNames) {
                emoteDataListBuilder.removeAllWithName(barrelRollEmoteName);
            }
            LaunchBarrelRolls(barrelRolls);
        }
    },
    testButtons: [{
            buttonText: "Test 5",
            callback() {
                LaunchBarrelRolls(makeBarrelRollEmotes(5));
            }
        },
        {
            buttonText: "Test 30",
            callback() {
                LaunchBarrelRolls(makeBarrelRollEmotes(30));
            }
        }]
});
function makeBarrelRollEmotes(n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(new EmoteData("gigant15BarrelRoll", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c6b03ec35ed2489eb6dbe21dedee0a94/default/light/3.0", EmoteOriginKind.Twitch));
    }
    return result;
}
async function LaunchBarrelRolls(barrelRolls) {
    let dimension = 90;
    let initialSleepMS = 100;
    let delayBetweenLaunchesMS = 360;
    let lastLaunchApproximatelyAtMS = initialSleepMS + delayBetweenLaunchesMS * (barrelRolls.length - 1);
    let lastLaunchApproximatelyAtSeconds = lastLaunchApproximatelyAtMS / 1000;
    let endTimeSeconds = 2 + lastLaunchApproximatelyAtSeconds;
    let bulletEmote = new OverlayEmote(new EmoteData("barrelRolls.bulletLauncher", "https://giganticbucket.github.io/EmoteWallPlugins/EmoteWallExtensions/assets/BulletLauncher.png"), new OverlayEmoteState(2 + lastLaunchApproximatelyAtSeconds), new EmoteConfigurerList(new BulletLauncherConfigurer()), new EmoteBehaviorList(new BulletLauncherBehavior(), new OpacityBehavior(AnimationGraph.fromArrays([[0, 1], [lastLaunchApproximatelyAtSeconds, 1], [endTimeSeconds, 0]]))));
    ActiveEmotesManager.startOverlayEmotes([bulletEmote]);
    await sleep(initialSleepMS);
    let numToFire = Math.min(barrelRolls.length, 20);
    for (let i = 0; i < numToFire; i++) {
        let movingDown = bulletEmote.state.properties.get("movingDown");
        let angle = fuzzNumber(movingDown ? 0 : -Math.PI / 5, Math.PI / 8);
        let startTop = bulletEmote.state.properties.get("top") +
            (movingDown ? 25 : -6);
        let configurers = new EmoteConfigurerList(new BoundedStartingSizeConfigurer(dimension), new InitialVelocityConfigurer(angle, fuzzNumber(550, 50)), new InitialPositionConfigurer(0, startTop));
        let behaviors = new EmoteBehaviorList(new GravityBehavior(450, 0.85), new OpacityBehavior(AnimationGraph.fromArrays([[0, 1], [14, 1], [16, 0]])), new BounceOffWallsBehavior([false, false, false, false]));
        let barrelRollOverlayEmote = new OverlayEmote(barrelRolls[i], new OverlayEmoteState(12), configurers, behaviors);
        barrelRollOverlayEmote.behaviors.removeAllWithName(BounceOffWallsBehavior.name);
        ActiveEmotesManager.startOverlayEmotes([barrelRollOverlayEmote]);
        await sleep(delayBetweenLaunchesMS);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class BulletLauncherConfigurer {
    constructor() {
        this.name = "Bullet Launcher Configurer";
    }
    configure(startingOverlayEmote) {
        startingOverlayEmote.state.image.style.top = "200px";
        startingOverlayEmote.state.image.height = 1900;
        startingOverlayEmote.state.image.width = 80;
        startingOverlayEmote.state.image.style.zIndex = "5";
        startingOverlayEmote.state.properties.set("movingDown", true);
    }
}
class BulletLauncherBehavior {
    preApply(overlayEmoteState) {
        if (!overlayEmoteState.properties.has("top")) {
            let top = Number(overlayEmoteState.image.style.top.endsWith("px") ? overlayEmoteState.image.style.top.slice(0, -2) : 0);
            overlayEmoteState.properties.set("top", top);
        }
    }
    apply(overlayEmoteState) {
        // transition top from 200 to 600 every 2 seconds
        let periodSeconds = 4;
        let halfPeriod = periodSeconds / 2;
        let timeWithinPeriod = overlayEmoteState.elapsedSeconds % periodSeconds;
        let top;
        if (timeWithinPeriod <= periodSeconds / 2) {
            overlayEmoteState.properties.set("movingDown", true);
            let percentThroughThisPart = timeWithinPeriod / halfPeriod;
            top = lerp(200, 600, percentThroughThisPart);
        }
        else {
            overlayEmoteState.properties.set("movingDown", false);
            let percentThroughThisPart = (timeWithinPeriod - halfPeriod) / halfPeriod;
            top = lerp(600, 200, percentThroughThisPart);
        }
        overlayEmoteState.properties.set("top", top);
        overlayEmoteState.image.style.top = `${top}px`;
    }
}
function fuzzNumber(input, maxPlusOrMinusAmount) {
    let plusOrMinusAmount = (Math.random() * maxPlusOrMinusAmount) - (maxPlusOrMinusAmount / 2);
    return input + plusOrMinusAmount;
}
//# sourceMappingURL=BulletLauncher.js.map