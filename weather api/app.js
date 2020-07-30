window.addEventListener("load", () => {
// const variables
    let long;
    let lat;
    let API_KEY = "3d2e27ef60184f4213e237c0eae2fbf8"
    
// DOM elements
    const tempDegree = document.querySelector(".temperature-degree");
    const tempDesc = document.querySelector(".temperature-description");
    const locTimezone = document.querySelector(".location-timezone");
    const degrees = document.querySelector(".degree-section");
    const tempUnit = document.querySelector(".degree-section span")

// Getting lat long data.
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = parseInt(position.coords.longitude);
            lat = parseInt(position.coords.latitude);
            //const api = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}`
            const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`
            fetch(api)
            .then(res =>res.json())
            .then(data => {
                //console.log(data)
                const {temp} = data.list[0].main;
                const {description} = data.list[0].weather[0]
                //console.log(temp);
                //console.log(description);
                tempDegree.textContent = temp;
                tempDesc.textContent = description;
                locTimezone.textContent = `${data.city.country}/${data.city.name}`;
            })
            
        }); 
    }

//Convert units 
    degrees.addEventListener("click",() => {
        if(!degrees.classList.contains("celsius")) {
            let newTemp = (parseInt(tempDegree.textContent) - 273)
            console.log(newTemp);
            tempDegree.textContent = newTemp
            tempUnit.textContent = "C";
            degrees.classList.add("celsius");
        }
        else {
            let newTemp = (parseInt(tempDegree.textContent) + 273)
            tempDegree.textContent = newTemp;
            tempUnit.textContent = "K";
            degrees.classList.remove("celsius");
        }
    })
})  