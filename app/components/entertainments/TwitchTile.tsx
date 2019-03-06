import * as React from 'react';

import {connect} from "react-redux";
import {Entertainment} from "../../reducers/platforms";
import {openEntertainment} from "../../actions/entertainmentService";
import {emptyFunction} from "../../utils/connectUtil";

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
            <div data-role="tile" data-size="wide" onClick={() => this.props.open(e)}>
                <span className="branding-bar">{e.title}</span>
                <span className="badge-top">{e.user}</span>
                <img src={e.previewUrl}/>
            </div>
        );
    }
}

function mapDispatchToProps(): DispatchProps {
    return {
        open: (entertainment: Entertainment) => {
            openEntertainment(entertainment);
        }
    };
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(TwitchTile);