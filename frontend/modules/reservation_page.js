import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    let respObj = await fetch(config.backendEndpoint + "/reservations/");
    //console.log(respObj);
    let jsonData = await respObj.json();
    //console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.log(
      "Sorry! Couldn't fetch reservation data from the Backendpoint."
    );
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";

    let tbody = document.getElementById("reservation-table");

    //console.log("RES ARE:", reservations);

    reservations.forEach((res) => {
      let d = new Date(res.date.split("-"));
      let reservedDate = d.toLocaleDateString("en-IN").split(",")[0];

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
      let datetime = new Date(res.time);
      let options = {year: "numeric", month: "long", day: "numeric",
      hour: "numeric", minute: "numeric", second: "numeric"};

      let formattedDatetime = datetime.toLocaleString("en-IN", options).replace(" at", ",");

      //console.log("Name is:", res.name);

      let trow = document.createElement("tr");
      trow.innerHTML = `
        <td>${res.id}</td>
        <td>${res.name}</td>
        <td>${res.adventureName}</td>
        <td>${res.person}</td>
        <td>${reservedDate}</td>
        <td>${res.price}</td>
        <td>${formattedDatetime}</td>
        <td id = ${res.id}>
          <a href = "../detail/?adventure=${res.adventure}">
            <button class = "reservation-visit-button"> Visit Adventure </button>
          </a>
        </td>
        `;
      tbody.append(trow);

      //console.log("CHILDREN ARE:", document.getElementById("reservation-table").children[0])
    });
  }
}

export { fetchReservations, addReservationToTable };
