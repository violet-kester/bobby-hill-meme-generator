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
// meme history list
let history = document.querySelector("#history ul");
let historyItems = document.querySelectorAll('.history-container');



// BOBBY GALLERY CLICK HANDLER
bobbyImages.forEach(bobbyImage => {
  bobbyImage.addEventListener('click', e => {
    imgURLInput.value = e.target.src;
    setImage(prepareImage(e.target.src));
  })
})

// SUBMIT HANDLER
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (imgURLInput.value !== "" && topTextInput.value !== "" && bottomTextInput.value !== "") {
    let img = prepareImage(imgURLInput.value);
    img.addEventListener("load", () => {
      setImage(img);
      addMemeToHistory(img, topTextInput.value, bottomTextInput.value);
    } , {
      once: true
    });
  }
});

// PREPARE IMAGE
function prepareImage(url) {
  let img = new Image();
  img.maxWidth = memeImage.parentElement.offsetWidth;
  img.maxHeight = memeImage.parentElement.offsetHeight;
  img.src = url;
  return img;
}

// SET IMAGE
function setImage(img) {
  memeImage.src = img.src;
  memeContainer.style.width = memeImage.width + "px";
  memeContainer.style.height = memeImage.height + "px";
}

// SET TOP & BOTTOM TEXT
function setTop() {
  topText.innerHTML = `${topTextInput.value}`;
}
function setBottom() {
  bottomText.innerHTML = `${bottomTextInput.value}`;
}

// CREATE A NEW MEME HISTORY LI
function addMemeToHistory(memeImage, topText, bottomText) {
  let li = document.createElement("li");
  let historyContainer = document.createElement("div");
  historyContainer.className = "history-container";
  let historyImg = document.createElement("img");

  // top text for history <li>
  let historyTop = document.createElement("div");
  historyTop.innerHTML = `${topText}`;
  historyTop.className = "history-top";
  historyTop.classList.add("history-text");
  historyContainer.appendChild(historyTop);

  // bottom text for history <li>
  let historyBottom = document.createElement("div");
  historyBottom.innerHTML = `${bottomText}`;
  historyBottom.className = "history-bottom";
  historyBottom.classList.add("history-text");
  historyContainer.appendChild(historyBottom);

  // set historyImg and append to DOM
  historyImg.src = imgURLInput.value;
  historyContainer.appendChild(historyImg);
  li.appendChild(historyContainer);
  history.appendChild(li);

  // add removal event listener to newly added history item
  historyContainer.addEventListener('click', e => {
    historyContainer.parentElement.remove();
  })

  // reset form
  topTextInput.value = "";
  bottomTextInput.value = "";
  imgURLInput.value = "";
  memeImage.src = "";
}

// ADD REMOVAL EVENT LISTENER TO HISTORY ITEMS
historyItems.forEach(historyItem => {
  historyItem.addEventListener('click', e => {
    e.target.parentElement.remove();
  })
});