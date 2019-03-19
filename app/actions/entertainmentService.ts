import {shell} from 'electron';
import Entertainment from "../reducers/Entertainment";

export function openEntertainment(entertainment: Entertainment): void {
    console.log('Open url ' + entertainment.url);
    if (entertainment.url) {
        shell.openExternal(entertainment.url);
    }
}
