import BrowserApi from "./api/browser/BrowserApi"
import Entertainment from "../domain/store/state/Entertainment"
import {Browser} from "../domain/external/port/Browser"

export default class BrowserSystemAdapter implements Browser {
    public openEntertainmentUrl = (entertainment: Entertainment): void => {
        if (entertainment.url) {
            console.log('Open URL ' + entertainment.url)
            new BrowserApi().openEntertainment(entertainment.url)
        }
    }
}
