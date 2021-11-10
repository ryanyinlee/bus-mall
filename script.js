'use strict';

let totalClicks = 0;
let maxClicks = 25;


function ImageObject(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    ImageObject.all.push(this);
    this.clicks = 0;
    // this.clickTimes();
}
ImageObject.all = [];
ImageObject.left = null;
ImageObject.middle = null;
ImageObject.right = null;

ImageObject.prototype.render = function (side) {
    const imgElem = document.getElementById(side + '_column_image');
    imgElem.src = this.filePath;
    imgElem.alt = this.name;
    this.timesShown +=1;
}


function clickTimes (event) {
    totalClicks += 1;

    const targetId = event.target.id;



    if (targetId === 'left_column_image') {

       ImageObject.left.clicks+=1;
       console.log(ImageObject.left.clicks);

    }
    else if (targetId === 'middle_column_image') {
        ImageObject.middle.clicks+=1;
        console.log(ImageObject.middle.clicks);
}
else if (targetId === 'right_column_image') {
        ImageObject.right.clicks+=1;
        console.log(ImageObject.right.clicks);
}
else {
    alert('Please select an image!');
    return;
}


if (maxClicks === totalClicks) {

    removeEventListeners();
    renderChart();
    renderList();
}
else {
    chooseImages();
    renderPics(); 
    
}


}

function giveMeRandom() {
    const index = Math.floor(Math.random() * ImageObject.all.length);
    return ImageObject.all[index];
}

function chooseImages() {

    ImageObject.left = giveMeRandom();

    // if (ImageObject.left === ImageObject.right) {
    //     ImageObject.right = giveMeRandom();
    // }

    do {ImageObject.left = giveMeRandom(), ImageObject.middle = giveMeRandom(), ImageObject.right = giveMeRandom()}
    while (ImageObject.right===ImageObject.middle || ImageObject.left===ImageObject.middle ||  ImageObject.left===ImageObject.right);

  
     

}

function renderPics() {

    ImageObject.left.render(`left`);
    ImageObject.middle.render(`middle`);
    ImageObject.right.render(`right`);

}



function attachEventListeners() {
    const clickLocation = document.getElementById('all_images');
    clickLocation.addEventListener('click', clickTimes);
}

function removeEventListeners() {
    const clickLocation = document.getElementById('all_images');
    clickLocation.removeEventListener('click', clickTimes);
}


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

function renderList() {

    const ulElem = document.getElementById('results-list');

    for (let i = 0; i < ImageObject.all.length; i++) {
        const image = ImageObject.all[i];
        const liElem = document.createElement('li');
        ulElem.appendChild(liElem);
        liElem.textContent = image.name + " was clicked on " + image.clicks + " times and shown " + image.timesShown + " times.";
    }


}

function renderChart() {

    const imageNamesArray = [];
    const imageClicksArray = [];

    for (let i = 0; i < ImageObject.all.length; i++) {
        const image = ImageObject.all[i];

        const singleImageName = image.name;
        imageNamesArray.push(singleImageName);

        const singleGoatVotes = image.clicks;
        imageClicksArray.push(singleGoatVotes);
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


// start area
attachEventListeners();
populateImages();
chooseImages();
renderPics();





// Old code below =========================================

// const leftClick = document.getElementById('left_column_image');
// const middleClick = document.getElementById('middle_column_image');
// const rightClick = document.getElementById('right_column_image');

// Old code below =========================================
    // const leftIndex = safeIndices[0];
    // const middleIndex = safeIndices[1];
    // const rightIndex = safeIndices[2];

    // const leftColumnPic = ImageObject.all[leftIndex];
    // const middleColumnPic = ImageObject.all[middleIndex];
    // const rightColumnPic = ImageObject.all[rightIndex];

// Old code below =========================================

//getRandomIndices();
// const getRandomIndices = function () {

    //     let leftIndex = Math.floor(Math.random() * ImageObject.all.length);
    //     let middleIndex = Math.floor(Math.random() * ImageObject.all.length);
    //     let rightIndex = Math.floor(Math.random() * ImageObject.all.length);
    
    //     do {
    //         middleIndex = Math.floor(Math.random() * ImageObject.all.length);
    //     }
    //     while (leftIndex === middleIndex)
    //     {
    //         //console.log('left matched middle');
    //     }
    
    //     if (middleIndex === rightIndex) {
    
    //         do {
    //             rightIndex = Math.floor(Math.random() * ImageObject.all.length);
    //         }
    //         while (middleIndex === rightIndex)
    
    //         //console.log('left matched right');
    //     }
    
    //     if (leftIndex === rightIndex) {
    
    //         do {
    //             leftIndex = Math.floor(Math.random() * ImageObject.all.length);
    //         }
    //         while (leftIndex === rightIndex)
    
    //     }
    
    
    //     // console.log(leftIndex, middleIndex, rightIndex);
    //     return [leftIndex, middleIndex, rightIndex];
    // }