import Headers from "./Headers";

export default class Options {
    public read_timeout?: number;
    public open_timeout?: number;
    public headers?: Headers;
}