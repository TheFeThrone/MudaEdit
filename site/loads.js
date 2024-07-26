/**
 * Contains functions for handling loads and generations
*/ 
function displayHaremInfo(haremInfo, listName, totalKakeraValue) {
    haremInfo.innerHTML = `${listName} : ${totalKakeraValue}<img src="${KeyImages.images['kakera']}" alt="Kakera" class="inline-icon">`;
}

function generateListHTML(characterList, listDisplay) {
    let listHtml = '';
    characterList.forEach(character => {
        listHtml += `<div class="character" style="border-color: ${character.embedColor}; width: ${character.imageWidth}px;">
            <h3 style="color: ${character.nameColor};">${character.name}</h3>`;
        listHtml += `<p>${character.series}</p>
            <div class="position-kakera-key-wrapper">
                <p class="inline-p position-container">#${character.listPosition}/${_totalPosition} <img src="${KeyImages.images['']}" alt="Placeholder" class="inline-icon"></p>
                <p class="inline-p kakera-container">${character.kakeraValue} <img src="${KeyImages.images['kakera']}" alt="Kakera" class="inline-icon"></p>
                <p class="inline-p key-container">${character.keyCount} <img src="${KeyImages.images[character.keyType] || KeyImages.images['']}" alt="${character.keyType}" class="inline-icon"></p>
            </div>
            <img src="${character.image}" alt="${character.name}">`;
        if (character.note) {
            listHtml += `<p class="note">Notes: ${character.note}</p>`;
        }
        listHtml += `</div>`;
    });
    listDisplay.innerHTML = listHtml;
}

function preloadImages(characterList) {
    let imagePromises = [];
    characterList.forEach(character => {
        let imagePromise = fetchImageWithProxy(character.image)
            .then(blob => loadImage(blob, character))
            .catch(error => {
                console.error('Error with image:', error);
            });
        imagePromises.push(imagePromise);
    });

    return Promise.all(imagePromises);
}

async function loadImage(blob, character) {
    try {
        return await new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                character.setImageWidth(img.width);
                resolve();
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
        });
    } catch (error) {
        console.error('Error loading image:', error);
    }
}

async function fetchImageWithProxy(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'image/*',
            },
            credentials: 'include'  // Include credentials if needed
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error fetching image via proxy:', error);
    }
}

// Ensure functions are accessible from outside the module
window.preloadImages = preloadImages;
window.displayHaremInfo = displayHaremInfo;
window.generateListHTML = generateListHTML;
window.loadImage = loadImage;
window.fetchImageWithProxy = fetchImageWithProxy;