import * as React from 'react';
import ConnectButton from "./ConnectButton";
import EntertainmentList from "./EntertainmentList";
import ReloadButton from "./ReloadButton";

let styles = require('./Home.scss');

export default class Home extends React.Component {
    render() {
        return (
            <div className={styles.container} data-tid="container">
                <div className={styles.intro}>
                    <div className={"row"}>
                        <div className={"cell-8 offset-2"}>
                            <ConnectButton serviceName="Twitch" iconClass={"fa fa-twitch"}></ConnectButton>
                        </div>
                        <div className={"cell-2 " + styles.actions}>
                            <ReloadButton/>
                        </div>
                    </div>
                </div>
                <div>
                    <EntertainmentList/>
                </div>
            </div>
        );
    }
}
