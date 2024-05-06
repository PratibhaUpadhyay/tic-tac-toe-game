let gameInfo = document.querySelector(".gameinfo");
let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];
// let's create a function to initialize the game
function initgame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI Pe bhi empty krna pdega boxes ko
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing - initialize boxes with css properties
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initgame();

function  swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    // UI update yhi kr do
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
  let answer = "";
  winningPosition.forEach((position)=>{
    
    // all 3 boxes should be non empty and exactly same in value
    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // check if winner is x
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else 
                answer = "0";

            // disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            // know we know who wins X/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

    
    
        }
    });

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }

    //let's check ,  when there is no winner there is a tie match
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    // board is filled , game is Tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }



}

function handelClick(index){

    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        // check koi jeet to nhi gya
        checkGameOver();

    }
}





boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handelClick(index);
    })
});

newGameBtn.addEventListener('click', ()=>{
    initgame();
})




