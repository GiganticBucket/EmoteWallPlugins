# EmoteWallPlugins

The Emote Wall loads plain JavaScript (not TypeScript) script files (not modules) which directly reference the APIs on the Emote Wall page itself. These APIs are defined here in the [referencedtypes](referencedtypes) folder, which allows Visual Studio to provide IntelliSense/etc. for both TypeScript and JavaScript development. All samples provided were [written in TypeScript](ts_source) and [compiled to JavaScript](js_generated) which the site can load.

# API Overview

## Twitch Chat Message Pipeline

Each incoming Twitch chat message is processed as follows:

1. Registered plugins (`IEmoteOverlayPlugin`) notified of message
    - Any plugin can claim full control via `TakesFullControl`, halting further processing of this message.
2. Twitch Emotes & BTTV Global/Channel Emotes are gathered into a `EmoteDataList`
3. Plugins given this mutable `EmoteDataList`, modifying it as desired via `ModifyEmoteDataList`
4. Emotes in the final `EmoteDataList` are built into `OverlayEmote`s with the default `IOverlayEmoteConfigurer`s and `IOverlayEmoteBehavior`s attached, but without the images actually loaded into memory.
5. Plugins given the readonly array of `OverlayEmote`s to adjust as desired via `ModifyUninitializedOverlayEmotes`.
6. The final `OverlayEmote`s have their images loaded and their `IOverlayEmoteConfigurer`s run before animation begins.
7. On every frame, the active `OverlayEmote`s are run through their respective `IOverlayEmoteBehavior`s in two phases:
    1. All `IOverlayEmoteBehavior.preApply` implementations are called. This phase should READ any required data from the DOM, such as image sizes and locations, and store them in the `OverlayEmoteState.properties` map for retrieval during the next phase
    2. All `IOverlayEmoteBehavior.apply` implementations are called. This phase should USE the `OverlayEmoteState.properties` map to get DOM information, and WRITE updated DOM information to the DOM (and the `properties` map if other `IOverlayEmoteBehavior`s might reference it).

## Options/Testing

Plugins can provide an array of `IEditableOption`s, which provide two behaviors:

1. Read/write to URL query string
2. Textbox hookup in config panel for live adjusting of values

Plugins can also provide an array of `ITestButton`s, which are shown in the config panel view for easier testing.

## Built-in Configurers/Behaviors

*This part of the API is **very** subject to change*

Plugins can attach their own custion Configurers/Behaviors, but the following are provided by default.

Configurers:

1. BoundedStartingSizeConfigurer
2. ExplicitStartingDimensionsConfigurer
3. RandomStartVelocityAngleConfigurer
4. RandomStartPositionConfigurer
5. InitialPositionConfigurer
6. InitialVelocityConfigurer

Behaviors:

1. GravityBehavior
2. VectorVelocityBehavior
3. ConstantVelocityBehavior
4. OpacityBehavior
5. BounceOffWallsBehavior,


## Overriding the default Configurers/Behaviors

If you have a different default set of `IOverlayEmoteConfigurer`s you want to initialize every `OverlayEmote` with, use `overrideDefaultConfigurers`. Similarly, to change the default set of `IOverlayEmoteBehavior`s, use `overrideDefaultBehaviors`.