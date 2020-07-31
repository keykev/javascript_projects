function generatePass(e) {
    var passwordLength;
    passwordLength = 10;
    var passwordChars;
    passwordChars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var i;
    var password;
    var char;
    password = "";
    for (i = 0; i < passwordLength; i++) {
        char = Math.floor(Math.random() * passwordChars.length);
        password = password + passwordChars[char];
    }
    var changePass = document.getElementById("password");
    changePass.value = password;
}
var passBtn;
passBtn = document.getElementById("btn");
passBtn.addEventListener("click", function (e) {
    generatePass(e.target);
});
