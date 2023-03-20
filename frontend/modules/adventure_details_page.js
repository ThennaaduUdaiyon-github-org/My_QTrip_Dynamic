import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // https://www.w3docs.com/snippets/javascript/how-to-get-url-parameters.html
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

  let urlParams = new URLSearchParams(search);
  let adventure_id = urlParams.get("adventure");
  return adventure_id;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    let promObj = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let jsonData = await promObj.json();
    return jsonData;
  } catch (err) {
    console.log("Sorry! An error was encountered:", err);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  console.log("Inside addAdventureDetailsToDOM:", adventure);

  /* Heading and subtitle... */
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  /* Images */
  let photoGalleryDiv = document.getElementById("photo-gallery");

  /*
  let imageDivs = adventure.images.map((imageURL) => {
    let divForImage = document.createElement("div");
    divForImage.innerHTML = `<img src = ${imageURL} alt = "adventure image"/>`;
  });

  photoGalleryDiv.append(imageDivs);
  */

  adventure.images.forEach((imageURL) => {
    let divForImage = document.createElement("div");
    divForImage.innerHTML = `<img src = ${imageURL} alt = "adventure image"
      class = "activity-card-image"/>`;
    photoGalleryDiv.append(divForImage);
  });

  /* Adventure description */
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure

  console.log("Inside addBootstrapPhotoGallery:", images);

  let photoGalleryDiv = document.getElementById("photo-gallery");

  /*
  photoGalleryDiv.innerHTML = ``;

  photoGalleryDiv.setAttribute("class", "carousel slide");
  photoGalleryDiv.setAttribute("data-bs-ride", "carousel");

  let carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner");

  photoGalleryDiv.append(carouselInner);

  // https://getbootstrap.com/docs/5.1/components/carousel/#with-indicators
  images.forEach((imageURL) => {
    let divForImage = document.createElement("div");
    divForImage.innerHTML = `<img src = "${imageURL}" alt = "adventure image"/>`;
    divForImage.setAttribute("class", "carousel-item  ");
    carouselInner.append(divForImage);
    console.log(imageURL);
  });
  */

  photoGalleryDiv.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  let carouselInner = document.querySelector(".carousel-inner");

  images.forEach((imageURL, index) => {
    let classes = index === 0 ? "carousel-item active" : "carousel-item";
    carouselInner.innerHTML += `
      <div class="${classes}">
        <img src="${imageURL}" class="d-block w-100" alt="...">
      </div>
    `;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log("Inside conditionalRenderi...", adventure.available);
  // console.log("CostPerHead is:", adventure.costPerHead);

  /* If this is changed here, does it change globally also??????????? 
  adventure.available = false;
  */

  if (adventure.available) {
    document.getElementById(
      "reservation-person-cost"
    ).innerHTML = `${adventure.costPerHead}`;
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = `${
    adventure.costPerHead * persons
  }`;
}

// function formSubmitHandler(event) {

// }

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  console.log("Inside captureFormSubmit", adventure);

  let myFormObj = document.getElementById("myForm");

  myFormObj.addEventListener("submit", async (event) => {
    event.preventDefault();

    // https://stackoverflow.com/questions/15148659/how-can-i-use-queryselector-on-to-pick-an-input-element-by-name
    let name = myFormObj.querySelector(`input[name="name"]`).value;
    let date = myFormObj.querySelector(`input[name="date"]`).value;
    let person = myFormObj.querySelector(`input[name="person"]`).value;

    let toBePosted = {
      name: name,
      date: date,
      person: person,
      adventure: adventure.id,
    };

    let respObj = await fetch(config.backendEndpoint + "/reservations/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toBePosted),
    });

    console.log("Response is:", respObj);

    if (respObj.ok === false) {
      alert("Failed!");
    } else {
      alert("Success!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log("Inside showBannerIfAlreadyReserved:", adventure);

  if (adventure.reserved) {
    console.log("Inside!!!!!!!!")
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
