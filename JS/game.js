const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 800
canvas.width = 1600

let gameSpeed = 0
let gameStart = false
const gameMusic = new Audio ('assets/music/game-music.wav')
const collectSoundEffect = new Audio ('assets/music/collect-sound-effect.wav')
const jumpSoundEffect = new Audio ('assets/music/jump-sound-effect.wav')
const deathSoundEffect = new Audio ('assets/music/death-sound-effect.wav')

let gameTitle = document.getElementById('game-start')
let gameInputStartMsg = document.getElementById('start-btn')
let gameDirectionMsg = document.getElementById('directions')
let gameOverMsg = document.getElementById('game-over')
let gameRestartMsg = document.getElementById('restart-game')

gameOverMsg.style.display = 'none'
gameRestartMsg.style.display = 'none'

document.addEventListener('keydown', function (event) { // press enter to start game
    if (player1.isAlive === true) {
        if (event.keyCode === 13) {
            gameStart = true
            gameTitle.style.display = 'none'
            gameInputStartMsg.style.display = 'none'
            gameDirectionMsg.style.display = 'none'
            gameMusic.play()
            gameMusic.loop = true
            gameMusic.currentTime = 0
            gameMusic.volume = 0.2
            gameSpeed = 1
        }
    }
})

document.addEventListener('keydown', function (event) { // game over press enter to restart game
    if (player1.isAlive === false) {
        if (event.keyCode === 13) {
            gameOverMsg.style.display = 'none'
            gameRestartMsg.style.display = 'none'
            gameTitle.style.display = ''
            gameInputStartMsg.style.display = ''
            gameDirectionMsg.style.display = ''
            gameStart = false
            player1.isAlive = true
            player1.isHit = false
            player1.isGhost = false
            boxes.hit = false
            chicken.chickenSpawn = 0
            gameRestart()
        }
    }
})

function gameRestart() {
    playerStartingPos(player1)
    obstacleStartingPos(turtles)
    fruitsStartingPos(apples)
    player1.boxJumped = 0
}

function gameOver() {
    if (!player1.isAlive) {
        gameSpeed = 0
        gameOverMsg.style.display = ''
        gameRestartMsg.style.display = ''
    }
}

function update() {
    createBackground()
    createPlayer(player1)
    createGround(grounds)
    createObstacle()
    createFruits()
    gameOver()
}

function animate() {
    requestAnimationFrame(animate) // animation loop method / function
    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clears canvas every previous frame
    update()
}

animate()