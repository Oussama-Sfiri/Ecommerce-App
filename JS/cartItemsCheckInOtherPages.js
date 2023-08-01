// Variables
let cartProductMenue = document.querySelector(".carts-products");
let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shoppingCart");

// Events
shoppingCartIcon.addEventListener("click" , openCartMenue);

// Functions
let addedItems = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];
(function CheckingCartMenueData(){
    if(addedItems){
    addedItems.map((item) => {
        cartProductDivDom.innerHTML += `<p>${item.title} <span class="item-qte">${item.qte}</span> </p>`;
        badgeDom.style.display = "block";
        badgeDom.innerHTML = addedItems.length;
    });
    }
})();

function openCartMenue(){
    if(cartProductDivDom.innerHTML != ""){
        if(cartProductMenue.style.display == "none"){
            cartProductMenue.style.display = "block";
        }else{
            cartProductMenue.style.display = "none";
        }
    }
};

