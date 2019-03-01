import * as React from 'react';
import ConnectButton from "./ConnectButton";
import EntertainmentList from "./EntertainmentList";

let styles = require('./Home.scss');

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.container} data-tid="container">
                    <h2>Entertain yourself !</h2>
                    <ConnectButton serviceName="Twitch"></ConnectButton>
                    <EntertainmentList/>
                </div>
            </div>
        );
    }
}
