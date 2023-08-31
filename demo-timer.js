document.addEventListener("DOMContentLoaded", function () {

    // Create countdown element
    const countdownElement = document.createElement("div");
    countdownElement.id = "countdown-element";
    countdownElement.style.position = "absolute";
    countdownElement.style.zIndex = "5";
    countdownElement.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    countdownElement.style.fontSize = "16px";
    countdownElement.style.top = "0px";
    countdownElement.style.left = "50%";
    countdownElement.style.width = "20em";
    countdownElement.style.marginLeft = "-10em";
    countdownElement.style.padding = "10px";
    countdownElement.style.borderRadius = "0px 0px 10px 10px";
    countdownElement.style.textAlign = "center";
    countdownElement.style.zIndex = "1000";
    countdownElement.style.color = "rgb(255, 255, 255)";
    countdownElement.style.boxShadow = "rgba(0, 0, 0, 0.15) 0px 10px 35px, rgba(0, 0, 0, 0.12) 0px 5px 10px";
    countdownElement.style.pointerEvents = "none";
    countdownElement.innerHTML = `
        This demo will reset in:<br>
        <span id="countdown-timer"></span>
    `;

    // Append countdown element to the body
    document.body.appendChild(countdownElement);

    function updateCountdown() {
        const now = new Date();
        const nextReset = new Date(now);
        nextReset.setHours(nextReset.getHours() + 1, 0, 0, 0);

        const timeUntilReset = nextReset - now;
        const hours = Math.floor(timeUntilReset / 3600000);
        const minutes = Math.floor((timeUntilReset % 3600000) / 60000);
        const seconds = Math.floor((timeUntilReset % 60000) / 1000);

        const timerElement = document.getElementById("countdown-timer");
        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        // When timer reaches 0, redirect to logout and clear credentials
        if (hours === 0 && minutes === 0 && seconds === 0) {
            const origin = window.location.origin;
            window.location.href = `${origin}/logout`;  // Logout the user
            // Clear cached credentials
            if (window.localStorage) {
                window.localStorage.clear(); // Clear local storage
            }
            if (window.sessionStorage) {
                window.sessionStorage.clear(); // Clear session storage
            }
        } else {
            setTimeout(updateCountdown, 1000); // Update every second
        }
    }
    updateCountdown(); // Initial call to start the timer
});
