import BrowserApi from "./api/browser/BrowserApi";
import Entertainment from "../domain/store/state/Entertainment";

export function openEntertainmentUrl(entertainment: Entertainment): void {
    if (entertainment.url) {
        new BrowserApi().openEntertainment(entertainment.url);
    }
}