import React from 'react';


class RemoveSaladModal extends React.Component {


    render() {
        return (

            <div className="modal fade" tabIndex="-1" role="dialog" id="removeSaladModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ta bort</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Är du säker på att du vill ta bort den här salladen?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.props.onRemove}>Ta bort sallad</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Stäng</button>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default RemoveSaladModal;