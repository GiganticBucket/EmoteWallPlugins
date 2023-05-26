registerPlugin({
    name: "Trans Comrades",
    ModifyEmoteDataList(message, emoteDataListBuilder) {
        if (message.text.includes("TRANS COMRADES")) {
            for (let i = 0; i < 20; i++) {
                emoteDataListBuilder.add(new EmoteData("TransgenderPride", "https://static-cdn.jtvnw.net/emoticons/v2/307827377/default/light/3.0"));
            }
        }
    },
    testButtons: [{
            buttonText: "Test",
            callback() {
                simulateMessage("I LOVE MY TRANS COMRADES", "GiganticBucket", "WhatsUpDot");
            }
        }]
});
//# sourceMappingURL=TransComrades.js.map