registerPlugin({
    name: "Barrel Roll",
    ModifyEmoteDataList(message: TwitchMessage, emoteDataListBuilder: EmoteDataList) {
        const barrelRollEmoteNames: string[] = ["gigant15BarrelRoll"];

        let barrelRolls = emoteDataListBuilder.valuesSnapshot.filter(e => barrelRollEmoteNames.includes(e.name));
        if (barrelRolls.length > 0) {
            for (let barrelRollEmoteName of barrelRollEmoteNames) {
                emoteDataListBuilder.removeAllWithName(barrelRollEmoteName);
            }

            LaunchBarrelRolls(barrelRolls);
        }

        async function LaunchBarrelRolls(barrelRolls: EmoteData[]) {
            let dimension = 90;

            let initialSleepMS = 100;
            let delayBetweenLaunchesMS = 360;
            let lastLaunchApproximatelyAtMS = initialSleepMS + delayBetweenLaunchesMS * (barrelRolls.length - 1);
            let lastLaunchApproximatelyAtSeconds = lastLaunchApproximatelyAtMS / 1000;
            let endTimeSeconds = 2 + lastLaunchApproximatelyAtSeconds;
            let bulletEmote = new OverlayEmote(
                new EmoteData("barrelRolls.bulletLauncher", "https://giganticbucket.github.io/EmoteWallExtensions/assets/BulletLauncher.png.jpg"),
                new OverlayEmoteState(2 + lastLaunchApproximatelyAtSeconds),
                new EmoteConfigurerList(new BulletLauncherConfigurer()),
                new EmoteBehaviorList(new BulletLauncherBehavior(), new OpacityBehavior([[0, 1], [lastLaunchApproximatelyAtSeconds, 1], [endTimeSeconds, 0]])));
            ActiveEmotesManager.startOverlayEmotes([bulletEmote]);

            await sleep(initialSleepMS);

            let numToFire = Math.min(barrelRolls.length, 20);
            for (let i = 0; i < numToFire; i++) {
                let movingDown = <boolean>bulletEmote.state.properties.get("movingDown");
                let angle = fuzzNumber(movingDown ? 0 : -Math.PI / 5, Math.PI / 8);

                let startTop = <number>bulletEmote.state.properties.get("top") +
                    (movingDown ? 25 : -6);
                let configurers = new EmoteConfigurerList(
                    new BoundedStartingSizeConfigurer(dimension),
                    new InitialVelocityConfigurer(angle, fuzzNumber(300, 50)),
                    new InitialPositionConfigurer(0, startTop));

                let behaviors = new EmoteBehaviorList(
                    new GravityBehavior(450, 0.85),
                    new OpacityBehavior([[0, 1], [14, 1], [16, 0]]));

                let barrelRollOverlayEmote = new OverlayEmote(barrelRolls[i], new OverlayEmoteState(12), configurers, behaviors);
                ActiveEmotesManager.startOverlayEmotes([barrelRollOverlayEmote]);
                await sleep(delayBetweenLaunchesMS);
            }

            function sleep(ms: number): Promise<void> {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }
    }
});

class BulletLauncherConfigurer implements IOverlayEmoteConfigurer {
    name = "Bullet Launcher Configurer";
    configure(startingOverlayEmote: OverlayEmote) {
        startingOverlayEmote.state.image.style.top = "200px";
        startingOverlayEmote.state.image.height = 1900;
        startingOverlayEmote.state.image.width = 80;
        startingOverlayEmote.state.image.style.zIndex = "5";
        startingOverlayEmote.state.properties.set("movingDown", true);
    }
}

class BulletLauncherBehavior implements IOverlayEmoteBehavior {
    name: "Bullet Launcher Behavior";
    preApply(overlayEmoteState: OverlayEmoteState) {
        if (!overlayEmoteState.properties.has("top")) {
            let top = Number(overlayEmoteState.image.style.top.endsWith("px") ? overlayEmoteState.image.style.top.slice(0, -2) : 0);
            overlayEmoteState.properties.set("top", top);
        }
    }
    apply(overlayEmoteState: OverlayEmoteState) {
        // transition top from 200 to 600 every 2 seconds
        let periodSeconds = 4;
        let halfPeriod = periodSeconds / 2;
        let timeWithinPeriod = overlayEmoteState.elapsedSeconds % periodSeconds;
        let top: number;
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

function fuzzNumber(input: number, maxPlusOrMinusAmount: number): number {
    let plusOrMinusAmount = (Math.random() * maxPlusOrMinusAmount) - (maxPlusOrMinusAmount / 2);
    return input + plusOrMinusAmount;
}