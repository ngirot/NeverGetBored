import FeedlyApi from "./api/feedly/FeedlyApi"
import Item from "./api/feedly/Item"
import RefreshToken from "../domain/store/state/RefreshToken"
import Entertainment from "../domain/store/state/Entertainment"
import Token from "../domain/store/state/Token"
import {Provider} from "../domain/store/state/Provider"
import {EntertainmentType} from "../domain/store/state/EntertainmentType"
import {Feedly} from "../domain/external/port/Feedly"
import Author from "../domain/store/state/Author"

export default class FeedlyHttpAdapter implements Feedly {

    private readonly api: FeedlyApi

    constructor() {
        this.api = new FeedlyApi()
    }

    public generateTokenFeedly = (): Promise<Token> => {
        return this.api.generateTokenFeedly()
    }

    public refreshToken = (token: Token): Promise<RefreshToken> => {
        return this.api.refreshToken(token)
            .then((newToken: Token) => {
                console.log('Refreshed', newToken)
                return {refreshed: true, token: newToken}
            })
    }

    public entertainmentsFeedly = (token: Token): Promise<Entertainment[]> => {
        return this.api.entertainmentsFeedly(token)
            .then(this.convertItemToEntertainment)
    }

    public markAsRead = (entertainment: Entertainment, token: Token): Promise<boolean> => {
        return new FeedlyApi().markAsRead(entertainment.id, token)
    }

    private convertItemToEntertainment = (items: Item[]): Entertainment[] => {
        return items.map((item: Item) => {
            const url = this.extractUrl(item)
            const thumbnail = this.extractThumbnail(item)
            const author = new Author(item.origin.title)
            return new Entertainment(Provider.FEEDLY, EntertainmentType.PERMANENT, item.id, item.published,
                item.title, author, url, thumbnail)
        })
    }

    private extractUrl = (item: Item): string | undefined => {
        return item.alternate && item.alternate[0] ? item.alternate[0].href : undefined
    }

    private extractThumbnail = (item: Item): string | undefined => {
        const thumbnail = item.thumbnail && item.thumbnail[0] ? item.thumbnail[0].url : undefined
        const visual = item.visual ? item.visual.url : undefined
        return thumbnail ? thumbnail : visual
    }
}