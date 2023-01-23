// This class is for the player
class Player {

    constructor(x, y, w, h) {

        // Set the players location variables
        this.x = x
        this.bgX = x
        this.y = y
        this.w = w
        this.h = h

        // Speed variables
        this.veloX = 0
        this.veloY = 0
        this.bgVeloX = 0
        
        // Jump variables
        this.jumpRestrict = 0
        this.jumperSpeed = 0

        // Stats
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

        // Move status
        this.status1 = "READY"
        this.status2 = "READY"
        this.status3 = "READY"

        // Game over status
        this.gOver = false

        // Time duration for boosted items
        this.itemBoostTimer = 0
        this.itemBoostMax = 1200

    }

    // This function renders the player
    // As you can see the player does not move at all
    renderPlayer() {

        rect(540, this.y, this.w, this.h)

    }

    // Here in the player movement class we see that it is the background moving instead of the player
    // This is done to keep the player dead center in the screen
    playerMovement(collision, i) {

        // If the key is 'd' then the velocity will increase
		if (keyIsDown(68) && this.bgVeloX <= 1.5 && this.bgX <= 1220) {
	
            this.bgVeloX += (0.08 + (this.jumperSpeed))

        } else if (keyIsDown(68) && this.bgVeloX <= 1.5 && this.bgX > 1220 && this.bgX <= 4720 ) {

            this.bgVeloX += (0.08 + (this.jumperSpeed))
        
        // If the key is 'a' then the velocity will decrease
        } else if (keyIsDown(65) && this.bgVeloX >= -1.5 && this.bgX >= 520) {
	
            this.bgVeloX -= (0.08 + (this.jumperSpeed))

        } else if (keyIsDown(65) && this.bgVeloX >= -1.5 && this.bgX > 1220 && this.bgX <= 4720 ) {

            this.bgVeloX -= (0.08 + (this.jumperSpeed))

        
		// Otherwise the player velocity will be slowed to 0 overtime
		} else {
	
            this.bgVeloX *= 0.5
			
		}

        // If the player presses space, they will jump
        if (keyIsDown(32) && this.jumpRestrict < 12) {

            this.y = this.y - 5.5

            this.jumpRestrict++

            this.jumperSpeed = 0.5

        } else {

            // This is the decision that decides whether the player stops on the ground or not
            if (collision == false && this.y < 620 && this.veloY < 30) {

                this.veloY += 0.5
                this.y = this.y + this.veloY

            } else {

                this.jumperSpeed = 0
                this.jumpRestrict = 0

            }

            this.veloY = 0

        }

        // Increment the background x location
        this.bgX = this.bgX + this.bgVeloX

    }

    // This class is for the player ui
    // It provides the user with all the needed info like health, level, and moves
    updatePlayerUi() {

        fill(0)
        text("HP: " + str(this.hp), 20, 40)
        text("Lvl: " + str(this.level), 20, 60)

        text("Bash [j]: " + str(this.status1), 20, 80)
        text("Slash [k]: " + str(this.status2), 20, 100)
        text("Strike [l]: " + str(this.status3), 20, 120)

    }

    // Here is the player attack class where attacks are registered
    playerAttack(eX, eY, eW, eH, i) {

        // This checks whether or not the player is actually colliding with an enemy or not
        // If not, they cannot attack
        this.atkTF = enemyCollision(eX, eY, eW, eH, this.x, this.y, this.w, this.h)

        // If the player is attacking with 'j', 'k', or 'l'
        if (keyIsDown(74) && this.moveCounter == 0) {

            if (this.atkTF == true) {

                // Here the damage gets sent to the enemy and the damage is depending on the move
                enemy[i].takeDamage(this.bash + (this.level / 2))

                this.moveCounter = 1

            }

        } else if (keyIsDown(75) && this.moveCounter2 == 0) {

            if (this.atkTF == true) {

                // Here the damage gets sent to the enemy and the damage is depending on the move               
                enemy[i].takeDamage(this.slash + (this.level / 2))

                this.moveCounter2 = 1

            }

        } else if (keyIsDown(76) && this.moveCounter3 == 0) {

            if (this.atkTF == true) {

                // Here the damage gets sent to the enemy and the damage is depending on the move
                enemy[i].takeDamage(this.strike + (this.level / 2))

                this.moveCounter3 = 1

            }

        // Here in this else statement we want to check our cooldowns for our moves
        // If the player has attacked in 1 second for the bash move, 2 second for the slash move, and 4 seconds for the strike, then the moves will be on cooldown
        // This means you must wait for the move to be ready again to use it
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

        // Here is where the moves are checked if they are ready to be used again
        if (this.moveCounter == 60) {

            this.moveCounter = 0

            this.status1 = "READY"

        } else if (this.moveCounter2 == 120) {

            this.moveCounter2 = 0

            this.status2 = "READY"

        } else if (this.moveCounter3 == 240) {

            this.moveCounter3 = 0

            this.status3 = "READY"

        }

    }

    // Here is where the player takes damage
    takeDamage(dmg) {

        this.hp = this.hp - dmg

        // If their health is lower than 0 then game over is returned as true
        if (this.hp <= 0) {

            this.gOver = true

        }


    }

    // This is the fucntion for the hp boost if collected
    heal(hpBoost) {

        // Adds 10 hp if the player is not at max
        if (this.hp < 100 + (10 * (this.level/10))) {

            this.hp = this.hp + hpBoost

        }

    }

    // This is the function for the attack boost if collected
    atkBoost(atk) {

        // For a duration, the attack of the slash and strike moves will be boosted
        for(let i = 0; i < this.itemBoostMax; i++) {

            this.slash = this.slash + atk
            this.strike = this.strike + atk

        }

    }

    // If the player dies then the game over will be returned
    gameOver() {

        return this.gOver

    }

    // This function adds level
    addLevel() {

        this.level = this.level + 0.25

    }

    // Getters and setters
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

    getBgVeloX() {

        return this.bgVeloX

    }

    setY(pY) {

        this.y = pY

    } 

}