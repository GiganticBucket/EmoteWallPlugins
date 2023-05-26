declare class HubConnection {
    private readonly hubConnection;
    private readonly onConnected;
    get Connected(): import("./Utilities").ILiteEvent<void>;
    private readonly onDisconnected;
    get Disconnected(): import("./Utilities").ILiteEvent<void>;
    constructor(hubName: string);
    addHandlers(handlers: HubConnectionHandler[]): void;
    invoke(name: string, ...params: any[]): void;
    start(): Promise<void>;
}
declare class HubConnectionHandler {
    name: string;
    callback: any;
    constructor(name: string, callback: any);
}
