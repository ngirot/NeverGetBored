import {Provider} from "./Provider"
import Token from "./Token"

export default class ProviderState {
    public readonly provider: Provider
    public readonly error: boolean
    public readonly token?: Token

    public constructor(provider: Provider, error: boolean, token?: Token) {
        this.provider = provider
        this.token = token
        this.error = error
    }
}