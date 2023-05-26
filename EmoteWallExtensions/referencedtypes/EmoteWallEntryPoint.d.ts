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
}
declare class ExplicitStartingDimensionsConfigurer implements IOverlayEmoteConfigurer {
    height: number;
    width: number;
    constructor(height: number, width: number);
    name: "Explicit Starting Dimensions Configurer";
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class BoundedStartingSizeConfigurer implements IOverlayEmoteConfigurer {
    private _dimension;
    private static defaultStartingSize;
    get dimension(): number;
    private static _instance;
    static get DefaultInstance(): BoundedStartingSizeConfigurer;
    constructor(_dimension: number);
    configure(startingOverlayEmote: OverlayEmote): void;
    trySetSize(text: string): boolean;
    sizeOption: IEditableOption;
}
declare class RandomStartVelocityAngleConfigurer implements IOverlayEmoteConfigurer {
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class RandomStartPositionConfigurer implements IOverlayEmoteConfigurer {
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class InitialPositionConfigurer implements IOverlayEmoteConfigurer {
    private _left;
    private _top;
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
    constructor(_gravityConstant: number, _reboundMultiplier: number);
    name: "GravityBehavior";
    preApply(overlayEmoteState: OverlayEmoteState): void;
    apply(overlayEmoteState: OverlayEmoteState): void;
}
declare class VectorVelocityBehavior implements IOverlayEmoteBehavior {
    protected currentExpandedVelocityChart: [startSeconds: number, startPixelsPerSecond: number, endSeconds: number, endPixelsPerSecond: number][];
    protected currentVelocitySpec: [secondsFromStart: number, pixelsPerSecond: number][];
    private static defaultVelocitySpec;
    private static _instance;
    static get DefaultInstance(): VectorVelocityBehavior;
    constructor(velocitySpec: [secondsFromStart: number, pixelsPerSecond: number][]);
    protected tryUpdateVelocitySpec(velocitySpec: [secondsFromStart: number, pixelsPerSecond: number][]): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateVelocitySpec;
    velocitySpecOption: IEditableOption;
}
declare class ConstantVelocityBehavior extends VectorVelocityBehavior implements IOverlayEmoteBehavior {
    private static defaultSpeedPixelsPerSecond;
    private static _constantVelocityInstance;
    static get DefaultInstance(): ConstantVelocityBehavior;
    constructor(velocityPixelsPerSecond: number);
    constVelocityOption: IEditableOption;
    private updateConstVelocity;
}
declare class OpacityBehavior implements IOverlayEmoteBehavior {
    protected currentExpandedOpacityChart: [startSeconds: number, startOpacity: number, endSeconds: number, endOpacity: number][];
    protected currentOpacitySpec: [secondsFromStart: number, opacity: number][];
    private static defaultOpacitySpec;
    private static _instance;
    static get DefaultInstance(): OpacityBehavior;
    constructor(opacitySpec: [secondsFromStart: number, opacity: number][]);
    tryUpdateOpacitySpec(opacitySpec: [secondsFromStart: number, opacity: number][]): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    opacitySpecOption: IEditableOption;
    private tryParseAndUpdateOpacitySpec;
}
declare class BounceOffWallsBehavior implements IOverlayEmoteBehavior {
    name: "BounceOffWallsBehavior";
    private static topIndex;
    private static rightIndex;
    private static bottomIndex;
    private static leftIndex;
    private static defaultSidesToBounce;
    private _sidesToBounce;
    constructor(sidesToBounceTRBL?: boolean[]);
    preApply(overlayEmoteState: OverlayEmoteState): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    reflectAngleX(overlayEmoteState: OverlayEmoteState): void;
    reflectAngleY(overlayEmoteState: OverlayEmoteState): void;
}
declare class StartOnSideConfigurer implements IOverlayEmoteConfigurer {
    private sideToStart;
    readonly sideNames: string[];
    static readonly sideToStartDefault = "all";
    constructor(sideToStart?: string);
    name: "StartOnSideConfigurer";
    configure(startingOverlayEmote: OverlayEmote): void;
    applySideToStart(startingOverlayEmote: OverlayEmote, sideName: string): void;
    sideToStartOption: IEditableOption;
}
declare class OverlayEmoteFactory {
    static defaultStartingSizeConfigurer: BoundedStartingSizeConfigurer;
    static defaultRandomStartPositionConfigurer: RandomStartPositionConfigurer;
    static defaultRandomStartVelocityAngleConfigurer: RandomStartVelocityAngleConfigurer;
    static defaultConfigurers: ReadonlyArray<IOverlayEmoteConfigurer>;
    static defaultOpacityBehavior: OpacityBehavior;
    static defaultVectorVelocityBehavior: VectorVelocityBehavior;
    static defaultBounceOffWallsBehavior: BounceOffWallsBehavior;
    static defaultBehaviors: ReadonlyArray<IOverlayEmoteBehavior>;
    static defaultDuration: number;
    static createDefault(emoteData: EmoteData): OverlayEmote;
}
interface IOverlayEmoteConfigurer {
    name?: string;
    configure(startingOverlayEmote: OverlayEmote): void;
}
interface IOverlayEmoteBehavior {
    name?: string;
    preApply?(overlayEmoteState: OverlayEmoteState): void;
    apply(overlayEmoteState: OverlayEmoteState): void;
}
interface IEditableOption {
    name: string;
    defaultValueText: string;
    trySetValue(text: string): boolean;
    getCurrentValueText(): string;
}
declare function lerp(start: number, end: number, percent: number): number;