import * as React from 'react';
import {connect} from "react-redux";
import * as Redux from "redux";
import Token from "../../../../reducers/Token";
import {AppState} from "../../../../reducers";
import {Provider} from "../../../../reducers/Provider";
import {openEntertainment} from "../../../../actions/entertainmentService";
import {markAsRead} from "../../../../utils/feedly";
import {removeContent} from "../../../../actions/platformService";
import Entertainment from "../../../../reducers/Entertainment";

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
        const logo = <img className={"tile-logo"} src={'resources/logos/feedly.svg'} alt={"Feedly logo"}/>;

        if (e.previewUrl) {
            return (
                <div data-role="tile" data-size="wide" onClick={() => this.props.open(e, token)}
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {logo}
                    <span className={"branding-bar " + styles.feedname}>{e.title}</span>
                    <span className={"badge-top " + styles.sourcename}>{e.user}</span>
                    <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
                </div>
            );
        } else {
            return (
                <div data-role="tile" data-size="wide"
                     className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                    {logo}
                    <p>{e.title}</p>
                </div>
            );
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
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