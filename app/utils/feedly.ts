import Token from "../reducers/Token";
import FeedlyApi from "./api/feedly/FeedlyApi";
import Item from "./api/feedly/Item";
import {Provider} from "../reducers/Provider";
import Entertainment from "../reducers/Entertainment";

export function generateTokenFeedly(): Promise<Token> {
    return new FeedlyApi().generateTokenFeedly();
}

export function entertainmentsFeedly(token: Token): Promise<Entertainment[]> {
    return new FeedlyApi().entertainmentsFeedly(token)
        .then(convertItemToEntertainment);
}

export function markAsRead(entertainment: Entertainment, token: Token): Promise<boolean> {
    return new FeedlyApi().markAsRead(entertainment.id, token);
}

function convertItemToEntertainment(items: Item[]): Entertainment[] {
    return items.map((item: Item) => {
        const url = extractUrl(item);
        const thumbnail = extractThumbnail(item);
        return new Entertainment(Provider.FEEDLY, item.id, item.title, item.origin.title, url, thumbnail);
    });
}

function extractUrl(item: Item): string | undefined {
    return item.alternate && item.alternate[0] ? item.alternate[0].href : undefined;
}

function extractThumbnail(item: Item): string | undefined {
    const thumbnail = item.thumbnail && item.thumbnail[0] ? item.thumbnail[0].url : undefined;
    const visual = item.visual ? item.visual.url : undefined;
    return thumbnail ? thumbnail : visual;
}