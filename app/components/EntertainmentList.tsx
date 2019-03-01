import * as React from 'react';

import {connect} from "react-redux";
import {IState} from "../reducers";
import {Entertainment} from "../reducers/platforms";

interface StateProps {
    entertainments: Entertainment[];
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps;

class EntertainmentList extends React.Component<Props> {
    render() {
        return (
            <div>
                {this.props.entertainments.map(e => {
                    return <div key={e.title}>{e.title} from {e.user}</div>;
                })}
            </div>
        );
    }
}

function mapStateToProps(state: IState): StateProps {
    return {entertainments: state.platform.entertainments};
}

function mapDispatchToProps(): DispatchProps {
    return {};
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(EntertainmentList);