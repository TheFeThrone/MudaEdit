/**
 * Contains functions for handling common tasks such as hiding elements and showing a loading animation.
*/ 

function hideElements(elements) {
    elements.forEach(element => {
        element.style.display = 'none';
    });
}

function loading(haremInfo, resolve) {
    let dots = '';
    let isLoading = true;
    let interval = null;
    interval = setInterval(() => {
        dots = dots.length < 3 ? dots + '.' : '';
        if (isLoading && !resolve()) {
            haremInfo.innerHTML = `Loading List${dots}`;
        }
        if (resolve()) {
            isLoading = false;
            clearInterval(interval);
        }
    }, 333); // Update every 333ms
}

function addOnMouseOver(document){
    // Add event listeners for hovering over text elements
    
    const tooltip = document.getElementById('tooltip');
    document.querySelectorAll('.character h3, .character p').forEach(el => {
        el.addEventListener('mouseover', (event) => {
            tooltip.style.display = 'block';
            tooltip.textContent = event.target.textContent;
        });

        el.addEventListener('mousemove', (event) => {
            tooltip.style.top = `${event.clientY + window.scrollY + 10}px`;
            tooltip.style.left = `${event.clientX + window.scrollX + 10}px`;
        });

        el.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });
}

// Ensure functions are accessible from outside the module
window.hideElements = hideElements;
window.loading = loading;
window.addOnMouseOver = addOnMouseOver;