import Token from "../../store/state/Token"
import Entertainment from "../../store/state/Entertainment"
import RefreshToken from "../../store/state/RefreshToken"

export interface Spotify {
    generateTokenSpotify(): Promise<Token>

    refreshToken(token: Token): Promise<RefreshToken>

    entertainmentsSpotify(token: Token): Promise<Entertainment[]>
}