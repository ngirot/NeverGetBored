import Image from "./Image"
import ExternalUrls from "./ExternalUrls"

export default class Episode {
    public readonly id: string
    public readonly name: string
    public readonly release_date: string
    public readonly external_urls: ExternalUrls
    public readonly images: Image[]
}