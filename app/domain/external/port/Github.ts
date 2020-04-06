import Token from "../../store/state/Token"
import Entertainment from "../../store/state/Entertainment"

export interface Github {
    generateTokenGithub(): Promise<Token>

    entertainmentsGithub(token: Token): Promise<Entertainment[]>
}