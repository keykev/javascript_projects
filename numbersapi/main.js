
async function getFact(e) {
    const numberFact = document.getElementById("number-fact")
        let userNumber = e.target.value;
        //console.log(userNumber);
    //Ajax approach

    // const xhr = new XMLHttpRequest();

    //     xhr.open("GET","http://numbersapi.com/"+userNumber,true);
    //     xhr.onload = function() {
    //         if(xhr.status == 200 && userNumber != "") {
    //             numberFact.innerHTML = xhr.responseText;
    //         }
    //     }
    //     xhr.send();

    //Async/await approach
    
    let response = await fetch("http://numbersapi.com/"+userNumber);
    let fact = await response.text();
    if(userNumber != "") {
        numberFact.innerHTML = fact;
    }
        
}

document.getElementById("number").addEventListener("input",getFact);

