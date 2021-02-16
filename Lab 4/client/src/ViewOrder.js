import React from 'react';
import ChangeSaladModal from './ChangeSaladModal';
import OrderItem from './OrderItem';
import RemoveSaladModal from "./RemoveSaladModal";
import $ from 'jquery';
import AlertOrder from './AlertOrder';


class ViewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {idToRemove:-1, 
                      saladToUpdate: undefined,
                      alertHidden: true}
        this.removeId = this.removeId.bind(this);
        this.updateSalad = this.updateSalad.bind(this);  
        this.payForOrder = this.payForOrder.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    updateSalad(salad) {
        this.setState({saladToUpdate: salad}, () => $('#changeSaladModal').modal('show'));
        
    }

    payForOrder() {
        if(this.props.order.length){
            this.props.submitOrder()
            this.setState({alertHidden: false})
        }
    }

    onHide() {
        this.setState({alertHidden: true});
    }


    removeId(id) {
        this.setState({idToRemove: id});
    }

    render() {
        
        return (
            <div className="container">
                <AlertOrder content="Grattis! Din sallad är snart påväg vart du än befinner dig!" hidden={this.state.alertHidden} onHide={this.onHide}/>
                <h5>Din beställning</h5>
                
                <ol className="list-group">   
                    <li className="list-group-item">
                        <div className="row">
                        {
                        <div className="col"><b>ID</b></div>
                        }
                        <div className="col"><b>Ingredienser</b></div>
                        <div className="col text-center"><b>Pris</b></div>
                        </div>
                    </li>
                    {!this.props.order.length ? 
                    <li className="list-group-item justify-content-between align-items-center">Finns inget i kundvagnen</li>
                    :
                    this.props.order.map(salad => (
                        <OrderItem key={salad.id} salad={salad} removeId={this.removeId} updateSalad={this.updateSalad}/>
                    ))}
                </ol>

                <div className="text-right">
                    <button className="btn btn-primary m-2" onClick={this.payForOrder}>
                        Betala
                    </button>

                </div>
                        
                <RemoveSaladModal onRemove={() => this.props.onRemove(this.state.idToRemove)}/>
                <ChangeSaladModal inventory={this.props.inventory} salad={this.state.saladToUpdate} updateSalad={this.props.updateSalad}/>
            </div>

        );
    }


}





export default ViewOrder;