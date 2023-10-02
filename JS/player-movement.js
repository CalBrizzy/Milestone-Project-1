// Jump
function jump() {
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 32 && playerFrogMan.isGrounded === true) {
            playerFrogMan.velocity.y -= playerFrogMan.jumpStrength
            playerFrogMan.isGrounded = false
        }
    })
}

jump()

