import React from "react";
import PropTypes from 'prop-types';


class SaladOption extends React.Component {
    render() {
        const {name, price} = this.props;
        return (
            <option value={name}>{name} +{price} kr</option>

        );
    }

}


export default SaladOption;