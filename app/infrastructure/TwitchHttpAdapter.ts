import TwitchApi from "./api/twitch/twitchApi"
import Stream from "./api/twitch/Stream"
import Entertainment from "../domain/store/state/Entertainment"
import Token from "../domain/store/state/Token"
import {Provider} from "../domain/store/state/Provider"
import {EntertainmentType} from "../domain/store/state/EntertainmentType"
import {Twitch} from "../domain/external/port/Twitch"
import RefreshToken from "../domain/store/state/RefreshToken"

export default class TwitchHttpAdapter implements Twitch {

    private readonly twitchClientId = 'uviersrira44oauqh1n6bdw8h0f0jw'

    public generateTokenTwitch = (): Promise<Token> => {
        return new TwitchApi(this.twitchClientId).generateTokenTwitch()
    }

    public refreshToken = (token: Token): Promise<RefreshToken> => {
        return new TwitchApi(this.twitchClientId).refreshToken(token)
            .then((newToken: Token) => {
                console.log('Refreshed', newToken)
                return {refreshed: true, token: newToken}
            })
    }

    public entertainmentsTwitch = (token: Token): Promise<Entertainment[]> => {
        const api = new TwitchApi(this.twitchClientId)
        return api.entertainmentsTwitch(token)
            .then((streams: Stream[]) => streams.map(this.convertStreamToEntertainment))
    }

    private convertStreamToEntertainment = (stream: Stream): Entertainment => {
        return new Entertainment(Provider.TWITCH, EntertainmentType.LIVE, stream._id, stream.viewers,
            stream.channel.status, stream.channel.display_name,
            stream.channel.url, this.urlWithoutCache(stream.preview.large))
    }

    private urlWithoutCache = (url: string) => {
        return url + "?nocache=" + new Date().getTime()
    }
}