const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') 

// Makes the canvas take the whole browser screen
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function createPlayer() {
    let img = new Image // Create a new image object
    img.src = playerFrogMan.playerImage
    context.drawImage(img, playerFrogMan.position.x, playerFrogMan.position.y)
}

function update() {
    createPlayer()
    playerFrogMan.position.y += playerFrogMan.velocity.y // pulls player down

    if (playerFrogMan.position.y + playerFrogMan.height + 68 <= canvas.height) { // if bottom of the image does not hit bottom of canvas add gravity
        playerFrogMan.velocity.y += playerFrogMan.gravity // gravity simulation
    }
    else {
        playerFrogMan.velocity.y = 0 // if hit bottom of canvas don't pull player down
    }
}

function animate() {
    requestAnimationFrame(animate) // method for animation loop built-in for canvas
    context.clearRect(0, 0, canvas.width, canvas.height) // clear canvas for every last animation frame
    update()
    console.log('go')
}

animate()








