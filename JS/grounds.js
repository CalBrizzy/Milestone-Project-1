class Ground {
    constructor(x, y) {
        this.groundImg = 'assets/images/environment/ground.png'
        this.position = {
            x: x,
            y: y
        }
        this.endDetect = false
        this.width = 3500
        this.height = 150
    }
}

let grounds = [new Ground(0, 735), new Ground(3500, 735), new Ground(7000, 735)]

function moveGround(groundImg) { //Endless running ground
    if (gameStart === true) {
        groundImg.forEach((ground) => {
            ground.position.x -= gameSpeed
        })
    }

    if (grounds[0].position.x + grounds[0].width <= 0) { // When the end width of the ground image reaches 0 pixels position it at the back of grounds[2]
        grounds[0].position.x = grounds[2].position.x + grounds[2].width + 1
    }
    if (grounds[1].position.x + grounds[1].width <= 0) {// When the end width of the ground image reaches 0 pixels position it at the back of grounds[0]
        grounds[1].position.x = grounds[0].position.x + grounds[0].width
    }
    if (grounds[2].position.x + grounds[2].width <= 0) {// When the end width of the ground image reaches 0 pixels position it at the back of grounds[1]
        grounds[2].position.x = grounds[1].position.x + grounds[1].width
    }
}

function groundImage(groundImg) { // creates image of ground
    let img = new Image()
    groundImg.forEach((ground) => {
        img.src = ground.groundImg
        ctx.drawImage(img, ground.position.x, ground.position.y)
    })
}

function createGround(groundImg) {// function to pass in update for ground group
    groundImg.forEach(() => {
        groundImage(groundImg)
        moveGround(groundImg)
    })
}