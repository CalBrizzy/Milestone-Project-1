class Player {
    constructor(x, y, src) {
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
        this.score = -4
        this.gravity = 0.1
        this.jumpStrenth = 8
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

function playerHit(mainPlayer) {
    boxes.forEach((box) => {
        if (mainPlayer.position.x + mainPlayer.width <= box.position.x && box.hit === false && mainPlayer.position.y + mainPlayer.height >= box.position.y) {
            box.hit = true
            mainPlayer.score += 1
            console.log('I am hit!', box.hit)
            console.log(mainPlayer.score)
        }
    })
}

function playerImage(mainPlayer) { // creates image of player
    let img = new Image()
    img.src = mainPlayer.playerImg
    ctx.drawImage(img, mainPlayer.position.x, mainPlayer.position.y)
}

function createPlayer(newPlayer) { //one function to pass for player group
    playerImage(newPlayer)
    newPlayer.playerGravity()
    newPlayer.jump()
    playerHit(newPlayer)
}

let player1 = new Player(100, 100, 'assets/images/player/FrogMan-Idle.gif')

