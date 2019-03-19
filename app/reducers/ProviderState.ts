import {Provider} from "./Provider";
import Token from "./Token";

export default class ProviderState {
    public readonly provider: Provider;
    public readonly token?: Token;
    public readonly loading: boolean;

    public constructor(provider: Provider, loading: boolean, token?: Token) {
        this.provider = provider;
        this.loading = loading;
        this.token = token;
    }
}