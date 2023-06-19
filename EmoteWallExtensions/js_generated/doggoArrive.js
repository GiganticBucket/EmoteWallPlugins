let doggoOpacityBehavior = new OpacityBehavior(AnimationGraph.fromArrays([[0, 0.1], [4, .1], [5, 0]]));
//let doggoScaleBehavior = new ScaleMultiplierBehavior(AnimationGraph.fromArrays([[0, 1], [5, 80]]));
registerPlugin({
    name: "DoggoArrive",
    ModifyEmoteDataList(message, emoteDataListBuilder) {
        let doggos = emoteDataListBuilder.valuesSnapshot.filter(e => e.name === "doggoArrive");
        if (doggos.length >= 1) {
            emoteDataListBuilder.removeAllWithName("doggoArrive");
            FunStuff(doggos[0]);
        }
    },
    testButtons: [
        {
            buttonText: "Arrive!",
            callback: () => { simulateMessage("doggoArrive doggoArrive doggoArrive", "foo", "foo"); }
        }
    ],
    editableBehaviors: [
        doggoOpacityBehavior
    ]
});
async function FunStuff(doggoData) {
    for (let i = 0; i < 10; i++) {
        let emote = new OverlayEmote(doggoData, new OverlayEmoteState(5), new EmoteConfigurerList(new DoggoConfigurer(), new InitialPositionConfigurer(window.innerWidth / 2, window.innerHeight / 2), new InitialVelocityConfigurer(0, 0), new ExplicitStartingDimensionsConfigurer(50, 50)), new EmoteBehaviorList(new DoggoBehavior(), doggoOpacityBehavior));
        ActiveEmotesManager.startOverlayEmotes([emote]);
        await sleep(200);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class DoggoConfigurer {
    configure(startingOverlayEmote) {
        startingOverlayEmote.state.image.style.zIndex = "-1";
    }
}
class DoggoBehavior {
    apply(overlayEmoteState) {
        let startDimension = 50;
        let endDimension = 4000;
        let duration = 5;
        let percentThroughAnimation = overlayEmoteState.elapsedSeconds / duration;
        let dimension = lerp(startDimension, endDimension, percentThroughAnimation);
        let scale = dimension / startDimension;
        overlayEmoteState.image.style.transform = `scale(${scale})`;
    }
}
//# sourceMappingURL=doggoArrive.js.map