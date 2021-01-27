import React from 'react';






class OrderItem extends React.Component {


    render() {
        let {salad} = this.props;
        
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {salad.print()}
                <span className="badge badge-primary badge-pill">{salad.price()}kr</span>
            </li>
            

        );
    }


}





export default OrderItem;