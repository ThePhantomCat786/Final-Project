class Enemy {

    constructor(x) {

        this.render = true

        this.x = x
        this.y = 0
        this.w = 50
        this.h = 50

        this.enemyImage = slimeL

        this.veloX = 0
        this.eVeloX = 0
        this.veloY = 0
        this.randMove = 0
        this.moveCounter = 0
        this.speedCount = 0
        this.totalEnemies = 5
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

    renderEnemy() {

        if (this.render == true) {

            image(this.enemyImage, this.x, this.y, this.w, this.h)

        }

    }

    enemyMovement(pX, pY, enemyTerrainCollide) {

        if (this.time == true) {

            this.respawnTime++

        }

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

        if (this.x < 0) {

            this.veloX = 0

        }

        if (keyIsDown(68) && this.eVeloX <= 1.5) {

            this.eVeloX += 0.08
            this.x -= (this.eVeloX)
            console.log(this.eVeloX)

        } else if (keyIsDown(65) && this.eVeloX <= 3) {

            this.eVeloX += 0.08
            this.x += (this.eVeloX)
            console.log(this.eVeloX)

        } else {

            this.eVeloX *= 0.1

        }

        if (this.x <= (pX + 15)) {

            this.veloX *= 0.989

        } 
        
        if (this.x <= (pX - 25) && this.veloX >= -2 && this.x >= 0) {

            this.veloX -= 0.75
            this.enemyImage = slimeR

        } else if (this.veloX <= 2 && this.x >= 0) {

            this.veloX += (this.speed * (this.level/2))
            this.enemyImage = slimeL

        }

        this.veloX += (this.speed * (this.level/2))
        this.x = this.x - this.veloX

        if (this.x == 2850) {

            this.enemyCounter++

        }

        if (this.x <= 0) {

            this.render = false

        }

        if (enemyTerrainCollide == false && this.y < 620) {

            this.veloY = this.veloY + 2.5
            this.y = this.y + this.veloY

        } 
        
        this.veloY = 0

    }

    enemyAttack(pX, pY, pW, pH) {

        this.randMove = int(random(1, 3))

        if (this.randMove == 1) {

            this.attack = this.slice

        } else if (this.randMove == 2) {

            this.attack = this.bash

        }

        this.atkTF = enemyCollision(pX, pY, pW, pH, this.x, this.y, this.w, this.h)

        if (this.moveCounter == 0 && this.atkTF == true) {

            //this.veloX -= 0.7

            player.takeDamage(this.attack + (this.level / 2))

            this.moveCounter = 1

        } else {

            this.moveCounter++

            this.atkTF = false

        }

        if (this.moveCounter == 60) {

            this.moveCounter = 0

        }

    }

    takeDamage(dmg) {

        this.hp = this.hp - dmg

        if (this.hp <= 0) {

            //this.render = false
            this.x = -2000

            this.enemyCounter = this.enemyCounter + 1
            this.enemyDead = true

            player.addLevel()

        } else {

            this.enemyDead = false

        }

        if (this.enemyCounter == 1) {

            this.enemyCounter = 0
            this.time = true

        }


    }

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