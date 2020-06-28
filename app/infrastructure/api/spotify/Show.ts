import Image from "./Image"
import Episodes from "./Episodes"

export default class Show {
    public readonly id: string
    public readonly name: string
    public readonly publisher: string
    public readonly episodes: Episodes
    public readonly href: string
    public readonly images: Image[]
}