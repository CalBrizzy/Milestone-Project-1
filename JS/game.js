const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 800
canvas.width = 1600

let gameSpeed = 1

function update() {
    createPlayer(player1)
    createGround(grounds)
    createBox(boxes)
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    update()
}

animate()

