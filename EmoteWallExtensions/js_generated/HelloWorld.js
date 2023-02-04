registerPlugin({
    name: "Hello World",
    ModifyEmoteDataList(message, emoteDataListBuilder) {
        if (message.text.toLowerCase().includes("hello world")) {
            let imageUrl = "https://cdn.betterttv.net/emote/5f21a9a2cf6d2144653d87e4/3x.gif";
            emoteDataListBuilder.add(new EmoteData("HelloWorld", imageUrl));
        }
    },
    testButtons: [
        {
            buttonText: "Test",
            callback: () => { simulateMessage("hello world", "giganticbucket", "giganticbucket"); }
        }
    ]
});
//# sourceMappingURL=HelloWorld.js.map