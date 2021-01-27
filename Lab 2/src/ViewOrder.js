import React from 'react';
import OrderItem from './OrderItem';






class ViewOrder extends React.Component {


    render() {
        return (
            <div className="container">
                <ol>
                    {this.props.order.map(salad => (
                        <OrderItem key={salad.id} salad={salad}/>
                    ))}
                </ol>
            </div>

        );
    }


}





export default ViewOrder;