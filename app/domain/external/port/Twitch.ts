import Token from "../../store/state/Token"
import Entertainment from "../../store/state/Entertainment"
import RefreshToken from "../../store/state/RefreshToken"

export interface Twitch {
    generateTokenTwitch(): Promise<Token>

    refreshToken(token: Token): Promise<RefreshToken>

    entertainmentsTwitch(token: Token): Promise<Entertainment[]>
}