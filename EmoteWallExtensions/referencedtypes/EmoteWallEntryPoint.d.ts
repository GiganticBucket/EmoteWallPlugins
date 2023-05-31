declare class EmoteConfigurerList extends NamedObjectList<IOverlayEmoteConfigurer> {
}
declare class EmoteBehaviorList extends NamedObjectList<IOverlayEmoteBehavior> {
}
declare class ActiveEmotesManager {
    private static activeEmotes;
    private static debugNumFrameTimingsToAverage;
    private static debugNextFrameSlot;
    private static debugFrameTimings;
    static adjustToTime(time: number): void;
    static startOverlayEmotes(overlayEmotes: OverlayEmote[]): Promise<void>;
    static animationLoop(): void;
}
/**
 * Uhh...
 *
 * @example
 * To only change the default configuration for every overlay emote created:
 * ```ts
 * registerPlugin(
 *   overrideDefaultConfigurers: [
 *   ]);
 * ```
 *
 * @example
 * To simulate a bttv emote without actually having the bttv emote, do this:
 * ```ts
 * registerPlugin(
 *   ModifyEmoteDataList: (message: TwitchMessage, emoteDataListBuilder: EmoteDataList): void => {
 *     if (message.text.toLowerCase().split(' ').includes("cooper")) {
 *         emoteDataListBuilder.add(new EmoteData("cooper", "https://giganticbucket.github.io/TestingGithubPages/CooperCute.jpg", EmoteOriginKind.Other));
 *     }
 *   });
 * ```
 */
declare function registerPlugin(plugin: IEmoteOverlayPlugin): void;
declare function addOrUseExistingScriptReference(url: string, callback: () => void): void;
declare function simulateMessage(messageText: string, channelName: string, username: string): void;
interface ITestButton {
    buttonText: string;
    callback: () => void;
}
/**
 * Register your plugin via {@link registerPlugin}
 */
