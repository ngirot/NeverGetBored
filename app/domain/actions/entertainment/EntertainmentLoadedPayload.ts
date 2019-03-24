import {Provider} from "../../../reducers/Provider";
import Entertainment from "../../../reducers/Entertainment";

export default class EntertainmentLoaded {
    public readonly provider: Provider;
    public readonly entertainments: Entertainment[];

    constructor(provider: Provider, entertainments: Entertainment[]) {
        this.provider = provider;
        this.entertainments = entertainments;
    }
}