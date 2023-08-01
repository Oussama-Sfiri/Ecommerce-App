let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

let drawMyProductsUI;
(drawMyProductsUI = function(products = []){
    let myProducts = products.filter((item) => item.isMe == "Yes");

    if(myProducts.length == 0){
        productsDom.innerHTML = "";
        noProductsDom.style.display = "block";
        noProductsDom.innerHTML = "There is no items in MyProducts Page";
    }else{

        let productsUI = myProducts.map((item) => {
            return `<div class="product-item" style="border: 2px solid darkblue ">
                        <img src="${item.imageUrl}" class="product-item-img" alt="item" draggable="false">
                        <div class="product-item-desc">
                            <a onclick = "saveProductDetailsID(${item.id})"> ${item.title} </a>
                            <p> ${item.desc} </p>
                            <span>Size : ${item.size}</span> <br>
                            <span>Qte : ${item.qte}</span> <br>
                            <button class="edit-product" onclick="saveEditProductID(${item.id})">Edit Product</button>
                            <button class="delete-product" onclick="deleteProduct(${item.id})">Delete Product</button>
                        </div>
                    </div>`
        })
        productsDom.innerHTML = productsUI.join("");
    }
})(products);

function saveEditProductID(id){
    localStorage.setItem("editProductID" , id);
    window.location = "editProduct.html";
}

function deleteProduct(id){
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let filteredMyProducts = products.filter((item) => item.id != id);
    localStorage.setItem("products" , JSON.stringify(filteredMyProducts));
    drawMyProductsUI(filteredMyProducts);
}
