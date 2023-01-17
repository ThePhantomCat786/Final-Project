class Player {

    constructor(x, y) {

        this.x = x
        this.bgX = x
        this.y = y
        this.w = 50
        this.h = 100
        this.veloX = 0
        this.veloY = 0

        this.bgVeloX = 0
        
        this.jumpRestrict = 0

    }

    renderPlayer() {

        rect(this.x, this.y, this.w, this.h)

    }

    playerMovement(collision) {

        // If the key is 'd' then we increase velocity quickly by 0.45
		if (keyIsDown(68) && this.veloX <= 4 && this.bgVeloX <= 4 && this.x <= 1220) {
	
			this.veloX += 0.8
            this.bgVeloX += 0.8

		// If the key is 'a' then we decrease velocity quickly by 0.45
        } else if (keyIsDown(65) && this.veloX >= -4 && this.bgVeloX >= -4 && this.bgX >= 520) {
	
			this.veloX -= 0.8
            this.bgVeloX -= 0.8

        } else if (keyIsDown(65) && this.veloX >= -4 && this.x >= 60) {

            this.veloX -= 0.8

        }
		// Otherwise the player velocity will be slowed to 0 overtime
		else {
	
			this.veloX *= 0.5
            this.bgVeloX *= 0.9
			
		}

        // if (keyIsDown(68) && this.bgVeloX <= 4 && this.bgX > 1220 && this.bgX <= 4720) {

        //     this.bgVeloX += 0.8

        // } else if (keyIsDown(65) && this.bgVeloX >= -4 && this.bgX > 1220 && this.bgX <= 4720 ) {

        //     this.bgVeloX -= 0.8

        // }

        if (keyIsDown(32) && this.jumpRestrict < 12) {

            this.y = this.y - 4.5

            this.jumpRestrict++

        } else {

            if (collision == false && this.y < 620) {

                this.veloY += 2.5
                this.y = this.y + this.veloY

            } else {

                this.jumpRestrict = 0

            }

            this.veloY = 0

        }

        this.x = this.x + this.veloX
        this.bgX = this.bgX + this. bgVeloX
        console.log(this.x)

    }

    getX() {

        return this.bgX

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

    getPx() {

        return this.x

    }

}