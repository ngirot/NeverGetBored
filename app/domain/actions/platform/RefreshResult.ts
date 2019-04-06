import Token from "../../store/state/Token"
import {Provider} from "../../store/state/Provider"

export default class RefreshResult {
    public readonly token: Token
    public readonly refreshed: boolean
    public readonly provider: Provider
}