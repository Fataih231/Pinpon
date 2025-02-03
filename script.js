const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutları
canvas.width = 800;
canvas.height = 400;

// Paddle ayarları
const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 5;

// Top ayarları
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;
const ballSize = 10;

// Kontroller
let leftPaddleUp = false, leftPaddleDown = false;
let rightPaddleUp = false, rightPaddleDown = false;

// Paddle'ları çiz
function drawPaddle(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Topu çiz
function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2, false);
    ctx.fill();
}

// Paddle hareketlerini güncelle
function movePaddles() {
    if (leftPaddleUp && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
    if (leftPaddleDown && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
    if (rightPaddleUp && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
    if (rightPaddleDown && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;
}

// Top hareketlerini güncelle
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Üst ve alt sınır çarpma
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Sol paddle çarpma
    if (ballX <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Sağ paddle çarpma
    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Skor durumu
    if (ballX <= 0 || ballX >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

// Kontrol olayları
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') rightPaddleUp = true;
    if (event.key === 'ArrowDown') rightPaddleDown = true;
    if (event.key === 'w') leftPaddleUp = true;
    if (event.key === 's') leftPaddleDown = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') rightPaddleUp = false;
    if (event.key === 'ArrowDown') rightPaddleDown = false;
    if (event.key === 'w') leftPaddleUp = false;
    if (event.key === 's') leftPaddleDown = false;
});

// Oyun döngüsü
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, leftPaddleY); // Sol paddle
    drawPaddle(canvas.width - paddleWidth, rightPaddleY); // Sağ paddle
    drawBall();
    movePaddles();
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();