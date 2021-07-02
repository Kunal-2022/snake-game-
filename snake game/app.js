function init() {


    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    width = 1000;
    height = 600;
    canvas.width = width;
    canvas.height = height;
    cs = 40;
    gameOver = false;
    score = 5;
    food = getRandomFood();

    // create a image object

    foodImage = new Image();
    foodImage.src = "apple.jpg";

    snake = {
        len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (let i = this.len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            //pen.clearRect(0, 0, width, height);
            //pen.fillRect(food.x * cs, food.y * cs, cs, cs);
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = "darkblue";
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },
        updatingSnake: function () {
            console.log("updating snake");
            //this.cells.pop();

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                food = getRandomFood();
                score++;
            }
            else {
                this.cells.pop();
            }

            var nx, ny;
            if (this.direction == "right") {
                nx = headX + 1;
                ny = headY;
            }
            else if (this.direction == "left") {
                nx = headX - 1;
                ny = headY;
            }
            else if (this.direction == "up") {
                nx = headX;
                ny = headY - 1;
            }
            else if (this.direction == "down") {
                nx = headX;
                ny = headY + 1;
            }
            this.cells.unshift({ x: nx, y: ny });
            var lastX = Math.round(width / cs);
            var lastY = Math.round(height / cs);
            if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY) {
                gameOver = true;
            }
        }
    };

    snake.createSnake();
    function keyPressed(e) {
        if (e.key == "ArrowUp") {
            snake.direction = "up";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else { }
    }
    document.addEventListener('keydown', keyPressed);
}

function draw() {
    pen.clearRect(0, 0, width, height);
    // pen.fillStyle = food.color;
    pen.drawImage(foodImage, food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = "black";
    pen.font = "30px Roboto";
    pen.fillText(score, 10, 30);
    snake.drawSnake();
}

function update() {
    snake.updatingSnake();
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (width - cs) / cs);
    var foodY = Math.round(Math.random() * (height - cs) / cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    };

    return food;
}

function gameloop() {
    if (gameOver == true) {
        clearInterval(f);
        alert("Game over please refresh to start new game");
        return;
    }
    draw();
    update();
}

init();
let f = setInterval(gameloop, 100);