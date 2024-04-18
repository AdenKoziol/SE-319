/*
    Author: Aden Koziol
    ISU Netid : akoziol@iastate.edu
    Date :  April 16, 2024
*/

// Fetch list of robots
fetch("http://localhost:8081/listRobots")
    .then(response => response.json())
    .then(robots => loadRobots(robots))
    .catch(error => console.error('Error fetching robots:', error));

// Function to load robots onto the webpage
function loadRobots(robots) {
    var cardContainer = document.getElementById("col");
    
    robots.forEach((robot, index) => {
        let cardId = "card" + index;
        let id = robot.id;
        let title = robot.name;
        let price = robot.price;
        let description = robot.description;
        let imageUrl = robot.imageUrl;

        let card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
            <div id="${cardId}" class="card shadow-sm">
                <img src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${id} <strong>${title}</strong>, $${price}</p>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function addRobot() {
    const robot = {
        "id": 4,
        "name": "Robot Aden",
        "price": 100.90,
        "description": "I robot is one example of an image for my exercise",
        "imageUrl": "https://robohash.org/Aden"
    }
    
    fetch("http://localhost:8081/addRobot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(robot)
    })
}

function deleteOneRobot() {
    // Fetch the value from the input field
    let id = document.getElementById("deleteRobotById").value;
    console.log(id);
    fetch(`http://localhost:8081/deleteRobot/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ "id": id })
    })
    .then(response => response.json())
    .then(deleteThisRobot => { handleDeleteResponse(deleteThisRobot)} ); // Call the handleDeleteResponse function
}


function handleDeleteResponse(deleteResponse) {
    console.log(deleteResponse);
}

// Function to update a single robot
function updateOneRobot() {
    let id = document.getElementById("updateRobotById").value;
    console.log(id);
    fetch(`http://localhost:8081/updateRobot/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            "name": "Robot Abraham ALDACO-GASTELUM",
            "price": 100.90,
            "description": "I robot is one example of an image for my exercise",
            "imageUrl": "https://robohash.org/Abraham"
        })
    })
    .then(response => response.json())
    .then(updateThisRobot => { handleUpdateResponse(updateThisRobot) });
}

function handleUpdateResponse(updateResponse)
{
    console.log(updateResponse);
}
