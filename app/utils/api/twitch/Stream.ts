import Channel from "./Channel";
import Preview from "./Preview";

export default class Stream {
    public _id: string;
    public game: string;
    public channel: Channel;
    public preview: Preview;
}