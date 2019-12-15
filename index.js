var playBtn = document.querySelector('.play-btn');
var boxes = document.querySelectorAll('.box');
var level = 2;
var colors = ["red", "blue", "yellow", "green"];
var pattern = [];

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

// function changeColor(item) {
//     return item.style.opacity = '0.3';
// }

function highlight(elem){
    var orig = elem.style.opacity;
    elem.style.opacity = '0.3';
    setTimeout(function(){
         elem.style.opacity = orig;
    }, 500);
 }


function showPattern() {
    var targetBoxex = [];
    boxes.forEach(item => {
        if(pattern.indexOf(item.id) !== -1) {
            // setInterval(highlight(item), 500)
            // highlight(item)
            targetBoxex.push(item.id);
        }
    })
    targetBoxex.forEach(item => {
        setTimeout(highlight, 500, document.getElementById(item))
    })
    generatePattern(pattern )
}

playBtn.addEventListener('click', showPattern)