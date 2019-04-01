import ProviderState from "../store/state/ProviderState"
import {Provider} from "../store/state/Provider"
import Token from "../store/state/Token"

export interface Configuration {
    loadProviders(): ProviderState[]

    addToken(provider: Provider, token: Token): void
}