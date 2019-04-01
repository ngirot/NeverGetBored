import Headers from "./Headers"

export default class Options {
    public readonly read_timeout?: number
    public readonly open_timeout?: number
    public readonly headers?: Headers
}