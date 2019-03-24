import * as React from 'react';

import {connect} from "react-redux";
import EntertainmentTile from "./tiles/EntertainmentTile";
import {AppState} from "../../../reducers";
import Entertainment from "../../../reducers/Entertainment";
import {emptyFunction} from "../../utils";

const styles = require('./EntertainmentList.scss');

interface StateProps {
    entertainments: Entertainment[];
}

type Props = StateProps;

class EntertainmentList extends React.Component<Props> {
    render() {
        return (
            <div className={"tiles-grid " + styles.container}>
                {
                    this.props.entertainments.map(e => {
                        return <EntertainmentTile entertainment={e} key={e.id}/>;
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        entertainments: state.platform.entertainments
    };
}

export default connect<StateProps>(mapStateToProps, emptyFunction)(EntertainmentList);