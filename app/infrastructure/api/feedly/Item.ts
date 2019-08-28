import Alternate from "./Alternate"
import Origin from "./Origin"
import Visual from "./Visual"
import Thumbnail from "./Thumbnail"

export default class Item {
    public readonly id: string
    public readonly title: string
    public readonly origin: Origin
    public readonly visual?: Visual
    public readonly thumbnail: Thumbnail[]
    public readonly alternate: Alternate[]
    public readonly published: number
}