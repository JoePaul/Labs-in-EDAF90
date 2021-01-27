import React from "react";
import PropTypes from 'prop-types';


class SaladOption extends React.Component {
    render() {
        let {name, price} = this.props;
        
        return (
            <option value={name} key={name}>{name} +{price} kr</option>

        );
    }

}


SaladOption.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default SaladOption;