'use strict';
import inventory from "./inventory.ES6";;


const foundations = Object.keys(inventory).filter(item => inventory[item]["foundation"]);
const proteins = Object.keys(inventory).filter(item => inventory[item]["protein"]);
const extras = Object.keys(inventory).filter(item => inventory[item]["extra"]);
const dressing = Object.keys(inventory).filter(item => inventory[item]["dressing"]);


class Salad {


    constructor(id) {
        this.id = id;
        this.salad = {
            foundation: {},
            protein: [],
            extra: [],
            dressing: {}
        }

    };

    static getUniqueID() {
        let id = 1;
        return _ => id++;
    }

    addItem = (item, size = 1) => {
        let itemObject = {...inventory[item], size};
         
        let {foundation, protein, extra, dressing} = this.salad;
        if (itemObject.foundation && foundation) {
            foundation[item] = itemObject;
        } else if (itemObject.protein) {
            protein.push({[item]:itemObject});
        } else if (itemObject.extra) {
            extra.push({[item]:itemObject});
        } else if (itemObject.dressing) {
            dressing[item] = itemObject;
        }
        
    
    };

    removeItem = (item) => {
        
        let {foundation, protein, extra, dressing} = this.salad;
        if (foundation[item]) {
            delete foundation[item];
        } else if (proteins.includes(item)) {
            this.salad.protein = protein.filter(product => !product[item]);
        } else if (extras.includes(item)) {
            this.salad.extra = extra.filter(product => !product[item]);
        } else if (dressing[item]) {
            delete dressing[item];
        }
    };

    price = () => {
        let {foundation, protein, extra, dressing} = this.salad;
        let cost =  protein.concat(foundation, dressing, extra)
                    .map(v => Object.keys(v).map(a => v[a].price * v[a].size)).flat()
                    .reduce((sum, price) => sum + price);
        return cost;
    };

    print() {
        let {foundation, protein, extra, dressing} = this.salad;
        return `${this.id}; 
        ${Object.keys(foundation)};    
        ${protein.map(v => Object.keys(v))};    
        ${extra.map(v => Object.keys(v))};   
        ${Object.keys(dressing)}`; 
    }
    
}



export default Salad;