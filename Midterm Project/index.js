// Fetch data from the 'data.json' file and initiate the loading process
fetch("./data.json")
    .then(response => response.json())
    .then(mySports => loadSports(mySports));

// Function to load sports data onto the page
function loadSports(sports) {
    // Get the main container where sports cards will be displayed
    var mainContainer = document.getElementById("sports");
    var row;

    // Iterate through each sport in the loaded data
    for (var i = 0; i < sports.sports.length; i++) {

        // Create a new row for every even index to structure the layout
        if (i % 2 === 0) {
            row = document.createElement("div");
            row.classList.add("row", "mb-3");
            mainContainer.appendChild(row);
        }

        // Generate unique identifiers and extract sport information
        let card = "card" + i.toString();
        let sport = sports.sports[i].sport;
        let url = sports.sports[i].url;
        let data = sports.sports[i].data;

        // Create a new card element and set its content
        let AddCardSport = document.createElement("div");
        AddCardSport.classList.add("col-md-6", "mb-3");

        AddCardSport.innerHTML = `
            <div id=${card} onclick="handleCardClick('${card}', '${sport}', '${data}')" class="card shadow-sm">
                <img src="${url}" class="card-img-top" alt="photo">
                <div class="card-body">
                    <p style="text-align: center;" class="card-text"><strong>${sport}</strong></p>
                </div>
            </div>
        `;

        // Append the card to the current row
        row.appendChild(AddCardSport);
    }
}

// Function to handle the click event on a sports card
function handleCardClick(cardId, sportName, data) {
    console.log("Card clicked:", cardId);

    // Convert the entire data object to a JSON string and encode it
    const encodedData = encodeURIComponent(JSON.stringify(data));
    const encodedSportName = encodeURIComponent(sportName);

    // Pass both encoded data and sport name as query parameters and navigate to the sportsPage.html
    window.location.href = `sportsPage.html?sport=${encodedSportName}&data=${encodedData}`;
}
