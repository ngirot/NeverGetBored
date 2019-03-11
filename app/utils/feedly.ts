import {Entertainment} from "../reducers/platforms";
import Token from "./Token";
import FeedlyApi from "./api/feedly/FeedlyApi";
import Item from "./api/feedly/Item";
import {Provider} from "./Provider";

export function generateTokenFeedly(): Promise<Token> {
    return new FeedlyApi().generateTokenFeedly();
}

export function entertainmentsFeedly(token: Token): Promise<Entertainment[]> {
    return new FeedlyApi().entertainmentsFeedly(token)
        .then(convertItemToEntertainment);
}

function convertItemToEntertainment(items: Item[]): Entertainment[] {
    return items.map((item: Item) => {
        const url = item.alternate && item.alternate[0] ? item.alternate[0].href : undefined;
        return new Entertainment(Provider.FEEDLY, item.id, item.title, item.origin.title, url, item.visual.url);
    });
}