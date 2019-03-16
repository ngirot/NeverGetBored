import Token from "../../Token";
import StreamResult from "./StreamResult";
import Stream from "./Stream";

const api = require('twitch-api-v5');

export default class TwitchApi {
    private readonly token: Token;

    constructor(clientId: string, token: Token) {
        api.clientID = clientId;
        this.token = token;
    }

    public entertainmentsTwitch(): Promise<Stream[]> {
        return new Promise((resolve, reject) => {

            const streamCallback = (error: any, streamResult: StreamResult) => {
                if (error) {
                    console.log('Unable to load streams from Twitch', error);
                    reject('Unable to load streams from Twitch');
                }
                resolve(streamResult.streams);
            };

            api.streams.followed({auth: this.token.currentToken, stream_type: 'live'}, streamCallback);
        });
    }
}