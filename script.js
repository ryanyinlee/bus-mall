'use strict';

// Start at 0, and stop at 25 clicks/choices.
let totalClicks = 0;
let maxClicks = 25;

// Object constructor
function ImageObject(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    ImageObject.all.push(this);
    this.clicks = 0;
    // this.clickTimes();
}
// Array and starting values for the equivalency checkers.
ImageObject.all = [];
ImageObject.left = null;
ImageObject.middle = null;
ImageObject.right = null;

// Render function, gets filepath and name.
ImageObject.prototype.render = function (side) {
    const imgElem = document.getElementById(side + '_column_image');
    imgElem.src = this.filePath;
    imgElem.alt = this.name;
    this.timesShown += 1;
}

// This function operates for each click on an image.
function clickTimes(event) {
    totalClicks += 1;

    const targetId = event.target.id;

    if (targetId === 'left_column_image') {

        ImageObject.left.clicks += 1;
        console.log(ImageObject.left.clicks);
    }
    else if (targetId === 'middle_column_image') {
        ImageObject.middle.clicks += 1;
        console.log(ImageObject.middle.clicks);
    }
    else if (targetId === 'right_column_image') {
        ImageObject.right.clicks += 1;
        console.log(ImageObject.right.clicks);
    }
    else {
        alert('Please select an image!');
        return;
    }
    if (maxClicks === totalClicks) { // Ends the clicking, renders the list and chart.

        removeEventListeners();
        renderList();
        renderChart();
        localStorage.clear();

    }
    else {
        chooseImages();
        renderPics();
        storeClicks();


    }


}

// Random number function via array index number.
function giveMeRandom() {
    const index = Math.floor(Math.random() * ImageObject.all.length);
    return ImageObject.all[index];
}


// Choose images also checks for repeats.
function chooseImages() {

    let oldLeft = ImageObject.left;
    let oldMiddle = ImageObject.middle;
    let oldRight = ImageObject.right;
    

    do {
        ImageObject.left = giveMeRandom();
    } while (ImageObject.left === ImageObject.middle || ImageObject.left === ImageObject.right || ImageObject.left === oldLeft || ImageObject.left === oldMiddle || ImageObject.left === oldRight)
    do {
        ImageObject.middle = giveMeRandom();
    } while (ImageObject.right === ImageObject.middle || ImageObject.left === ImageObject.middle || ImageObject.middle === oldLeft || ImageObject.middle === oldMiddle || ImageObject.middle === oldRight);
    do {
        ImageObject.right = giveMeRandom();
    } while (ImageObject.left === ImageObject.right || ImageObject.middle === ImageObject.right || ImageObject.right === oldLeft || ImageObject.right === oldMiddle || ImageObject.right === oldRight);

    // Thank you to Jordan Watts, Brian Thornburg, and Michael Metcalf

}


// Actually renders the images.
function renderPics() {

    ImageObject.left.render(`left`);
    ImageObject.middle.render(`middle`);
    ImageObject.right.render(`right`);

}


// Event listener for the all_images ID in the HTML.
function attachEventListeners() {
    const clickLocation = document.getElementById('all_images');
    clickLocation.addEventListener('click', clickTimes);

}
// Event unlistener for the all_images ID in the HTML.
function removeEventListeners() {
    const clickLocation = document.getElementById('all_images');
    clickLocation.removeEventListener('click', clickTimes);
}

// localStorage for clicks. Stringifies it.
function storeClicks() {

    const clicksJSON = JSON.stringify(ImageObject.all);
    localStorage.setItem('clicks', clicksJSON);

}

// Summon from local storage and parse it back into an object.
function recreateClicks() {

    const clicksJSONRetrieve = localStorage.getItem('clicks');

    if (clicksJSONRetrieve) {
        let oldObjects = JSON.parse(clicksJSONRetrieve);

        for (let i = 0; i < oldObjects.length; i += 1) {
            oldObjects = oldObjects[i];
            const reinstantiate = new ImageObject(oldObjects.name, oldObjects.filePath);
            reinstantiate.clicks = oldObjects.clicks;
            reinstantiate.timesShown = oldObjects.timesShown;

        }
    } 
}

// Create the default/no storage image objects.
function populateImages() {

    new ImageObject('bag', 'assets/bag.jpg');
    new ImageObject('banana', 'assets/banana.jpg');
    new ImageObject('bathroom', 'assets/bathroom.jpg');
    new ImageObject('boots', 'assets/boots.jpg');
    new ImageObject('breakfast', 'assets/breakfast.jpg');
    new ImageObject('bubblegum', 'assets/bubblegum.jpg');
    new ImageObject('chair', 'assets/chair.jpg');
    new ImageObject('cthulhu', 'assets/cthulhu.jpg');
    new ImageObject('dog-duck', 'assets/dog-duck.jpg');
    new ImageObject('dragon', 'assets/dragon.jpg');
    new ImageObject('pen', 'assets/pen.jpg');
    new ImageObject('pet-sweep', 'assets/pet-sweep.jpg');
    new ImageObject('scissors', 'assets/scissors.jpg');
    new ImageObject('shark', 'assets/shark.jpg');
    new ImageObject('sweep', 'assets/sweep.png');
    new ImageObject('tauntaun', 'assets/tauntaun.jpg');
    new ImageObject('unicorn', 'assets/unicorn.jpg');
    new ImageObject('water-can', 'assets/water-can.jpg');
    new ImageObject('wine-glass', 'assets/wine-glass.jpg');

}

// This function renders the results list in the HTML.
function renderList() {

    const ulElem = document.getElementById('results-list');

    for (let i = 0; i < ImageObject.all.length; i+=1) {
        const image = ImageObject.all[i];
        const liElem = document.createElement('li');
        ulElem.appendChild(liElem);
        liElem.textContent = image.name + " was clicked on " + image.clicks + " times and shown " + image.timesShown + " times.";
    }


}

// Taken directly from demo. Renders the chart.
function renderChart() { 

    const imageNamesArray = [];
    const imageClicksArray = [];

    for (let i = 0; i < ImageObject.all.length; i++) {
        const image = ImageObject.all[i];

        const singleImageName = image.name;
        imageNamesArray.push(singleImageName);

        const singleImageVotes = image.clicks;
        imageClicksArray.push(singleImageVotes);
    }

    const ctx = document.getElementById('results-chart').getContext('2d');
    const imageChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: imageNamesArray,
            datasets: [{
                label: 'Product Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: imageClicksArray
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


// Starting Functions
recreateClicks();
attachEventListeners();
populateImages();
chooseImages();
renderPics();

