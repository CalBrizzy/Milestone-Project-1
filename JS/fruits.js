class Fruit {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 100
        this.height = 100
        this.frames = 0
        this.animationTime = 0
        this.frameDuration = 300
        this.collectedFruits = 0
        this.gotFruit = false
    }
}
const collectedAnim = 'assets/images/fruits/Collected.png'
const appleImg = 'assets/images/fruits/Apple.png'
const bananaImg = 'assets/images/fruits/Bananas.png'
const strawberryImg = 'assets/images/fruits/Strawberry.png'

let apples = [new Fruit(2000, 500), new Fruit(3000, 500), new Fruit(4000, 500)]
let bananas = [new Fruit(-50, 0), new Fruit(-50, 0), new Fruit(-50, 0)]
let strawberrys = [new Fruit(-50, 0), new Fruit(-50, 0), new Fruit(-50, 0)]

const newLocation1 = [3000, 3800, 4600, 5400, 6200, 7000]
const newLocation2 = [400, 450, 500, 550, 600, 650, 700]

function fruitsAsset(fruitImg, src) {

    fruitImg.forEach((fruit, index) => {
        fruit.position.x -= gameSpeed

        if (fruit.gotFruit === false) {
            playFruitAnimation(fruit, src, 16, 0)
        } else {
            playFruitAnimation(fruit, collectedAnim, 5, 0)
            setTimeout(() => {
                fruit.gotFruit = false
                if (newLocation1 !== undefined) {
                    fruit.position.x = newLocation1[index]
                    fruit.position.y = newLocation2[index]
                }
            }, 400)
        }

        if (fruit.position.x + fruit.width <= 0) {
            if (newLocation1 !== undefined) {
                fruit.position.x = newLocation1[index]
                fruit.position.y = newLocation2[index]
            }
        }

    })
}

function playFruitAnimation(fruitImg, src, framesLength, resetFrames) {
    const frameWidth = 32
    const frameHeight = 32
    const deltaTime = 16.67

    let img = new Image()
    img.src = src
    fruitImg.animationTime += deltaTime

    ctx.drawImage(
        img,
        frameWidth * fruitImg.frames, // crop image start on x position
        0, // crop image start on y position
        frameWidth, // crop to desired width of image
        frameHeight, // crop to desired height of image
        fruitImg.position.x,
        fruitImg.position.y,
        fruitImg.width, // width size of image rendered
        fruitImg.height) // height size of image rendered

    if (fruitImg.animationTime >= fruitImg.frameDuration) {
        fruitImg.frames++
        fruitImg.animationTime = 0 // Reset animation timer
    }

    if (fruitImg.frames > framesLength) { // frames for the run animation
        fruitImg.frames = resetFrames
    }
}

function fruitsStartingPos(fruitImg) {
    fruitImg[0].position.x = 2000
    fruitImg[0].position.y = 500
    fruitImg[1].position.x = 3000
    fruitImg[1].position.y = 500
    fruitImg[2].position.x = 4000
    fruitImg[2].position.y = 500
}

function createFruits() {
    fruitsAsset(apples, appleImg)

    if (player1.boxJumped >= 5) {
        fruitsAsset(bananas, bananaImg)
    }
    if (player1.boxJumped >= 10) {
        fruitsAsset(strawberrys, strawberryImg)
    }
}
