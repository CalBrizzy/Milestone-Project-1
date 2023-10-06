const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 800
canvas.width = 1600

let lastFrameTime = 0
const frameDuration = 30

let gameSpeed = 0
let gameStart = false

let gameTitle = document.getElementById('game-start')
let gameInputStartMsg = document.getElementById('start-btn')
let gameDirectionMsg = document.getElementById('directions')
let gameOverMsg = document.getElementById('game-over')
let gameRestartMsg = document.getElementById('restart-game')

gameOverMsg.style.display = 'none'
gameRestartMsg.style.display = 'none'

document.addEventListener('keydown', function (event) {
    if (player1.isAlive === true) {
        if (event.keyCode === 13) {
            gameStart = true
            gameTitle.style.display = 'none'
            gameInputStartMsg.style.display = 'none'
            gameDirectionMsg.style.display = 'none'
            gameSpeed = 1
        }
    }
})

document.addEventListener('keydown', function (event) {
    if (player1.isAlive === false) {
        if (event.keyCode === 13) {
            gameOverMsg.style.display = 'none'
            gameRestartMsg.style.display = 'none'
            gameTitle.style.display = ''
            gameInputStartMsg.style.display = ''
            gameDirectionMsg.style.display = ''
            gameStart = false
            player1.isAlive = true
            gameRestart()
        }
    }
})

function gameRestart() {
    playerStartingPos(player1)
    boxStartingPos(boxes)
}

function gameOver() {
    if (!player1.isAlive) {
        gameSpeed = 0
        gameOverMsg.style.display = ''
        gameRestartMsg.style.display = ''
    }
}

function update() {
    createPlayer(player1)
    createGround(grounds)
    createBox(boxes)
    gameOver()
}

function animate() {
    requestAnimationFrame(animate) // animation loop method / function
    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clears canvas every previous frame
    update()
}

animate()