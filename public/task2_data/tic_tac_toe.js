const boxs=document.querySelectorAll('.box');
const status=document.querySelector('#play');
const btnRestart=document.querySelector('#restart');
let x="<p><span id='o'>x</span></p>";
let o="<p><span id='x'>0</span></p>";

const winchance=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running=false;
init();

function init(){
  boxs.forEach(box=>box.addEventListener('click',boxClick));
  btnRestart.addEventListener('click',restartGame);
  status.textContent=`${player} Your Turn`;
  running=true;
}

function boxClick(){
  const index=this.dataset.index;
  if(options[index]!="" || !running){
    return;
  }
  updateBox(this,index);
  checkWinner();
}

function updateBox(box,index){
  options[index]=player;
  box.innerHTML=currentPlayer;
}

function changePlayer(){
    player=(player=='X') ? "O" :"X";
    currentPlayer=(currentPlayer==x) ? o :x;
    status.textContent=`${player} Your Turn`;
}

function checkWinner(){
  let isWon=false;
  for(let i=0;i<winchance.length;i++){
    const element=winchance[i]; 
    const box1=options[element[0]]; 
    const box2=options[element[1]]; 
    const box3=options[element[2]]; 
    if(box1=="" || box2=="" || box3==""){
      continue;
    }
    if(box1==box2 && box2==box3){
      isWon=true;
      boxs[element[0]].classList.add('win');
      boxs[element[1]].classList.add('win');
      boxs[element[2]].classList.add('win');
    }
  }

  if(isWon){
    status.textContent=`Congratulation to ${player} for winning the game`;
    running=false;
  }else if(!options.includes("")){
    status.textContent=`Game Draw..!`;
    running=false;
  }else{
    changePlayer();
  }

}

function restartGame(){
  options=["","","","","","","","",""];
  currentPlayer=x;
  player="X";
  running=true;
  status.textContent=`${player} Your Turn`;

  boxs.forEach(box=>{
      box.innerHTML="";
      box.classList.remove('win');
  });
}