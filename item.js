class Item {

    constructor() {

        this.x = random(540, 1820)
        this.y = -10
        this.w = 20
        this.h = 20

        this.veloX = 0
        this.veloY = 0
        this.bgVeloX = 0

        this.time = false
        this.respawnTime = 0
        this.respawnMax = 2400

        this.itemMessageMax = 0
        this.itemMessageCounter = 0

        this.render = true

        this.collection = false

        this.randItem = int(random(0, 4))

        if (this.randItem == 0) {

            this.itemName = "Chicken Nuggets"
            this.atkBoost = int(random(3, 6))
            this.itemImage = chickenNugget

        } else if (this.randItem == 1) {

            this.itemName = "Potion"
            this.heal = 10
            this.itemImage = potion

        } else if (this.randItem == 2) {

            this.itemName = "Elixr"
            this.atkBoost = int(random(2, 5))
            this.itemImage = elixr

        } else if (this.randItem == 3) {

            this.itemName = "Potion"
            this.heal = 10
            this.itemImage = potion

        } else if (this.randItem == 4) {

            this.itemName = "Soda"
            this.atkBoost = int(random(1, 3))
            this.itemImage = soda

        }


    }

    renderItem() {

        if (this.render == true) {

            image(this.itemImage, this.x, this.y, this.w, this.h)

        }

    }


    itemMovement(i, igY) {

        if (this.time == true) {

            this.respawnTime++

        }

        if (this.respawnTime == this.respawnMax) {

            this.time = false
            this.x = random(500, 1820)
            this.y = -10

            this.randItem = int(random(0, 4))

            if (this.randItem == 0) {

                this.itemName = "Chicken Nuggets"
                this.atkBoost = int(random(3, 6))
                this.itemImage = chickenNugget
    
            } else if (this.randItem == 1) {
    
                this.itemName = "Potion"
                this.heal = 10
                this.itemImage = potion
    
            } else if (this.randItem == 2) {
    
                this.itemName = "Elixr"
                this.atkBoost = int(random(2, 5))
                this.itemImage = elixr
    
            } else if (this.randItem == 3) {
    
                this.itemName = "Potion"
                this.heal = 10
                this.itemImage = potion
    
            } else if (this.randItem == 4) {
    
                this.itemName = "Soda"
                this.atkBoost = int(random(1, 3))
                this.itemImage = soda
    
            }

            this.render = true
            this.respawnTime = 0
            this.respawnMax = this.respawnMax + 40

        }

        // If the key is 'd' then we increase velocity quickly by 0.45
		if (keyIsDown(68) && this.bgVeloX <= 7.5) {

            this.bgVeloX += 0.75
            this.x = this.x - this.bgVeloX

        } else if (keyIsDown(65) && this.bgVeloX <= 7.5) {
	
            this.bgVeloX += 0.75
            this.x = this.x + this.bgVeloX

        } else {

            this.bgVeloX *= 0.1
			
		}

        if (terrainCollisionItem(item[i].getX(), item[i].getY(), item[i].getW(), item[i].getH(), world.getGx(), igY, world.getGw(), world.getGh(), i) == false && this.y < 620) {

            this.veloY = this.veloY + 0.5
            this.y = this.y + this.veloY

        } else {
            
            this.veloY = 0

        }

    }

    checkCollection(pX, pY, pW, pH) {

        this.collection = itemCollision(pX, pY, pW, pH, this.x, this.y, this.w, this.h)

        if (this.collection == true) {

            if (this.itemName == "Potion") {

                player.heal(this.heal)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            } else if (this.itemName == "Chicken Nuggets") {

                player.atkBoost(this.atkBoost)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            } else if (this.itemName == "Elixr") {

                player.atkBoost(this.atkBoost)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            } else if (this.itemName == "Soda") {

                player.atkBoost(this.atkBoost)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            }

        }

    }

    updateItemUi() {

        if (this.itemMessageCount < this.itemMessageMax) {

            textSize(14)

            if (this.itemName == "Chicken Nuggets") {

                text("PICKED UP: " + this.itemName + "!" + "  +" + this.atkBoost + " ATK for 20s!", 550, 60)
    
            } else if (this.itemName == "Elixr") {
    
                text("PICKED UP: " + this.itemName + "!" + "  +" + this.atkBoost + " ATK for 20s!", 550, 75)
    
            } else if (this.itemName == "Soda") {
    
                text("PICKED UP: " + this.itemName + "!" + "  +" + this.atkBoost + " ATK for 20s!", 550, 90)
    
            } else if (this.itemName == "Potion") {
    
                text("PICKED UP: " + this.itemName + "!" + "  +" + " 10HP!", 550, 105)
    
            }

            textSize(20)

            this.itemMessageCount++

        } else {

            this.itemMessageMax = 0
            this.itemMessageCount = 0

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