import React from 'react';
import Salad from './Salad';
import $ from 'jquery';




class OrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.openRemoveModal = this.openRemoveModal.bind(this);
        this.openChangeModal = this.openChangeModal.bind(this);
    }
    
    openRemoveModal(id) {
        this.props.removeId(id);
        $("#removeSaladModal").modal("show");
    }

    openChangeModal(salad) {
        this.props.updateSalad(salad);
        $('#changeSaladModal').modal('show')
    }
    
    render() {
        const {salad} = this.props;
        const {id, foundation, protein, extra, dressing} = salad;

        
        return (
            <li className="list-group-item justify-content-between align-items-center">
                <div className="row">
                {
                <div className="col-sm">{id}</div>
                }
                <div className="col">{`${Object.keys(foundation)};    
                                          ${protein.map(v => Object.keys(v))};    
                                          ${extra.map(v => Object.keys(v))};   
                                          ${Object.keys(dressing)}`}</div>
                
                <div className="col text-right" >
                    <span className="badge badge-primary badge-pill m-1">{Salad.price(salad)}kr</span>
                    <span type="button" onClick={() => this.openChangeModal(salad)} className="badge badge-warning badge-pill m-1" value={salad}>Ändra</span>
                    <span type="button" onClick={() => this.openRemoveModal(id)} className="badge badge-danger badge-pill m-1">Ta bort</span>
                    
                </div>
                </div>
            </li>

            
            

        );
    }


}





export default OrderItem;