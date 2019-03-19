import {connect} from "react-redux";

export const emptyFunction = () => {
    return {};
};

export const emptyConnect = connect(emptyFunction, emptyFunction);