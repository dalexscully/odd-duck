'use strict';

console.log('hello to all!');

// ******* GLOBAL VARIABLES *******
let voteCount = 25;
let productArray = [];
let indexArray = [];

// ******* DOM REFERENCES *********
let imgContainer = document.getElementById('img-container');
// let showresultsBtn = document.getElementById('show-results-btn');
// let resultsContainer = document.getElementById('results-container');


// js views source as property
let imgOne = document.getElementById('imgone');
let imgTwo = document.getElementById('imgtwo');
let imgThree = document.getElementById('imgthree');

//  canvas element for my chart to render to

let canvasElem = document.getElementById('myChart').getContext('2d');

// ******* CONSTRUCTOR FUNCTION ********

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `./img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

// ****** HELPER FUNTCION / UTILITIES ******
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {

  while (indexArray.length < 6) {

    let imgRandom = randomIndex();
    if (!indexArray.includes(imgRandom)) {
      indexArray.push(imgRandom);
    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();


  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;
}


// ********* CANVAS DEMO - CHART FUNCTION **********

function renderChart() {

  let productName = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productName.push(productArray[i].name);
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i]).views;
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        data: productVotes,
        label: '# of Votes',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',

        ],
        borderWidth: 10
      },
      {
        data: productViews,
        label: '# of Views',
        backgroundColor: [
          'blue'

        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 10
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(canvasElem, myChartObj);

}


// ***** EVENT HANDLERS **********


function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  // TODO: Add clicks to the image that was clicked
  console.log('img clicked >>', imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === imgClicked) {
      // increase vote counts
      productArray[i].clicks++;
    }
  }

  // TODO: decrement the vote count
  voteCount--;

  // TODO: call the render img to reload new images
  renderImgs();

  // TODO: after voting rounds have ended... end the clicks!
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
  }
}

// function handleShowResults() {
//   // TODO: Display results - once there are no more votes left
//   if (voteCount === 0) {
//     for (let i = 0; i < productArray.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${productArray[i].name}. number of views: ${productArray[i].views}. number of clicks: ${productArray[i].clicks}`;
//       resultsContainer.appendChild(liElem);
//     }
//     showresultsBtn.removeEventListener('click', handleShowResults);
//   }
// }

// ****** EXECUTABLE CODE ********

// ! OBJECT CREATION

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

renderImgs();

// renderChart ();

imgContainer.addEventListener('click', handleClick);
// showresultsBtn.addEventListener('click', handleShowResults);
