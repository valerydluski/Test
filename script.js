let body = document.querySelector('body')
let wrapper;
let field = document.createElement('div');
let buttonNewGame = document.createElement('button');
let buttonResult = document.createElement('button');
let counter = document.createElement('div');
let counterMoves = document.createElement('p');
let counterTime = document.createElement('p');
let counterMovesSpan = document.createElement('span');
let counterTimeSpan = document.createElement('span');
let secondsSpan = document.createElement('span');
let quantityElements = document.createElement('div');
let textForMessage;
let messageBlock;
let messageButton;
let messageBlockText;
let f16 = document.createElement('span');
let f9 = document.createElement('span');
let f25 = document.createElement('span');
let f36 = document.createElement('span');
let f49 = document.createElement('span');
let f64 = document.createElement('span');
let time = document.createElement('span')
let arrContent = [];
let quantityMoves = 0;
let amountOfElements = 16;
let finalArr = [];
let collectionContent = [];
let timer = 0;
let fieldChild;
let seconds;
let minutes;
time.className = 'time';
time.id = 'time'
field.className = 'field';
buttonNewGame.className = 'new-game';
buttonResult.id = 'btnResult';
counter.className = 'counter';
counterMoves.className = 'counter-moves';
counterTime.className = 'time-moves';
quantityElements.className = 'quantity-elements';
f9.className = 'field-size';
f16.className = 'field-size';
f25.className = 'field-size';
f36.className = 'field-size';
f49.className = 'field-size';
f64.className = 'field-size';
secondsSpan.className = 'seconds-hiden';
secondsSpan.id = 'seconds';
f9.id = 'f9';
f16.id = 'f16';
f25.id = 'f25';
f36.id = 'f36';
f49.id = 'f49';
f64.id = 'f64';
f9.textContent = '3x3';
f16.textContent = '4x4';
f25.textContent = '5x5';
f36.textContent = '6x6';
f49.textContent = '7x7';
f64.textContent = '8x8';

let resultMovesArr = '999,888,777,777,666,666,555,555,999,987';
let resultTimeArr = '999,888,777,777,666,666,555,555,999,987';


const saveState = () => {
  localStorage.setItem('resultMoves', resultMovesArr);
  localStorage.setItem('resultTime', resultTimeArr);
};

const restoreState = () => {
  resultMovesArr = (localStorage.getItem('resultMoves')) ? localStorage.getItem('resultMoves') : resultMovesArr;
  resultTimeArr =  (localStorage.getItem('resultTime')) ? localStorage.getItem('resultTime') : resultTimeArr;
};

const createWrapper = () =>{
    wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    body.append(wrapper);
}

const createMessageBlock = () =>{
  messageBlock = document.createElement('div');
  messageBlockText = document.createElement('div');
  messageButton = document.createElement('button');
  messageBlock.id = 'message-block';
  messageBlockText.id = 'message-text';
  messageButton.id = 'BUTTON__CLOSE';
  messageButton.textContent = 'OK'
  wrapper.append(messageBlock);
  messageBlock.append(messageBlockText);
  messageBlock.append(messageButton);
  messageButton.addEventListener('click', ()=>{
    buttonNewGameActive();
    messageBlock.classList.remove('post__message');
  });	
}
const createCounter = () =>{
  wrapper.append(counter);
  counter.append(counterMoves);
  counterMoves.textContent = 'Ход: ';
  counterMoves.append(counterMovesSpan);
  counterMovesSpan.textContent = `${quantityMoves}`;
  counter.append(counterTime);
  counterTime.textContent = 'Время: ';
  counterTime.append(secondsSpan);
  counterTime.append(time);
  counterTime.append(secondsSpan);
}

const createFieldSize = () => {
  wrapper.append(quantityElements);
  quantityElements.textContent='размер поля: ';
  quantityElements.append(f9);
  quantityElements.append(f16);
  quantityElements.append(f25);
  quantityElements.append(f36);
  quantityElements.append(f49);
  quantityElements.append(f64);
}

const createField = () =>{
    field.id = 'field';
    wrapper.append(field);
    createButtonNewGame();
    createButtonResult();
    createArrContent(amountOfElements-1);
    if(amountOfElements !=9) {
      shuffleArray(arrContent);
    } 
    createFieldSize();      
}

const createButtonNewGame = () =>{
    buttonNewGame.textContent = 'Новая игра';
    buttonNewGame.id = 'newGame';
    wrapper.append(buttonNewGame);
} 

const createButtonResult = () =>{
  buttonResult.textContent= 'Результаты';
  wrapper.append(buttonResult);
} 

const createArrContent = (amountOfElements) =>{
  arrContent = [];
  finalArr = [];
    for (i=1; i < amountOfElements+1; i++) {
        arrContent.push(i);
        finalArr.push(i);
    } 
    arrContent.push('');
    finalArr.push('');  
}

const createNumber = (i) =>{
    let number = document.createElement('div');
    number.className = 'number';
    number.id = i;
    number.textContent = `${arrContent[i]}`;
    collectionContent.push(arrContent[i]);
    field.append(number);
    number.draggable = 'true';
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }

const timeInGame = () => {
  seconds = Math.floor(secondsSpan.textContent);
  if (seconds>60){
    minutes = Math.floor(seconds/60);
    seconds = seconds%60;
    time.textContent = `${minutes}:${seconds}`;
    return; 
  }
  time.textContent = `${seconds}`;
  return
}

 field.addEventListener('mouseup', (event) =>{
    if(event.target.className === 'number'){
        searchEmptyElement(event.target.id);     
    }
  });

 buttonNewGame.addEventListener('mousedown', (event) =>{
    buttonNewGameActive();
  });

