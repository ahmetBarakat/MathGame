var difficultyLevel = 10;
var questiondict;
var questionIndex = 0;
var mistakeCounte = 0;
var numOfQuestion;
var gameStart = false;
var minoption;

function fillOptions(min, max){
    minoption = min;
    hideQuestoinPanle(true);
    let combobox = document.getElementById("numOfQuestion");
    for(let i = min; i <= max; i++){
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        combobox.appendChild(opt);
    }

    let input = document.getElementById("answerinput");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            // document.getElementById("ckeckAnswerBtn").click();
            checkAnswer();
        }
    });

    input.addEventListener("keyup", function(event) {
        if (event.key !== "Enter") {
            event.preventDefault();
            let ln = input.value.length;
            if (ln > 0){
                input.value = input.value[ln-1] + input.value.substring(0, ln-1);
            }
        }
    });
}

function btn_difficulty_mode(num){
    if (gameStart){
        return;
    }
    difficultyLevel = num;
    // console.log(difficultyLevel);
}

function startGame(){
    if (gameStart){
        return;
    }
    gameStart = true;
    questionIndex = 0;
    mistakeCounte = 0;
    numOfQuestion = document.getElementById("numOfQuestion").value;
    // console.log(numOfQuestion);
    questiondict = makeQuestion(numOfQuestion, 5);
    // console.log(questiondict)
    hideQuestoinPanle(false);
    setFocusToAnswerInput();
    showNextQuestion();    

}

function showNextQuestion(){
    let questionLabel = document.getElementById("questionLabel");
    let list = [];
    for(q in questiondict){
        list.push(q);
    }
    if(questionIndex < list.length){
            questionLabel.innerHTML = list[questionIndex];
            questionIndex++;
    }else{
        hideQuestoinPanle(true);
        alert(`Congratulations \ngood job\nyou finshed ${numOfQuestion} Question with ${mistakeCounte} Mistake`);
        gameStart = false;
        document.getElementById("numOfQuestion").value = minoption;
    }

}

function makeQuestion(num, multipler){
    let counter = 0;
    let max = difficultyLevel * multipler
    let qdict = {}
    while(counter < num){
        let a = randint(max/2, max+1);
        let b = randint(max/2, max+1);
        let c = a + b;
        let questionStr = `${a} + ${b}`;
        if(!(questionStr in qdict)){
            qdict[questionStr] = `${c}`;
            counter++;
        }
    }
    return qdict;
}

function randint(a, b){
    return Math.floor(Math.random() * (b-a)) + a;
}

function checkAnswer(){
    let answerinput = document.getElementById("answerinput");
    let resultlabel = document.getElementById("resultLabel");
    let question = document.getElementById("questionLabel").innerHTML;
    // console.log(question);
    if(questiondict[question] == answerinput.value.trim()){
        resultlabel.innerHTML = "Correct";
        showNextQuestion();
    }else{
        resultlabel.innerHTML = "Incorrect";
        mistakeCounte++;
    }
    answerinput.value = "";
    setFocusToAnswerInput();
}

function hideQuestoinPanle(value){
    if(value){
        document.getElementById("questionPanle").style.display = "none";
    }else{
        document.getElementById("questionPanle").style.display = "block";
    }
}

function setFocusToAnswerInput(){
    document.getElementById("answerinput").focus();
    document.getElementById("answerinput").select();
}