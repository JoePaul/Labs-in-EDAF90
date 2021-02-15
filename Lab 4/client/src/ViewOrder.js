import React from 'react';
import OrderItem from './OrderItem';
import RemoveSaladModal from "./RemoveSaladModal";






class ViewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {idToRemove:-1}
        this.removeId = this.removeId.bind(this);
    }


    removeId(id) {
        this.setState({idToRemove: id})
    }

    render() {
        return (
            <div className="container">
            
                <h5>Din beställning</h5>
                
                <ol className="list-group">   
                    <li className="list-group-item">
                        <div className="row">
                        {
                        //<div className="col"><b>ID</b></div>
                        }
                        <div className="col"><b>Ingredienser</b></div>
                        <div className="col text-center"><b>Pris</b></div>
                        </div>
                    </li>
                    {!this.props.order.length ? 
                    <li className="list-group-item justify-content-between align-items-center">Finns inget i kundvagnen</li>
                    :
                    this.props.order.map(salad => (
                        <OrderItem key={salad.id} salad={salad} removeId={this.removeId}/>
                    ))}
                </ol>
                        
                <RemoveSaladModal onRemove={() => this.props.onRemove(this.state.idToRemove)}/>
            </div>

        );
    }


}





export default ViewOrder;