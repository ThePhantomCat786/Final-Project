// This is the class for the enemy
class Enemy {

    constructor(x) {

        // Attribute variables
        this.render = true
        this.x = x
        this.y = 0
        this.w = 50
        this.h = 50

        // Sets the initial texture
        this.enemyImage = slimeL


        // Locomotion variables
        this.veloX = 0
        this.eVeloX = 0
        this.veloY = 0

        // Move variables
        this.randMove = 0
        this.moveCounter = 0
        this.speedCount = 0
        this.totalEnemies = 5

        // Death and respawn time variables
        this.time = false
        this.respawnTime = 0
        this.respawnMax = 1600
        this.wave = 1
        this.enemyCounter = 0
        this.enemyDead = false

        // Stats
        this.levelMax = 4
        this.level = int(random(1, this.levelMax))
        this.speed = 0.02
        this.hp = 10 + (10 * (this.level/10))

        // Moves
        this.attack = 0
        this.atkTF = false
        this.slice = 5 * this.level
        this.bash = 2 * this.level

    }

    // This function renders the enemy
    renderEnemy() {

        if (this.render == true) {

            image(this.enemyImage, this.x, this.y, this.w, this.h)

        }

    }

    // This is the function for the enemies movement
    enemyMovement(pX, pY, enemyTerrainCollide) {

        // If the enemy is dead then the respawn timer will start ticking
        if (this.time == true) {

            this.respawnTime++

        }

        // After a variable amount of time the enemies will respawn 
        // Their locations and stats are reset and randomized and they are able to be rendered again
        if (this.respawnTime == this.respawnMax) {

            this.wave++
            this.levelMax++
            this.time = false
            this.x = random(2400, 2500)
            this.level = int(random(1, this.levelMax))
            this.hp = 10 + (10 * (this.level/10))

            this.render = true
            this.respawnTime = 0
            this.respawnMax = this.respawnMax + 40

        }

        // This is to stop the enemy from moving after they have died
        if (this.x < 0) {

            this.veloX = 0

        }

        // Here are the decisions for when the player is moving
        // When the player is moving we do not want the slimes to move away or beyond the player
        // This is why this decision is here
        // It is inteded to counter the players movments
        // If 'd' is pressed then the velocity will increase
        if (keyIsDown(68) && this.eVeloX <= 1.5) {

            this.eVeloX += 0.08
            this.x -= (this.eVeloX)

        // if 'a' is pressed then the veloicty will decrease
        } else if (keyIsDown(65) && this.eVeloX <= 3) {

            this.eVeloX += 0.08
            this.x += (this.eVeloX)

        // If they player presses nothing then it will return to 0 velocity
        } else {

            this.eVeloX *= 0.1

        }

        // Proximity sensor which slows down the enemy upon arriving on the player
        if (this.x <= (pX + 15)) {

            this.veloX *= 0.979

        } 
        
        // Here is where the enemy runs on their own
        // They start from the far right and run towards the player
        // Once the player is passed, the enemy will turn back around quickly
        if (this.x <= (pX - 25) && this.veloX >= -3.15 && this.x >= 0) {

            this.veloX -= 0.75
            this.enemyImage = slimeR

        } else if (this.veloX <= 3.15 && this.x >= 0) {

            this.veloX += (this.speed * (this.level/2))
            this.enemyImage = slimeL

        }

        // Move the enemy automatically
        this.x = this.x - this.veloX

        // If the enemy is dead (less than 0), then stop rendering it
        if (this.x <= 0) {

            this.render = false

        }

        // Checks if the enemy is colliding with the ground
        // If false do gravity
        if (enemyTerrainCollide == false && this.y < 620) {

            this.veloY = this.veloY + 2.5
            this.y = this.y + this.veloY

        } 
        
        // Reset the y-velocity to 0
        this.veloY = 0

    }

    // Here is the function for the enemy's attack
    enemyAttack(pX, pY, pW, pH) {

        // Randomizes the move
        this.randMove = int(random(1, 3))

        // If the move is one then it is a slice, if the move is two then it is a bash
        if (this.randMove == 1) {

            this.attack = this.slice

        } else if (this.randMove == 2) {

            this.attack = this.bash

        }

        // Checks if the enemy is actually colliding with the player or not
        this.atkTF = enemyCollision(pX, pY, pW, pH, this.x, this.y, this.w, this.h)

        // This checks if the enemy is not on cooldown and that they are colliding with the player
        if (this.moveCounter == 0 && this.atkTF == true) {

            // Sends the damage to the player
            player.takeDamage(this.attack + (this.level / 2))

            // Sets the move to cooldown
            this.moveCounter = 1

        // If the move is on cooldown then the collision is now false and the cooldown counter is now increasing
        } else {

            this.moveCounter++

            this.atkTF = false

        }

        // If a second has gone by, reset the move counter
        if (this.moveCounter == 60) {

            this.moveCounter = 0

        }

    }

    // Here is where the enemy takes damage
    // sent from the player class
    takeDamage(dmg) {

        this.hp = this.hp - dmg

        // if the enemy's hp is below 0 then it is dead
        // We set its location to -2000 to get it away from the player
        // then we make it invisible 
        if (this.hp <= 0) {

            this.render = false
            this.x = -2000

            // Counter adds to start the respawn timer for the enemy
            this.enemyCounter = this.enemyCounter + 1
            this.enemyDead = true

            // Adds level to the player
            player.addLevel()

        // If the player is not dead then say false
        } else {

            this.enemyDead = false

        }

        // If the enemy is dead then the counter will be 1
        // This decision makes the respawnTime begin its count
        if (this.enemyCounter == 1) {

            this.enemyCounter = 0
            this.time = true

        }


    }

    // Here is where the enemy's ui is updated
    // It shows the hp of the enemy and the current wave of the enemies
    updateEnemyUi() {

        if (this.render == true) {

            text("HP: " + str(this.hp), this.x, this.y - 20)
            text("WAVE " + this.wave, 600, 40)

        }

    }

    setEnemies(totalEnemy) {

        this.totalEnemies = totalEnemy

    }

    // setEnemySpeed(eVeloX) {

    //     this.eVeloX = eVeloX

    // }

    // getEnemyStatus() {

    //     if (this.enemyDead == true) {

    //         return this.enemyDead

    //     } else {

    //         return false

    //     }

    // }

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

    setY(y) {

        this.y = y

    }

}