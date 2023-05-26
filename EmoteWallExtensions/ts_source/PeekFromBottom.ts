registerPlugin({
    name: "PeekFromBottom",
    ModifyUninitializedOverlayEmotes(message: TwitchMessage, overlayEmotes: readonly OverlayEmote[]) {
        let peekEmotes = overlayEmotes.filter(e => e.name == "MuncherPls" || e.name == "MuncherYosh");
        if (peekEmotes.length == 0) {
            return;
        }

        let numPeeks = peekEmotes.length;
        let windowWidth = window.innerWidth;
        let peekWidth = 60, peekHeight = 60;

        if (peekWidth * numPeeks <= windowWidth) {
            let widthOccupiedByPeeks = peekWidth * numPeeks;
            let unoccupiedSpace = windowWidth - widthOccupiedByPeeks;
            let widthOfGaps = unoccupiedSpace / (numPeeks + 1);

            for (let i = 0; i < peekEmotes.length; i++) {
                let peekOverlayEmote = peekEmotes[i];
                peekOverlayEmote.configurers.clear();
                let leftOccupiedSpace = i * peekWidth;
                let leftUnoccupiedSpace = (i + 1) * widthOfGaps;
                peekOverlayEmote.configurers.add(
                    new PeekFromBottomConfigurer(peekHeight, peekWidth,
                        leftOccupiedSpace + leftUnoccupiedSpace));
                peekOverlayEmote.behaviors.clear();
                peekOverlayEmote.behaviors.add(new PeekFromBottomBehavior(peekHeight));
                peekOverlayEmote.state.duration = 6;
            }
        }
        else {
            // 0-100% evenly split across numPeeks, 
            let maxLeft = windowWidth - peekWidth;

            for (let i = 0; i < peekEmotes.length; i++) {
                let peekOverlayEmote = peekEmotes[i];
                peekOverlayEmote.configurers.clear();
                peekOverlayEmote.configurers.add(
                    new PeekFromBottomConfigurer(peekHeight, peekWidth,
                        (i / (numPeeks - 1)) * maxLeft));
                peekOverlayEmote.behaviors.clear();
                peekOverlayEmote.behaviors.add(new PeekFromBottomBehavior(peekHeight));
                peekOverlayEmote.state.duration = 6;
            }
        }
    }
});

class PeekFromBottomConfigurer implements IOverlayEmoteConfigurer {
    constructor(private _height: number, private _width: number, private _leftPosition: number) {
    }

    name: "PeekFromBottomConfigurer";
    configure(startingOverlayEmote: OverlayEmote): void {
        startingOverlayEmote.state.image.style.left = `${this._leftPosition}px`;
        startingOverlayEmote.state.image.style.top = `${window.innerHeight + this._height}px`;
        startingOverlayEmote.state.image.height = this._height;
        startingOverlayEmote.state.image.width = this._width;
    }
}

class PeekFromBottomBehavior implements IOverlayEmoteBehavior {
    constructor(private _height: number) { }

    name: "PeekFromBottomBehavior";
    apply(state: OverlayEmoteState): void {
        let offScreenTop = window.innerHeight;
        let onScreenTop = window.innerHeight - this._height;

        let top: number;
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