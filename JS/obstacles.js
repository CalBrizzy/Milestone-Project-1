class Obstacle {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.obsSpeed = 2
        this.hit = false
        this.frames = 0
        this.animationTime = 0
        this.frameDuration = 300
        this.width = 80
        this.height = 80
        this.spawn = 0
    }
}
const boxAsset = 'assets/images/environment/obstacles/box.png'
const chickenImg = 'assets/images/environment/obstacles/Chicken-Run.png'
const birdImmg = 'assets/images/environment/obstacles/Bird-Flying.png'
const tSpikesOut = 'assets/images/environment/obstacles/turtle-spikes-out.png'
const fatBirdImg = 'assets/images/environment/obstacles/FatBird-Fly.png'
const birdImg = 'assets/images/environment/obstacles/Bird-Flying.png'


let boxes = [new Obstacle(2000, 655), new Obstacle(4000, 655)]
let turtles = [new Obstacle(2000, 655), new Obstacle(4000, 655)]
let chicken = new Obstacle(2500, 655)
let bigBird = new Obstacle(2500, 550)
let bird = new Obstacle(2000, 550)


function obsSpawn(obsImg, src, spawnCount, speed, framesLength, resetFrames, framesWidth, framesHeight) {
    if (obsImg.spawn >= spawnCount) {
        obsImg.position.x -= gameSpeed * speed
        playObsAnimation(obsImg, src, framesLength, resetFrames, framesWidth, framesHeight)
    }
    if (obsImg.position.x + obsImg.width <= 0) {
        obsImg.position.x = 2500
        obsImg.spawn = 0
    }
}

function turtleObs() {
    turtles.forEach((turtle) => {
            playObsAnimation(turtle, tSpikesOut, 7, 0, 44, 26)
    })
}

function playObsAnimation(obsImg, src, framesLength, resetFrames, fWidth, fHeight) {
    const frameWidth = fWidth
    const frameHeight = fHeight
    const deltaTime = 16.67

    let img = new Image()
    img.src = src
    obsImg.animationTime += deltaTime

    ctx.drawImage(
        img,
        frameWidth * obsImg.frames, // crop image start on x position
        0, // crop image start on y position
        frameWidth, // crop to desired width of image
        frameHeight, // crop to desired height of image
        obsImg.position.x,
        obsImg.position.y,
        obsImg.width, // width size of image rendered
        obsImg.height) // height size of image rendered

    if (obsImg.animationTime >= obsImg.frameDuration) {
        obsImg.frames++
        obsImg.animationTime = 0 // Reset animation timer
    }

    if (obsImg.frames > framesLength) { // frames for the run animation
        obsImg.frames = resetFrames
    }
}

function obstacleMoveAndSpawn(obsImg) {

    obsImg.forEach((obs) => {
        if (gameStart === true) {
            obs.position.x -= gameSpeed + obs.obsSpeed;
    
            if (player1.isAlive === false) {
                obs.obsSpeed = 0
            } else {
                obs.obsSpeed = 2
            }
        }

        if (obs.position.x + obs.width <= 0) {
            let randomNum;
            let hasOverlap;
            do {
                hasOverlap = false;
                randomNum = Math.floor(Math.random() * (5500 - 2000)) + 2000;

                for (let otherObs of obsImg) {
                    if (randomNum < otherObs.position.x + otherObs.width && randomNum + obs.width > otherObs.position.x) {
                        hasOverlap = true;
                        break;
                    }
                }
            } while (hasOverlap);

            obs.position.x = randomNum;
            obs.hit = false;
        }
    });
}

function obstacleImage(obsImg) { // creates image of box
    let img = new Image()
    obsImg.forEach((obs) => {
        img.src = boxAsset
        ctx.drawImage(img, obs.position.x, obs.position.y, obs.width, obs.height)
    })
}

function obstacleStartingPos(obsImg) {
    obsImg[0].position.x = 2000
    obsImg[0].position.y = 655
    obsImg[1].position.x = 4000
    obsImg[1].position.y = 655

    chicken.position.x = 2500
    bird.position.x = 2000
    chicken.spawn = 0

    obsImg.forEach((obs) => {
        obs.hit = false
    })
}

function createObstacle() { // function to pass in update for box group
        turtleObs()
        obstacleMoveAndSpawn(turtles)
        obsSpawn(chicken, chickenImg, 3, 6, 13, 0, 32, 34) // obsImg, src, spawnCount, speed, framesLength, resetFrames, framesWidth, framesHeight
        obsSpawn(bird, birdImg, 1, 3, 8, 0, 32, 32)
}