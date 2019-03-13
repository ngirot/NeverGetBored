import * as React from 'react';
import {Entertainment} from "../../reducers/platforms";
import {openEntertainment} from "../../actions/entertainmentService";
import {connect} from "react-redux";
import {removeContent} from "../../actions/platformService";
import {markAsRead} from "../../utils/feedly";
import Token from "../../utils/Token";
import {IState} from "../../reducers";
import {Provider} from "../../utils/Provider";
import * as Redux from "redux";

const styles = require('./FeedlyTile.scss');

export interface OwnsProps {
    entertainment: Entertainment;
}

interface StateProps {
    token?: Token;
}

interface DispatchProps {
    open: (entertainment: Entertainment, token?: Token) => void;
}

type Props = StateProps & OwnsProps & DispatchProps;

class FeedlyTile extends React.Component<Props> {
    render() {
        const e = this.props.entertainment;
        const token = this.props.token;
        return (
            <div data-role="tile" data-size="wide" onClick={() => this.props.open(e, token)}
                 className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                <span className={"branding-bar " + styles.feedname}>{e.title}</span>
                <span className={"badge-top " + styles.sourcename}>{e.user}</span>
                <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
            </div>
        );
    }
}

function mapStateToProps(state: IState): StateProps {
    const providerState = state.platform.providers.find(p => p.provider === Provider.FEEDLY);
    if (providerState) {
        return {
            token: providerState.token,
        };
    } else {
        return {
            token: undefined,
        };
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    return {
        open: (entertainment: Entertainment, token?: Token) => {
            openEntertainment(entertainment);
            if (token) {
                markAsRead(entertainment, token)
                    .then((deleted: boolean) => {
                        if (deleted) {
                            removeContent(entertainment)(dispatch);
                        }
                    });

            }
        }
    };
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FeedlyTile);