function playerScore(mainPlayer) {
    if (gameStart === true) {
        ctx.font = '50px Titan One'
        ctx.fillText(mainPlayer.score, canvas.height, 150)
    } else {
        mainPlayer.score = 0
    }
}

function playerHighScore(mainPlayer) {
    let highScoreTxt = document.getElementById('highscore')
    highScoreTxt.innerText = `Highscore: ${mainPlayer.highScore}`

    if (mainPlayer.highScore < mainPlayer.score) {
        mainPlayer.highScore ++
    }
}