// Function to add event listeners for increment (Upvote) buttons
function addIncrementListeners() {
    const incrementButtons = document.querySelectorAll('.incrementBtn');
    incrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const rowNumber = this.getAttribute('data-row');
            const counter = document.getElementById(`counter${rowNumber}`);
            const votesLeft = document.getElementById('votes-left');

            if (parseInt(votesLeft.textContent) > 0) {
                let currentCount = parseInt(counter.textContent);
                currentCount++;
                counter.textContent = currentCount;
                votesLeft.textContent = parseInt(votesLeft.textContent) - 1;
            }
        });
    });
}

// Function to add event listeners for decrement (Downvote) buttons
function addDecrementListeners() {
    const decrementButtons = document.querySelectorAll('.decrementBtn');
    decrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const rowNumber = this.getAttribute('data-row');
            const counter = document.getElementById(`counter${rowNumber}`);
            const votesLeft = document.getElementById('votes-left');
            let currentCount = parseInt(counter.textContent);

            if (parseInt(votesLeft.textContent) > 0) {
                currentCount--;
                counter.textContent = currentCount;
                votesLeft.textContent = parseInt(votesLeft.textContent) - 1;
            }
        });
    });
}

// Fetch the JSON data
fetch('db.json')
    .then(response => response.json())
    .then(jsonData => {
        // Sort the businesses based on vote counts (descending order)
        jsonData.businesses.sort((a, b) => b.votes - a.votes);

        const table = document.querySelector('.business-table');

        // Loop through the sorted businesses and create rows
        jsonData.businesses.forEach((business, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${business.name}</td>
                <td>${business.industry}</td>
                <td><span class="total-votes" id="counter${index + 1}">${business.votes}</span></td>
                <td><button class="incrementBtn" data-row="${index + 1}">Upvote</button></td>
                <td><button class="decrementBtn" data-row="${index + 1}">Downvote</button></td>
            `;

            table.appendChild(newRow);
        });

        // Add event listeners to the newly created buttons
        addIncrementListeners();
        addDecrementListeners();
    })
    .catch(error => console.error('Error loading JSON data:', error));