interface IEmoteOverlayPlugin {
    name: string;
    overrideDefaultConfigurers?: ReadonlyArray<IOverlayEmoteConfigurer>;
    overrideDefaultBehaviors?: ReadonlyArray<IOverlayEmoteBehavior>;
    options?: ReadonlyArray<IEditableOption>;
    testButtons?: ReadonlyArray<ITestButton>;
    TakesFullControl?: (message: TwitchMessage) => boolean;
    ModifyEmoteDataList?: (message: TwitchMessage, emoteDataListBuilder: EmoteDataList) => void;
    ModifyUninitializedOverlayEmotes?: (message: TwitchMessage, overlayEmotes: ReadonlyArray<OverlayEmote>) => void;
}
declare class OverlayEmoteState {
    duration: number;
    properties: Map<string, any>;
    constructor(duration: number);
    image: HTMLImageElement;
    elapsedSeconds: number;
    secondsSinceLastFrame: number;
}
declare class OverlayEmote {
    emoteData: EmoteData;
    state: OverlayEmoteState;
    configurers: EmoteConfigurerList;
    behaviors: EmoteBehaviorList;
    private startTime;
    get name(): string;
    setStartTime(startTime: number): void;
    constructor(emoteData: EmoteData, state: OverlayEmoteState, configurers: EmoteConfigurerList, behaviors: EmoteBehaviorList);
    init(): Promise<void>;
    preAdjustToTime(time: number): boolean;
    adjustToTime(time: number): void;
    protected _onRemoved: LiteEvent<void>;
    get Removed(): ILiteEvent<void>;
    remove(): void;
}
declare class ExplicitStartingDimensionsConfigurer implements IOverlayEmoteConfigurer {
    height: number;
    width: number;
    constructor(height: number, width: number);
    name: "ExplicitStartingDimensions";
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class BoundedStartingSizeConfigurer implements IOverlayEmoteConfigurer {
    private _dimension;
    name: string;
    private static defaultStartingSize;
    get dimension(): number;
    private static _instance;
    static get DefaultInstance(): BoundedStartingSizeConfigurer;
    constructor(_dimension: number);
    configure(startingOverlayEmote: OverlayEmote): void;
    trySetSize(text: string): boolean;
    sizeOption: IEditableOption;
    options: IEditableOption[];
}
declare class RandomStartDirectionConfigurer implements IOverlayEmoteConfigurer {
    name: string;
    private static _instance;
    static get DefaultInstance(): RandomStartDirectionConfigurer;
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class RandomStartPositionConfigurer implements IOverlayEmoteConfigurer {
    name: string;
    private static _instance;
    static get DefaultInstance(): RandomStartPositionConfigurer;
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class InitialPositionConfigurer implements IOverlayEmoteConfigurer {
    private _left;
    private _top;
    name: string;
    constructor(_left: number, _top: number);
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class InitialVelocityConfigurer implements IOverlayEmoteConfigurer {
    private _angle;
    private _speedPixelsPerSecond;
    constructor(_angle: number, _speedPixelsPerSecond: number);
    name: string;
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class GravityBehavior implements IOverlayEmoteBehavior {
    private _gravityConstant;
    private _reboundMultiplier;
    name: string;
    constructor(_gravityConstant: number, _reboundMultiplier: number);
    preApply(overlayEmoteState: OverlayEmoteState): void;
    apply(overlayEmoteState: OverlayEmoteState): void;
}
declare class RotationSpeedBehavior implements IOverlayEmoteBehavior {
    name: string;
    protected animationGraph: AnimationGraph;
    private static defaultAnimationGraph;
    private static _instance;
    static get DefaultInstance(): RotationSpeedBehavior;
    constructor(animationGraph: AnimationGraph);
    protected tryUpdateRotationSpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateRotationSpec;
    rotationSpeedOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOptionWithVisualizer<AnimationGraph>[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class RotationBehavior implements IOverlayEmoteBehavior {
    name: string;
    protected animationGraph: AnimationGraph;
    private static defaultAnimationGraph;
    private static _instance;
    static get DefaultInstance(): RotationBehavior;
    constructor(animationGraph: AnimationGraph);
    protected tryUpdateRotationSpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateRotationSpec;
    rotationOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOptionWithVisualizer<AnimationGraph>[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class VectorVelocityBehavior implements IOverlayEmoteBehavior {
    name: string;
    protected animationGraph: AnimationGraph;
    private static defaultAnimationGraph;
    private static _instance;
    static get DefaultInstance(): VectorVelocityBehavior;
    constructor(animationGraph: AnimationGraph);
    protected tryUpdateVelocitySpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateVelocitySpec;
    velocitySpecOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOptionWithVisualizer<AnimationGraph>[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class ConstantVelocityBehavior implements IOverlayEmoteBehavior {
    private velocityPixelsPerSecond;
    name: string;
    private _vectorVelocityBehavior;
    private static defaultSpeedPixelsPerSecond;
    private static _constantVelocityInstance;
    static get DefaultInstance(): ConstantVelocityBehavior;
    constructor(velocityPixelsPerSecond: number);
    constVelocityOption: IEditableOption;
    options: IEditableOption[];
    private tryUpdateConstVelocity;
    apply(overlayEmoteState: OverlayEmoteState): void;
}
declare class OpacityBehavior implements IOverlayEmoteBehavior {
    name: string;
    protected animationGraph: AnimationGraph;
    private static defaultAnimationGraph;
    private static _instance;
    static get DefaultInstance(): OpacityBehavior;
    constructor(animationGraph: AnimationGraph);
    tryUpdateOpacitySpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    opacitySpecOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOptionWithVisualizer<AnimationGraph>[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
    private tryParseAndUpdateOpacitySpec;
}
declare class BounceOffWallsBehavior implements IOverlayEmoteBehavior {
    name: string;
    private static topIndex;
    private static rightIndex;
    private static bottomIndex;
    private static leftIndex;
    private static defaultSidesToBounce;
    private _sidesToBounce;
    private static _instance;
    static get DefaultInstance(): BounceOffWallsBehavior;
    constructor(sidesToBounceTRBL?: boolean[]);
    updateSidesToBounce(sidesToBounceTRBL: boolean[]): void;
    preApply(overlayEmoteState: OverlayEmoteState): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    reflectAngleX(overlayEmoteState: OverlayEmoteState): void;
    reflectAngleY(overlayEmoteState: OverlayEmoteState): void;
    bounceOption: IEditableOption;
    options: IEditableOption[];
}
declare class StartOnSideConfigurer implements IOverlayEmoteConfigurer {
    private sideToStart;
    name: string;
    static sideNames: string[];
    static readonly sideToStartDefault = "all";
    private static _instance;
    static get DefaultInstance(): StartOnSideConfigurer;
    constructor(sideToStart?: string);
    configure(startingOverlayEmote: OverlayEmote): void;
    applySideToStart(startingOverlayEmote: OverlayEmote, sideName: string): void;
    sideToStartOption: IEditableOption;
    options: IEditableOption[];
}
declare class OverlayEmoteFactory {
    static defaultConfigurers: ReadonlyArray<IOverlayEmoteConfigurer>;
    static defaultBehaviors: ReadonlyArray<IOverlayEmoteBehavior>;
    static excludedDefaultConfigurers: IOverlayEmoteConfigurer[];
    static excludedDefaultBehaviors: IOverlayEmoteBehavior[];
    static createDefault(emoteData: EmoteData): OverlayEmote;
}
interface IOverlayEmoteConfigurer {
    name: string;
    configure(startingOverlayEmote: OverlayEmote): void;
    options?: ReadonlyArray<IEditableOption>;
}
interface IOverlayEmoteBehavior {
    name: string;
    preApply?(overlayEmoteState: OverlayEmoteState): void;
    apply(overlayEmoteState: OverlayEmoteState): void;
    options?: ReadonlyArray<IEditableOption>;
}
interface IEditableOption {
    name: string;
    defaultValueText: string;
    trySetValue(text: string): boolean;
    getCurrentValueText(): string;
}
interface IEditableOptionWithVisualizer<T> extends IEditableOption {
    kind: string;
    getCurrentValue(): T;
    setCurrentValue(t: T): void;
    get valueChanged(): ILiteEvent<T>;
}
