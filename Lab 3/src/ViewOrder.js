import React from 'react';
import OrderItem from './OrderItem';






class ViewOrder extends React.Component {


    render() {
        return (
            <div className="container">
            
                <h5>Din beställning</h5>
                
                
                <ol className="list-group">   
                    <li className="list-group-item">
                        <div className="row">
                        <div className="col"><b>ID</b></div>
                        <div className="col"><b>Ingredienser</b></div>
                        <div className="col text-center"><b>Pris</b></div>
                        </div>
                    </li>
                    {!this.props.order.length ? 
                    <li className="list-group-item justify-content-between align-items-center">Det finns inget i kundvagnen</li>
                    :
                    
                    this.props.order.map(salad => (
                        <OrderItem key={salad.id} salad={salad} onRemove={this.props.onRemove}/>
                    ))}
                    
                    
                </ol>
            
            </div>

        );
    }


}





export default ViewOrder;