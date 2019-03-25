import Token from "../../store/state/Token";
import {Provider} from "../../store/state/Provider";

export default class ConnectionSucessPayload {
    public readonly provider: Provider;
    public readonly token: Token;

    constructor(provider: Provider, token: Token) {
        this.provider = provider;
        this.token = token;
    }
}