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
    constructor(twitchConnection: TwitchConnection, channel: string, tags: any, text: string);
    get isBroadcaster(): boolean;
}
