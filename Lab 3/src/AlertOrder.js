import React from "react";



class AlertOrder extends React.Component {


    render() {
        const {content, hidden, onHide} = this.props;
        let styling = "alert alert-success alert-dismissible fade";
        if (hidden) {
            styling += " collapse";
        } else {
            styling += " show";
        }
        return (

            <div className={styling} role="alert" id="salad-confirm">
                {content}
                <button type="button" className="close" onClick={onHide} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}


export default AlertOrder;