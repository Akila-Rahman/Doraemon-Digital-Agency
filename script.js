let turns = 5; // Number of turns allowed
let gadgets = ["Anywhere Door", "Time Cloth", "Take-copter"]; // List of gadgets
let foundGadgets = []; // Array to store found gadgets

// Function to update the display of turns left
function updateTurns() {
    document.getElementById("turns").innerText = `Turns left: ${turns}`;
}

// Function to show messages in the game
function showMessage(message) {
    const messageBox = document.getElementById("result-message");
    messageBox.classList.remove("hidden");
    messageBox.innerText = message;
}

// Function to search a specific location for gadgets
function searchLocation(locationIndex) {
    // Check if the game is over
    if (turns <= 0 || foundGadgets.length >= gadgets.length) {
        showMessage("The game is over! Please click 'New Game' to restart.");
        return; 
    }

    turns--; // Decrease the turn count
    updateTurns(); // Update the display

    // Random chance of finding a gadget (50% chance)
    const found = Math.random() < 0.5; 
    if (found && gadgets.length > 0) {
        const gadget = gadgets.shift(); // Get the first gadget in the list
        foundGadgets.push(gadget);
        showMessage(`You found the ${gadget} in this location!`);
    } else {
        showMessage("Sorry, no gadgets found here.");
    }

    // Check if the game is over
    if (turns === 0) {
        endGame(false); // Player lost
    } else if (foundGadgets.length === 3) {
        endGame(true); // Player won
    }
}

// Function to end the game and display the results
function endGame(isWinner) {
    document.querySelector(".locations").classList.add("hidden"); // Hide search buttons
    document.getElementById("summary").classList.remove("hidden"); // Show summary

    const message = isWinner ? 
        "Congratulations! You found all the gadgets!" : 
        "Oh no! Gian and Suneo found the remaining gadgets. Game Over!";
        
    // Display found gadgets and message
    document.getElementById("gadgets-found").innerText = `Gadgets found: ${foundGadgets.join(", ") || "None"}.`;
    showMessage(message); // Show result message

    // Show the New Game button
    document.getElementById("new-game").classList.remove("hidden");
}

// Function to reset the game for another play
function resetGame() {
    turns = 5; // Reset turns
    gadgets = ["Anywhere Door", "Time Cloth", "Take-copter"]; // Reset gadgets
    foundGadgets = []; // Reset found gadgets
    updateTurns(); // Reset turn display
    showMessage(""); // Clear messages
    document.getElementById("result-message").classList.add("hidden"); // Hide result message
    document.querySelector(".locations").classList.remove("hidden"); // Show buttons
    document.getElementById("summary").classList.add("hidden"); // Hide summary
    document.getElementById("gadgets-found").innerText = ""; // Clear found gadgets display
    document.getElementById("new-game").classList.add("hidden"); // Hide New Game button
}

// Initialize game display
updateTurns();
