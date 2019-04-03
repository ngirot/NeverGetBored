import ConfigurationFileAdapter from "./infrastructure/ConfigurationFileAdapter"
import BrowserSystemAdapter from "./infrastructure/BrowserSystemAdapter"
import FeedlyHttpAdapter from "./infrastructure/FeedlyHttpAdapter"
import NotificationPopinAdapter from "./infrastructure/NotificationPopinAdapter"
import TodoistHttpAdapter from "./infrastructure/TodoistHttpAdapter"
import TwitchHttpAdapter from "./infrastructure/TwitchHttpAdapter"
import EntertainmentDispatcher from "./domain/actions/entertainment/EntertainmentDispatcher"
import {PlatformDispatcher} from "./domain/actions/platform/PlatformDispatcher"

export enum Injectable {
    CONFIGURATION, BROWSER, FEEDLY, NOTIFICATION, TODOIST, TWITCH,
    ENTERTAINMENT, PLATFORM
}

export default function inject(injectable: Injectable): any {
    switch (injectable) {
        case Injectable.CONFIGURATION:
            return new ConfigurationFileAdapter()
        case Injectable.BROWSER:
            return new BrowserSystemAdapter()
        case Injectable.FEEDLY:
            return new FeedlyHttpAdapter()
        case Injectable.NOTIFICATION:
            return new NotificationPopinAdapter()
        case Injectable.TODOIST:
            return new TodoistHttpAdapter()
        case Injectable.TWITCH:
            return new TwitchHttpAdapter()
        case Injectable.ENTERTAINMENT:
            return new EntertainmentDispatcher()
        case Injectable.PLATFORM:
            return new PlatformDispatcher()
        default:
            throw new Error('Unable to get injectable for ' + injectable)
    }
}
