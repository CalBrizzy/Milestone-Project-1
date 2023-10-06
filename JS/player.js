class Player {
    constructor(x, y, idle, run, jump, fall) {
        this.img = new Image()
        this.playerIdle = idle
        this.playerRun = run
        this.playerJump = jump
        this.playerFall = fall
        // this.playerDie = die
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.isAlive = true
        this.score = 0
        this.gravity = 0.1
        this.jumpStrenth = 9
        this.jumpHeight = 176
        this.isFalling = false
        this.frames = 0
        this.animationTime = 0
        this.frameDuration = 300
        this.isGrounded = false
        this.width = 150
        this.height = 150
    }

    playerGravity() {
        this.position.y += this.velocity.y //pulls player down

        if (this.position.y + this.height + 70 <= canvas.height) { //checks if buttom of player hits bottom of canvas
            this.velocity.y += this.gravity // apply gravity
            if (this.position.y <= this.jumpHeight) {
                this.isFalling = true
            }
        } else {
            this.velocity.y = 0 // stops at buttom of canvas if player hit buttom
            this.isGrounded = true
            this.isFalling = false
            
        }
    }

    jump() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 32 && this.isGrounded === true) {
                this.velocity.y -= this.jumpStrenth // adds vertical speed for player y position
                this.isGrounded = false
            }
        })
    }
}

let player1 = new Player(100, 100,
    'assets/images/player/FMan-Idle.png', //Idle image path
    'assets/images/player/FMan-Run.png', //Run image path
    'assets/images/player/FMan-Jump.png', //Jump image path
    'assets/images/player/FMan-Fall.png') //Fall image path

player1.jump()


function playerHitOrScore(mainPlayer) {

    boxes.forEach((box) => {
        const collidesHorizontally = mainPlayer.position.x + mainPlayer.width > box.position.x && mainPlayer.position.x < box.position.x + box.width // Checks if player hits the side of the box
        const collidesVertically = mainPlayer.position.y + mainPlayer.height > box.position.y && mainPlayer.position.y < box.position.y + box.height // Checks if player hits the top side of the box

        if (collidesHorizontally && collidesVertically && box.hit === false) { // If player is hit by box, player is dead
            box.hit = true
            mainPlayer.isAlive = false
        } else
            if (!collidesHorizontally && mainPlayer.position.x > box.position.x && box.hit === false) { // Player successfully passed the box without collision
                box.hit = true
                mainPlayer.score += 1
            }
    });
}

function playerScore(mainPlayer) {
    if (gameStart === true) {
        ctx.font = '50px Titan One'
        ctx.fillText(mainPlayer.score, canvas.height, 150)
    }
}

function playerImage(mainPlayer, deltaTime) { // creates image of player
    const frameWidth = 32
    const frameHeight = 32

    if (gameStart === false) {
        mainPlayer.img.src = mainPlayer.playerIdle
        mainPlayer.animationTime += deltaTime
    } else {
        mainPlayer.img.src = mainPlayer.playerRun
        mainPlayer.animationTime += deltaTime
    }

    if (mainPlayer.isGrounded === true) {
        ctx.drawImage(
            mainPlayer.img,
            frameWidth * mainPlayer.frames, // crop image start on x position
            0, // crop image start on y position
            frameWidth, // crop to desired width of image
            frameHeight, // crop to desired height of image
            mainPlayer.position.x,
            mainPlayer.position.y,
            mainPlayer.width, // width size of image rendered
            mainPlayer.height) // height size of image rendered

        if (mainPlayer.animationTime >= mainPlayer.frameDuration) {
            mainPlayer.frames++
            mainPlayer.animationTime = 0 // Reset animation timer
        }
    }

    if (mainPlayer.isGrounded === true) { //If player is grounded do the idle and run animations
        if (gameStart === false) { // checks if when game is not started do the Idle animation when game starts do the run animation
            if (mainPlayer.frames > 10) {
                mainPlayer.frames = 0
            }
        } else {
            if (mainPlayer.frames > 11) {
                mainPlayer.frames = 0
            }
        }
    } else {
        // checks if player is not falling. If not falling do the jump animation
        if (mainPlayer.isFalling === false) { 
            mainPlayer.img.src = mainPlayer.playerJump
            ctx.drawImage(mainPlayer.img, mainPlayer.position.x, mainPlayer.position.y, mainPlayer.width, mainPlayer.height)
        // else if falling do fall animation
        } else { 
            mainPlayer.img.src = mainPlayer.playerFall 
            ctx.drawImage(mainPlayer.img, mainPlayer.position.x, mainPlayer.position.y, mainPlayer.width, mainPlayer.height)
        }
    }
}

function createPlayer(newPlayer) { //one function to pass for player
    playerImage(newPlayer, 33.33)
    newPlayer.playerGravity()
    playerHitOrScore(newPlayer)
    playerScore(newPlayer)
}


