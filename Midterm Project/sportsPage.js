window.onload = function() {
    // Fetch data from data.json when the page loads
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            // Retrieve the sport name from URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const sportName = urlParams.get('sport');
            
            if (sportName) {
                // Call the function to load equipment cards
                loadEquipment(data, sportName);
            }
        });
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the sport name and data from URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const encodedSportName = queryParams.get('sport');
    const encodedData = queryParams.get('data');

    // Decode the sport name and data
    const sportName = decodeURIComponent(encodedSportName);
    const nameElement = document.getElementById('sportNameContainer');
    nameElement.textContent = sportName + ' Equipment';
    const decodedData = JSON.parse(decodeURIComponent(encodedData));

    // Log the decoded data and sport name for verification
    console.log("Decoded Sport Name:", sportName);
    console.log("Decoded Data:", decodedData);

    // Call the function to load equipment cards using the decoded data and sport name
    loadEquipment(decodedData, sportName);
});

function loadEquipment(data, sportName) {
    const equipmentContainer = document.getElementById('equipmentContainer');
    const sportEquipment = data[sportName.toLowerCase() + 'Equipment'];

    if (sportEquipment) {
        // Clear existing content in the equipmentContainer
        equipmentContainer.innerHTML = '';

        // Iterate over each equipment item
        sportEquipment.forEach(equipment => {
            // Create a card for each equipment item
            const card = createCard(equipment.name, equipment.url, equipment.price, equipment.datePosted, equipment.poster, equipment.description);
            equipmentContainer.appendChild(card);
        });
    }
}

function createCard(title, imageUrl, price, datePosted, poster, description) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.innerHTML = `
        <div class="card shadow-sm">
            <img src="${imageUrl}" onclick="handleCardClick('${title}','${imageUrl}','${price}','${datePosted}','${poster}','${description}')"class="card-img-top custom-image" alt="photo">
            <div class="card-body">
                <h5 class="card-title">${title} - ${price}</h5>
            </div>
        </div>
    `;
    return card;
}

function handleCardClick(title, imageUrl, price, datePosted, poster, description) 
{
    console.log("card clicked!!");
    // Create an object with the item details
    const itemDetails = {
        title: title,
        imageUrl: imageUrl,
        price: price,
        datePosted: datePosted,
        poster: poster,
        description: description
    };

    // Encode the item details for the URL
    const encodedData = encodeURIComponent(JSON.stringify(itemDetails));

    // Redirect to itemPage.html with the encoded data
    window.location.href = `itemPage.html?sport=${encodedData}`;
}