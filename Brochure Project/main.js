// // dynamically change date;
// const date = document.getElementById("date");
// date.innerHTML = new Date().getFullYear();

document.querySelector(".bars").addEventListener("click", () => {
  const linksContainer = document.querySelector(".links-container");
  const links = document.querySelector(".links");
  const linksHeight = links.getBoundingClientRect().height;
  console.log(linksHeight)
  const linkContainerHeight = linksContainer.getBoundingClientRect().height;
  console.log(linkContainerHeight)
  if(linkContainerHeight == 0) {
    linksContainer.style.height = `${linksHeight}px`
  }
  else if(linkContainerHeight > 0) {
    linksContainer.style.height = 0;
  }
})




 