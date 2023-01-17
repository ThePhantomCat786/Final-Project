class tileMap {

    constructor(rows, cols, w, h, oldX) {
        
        this.w = w
        this.h = h
        this.rows = rows
        this.cols = cols
        this.rnd = 0
        this.options = ["g", "s", "g2"]
        this.MAP_ARRAY = []
        this.GRASS_ARRAY = []

        this.preBordersR = 0
        this.preBordersL = 0
        this.counter = 0
        this.camOffset = 0

        this.oldX = oldX
        this.gX = 0
        this.gY = 0

    }

    // createMap() {

    //     for (var i = 0; i < this.cols; i++) {

    //         this.MAP_ARRAY.push([])

    //         for (var j = 0; j < this.rows; j++) {

    //             if (i == 8) {

    //                 this.rnd = int(Math.random() * 2)

    //             } else {

    //                 this.rnd = 2

    //             }

    //             this.MAP_ARRAY[i][j] = this.options[this.rnd]

    //         }

    //     }

    // }

    createMap() {

        for (let i = 0; i < this.rows; i++) {

            let n = abs(int(noise(i/64)*16)) + 12

            let SUBWAY = [n]

            if (this.MAP_ARRAY[i] == undefined) {

                this.MAP_ARRAY[i] = []

            }

            this.MAP_ARRAY[i][n] = "g"
            this.GRASS_ARRAY.push(n)
            //console.log(n)

            for (let j = 1;  j < this.cols; j++) {

                this.MAP_ARRAY[i][n+j] = "g2"

            }
            
        }

    }


    drawMap(pX, pY) {

        this.preBordersR = pX + 640
        this.preBordersL = pX - 640

        //tint(44, 44, 44)
        image(bg, 0, 0, 1280, 720)
        //noTint()


        // if (this.oldX + pX > (this.preBordersR / 4) * 3 || this.oldX + pX < (this.preBordersR) / 4) {

        //     this.camOffset = pX*2

        // } else {

        //     this.camOffset = 0

        // }

        for (var c = Math.abs(int(pY/16)); c < (Math.abs(pY/16) + 720/16); c++) {

            for (var r = Math.abs(int((pX-640)/16)); r < (Math.abs((pX)/16) + 2560/16); r++) {

                if (this.MAP_ARRAY[r][c] == "g") {

                    image(g, this.w * r - (pX), this.h * c, this.w, this.h)

                } else if (this.MAP_ARRAY[r][c] == "g2") {

                    image(g2, this.w * r - (pX), this.h * c, this.w, this.h)

                } else if (this.MAP_ARRAY[r][c] == "s") {

                    image(s, this.w * r - (this.camOffset), this.h * c, this.w, this.h)

                } else if (this.MAP_ARRAY[r][c] == "s2") {

                    image(s2, this.w * r - (this.camOffset), this.h * c, this.w, this.h)

                }

                //this.oldX = pX

                //else if (this.oldX - this.pX < 0) {

                //     if (this.MAP_ARRAY[r][c] == "g") {

                //         image(g, this.w * r, this.h * c, this.w, this.h)
    
                //     } else if (this.MAP_ARRAY[r][c] == "g2") {
    
                //         image(g2, this.w * r, this.h * c, this.w, this.h)
    
                //     } else if (this.MAP_ARRAY[r][c] == "s") {
    
                //         image(s, this.w * r, this.h * c, this.w, this.h)
    
                //     } else if (this.MAP_ARRAY[r][c] == "s2") {
    
                //         image(s2, this.w * r, this.h * c, this.w, this.h)
    
                //     }

                //     this.oldX = pX

                // } else {

                //     if (this.MAP_ARRAY[r][c] == "g") {

                //         image(g, this.w * r + (pX - 1280), this.h * c, this.w, this.h)

                //     } else if (this.MAP_ARRAY[r][c] == "g2") {

                //         image(g2, this.w * r + (pX - 1280), this.h * c, this.w, this.h)

                //     } else if (this.MAP_ARRAY[r][c] == "s") {

                //         image(s, this.w * r + (pX - 1280), this.h * c, this.w, this.h)

                //     } else if (this.MAP_ARRAY[r][c] == "s2") {

                //         image(s2, this.w * r + (pX - 1280), this.h * c, this.w, this.h)

                //     }
                
                //}

            }
            
        }
    }

    findHighest(pX) {

        // for (var r = (int(pX/16) + 40); r < (int(pX/16) + 41); r++) {

        //     for (let i = 0; i < this.rows; i++) {

        //         if (this.MAP_ARRAY[r][this.GRASS_ARRAY[i]] == "g") {

        //             //console.log(this.w*r - pX)

        //             //return terrainCollision(this.w * r - (pX), player.getY(), player.getW(), player.getH(), world.getGx(), this.GRASS_ARRAY[i]*16, world.getGw(), world.getGh())

        //             //console.log(this.GRASS_ARRAY[i])

        //             rect(this.w * r - (pX), this.GRASS_ARRAY[i]*16, 16, 16)

        //         }

        
        //     }

        // }


        //console.log(pX)

        for (let i = 0; i <= 42; i++) {

            // if (this.MAP_ARRAY[][] == "g") {
                


            // }

            if (this.MAP_ARRAY[int(pX/16)][i] == "g") {
   
                //console.log(this.MAP_ARRAY[int(pX/16)][i])

                //if ((pX/16) % 2)
                //console.log(i)
                //console.log(i*16)
                //console.log(int(pX/16))
                let n = (i * 16)
                //console.log(n + (n%16))
                return (n - (n%16))

            }

        }

    }

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