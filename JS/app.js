'use strict';

const ImagesNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
]
// Images Path
const imgPath = [
  'img/bag.jpg',
  'img/banana.jpg',
  'img/bathroom.jpg',
  'img/boots.jpg',
  'img/breakfast.jpg',
  'img/bubblegum.jpg',
  'img/chair.jpg',
  'img/cthulhu.jpg',
  'img/dog-duck.jpg',
  'img/dragon.jpg',
  'img/pen.jpg',
  'img/pet-sweep.jpg',
  'img/scissors.jpg',
  'img/shark.jpg',
  'img/sweep.png',
  'img/tauntaun.jpg',
  'img/unicorn.jpg',
  'img/usb.gif',
  'img/water-can.jpg',
  'img/wine-glass.jpg',
]


const imageSection = document.getElementById('imageSection');
const firstImage = document.getElementById('first');
const secondImage = document.getElementById('second');
const thirdImage = document.getElementById('third');


function Image(name,imgPath) {
  this.imgPath = imgPath;
  this.name = name;
  this.views = 0;
  this.votes = 0;
  Image.all.push(this);
}
Image.all = []


for (let i = 0; i < ImagesNames.length; i++) {
  new Image(ImagesNames[i], imgPath[i]);
}


function render() {
  const firstIndex = randomNumber(0, Image.all.length - 1);
  const firstRandomImages = Image.all[firstIndex];
  first.src = firstRandomImages.imgPath;
  first.title = firstRandomImages.name;
  first.alt = firstRandomImages.name;
  console.log(Image.all[firstIndex].views);

  Image.all[firstIndex].views++;
  console.log(Image.all[firstIndex].views);

  const secondIndex = randomNumber(0, Image.all.length - 1);
  const secondRandomImages = Image.all[secondIndex];
  second.src = secondRandomImages.imgPath;
  second.title = secondRandomImages.name;
  second.alt = secondRandomImages.name;
  Image.all[secondIndex].views++;

  const thirdIndex = randomNumber(0, Image.all.length - 1);
  const thirdRandomImages = Image.all[thirdIndex];
  third.src = thirdRandomImages.imgPath;
  third.title = thirdRandomImages.name;
  third.alt = thirdRandomImages.name;
  Image.all[thirdIndex].views++;
  
}

imageSection.addEventListener('click', handleClick);

let clickRemining = 2;

function handleClick(event) {
  clickRemining = clickRemining - 1;
  if (event.target.id === 'first' || event.target.id === 'second' || event.target.id === 'third') {
    for (let i = 0; i < Image.all.length; i++) {
      if (Image.all[i].name === event.target.title) {
        Image.all[i].votes++;
        console.table(Image.all[i])

      }
    }
    render();
  }
  if (clickRemining === 0) {
    imageSection.removeEventListener('click', handleClick);
    renderStats();
    creatChart();
    alert('You have finished 25 times to vote !');
    localStorage.setItem('setImages', JSON.stringify(Image.all));
  }
  render();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let stats = document.getElementById('stats');

function renderStats(){
  let h1Element=document.createElement('h1');
  h1Element.textContent='Total statistics';
  h1Element.style.color='rgb(202, 10, 138)';
  h1Element.style.fontFamily='cursive';
  h1Element.style.fontSize= '40px';
  h1Element.style.textAlign= 'center';
  stats.appendChild(h1Element);

  for(let i = 0 ; i < Image.all.length; i++){
    let li = document.createElement('li');
    li.textContent=Image.all[i].name + '  has (' + Image.all[i].votes + ')  votes , and the views are: ' + Image.all[i].views;
    li.style.textAlign = 'center';
    li.style.fontSize= '25px';
    li.style.fontFamily = 'Georgia, Times New Roman, Times, serif';
    li.style.paddingBottom='10px';
    li.style.listStyleType='none';
    li.style.listStylePosition='inside';
    li.style.color= 'white';
    li.style.backgroundColor='rgba(2, 75, 75, 0.664)';
    stats.appendChild(li);
  }
}

function creatChart() {
  let context = document.getElementById('imageChart').getContext('2d');
  let getImageNames = [];
  let getImagesVotes = [];
  let getImagesViews = [];

  for (let i = 0; i < Image.all.length; i++) {
    getImageNames.push(Image.all[i].name);
  }
  for (let i = 0; i < Image.all.length; i++) {
    getImagesVotes.push(Image.all[i].votes);
  }
  for (let i = 0 ; i < Image.all.length ; i++){
    getImagesViews.push(Image.all[i].views);
  }
  console.log(getImagesViews);


  let chartColors = ['#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000080', '#000000'];
  let chartObject = {
    type: 'bar',

    data: {
      labels: getImageNames,
      datasets: [{
        label: 'Bus Mall voting results',
        backgroundColor: chartColors,
        borderColor: 'rgb(0, 191, 255)',
        data: getImagesVotes ,
      },
      {
        label: 'Bus Mall views results',
        backgroundColor: chartColors,
        borderColor: 'rgb(7, 79, 104)',
        data: getImagesViews ,
      }
      ]
    },
    options: {
      scales: {
        xAxes: [{
          barPercentage: 0.4
        }]
      }
    }
  }
  Chart.defaults.global.defaultFontColor = '#00004d';
  Chart.defaults.global.defaultFontFamily = 'cursive';
  Chart.defaults.global.defaultFontSize = 20;

  let chart = new Chart(context, chartObject);

}

function checkStorage(){
  if (localStorage.setImages){
    let stringifyImages = localStorage.getItem('setImages');
    Image.all = JSON.parse(stringifyImages);
  }

}
checkStorage();
render();