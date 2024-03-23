// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function() {

    // Get the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);

    // Get the 'sport' parameter and decode it
    const encodedData = queryParams.get('sport');
    const decodedData = JSON.parse(decodeURIComponent(encodedData));

    // Log the decoded data to the console
    console.log("Decoded Data:", decodedData);

    // Call the function to display item details with the decoded data
    displayItemDetails(decodedData);
});

// Function to display item details on the page
function displayItemDetails(itemDetails) {

    // Get references to HTML elements where item details will be displayed
    var mainContainer = document.getElementById("pageContents");
    const titleElement = document.getElementById('itemTitle');
    const imageElement = document.getElementById('itemImage');
    const priceElement = document.getElementById('itemPrice');
    const datePostedElement = document.getElementById('itemDatePosted');
    const posterElement = document.getElementById('itemPoster');
    const descriptionElement = document.getElementById('itemDescription');

    // Set the text/content of each HTML element with corresponding item details
    titleElement.textContent = itemDetails.title;
    imageElement.src = itemDetails.imageUrl;
    priceElement.textContent = `Price: ${itemDetails.price}`;
    datePostedElement.textContent = `Date Posted: ${itemDetails.datePosted}`;
    posterElement.textContent = `Posted By: ${itemDetails.poster}`;
    descriptionElement.textContent = `Description: ${itemDetails.description}`;
}
