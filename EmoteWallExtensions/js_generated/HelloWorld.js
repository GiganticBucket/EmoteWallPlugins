"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmoteWallEntryPoint_1 = require("./externaltypes/EmoteWall/EmoteWallEntryPoint");
(0, EmoteWallEntryPoint_1.registerPlugin)({
    name: "Hello World",
    ModifyEmoteDataList(message, emoteDataListBuilder) {
        if (message.text.toLowerCase().includes("hello world")) {
            let imageUrl = "https://cdn.betterttv.net/emote/5f21a9a2cf6d2144653d87e4/3x.gif";
            emoteDataListBuilder.add(new EmoteWallEntryPoint_1.EmoteData("HelloWorld", imageUrl));
        }
    }
});
//# sourceMappingURL=HelloWorld.js.map