import Channel from "./Channel"
import Preview from "./Preview"

export default class Stream {
    public readonly _id: string
    public readonly game: string
    public readonly channel: Channel
    public readonly preview: Preview
}