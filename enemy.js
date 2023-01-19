class Enemy {

    constructor(x) {

        this.render = true

        this.x = x
        this.y = 0
        this.w = 50
        this.h = 50

        this.veloX = 0
        this.veloY = 0
        this.randMove = 0
        this.moveCounter = 0
        this.speedCount = 0
        this.totalEnemies = 5
        this.time = false
        this.respawnTime = 0
        this.respawnMax = 1600
        this.wave = 1
        this.addEnemy = false
        this.enemyCounter = 0

        // Stats
        this.level = int(random(1, 4))
        this.speed = 0.001
        this.hp = 10 + (10 * (this.level/10))

        // Moves
        this.attack = 0
        this.atkTF = false
        this.slice = 5 * this.level
        this.bash = 2 * this.level

    }

    renderEnemy() {

        if (this.render == true) {

            rect(this.x, this.y, this.w, this.h)

        }

    }

    enemyMovement(pX, pY, enemyTerrainCollide) {

        // console.log(dist(pX, pY, this.x, this.y))

        // console.log(pX)

        if (this.time == true) {

            this.respawnTime++

        }

        if (this.respawnTime == this.respawnMax) {

            this.wave++
            this.addEnemy = true
            this.time = false
            this.x = random(2400, 2500)
            this.hp = 10 + (10 * (this.level/10))

            player.battleScene()

            this.render = true
            this.respawnTime = 0

        }

        if (dist(pX, pY, this.x, this.y - 50) < 75 && dist(pX, pY, this.x, this.y - 50) >= 50 && this.speedCount != 1) {

            this.veloX = this.veloX * 2

            this.speedCount = 1

        } else if (dist(pX, pY, this.x, this.y - 50) < 50 && dist(pX, pY, this.x, this.y - 50) >= 25) {

            this.veloX *= 0.89

        } else if (dist(pX, pY, this.x, this.y - 50) < 25) {

            this.veloX -= 0.15

        } else {

            this.veloX += (this.speed * (this.level/2))

            if (this.x >= 2850) {

                this.enemyCounter++

            }

        }

        this.x = this.x - this.veloX

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

            this.veloX -= 0.7
            console.log("OW")

            console.log(this.attack)

            player.takeDamage(this.attack)

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

            this.render = false
            this.x = 0

            this.enemyCounter++

            player.addLevel()

        }

        if (this.enemyCounter == this.totalEnemies) {

            this.time = true
            this.respawnMax += 40

            this.totalEnemies = 0

        }



    }

    updateEnemyUi(totalEnemies) {

        if (this.render == true) {

            text("HP: " + str(this.hp), this.x, this.y - 20)
            text("WAVE " + this.wave, 600, 40)

        } else if (this.render == false && this.enemyCounter == this.totalEnemies) {

            text("TIME TO EXPLORE: " + str(this.respawnMax/60) + "s", 600, 55)

        }



    }

    enemyAdder(totalEnemies) {

        if (this.addEnemy == true && this.enemyCounter == 0) {

            return true

        }

        if (this.enemyCounter == totalEnemies) {

            this.enemyCounter = 0

        }

        this.addEnemy = false

    }

    setEnemies(te) {

        this.totalEnemies = te

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

    setY(y) {

        this.y = y

    }

}