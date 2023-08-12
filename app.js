//Variable that maintains the visible state of the cart
var cartVisible = false;

//We wait for all the elements of the page to load to execute the script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Let's add functionality to the remove from cart buttons
    var buttonsEliminateItem = document.getElementsByClassName('btn-eliminate');
    for(var i=0;i<buttonsEliminateItem.length; i++){
        var button = buttonsEliminateItem[i];
        button.addEventListener('click',eliminateItemCart);
    }

    //Add functionality to the add quantity button
    var buttonsAddAmount = document.getElementsByClassName('add-amount');
    for(var i=0;i<buttonsAddAmount.length; i++){
        var button = buttonsAddAmount[i];
        button.addEventListener('click',addAmount);
    }

    //Add functionality to the subtract amount button
    var buttonsSubtractAmount = document.getElementsByClassName('subtract-amount');
    for(var i=0;i<buttonsSubtractAmount.length; i++){
        var button = buttonsSubtractAmount[i];
        button.addEventListener('click',subtractAmount);
    }

    //Add functionality to the Add to cart button
    var buttonsAddToCart = document.getElementsByClassName('button-item');
    for(var i=0; i<buttonsAddToCart.length;i++){
        var button = buttonsAddToCart[i];
        button.addEventListener('click', addToCartClicked);
    }

    //Add functionality to the buy button
    document.getElementsByClassName('btn-pay')[0].addEventListener('click',payClicked)
}
// We remove all items from the cart and hide it
function payClicked(){
    alert("Thank you for purchasing");
    //Remove all cart items
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotalCart();
    hideCart();
}
//Function that controls the clicked button to add to the cart
function addToCartClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('title-item')[0].innerText;
    var price = item.getElementsByClassName('price-item')[0].innerText;
    var imageSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imageSrc);

    addItemToCart(title, price, imageSrc);

    makeVisibleCart();
}

//Function that makes the cart visible
function makeVisibleCart(){
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

//Function that adds an item to the cart
function addItemToCart(title, price, imageSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCart = document.getElementsByClassName('cart-items')[0];

    //we check that the item you are trying to enter is not in the cart
    var namesItemsCart = itemsCart.getElementsByClassName('cart-item-title');
    for(var i=0;i < namesItemsCart.length;i++){
        if(namesItemsCart[i].innerText==title){
            alert("The item is already in the cart");
            return;
        }
    }

    var itemCartContainer = `
        <div class="cart-item">
            <img src="${imageSrc}" width="80px" alt="">
            <div class="cart-item-details">
                <span class="cart-item-title">${title}</span>
                <div class="selector-amount">
                    <i class="fa-solid fa-minus subtract-amount" class="btn-mius-plus" ></i>
                    <input type="text" value="1" class="cart-item-amount" disabled>
                    <i class="fa-solid fa-plus add-amount class="btn-mius-plus""></i>
                </div>
                <span class="cart-item-price">${price}</span>
            </div>
            <button class="btn-eliminate">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCartContainer;
    itemsCart.append(item);

    //Add the delete functionality to the new item
    item.getElementsByClassName('btn-eliminate')[0].addEventListener('click', eliminateItemCart);

    //Add the subtract amount of the new item functionality
    var buttonSubtractAmount = item.getElementsByClassName('subtract-amount')[0];
    buttonSubtractAmount.addEventListener('click',subtractAmount);

    // We add the functionality to add quantity of the new item
    var buttonAddAmount = item.getElementsByClassName('add-amount')[0];
    buttonAddAmount.addEventListener('click',addAmount);

    //We update total
    updateTotalCart();
}
//Increase the number of the selected element by one
function addAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-amount')[0].value);
    var amountUpdate = selector.getElementsByClassName('cart-item-amount')[0].value;
    amountUpdate++;
    selector.getElementsByClassName('cart-item-amount')[0].value = amountUpdate;
    updateTotalCart();
}
//Remainder by one the quantity of the selected item
function subtractAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-amount')[0].value);
    var amountUpdate = selector.getElementsByClassName('cart-item-amount')[0].value;
    amountUpdate--;
    if(amountUpdate>=1){
        selector.getElementsByClassName('cart-item-amount')[0].value = amountUpdate;
        updateTotalCart();
    }
}

//Remove the selected item from the cart
function eliminateItemCart(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Update the cart total
    updateTotalCart();

    //the following function checks if there are items in the cart
    // If there is not, I delete the cart
    hideCart();
}
//Function that checks if there are items in the cart. If there is no hidden cart.
function hideCart(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount==0){
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;
    
        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}
//Update the cart total
function updateTotalCart(){
    //select the cart container
    var cartContainer = document.getElementsByClassName('cart')[0];
    var cartItems = cartContainer.getElementsByClassName('cart-item');
    var total = 0;
    // iterate through each item in the cart to update the total
    for(var i=0; i< cartItems.length;i++){
        var item = cartItems[i];
        var priceElement = item.getElementsByClassName('cart-item-price')[0];
        //remove the weight symbol and the thousandths point.
        var price = parseFloat(priceElement.innerText.replace('$','').replace('.','.'));
        var amountItem = item.getElementsByClassName('cart-item-amount')[0];
        console.log(price);
        var amount = amountItem.value;
        total = total + (price * amount);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('cart-price-total')[0].innerText = '$'+total.toLocaleString("es") + ".00";

}








