import {Provider} from "../../../reducers/Provider";
import Token from "../../../reducers/Token";

export default class ConnectionSucessPayload {
    public readonly provider: Provider;
    public readonly token: Token;

    constructor(provider: Provider, token: Token) {
        this.provider = provider;
        this.token = token;
    }
}