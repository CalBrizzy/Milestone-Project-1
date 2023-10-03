class Box {
    constructor(x, y) {
        this.boxImg = 'assets/images/environment/box.png'
        this.position = {
            x: x,
            y: y
        }
        this.width = 150
        this.height = 150}
}

let boxes = [new Box(500, 585), new Box(800, 585)]

function boxMoveAndSpawn(boxImg) {
    let randomNum = Math.floor(Math.random()* (1000 - 500)) + 500

    boxImg.forEach((box) => {
        box.position.x -= gameSpeed + 0.5
        
        if (box.position.x + box.width <= 0) { // when left side of box width reach 0 pixel 
            box.position.x = randomNum // spawn in different location
        }
    })
}

function boxImage(boxImg) { // creates image of box
    let img = new Image()
    boxImg.forEach((box) => {
        img.src = box.boxImg
        ctx.drawImage(img, box.position.x, box.position.y)
    })
}

function createBox(boxImg) { // function to pass in update for box group
    boxImg.forEach(() => {
        boxImage(boxImg)
        boxMoveAndSpawn(boxImg)
    })
}