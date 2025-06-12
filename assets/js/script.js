var originalLanguageJSON = {};

function setLanguage(languageID) {
    var languageID = languageID.toLowerCase();
    
    if (languageID === "en") {
        if (originalLanguageJSON !== null) {
            for (const languageKey in originalLanguageJSON) {
                document.getElementById(languageKey).innerHTML = originalLanguageJSON[languageKey];
            };
            document.title = originalLanguageJSON["name"];
        };
        return;
    } else {    
        var languageFile = "/assets/lang/" + languageID.toLowerCase() + ".json";
        var myRequest = new XMLHttpRequest();
        myRequest.responseType = "json";
        myRequest.open("GET", languageFile);
        myRequest.send();
        
        myRequest.onerror = function () {
            console.log("Failed to load localization for \"" + languageID + "\" language.");
        };
        
        myRequest.onload = function () {
            var languageJSON = myRequest.response;
            for (const languageKey in languageJSON) {
                originalLanguageJSON[languageKey] = document.getElementById(languageKey).innerHTML;
                document.getElementById(languageKey).innerHTML = languageJSON[languageKey];
            };
            document.title = languageJSON["name"];
        };
    };
}

var viewLanguage = navigator.language.substr(0, 2);
if (!viewLanguage.toLowerCase().startsWith("en")) {
    setLanguage(viewLanguage);
};