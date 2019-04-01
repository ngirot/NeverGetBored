import Entertainment from "../store/state/Entertainment"

export interface Browser {
    openEntertainmentUrl(entertainment: Entertainment): void
}