import TwitchApi from "./api/twitch/twitchApi"
import Stream from "./api/twitch/Stream"
import Entertainment from "../domain/store/state/Entertainment"
import Token from "../domain/store/state/Token"
import {Provider} from "../domain/store/state/Provider"
import {EntertainmentType} from "../domain/store/state/EntertainmentType"

export default class TwitchHttpAdapter {

    private readonly twitchClientId = 'uviersrira44oauqh1n6bdw8h0f0jw'

    public generateTokenTwitch = (): Promise<Token> => {
        return new TwitchApi(this.twitchClientId).generateTokenTwitch()
    }

    public entertainmentsTwitch = (token: Token): Promise<Entertainment[]> => {
        const api = new TwitchApi(this.twitchClientId)
        return api.entertainmentsTwitch(token)
            .then((streams: Stream[]) => streams.map(this.convertStreamToEntertainment))
    }

    private convertStreamToEntertainment = (stream: Stream): Entertainment => {
        return new Entertainment(Provider.TWITCH, EntertainmentType.LIVE, stream._id, stream.channel.status, stream.channel.display_name,
            stream.channel.url, this.disableCache(stream.preview.large))
    }

    private disableCache = (url: string) => {
        return url + "?nocache=" + new Date().getTime()
    }
}