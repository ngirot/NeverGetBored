import Token from "../../Token";
import StreamResult from "./StreamResult";
import Stream from "./Stream";

const api = require('twitch-api-v5');

export default class TwitchApi {
    private readonly token: Token;

    constructor(token: Token) {
        this.token = token;
    }

    public register(clientId: string) {
        api.clientID = clientId;
    }

    public entertainmentsTwitch(): Promise<Stream[]> {
        return new Promise((resolve, reject) => {

            const streamCallback = (error: any, streamResult: StreamResult) => {
                console.log('result', streamResult)
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