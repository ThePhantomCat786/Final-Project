class Player {

    constructor(x, y, w, h) {

        this.x = x
        this.bgX = x
        this.y = y
        this.w = w
        this.h = h
        this.veloX = 0
        this.veloY = 0

        this.bgVeloX = 0
        this.eVeloX = 0
        
        this.jumpRestrict = 0
        this.jumperSpeed = 0

        this.level = 1
        this.hp = 100 + (10 * (this.level/10))
        
        this.atk = 0
        this.moveCounter = 0
        this.moveCounter2 = 0
        this.moveCounter3 = 0
        this.atkTF = false
        this.bash = 2
        this.slash = 5
        this.strike = 10 

        this.status1 = "READY"
        this.status2 = "READY"
        this.status3 = "READY"

        this.gOver = false

    }

    renderPlayer() {

        rect(540, this.y, this.w, this.h)

    }

    playerMovement(collision, i) {

        // If the key is 'd' then we increase velocity quickly by 0.45
		if (keyIsDown(68) && this.bgVeloX <= 1.5 && this.eVeloX <= 1.75 && this.bgX <= 1220) {
	
			//this.veloX += 0.8
            this.bgVeloX += (0.08 + (this.jumperSpeed))
            this.eVeloX += 0.08

        } else if (keyIsDown(68) && this.bgVeloX <= 1.5 && this.eVeloX <= 1.75 && this.bgX > 1220 && this.bgX <= 4720 ) {

            this.bgVeloX += (0.08 + (this.jumperSpeed))
            this.eVeloX += 0.08
        
            // If the key is 'a' then we decrease velocity quickly by 0.45
        } else if (keyIsDown(65) && this.bgVeloX >= -1.5 && this.eVeloX <= 0.75 && this.bgX >= 520) {
	
			//this.veloX -= 0.8
            this.bgVeloX -= (0.08 + (this.jumperSpeed))
            this.eVeloX += 0.008

        } else if (keyIsDown(65) && this.bgVeloX >= -1.5 && this.eVeloX <= 0.75 && this.bgX > 1220 && this.bgX <= 4720 ) {

            this.bgVeloX -= (0.08 + (this.jumperSpeed))
            this.eVeloX += 0.008

        }
		// Otherwise the player velocity will be slowed to 0 overtime
		else {
	
			//this.veloX *= 0.0000000000001
            this.bgVeloX *= 0.5
            this.eVeloX *= 0.1
			
		}

        enemy[i].setEnemySpeed(this.eVeloX)

        // if (keyIsDown(68) && this.bgVeloX <= 4 && this.bgX > 1220 && this.bgX <= 4720) {

        //     this.bgVeloX += 0.8

        // } else if (keyIsDown(65) && this.bgVeloX >= -4 && this.bgX > 1220 && this.bgX <= 4720 ) {

        //     this.bgVeloX -= 0.8

        // }

        if (keyIsDown(32) && this.jumpRestrict < 12) {

            this.y = this.y - 5.5

            this.jumpRestrict++

            this.jumperSpeed = 0.5

        } else {

            if (collision == false && this.y < 620 && this.veloY < 30) {

                this.veloY += 0.5
                this.y = this.y + this.veloY

            } else {

                this.jumperSpeed = 0
                this.jumpRestrict = 0

            }

            this.veloY = 0

        }

        this.x = this.x + this.veloX
        this.bgX = this.bgX + this. bgVeloX

    }

    updatePlayerUi() {

        fill(0)
        text("HP: " + str(this.hp), 20, 40)
        text("Lvl: " + str(this.level), 20, 55)

        text("Bash [j]: " + str(this.status1), 20, 70)
        text("Slash [k]: " + str(this.status2), 20, 85)
        text("Strike [l]: " + str(this.status3), 20, 100)

    }

    playerAttack(eX, eY, eW, eH, i) {

        this.atkTF = enemyCollision(eX, eY, eW, eH, this.x, this.y, this.w, this.h)

        if (keyIsDown(74) && this.moveCounter == 0) {

            if (this.atkTF == true) {

                enemy[i].takeDamage(this.bash + (this.level / 2))

                this.moveCounter = 1

            }

        } else if (keyIsDown(75) && this.moveCounter2 == 0) {

            if (this.atkTF == true) {

                enemy[i].takeDamage(this.slash + (this.level / 2))

                this.moveCounter2 = 1

            }

        } else if (keyIsDown(76) && this.moveCounter3 == 0) {

            if (this.atkTF == true) {

                enemy[i].takeDamage(this.strike + (this.level / 2))

                this.moveCounter3 = 1

            }

        } else {

            if (this.moveCounter > 0) {

                this.moveCounter++

                this.status1 = "NOT READY"

            }

            if (this.moveCounter2 > 0) {

                this.moveCounter2++

                this.status2 = "NOT READY"

            }
            
            if (this.moveCounter3 > 0) {

                this.moveCounter3++

                this.status3 = "NOT READY"

            }

            this.atkTF == false

        }

        if (this.moveCounter == 60) {

            this.moveCounter = 0

            this.status1 = "READY"

        } else if (this.moveCounter2 == 120) {

            this.moveCounter2 = 0

            this.status2 = "READY"

        } else if (this.moveCounter3 == 220) {

            this.moveCounter3 = 0

            this.status3 = "READY"

        }

    }

    takeDamage(dmg) {

        this.hp = this.hp - dmg

        if (this.hp <= 0) {

            this.gOver = true

        }


    }

    gameOver() {

        return this.gOver

    }

    addLevel() {

        this.level = this.level + 0.25

    }

    battleScene() {

        this.bgX = 540
        this.y = 10

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

    setY(pY) {

        this.y = pY

    } 

}