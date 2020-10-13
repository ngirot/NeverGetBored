import {Provider} from "./Provider"
import {EntertainmentType} from "./EntertainmentType"
import Author from "./Author"
import Subject from "./Subject"
import {Duration} from "moment"

export default class Entertainment {
    public readonly provider: Provider
    public readonly author?: Author
    public readonly subject?: Subject
    public readonly type: EntertainmentType
    public readonly id: string
    public readonly title: string
    public readonly url?: string
    public readonly previewUrl?: string
    public readonly duration?: Duration
    public readonly order: number

    public constructor(provider: Provider, type: EntertainmentType, id: string, order: number, title: string,
                       author?: Author, url?: string, previewUrl?: string, duration?: Duration, subject?: Subject) {
        this.provider = provider
        this.type = type
        this.id = id
        this.order = order
        this.title = title
        this.author = author
        this.url = url
        this.previewUrl = previewUrl
        this.subject = subject
        this.duration = duration
    }
}