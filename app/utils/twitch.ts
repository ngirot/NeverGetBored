import {Entertainment} from "../reducers/platforms";
import Token from "./Token";
import OauthTokenConfiguration from "./api/oauth/OauthTokenConfiguration";
import {generateTokenWithToken} from "./api/oauth/OauthApi";
import TwitchApi from "./api/twitch/twitchApi";
import Stream from "./api/twitch/Stream";
import {Provider} from "./Provider";

const twitchClientId = 'uviersrira44oauqh1n6bdw8h0f0jw';

export function generateTokenTwitch(): Promise<Token> {
    let configuration = new OauthTokenConfiguration(
        twitchClientId,
        "t71vqgy5y4gmjimrfpr2yr2lixcumx",
        "https://id.twitch.tv/oauth2/authorize",
        "http://localhost",
        'openid');

    return generateTokenWithToken(configuration);
}

export function entertainmentsTwitch(token: Token): Promise<Entertainment[]> {
    const api = new TwitchApi(twitchClientId, token);
    return api.entertainmentsTwitch()
        .then((streams: Stream[]) => streams.map(convertStreamToEntertainment));
}

function convertStreamToEntertainment(stream: Stream): Entertainment {
    return new Entertainment(Provider.TWITCH, stream._id, stream.channel.status, stream.channel.display_name,
        stream.channel.url, stream.preview.large);
}