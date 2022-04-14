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

// builds a unique list of cities for the dropdown menu on page load
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

    // get our data
    let curEvents = getEvents();

    // filter our data to a unique set
    // get a distinct array of city names
    let distinctCities = [...new Set(curEvents.map((event) => event.city))];

    for (let i = 0; i < distinctCities.length; i++) {
        let ddItem = document.importNode(dropdownTemplate.content, true);

        // add items to the dropdown
        let ddLink = ddItem.querySelector("a");
        ddLink.setAttribute("data-city", distinctCities[i]);
        ddLink.textContent = distinctCities[i];
        event.appendChild(ddItem)
    }

    // set the header to default to "Stats for All" on page load
    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for All events`;
    // show stats for all events on page load
    displayStats(curEvents);
}

// this is called every time city name is clicked in the dropdown
function getEventData(element) {
    let city = element.getAttribute("data-city");

    // create the stats for the clicked city
    let curEvents = getEvents();
    let filteredEvents = curEvents;

    if (city != 'All') {

        // return an array with only the events for the selected city
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }

    // set the header
    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for ${city} events`;

    // call a function to display the stats
    displayStats(filteredEvents);

}

// pull the events from local storage or the default array events
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

// this function displays stats for the selected city
function displayStats(filteredEvents) {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    // loop over events grabbing the attendance numbers for each event
    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;
        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    average = total / filteredEvents.length;

    // write values to my page
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}