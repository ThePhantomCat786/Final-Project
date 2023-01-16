class Player {

    constructor(x, y) {

        this.x = x
        this.y = y
        this.w = 50
        this.h = 100
        this.veloX = 0
        this.veloY = 0

    }

    renderPlayer() {

        rect(this.x, this.y, this.w, this.h)

    }

    playerMovement(collision) {

        // If the key is 'd' then we increase velocity quickly by 0.45
		if (keyIsDown(68) && this.veloX <= 6) {
	
			this.veloX += 0.45

		// If the key is 'a' then we decrease velocity quickly by 0.45
		} else if (keyIsDown(65) && this.veloX >= -6) {
	
			this.veloX -= 0.45

		// Otherwise the player velocity will be slowed to 0 overtime
		} else {
	
			this.veloX *= 0.88
			
		}

        if (keyIsDown(32) && this.veloY <= 4) {

            this.veloY -= 0.20
            this.y = this.y += this.veloY

        } else {

            if (collision == false && this.y < 620) {

                this.veloY += 0.60
                this.y = this.y += this.veloY

            }

            this.veloY = 0

        }

        this.x = this.x + this.veloX

    }

    getX() {

        return this.x

    }

    getY() {

        return this.y

    }

    getW() {

        return this.w

    }

    getH() {

        return this.h

    }

}