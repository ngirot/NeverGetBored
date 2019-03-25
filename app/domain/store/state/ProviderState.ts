import {Provider} from "./Provider";
import Token from "./Token";

export default class ProviderState {
    public readonly provider: Provider;
    public readonly error: boolean;
    public readonly token?: Token;
    public readonly loading: boolean;

    public constructor(provider: Provider, loading: boolean, error: boolean, token?: Token) {
        this.provider = provider;
        this.loading = loading;
        this.token = token;
        this.error = error;
    }
}