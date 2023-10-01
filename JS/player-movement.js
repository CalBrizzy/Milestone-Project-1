function jump() {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 32 && playerFrogMan.isGrounded === true) {
                playerFrogMan.velocity.y -= 20
                playerFrogMan.isGrounded = false
                console.log('jumping')
            }
        })
}

jump ()
