function changePlayer() {
    
}

function createPlayer() {
    const image = document.createElement('img')
    image.id = 'player'
    image.src = playerFrogMan.imageIdle
    image.style.position = 'relative'
    image.style.height = playerFrogMan.height
    image.style.width = playerFrogMan.width
    image.style.left = playerFrogMan.xPosition
    image.style.bottom = playerFrogMan.yPosition
    return image
}

function playerInField() {
    const gameField = document.getElementById('game-environment')
    let playerImage = createPlayer()
    gameField.appendChild(playerImage) // rendering player inside the game field
}

playerInField() // player iside the game environment









