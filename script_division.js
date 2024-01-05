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
    let primes = get_prime(max);
    while(counter < num){
        let a = randint(max/2, max+1);
        if(primes.includes(a)){
            continue;
        }
        // console.log(`a: ${a}`)
        let b = get_divisors(a);
        let rand = randint(0, b.length);
        // console.log(`b: ${b}`);
        // console.log(`b.length: ${b.length}`);
        // console.log(`rand: ${rand}`);
        // console.log(`b[rand]: ${b[rand]}`);
        let c = a/b[rand];
        // console.log(`c: ${c}`);
        let questionStr = `${a} / ${b[rand]}`;
        if(!(questionStr in qdict)){
            qdict[questionStr] = `${c}`;
            counter++;
        }
    }
    return qdict;
}

function get_prime(n){
    let primes = [];
    if (n > 2){
        primes.push(2);
    }
    for(let i=3; i <= n; i += 2){
        if (get_divisors(i).length == 0){
            primes.push(i);
        }
    }
    // console.log(primes);
    return primes;
}

function get_divisors(num){
    let divisors = [];
    for (let i = 2; i < num; i++){
        if (num % i == 0){
            divisors.push(i);
        }
    }
    return divisors;
}

function randint(a, b){
    return Math.floor(Math.random() * (b-a)) + a;
}

function checkAnswer(){
    let answerinput = document.getElementById("answerinput");
    let resultlabel = document.getElementById("resultLabel");
    let question = document.getElementById("questionLabel").innerHTML;
    // console.log(question);
    // console.log(questiondict);
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