registerPlugin({
    name: "Hello World",
    ModifyEmoteDataList(message: TwitchMessage, emoteDataListBuilder: EmoteDataList) {
        if (message.text.toLowerCase().includes("hello world")) {
            let imageUrl = "https://cdn.betterttv.net/emote/5f21a9a2cf6d2144653d87e4/3x.gif";
            emoteDataListBuilder.add(new EmoteData("HelloWorld", imageUrl));

        }
    }
});