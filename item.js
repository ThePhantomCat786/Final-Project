// Here is the class for the randomized items
class Item {

    constructor() {

        // Location variables
        this.x = random(540, 1820)
        this.y = -10
        this.w = 20
        this.h = 20

        // Locomotion variables
        this.veloX = 0
        this.veloY = 0
        this.bgVeloX = 0

        // Timer variables
        this.time = false
        this.respawnTime = 0
        this.respawnMax = 2400

        // Text variables
        this.itemMessageMax = 0
        this.itemMessageCounter = 0

        // Render truth
        this.render = true

        // Initialize collection
        this.collection = false

        // Sets the random item
        this.randItem = int(random(0, 4))

        // Here is the decisions for the random items
        // If it is a 0 then it is a chicken nugget
        // If it is a 1 then it is a potion
        // If it is a 2 then it is a Elixir
        // If it is a 3 then it is another potion
        // If it is a 4 then it is a soda
        if (this.randItem == 0) {

            // Boots attack
            this.itemName = "Chicken Nuggets"
            this.atkBoost = int(random(3, 6))
            this.itemImage = chickenNugget

        } else if (this.randItem == 1) {

            // Heals 10hp
            this.itemName = "Potion"
            this.heal = 10
            this.itemImage = potion

        } else if (this.randItem == 2) {

            // Boosts attack
            this.itemName = "Elixr"
            this.atkBoost = int(random(2, 5))
            this.itemImage = elixr

        } else if (this.randItem == 3) {

            // Heals 10hp
            this.itemName = "Potion"
            this.heal = 10
            this.itemImage = potion

        } else if (this.randItem == 4) {

            // Boosts attack
            this.itemName = "Soda"
            this.atkBoost = int(random(1, 3))
            this.itemImage = soda

        }


    }

    // Function for rendering the item
    renderItem() {

        if (this.render == true) {

            image(this.itemImage, this.x, this.y, this.w, this.h)

        }

    }


    // Function for item locomotion
    itemMovement(i, igY) {

        // Here just like the enemy we have a timer after collection to respawn the item
        if (this.time == true) {

            this.respawnTime++

        }

        // If timer hits max then
        if (this.respawnTime == this.respawnMax) {

            // Set randomized locations
            this.time = false
            this.x = random(500, 1820)
            this.y = -10

            // Randomize the items again
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

            // renders again and resets timer as well as turns it off
            this.render = true
            this.respawnTime = 0
            this.respawnMax = this.respawnMax + 40

        }

        // Here is the movement
        // Just like with the enemy the item needs to counteract the force of the player
        // However unlike the enemy this is all it needs to do as it just sits on the ground
        // If the player hits 'd' increase velocity going left
		if (keyIsDown(68) && this.bgVeloX <= 7.5) {

            this.bgVeloX += 0.75
            this.x = this.x - this.bgVeloX

        // If the player hits 'a' increase velocity going right
        } else if (keyIsDown(65) && this.bgVeloX <= 7.5) {
	
            this.bgVeloX += 0.75
            this.x = this.x + this.bgVeloX

        // Otherwise stop
        } else {

            this.bgVeloX *= 0.1
			
		}

        // Here is where we check if the item is touching the ground
        if (terrainCollisionItem(item[i].getX(), item[i].getY(), item[i].getW(), item[i].getH(), world.getGx(), igY, world.getGw(), world.getGh(), i) == false && this.y < 620) {

            // If not on ground, do gravity
            this.veloY = this.veloY + 0.5
            this.y = this.y + this.veloY

        // otherwise do not
        } else {
            
            this.veloY = 0

        }

    }

    // Here is the function to check if the player picked up an item
    checkCollection(pX, pY, pW, pH) {

        // First checks collision with the player 
        this.collection = itemCollision(pX, pY, pW, pH, this.x, this.y, this.w, this.h)

        // If collision is true then we can now check what item it was
        if (this.collection == true) {

            // If potion, then the player heals 10 hp
            // This item then dissappears
            if (this.itemName == "Potion") {

                player.heal(this.heal)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            // If chicken nugget, then the player gets an attack buff for a duration of time
            // This item then dissappears
            } else if (this.itemName == "Chicken Nuggets") {

                player.atkBoost(this.atkBoost)
                this.render = false
                this.x = -2000
                this.time = true

                // Sets duration for message to be up
                this.itemMessageMax = 300

            // If it is an Elixr, then the player gets an attack buff but for less time than the nugget
            // This item then dissappears
            } else if (this.itemName == "Elixr") {

                player.atkBoost(this.atkBoost)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            // Soda is same as Elixr but less time
            // This item then dissappears
            } else if (this.itemName == "Soda") {

                player.atkBoost(this.atkBoost)
                this.render = false
                this.x = -2000
                this.time = true

                this.itemMessageMax = 300

            }

        }

    }

    // Here is the function for updating the item ui
    updateItemUi() {

        // If the player picks up an item, a message will display for the duration of itemMessageMax
        if (this.itemMessageCount < this.itemMessageMax) {

            textSize(14)

            // Displays chicken nugget buff
            if (this.itemName == "Chicken Nuggets") {

                text("PICKED UP: " + this.itemName + "!" + "  +" + this.atkBoost + " ATK for 20s!", 550, 60)

            // Displays chicken elixr buff
            } else if (this.itemName == "Elixr") {
    
                text("PICKED UP: " + this.itemName + "!" + "  +" + this.atkBoost + " ATK for 20s!", 550, 75)
    
            // Displays soda buff
            } else if (this.itemName == "Soda") {
    
                text("PICKED UP: " + this.itemName + "!" + "  +" + this.atkBoost + " ATK for 20s!", 550, 90)
    
            // Displays heal
            } else if (this.itemName == "Potion") {
    
                text("PICKED UP: " + this.itemName + "!" + "  +" + " 10HP!", 550, 105)
    
            }

            textSize(20)

            // Increments the time
            this.itemMessageCount++

        } else {

            // Otherwise reset the variables as there is not current message
            this.itemMessageMax = 0
            this.itemMessageCount = 0

        }

    }

    // Getters and setters
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