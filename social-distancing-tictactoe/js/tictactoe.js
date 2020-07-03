//Future goals
//AI- computer Play
//difficulty level
//being able to play with two player or computer
//Design Changes
//Ref: this game was developed with referring the https://github.com/christinebittle/vuepractice by Christine Bittle
//for the purpose of understanding the vue.js //it was referred on July 2nd 2020

//defining the winning moves
const winMoves = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,3,6],
    [1,4,7],
    [0,5,8],
    [2,4,8],
    [0,4,6]
];

//board component
Vue.component('board',{
    props:['radius','id', 'x', 'y', 'text', 'number'],	
    template:
    `<div 
        v-bind:class="'square'" 
        v-bind:style="{'top':x+'%', 'right':y+'%', 'position': 'absolute'}"
        v-on:click="turn(); checkWin();">{{text}}
    </div>`,
    methods:{
        turn:function(){
            // debugger
            // console.log('You clicked the '+this.id+' box!');
            //check if the element is empty, if it is not then skip it and check if the game is over or not
            if (!app.boxes[this.number].text && !app.gameOver){
                //apply the move on board
                app.boxes[this.number].text = app.nextTurn;
                //changing the nextturn value for next turn
                if (app.nextTurn === 'X') {
                    app.nextTurn = 'O';
                }
                else {
                    app.nextTurn = 'X';
                }
                //increase turn
                app.turns += 1;
            }
        },
        // this method will check if anyone is winning or not and it will print the result
        // this method will check the moves against the winning move defined in winMoves
        checkWin:function(){
            if (app.turns >= 9){
                console.log("DRAW!!");
                //print the result
                document.getElementById("message").innerHTML = "Draw!!😱😱🙌🏻"
                //game is over
                app.gameOver = true;
            }
            for (i = 0; i < winMoves.length; i++){
                // used for debugging
                // debugger
                console.log(winMoves[i], "winning pair");
                if (app.boxes[winMoves[i][0]].text == 'O' && app.boxes[winMoves[i][1]].text == 'O' && app.boxes[winMoves[i][2]].text == 'O'){
                    console.log("O Wins");
                    //print the result
                    document.getElementById("message").innerHTML = "O Wins!!🥳🙌🏻🎊🎉🎖️";
                    //break the loop since result is declared
                    app.gameOver = true;
                    break;
                }
                else if (app.boxes[winMoves[i][0]].text == 'X' && app.boxes[winMoves[i][1]].text == 'X' && app.boxes[winMoves[i][2]].text == 'X'){
                    console.log("X wins");
                    //print the result
                    document.getElementById("message").innerHTML = "X Wins!!🥳🙌🏻🎊🎉🎖️";
                    app.gameOver = true;
                    //break the loop since result is declared
                    break;
                }
            }
        }	
    }

});

//contains data of boxes, nextturn, turns count and game over info
var app = new Vue({
    el: '#app',
    
    data:{
        boxes:[
            {id:3, text:'', x: 35, y:37, number: 0},
            {id:2, text:'', x: 35, y:47, number: 1},
            {id:1, text:'', x: 35, y:57, number: 2},
            {id:4, text:'', x: 55, y:57, number: 3},
            {id:5, text:'', x: 55, y:47, number: 4},
            {id:6, text:'', x: 55, y:37, number: 5},
            {id:7, text:'', x: 75, y:57, number: 6},
            {id:8, text:'', x: 75, y:47, number: 7},
            {id:9, text:'', x: 75, y:37, number: 8}
        ],
        nextTurn: 'X',
        turns: 0,
        gameOver: false
    },   
});
