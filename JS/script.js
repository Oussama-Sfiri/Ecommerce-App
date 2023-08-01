let productsDom = document.querySelector(".products");
let cartProductMenue = document.querySelector(".carts-products");
let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let products = productsDB;

let drawProductsUI;
(drawProductsUI = function(products = []){
    let productsUI = products.map((item) => {
        return `<div class="product-item" style="border: ${item.isMe == "Yes" ? "2px solid darkblue" : "" }">
                    <img src="${item.imageUrl}" class="product-item-img" alt="item" draggable="false">
                    <div class="product-item-desc">
                        <a onclick = "saveProductDetailsID(${item.id})"> ${item.title} </a>
                        <p> ${item.desc} </p>
                        <span>Size : ${item.size}</span> <br>
                        ${item.isMe == "Yes" ? `<button class="edit-product" onclick="saveEditProductID(${item.id})">Edit Product</button>` : ""}
                    </div>
                    <div class="product-item-actions">
                        <button class="add-to-cart" onclick = "addedToCart(${item.id})">Add To Cart</button>
                        <i class="favorite fa-solid fa-heart" style = "color: ${item.liked == true ? "red" : "" } " onclick = "addToFavorite(${item.id})"></i>
                    </div>
                </div>`
    })
    productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);


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

function addedToCart(id){
    if(localStorage.getItem("username")){
        let products = JSON.parse(localStorage.getItem("products")) || productsDB ;
        let shoosenItem = products.find((item) => item.id == id );
        let isProductInCart = addedItems.some((i) => i.id == shoosenItem.id);
        if(isProductInCart){ 
            addedItems = addedItems.map((item) => {
                if(item.id == shoosenItem.id){
                    item.qte += 1;
                }
                    return item;
            });
        }else{
            addedItems.push(shoosenItem);
        }

        cartProductDivDom.innerHTML = "";
        addedItems.forEach((item) => {
            cartProductDivDom.innerHTML += `<p>${item.title} <span class="item-qte">${item.qte}</span> </p>`;
        });

        localStorage.setItem("productsInCart" , JSON.stringify(addedItems));

        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductItems.length;
    }else{
        window.location = "login.html";
    }
};

function getUniqueArr(arr , filterCriteria){
    let unique = arr.map((item) => item[filterCriteria])
                    .map((item , i, final) => final.indexOf(item) == i && i)
                    .filter((item) => arr[item])
                    .map((item) => arr[item])
    return unique;
};

shoppingCartIcon.addEventListener("click" , openCartMenue);
function openCartMenue(){
    if(cartProductDivDom.innerHTML != ""){
        if(cartProductMenue.style.display == "none"){
            cartProductMenue.style.display = "block";
        }else{
            cartProductMenue.style.display = "none";
        }
    }
};

function saveProductDetailsID(id){
    localStorage.setItem("productDetailsID" , id);
    window.location = "cartDetails.html"
};

let searchInput = document.getElementById("search");
searchInput.addEventListener("keyup" , function(e){
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    search(e.target.value.trim() , products);
    if(e.target.value.trim() == ""){
        drawProductsUI(JSON.parse(localStorage.getItem("products")));
    }
});

function search(title , ProductsArray){
    let foundItemArr = ProductsArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) != -1);
    drawProductsUI(foundItemArr);
}


let favoriteItems = localStorage.getItem("productsFavorite") ? JSON.parse(localStorage.getItem("productsFavorite")) : [];
function addToFavorite(id){
    if(localStorage.getItem("username")){
        
        let products = JSON.parse(localStorage.getItem("products")) || productsDB ;
        let shoosenItem = products.find((item) => item.id == id );

        if(!shoosenItem.liked){

            shoosenItem.liked = true;
            favoriteItems = [...favoriteItems , shoosenItem];
            let uniqueFavoriteProducts = getUniqueArr(favoriteItems , "id");
            localStorage.setItem("productsFavorite" , JSON.stringify(uniqueFavoriteProducts));
            products.map((item) => {
                if(item.id == shoosenItem.id){
                    item.liked = true;
                }
            });
            localStorage.setItem("products" , JSON.stringify(products));
            drawProductsUI(products);
       
        }else{

            delete shoosenItem.liked;
            let items = JSON.parse(localStorage.getItem("productsFavorite"));
            let filteredItems = items.filter((item) => item.id !== shoosenItem.id);
            localStorage.setItem("productsFavorite" , JSON.stringify(filteredItems));
            products.map((item) => {
                if(item.id == shoosenItem.id){
                    delete item.liked; 
                }
            });
            localStorage.setItem("products" , JSON.stringify(products));
            drawProductsUI(products);
        }
        
    }else{
        window.location = "login.html";
    }
};


let sizeFilter = document.getElementById("size-filter");
sizeFilter.addEventListener("change" , getProductsFilteredBySize);
function getProductsFilteredBySize(e){
    let filterValue = e.target.value;
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;

    if(filterValue == "all"){
        drawProductsUI(products);
    }else{
        filteredProducts = products.filter((item) => item.size == filterValue);
        drawProductsUI(filteredProducts);
    }
};


function saveEditProductID(id){
    localStorage.setItem("editProductID" , id);
    window.location = "editProduct.html";
}
