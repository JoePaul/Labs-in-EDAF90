import React from 'react';






class OrderItem extends React.Component {

    

    render() {
        let {salad, onRemove} = this.props;
        
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {salad.print()}
                <div className="text-right" >
                    <span className="badge badge-primary badge-pill" style={{margin:3}}>{salad.price()}kr</span>
                    <span type="button" onClick={() => (`Du vill ändra sallad med id ${salad.id}`)} className="badge badge-warning badge-pill">Ändra</span>
                    <span type="button" onClick={() => onRemove(salad.id)} className="badge badge-danger badge-pill">Remove</span>
                    
                </div>
            </li>
            

        );
    }


}





export default OrderItem;