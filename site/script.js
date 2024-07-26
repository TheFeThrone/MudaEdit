document.addEventListener("DOMContentLoaded", function() {
    fetch('/config')
        .then(response => response.json())
        .then(config => {
            const corsProxy = config.corsproxy;
            console.log("CORS Proxy URL:", corsProxy);
            // Now you can use corsProxy in your code
            
            initializeParser(corsProxy); // Pass the corsProxy to parser.js
        })
        .catch(error => console.error('Error fetching config:', error));
});

function initializeParser(corsProxy) {
    if (typeof window.initializeParser === 'function') {
        window.initializeParser(corsProxy);
    } else {
        console.error('initializeParser function not found in parser.js');
    }
}

function createList() {
    const inputField1 = document.getElementById('list-input1');
    const inputField2 = document.getElementById('list-input2');
    const creatorButton = document.getElementById('creator-button');
    const listDisplay = document.getElementById('list-display');
    const haremInfo = document.getElementById('harem-info');

    // Hide input fields
    hideElements([creatorButton, inputField1, inputField2]);

    let inputData1 = inputField1.value;
    let inputData2 = inputField2.value;

    let listLoaded = false;
    loading(haremInfo, () => listLoaded);

    const { listName, totalKakeraValue, lines1, lines2 } = parseInputData(inputData1, inputData2);

    let characterList = [];

    characterList = parseFirstInput(lines1);
    const _totalPosition = characterList.length;
    characterList = parseSecondInput(lines2, characterList);

    preloadImages(characterList)
        .then(() => {
            displayHaremInfo(haremInfo, listName, totalKakeraValue);
            generateListHTML(characterList, listDisplay);
            listLoaded = true;
            addOnMouseOver(document);

        })
        .catch(error => {
            listLoaded = true; // Ensure we stop the loading animation in case of an error
            haremInfo.innerHTML = `Error loading images`;
            console.error("Error loading images: ", error);
        });
}

// Ensure the main function is callable from the HTML
window.createList = createList;
windows.corsProxy = corsProxy;