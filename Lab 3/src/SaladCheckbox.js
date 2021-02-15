import React from "react";
import PropTypes from 'prop-types';


class SaladCheckbox extends React.Component {
    render() {
        const {name, price, handleChange, checked} = this.props;
        
        return (
            <div className="form-check">
                <input checked={checked} key={name} onChange={handleChange} className="form-check-input"  type="checkbox" value={name} id={name}/>
                <label className="form-check-label" htmlFor={name}>{name} +{price} kr</label>
            </div>
        );
    }

}

export default SaladCheckbox;