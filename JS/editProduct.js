// Variables
let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let updateForm = document.getElementById("update-form");
let inputFile = document.getElementById("upload-image-file");
let productSizeValue;
let productImageURL;

let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productID = JSON.parse(localStorage.getItem("editProductID"));
let getProduct = products.find((item) => item.id == productID);

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
productImageURL = getProduct.imageUrl;

// Events
productSizeSelect.addEventListener("change" , getProductSizeValue);
updateForm.addEventListener("submit" , updateProductFun);
inputFile.addEventListener("change" , uploadImage);

//Functions
function getProductSizeValue(e){
    productSizeValue = e.target.value;
};


function updateProductFun(e){
    e.preventDefault();
    getProduct.title = productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size = productSizeSelect.value;
    getProduct.imageUrl = productImageURL;

    localStorage.setItem("products" , JSON.stringify(products));

    setTimeout(() => {
        window.location = "index.html"
    },500);
};

function uploadImage(){
    let fileImage = this.files[0];
    let types = ["image/png","image/jpeg","image/jpg","image/webp"];

    if(types.indexOf(fileImage.type) == -1){
        window.alert("Type of image not supported");
        return;
    }
    if(fileImage.size > 10*1024*1024){
        window.alert("Size of image exceed 10 MB");
        return;
    }

    getImageBase64(fileImage);
};

function getImageBase64(file){
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = function(){
        productImageURL = fileReader.result;
    };

    fileReader.onerror = function() {
        window.alert("ERROR on the fileReader!")
    };
};

