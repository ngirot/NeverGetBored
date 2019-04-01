import * as React from 'react'
import DefaultTile from "./DefaultTile"
import TwitchTile from "./TwitchTile"
import TodoistTile from "./TodoistTile"
import FeedlyTile from "./FeedlyTile"
import {emptyConnect} from "../../../utils"
import Entertainment from "../../../../domain/store/state/Entertainment"
import {Provider} from "../../../../domain/store/state/Provider"

export interface OwnProps {
    entertainment: Entertainment
}

class EntertainmentTile extends React.Component<OwnProps> {
    render() {
        return (
            this.tile(this.props.entertainment)
        )
    }

    private tile(entertainment: Entertainment) {
        switch (entertainment.provider) {
            case Provider.TWITCH:
                return <TwitchTile entertainment={entertainment}/>
            case Provider.TODOIST:
                return <TodoistTile entertainment={entertainment}/>
            case Provider.FEEDLY:
                return<FeedlyTile entertainment={entertainment}/>
            default:
                console.log('default')
                return <DefaultTile entertainment={entertainment}/>
        }
    }
}

export default emptyConnect(EntertainmentTile)