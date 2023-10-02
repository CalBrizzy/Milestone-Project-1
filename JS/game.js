const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') 

// Makes the canvas take the whole browser screen
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function createPlayer(mainPlayer) {
    let player = new Image() // Create a new image object
    player.src = mainPlayer.playerImage
    context.drawImage(player, mainPlayer.position.x, mainPlayer.position.y)
}

//Create Ground
function createGround(cGround) {
    let ground = new Image()
    ground.src = 'assets/images/environment/ground.png'
    context.drawImage(ground, cGround.positionX, cGround.positionY)
}

//Create Box
function createBox(cBox) {
    let box = new Image()
    box.src = 'assets/images/environment/box.png'
    context.drawImage(box, cBox.positionX, cBox.positionY)
}

function update() {
    createPlayer(playerFrogMan)
    groundGroup()
    groundMove()
    boxGroup()

    playerFrogMan.position.y += playerFrogMan.velocity.y // pulls player down

    if (playerFrogMan.position.y + playerFrogMan.height + 175 <= canvas.height) { // if bottom of the image does not hit bottom of canvas add gravity
        playerFrogMan.velocity.y += playerFrogMan.gravity // gravity simulation
    }
    else {
        playerFrogMan.velocity.y = 0 // if hit bottom of canvas don't pull player down
        playerFrogMan.isGrounded = true // checks every frame if player is grounded
    }
}

function animate() {
    requestAnimationFrame(animate) // method for animation loop built-in for canvas
    context.clearRect(0, 0, canvas.width, canvas.height) // clear canvas for every last animation frame
    update()
}

animate()