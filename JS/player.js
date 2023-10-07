class Player {
    constructor(x, y, idle, run, jump, fall, hit, die) {
        this.img = new Image()
        this.playerIdle = idle
        this.playerRun = run
        this.playerJump = jump
        this.playerFall = fall
        this.playerHit = hit
        this.playerDeath = die
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
        this.highScore = 0
        this.gravity = 0.1
        this.jumpStrenth = 9
        this.jumpHeight = 230
        this.boxJumped = 0
        this.isFalling = false
        this.frames = 0
        this.animationTime = 0
        this.frameDuration = 200
        this.isGrounded = false
        this.width = 100
        this.height = 100
    }

    playerGravity() {
        this.position.y += this.velocity.y //pulls player down

        if (this.isAlive === true) {
            if (this.position.y + this.height + 70 <= canvas.height) { //checks if buttom of player hits bottom of canvas
                this.velocity.y += this.gravity // apply gravity
                if (this.position.y <= this.jumpHeight) {
                    this.isFalling = true
                    console.log('height reached')
                }
            } else {
                this.velocity.y = 0 // stops at buttom of canvas if player hit buttom
                this.isGrounded = true
                this.isFalling = false
            }
        } else {
            this.velocity.y = 0
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
    'assets/images/player/FMan-Jump2.png', //Jump image path
    'assets/images/player/FMan-Fall.png', //Fall image path
    'assets/images/player/FMan-Hit.png',  //Hit image path
    'assets/images/player/FMan-Die.png') // Death image path

player1.jump()


function playerHitOrScore(mainPlayer) {

    boxes.forEach((box) => {
        const collidesHorizontally = mainPlayer.position.x + mainPlayer.width - 25 > box.position.x && mainPlayer.position.x + 25 < box.position.x + box.width // Checks if player hits the side of the box
        const collidesVertically = mainPlayer.position.y + mainPlayer.height - 10 > box.position.y && mainPlayer.position.y < box.position.y + box.height // Checks if player hits the top side of the box

        if (collidesHorizontally && collidesVertically && box.hit === false) { // If player is hit by box, player is dead
            box.hit = true
            mainPlayer.isAlive = false
            mainPlayer.velocity.y = 0
            mainPlayer.isGrounded = true
        } else if (!collidesHorizontally && mainPlayer.position.x > box.position.x && box.hit === false) { // Player successfully passed the box without collision
            box.hit = true
            mainPlayer.boxJumped++
            chicken.chickenSpawn++
        }
    });
}

function playerCollectFruit(mainPlayer, fruitImg) {

    fruitImg.forEach((fruit) => {
        const collidesHorizontally = mainPlayer.position.x + mainPlayer.width - 25 > fruit.position.x && mainPlayer.position.x + 25 < fruit.position.x + fruit.width  // Checks if player hits the side of the fruit
        const collidesVertically = mainPlayer.position.y + mainPlayer.height > fruit.position.y && mainPlayer.position.y < fruit.position.y + fruit.height && mainPlayer.position.y + mainPlayer.height - 25 > fruit.position.y// Checks if player hits the bottom side of the box

        if (collidesHorizontally && collidesVertically && fruit.gotFruit === false) {
            fruit.gotFruit = true
            mainPlayer.score++
        }
    })
}

function obstacleHit(mainPlayer, obsImg) {
    const collidesHorizontally = mainPlayer.position.x + mainPlayer.width - 25 > obsImg.position.x && mainPlayer.position.x + 25 < obsImg.position.x + obsImg.width // Checks if player hits the side of the box
    const collidesVertically = mainPlayer.position.y + mainPlayer.height - 10 > obsImg.position.y && mainPlayer.position.y < obsImg.position.y + obsImg.height // Checks if player hits the top side of the box

    if (collidesHorizontally && collidesVertically) {
        mainPlayer.isAlive = false
    }
}

function playerAnimation(mainPlayer, fWidth, fHeight, fDuration) {
    const frameWidth = fWidth
    const frameHeight = fHeight

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

    if (mainPlayer.animationTime >= mainPlayer.frameDuration + fDuration) {
        mainPlayer.frames++
        mainPlayer.animationTime = 0 // Reset animation timer
    }
}

function playerImage(mainPlayer) { // creates image and handles the animation of the player
    const deltaTime60FPS = 16.67
    const deltaTime30FPS = 33.33

    if (mainPlayer.isAlive === true) {
        if (gameStart === false) { // If game hasn't started play idle animation
            mainPlayer.img.src = mainPlayer.playerIdle
            mainPlayer.animationTime += deltaTime60FPS
        } else { // If game started play run animation
            mainPlayer.img.src = mainPlayer.playerRun
            mainPlayer.animationTime += deltaTime60FPS
        }

        if (mainPlayer.isGrounded === true) { //If player is grounded do the idle and run animations

            playerAnimation(mainPlayer, 32, 32, 0)

            if (gameStart === false) { // checks if when game is not started do the Idle animation when game starts do the run animation
                if (mainPlayer.frames > 10) { // frames for the idle animation
                    mainPlayer.frames = 0
                }
            } else {
                if (mainPlayer.frames > 11) { // frames for the run animation
                    mainPlayer.frames = 0
                }
            }
        } else if (mainPlayer.isFalling === false) {
            // checks if player is not falling. If not falling do the jump animation
            mainPlayer.img.src = mainPlayer.playerJump
            mainPlayer.animationTime += deltaTime60FPS

            playerAnimation(mainPlayer, 32, 32, 800)

            if (mainPlayer.frames > 5) { // frames for the run animation
                mainPlayer.frames = 0
            }
            // else if falling do fall animation
        } else {
            mainPlayer.img.src = mainPlayer.playerFall
            ctx.drawImage(mainPlayer.img, mainPlayer.position.x, mainPlayer.position.y, mainPlayer.width, mainPlayer.height)
        }
    } else { // Hit animation
        mainPlayer.img.src = mainPlayer.playerHit
        mainPlayer.animationTime += deltaTime30FPS

        playerAnimation(mainPlayer, 32, 32, 500)

        if (mainPlayer.frames > 13) {
            mainPlayer.frames = 13
        }
    }
}

function playerStartingPos(mainPlayer) {
    mainPlayer.position.x = 100
    mainPlayer.position.y = 100
}

function createPlayer(newPlayer) { //one function to pass for player
    playerImage(newPlayer) // creates the player with the deltaTime parameter for the animation loop of the player
    newPlayer.playerGravity()
    playerHitOrScore(newPlayer)
    playerHighScore(newPlayer)
    playerScore(newPlayer)
    playerCollectFruit(newPlayer, apples)
    playerCollectFruit(newPlayer, bananas)
    playerCollectFruit(newPlayer, strawberrys)
    obstacleHit(newPlayer, chicken)
}


