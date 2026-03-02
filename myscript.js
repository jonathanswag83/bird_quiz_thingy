function fetchData()
{
    fetch('birdstemplate.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Http error" + response.status)
        }
        return response.json();
    })
    .then(data => {
        allBirds = data.bird;
        createBirds();
    })
    .catch(error => console.error("failed to fetch data", error))
}
fetchData();    

const birdsdiv = document.getElementById("birds");

let allBirds = [];

var index = 0;

function createBird(bird){

    return `
<div id="birdholder">
    <div class="male">
        <p class="gender">Male picture</p>
        <img class="pic" src="${bird.male.picture}" width="500">
        <p class="license">${bird.male.license}</p>
        <p class="cc_holder">${bird.male.license_holder}</p>
    </div>
    <div class="female">
        <p class="gender">Female picture</p>
        <img class="pic" src="${bird.female.picture}" width="500">
        <p class="license">${bird.female.license}</p>
        <p class="cc_holder">${bird.female.license_holder}</p>
    </div>
</div>
    `;
}
var empty = ``;

var score = 0;
const scoreField = document.getElementById("score");

function updateScore(){
    scoreField.innerHTML = `Score = ${score}`;
}

document.getElementById('birdsubmission').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkSubmission();
    }
});

function createBirds()
{
    birdsdiv.innerHTML += createBird(allBirds[index]);   
}

var ThatsCorrect = `<p>yep thats true</p>`
var thatsWrong = `<p>yep thats NOT true</p>`

var textInput = document.getElementById('birdsubmission');
const result = document.getElementById("submissionResult")



function checkSubmission()
{

    const guess = textInput.value.trim().toLowerCase();
    if (guess === "")
    var correctBird = false;
    for (let i = 0; i < allBirds[index].name.length; i++)
    {
        if (allBirds[index].name[i].trim().toLowerCase() === guess){
            correctBird = true;
            break;
        }
    }
    if (correctBird)
    {
        result.innerHTML = ThatsCorrect;
        score += 1;
        updateScore();
        index += 1;
        if (index >= allBirds.length) {
            birdsdiv.innerHTML = "<p>Quiz complete! Great job!</p>";
            return;
        }
        else{
            birdsdiv.innerHTML = createBird(allBirds[index]);
        }
    
    }
    else{
        result.innerHTML = thatsWrong;
    }

}