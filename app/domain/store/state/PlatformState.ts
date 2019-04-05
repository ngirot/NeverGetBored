import ProviderState from "./ProviderState"
import Entertainment from "./Entertainment"

export default class PlatformState {

    public readonly providers: ProviderState[]
    public readonly entertainments: Entertainment[]
    public readonly reloading: boolean

    constructor(entertainments: Entertainment[], providers: ProviderState[], reloading: boolean) {
        this.providers = providers
        this.entertainments = entertainments
        this.reloading = reloading
    }
}