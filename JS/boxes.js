class Box {
    constructor(x, y) {
        this.boxImg = 'assets/images/environment/box.png'
        this.position = {
            x: x,
            y: y
        }
        this.hit = false
        this.width = 100
        this.height = 100
    }
}

let boxes = [new Box(2000, 635), new Box(4000, 635), new Box(6000, 635), new Box(7000, 635)]

function randNum(num) {
    Math.floor(Math.random()* (num - 500)) + 500
}

function boxMoveAndSpawn(boxImg) {
    let randomNum = Math.floor(Math.random()* (7000 - 2000)) + 2000

    boxImg.forEach((box) => { 
        box.position.x -= gameSpeed - 0.25

        if (box.position.x + box.width <= 0) { // when left side of box width reach 0 pixel 
            box.position.x = randomNum// spawn in different location
            box.hit = false
        }
    })
}

function boxImage(boxImg) { // creates image of box
    let img = new Image()
    boxImg.forEach((box) => {
        img.src = box.boxImg
        ctx.drawImage(img, box.position.x, box.position.y, box.width, box.height)
    })
}

function createBox(boxImg) { // function to pass in update for box group
    boxImg.forEach(() => {
        boxImage(boxImg)
        boxMoveAndSpawn(boxImg)
    })
}

function score() {
    let score = 0
    if (boxes === true) {
        score++
    } else {
        score = score
    }
    console.log(score)
}