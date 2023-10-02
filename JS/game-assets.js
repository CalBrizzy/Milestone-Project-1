let gameSpeed = 5

class Ground {
    constructor(x, y) {
        this.positionX = x
        this.positionY = y
        this.width = 3500
        this.height = 130
    }
}

class Box {
    constructor(x, y) {
        this.positionX = x
        this.positionY = y
        this.width = 150
        this.height = 150
    }
}

let gameGround1 = new Ground(0, 2500)
let gameGround2 = new Ground(3500, 2500)
let gameGround3 = new Ground(7000, 2500)

let box1 = new Box(2500, 2350)
let box2 = new Box(4000, 2350)
let box3 = new Box(5000, 2350)
let box4 = new Box(6000, 2350)

//endless running ground
function groundMove() {
    gameGround1.positionX -= gameSpeed
    gameGround2.positionX -= gameSpeed
    gameGround3.positionX -= gameSpeed

    if (gameGround1.positionX <= -3500) {
        gameGround1.positionX = gameGround3.positionX + gameGround3.width
    }
    if (gameGround2.positionX <= -3500) {
        gameGround2.positionX = gameGround1.positionX + gameGround1.width
    }
    if (gameGround3.positionX <= -3500) {
        gameGround3.positionX = gameGround2.positionX + gameGround2.width
    }
}

//Relocate the boxes once it reached a certain pixel
function spawnLocations(mBox) {
    let randomNum = Math.floor(Math.random() * (6000 - 5009)) + 5009

    mBox.positionX -= gameSpeed

    if (mBox.positionX <= -150) { 
        mBox.positionX = randomNum
        console.log(mBox)
    }
}

function groundGroup() {
    createGround(gameGround1)
    createGround(gameGround2)
    createGround(gameGround3)
}

//Grouped the box instances
function boxGroup() {
    createBox(box1)
    spawnLocations(box1)
    createBox(box2)
    spawnLocations(box2)
    createBox(box3)
    spawnLocations(box3)
    createBox(box4)
    spawnLocations(box4)
}

