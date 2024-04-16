/*
    Author: Aden Koziol
    ISU Netid : akoziol@iastate.edu
    Date :  April 16, 2024
*/

fetch("http://localhost:8081/listRobots")
    .then(response => response.json())
    .then(robots => loadRobots(robots))
    .catch(error => console.error('Error fetching robots:', error));

    function loadRobots(robots) {
        var cardContainer = document.getElementById("col");
        
        robots.forEach((robot, index) => {
            let cardId = "card" + index;
            let id = robot.id;
            let title = robot.name;
            let price = robot.price.toFixed(2);
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
    