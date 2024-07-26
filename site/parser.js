/**
 * Contains functions for parsing input data.
*/ 
let corsProxy = '';

function initializeParser(proxyUrl) {
    corsProxy = proxyUrl;
    console.log('Parser initialized with CORS Proxy:', corsProxy);
}

function parseInputData(inputData1, inputData2) {
    const lines1 = inputData1.split('\n');
    const lines2 = inputData2.split('\n');

    const listName = lines1.shift();
    lines1.shift(); // Skip empty line
    const totalKakeraLine = lines1.shift();
    const totalKakeraMatch = totalKakeraLine.match(/(\d+):kakera:/);
    const totalKakeraValue = totalKakeraMatch ? totalKakeraMatch[1] : '?';

    lines2.shift(); // Skip list name in second input
    lines2.shift(); // Skip empty line in second input

    return { listName, totalKakeraValue, lines1, lines2 };
}

function parseFirstInput(lines1) {
    let currentPosition = 1
    let characterList = [];
    lines1.forEach(line => {
        line = line.trim();
        if (line) {
            const match = line.match(/^(.+?)(?: \| (.+?))? - (.+?) (\d+) ka$/);
            if (match) {
                const [_, name, note, series, kakeraValue] = match;
                const character = new Character(name, series, kakeraValue, currentPosition++, note);
                characterList.push(character);
            } else {
                console.error("Incorrect format:", line);
            }
        }
    });
    return characterList;
}

function parseSecondInput(lines2, characterList) {
    lines2.forEach(line => {
        line = line.trim();
        if (line) {
            const match = line.match(/^(.+?)(?: \| (.+?))?(?: · (.+?) \((\d+)\) \((#.+?)\))? - (.+)$/);
            if (match) {
                const [_, name, note, keyType, keyCount, embedColor, image] = match;
                let character = characterList.find(character => character.getName() === name);
                if (character) {
                    if (note) {
                        character.setNote(note);
                    }
                    if (keyCount) {
                        character.setKey(KeyImages.images.hasOwnProperty(keyType) ? keyType : 'unknown', keyCount);
                    }
                    character.setColors(embedColor || character.embedColor, embedColor || character.nameColor);
                    character.setImage(`${corsProxy}?${encodeURIComponent(image)}`);
                } else {
                    console.error("Character not found for name:", name);
                }
            } else {
                console.error("Incorrect format:", line);
            }
        }
    });

    return characterList;
}

// Expose the initializeParser function to the global scope so it can be called from script.js
window.initializeParser = initializeParser;
// Ensure functions are accessible from outside the module
window.parseInputData = parseInputData;
window.parseFirstInput = parseFirstInput;
window.parseSecondInput = parseSecondInput;