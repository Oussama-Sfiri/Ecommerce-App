let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBTN = document.querySelector("#sign_in");

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

loginBTN.addEventListener("click" , login);

function login(e){
    e.preventDefault();
    if(username.value == "" || password.value == ""){
        window.alert("Please Fill All The Inputs Below to SignIn");
    }else{
        if((getUser && username.value.trim() == getUser.trim())&&(getPassword && password.value.trim() == getPassword.trim())){
            setTimeout(()=>{
                window.location = "index.html";
            },1000)
        }else{
            window.alert("Usename or Password Incorrect !");
        }
    }
}
