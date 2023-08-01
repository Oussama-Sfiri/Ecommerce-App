let getUsername = localStorage.getItem("username");
let getEmail = localStorage.getItem("email");
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let myProducts = products.filter((item) => item.isMe == "Yes");
let avatarURL = localStorage.getItem("avatarURL");

// Variables
let userNameDom = document.getElementById("username");
let userEmailDom = document.getElementById("email");
let productsLengthDom = document.querySelector("#productsLength span");
let avatarImageDom = document.getElementById("user-avatar");

if(avatarURL){ 
    avatarImageDom.setAttribute("src" , avatarURL);
}

userNameDom.innerHTML = getUsername;
userEmailDom.innerHTML = getEmail;
if(myProducts.length != 0){
    productsLengthDom.innerHTML = myProducts.length + " products";
}else{
    productsLengthDom.innerHTML = "0 products";
}
