import * as React from 'react';

import {connect} from "react-redux";
import {emptyFunction} from "../../../utils";
import {openEntertainmentUrl} from "../../../../utils/browser";
import Entertainment from "../../../../domain/store/state/Entertainment";

const styles = require('./TwitchTile.scss');

interface OwnsProps {
    entertainment: Entertainment;
}

interface StateProps {
}

interface DispatchProps {
    open: (entertainment: Entertainment) => void;
}

type Props = StateProps & OwnsProps & DispatchProps;

class TwitchTile extends React.Component<Props> {
    render() {
        const e = this.props.entertainment;
        return (
            <div data-role="tile" data-size="wide" className={styles.tile}
                 onClick={() => this.props.open(e)}>
                <img className={"tile-logo"} src={'resources/logos/twitch.svg'} alt={"Twitch logo"}/>
                <span className={"branding-bar " + styles.streamname}>{e.title}</span>
                <span className={"badge-top " + styles.username}>{e.user}</span>
                <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
            </div>
        );
    }
}

function mapDispatchToProps(): DispatchProps {
    return {
        open: (entertainment: Entertainment) => {
            openEntertainmentUrl(entertainment);
        }
    };
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(TwitchTile);