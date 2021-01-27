import React from 'react';






class OrderItem extends React.Component {


    render() {
        let {salad} = this.props;
        
        return (
            <li key={salad["id"]} class="list-group-item d-flex justify-content-between align-items-center">
                {salad.print()}
                <span class="badge badge-primary badge-pill">{salad.price()}kr</span>
            </li>
            

        );
    }


}





export default OrderItem;