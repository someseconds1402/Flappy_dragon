var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');

var birdImg = new Image();
var background = new Image();
var topPipe = new Image();
var botPipe = new Image();

birdImg.src = "bird.png";
background.src = "background.png";
topPipe.src = "topPipe.png";
botPipe.src = "botPipe.png";

var pipeWidth = topPipe.width;

var score = 0;
var spaceX = 140; // Vung trong giua topPipe va botPipe
var botPipeLocation; // vi tri dat bottom pipe

// Tao 1 object bird voi toa do nhu sau
var bird = {
    x: background.width / 5,
    y: background.height / 2
}

var pipe = [] // tao array chua cac ong

pipe[0] = {
    x : canvas.width,
    y : 0 // Ong dau tien nam ben phai ngoai cung cua man hinh canvas
} 

// function chay tro choi
function run (){
    // Load Image
    context.drawImage(background, 0, 0);
    context.drawImage(birdImg, bird.x, bird.y);

    context.font = "40px Georgia";
    context.fillText('score : ' + score, 10, 50);

    for(var i = 0; i < pipe.length; i++){
        botPipeLocation = topPipe.height + spaceX;
        context.drawImage(topPipe, pipe[i].x, pipe[i].y);
        context.drawImage(botPipe, pipe[i].x, pipe[i].y + botPipeLocation);

        pipe[i].x -= 5; // pipe di chuyen
        if(pipe[i].x == canvas.width / 3 * 2){
            // Khi pipe[i] di chuyen 1/3 quang duong thi push them 1 pipe moi
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * topPipe.height) - topPipe.height
            })
        }
        if(pipe[i].x <= -pipeWidth) 
            pipe.splice(0,1); // pipe di het quang duong thi xoa khoi array
        if (pipe[i].x == bird.x)
            score ++;

        // Dieu kien thua
        if((bird.y + birdImg.height == canvas.height)
        || (bird.x + birdImg.width >= pipe[i].x && bird.x <= pipe[i].x + topPipe.width)
        && (bird.y <= pipe[i].y + topPipe.height || bird.y + birdImg.height >= pipe[i].y + botPipeLocation)){
            downBird(); 
            return;  
        }
    }

    // cho bird roi xuong
    bird.y += 3;
    requestAnimationFrame(run);
}

// doc su kien nhan phim SPACE, cho bird bay len
document.addEventListener("keydown", function(){
    bird.y -= 60;
    // console.log(this.timeline);
})

function downBird(){
    context.drawImage(background, 0, 0);
    
    for(var i = 0; i < pipe.length; i++){
        botPipeLocation = topPipe.height + spaceX;
        context.drawImage(topPipe, pipe[i].x, pipe[i].y);
        context.drawImage(botPipe, pipe[i].x, pipe[i].y + botPipeLocation);
    }
    context.drawImage(birdImg, bird.x, bird.y);
    bird.y += 10;
    if(bird.y + birdImg.height >= canvas.height){
        return;
    }   
    requestAnimationFrame(downBird);       
}

run();