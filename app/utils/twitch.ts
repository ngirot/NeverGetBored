import TwitchApi from "./api/twitch/twitchApi";
import Stream from "./api/twitch/Stream";
import Entertainment from "../domain/store/state/Entertainment";
import Token from "../domain/store/state/Token";
import {Provider} from "../domain/store/state/Provider";

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
        stream.channel.url, disableCache(stream.preview.large));
}

function disableCache(url: string) {
    return url + "?nocache=" + new Date().getTime();
}