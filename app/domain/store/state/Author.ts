export default class Author {
    public readonly name: string
    public readonly avatarUrl?: string

    constructor(name: string, avatarUrl?: string) {
        this.name = name
        this.avatarUrl = avatarUrl
    }
}