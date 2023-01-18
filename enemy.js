class Enemy {

    constructor() {

        this.render = true

        this.x = 900
        this.y = 30
        this.w = 50
        this.h = 50

        this.veloX = 0
        this.veloY = 0
        this.randMove = 0
        this.moveCounter = 0

        // Stats
        this.level = 2
        this.speed = 0.001

        // Moves
        this.attack = 0
        this.atkTF = false
        this.slice = 5
        this.bash = 2

    }

    renderEnemy() {

        if (this.render == true) {

            rect(this.x, this.y, this.w, this.h)

        }

    }

    enemyMovement(pX, pY, enemyTerrainCollide) {

        if (dist(pX, pY, this.x, this.y) < 50) {

            this.speed = this.speed * 2

        }

        if (this.x > 0) {

            this.veloX += (this.speed * (this.level/2))
            this.x = this.x - this.veloX
            //console.log(this.x)

        } else {

            this.render = false

        }

        if (enemyTerrainCollide == false && this.y < 400) {

            this.veloY += 2.5
            this.y = this.y + this.veloY

            console.log(this.y)

        }

        this.veloY = 0

    }

    enemyAttack(pX, pY, pW, pH) {

        this.randMove = random(2)

        if (this.randMove == 0) {

            this.attack = this.slice

        } else if (this.randMove == 2) {

            this.attack = this.bash

        }

        if (this.moveCounter == 0) {

            this.atkTF = enemyCollision(pX, pY, pW, pH, this.x, this.y, this.w, this.h)

            if (this.atkTF = true) {

                //console.log("OW")

            }

        } else {

            this.moveCounter++

        }

        if (this.moveCounter == 30) {

            this.moveCounter = 0

        }

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