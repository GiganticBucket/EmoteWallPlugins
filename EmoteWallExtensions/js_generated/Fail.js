let buggyConfigurerOption = new BooleanOption("throwDuringConfigure", false);
let buggyConfigurer = {
    name: "BuggyConfigurer",
    options: [buggyConfigurerOption],
    configure: function (startingOverlayEmote) {
        if (buggyConfigurerOption.currentValue) {
            throw new Error("Test error from a buggy configurer's configure method");
        }
    }
};
let buggyBehaviorPreapplyOption = new BooleanOption("throwDuringPreapply", false);
let buggyBehaviorApplyOption = new BooleanOption("throwDuringApply", false);
let buggyBehavior = {
    name: "BuggyBehavior",
    options: [buggyBehaviorPreapplyOption, buggyBehaviorApplyOption],
    preApply: function (overlayEmoteState) {
        if (buggyBehaviorPreapplyOption.currentValue) {
            throw new Error("Test error from a buggy behavior's preApply method");
        }
    },
    apply: function (overlayEmoteState) {
        if (buggyBehaviorApplyOption.currentValue) {
            throw new Error("Test error from a buggy behavior's apply method");
        }
    }
};
let buggyOptionSetValueOption = new BooleanOption("throwDuringOptionSetValue", false);
let buggyOptionGetCurrentValueOption = new BooleanOption("throwDuringGetCurrentValue", false);
let buggyOptionCurrentValue = "default";
let buggyOption = {
    name: "optionThatThrows",
    defaultValueText: "default",
    trySetValue: function (text) {
        if (buggyOptionSetValueOption.currentValue) {
            throw new Error("Test error from a buggy option's trySetValue method");
        }
        buggyOptionCurrentValue = text;
        return true;
    },
    getCurrentValueText: function () {
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
        buggyOptionSetValueOption, buggyOptionGetCurrentValueOption, buggyOption
    ],
    customizableConfigurers: [buggyConfigurer],
    customizableBehaviors: [buggyBehavior],
    TakesFullControl(message) {
        if (buggyTakesFullControlOption.currentValue) {
            throw new Error("Test error from a buggy plugin's TakesFullControl method");
        }
        return false;
    },
    ModifyEmoteDataList(message, emoteDataListBuilder) {
        if (buggyModifyEmoteDataListOption.currentValue) {
            throw new Error("Test error from a buggy plugin's ModifyEmoteDataList method");
        }
    },
    ModifyUninitializedOverlayEmotes(message, overlayEmotes) {
        overlayEmotes.forEach(emote => {
            emote.configurers.add(buggyConfigurer);
            emote.behaviors.add(buggyBehavior);
        });
        if (buggyModifyUninitializedOverlayEmotesOption.currentValue) {
            throw new Error("Test error from a buggy plugin's ModifyUninitializedOverlayEmotes method");
        }
    },
});
//# sourceMappingURL=Fail.js.map