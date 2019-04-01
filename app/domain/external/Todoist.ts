import Token from "../store/state/Token"
import Entertainment from "../store/state/Entertainment"

export interface Todoist {
    generateTokenTodoist(): Promise<Token>

    entertainmentsTodoist(token: Token): Promise<Entertainment[]>
}