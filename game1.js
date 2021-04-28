var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var background = new Image();

img1.src = "1.png";
img2.src = "2.png";
img3.src = "3.png";
background.src = "background.png";

var count = 1;

var dragon = {
    x: background.width / 2 - img1.width /2,
    y: background.height / 2 - img1.height / 2
}

function drawDragon(){
    context.drawImage(background, 0, 0);
    if(count == 1){
        context.drawImage(img1, dragon.x, dragon.y);
        count = 2;
    }
    else if(count == 2){
        context.drawImage(img2, dragon.x, dragon.y);
        count = 3;
    }
    else if(count == 3){
        context.drawImage(img3, dragon.x, dragon.y);
        count = 1;
    }
    // requestAnimationFrame(() => drawDragon());
}
setInterval(() =>drawDragon(), 180);
// run();