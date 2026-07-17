const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const rows = canvas.height / box;
const cols = canvas.width / box;

let snake = [
    { x: 10 * box, y: 10 * box }
];

let food = randomFood();

let dx = box;
let dy = 0;

let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;

    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * cols) * box,
        y: Math.floor(Math.random() * rows) * box
    };
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "#00aa00";
        ctx.fillRect(part.x, part.y, box, box);

        ctx.strokeStyle = "#111";
        ctx.strokeRect(part.x, part.y, box, box);
    });

    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    // Wall collision
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ) {
        gameOver();
        return;
    }

    // Self collision
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = randomFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(game);
    alert("Game Over!\nScore: " + score);
}

const game = setInterval(draw, 120);\