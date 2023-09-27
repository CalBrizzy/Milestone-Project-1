document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { // Check if left arrow was pressed
        playerFrogMan.xPosition -= playerFrogMan.speed
    }
    if (event.key === 'ArrowRight') { // Check if right arrow was pressed
        playerFrogMan.xPosition += playerFrogMan.speed
    }
    if (playerFrogMan.isJumping === false) {
        if (event.key === 'Space' || event.keyCode === 32) {
            playerFrogMan.isJumping = true
            console.log('isJumping?', playerFrogMan.isJumping)
            
        }
    }
})

function jump() {
    
}
