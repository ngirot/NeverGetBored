import {Entertainment} from "../reducers/platforms";
import {shell} from 'electron';

export function openEntertainment(entertainment: Entertainment): void {
    console.log('OPEN => ' + entertainment.url);
    shell.openExternal(entertainment.url);
}
