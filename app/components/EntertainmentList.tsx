import * as React from 'react';

import {connect} from "react-redux";
import {IState} from "../reducers";
import {Entertainment} from "../reducers/platforms";
import {openEntertainment} from "../actions/entertainmentService";

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
            <div className={"tiles-grid"}>
                {this.props.entertainments.map(e => {
                    return <div data-role="tile" data-size="medium" key={e.title}
                                onClick={() => this.props.open(e)}>
                        <span className="branding-bar">{e.title}</span>
                        <span className="badge-top">{e.user}</span>
                        <img src={e.previewUrl}/>
                    </div>;
                })}
            </div>
        );
    }
}

function mapStateToProps(state: IState): StateProps {
    return {entertainments: state.platform.entertainments};
}

function mapDispatchToProps(): DispatchProps {
    return {
        open: (entertainment: Entertainment) => {
            openEntertainment(entertainment);
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(EntertainmentList);