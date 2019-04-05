import Entertainment from "../../store/state/Entertainment"

export default class EntertainmentLoaded {
    public readonly entertainments: Entertainment[]

    constructor(entertainments: Entertainment[]) {
        this.entertainments = entertainments
    }
}