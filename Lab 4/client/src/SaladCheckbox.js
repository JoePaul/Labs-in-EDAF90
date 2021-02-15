import React from "react";
import PropTypes from 'prop-types';


class SaladCheckbox extends React.Component {
    render() {
        const {name, price, handleChange, checked} = this.props;
        
        return (
            <div className="form-check">
                <input checked={checked} key={name} onChange={handleChange} className="form-check-input"  type="checkbox" value={name} id={name}></input>
                <label className="form-check-label" htmlFor={name}>{name} +{price} kr 
                </label>
                
            </div>
        );
    }

}
SaladCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default SaladCheckbox;