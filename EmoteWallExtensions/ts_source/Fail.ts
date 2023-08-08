let buggyConfigurerOption = new BooleanOption("throwDuringConfigure", false);
let buggyConfigurer: IOverlayEmoteConfigurer = {
    name: "BuggyConfigurer",
    options: [buggyConfigurerOption],
    configure: function (startingOverlayEmote: OverlayEmote): void {
        if (buggyConfigurerOption.currentValue) {
            throw new Error("Test error from a buggy configurer's configure method");
        }
    }
};

let buggyBehaviorPreapplyOption = new BooleanOption("throwDuringPreapply", false);
let buggyBehaviorApplyOption = new BooleanOption("throwDuringApply", false);
let buggyBehavior: IOverlayEmoteBehavior = {
    name: "BuggyBehavior",
    options: [buggyBehaviorPreapplyOption, buggyBehaviorApplyOption],
    preApply: function (overlayEmoteState: OverlayEmoteState): void {
        if (buggyBehaviorPreapplyOption.currentValue) {
            throw new Error("Test error from a buggy behavior's preApply method");
        }
    },
    apply: function(overlayEmoteState: OverlayEmoteState): void {
        if (buggyBehaviorApplyOption.currentValue) {
            throw new Error("Test error from a buggy behavior's apply method");
        }
    }
}

let buggyOptionSetValueOption = new BooleanOption("throwDuringOptionSetValue", false);
let buggyOptionGetCurrentValueOption = new BooleanOption("throwDuringGetCurrentValue", false);

let buggyOptionCurrentValue = "default";
let buggyOption: IEditableOption = {
    name: "optionThatThrows",
    defaultValueText: "default",
    trySetValue: function(text: string): boolean {
        if (buggyOptionSetValueOption.currentValue) {
            throw new Error("Test error from a buggy option's trySetValue method");
        }

        buggyOptionCurrentValue = text;
        return true;
    },
    getCurrentValueText: function(): string {
        if (buggyOptionGetCurrentValueOption.currentValue) {
            throw new Error("Test error from a buggy option's getCurrentValueText method");
        }

        return buggyOptionCurrentValue;
    }
};

let buggyTakesFullControlOption = new BooleanOption("throwDuringTakesFullControl", false);
let buggyModifyEmoteDataListOption = new BooleanOption("throwDuringModifyEmoteDataList", false);
let buggyModifyUninitializedOverlayEmotesOption = new BooleanOption("throwDuringModifyUninitializedOverlayEmotes", false);

registerPlugin({
    name: "BuggyExtensionTester",
    options: [
        buggyTakesFullControlOption, buggyModifyEmoteDataListOption, buggyModifyUninitializedOverlayEmotesOption,
        buggyOptionSetValueOption, buggyOptionGetCurrentValueOption, buggyOption],
    customizableConfigurers: [buggyConfigurer],
    customizableBehaviors: [buggyBehavior],
    TakesFullControl(message: TwitchMessage): boolean {
        if (buggyTakesFullControlOption.currentValue) {
            throw new Error("Test error from a buggy plugin's TakesFullControl method");
        }

        return false;
    },
    ModifyEmoteDataList(message: TwitchMessage, emoteDataListBuilder: EmoteDataList) {
        if (buggyModifyEmoteDataListOption.currentValue) {
            throw new Error("Test error from a buggy plugin's ModifyEmoteDataList method");
        }
    },
    ModifyUninitializedOverlayEmotes(message: TwitchMessage, overlayEmotes: readonly OverlayEmote[]) {
        overlayEmotes.forEach(emote => {
            emote.configurers.add(buggyConfigurer);
            emote.behaviors.add(buggyBehavior);
        });

        if (buggyModifyUninitializedOverlayEmotesOption.currentValue) {
            throw new Error("Test error from a buggy plugin's ModifyUninitializedOverlayEmotes method");
        }
    },    
});