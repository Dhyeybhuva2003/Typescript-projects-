"use strict";
// Function to fetch user data from GitHub API
async function fetchGitHubUsers() {
    const response = await fetch("https://api.github.com/users");
    if (!response.ok) {
        throw new Error(`Failed to fetch GitHub users - Status: ${response.status}`);
    }
    return response.json();
}
// Function to display user data
function displayUser(user) {
    const container = document.querySelector(".user-container");
    container.insertAdjacentHTML("beforeend", `
        <div class="user-card">
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            <div class="user-info">
                <p><strong>${user.login}</strong></p>
                <a href="${user.url}" target="_blank" class="profile-link">View Profile</a>
            </div>
        </div>
    `);
}
// Function to display users matching search term
async function searchUsers() {
    const searchTerm = document.querySelector("#search-input").value.toLowerCase();
    try {
        const users = await fetchGitHubUsers();
        const matchingUsers = users.filter(user => user.login.toLowerCase().includes(searchTerm));
        const container = document.querySelector(".user-container");
        container.innerHTML = ""; // Clear previous results
        if (matchingUsers.length === 0) {
            container.innerHTML = `<p class="no-results">No matching users found.</p>`;
        }
        else {
            matchingUsers.forEach(displayUser);
        }
    }
    catch (error) {
        console.error("Error fetching GitHub users:", error);
    }
}
// Event listener for form submission
document.querySelector("#search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    searchUsers();
});
// Initial display of GitHub users on page load
window.addEventListener("load", () => {
    fetchGitHubUsers().then(users => users.forEach(displayUser)).catch(error => console.error("Error fetching GitHub users:", error));
});
