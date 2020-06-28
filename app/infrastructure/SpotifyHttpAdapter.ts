import Entertainment from "../domain/store/state/Entertainment"
import Token from "../domain/store/state/Token"
import SpotifyApi from "./api/spotify/SpotifyApi"
import {Spotify} from "../domain/external/port/Spotify"
import RefreshToken from "../domain/store/state/RefreshToken"
import Show from "./api/spotify/Show"
import {EntertainmentType} from "../domain/store/state/EntertainmentType"
import Episode from "./api/spotify/Episode"
import {Provider} from "../domain/store/state/Provider"
import Author from "../domain/store/state/Author"

export default class SpotifyHttpAdapter implements Spotify {

    private readonly api: SpotifyApi

    constructor() {
        this.api = new SpotifyApi()
    }

    entertainmentsSpotify = (token: Token): Promise<Entertainment[]> => {
        return this.api.entertainmentsSpotify(token)
            .then(this.convertPodcastToEntertainent)
    }

    refreshToken = (token: Token): Promise<RefreshToken> => {
        return this.api.refreshToken(token)
            .then((newToken: Token) => {
                console.log('Refreshed', newToken)
                return {refreshed: true, token: newToken}
            })
    }

    public generateTokenSpotify = (): Promise<Token> => {
        return this.api.generateTokenSpotify()
    }

    private convertPodcastToEntertainent = (shows: Show[]): Entertainment[] => {
        return shows
            .map(show => {
                return show.episodes.items
                    .map((episode: Episode) => {
                        const order = new Date(episode.release_date).getTime()
                        const image = this.extractThumbnail(show, episode)
                        const author = new Author(show.name)
                        const url = episode.external_urls.spotify
                        return new Entertainment(Provider.SPOTIFY, EntertainmentType.PERMANENT, episode.id, order, episode.name,
                            author, url, image)
                    })
            })
            .reduce((acc: [Entertainment], cur: [Entertainment]) => [...acc, ...cur], [])
    }

    private extractThumbnail = (show: Show, episode: Episode): string | undefined => {
        if (episode.images && episode.images.length > 0) {
            return episode.images[0].url
        }

        if (show.images && show.images.length > 0) {
            return show.images[0].url
        }

        return undefined
    }
}