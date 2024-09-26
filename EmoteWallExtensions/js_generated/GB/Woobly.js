GB_Woobly_Setup();
function GB_Woobly_Setup() {
    const wooblyEmotes = ["stream559WOOBLY", "nikdudWoobly"];
    const allowedUsers = ["streaminleeman", "nikduden7", "giganticbucket"];
    registerPlugin({
        name: "Woobly",
        testButtons: [{
                buttonText: "Test 1",
                callback: () => testWoobles(1)
            },
            {
                buttonText: "Test 10",
                callback: () => testWoobles(10)
            },
            {
                buttonText: "Test 30",
                callback: () => testWoobles(30)
            },
            {
                buttonText: "Test 100",
                callback: () => testWoobles(100)
            }],
        ModifyEmoteDataList(message, emoteDataListBuilder) {
            if (!allowedUsers.includes(message.username.toLowerCase())) {
                return;
            }
            let wooblyEmotes = emoteDataListBuilder.valuesSnapshot.filter(e => wooblyEmotes.includes(e.name));
            if (wooblyEmotes.length == 0) {
                return;
            }
            for (let wooblyEmote of wooblyEmotes) {
                emoteDataListBuilder.removeAllWithName(wooblyEmote);
            }
            runWoobles(wooblyEmotes);
        }
    });
    function runWoobles(wooblyEmotes) {
        let numPeeks = wooblyEmotes.length;
        let windowWidth = window.innerWidth;
        let peekWidth = 60, peekHeight = 200;
        let overlayEmotes = [];
        for (let i = 0; i < wooblyEmotes.length; i++) {
            overlayEmotes.push(new OverlayEmote(wooblyEmotes[i], new OverlayEmoteState(6), new EmoteConfigurerList(new PeekFromBottomTallConfigurer(peekHeight, peekWidth, calculateLeftPosition(i))), new EmoteBehaviorList(new PeekFromBottomTallBehavior(peekHeight), new OpacityBehavior(AnimationGraph.fromArrays([[0, 0.75]]), "PeekFromBottomTallOpacityBehavior"))));
        }
        ActiveEmotesManager.startOverlayEmotes(overlayEmotes);
        function calculateLeftPosition(i) {
            if (peekWidth * numPeeks <= windowWidth) {
                const widthOccupiedByPeeks = peekWidth * numPeeks;
                const unoccupiedSpace = windowWidth - widthOccupiedByPeeks;
                const widthOfGaps = unoccupiedSpace / (numPeeks + 1);
                const leftOccupiedSpace = i * peekWidth;
                const leftUnoccupiedSpace = (i + 1) * widthOfGaps;
                return leftOccupiedSpace + leftUnoccupiedSpace;
            }
            else {
                // 0-100% evenly split across numPeeks, 
                const maxLeft = windowWidth - peekWidth;
                return (i / (numPeeks - 1)) * maxLeft;
            }
        }
    }
    function testWoobles(count) {
        let emotes = [];
        for (let i = 0; i < count; i++) {
            emotes.push(new EmoteData("stream559WOOBLY", "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_e84788e6811c43cdb5f1d768e8e53fdb/default/light/3.0", EmoteOriginKind.Twitch));
        }
        runWoobles(emotes);
    }
    class PeekFromBottomTallConfigurer {
        constructor(_height, _width, _leftPosition) {
            this._height = _height;
            this._width = _width;
            this._leftPosition = _leftPosition;
        }
        configure(startingOverlayEmote) {
            startingOverlayEmote.state.image.style.left = `${this._leftPosition}px`;
            startingOverlayEmote.state.image.style.top = `${window.innerHeight + this._height}px`;
            startingOverlayEmote.state.image.height = this._height;
            startingOverlayEmote.state.image.width = this._width;
        }
    }
    class PeekFromBottomTallBehavior {
        constructor(_height) {
            this._height = _height;
        }
        apply(state) {
            let offScreenTop = window.innerHeight;
            let onScreenTop = window.innerHeight - this._height;
            let top;
            if (state.elapsedSeconds < 2) {
                top = lerp(offScreenTop, onScreenTop, state.elapsedSeconds / 2);
            }
            else if (state.elapsedSeconds < 4) {
                top = onScreenTop;
            }
            else {
                top = lerp(onScreenTop, offScreenTop, (state.elapsedSeconds - 4) / 2);
            }
            state.image.style.top = `${top}px`;
        }
    }
}
//# sourceMappingURL=Woobly.js.map