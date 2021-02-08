import React from "react";
import SaladCheckbox from "./SaladCheckbox";
import SaladOption from "./SaladOption";
import $ from "jquery";
import Salad from "./Salad";


class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {addedComponents: [],
                  addedFoundation: "",
                  addedDressing: ""}

    this.handleComponents = this.handleComponents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFoundation = this.handleFoundation.bind(this);
    this.handleDressing = this.handleDressing.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  
  handleSubmit(event) {
    event.preventDefault();
    event.target.classList.add("was-validated");
    if(event.target.checkValidity()){
      
      const {addedComponents, addedFoundation, addedDressing} = this.state;

      let salad = new Salad();
      addedComponents.map(v => salad.addItem(v));
      salad.addItem(addedDressing);
      salad.addItem(addedFoundation)
      this.props.addOrder(salad);

      
      this.setState({addedComponents: [], addedFoundation: "", addedDressing:""});
      
      
      if (event.nativeEvent.submitter.id === "order-and-pay")
        this.props.history.push("/view-order");
      event.target.classList.remove("was-validated");
    } 

  }

  handleCancel(event) {
    this.setState({addedComponents: [], addedFoundation: "", addedDressing:""});
  }

  handleFoundation(event) {
    
    let {value, parentElement} = event.target;
    parentElement.classList.add("was-validated");
    
    this.setState({addedFoundation: value});
  }

  handleDressing(event) {
    let {value, parentElement} = event.target;
    parentElement.classList.add("was-validated");
    
    this.setState({addedDressing: value});
  }

  handleComponents(event) {
    let {value, checked} = event.target;
    let {addedComponents} = this.state;
    if (checked) {
      addedComponents.push(value);
      this.setState(({addedComponents}));
    } else {
      this.setState({addedComponents: addedComponents.filter(v => v !== value)});
    }
  }
  

  render() {
    const {inventory} = this.props;
    const {addedComponents} = this.state;
    // test for correct ussage, the parent must send this datastructure
    if (!inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );

    let proteins = Object.keys(inventory).filter(
      name => inventory[name].protein
    );

    let extras = Object.keys(inventory).filter(
      name => inventory[name].extra
    );

    let dressing = Object.keys(inventory).filter(
      name => inventory[name].dressing
    );
   
    
    
    return (

      <form onSubmit={this.handleSubmit} noValidate>
        <div className="container">
        <div className="form-group">
          <h4>Välj bas</h4>
          <select value={this.state.addedFoundation} onChange={this.handleFoundation} className="custom-select" required> 
            <option value="" disabled hidden>Välj en bas</option>
            {foundations.map(name => (
              <SaladOption key={name}
                name={name} 
                price={inventory[name].price}  
              />  
            ))}
            </select>
            <div className="invalid-feedback">Vänligen välj en bas</div>
            
          </div>
          <div className="form-group">
          <h4>Välj protein</h4>
            
            {proteins.map(name => (
              <SaladCheckbox 
              key={name}
              handleChange={this.handleComponents} 
              name={name} 
              price={inventory[name].price} 
              checked={addedComponents.find(v => v === name) || false}/>  
            ))} 
          </div>
          <div className="form-group">
          <h4>Välj extras</h4>
              
            {extras.map(name => (
              <SaladCheckbox 
                key={name}
                handleChange={this.handleComponents} 
                name={name} 
                price={inventory[name].price} 
                checked={addedComponents.find(v => v === name) || false}/>
            ))}
          </div>
          <div className="form-group">
          <h4>Välj dressing</h4>
          <select value={this.state.addedDressing} onChange={this.handleDressing} className="custom-select" required>
            <option value="" disabled hidden>Välj en dressing</option>
            {dressing.map(name => (
              <SaladOption 
                key={name}
                name={name} 
                price={inventory[name].price} 
              />  
            ))}
            </select>
            <div className="invalid-feedback">Vänligen välj en dressing</div>
            </div>
            <div className="form-group">
            <button
                  type="button"
                  className="btn btn-secondary m-1"
                  onClick={this.handleCancel}>
                  Avbryt sallad
                </button>
                <button
                  id="order"
                  type="submit"
                  className="btn btn-success m-1"> 
                  Beställ
                </button>
                <button 
                    id="order-and-pay"
                    type="submit"
                    className="btn btn-primary m-1">
                  Beställ och betala
                </button>
            </div>
           
        </div>
      </form>

    );
  }
}

export default ComposeSalad;
