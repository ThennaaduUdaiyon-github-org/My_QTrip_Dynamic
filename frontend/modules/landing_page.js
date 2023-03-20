import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("Now inside init() of landing_page.js");
  console.log("BackendEndpoint is now at: ", config.backendEndpoint);

  // ONE ERROR WAS COMING WHEN PORT WAS GIVEN AS 8080!!!!!!!
  debugger;
  let cities = await fetchCities();

  //Updates the DOM with the cities
  // console.log(cities);
  // try {
  //   cities.forEach((key) => {
  //     debugger;
  //     addCityToDOM(key.id, key.city, key.description, key.image);
  //   });
  // } catch (err) { 
  //   console.log("Null was returned!", err);
  
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let respObj = await fetch(config.backendEndpoint + "/cities");
    // CAN THESE 2 LINES BE OUTSIDE CATCH???????
    let jsonObj = await respObj.json();
    return jsonObj;
  } catch (err) {
    console.log("Inside try-catch of fetchCities()");
    return null;
  }

  // catch(function(err) {
  //   console.log("Inside promise error handler: Null will be returned!");
  //   return null;
  // });
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentDiv = document.getElementById("data");
  // WHY BELOW LINE NOT WORKING???????
  //parentDiv.setAttribute("class", "justify-content-between")

  let childDiv = document.createElement("div");
  childDiv.setAttribute("class", "col-6 col-lg-3 my-3");

  let anchor = document.createElement("a");
  anchor.setAttribute("href", `pages/adventures/?city=${id}`);
  anchor.setAttribute("id", id);

  let tile = document.createElement("div");
  tile.setAttribute("class", "tile");
  tile.setAttribute("id", id);
  tile.style.height = "500px";

  let tileImg = document.createElement("img");
  tileImg.setAttribute("src", image);
  tileImg.style.width = "100%";
    
  
  let tiletext = document.createElement("div");
  tiletext.setAttribute("class", "tile-text justify-content-center");

  tiletext.innerHTML = `<div class="text-center"> ${city} </div> <div> 100+ places </div>`;
 
  // First, append elements to tile...
  tile.append(tileImg);
  tile.append(tiletext);

  // Then, place the tile inside the anchor tag...
  anchor.append(tile);

  // CORRECT THE COMMENTS!!!!!!
  childDiv.append(anchor);

  // Finally, append the anchor to the parent div...
  parentDiv.append(childDiv);
}

export { init, fetchCities, addCityToDOM };
