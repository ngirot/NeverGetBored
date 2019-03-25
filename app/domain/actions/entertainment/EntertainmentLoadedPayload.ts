import Entertainment from "../../store/state/Entertainment";
import {Provider} from "../../store/state/Provider";

export default class EntertainmentLoaded {
    public readonly provider: Provider;
    public readonly entertainments: Entertainment[];

    constructor(provider: Provider, entertainments: Entertainment[]) {
        this.provider = provider;
        this.entertainments = entertainments;
    }
}