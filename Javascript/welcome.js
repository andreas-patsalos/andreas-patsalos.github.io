// Set a new cookie
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

// Check if cookie exists
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

// Display welcome message
function displayWelcomeMessage() {
    var userName = getCookieValue('User');
    const currentTimeDate = new Date();
    const dateTimeString = currentTimeDate.toLocaleString();

    if (userName && dateTimeString) {
        var welcomeMessage = "Welcome back, " + userName + "!";
        welcomeMessage += "\nCurrent date and time: " + dateTimeString;
        alert(welcomeMessage);
    }
}

// Prompt for user's name and set a new cookie using the setCookie function
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
            displayWelcomeMessage();
        } else {
            alert("Invalid name. Please reload the page and try again.");
        }
    }
}

// Automatic execution of the script after the page fully loads
window.onload = function() {
    promptForName();

    // Event listen to handle page refreshes
    window.addEventListener('beforeunload', function(event) {
        // Set a session cookie to detect page refreshes
        setCookie('SessionRefresh', 'true', 0, 'dev77cmd.github.io', '/'); // Session cookie (expires when browser is closed)
    });

    // Event listen to check if the page is fully loaded
    document.addEventListener('DOMContentLoaded', function(event) {
        displayWelcomeMessage();
    });
};
