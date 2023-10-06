class Box {
    constructor(x, y) {
        this.boxImg = 'assets/images/environment/box.png'
        this.position = {
            x: x,
            y: y
        }
        this.boxSpeed = 2
        this.hit = false
        this.width = 80
        this.height = 80
    }
}

let boxes = [new Box(2000, 655), new Box(4000, 655), new Box(6000, 655), new Box(8000, 655)]

function boxMoveAndSpawn(boxImg) {

    boxImg.forEach((box) => {
        if (gameStart === true) {
            box.position.x -= gameSpeed + box.boxSpeed;
    
            if (player1.isAlive === false) {
                box.boxSpeed = 0
            } else {
                box.boxSpeed = 2
            }
        }

        if (box.position.x + box.width <= 0) {
            let randomNum;
            let hasOverlap;
            do {
                hasOverlap = false;
                randomNum = Math.floor(Math.random() * (7000 - 2000)) + 2000;

                for (let otherBox of boxImg) {
                    if (randomNum < otherBox.position.x + otherBox.width && randomNum + box.width > otherBox.position.x) {
                        hasOverlap = true;
                        break;
                    }
                }
            } while (hasOverlap);

            box.position.x = randomNum;
            box.hit = false;
        }
    });
}

function boxImage(boxImg) { // creates image of box
    let img = new Image()
    boxImg.forEach((box) => {
        img.src = box.boxImg
        ctx.drawImage(img, box.position.x, box.position.y, box.width, box.height)
    })
}

function boxStartingPos(boxImg) {
    boxImg[0].position.x = 2000
    boxImg[0].position.y = 655
    boxImg[1].position.x = 4000
    boxImg[1].position.y = 655
    boxImg[2].position.x = 6000
    boxImg[2].position.y = 655
    boxImg[3].position.x = 8000
    boxImg[3].position.y = 655

    boxImg.forEach((box) => {
        box.hit = false
    })
}

function createBox(boxImg) { // function to pass in update for box group
        boxImage(boxImg)
        boxMoveAndSpawn(boxImg)
}