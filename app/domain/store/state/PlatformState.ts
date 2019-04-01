import ProviderState from "./ProviderState"
import Entertainment from "./Entertainment"

export default class PlatformState {

    public readonly providers: ProviderState[]
    public readonly entertainments: Entertainment[]

    constructor(entertainments: Entertainment[], providers: ProviderState[]) {
        this.providers = providers
        this.entertainments = entertainments
    }
}