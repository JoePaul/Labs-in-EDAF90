import React from "react";
import SaladCheckbox from "./SaladCheckbox";
import SaladOption from "./SaladOption";
import Salad from "./Salad";

import AlertOrder from "./AlertOrder";


class ComposeSalad extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {addedComponents: [],
                  addedFoundation: "",
                  addedDressing: "",
                  alertHidden: true}

    this.handleComponents = this.handleComponents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFoundation = this.handleFoundation.bind(this);
    this.handleDressing = this.handleDressing.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onHide = this.onHide.bind(this);

  }

  onHide() {
    this.setState({alertHidden: true});
  }

  
  handleSubmit(event) {
    event.preventDefault();
    Array.from(document.getElementsByClassName("form-group"))
           .forEach(element => element.classList.add("was-validated"));
    if(event.target.checkValidity()){
      
      const {addedComponents, addedFoundation, addedDressing} = this.state;
      const {inventory} = this.props;

      let salad = new Salad();
      addedComponents.map(v => salad.addItem(v, inventory[v]));
      salad.addItem(addedDressing, inventory[addedDressing]);
      salad.addItem(addedFoundation, inventory[addedFoundation])
      this.props.addOrder(salad);

      
      this.setState({addedComponents: [], addedFoundation: "", addedDressing:"", alertHidden: false});
      
      
      if (event.nativeEvent.submitter.id === "order-and-pay")
        this.props.history.push("/view-order");
      Array.from(document.getElementsByClassName("was-validated"))
           .forEach(element => element.classList.remove("was-validated"));
      
      window.scrollTo({top:0, behavior: 'smooth'});
    } 

  }

  handleCancel(event) {
    Array.from(document.getElementsByClassName("was-validated"))
           .forEach(element => element.classList.remove("was-validated"));
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
      <div className="container">
          <AlertOrder content="Salladen har blivit tillagd i din varukorg. Gå till Din Order för att se din beställning." hidden={this.state.alertHidden} onHide={this.onHide}/>
      
      <form onSubmit={this.handleSubmit} noValidate>
        
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
          
          <h4>Välj protein</h4>
            
            {proteins.map(name => (
              <SaladCheckbox 
              key={name}
              handleChange={this.handleComponents} 
              name={name} 
              price={inventory[name].price} 
              checked={addedComponents.find(v => v === name) || false}/>  
            ))} 
          
          
          <h4>Välj extras</h4>
          
            {extras.map(name => (
              <SaladCheckbox 
                key={name}
                handleChange={this.handleComponents} 
                name={name} 
                price={inventory[name].price} 
                checked={addedComponents.find(v => v === name) || false}/>
            ))}
          
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
           
        
      </form>
      </div>

    );
  }
}

export default ComposeSalad;
