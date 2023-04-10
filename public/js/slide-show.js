"use strict";

const $ = (selector) => document.querySelector(selector);

let imageCounter = 0;

const caption = $("#caption");
const mainImage = $("#main_image");
let imageCache = [];


const swapImage = ()=>{
    imageCounter = (imageCounter +1)%(imageCache.length);

    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;

    caption.textContent = imageCache[imageCounter].alt;
    console.log(imageCounter)
}


//function decrements the image counter
//by removing two then calling the swap image function
//too swap and increment by 1
const previous = ()=>{
    imageCounter = (imageCounter - 2)%(imageCache.length);
    swapImage();
}
document.addEventListener("DOMContentLoaded", () => {
    const links= document.querySelectorAll("a");
    //listens for the buttons then call swap image or previous function
    $("#Prev").addEventListener("click",previous);
    $("#Next").addEventListener("click",swapImage);


    let image;


    for (let link of links){
        image = new Image();

        image.src = link.href;
        image.alt = link.title;

        imageCache.push(image);
    }

    setInterval(swapImage, 4000);
});