import * as React from 'react';
import {emptyConnect} from "../../../utils";
import Entertainment from "../../../../reducers/Entertainment";

const styles = require('./TodoistTile.scss');

export interface OwnProps {
    entertainment: Entertainment;
}

class TodoistTile extends React.Component<OwnProps> {
    render() {
        const e = this.props.entertainment;
        return (
            <div data-role="tile" className={"d-flex flex-justify-center flex-align-center " + styles.tile}>
                <p>{e.title}</p>
            </div>
        );
    }
}

export default emptyConnect(TodoistTile);