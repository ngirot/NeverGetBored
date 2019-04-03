import ConfigurationFileAdapter from "./infrastructure/ConfigurationFileAdapter"
import BrowserSystemAdapter from "./infrastructure/BrowserSystemAdapter"
import FeedlyHttpAdapter from "./infrastructure/FeedlyHttpAdapter"
import NotificationPopinAdapter from "./infrastructure/NotificationPopinAdapter"
import TodoistHttpAdapter from "./infrastructure/TodoistHttpAdapter"
import TwitchHttpAdapter from "./infrastructure/TwitchHttpAdapter"
import EntertainmentDispatcher from "./domain/actions/entertainment/EntertainmentDispatcher"
import {PlatformDispatcher} from "./domain/actions/platform/PlatformDispatcher"
import {Configuration} from "./domain/external/Configuration"
import {Browser} from "./domain/external/Browser"
import {Feedly} from "./domain/external/Feedly"
import {Notifi} from "./domain/external/Notifi"
import {Todoist} from "./domain/external/Todoist"
import {Twitch} from "./domain/external/Twitch"
import EntertainmentService from "./presentation/external/EntertainmentService"
import PlatformService from "./presentation/external/PlatformService"

export enum Injectable {
    CONFIGURATION, BROWSER, FEEDLY, NOTIFICATION, TODOIST, TWITCH,
    ENTERTAINMENT, PLATFORM
}

function inject(injectable: Injectable.CONFIGURATION): Configuration
function inject(injectable: Injectable.BROWSER): Browser
function inject(injectable: Injectable.FEEDLY): Feedly
function inject(injectable: Injectable.NOTIFICATION): Notifi
function inject(injectable: Injectable.TODOIST): Todoist
function inject(injectable: Injectable.TWITCH): Twitch
function inject(injectable: Injectable.ENTERTAINMENT): EntertainmentService
function inject(injectable: Injectable.PLATFORM): PlatformService
function inject(injectable: Injectable): any {
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

export default inject