const buttonNewGameActive = () =>{
  collectionContent = []; 
    fieldChild = [];
    if(amountOfElements !=9) {
      shuffleArray(arrContent);
    }
    quantityMoves = 0;
    counterMovesSpan.textContent = `${quantityMoves}`;
    if (wrapper.querySelector('.number')) {
        deleteNumber();
      }
    for (let i=0; i<amountOfElements; i++){
        createNumber(i);
    }
    field.childNodes.forEach(element => {
     fieldChild.push(element.id); 
    });
    timer = new Date().getTime();
    timeInGame();    
}




let interval = setInterval(function(){
    if (timer==0) return;
    document.getElementById('seconds').innerHTML = (new Date().getTime()-timer)/1000; timeInGame() },100);
    

  const deleteNumber = () =>{
    while (field.hasChildNodes()) {  
      field.removeChild(field.firstChild);
    } 
  }

  const searchEmptyElement = (id) => {
    let sqrtAmount = Math.sqrt(amountOfElements);
     let bottomElement = Number(id)+Number(sqrtAmount);
     let rightElement = Number(id)+1;  
     let topElement = id-sqrtAmount;
     let leftElement = id - 1;
     let remainder = id%sqrtAmount;
     if ((collectionContent[rightElement] === '') && rightElement < collectionContent.length && remainder != (sqrtAmount-1)){
      moveElement(id, rightElement); 
     }
     if ((collectionContent[bottomElement] === '') && bottomElement < collectionContent.length){
         
        moveElement(id, bottomElement);
     }
     if ((collectionContent[topElement] === '') && topElement < collectionContent.length){
      
        moveElement(id, topElement);
     }
     if ((collectionContent[leftElement] === '') && leftElement >= 0 && remainder != 0){
        moveElement(id, leftElement);
     }
  }


  const moveElement = (id, emptyIndex) =>{
    let fieldElementId = document.getElementById(id);
    let fieldElementEmpty = document.getElementById(emptyIndex);
    let stack = collectionContent[id];
    collectionContent[id] = '';
    collectionContent[emptyIndex] = stack;
    fieldElementId.textContent = '';
    fieldElementId.classList.add('run-animation');
    fieldElementEmpty.classList.add('run-animation');
    fieldElementEmpty.textContent = `${stack}`;
    quantityMoves += 1;
    counterMovesSpan.textContent = `${quantityMoves}`;
    function deleteAnimation (){
      fieldElementId.classList.remove('run-animation');
      fieldElementEmpty.classList.remove('run-animation');
    }
    setTimeout(deleteAnimation, 1000);
    if(checkGameStatus()){
      createTextForMessage();
      showMessage();
    }
  }
  
  const createTextForMessage = () => {
    let quantityMovesForMessage = 0;
    quantityMovesForMessage = quantityMoves;
    let timeForMessage = ''
    timeForMessage = time.textContent;
    saveResult(quantityMoves, Math.floor(secondsSpan.textContent))
    messageBlockText.textContent = `Вы победили!! ходы: ${quantityMovesForMessage} время: ${timeForMessage}`;
  }

  //drag and drop
  var dragged;
  let dropTarget;
  /* events fired on the draggable target */
  document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function(event) { 
    event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "number") {
      dropTarget = event.target.id
    }
  }, false);
  document.addEventListener("drop", function(event) {
    event.preventDefault();
   // searchEmptyElement(dragged.id)
    if (event.target.textContent == '') {
      searchEmptyElement(dragged.id)
    }
  }, false);

  quantityElements.addEventListener('mouseup', (event) =>{
    let arr = ['f9','f16', 'f25', 'f36', 'f49', 'f64']
    arr.forEach(element => {
      if (event.target.id == element){
        if (!(field.classList[1]=== undefined)){
          field.classList.remove('f9','f16', 'f25', 'f36', 'f49', 'f64');
        }
        field.classList.add(element);
        let str = element;
        amountOfElements = str.slice(1);
        createField();
        buttonNewGameActive();
      }
    });
  });

  const checkGameStatus = () =>{
    let gameOver = true
      for (let i = 0; i<finalArr.length;i+=1){
        if(collectionContent[i] != finalArr[i]){
          gameOver = false;
        }
      }
      return gameOver;
  } 

//message
const showMessage = () =>{ 
	messageBlock.classList.add('post__message');
};


let compareNumbers = (a, b) =>{
  return a - b;
}

let filterResult = (arr, str) => {
  arr = arr.split(',');
  arr.push(str);
  arr = arr.sort(compareNumbers).slice(0, 10);
  return arr;
}

const saveResult = (moves, time) => {
  restoreState(); 
  resultMovesArr = filterResult(resultMovesArr, moves);
  resultTimeArr = filterResult(resultTimeArr, time);
  console.log(resultMovesArr, resultTimeArr)
  saveState();
}

const textForResult = () =>{
    messageBlockText.innerHTML = `лучшие результаты:<br \/> по ходам: ${resultMovesArr} <br \/>по времени(сек): ${resultTimeArr}`;
  
};

buttonResult.addEventListener('mousedown', (event) =>{
  textForResult();
  messageBlock.classList.add('post__message');
}); 



  window.onload = () => {
    createWrapper();
    createMessageBlock(); 
    createCounter();
    createField();  
    restoreState();      
  };

