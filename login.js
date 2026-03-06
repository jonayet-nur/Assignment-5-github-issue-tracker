document.getElementById("sign-btn").addEventListener("click",function(){

    // 1 get the username input
    const inputName = document.getElementById("user-btn");
    const userName = inputName.value;

    // 2 get the password input
    const inputPass = document.getElementById("pass-btn");
    const userPass = inputPass.value;

    //match username & password
    if(userName == "admin" && userPass == "admin123"){
        alert("Login Successfull");
        window.location.assign("home.html");
    }
    else{
        alert("Login Failed");
        return;
    }
})