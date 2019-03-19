import * as React from 'react';

import {connect} from "react-redux";
import EntertainmentTile from "./tiles/EntertainmentTile";
import {AppState} from "../../../reducers";
import {openEntertainment} from "../../../actions/entertainmentService";
import Entertainment from "../../../reducers/Entertainment";

const styles = require('./EntertainmentList.scss');

interface StateProps {
    entertainments: Entertainment[];
}

interface DispatchProps {
    open: (entertainment: Entertainment) => void;
}

type Props = StateProps & DispatchProps;

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

function mapDispatchToProps(): DispatchProps {
    return {
        open: (entertainment: Entertainment) => {
            openEntertainment(entertainment);
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(EntertainmentList);