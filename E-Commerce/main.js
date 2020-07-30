if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded",ready);
}
else {
    ready();
}
let productInfo = [
    {
        image: "./product/vr.jpg",
        title: "Virtual Reality Helmet",
        price: "$199.99",
        code: 1,
        description:"(Virtual Reality headset) A head-worn apparatus that completely covers the eyes for an immersive 3D experience. Also called \"VR goggles,\" VR headsets may be entirely self-contained such as the Oculus Rift or the HTC Vive. They are costly and must be tethered to a very robust computer to handle the animation. Considerably less expensive units require the user's smartphone to be strapped onto the device."
    },
    {
        image:"./product/gundam.jpg",
        title:"Gundam Model",
        price:"$49.99",
        code: 2,
        description: "Gundam models are model kits depicting the vehicles and characters of the fictional Gundam multiverse by Bandai. These kits have become popular among mecha anime fans and model enthusiasts in Japan and in other nearby Asian countries since the 1980s. Gundam modeling spread in the 1990s with North America and Europe being exposed to Gundam through television, video and manga. Gundam models, as well as the hobby of assembling and painting them, is known in Japan as Gunpla"
    },
    {
        image: "./product/books.jpeg",
        title:"Light Novel Bundles",
        price:"$59.99",
        code:3,
        description: "Get the following six light novel books: Re:zero volume 1 to volume 5, Shuumatsu Nani Shitemasu ka Isogashii Desu ka Sukutte Moratte Ii Desu ka volume 1 to 5"

    }
]
function ready() {
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");

    menuBtn.addEventListener("click",() => {
        document.querySelector(".side-menu").style.display = "block";
        menuBtn.style.display = "none";
        closeBtn.style.display = "block";
    })
    closeBtn.addEventListener("click",() => {
        document.querySelector(".side-menu").style.display = "none";
        menuBtn.style.display = "block";
        closeBtn.style.display = "none";
    })
    
    //next and prev btns event Listeners
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");

    btnPrev.addEventListener("click",prevSlide);
    btnNext.addEventListener("click",nextSlide);

    //add item to cart eventListener
    document.querySelector(".btn-primary").addEventListener("click",cartButtonClicked);

    //listens for quantity changes. 
    document.querySelector(".product-amt").addEventListener("change",quantityChanged)

    //remove item from cart event listener
    let removeItems = document.getElementsByClassName("btn-danger")
    for(let i = 0; i < removeItems.length; i++) {
        removeItems[i].addEventListener("click",removeItem);
    }

    //purchase event Listener
    document.querySelector(".btn-info").addEventListener("click",purchaseItems);
}


//change to previous slide
let slideNumber = 0;
function prevSlide() {
    slideNumber--;
    if(slideNumber < 0) {
        slideNumber = productInfo.length-1;
    }
    $(".carousel-image").fadeOut(500,() => {
        document.querySelector(".carousel-image").src = productInfo[slideNumber].image;
    })
    $(".carousel-image").fadeIn(500);
    
    changeItemInfo(slideNumber);
}

// change to next slide
function nextSlide() {
    slideNumber++;
    if(slideNumber >=productInfo.length) {
        slideNumber = 0;
    }
    $(".carousel-image").fadeOut(500, () => {
        let carouselImage = document.getElementsByClassName("carousel-image")[0];
  
        carouselImage.src = productInfo[slideNumber].image;
    });
    $(".carousel-image").fadeIn(500)

    changeItemInfo(slideNumber)
}

//remove item;
function removeItem(e) {
    let item = e.target.parentElement.parentElement.parentElement;
    item.remove();
    updateCartTotal();
}

//changes item information
function changeItemInfo(index) {
    //change description
    const info = document.querySelector(".product-description p")
    info.innerHTML = productInfo[index].description;

    //change product title
    const product = document.getElementsByClassName("single-product")[0];
    let name = product.querySelector("h2");
    name.innerHTML = productInfo[index].title;

    //change product code
    const id = document.getElementById("product-id");
    id.innerHTML =`Product Code:  ${productInfo[index].code}`

    //change price
    const productPrice = product.getElementsByClassName("price")[0];
    productPrice.innerHTML = `USD: <span class = "actual-price">${productInfo[index].price}</span>`
}

//get the image,title price and quantity of the product
function cartButtonClicked(e) {
    const singleProduct = e.target.parentElement.parentElement.parentElement.parentElement
    
    let image = singleProduct.getElementsByClassName("carousel-image")[0].src;
    let title = singleProduct.getElementsByClassName("product-title")[0].textContent;
    let price = singleProduct.getElementsByClassName("actual-price")[0].textContent;
    let quantity = singleProduct.getElementsByClassName("product-amt")[0].value;
    
    addItemToList(image,title,price,quantity);
}

//Quantity Changed
function quantityChanged() {
    const inputAmt = document.querySelector(".product-amt");
    if(inputAmt.value <= 0) {
        alert("Number cant be less than 1")
        inputAmt.value = 1
        return;
    }
}

//Add item to cart
function addItemToList(image,title,price,quantity) {
    const itemList = document.querySelector(".items-list");
    let singleItem = document.createElement("div");
    singleItem.className = "single-item";

    singleItem.innerHTML = `
                    <div class="row">
                        <div class="col-md-3">
                            <img src = ${image} class = "cart-list">
                        </div>
                        <div class="col-md-3">
                            <h4>${title}</h4>
                        </div>
                        <div class="col-md-3">
                            <h4 class = "item-quantity">${quantity}</h4>
                        </div>
                        <div class="col-md-3">
                            <h4 class = "item-price"  style = "display:inline; margin-right:50px;">${price}</h4>
                            <button type = "button" class = "btn btn-danger">X</button>
                        </div>
                    </div>`

    itemList.appendChild(singleItem);
    let item = singleItem.getElementsByClassName("btn-danger")[0];
    item.addEventListener("click",removeItem)

    updateCartTotal();
}

//Items purchased
function purchaseItems() {
    alert("Thank you for your purchase!");
    let itemList = document.getElementsByClassName("items-list")[0];
    while(itemList.hasChildNodes()) {
        itemList.removeChild(itemList.firstChild);
    }
    updateCartTotal();
}

//update total price total = quantity*price;
function updateCartTotal() {
    const singleItem = document.getElementsByClassName("single-item");

    let total = 0;
    for(let i = 0; i < singleItem.length; i++) {
        let quantityElement = singleItem[i].getElementsByClassName("item-quantity")[0];
        let priceElement = singleItem[i].getElementsByClassName("item-price")[0];
        

        let quantity = parseInt(quantityElement.textContent);
        let price = parseFloat(priceElement.textContent.replace("$",""));
        total += quantity*price;
    }
    total = total.toFixed(2);
    const totalElement = document.querySelector(".total-container h3");
    totalElement.innerHTML = `Total: $${total}`;
}

updateCartTotal();