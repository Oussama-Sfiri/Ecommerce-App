let get_Username = localStorage.getItem("username");
let get_Email = localStorage.getItem("email");

// Variables
let editForm = document.getElementById("edit-profile-form");
let userNameInput = document.getElementById("changeName");
let userEmailInput = document.getElementById("changeEmail");
let avatarImageInput = document.getElementById("upload-avatar-file");
let avatarImageURL;

userNameInput.value = get_Username;
userEmailInput.value = get_Email;

// Events
editForm.addEventListener("submit" , editProfileData);
avatarImageInput.addEventListener("change" , uploadImage);

// Functions
function editProfileData(e){
    e.preventDefault();
    if(userNameInput.value && userEmailInput.value){
        localStorage.setItem("username" , userNameInput.value);
        localStorage.setItem("email" , userEmailInput.value);
        if(avatarImageURL){ 
            localStorage.setItem("avatarURL" , avatarImageURL);
        }
        setTimeout(() => {
            window.location = "profile.html";
        },500);
    }else{
        window.alert("Please fill all the data..");
    }
}

function uploadImage(){
    if(this.files[0]){
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

    }else{
        return;
    }
};

function getImageBase64(file){
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = function(){
        avatarImageURL = fileReader.result;
    };

    fileReader.onerror = function() {
        window.alert("ERROR on the fileReader!")
    };
};

