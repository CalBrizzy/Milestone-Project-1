const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 800
canvas.width = 1600

let lastFrameTime = 0
const frameDuration = 30

let gameSpeed = 1
let gameStart = false

let removeH1 = document.getElementById('game-start')
let removeMsg = document.getElementById('start-btn')
let removeDirections = document.getElementById('directions')

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        gameStart = true
        removeDirections.remove()
        removeMsg.remove()
        removeH1.remove()
    }
    
})

function gameOver() {
    if (!player1.isAlive) {
        gameSpeed = 0
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
    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas every previous frame
    update()
}

animate()