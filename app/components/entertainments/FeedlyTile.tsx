import * as React from 'react';
import {Entertainment} from "../../reducers/platforms";
import {emptyFunction} from "../../utils/connectUtil";
import {openEntertainment} from "../../actions/entertainmentService";
import {connect} from "react-redux";

const styles = require('./FeedlyTile.scss');

export interface OwnsProps {
    entertainment: Entertainment;
}

interface StateProps {
}

interface DispatchProps {
    open: (entertainment: Entertainment) => void;
}

type Props = StateProps & OwnsProps & DispatchProps;

class FeedlyTile extends React.Component<Props> {
    render() {
        const e = this.props.entertainment;
        return (
            <div data-role="tile" data-size="wide" onClick={() => this.props.open(e)}
                 className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                <span className={"branding-bar " + styles.feedname}>{e.title}</span>
                <span className={"badge-top " + styles.sourcename}>{e.user}</span>
                <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
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

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(FeedlyTile);