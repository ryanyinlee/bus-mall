'use strict';

let totaClicks = 0;

const clickLocation = document.getElementById('all_images');

const leftClick = document.getElementById('left_column_image');
const middleClick = document.getElementById('middle_column_image');
const rightClick = document.getElementById('right_column_image');

function ImageObject(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    ImageObject.all.push(this);
    this.clicks = 0;
    this.timesShown = 0;
    // this.clickTimes();
}


ImageObject.prototype.render = function (id) {
    const imgElem = document.getElementById(id);
    imgElem.src = this.filePath;
    imgElem.alt = this.name;
}

ImageObject.all = [];

const getRandomIndices = function() {

    let leftIndex = Math.floor(Math.random()* ImageObject.all.length);
    let middleIndex = Math.floor(Math.random()* ImageObject.all.length);
    let rightIndex = Math.floor(Math.random()* ImageObject.all.length);

    do {middleIndex = Math.floor(Math.random()* ImageObject.all.length);
    }
    while (leftIndex === middleIndex)
    {
        //console.log('left matched middle');
    }
    
    if (middleIndex === rightIndex) {

        do {rightIndex = Math.floor(Math.random()* ImageObject.all.length);
        }
        while (middleIndex === rightIndex)
        
        //console.log('left matched right');
    }

    if (leftIndex === rightIndex) {
        
        do {leftIndex = Math.floor(Math.random()* ImageObject.all.length);
        }
        while (leftIndex === rightIndex)

    }
  

    // console.log(leftIndex, middleIndex, rightIndex);
    return[leftIndex, middleIndex, rightIndex];
}
 

const clickTimes = function(event) {
    //console.log('Clicked');
        // Only 25 iterations.
        if (totalClicks < 25){

        }    
        

        const imageClicked = event.target;
        const alt = imageClicked.alt;

        
        console.log(event.target.alt);


           // if (alt == 'bag') {
        //     console.log('Bag were clicked.');
        // }
        
        // if (id == 'right_column_image') {
        //     this.imageClicked++;
        //     this.timesShown++;
            
        //     console.log(imageClicked);
        // }

        

        // console.log(this.imageClicked);
        // console.log(this.timesShown);
        //console.log(event.target.id);

        renderPics();
    
}























function renderPics () {

const safeIndices = getRandomIndices(); // an array of 3 random and unique in range indices

const leftIndex = safeIndices[0];
const middleIndex = safeIndices[1];
const rightIndex = safeIndices[2];

const leftColumnPic = ImageObject.all[leftIndex];//document.getElementById('left_column_image');
const middleColumnPic = ImageObject.all[middleIndex];//document.getElementById('middle_column_image');
const rightColumnPic = ImageObject.all[rightIndex];//document.getElementById('right_column_image');

leftColumnPic.render(`left_column_image`);
middleColumnPic.render(`middle_column_image`);
rightColumnPic.render(`right_column_image`);;

}


clickLocation.addEventListener('click', clickTimes);


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


getRandomIndices();
renderPics();

console.log(ImageObject.all.name);

