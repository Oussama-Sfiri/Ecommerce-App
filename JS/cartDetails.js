let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productID = JSON.parse(localStorage.getItem("productDetailsID"));
let itemDetailsDom = document.querySelector(".item-details");

let productDetails = products.find((item) => item.id == productID);
itemDetailsDom.innerHTML = `
    <img src="${productDetails.imageUrl}" alt="item">
    <h2> ${productDetails.title} </h2>
    <p> ${productDetails.desc} </p>
    <span> Size: ${productDetails.size} </span> <br>
    <span> Quantity: ${productDetails.qte} </span>
`;

