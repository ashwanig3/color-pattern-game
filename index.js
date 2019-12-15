var playBtn = document.querySelector('.play-btn');
var message = document.querySelector('.message');
var boxes = document.querySelectorAll('.box');
var levelElem = document.querySelector('.level');
var mainContainer = document.querySelector('.main-container');
var level = 1;
var colors = ["red", "blue", "yellow", "green"];
var pattern = [];
var selectedBox = [];
var isPlayed = false;

function generatePattern(arr=[]) {
    for(var i=0; arr.length+1 <= level; i++) {
        var randomColor = colors[Math.floor(Math.random()*colors.length)];
        if(arr.indexOf(randomColor) === -1) {
            arr.push(randomColor)
        }
    }
    return arr;
}

generatePattern(pattern);

function levelIncDec(status) {
    if(!status) {
        level = level;
        levelElem.innerHTML = `Level: ${level}`
    } else {
        level = level + 1;
        levelElem.innerHTML = `Level: ${level}`
    }
}


function highlight(elem){
    console.log(elem)
    var orig = elem.style.opacity;
    elem.style.opacity = '1';
    setTimeout(function(){
         elem.style.opacity = orig;
    }, 500);
 }


function showPattern() {
    pattern.forEach((item, i) => {
        setTimeout(highlight, 500*i, document.getElementById(item))
    })

    // generatePattern(pattern );
    isPlayed = true;
    playBtn.style.display = "none";
    message.innerHTML = 'Choose the boxes in order of pattern';
}

function compareResult() {
    if(selectedBox.length === pattern.length) {
        message.innerHTML = `Well Done! Level ${level + 1}`;
        isPlayed = false;
        pattern = [];
        selectedBox = [];
        levelIncDec(true);
        playBtn.style.display = 'block';
        boxes.forEach(box => {
            box.style.border = 'none';
        })
        generatePattern(pattern)
    }
    if(level === 10) {
        mainContainer.style.display = 'none';
        document.querySelector('.result').innerHTML = 'Yeah! You won.'
        
    }
}

boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        if(!isPlayed) return;
        selectedBox.push(e.target.id);
        box.style.border = '2px solid black';
        console.log(selectedBox, pattern)
        for(var i=0; i< selectedBox.length; i++) {
            if(selectedBox[i] !== pattern[i]) {
                message.innerHTML = 'Wrong Attempt! Try Again.';
                levelIncDec(false)
                setTimeout(function(){window.location.reload()}, 5000)
            }
        }
        compareResult()
    })
})

playBtn.addEventListener('click', showPattern);