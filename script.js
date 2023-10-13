// form data
const form = document.querySelector("#url-form");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const imgURLInput = document.querySelector("#imgURL");

// meme construction
let memeImage = document.querySelector("#meme-image");
const topText = document.querySelector("#top");
const bottomText = document.querySelector("#bottom");
const memeContainer = memeImage.parentElement;

// bobby images
const bobbyImages = document.querySelectorAll('.bobby');

// meme history
let history = document.querySelector("#history ul");
let historyItems = document.querySelectorAll('.history-container');

/** script.js -------------------------------------------------------------
 *
 * Implements a meme generator that allows the user to
 * generate memes using images of Bobby Hill and custom text.
 *
 */

// click handler for bobby image gallery
bobbyImages.forEach(bobbyImage => {
  bobbyImage.addEventListener('click', e => {
    imgURLInput.value = e.target.src;
    setImage(prepareImage(e.target.src));
  });
});

// submit handler for image url form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (imgURLInput.value !== "" && topTextInput.value !== "" && bottomTextInput.value !== "") {
    let img = prepareImage(imgURLInput.value);
    img.addEventListener("load", () => {
      setImage(img);
      addMemeToHistory(img, topTextInput.value, bottomTextInput.value);
    }, {
      once: true
    });
  }
});

// creates and returns an image object from given url
// with max width and height set to fit the meme container parent element
function prepareImage(url) {
  let img = new Image();
  img.maxWidth = memeImage.parentElement.offsetWidth;
  img.maxHeight = memeImage.parentElement.offsetHeight;
  img.src = url;
  return img;
}

// sets source of meme image dom element to given image object
// sets width and height of meme container element to match image element
function setImage(img) {
  memeImage.src = img.src;
  memeContainer.style.width = memeImage.width + "px";
  memeContainer.style.height = memeImage.height + "px";
}

// affixes top text to image
function setTop() {
  topText.innerHTML = `${topTextInput.value}`;
}

// affixes bottom text to image
function setBottom() {
  bottomText.innerHTML = `${bottomTextInput.value}`;
}

// adds meme thumbnail to history
function addMemeToHistory(memeImage, topText, bottomText) {
  let li = document.createElement("li");
  let historyContainer = document.createElement("div");
  historyContainer.className = "history-container";
  let historyImg = document.createElement("img");

  // top text for history thumbnail
  let historyTop = document.createElement("div");
  historyTop.innerHTML = `${topText}`;
  historyTop.className = "history-top";
  historyTop.classList.add("history-text");
  historyContainer.appendChild(historyTop);

  // bottom text for history thumbnail
  let historyBottom = document.createElement("div");
  historyBottom.innerHTML = `${bottomText}`;
  historyBottom.className = "history-bottom";
  historyBottom.classList.add("history-text");
  historyContainer.appendChild(historyBottom);

  // append thumbnail to dom
  historyImg.src = imgURLInput.value;
  historyContainer.appendChild(historyImg);
  li.appendChild(historyContainer);
  history.appendChild(li);

  // add removal event listener to newly added history thumbnail
  historyContainer.addEventListener('click', e => {
    historyContainer.parentElement.remove();
  });

  // reset form
  topTextInput.value = "";
  bottomTextInput.value = "";
  imgURLInput.value = "";
  memeImage.src = "";
}

// event listener for removing thumbnails from history sidebar
historyItems.forEach(historyItem => {
  historyItem.addEventListener('click', e => {
    e.target.parentElement.remove();
  });
});