const DIALOG_ROOT_CLASS = "dialogRootBlur";
const LOGIN_BUTTON_ID = "application-login";
const PASSWORD_INPUT_ID = "application-password";
const LOGIN_SUBMIT_ID = "dialog-login-submit";

// Observer config
const observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
};

// Listen for changes
// Hide default login dialog
// Build custom login dialog
let loginRemoved = false;
function handleMutations(mutationList, observer) {
    mutationList.forEach((mutation) => {
        const target = mutation.target;
        if (target && target.classList.contains(DIALOG_ROOT_CLASS)) {
            loginRemoved = true;
            const elementsWithClass = document.querySelectorAll(`.${DIALOG_ROOT_CLASS}`);
            makeElementsInvisible(elementsWithClass);
            // console.log("Element found.")
            observer.disconnect();
        }
    });
    if (loginRemoved) {
        // console.log("Login Removed.")
        buildDemoLogin();
    }
}

// Create the observer
const observer = new MutationObserver(handleMutations);
observer.observe(document, observerConfig);

// Remove elements
function removeElements(elements) {
    elements.forEach((element) => {
        element.remove();
    });
}

// Hide elements
function makeElementsInvisible(elements) {
    elements.forEach((element) => {
        element.style.visibility = "hidden";
    });
}

// Build the custom demo dialog
function buildDemoLogin() {

    // Demo login container
    const demoLoginContainer = document.createElement("div");
    demoLoginContainer.id = "demo-login-container";
    demoLoginContainer.classList.add("demo-login-container");
    demoLoginContainer.style.position = "absolute";
    demoLoginContainer.style.zIndex = "5000";
    demoLoginContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    demoLoginContainer.style.fontSize = "16px";
    demoLoginContainer.style.top = "50%";
    demoLoginContainer.style.left = "50%";
    demoLoginContainer.style.width = "30em";
    demoLoginContainer.style.margin = "-10em 0 0 -15em";
    demoLoginContainer.style.padding = "2em";
    demoLoginContainer.style.borderRadius = "20px";
    demoLoginContainer.style.textAlign = "center";
    demoLoginContainer.style.color = "white";
    demoLoginContainer.style.display = "inline-block";
    demoLoginContainer.style.boxShadow = "rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px";
    demoLoginContainer.innerHTML = `
        <span style="color: white; font-size: 16pt; display: inline-block; margin-bottom: 1em;">Welcome to Curate</span>
        <span style="font-size: 12pt; display: inline-block;">
            <span style="font-size: 12pt; display: inline-block;">This demo will reset itself every hour. Please feel free to upload and edit files as you wish and the data will be cleared shortly. Click below to sign in and try it out.</span>
            <a href="https://pydio.com/en/pydio-cells/overview" style="font-size: 12pt; display: inline-block;">Built on the open-source platform Pydio Cells.</a>
        </span>
    `;

    // Demo login button
    const demoLoginButton = document.createElement("button");
    demoLoginButton.id = "demo-login-button";
    demoLoginButton.classList.add("demo-login-button");
    demoLoginButton.style.display = "inline-block";
    demoLoginButton.style.position = "relative";
    demoLoginButton.style.borderRadius = "20px";
    demoLoginButton.style.width = "8em";
    demoLoginButton.style.height = "6em";
    demoLoginButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    demoLoginButton.style.border = "2px solid rgba(255, 255, 255, 0.9)";
    demoLoginButton.style.padding = "1em !important";
    demoLoginButton.style.textAlign = "center";
    demoLoginButton.style.marginTop = "2em";
    demoLoginButton.innerHTML = `
        <div>
            <span class="mdi mdi-account" style="position:relative; top:-0.1em;font-size: 60px; margin-bottom: 10px;"></span>
        </div>
        <span style="text-align: center; font-size: 12pt; position: relative; top: -0.1em;">Demo User</span>
    `;

    // Button click event
    demoLoginButton.addEventListener("click", function () {
        const loginInput = document.querySelector(`#${LOGIN_BUTTON_ID}`);
        const passwordInput = document.querySelector(`#${PASSWORD_INPUT_ID}`);
        loginInput.value = "demo";
        passwordInput.value = "D3moUser!";
        document.querySelector(`#${LOGIN_SUBMIT_ID}`).click();
        // Remove the demo login container
        document.body.removeChild(demoLoginContainer);
    });

    // Add elements to page 
    demoLoginContainer.appendChild(demoLoginButton);
    document.body.appendChild(demoLoginContainer);
}
