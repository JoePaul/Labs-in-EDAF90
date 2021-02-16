import React from "react";
import ComposeSalad from "./ComposeSalad";

 // skip this if you do not use bootstrap modals

class ChangeSaladModal extends React.Component {

  render() {
    return (
      <div>
        <div className="text-center">
        </div>
        <div
          className="modal fade"
          id="changeSaladModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="changeSaladModalModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              
              <div className="modal-header">
                <h5 className="modal-title" id="changeSaladModalModalLabel">
                    Ändra sallad
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ComposeSalad inventory={this.props.inventory} updateSalad={this.props.updateSalad} salad={this.props.salad}/>
              </div>

              
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangeSaladModal;
