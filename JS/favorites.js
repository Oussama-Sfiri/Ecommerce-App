let productsInDB = JSON.parse(localStorage.getItem("products"));
let productsFavorite = localStorage.getItem("productsFavorite");
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

if(productsFavorite){
    let items = JSON.parse(productsFavorite);
    drawFavoritesProductsUI(items);
}

function drawFavoritesProductsUI(products){
    if(products.length == 0){
        noProductsDom.style.display = "block";
        noProductsDom.innerHTML = "There is no items in Favorites";
    }
        let productsUI = products.map((item) => {
            return `<div class="product-item">
                        <img src="${item.imageUrl}" class="product-item-img" alt="item" draggable="false">
                        <div class="product-item-desc">
                            <h2> ${item.title} </h2>
                            <p> ${item.desc} </p>
                            <span>Size : ${item.size}</span> <br>
                            <span>Quantity : ${item.qte}</span>
                        </div>
                        <div class="product-item-actions">
                            <button class="add-to-cart" onclick = "removeItemFromFavorite(${item.id})">Remove From Favorite</button>
                        </div>
                    </div>`
        })
        productsDom.innerHTML = productsUI.join("");
};

function removeItemFromFavorite(id){
    let productsFavorite = localStorage.getItem("productsFavorite");
    let shoosenItem = productsInDB.find((item) => item.id == id);
    if(productsFavorite){
        delete shoosenItem.liked
        productsInDB.map((item) => {
            if(item.id == shoosenItem.id){
                delete item.liked;
            }
        });
        localStorage.setItem("products" , JSON.stringify(productsInDB));
        
        let items = JSON.parse(productsFavorite);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsFavorite" , JSON.stringify(filteredItems));
        drawFavoritesProductsUI(filteredItems);
    }
};
