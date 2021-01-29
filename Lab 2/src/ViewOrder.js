import React from 'react';
import OrderItem from './OrderItem';






class ViewOrder extends React.Component {


    render() {
        return (
            <div className="container">
            
                <h5>Din beställning</h5>
                <ol>
                    {this.props.order.map(salad => (
                        <OrderItem key={salad.id} salad={salad} onRemove={this.props.onRemove}/>
                    ))}
                </ol>
            
            </div>

        );
    }


}





export default ViewOrder;