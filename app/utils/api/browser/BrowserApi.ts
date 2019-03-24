import {shell} from "electron";

export default class BrowserApi {
    public openEntertainment(url: string): void {
        shell.openExternal(url);
    }
}