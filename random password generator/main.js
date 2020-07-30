function getPassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%"
    var passwordLength = 10;
    var password = "";

    for(let i = 0; i <passwordLength; i++) {
        let randomNumber = Math.floor(Math.random()*chars.length);
        password += chars[randomNumber]
        
    }
    document.getElementById("password").value = password;
}

document.getElementById("btn").addEventListener("click",getPassword);