'use strict';
const inv = require("./inventory.js");

const foundations = Object.keys(inv.inventory).filter(item => inv.inventory[item]["foundation"]);
const proteins = Object.keys(inv.inventory).filter(item => inv.inventory[item]["protein"]);
const extras = Object.keys(inv.inventory).filter(item => inv.inventory[item]["extra"]);
const dressing = Object.keys(inv.inventory).filter(item => inv.inventory[item]["dressing"]);

class Salad {
    constructor() {
        
        this.foundation = {};
        this.protein = [];
        this.extra = [];
        this.dressing = {};
        
    };


    addItem = (item) => {
        let itemObject = inv.inventory[item]; 
        let {foundation, protein, extra, dressing} = this;
        if (itemObject.foundation && foundation) {
            foundation[item] = itemObject;
        } else if (itemObject.protein) {
            protein.push({[item]:itemObject});
        } else if (itemObject.extra) {
            extra.push({[item]:itemObject});
        } else if (itemObject.dressing && dressing) {
            dressing[item] = itemObject;
        }
        
    
    };

    removeItem = (item) => {
        
        let {foundation, protein, extra, dressing} = this;
        if (foundation[item]) {
            delete foundation[item];
        } else if (proteins.includes(item)) {
            this.protein = protein.filter(product => !product[item]);
        } else if (extras.includes(item)) {
            this.extra = extra.filter(product => !product[item]);
        } else if (dressing[item]) {
            delete dressing[item];
        }
    };

    price = () => {
        let {foundation, protein, extra, dressing} = this;
        let cost =  protein.concat(foundation, dressing, extra)
                    .map(v => Object.keys(v).map(a => v[a].price)).flat()
                    .reduce((sum, price) => sum + price);
        return cost;
    };


}


let myCesarSalad = new Salad();
myCesarSalad.addItem("Sallad");
myCesarSalad.addItem("Kycklingfilé");

myCesarSalad.addItem("Parmesan");
myCesarSalad.addItem("Bacon");
myCesarSalad.addItem("Tomat");
myCesarSalad.addItem("Krutonger");
myCesarSalad.addItem("Ceasardressing");


console.log(myCesarSalad.price());


class ExtraGreenSalad extends Salad {

    price = () => {
        let {foundation, protein, extra, dressing} = this;
        
        let cost =  protein.concat(foundation, dressing, extra)
                    .map(v => Object.keys(v).map(a => v[a].price * (v[a].foundation ? 1.3 : 0.5)))
                    .flat()
                    .reduce((sum, price) => sum + price);
        
        return cost;
    };
}

let mySalad = new ExtraGreenSalad();
mySalad.addItem("Sallad");
mySalad.addItem("Kycklingfilé");
mySalad.addItem("Parmesan");
mySalad.addItem("Bacon");
mySalad.addItem("Tomat");
mySalad.addItem("Krutonger");
mySalad.addItem("Ceasardressing");

console.log(mySalad.price());




class GourmetSalad {
    

    constructor() {
        
        this.foundation = {};
        this.protein = [];
        this.extra = [];
        this.dressing = {};
    
};

   
    addItem = (item, size = 1) => {
        let itemObject = {...inv.inventory[item], size};
         
        let {foundation, protein, extra, dressing} = this;
        if (itemObject.foundation) {
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
        
        let {foundation, protein, extra, dressing} = this;
        if (foundation[item]) {
            delete foundation[item];
        } else if (proteins.includes(item)) {
            this.protein = protein.filter(product => !product[item]);
        } else if (extras.includes(item)) {
            this.extra = extra.filter(product => !product[item]);
        } else if (dressing[item]) {
            delete dressing[item];
        }
    };

    price = () => {
        let {foundation, protein, extra, dressing} = this;
        let cost =  protein.concat(foundation, dressing, extra)
                    .map(v => Object.keys(v).map(a => v[a].price * v[a].size)).flat()
                    .reduce((sum, price) => sum + price);
        return cost;
    };
    
}
new GourmetSalad();
new GourmetSalad();
new GourmetSalad();
new GourmetSalad();

mySalad = new GourmetSalad();
mySalad.addItem("Sallad");
mySalad.addItem("Kycklingfilé", 1.5);
mySalad.addItem("Parmesan");
mySalad.addItem("Bacon", 1);
mySalad.addItem("Tomat");
mySalad.addItem("Krutonger");
mySalad.addItem("Ceasardressing");

