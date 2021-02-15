import React from 'react';
import Salad from './Salad';







class OrderItem extends React.Component {

    
    // onRemoveSalad() {
    //     $("")
    // }
    render() {
        const {salad, onRemove} = this.props;
        const {id, foundation, protein, extra, dressing} = salad;
        
        return (
            <li className="list-group-item justify-content-between align-items-center">
                <div className="row">
                <div className="col-sm">{id}</div>
                <div className="col">{`${Object.keys(foundation)};    
                                          ${protein.map(v => Object.keys(v))};    
                                          ${extra.map(v => Object.keys(v))};   
                                          ${Object.keys(dressing)}`}</div>
                
                <div className="col text-right" >
                    <span className="badge badge-primary badge-pill m-1">{Salad.price(salad)}kr</span>
                    <span type="button" onClick={() => (`Du vill ändra sallad med id ${id}`)} className="badge badge-warning badge-pill m-1">Ändra</span>
                    <span type="button" onClick={() => onRemove(id)} className="badge badge-danger badge-pill m-1">Ta bort</span>
                    
                </div>
                {/* <div class="modal" tabindex="-1" role="dialog">
                     <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Ta bort</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    <div class="modal-body">
                        <p>Är du säker på att du vill ta bort den här salladen?</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Ta bort sallad</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Stäng</button>
      </div>
    </div>
  </div>
</div> */}
                </div>
            </li>

        );
    }


}





export default OrderItem;