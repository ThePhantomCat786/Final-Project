class tileMap {

    constructor(rows, cols, w, h, oldX) {
        
        this.w = w
        this.h = h
        this.rows = rows
        this.cols = cols
        this.rnd = 0
        this.options = ["g", "s", "g2"]
        this.MAP_ARRAY = []

        this.preBordersR = 0
        this.preBordersL = 0
        this.counter = 0

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

            let n = abs(int(noise(i/32)*16)) + 12

            let SUBWAY = [n]

            if (this.MAP_ARRAY[i] == undefined) {

                this.MAP_ARRAY[i] = []

            }

            this.MAP_ARRAY[i][n] = "g"

            for (let j = 1;  j < this.cols; j++) {

                this.MAP_ARRAY[i][n+j] = "g2"

            }
            
        }

    }


    drawMap(pX, pY) {

        this.preBordersR = pX + 720
        this.preBordersL = pX - 720

        //tint(44, 44, 44)
        image(bg, 0, 0, 1280, 720)
        //noTint()


        if (pX > 0 && pX < 5120) {

            for (var c = Math.abs(int(pY/16)); c < (Math.abs(pY/16) + 720/16); c++) {

                for (var r = Math.abs(int((pX-640)/16)); r < (Math.abs((pX)/16) + 2560/16); r++) {

                    if (this.MAP_ARRAY[r][c] == "g") {

                        image(g, this.w * r - (pX), this.h * c, this.w, this.h)

                    } else if (this.MAP_ARRAY[r][c] == "g2") {

                        image(g2, this.w * r - (pX), this.h * c, this.w, this.h)

                    } else if (this.MAP_ARRAY[r][c] == "s") {

                        image(s, this.w * r - (pX), this.h * c, this.w, this.h)

                    } else if (this.MAP_ARRAY[r][c] == "s2") {

                        image(s2, this.w * r - (pX), this.h * c, this.w, this.h)

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
    }

    findHighest(pX) {

        for (var i = 0; i <= 42; i++) {

            if (this.MAP_ARRAY[int(pX/16)][i] == "g") {

                let n = i * 16
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