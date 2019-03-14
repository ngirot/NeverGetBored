import * as React from 'react';

import {Provider} from "../utils/Provider";
import {emptyFunction} from "../utils/connectUtil";
import ReloadButton from "./ReloadButton";
import EntertainmentList from "./EntertainmentList";
import ConnectButton from "./ConnectButton";
import {connect} from "react-redux";
import {loadConfiguration} from "../actions/configuration";
import * as Redux from "redux";

const styles = require('./MainView.scss');

interface StateProps {
}

interface DispatchProps {
    loadConf: () => void;
}

type Props = DispatchProps & StateProps;

class MainView extends React.Component<Props> {

    componentDidMount() {
        this.props.loadConf();
    }

    render() {
        return (
            <div className={styles.container} data-tid="container">
                <div className={styles.intro}>
                    <div className={"row"}>
                        <div className={"cell-8 offset-2"}>
                            <ConnectButton serviceName="Twitch" iconPath={'resources/logos/twitch.svg'}
                                           type={Provider.TWITCH}/>
                            <ConnectButton serviceName="Todoist" iconPath={'resources/logos/todoist.svg'}
                                           type={Provider.TODOIST}/>
                            <ConnectButton serviceName={"Feedly"} iconPath={'resources/logos/feedly.svg'}
                                           type={Provider.FEEDLY}/>
                        </div>
                        <div className={"cell-2 " + styles.actions}>
                            <ReloadButton/>
                        </div>
                    </div>
                </div>
                <div className={styles.entertainments}>
                    <EntertainmentList/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    return {
        loadConf: () => {
            loadConfiguration()(dispatch);
        }
    };
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(MainView);