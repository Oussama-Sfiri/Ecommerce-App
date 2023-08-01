// Variables
let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let createForm = document.getElementById("create-form");
let inputFile = document.getElementById("upload-image-file");
let productSizeValue;
let productImageURL;

//Events
productSizeSelect.addEventListener("change" , getProductSizeValue);
createForm.addEventListener("submit" , createProductFun);
inputFile.addEventListener("change" , uploadImage);

//Functions
function getProductSizeValue(e){
    productSizeValue = e.target.value;
};

function createProductFun(e){
    e.preventDefault();
    if(localStorage.getItem("username")){
        let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB ;
        let nameValue = productName.value;
        let descValue = productDesc.value;
    
        if(nameValue && descValue){
            let newProduct = {
                id: allProducts ? allProducts.length + 1 : 1,
                title: nameValue,
                desc: descValue,
                imageUrl: productImageURL,
                size: productSizeValue,
                qte: 1,
                isMe: "Yes",
            };
    
            let newAllProducts = allProducts ? [...allProducts , newProduct] : [newProduct];
            localStorage.setItem("products" , JSON.stringify(newAllProducts));
    
            productName.value = "";
            productDesc.value = "";
            productSizeSelect.value = "";
    
            setTimeout(() => {
                window.location = "index.html";
            }, 500);
    
        }else{
            window.alert("Please fill all the data..");
        }

    }else{
        window.location = "login.html";
    }
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

