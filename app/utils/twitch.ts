import {Entertainment} from "../reducers/platforms";
import Token from "./Token";
import TwitchApi from "./api/twitch/twitchApi";
import Stream from "./api/twitch/Stream";
import {Provider} from "./Provider";

const twitchClientId = 'uviersrira44oauqh1n6bdw8h0f0jw';

export function generateTokenTwitch(): Promise<Token> {
    return new TwitchApi(twitchClientId).generateTokenTwitch();
}

export function entertainmentsTwitch(token: Token): Promise<Entertainment[]> {
    const api = new TwitchApi(twitchClientId);
    return api.entertainmentsTwitch(token)
        .then((streams: Stream[]) => streams.map(convertStreamToEntertainment));
}

function convertStreamToEntertainment(stream: Stream): Entertainment {
    return new Entertainment(Provider.TWITCH, stream._id, stream.channel.status, stream.channel.display_name,
        stream.channel.url, stream.preview.large);
}