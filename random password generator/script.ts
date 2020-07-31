function generatePass(e: any): void {
    let passwordLength: number;
    passwordLength = 10;

    let passwordChars: string;
    passwordChars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let i: number;
    let password: string;
    let char: number;
    password = "";
    for(i = 0; i < passwordLength; i++) {
        char = Math.floor(Math.random()*passwordChars.length)
        password = password + passwordChars[char];
    }
    
   let changePass =  document.getElementById("password") as HTMLInputElement;
  changePass.value = password;
}

let passBtn: HTMLHeadingElement;
passBtn = document.getElementById("btn");

passBtn.addEventListener("click", (e) => {
    generatePass(e.target);
})