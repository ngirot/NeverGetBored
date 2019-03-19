import * as React from 'react';
import {emptyConnect} from "../../../utils";
import Entertainment from "../../../../reducers/Entertainment";

export interface OwnProps {
    entertainment: Entertainment;
}

class DefaultTile extends React.Component<OwnProps> {
    render() {
        const e = this.props.entertainment;
        return (
            <div data-role="tile" className={"d-flex flex-justify-center flex-align-center"}>
                <p>{e.title}</p>
            </div>
        );
    }
}

export default emptyConnect(DefaultTile);