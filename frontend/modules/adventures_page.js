import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let promObj = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    let jsonData = await promObj.json();
    return jsonData;
  } catch (err) {
    console.log("Error inside fetch adven!", err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let parentDiv = document.getElementById("data");
  parentDiv.innerHTML = ``;

  for (let i = 0; i < adventures.length; i++) {
    let adventure = adventures[i];

    let childDiv = document.createElement("div");
    childDiv.setAttribute("class", "col-6 col-lg-3 my-2");

    let anchor = document.createElement("a");
    anchor.setAttribute(
      "href",
      "detail/?adventure=" + adventure.id
    );
    anchor.setAttribute("id", adventure.id);

    let activityCard = document.createElement("div");
    activityCard.setAttribute("class", "activity-card");

    /*--------------------Append inside activtyCard------------------------------------*/
    let image = document.createElement("img");
    image.setAttribute("src", adventure.image);
    image.setAttribute("class", "activity-card-image");

    let descrDiv = document.createElement("div");
    descrDiv.setAttribute("class", "d-flex"); // WHY PX-0 HERE DOESN'T CASCADE TO CHILDREN DIV???????????????????????????
    descrDiv.innerHTML = `
    <div class="row justify-content-between">
    <div class="col-6 px-0">${adventure.name}</div>
    <div class="col-6 px-0">${adventure.costPerHead}</div>
    <div class="col-6 px-0">Duration</div>
    <div class="col-6 px-0">${adventure.duration + " Hours"}</div>
    </div>`;

    let banner = document.createElement("div");
    banner.setAttribute("class", "category-banner");
    banner.innerText = adventure.category;

    activityCard.append(image, descrDiv, banner);

    /*--------------------Append inside activtyCard------------------------------------*/

    anchor.append(activityCard);
    childDiv.append(anchor);
    parentDiv.append(childDiv);

    // Attempt 1
    // let adventure = adventures[i];

    // let anchor = document.createElement("a");
    // anchor.setAttribute("href", `/detail/?adventure=${adventure.id}`);

    // let activityCard = document.createElement("div");
    // // IF MX-1 IS GIVEN, ONE CARD GOES TO NEXT LINE!!!!!!!!!!!!
    // activityCard.setAttribute(
    //   "class",
    //   "activity-card col-6 col-lg-3 px-0 my-2"
    // );

    // // WHY 2 SEPARATE STYLINGS FOR IMG IN ACTIVITY CARD, IN THE CSS FILE?????????
    // let image = document.createElement("img");
    // image.setAttribute("src", adventure.image);
    // image.setAttribute("class", "activity-card-image");

    // let descrDiv = document.createElement("div");
    // descrDiv.setAttribute("class", "d-flex"); // WHY PX-0 HERE DOESN'T CASCADE TO CHILDREN DIV???????????????????????????
    // descrDiv.innerHTML = `
    // <div class="row justify-content-between">
    // <div class="col-6 px-0">${adventure.name}</div>
    // <div class="col-6 px-0">${adventure.costPerHead}</div>
    // <div class="col-6 px-0">Duration</div>
    // <div class="col-6 px-0">${adventure.duration + " Hours"}</div>
    // </div>`;

    // let banner = document.createElement("div");
    // banner.setAttribute("class", "category-banner");
    // banner.innerText = adventure.category;

    // activityCard.append(image, descrDiv, banner);

    // parentDiv.append(activityCard);
    // Attempt 1
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  //console.log("Inside filterByDuration...", list, low, high);

  let eligibleList = [];

  list.forEach((advObj) => {
    if (advObj.duration >= low) {
      if (advObj.duration <= high) {
        eligibleList.push(advObj);
      }
    }
  });

  // console.log("Eligible list is:", eligibleList);

  return eligibleList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log("Inside filterByCategory...", list, categoryList);

  let eligibleList = [];

  list.forEach((advObj) => {
    let categ = advObj.category;
    if (categoryList.includes(categ)) {
      eligibleList.push(advObj);
    }
  });

  return eligibleList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

// IMPLEMENT THIS USING 'FILTER'!!!!!!! FILTER METHOD REFERENCE MODULE-3 MS-1
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // CAN THE LIST VARIABLE BE OVERWRITTEN INSIDE. WILL IT MODIIFY OUTSIDE FN. SCOPE???????
  //console.log("Inside filterFunction...", filters);

  let categFilteredList = list;

  // https://stackoverflow.com/questions/46043573/what-is-the-difference-between-array0-and-array
  // [] is not the same as Array(0). WHY??????????????????
  // filters.category !== [] WASN'T WORKING!!!!!
  if (filters.category.length !== 0) {
    console.log("Inside here");
    categFilteredList = filterByCategory(list, filters.category);
  }

  //console.log("After category filtering: ", categFilteredList);

  let durationFilteredList = categFilteredList;

  //console.log("filter is", filters);

  if (filters.duration !== "") {
    console.log("Now duration filt");
    let duration = filters.duration;
    // https://stackoverflow.com/questions/19052618/how-does-javascript-compare-a-number-to-a-string
    if (duration.includes("+")) {
      // For "12+" case...
      durationFilteredList = filterByDuration(
        categFilteredList,
        parseInt(duration.split("+")[0]),
        Infinity
      );

      // https://stackoverflow.com/questions/47058082/javascript-continue-within-if-statement
      // Infinity value: https://stackoverflow.com/questions/24166320/infinity-is-some-number-in-javascript
    } else {
      durationFilteredList = filterByDuration(
        categFilteredList,
        parseInt(duration.split("-")[0]),
        parseInt(duration.split("-")[1])
      );
    }
  }

  // console.log("After duration filtering: ", durationFilteredList);
  return durationFilteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log("Inside saveFiltersToLocalStorage: ", filters);
  localStorage.setItem("filters", JSON.stringify(filters));

  // return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  /* https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists */
  // if (localStorage.getItem("filters") !== null) {
  // return JSON.parse(localStorage.getItem("filters"));
  // }

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log("Inside generate filter pills");
  // console.log("Filters needing pills are: ", filters);
  let categPillContainer = document.getElementById("category-list");

  console.log(filters.category);

  filters.category.forEach((categ) => {
    let categPill = document.createElement("div");
    categPill.setAttribute("class", "category-filter");
    categPill.innerText = categ;

    categPillContainer.append(categPill);
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
