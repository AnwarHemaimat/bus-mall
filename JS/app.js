'use strict';
let app= document.getElementById('app');
let clickRemining=25;
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
    'shark' ,
    'sweep' ,
    'tauntaun' ,
    'unicorn' ,
    'usb' ,
    'water-can' , 
    'wine-glass' ,
]

const imageSection= document.getElementById('imageSection');
const firstImage=document.getElementById('first');
const secondImage= document.getElementById('second');
const thirdImage= document.getElementById('third');


function Image(name){
    this.name=name;
    this.views=0;
    this.votes=0;
    this.path=`./img/${name}.jpg`;
    Image.all.push(this);
}
Image.all=[]

for(let i = 0 ; i < ImagesNames.length ; i++){
    new Image(ImagesNames[i]);
}

function render(){
    const firstIndex=randomNumber(0,Image.all.length-1);
    const firstRandomImages=Image.all[firstIndex];
    firstImage.src=firstRandomImages.path;
    firstImage.title=firstRandomImages.name;
    firstImage.alt=firstRandomImages.name;
  
    const secondIndex=randomNumber(0,Image.all.length-1);
    const secondRandomImages=Image.all[secondIndex];
    secondImage.src=secondRandomImages.path;
    secondImage.title=secondRandomImages.name;
    secondImage.alt=secondRandomImages.name;
  
    const thirdIndex=randomNumber(0,Image.all.length-1);
    const thirdRandomImages=Image.all[thirdIndex];
    thirdImage.src=thirdRandomImages.path;
    thirdImage.title=thirdRandomImages.name;
    thirdImage.alt=thirdRandomImages.name;
  }

  imageSection.addEventListener('click',handleClick);

  function handleClick(event){
    if (event.target.id === 'firstImage' || event.target.id === 'secondImage' || event.target.id === 'thirdImage'){
      for(let i = 0 ; i < Image.all.length ; i++){
        if (Image.all[i].name === event.target.title){
          Image.all[i].votes++;
          console.table(Image.all[i])
        }
      }
      render();
    }
}

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      render();
    
