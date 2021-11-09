'use strict';

function ImageObject(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    ImageObject.all.push(this);
    // this.clicks = 0;
    // this.timesShown = 0;
}

ImageObject.all = [];

ImageObject.prototype.render = function (id) {
    const imgElem = document.getElementById(id);
    imgElem.src = this.filePath;
    imgElem.alt = this.name;
}



//renderImage(pen, 'middle_column_image');

// do all three
function renderPics () {

const safeIndices = getRandomIndices(); // an array of 3 random and unique in range indices

const leftIndex = safeIndices[0];
const middleIndex = safeIndices[1];
const rightIndex = safeIndices[2];

const leftColumnPic = ImageObject.all[0];//document.getElementById('left_column_image');
const middleColumnPic = ImageObject.all[1];//document.getElementById('middle_column_image');
const rightColumnPic = ImageObject.all[2];//document.getElementById('right_column_image');

leftColumnPic.render(`left_column_image`);
middleColumnPic.render(`middle_column_image`);
rightColumnPic.render(`right_column_image`);;
}

function getRandomIndices() {

    // TODO: ne
    // Is there a way to shuffle an array?

    // grab first randomly, then grab second randomly (select again if second is == to first)
    return[0,1,2];
}
// need an allImagesObjects list early on

//TODO: Randomly select images


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
new ImageObject('sweep', 'assets/sweep.jpg');
new ImageObject('tauntaun', 'assets/tauntaun.jpg');
new ImageObject('unicorn', 'assets/unicorn.jpg');
new ImageObject('water-can', 'assets/water-can.jpg');
new ImageObject('wine-glass', 'assets/wine-glass.jpg');



renderPics();