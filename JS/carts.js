let productsInCart = localStorage.getItem("productsInCart");
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

if(productsInCart){
    let items = JSON.parse(productsInCart);
    drawCartProductsUI(items);
}

function drawCartProductsUI(products){

    if(products.length == 0){
        noProductsDom.style.display = "block";
        noProductsDom.innerHTML = "There is no items in the cart";
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
                            <button class="add-to-cart" onclick = "removeItemFromCart(${item.id})">Remove From Cart</button>
                        </div>
                    </div>`
        })

        productsDom.innerHTML = productsUI.join("");

};

function removeItemFromCart(id){
    let productsInCart = localStorage.getItem("productsInCart");
    if(productsInCart){
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart" , JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems);
    }
};

