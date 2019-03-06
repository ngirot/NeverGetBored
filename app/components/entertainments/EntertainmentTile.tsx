import * as React from 'react';
import {Entertainment} from "../../reducers/platforms";
import DefaultTile from "./DefaultTile";
import {Provider} from "../../utils/Provider";
import TwitchTile from "./TwitchTile";
import {emptyConnect} from "../../utils/connectUtil";

export interface OwnProps {
    entertainment: Entertainment;
}

class EntertainmentTile extends React.Component<OwnProps> {
    render() {
        return (
            this.tile(this.props.entertainment)
        );
    }

    private tile(entertainment: Entertainment) {
        console.log('enter', entertainment.provider);
        switch (entertainment.provider) {
            case Provider.TWITCH:
                console.log('twitch');
                return <TwitchTile entertainment={entertainment}/>;
            default:
                console.log('default');
                return <DefaultTile entertainment={entertainment}/>;
        }
    }
}

export default emptyConnect(EntertainmentTile);