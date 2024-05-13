// Function to set a cookie with the provided name, value, expiration days, domain, and path
function setCookie(cookieName, cookieValue, expirationDays, domain, path) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays); // Calculate expiration date
    var cookieString = cookieName + '=' + encodeURIComponent(cookieValue) +
        '; expires=' + expirationDate.toUTCString() +
        '; path=' + (path || '/') +
        (domain ? '; domain=' + domain : '') +
        '; SameSite=None; Secure'; // Ensure cookie is secure and accessible cross-site

    document.cookie = cookieString;
}

// Function to retrieve cookie value by name
function getCookieValue(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

// Function to display welcome message with user's name and date/time
function displayWelcomeMessage() {
    var userName = getCookieValue('User');
    const currentTimeDate = new Date();
    const dateTimeString = currentTimeDate.toLocaleString();

    if (userName && dateTimeString) {
        var welcomeMessage = "Welcome back, " + userName + "!";
        welcomeMessage += "<br>Current date and time: " + dateTimeString;

        var welcomeElement = document.createElement('div');
        welcomeElement.innerHTML = welcomeMessage;
        document.body.appendChild(welcomeElement);
    }
}

// Function to prompt user for name and set the cookie with specific domain and path
function promptForName() {
    var userName = getCookieValue('User');

    if (userName && userName.trim() !== "") {
        // User cookie exists, display welcome message directly
        displayWelcomeMessage();
    } else {
        // User cookie doesn't exist, prompt for name
        var userInput = prompt("Please enter your name:");
        if (userInput && userInput.trim() !== "") {
            setCookie('User', userInput.trim(), 1, 'dev77cmd.github.io', '/');
            setCookie('DateTime', new Date().toLocaleString(), 1, 'dev77cmd.github.io', '/');
            displayWelcomeMessage(); // Display welcome message after setting cookies
        } else {
            alert("Invalid name. Please reload the page and try again.");
        }
    }
}

// Automatically run the script when the page finishes loading
window.onload = function() {
    promptForName(); // Check name

    // Add event listener to handle page refreshes (e.g., F5, browser refresh button)
    window.addEventListener('beforeunload', function(event) {
        console.log('Before unload event triggered');
        // Set a session cookie to detect page refreshes
        setCookie('SessionRefresh', 'true', 0, 'dev77cmd.github.io', '/'); // Session cookie (expires when browser is closed)
    });

    // Add event listener to handle when the DOM content is fully loaded (including images, CSS, etc.)
    document.addEventListener('DOMContentLoaded', function(event) {
        console.log('DOM content loaded');
        displayWelcomeMessage(); // Display welcome message again after DOM content is fully loaded
    });
};
