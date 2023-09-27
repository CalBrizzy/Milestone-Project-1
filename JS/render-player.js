function changePlayer() {

}

function createPlayer() {
    const image = document.createElement('img')
    image.id = 'player'
    image.src = playerFrogMan.imageIdle
    image.style.position = 'relative'
    image.style.height = playerFrogMan.height
    image.style.width = playerFrogMan.width
    image.style.left = playerFrogMan.xPosition + 'px'
    image.style.bottom = playerFrogMan.yPosition + 'px'
    return image
}

function playerInField() {
    const gameField = document.getElementById('game-environment')
    let playerImage = createPlayer()
    gameField.appendChild(playerImage) // rendering player inside the game field
}

function updatePlayerPosition() {
    document.addEventListener('keydown', function(){
        let identifyPlayer = document.getElementById('player')
        identifyPlayer.style.left = playerFrogMan.xPosition + 'px' //Update the player's game environment xPosition
        // identifyPlayer.style.bottom = playerFrogMan.xPosition + 'px'
    })
}

playerInField() // player iside the game environment
updatePlayerPosition() // player movement inside game environment








