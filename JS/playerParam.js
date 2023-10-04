class Player {
    constructor(x, y, src) {
        this.img = new Image()
        this.playerImg = src
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
        this.isGrounded = false
        this.width = 100
        this.height = 100
    }

    playerGravity() {
        this.position.y += this.velocity.y //pulls player down

        if (this.position.y + this.height + 100 <= canvas.height) { //checks if buttom of player hits bottom of canvas
            this.velocity.y += this.gravity // apply gravity
        } else {
            this.velocity.y = 0 // stops at buttom of canvas if player hit buttom
            this.isGrounded = true
        }
    }

    jump() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 32 && this.isGrounded === true) {
                this.velocity.y -= this.jumpStrenth // adds up speed for player y position
                this.isGrounded = false
            }
        })
    }
}

function playerHitOrScore(mainPlayer) {
    boxes.forEach((box) => {
        const collidesHorizontally = mainPlayer.position.x + mainPlayer.width > box.position.x && mainPlayer.position.x < box.position.x + box.width
        const collidesVertically = mainPlayer.position.y + mainPlayer.height > box.position.y && mainPlayer.position.y < box.position.y + box.height

        if (collidesHorizontally && collidesVertically && box.hit === false) {
            box.hit = true
            console.log('I am hit!', box.hit)

            mainPlayer.isAlive = false
        } else if (!collidesHorizontally && mainPlayer.position.x > box.position.x && box.hit === false) { // Player successfully passed the box without collision
            box.hit = true
            mainPlayer.score += 1
            console.log('Box successfully passed!')
        }
    });
}

function playerImage(mainPlayer) { // creates image of player
    mainPlayer.img.src = mainPlayer.playerImg
    ctx.drawImage(mainPlayer.img, mainPlayer.position.x, mainPlayer.position.y)
}

function createPlayer(newPlayer) { //one function to pass for player group
    playerImage(newPlayer)
    newPlayer.playerGravity()
    playerHitOrScore(newPlayer)
}

let player1 = new Player(100, 100, 'assets/images/player/FrogMan-Idle.gif')
player1.jump()

