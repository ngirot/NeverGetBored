import * as React from 'react';
import {Link} from 'react-router-dom';
import ConnectButton from "./ConnectButton";
import EntertainmentList from "./EntertainmentList"; EntertainmentList

let styles = require('./Home.scss');

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.container} data-tid="container">
                    <h2>Home</h2>
                    <ConnectButton serviceName="Twitch"></ConnectButton>
                    <EntertainmentList/>
                    <Link to="/counter">to Counter</Link>
                </div>
            </div>
        );
    }
}
