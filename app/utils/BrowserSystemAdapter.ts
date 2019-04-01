import BrowserApi from "./api/browser/BrowserApi"
import Entertainment from "../domain/store/state/Entertainment"
import {Browser} from "../domain/actions/external/Browser"

export default class BrowserSystemAdapter implements Browser {
    public openEntertainmentUrl = (entertainment: Entertainment): void  => {
        if (entertainment.url) {
            new BrowserApi().openEntertainment(entertainment.url)
        }
    }
}
