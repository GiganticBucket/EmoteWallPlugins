declare class Coordinates {
    readonly X: number;
    readonly Y: number;
    constructor(X: number, Y: number);
    vectorFrom(other: Coordinates): Vector;
    translate(vector: Vector): Coordinates;
    static dist(p0: Coordinates, p1: Coordinates): number;
    toString(): string;
}
declare class Vector {
    readonly magnitude: number;
    readonly direction: number;
    readonly xComponent: number;
    readonly yComponent: number;
    constructor(magnitude: number, direction: number);
    static fromCoordinates(start: Coordinates, end: Coordinates): Vector;
    static fromAngle(radians: number): Vector;
    withMagnitude(magnitude: number): Vector;
    withDirection(direction: number): Vector;
    multiply(c: number): Vector;
    normals(): Vector[];
}
declare class Rectangle {
    readonly X: number;
    readonly Y: number;
    readonly width: number;
    readonly height: number;
    readonly X2: any;
    readonly Y2: any;
    constructor(X: number, Y: number, width: number, height: number);
    contains(coordinate: Coordinates): boolean;
    static createSurrounding(coordinate: Coordinates, width: number, height: number): Rectangle;
}
declare class Keyframe {
    readonly X: number;
    readonly Y: number;
    constructor(X: number, Y: number);
}
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
declare function lerp(start: number, end: number, percent: number): number;
declare function percentBetween(start: number, between: number, end: number): number;
