const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

//Unsplash API
const count = 30;
const apiKey = "ycb2LhhgfsM_Vsy8DHesiRaXyEZXxGJunVP0AXbzGBM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if images is loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links & photos & add to dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArr.length;

  //for each array element
  photosArr.forEach((photo) => {
    //create <a> to link unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "-blank",
    });
    //create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //event listener to check when each photo is loading
    img.addEventListener("load", imageLoaded);

    //put <img> inside <a> then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

//check to see if scrolling near bottom of page load more pictures
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
