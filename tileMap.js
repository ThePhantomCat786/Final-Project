// This is the class that sets up the tile map for the world
class tileMap {

    // Constructor sets variables
    constructor(rows, cols, w, h) {
        
        // Map attributes
        this.w = w
        this.h = h
        this.rows = rows
        this.cols = cols

        // Arrays for map and grass
        this.MAP_ARRAY = []
        this.GRASS_ARRAY = []

        // Initialize the render position
        this.renderPos = 0

        // Location variables for grass
        this.gX = 0
        this.gY = 0

    }

    // This function creates the map
    createMap() {

        // First we make a loop and set it up to the amount of rows
        for (let i = 0; i < this.rows; i++) {

            // Using Perlin noise to generate the terrain!
            let n = abs(int(noise(i/64)*16)) + 12

            // If there is no sub-array in the current spot add one
            if (this.MAP_ARRAY[i] == undefined) {

                this.MAP_ARRAY[i] = []

            }

            // Set the top part of the map to grass
            this.MAP_ARRAY[i][n] = "g"
            // Set the grass array up for grass layer
            this.GRASS_ARRAY.push(n)

            // Fill in rest with dirt
            for (let j = 1;  j < this.cols; j++) {

                this.MAP_ARRAY[i][n+j] = "g2"

            }
            
        }

    }


    // This function draws the map
    drawMap(pX, pY) {

        // Sets the background
        image(bg, 0, 0, 1280, 720)

        // This loop is where the map is drawn
        // The map has to be drawn at the location of the user
        // Then we make it to where there is a 1280 wide window of space where we can see 
        // Everything else renders off screen
        // The problem with this is lag, therefore if we move where the images are rendered and they render with our movement it is way less laggy
        // This is because what you see is what you get: no blocks rendered outside the viewing window
        for (var c = Math.abs(int(pY/16)); c < (Math.abs(pY/16) + 720/16); c++) {

            for (var r = Math.abs(int((pX-540)/16)); r < (Math.abs((pX)/16) + 2560/16); r++) {

                // Rendering for grass
                if (this.MAP_ARRAY[r][c] == "g") {

                    this.renderPos = this.w * r - (pX)

                    this.renderPos += 0.8

                    image(g, this.renderPos, this.h * c, this.w, this.h)

                // Rendering for dirt
                } else if (this.MAP_ARRAY[r][c] == "g2") {

                    this.renderPos = this.w * r - (pX)

                    this.renderPos += 0.8

                    image(g2, this.renderPos, this.h * c, this.w, this.h)

                }

            }
        }
    }

    // This is the first of three "findHighest" functions
    // This goes through the array of grass blocks
    // Based off where the player is located, it will return the location of that grass block
    findHighest(pX) {

        // This loops throught the array
        // This loop is designed for the exact location of the player as it does px/16 and adds the 540 shift from the start
        for (var r = (int(pX/16) + 34); r < (int(pX/16) + 35); r++) {

            // Loops thru grass blocks
            for (let i = 0; i < this.rows; i++) {

                if (this.MAP_ARRAY[r][this.GRASS_ARRAY[i]] == "g") {

                    // Sets n to the grass block location
                    // We multiply by 16 as the blocks are 16 pixels wide
                    let n = (this.GRASS_ARRAY[i] * 16)

                    return(n - (n%16))

                }

        
            }

        }

    }

    // This is the second find highest and it is for the enemy
    // It is the exact same concept as the first one
    findHighestEnemy(eX, pX) {

        // We use the enemies location PLUS the players location (which is technically the background location)
        for (var r = (int((eX/16) + (pX/16))); r > 0; r--) {

            for (let i = 0; i < this.rows; i++) {

                if (this.MAP_ARRAY[r][this.GRASS_ARRAY[i]] == "g") {

                    let n = (this.GRASS_ARRAY[i] * 16)

                    return(n - (n%16))

                }

        
            }

        }

    }

    // Final find highest and its for the items
    // exact same as previous
    findHighestItem(eX, pX) {

        for (var r = (int((eX/16) + (pX/16))); r > 0; r--) {

            for (let i = 0; i < this.rows; i++) {

                if (this.MAP_ARRAY[r][this.GRASS_ARRAY[i]] == "g") {

                    let n = (this.GRASS_ARRAY[i] * 16)

                    return(n - (n%16))

                }

        
            }

        }

    }

    // Getters and setters below
    getGx() {

        return this.gX

    }

    getGy() {

        return this.gY

    }

    getGw() {

        return this.w

    }

    getGh() {

        return this.h

    }

}