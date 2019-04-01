import Token from "../../store/state/Token";
import Entertainment from "../../store/state/Entertainment";

export interface Twitch {
    generateTokenTwitch(): Promise<Token>;

    entertainmentsTwitch(token: Token): Promise<Entertainment[]>;
}