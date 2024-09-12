// From file: BuiltTypeDefs/EmoteWall/PublicAPI/BuiltInConfigurersAndBehaviors.d.ts
declare class ExplicitStartingDimensionsConfigurer implements IOverlayEmoteConfigurer {
    height: number;
    width: number;
    constructor(height: number, width: number);
    name: "ExplicitStartingDimensions";
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class DurationConfigurer implements IOverlayEmoteConfigurer {
    name: string;
    defaultDuration: number;
    duration: number;
    constructor(duration: number);
    configure(startingOverlayEmote: OverlayEmote): void;
    durationOption: IEditableOption;
    options: IEditableOption[];
}
declare class BoundedStartingSizeConfigurer implements IOverlayEmoteConfigurer {
    static readonly defaultName = "BoundedStartingSize";
    readonly name: any;
    private defaultSize;
    private size;
    constructor(size: number, name?: string);
    configure(startingOverlayEmote: OverlayEmote): void;
    trySetSize(text: string): boolean;
    sizeOption: IEditableOption;
    options: IEditableOption[];
}
declare class RandomStartDirectionConfigurer implements IOverlayEmoteConfigurer {
    static readonly defaultName = "RandomStartDirection";
    readonly name: any;
    constructor(name?: string);
    configure(startingOverlayEmote: OverlayEmote): void;
}
declare class RandomStartPositionConfigurer implements IOverlayEmoteConfigurer {
    static readonly defaultName = "RandomStartPosition";
    readonly name: any;
    constructor(name?: string);
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
    static readonly defaultName = "RotationSpeed";
    readonly name: any;
    private defaultAnimationGraph;
    private animationGraph;
    constructor(animationGraph: AnimationGraph, name?: string);
    protected tryUpdateRotationSpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateRotationSpec;
    rotationSpeedOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOption[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class ScaleMultiplierBehavior implements IOverlayEmoteBehavior {
    static readonly defaultName = "ScaleMultiplier";
    readonly name: any;
    private defaultAnimationGraph;
    private animationGraph;
    constructor(animationGraph: AnimationGraph, name?: string);
    protected tryUpdateScaleSpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateScaleSpec;
    scaleOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOption[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class RotationBehavior implements IOverlayEmoteBehavior {
    static readonly defaultName = "RotationDegrees";
    readonly name: any;
    private defaultAnimationGraph;
    private animationGraph;
    constructor(animationGraph: AnimationGraph, name?: string);
    protected tryUpdateRotationSpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateRotationSpec;
    rotationOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOption[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class VectorVelocityBehavior implements IOverlayEmoteBehavior {
    static readonly defaultName = "VelocityGraph";
    readonly name: any;
    private defaultAnimationGraph;
    private animationGraph;
    constructor(animationGraph: AnimationGraph, name?: string);
    private tryUpdateVelocitySpec;
    apply(overlayEmoteState: OverlayEmoteState): void;
    private tryParseAndUpdateVelocitySpec;
    velocitySpecOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOption[];
    protected _onValueChanged: any;
    get ValueChanged(): ILiteEvent<AnimationGraph>;
}
declare class ConstantVelocityBehavior implements IOverlayEmoteBehavior {
    private velocityPixelsPerSecond;
    static readonly defaultName = "VelocityConstant";
    readonly name: any;
    private readonly defaultSpeedPixelsPerSecond;
    private implementingVectorVelocityBehavior;
    constructor(velocityPixelsPerSecond: number, name?: string);
    constVelocityOption: IEditableOption;
    options: IEditableOption[];
    private tryUpdateConstVelocity;
    apply(overlayEmoteState: OverlayEmoteState): void;
}
declare class RandomConstantVelocityBehavior implements IOverlayEmoteBehavior {
    name: string;
    private defaultMinSpeedPixelsPerSecond;
    private defaultMaxSpeedPixelsPerSecond;
    private minVelocityPixelsPerSecond;
    private maxVelocityPixelsPerSecond;
    constructor(minVelocityPixelsPerSecond: number, maxVelocityPixelsPerSecond: number);
    readonly minVelocityOption: IEditableOption;
    readonly maxVelocityOption: IEditableOption;
    readonly options: IEditableOption[];
    private tryUpdateMinVelocity;
    private tryUpdateMaxVelocity;
    private tryUpdateVelocityPart;
    apply(overlayEmoteState: OverlayEmoteState): void;
}
declare class OpacityBehavior implements IOverlayEmoteBehavior {
    static readonly defaultName = "OpacityGraph";
    readonly name: any;
    protected defaultAnimationGraph: AnimationGraph;
    protected animationGraph: AnimationGraph;
    constructor(animationGraph: AnimationGraph, name?: string);
    tryUpdateOpacitySpec(animationGraph: AnimationGraph): boolean;
    apply(overlayEmoteState: OverlayEmoteState): void;
    opacitySpecOption: IEditableOptionWithVisualizer<AnimationGraph>;
    options: IEditableOption[];
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
    private _defaultSidesToBounce;
    private _sidesToBounce;
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
    static readonly defaultName = "StartOnSide";
    readonly name: any;
    static sideNames: string[];
    static readonly sideToStartWhenNoneSpecified = "none";
    private readonly sideToStartDefault;
    private sideToStart;
    constructor(sideToStart?: string, name?: string);
    configure(startingOverlayEmote: OverlayEmote): void;
    applySideToStart(startingOverlayEmote: OverlayEmote, sideName: string): void;
    sideToStartOption: IEditableOption;
    options: IEditableOption[];
}


// From file: BuiltTypeDefs/EmoteWall/PublicAPI/TransformManager.d.ts
declare class TransformManager {
    properties: Map<string, string>;
    toTransformString(): string;
    applyToElement(element: HTMLElement): void;
}


// From file: BuiltTypeDefs/EmoteWallEntryPoint.d.ts
declare class EmoteConfigurerList extends NamedObjectList<IOverlayEmoteConfigurer> {
}
declare class EmoteBehaviorList extends NamedObjectList<IOverlayEmoteBehavior> {
}
declare class EmoteOverlayPluginCollection {
    static emoteOverlayPlugins: IEmoteOverlayPlugin[];
    static processMessage(message: TwitchMessage): Promise<void>;
    static AnyPluginDemandsFullControl(message: TwitchMessage): boolean;
    static ModifyEmoteDataCollectionForCreationWithDefaultSettings(message: TwitchMessage, emoteDataListBuilder: EmoteDataList): void;
    static ModifyUnInitializedOverlayEmoteCollection(message: TwitchMessage, overlayEmotes: ReadonlyArray<OverlayEmote>): void;
    private static LogPluginError;
}
declare class ActiveEmotesManager {
    private static activeEmotes;
    private static debugNumFrameTimingsToAverage;
    private static debugNextFrameSlot;
    private static debugFrameTimings;
    static incrementTotalErrorCount(): void;
    private static totalErrorCount;
    static debugTotalErrorEvent: LiteEvent<number>;
    static debugPluginFailuresCounts: Map<IEmoteOverlayPlugin, number>;
    static debugPluginFailuresExamples: Map<IEmoteOverlayPlugin, string[]>;
    static debugPluginFailuresEvents: Map<IEmoteOverlayPlugin, LiteEvent<number>>;
    static debugComponentFailuresCounts: WeakMap<IOverlayEmoteConfigurer | IOverlayEmoteBehavior, number>;
    static debugComponentFailuresExamples: WeakMap<IOverlayEmoteConfigurer | IOverlayEmoteBehavior, string[]>;
    static debugComponentFailuresEvents: WeakMap<IOverlayEmoteConfigurer | IOverlayEmoteBehavior, LiteEvent<number>>;
    private static debugRefCountedComponentsCounts;
    private static debugRefCountedComponentsEvents;
    static ensureComponentFailuresTracked(component: (IOverlayEmoteConfigurer | IOverlayEmoteBehavior)): void;
    static registerFailureCountedComponent(component: (IOverlayEmoteConfigurer | IOverlayEmoteBehavior)): ILiteEvent<number>;
    static registerRefCountedComponent(component: (IOverlayEmoteConfigurer | IOverlayEmoteBehavior)): ILiteEvent<number>;
    static adjustToTime(time: number): void;
    static killAll(): void;
    static killIndividual(overlayEmote: OverlayEmote): void;
    static startOverlayEmotes(overlayEmotes: OverlayEmote[]): Promise<void>;
    static animationLoop(): void;
}
/**
 * Register your plugin! Most of the interesting docs are on {@link IEmoteOverlayPlugin}.
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
declare function loadPlugin(url: string, callback: () => void): Promise<void>;
declare function simulateMessage(messageText: string, channelName: string, username: string): void;
interface ITestButton {
    buttonText: string;
    callback: () => void;
}
/**
 * Register your plugin via {@link registerPlugin}
 */
interface IEmoteOverlayPlugin {
    /**
     * May be serialized to the config URL, as well as for display in config UI
     */
    name: string;
    /**
     * Configurers used by the plugin which may be individually enabled/disabled, tracked for performance purposes,
     * and configured in the UI using any {@link IEditableOption}s provided by the Configurer (which should then *not*
     * be included in the {@link options} array for the plugin itself).
     */
    customizableConfigurers?: ReadonlyArray<IOverlayEmoteConfigurer>;
    /**
     * Behaviors used by the plugin which may be individually enabled/disabled, tracked for performance purposes,
     * and configured in the UI using any {@link IEditableOption}s provided by the Behavior (which should then *not*
     * be included in the {@link options} array for the plugin itself).
     */
    customizableBehaviors?: ReadonlyArray<IOverlayEmoteBehavior>;
    /**
     * Plugin-wide options to show in the configuration UI. Customized values will be persisted to URLs and
     * applied after reload. Individual default Configurers and Behaviors can provide their own options as well,
     * and those should not be re-included here.
     */
    options?: ReadonlyArray<IEditableOption>;
    /**
     * Test buttons to be shown in the configuration UI. Useful for fast iteration without repeatedly
     * sending real chat messages.
     */
    testButtons?: ReadonlyArray<ITestButton>;
    /**
     * Return true to take full responsibility for further processing of the message. Use
     * {@link ActiveEmotesManager.startOverlayEmotes} to manually start any {@link OverlayEmote}s yourself.
     */
    TakesFullControl?: (message: TwitchMessage) => boolean;
    /**
     * If no plugin has returned true for {@link TakesFullControl}, then all plugins have an opportunity to
     * modify the list of automatically discovered emotes.
     */
    ModifyEmoteDataList?: (message: TwitchMessage, emoteDataListBuilder: EmoteDataList) => void;
    /**
     * All emotes included after {@link ModifyEmoteDataList} are converted to {@link OverlayEmote}s, which will
     * have all default Configurers and Behaviors attached. Those can be modified at this time.
     */
    ModifyUninitializedOverlayEmotes?: (message: TwitchMessage, overlayEmotes: ReadonlyArray<OverlayEmote>) => void;
}
declare class BoundedIntegerOption implements IEditableOption {
    readonly name: string;
    readonly lowerBound: number;
    readonly upperBound: number;
    readonly defaultValueText: string;
    currentValue: number;
    description: string;
    constructor(name: string, defaultValue: number, lowerBound: number, upperBound: number);
    getCurrentValueText(): string;
    trySetValue(text: string): boolean;
}
declare class BooleanOption implements IEditableOption {
    readonly name: string;
    readonly defaultValueText: string;
    currentValue: boolean;
    description: string;
    constructor(name: string, defaultValue?: boolean);
    getCurrentValueText(): string;
    trySetValue(text: string): boolean;
}
declare class PropertyBag extends Map<string, any> {
    getOrCreate<T>(key: string, factory: () => T): T;
}
declare class OverlayEmoteState {
    duration: number;
    properties: PropertyBag;
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
    constructor(emoteData: EmoteData, state: OverlayEmoteState, configurers?: EmoteConfigurerList, behaviors?: EmoteBehaviorList);
    init(): Promise<void>;
    preAdjustToTime(time: number): boolean;
    adjustToTime(time: number): void;
    protected _onRemoved: LiteEvent<void>;
    get Removed(): ILiteEvent<void>;
    remove(): void;
}
declare class OverlayEmoteFactory {
    static readonly backupDefaultDuration = 4;
    static createEmpty(emoteData: EmoteData): OverlayEmote;
}
/**
 * Each {@link OverlayEmote}'s Configurers are run exactly once, before the image is first shown.
 */
interface IOverlayEmoteConfigurer {
    name: string;
    configure(startingOverlayEmote: OverlayEmote): void;
    options?: ReadonlyArray<IEditableOption>;
}
/**
 * Each {@link OverlayEmote}'s Behaviors are run once per frame. This processing is broken into two phases:
 * - {@link preApply} for reading values from the DOM (including any CSS values to be manipulated)
 * - {@link apply} for writing values to the DOM (including any changed CSS values).
 *
 * It is split this way to minimize layout thrashing, since interleaved reads & writes can cause
 * full layout passes, which are slow. This approach greatly increases the number of concurrent emotes
 * that can render smoothly.
 */
interface IOverlayEmoteBehavior {
    name: string;
    /**
     * All Behaviors across all live {@link OverlayEmote}s are asked to preApply at the same time, before any
     * calls to {@link apply}. Use this opportunity to read values from DOM/CSS, optionally storing them in the
     * {@link OverlayEmoteState.properties} property bag for shared manipulation amongst multiple Behaviors
     * interested in the same property.
     */
    preApply?(overlayEmoteState: OverlayEmoteState): void;
    /**
     * TODO: Continue here.
     */
    apply(overlayEmoteState: OverlayEmoteState): void;
    options?: ReadonlyArray<IEditableOption>;
}
/**
 * Named option to be shown in the configuration UI. Can be attached to individual
 * Configurers and Behaviors or to Plugins themselves. Their names and values will be
 * serialized to URLs, so the API is text-based (but your underlying implementation
 * can store the data however it wants).
 */
interface IEditableOption {
    /**
     * Required name for the option, which will be used in generated URLs
     */
    name: string;
    description?: string;
    defaultValueText: string;
    /**
     * Every edit to the option text in the configuration UI will be passed to this method.
     * Return true if that text is understood and applied, which will turn the option's text box
     * green to indicate success to the user. Return false to indicate an invalid value, which
     * will turn the option's text box red.
     */
    trySetValue(text: string): boolean;
    getCurrentValueText(): string;
}
/**
 * For {@link IEditableOption}s with custom visualizers.
 */
interface IEditableOptionWithVisualizer<T> extends IEditableOption {
    kind: string;
    getCurrentValue(): T;
    setCurrentValue(t: T): void;
    get valueChanged(): ILiteEvent<T>;
}
declare class UIElements {
    static emoteContainerDiv: HTMLDivElement;
    static randomEmoteButton: HTMLButtonElement;
    static randomEmoteLoopSlowButton: HTMLButtonElement;
    static randomEmoteLoopFastButton: HTMLButtonElement;
    static cancelEmoteLoopsButton: HTMLButtonElement;
    static killActiveEmotesButton: HTMLButtonElement;
    static liveEmoteCountSpan: HTMLSpanElement;
    static liveLoopCountSpan: HTMLSpanElement;
    static liveAverageFrameDurationSpan: HTMLSpanElement;
    static configAreaDiv: HTMLDivElement;
    static pluginExamplesList: HTMLUListElement;
    static simulatedMessageText: HTMLInputElement;
    static simulatedMessageChannel: HTMLInputElement;
    static simulatedMessageSender: HTMLInputElement;
    static loadGiganticBucketDefaultPluginsButton: HTMLButtonElement;
    static init(): void;
}


// From file: BuiltTypeDefs/Utilities/NamedObjectList.d.ts
declare class NamedObjectList<T extends {
    name?: string;
}> {
    private _entries;
    constructor(...initialEntries: T[]);
    clear(): void;
    add(entry: T): void;
    addRange(...entries: T[]): void;
    remove(element: T): void;
    removeAllWithName(name: string): void;
    replaceEntryWithNameOrAppend(nameToReplace: string, newEntry: T): void;
    replaceNamedEntryOrAppend(newEntry: T): void;
    get valuesSnapshot(): T[];
    toImmutable(): ReadonlyArray<T>;
    clone(): NamedObjectList<T>;
}


// From file: BuiltTypeDefs/Twitch/TwitchConnection.d.ts
declare class EmoteDataList extends NamedObjectList<EmoteData> {
}
declare enum EmoteOriginKind {
    Twitch = 0,
    BTTVChannel = 1,
    BTTVGlobal = 2,
    Other = 3
}
declare class EmoteData {
    readonly name: string;
    readonly url: string;
    readonly emoteKind: EmoteOriginKind;
    constructor(name: string, url: string, emoteKind?: EmoteOriginKind);
}
declare class TwitchConnection {
    channel: string;
    private messageHandler;
    private static seenChannelIds;
    static globalBTTVEmotes: Map<string, [string, EmoteOriginKind]>;
    channelBTTVEmotes: Map<string, [string, EmoteOriginKind]>;
    constructor(channel: string, messageHandler: (message: TwitchMessage) => void);
    private static initGlobalBTTVEmotes;
    private connectToTwitch;
}
declare class TwitchMessage {
    readonly channel: string;
    readonly tags: any;
    readonly text: string;
    readonly emotes: ReadonlyArray<EmoteData>;
    get username(): string;
    constructor(twitchConnection: TwitchConnection, channel: string, tags: any, text: string);
    get isBroadcaster(): boolean;
}


// From file: BuiltTypeDefs/Physics/Animation.d.ts
declare class Keyframe {
    readonly X: number;
    readonly Y: number;
    constructor(X: number, Y: number);
}
/**
 * Linearly interpolate a value between a set of {@link Keyframe}s.
 */
declare class AnimationGraph {
    readonly keyframes: Keyframe[];
    private constructor();
    static fromKeyframes(keyframes: Keyframe[]): AnimationGraph;
    static fromArrays(arrays: number[][]): AnimationGraph;
    static fromArraysText(text: string): AnimationGraph;
    toString(): string;
    withPrependedKeyframe(keyframe: Keyframe): AnimationGraph;
    evaluate(x: number): number;
}
/**
 * Linearly interpolate between two values.
 */
declare function lerp(start: number, end: number, percent: number): number;
declare function percentBetween(start: number, between: number, end: number): number;


// From file: BuiltTypeDefs/Physics/Geometry.d.ts
declare class TrackSectionShape {
    readonly LeftWall: Wall;
    readonly RightWall: Wall;
    constructor(LeftWall: Wall, RightWall: Wall);
    toPerimeter(extraPixels?: number): Coordinates[];
    splitLengthwise(pieces: number): TrackSectionShape[];
    mergeWith(other: TrackSectionShape): TrackSectionShape;
}
declare class Wall {
    readonly Points: Coordinates[];
    get Start(): Coordinates;
    get End(): Coordinates;
    GetExtended(extraPixels: number): Wall;
    constructor(Points: Coordinates[]);
}
declare class LineSegment {
    readonly Start: Coordinates;
    readonly End: Coordinates;
    constructor(Start: Coordinates, End: Coordinates);
}
declare class Coordinates {
    readonly X: number;
    readonly Y: number;
    constructor(X: number, Y: number);
    vectorFrom(other: Coordinates): Vector;
    vectorTo(other: Coordinates): Vector;
    translate(vector: Vector): Coordinates;
    equals(other: Coordinates): boolean;
    static dist(p0: Coordinates, p1: Coordinates): number;
    toString(): string;
}
declare class Vector {
    readonly magnitude: number;
    readonly xComponent: number;
    readonly yComponent: number;
    readonly direction: number;
    constructor(magnitude: number, direction: number);
    static fromCoordinates(start: Coordinates, end: Coordinates): Vector;
    static fromAngle(radians: number): Vector;
    withMagnitude(magnitude: number): Vector;
    withDirection(direction: number): Vector;
    multiply(c: number): Vector;
    reverse(): Vector;
    dotProduct(other: Vector): number;
    normals(): Vector[];
}
declare class Rectangle {
    readonly X: number;
    readonly Y: number;
    readonly width: number;
    readonly height: number;
    readonly X2: any;
    readonly Y2: any;
    readonly XMid: any;
    readonly YMid: any;
    constructor(X: number, Y: number, width: number, height: number);
    contains(coordinate: Coordinates): boolean;
    static createSurrounding(coordinate: Coordinates, width: number, height: number): Rectangle;
}
declare function normalizeAngle(radians: number): number;


// From file: BuiltTypeDefs/Utilities/SignalRConnection.d.ts
declare class HubConnection {
    private readonly hubName;
    prependedArguments: any[];
    private enabled;
    private readonly hubConnection;
    private readonly onConnected;
    get Connected(): import("./Utilities").ILiteEvent<void>;
    private readonly onDisconnected;
    get Disconnected(): import("./Utilities").ILiteEvent<void>;
    constructor(hubName: string, prependedArguments?: any[], enabled?: boolean);
    private knownHandlerCounts;
    addHandlers(handlers: HubConnectionHandler[]): void;
    invoke(name: string, ...params: any[]): boolean;
    start(): Promise<void>;
}
declare class HubConnectionHandler {
    name: string;
    callback: any;
    constructor(name: string, callback: any);
}


// From file: BuiltTypeDefs/Utilities/StreamerBotWebsocket.d.ts
declare class StreamerBotWebsocket {
    constructor(url: string, actionHandlers?: StreamerBotActionHandler[], customEventHandlers?: StreamerBotCustomEventHandler[]);
    registerCustomEventHandlers(...customEventHandlers: StreamerBotCustomEventHandler[]): void;
    registerActionHandlers(...actionHandlers: StreamerBotActionHandler[]): void;
}
type StreamerBotActionHandler = {
    name: string;
    handler: () => void;
};
type StreamerBotCustomEventHandler = {
    name: string;
    handler: (data: any) => void;
};
