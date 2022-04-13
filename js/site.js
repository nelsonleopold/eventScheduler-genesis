// this is a globally declared variable
const events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// builds a unique list of cities for the dropdown menu
function buildDropdown() {

    // grab the element we need
    let event = document.getElementById("listEventDropdown");

    // clear the list
    event.innerHTML = "";

    // get the html template: <li><a class="dropdown-item" href="#"></a></li>
    let dropdownTemplate = document.getElementById("dropdown-template");

    // get the template node (the <li> and the <a> inside it)
    let dropdownNode = document.importNode(dropdownTemplate.content, true);

    // get access to element inside node (the <a> tag)
    let dropdownLink = dropdownNode.querySelector("a");
    dropdownLink.setAttribute("data-city", "All");
    dropdownLink.textContent = "All";


    event.appendChild(dropdownNode);

    // add links for unique cities
    let curEvents = getEvents();
    // get our data

    // filter our data to a unique set
}

function getEvents() {

    // get what is in local storage
    let currentEvents = JSON.parse(localStorage.getItem("eventData"));

    // if nothing has been stored in local storage then do some stuff
    if (currentEvents === null) {
        // grab our global array of objects
        currentEvents = events;
        // save our global array of objects into local storage
        localStorage.setItem("eventData", JSON.stringify(currentEvents))
    }

    return currentEvents;
}