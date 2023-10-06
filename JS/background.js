function background(src, x, y, width, height) {
    let img = new Image()
    img.src = src
    ctx.drawImage(img, x, y, width, height)
}

function createBackground() {
    background('assets/images/environment/background/CloudsBack.png', 0, 0, 2000, 600)
    background('assets/images/environment/background/CloudsFront.png', 0, 150, 2000, 600)
    background('assets/images/environment/background/BGFront.png', 0, 200, 2000, 600)
}