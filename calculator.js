//Define Buttons

//Current Input
var currNum = '';
var storeNum = '';
var currOperator;
var answer;


function clearScreen(){
    $('#screen').html('');
    debug();
}

function updateScreen(){
    if(currNum.length > 9){
        currNum = parseInt(currNum).toExponential(3);
    }
    debug();
    $('#screen').html(currNum);
}

function setScreen(input){
    $('#screen').html(input.toString());
    debug();
}

function calculate(){
    if(storeNum == ''){
        currNum = currNum;
        updateScreen();
    }
    if( currOperator == '/'){
        answer = (parseInt(storeNum) / parseInt(currNum));
    }else if(currOperator == '*'){
        answer = (parseInt(storeNum) * parseInt(currNum));
    }else if(currOperator == '-'){
        answer = (parseInt(storeNum) - parseInt(currNum));
    }else if(currOperator == '+'){
        answer = (parseInt(storeNum) + parseInt(currNum));
    }
    if(answer.toString().length >= 6){
        setScreen(answer.toExponential(3));
    }else{
        setScreen(answer);
    }
    currNum = answer;
    storeNum = '';
    currOperator = '';
    answer = '';
}

function debug(){
    console.clear();
    console.log('Current Number:: ' + currNum);
    console.log('Stored Number:: ' + storeNum);
    console.log('Stored Operator:: ' + currOperator);
    console.log('Answer:: ' + answer);
};

//Clear button
$('#clear').click(function(){
    if($('#screen').html() == ''){
        //All Clear
        currNum = '';
        storeNum = '';
        currOperator = '';
        answer = '';
    }else{
        //Screen Clear
        currNum = '';
        $('#screen').html('');
        $('#clear').html('AC');
    }
    debug();
});

//When any of the number buttons are pressed
$('.number-button').click(function(){
    if(currNum.length > 6){
        return;
    }
    currNum = currNum + $(event.target).html();
    $('#clear').html('C');
    updateScreen();
});

//When any of the function buttons are pressed
$('.function-button').click(function(){
    clearScreen();
    let operator = $(event.target).attr('operator');
    if(operator == '=' && currNum != ''){
        calculate();
    }else if (currNum == ''){
        return;
    }else{
        currOperator = $(event.target).attr('operator');
        storeNum = currNum;
        currNum = '';
        debug();
    }
});