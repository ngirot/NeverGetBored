import {IActionWithPayload} from "../helpers"
import EntertainmentLoadedPayload from "./EntertainmentLoadedPayload"
import Entertainment from "../../store/state/Entertainment"
import Token from "../../store/state/Token"
import ProviderState from "../../store/state/ProviderState"
import {Provider} from "../../store/state/Provider"
import inject, {Injectable} from "../../../Injector"
import {Notifi} from "../../external/port/Notifi"
import {Twitch} from "../../external/port/Twitch"
import {Todoist} from "../../external/port/Todoist"
import {Feedly} from "../../external/port/Feedly"
import {actionLoadedEntertainments} from "../../external/adapter/EntertainmentDispatcher"

export function reloadAll(providerStates: ProviderState[]): Promise<IActionWithPayload<EntertainmentLoadedPayload>> {
    const promises = providerStates.map((state) => {

        return new Promise(function (resolve) {
            const loader = loadFunction(state.provider)
            if (state.token) {
                loader(state.token)
                    .then(resolve)
                    .catch((err) => {
                        const notification: Notifi = inject(Injectable.NOTIFICATION)
                        notification.errorMessage("Failed to load entertainments for " + state.provider, err)
                        resolve([])
                    })
            } else {
                resolve([])
            }
        })
    })

    return Promise.all(promises)
        .then((result: Entertainment[][]) => {
            return result.reduce((acc, val) => acc.concat(val), [])
        })
        .then((entertainments) => {
            const payload = new EntertainmentLoadedPayload(entertainments)
            return actionLoadedEntertainments(payload)
        })
}

function loadFunction(provider: Provider): (token: Token) => Promise<Entertainment[]> {
    switch (provider) {
        case Provider.TWITCH:
            const twitch: Twitch = inject(Injectable.TWITCH)
            return twitch.entertainmentsTwitch
        case Provider.TODOIST:
            const todoist: Todoist = inject(Injectable.TODOIST)
            return todoist.entertainmentsTodoist
        case Provider.FEEDLY:
            const feedly: Feedly = inject(Injectable.FEEDLY)
            return feedly.entertainmentsFeedly
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown')
                })
            }
    }
}