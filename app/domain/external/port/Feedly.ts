import RefreshToken from "../../store/state/RefreshToken"
import Entertainment from "../../store/state/Entertainment"
import Token from "../../store/state/Token"

export interface Feedly {
    generateTokenFeedly(): Promise<Token>

    refreshToken(token: Token): Promise<RefreshToken>

    entertainmentsFeedly(token: Token): Promise<Entertainment[]>

    markAsRead(entertainment: Entertainment, token: Token): Promise<boolean>

}