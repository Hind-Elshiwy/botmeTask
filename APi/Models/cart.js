//gets the old cart when it created

module.exports=class Cart {
    constructor(oldCart){
        this.items= oldCart.items || {};
        this.totalQty =oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;
    }

    //adding anew item to the cart
    add (item , id){
        var storedItem = this.items[id];
        //checking if this item groub alread existed or not
        if( !storedItem){
            storedItem = this.items[id] = {item: item, qty: 0 , price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };


    generatArray(){
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};