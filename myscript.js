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
let seenBirds = [];

var index = 0;

function createBird(bird){

    return `
<div id="birdholder">
    <p class="gender">sorry i didnt account for gender</p>
    <img class="pic" src="${bird.picture.img}" width="500">
    <p class="license">${bird.picture.license}</p>
    <p class="cc_holder">${bird.picture.license_holder}</p>
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
    { return;}
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
        seenBirds.push({index: index, correct: true});
        score += 1;
        updateScore();
        index += 1;
        if (index >= allBirds.length) {
            birdsdiv.innerHTML = "<p>Quiz complete! Great job!</p>";
            showFinalResults();
            // some func to see all the stuff you missed
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

function skipSubmission(){
    seenBirds.push({index: index, correct: false});
    index++;
    birdsdiv.innerHTML = createBird(allBirds[index]);
}

const finalResult = document.getElementById("results");

function showFinalResults(){
    console.log("showing results?")
    // pseudocode
    /*    
    for i in seenbirds
        (imagine below is a box, like seenbirds[i].smallpic is one picture.)
        seenbirds[i].smallpic | index
        seenbirds[i].smallpic | common names
        seenbirds[i].smallpic | latin name
        seenbirds[i].smallpic | if seenbirds[i][0] === true show completed, else skipped
        
    */
   for (let i = 0; i < allBirds.length; i++)
   {
        finalResult.innerHTML += `
        <div class=birdresult>
            <img src="${allBirds[i].picture.img}" width="200">
            <div class=birdinfo>
            <p class="id">id: ${i}</p>  
            <p class="name">common names: ${allBirds[i].name.join(", ")}</p>
            <p class="latin">latin name: ${allBirds[i].latin}</p>
            <p class="skipped">${seenBirds[i].correct}</p>
            </div>
        </div>`;
        
   }
    
}