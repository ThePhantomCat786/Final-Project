// This class is for when the game begins and the menu shows up
class Menu {

    // constructor sets variables
    constructor() {

        this.x = 0
        this.y = 0

    }

    // Renders the menu
    renderMenu() {

        image(menuBg, 0, 0, 1280, 720)

        textSize(28)
        text("A SLIMY DAY", 390, 175)
        textSize(12)

    }

    // Renders the "play" button and checks if it has been clicked
    playButton() {
        

        if (mouseX >= 560 && mouseX <= 660 && mouseY >= 550 && mouseY <= 650) {

            fill(12, 12, 12)
            rect(560, 550, 100, 50)
    
            fill(110, 110, 110)
            rect(565, 555, 90, 40)
    
            fill(0)
            text("PLAY", 570, 580)

		} else {

            fill(12, 12, 12)
            rect(560, 550, 100, 50)
    
            fill(190, 190, 190)
            rect(565, 555, 90, 40)
    
            fill(0)
            text("PLAY", 570, 580)

        }

        if (mouseIsPressed == true && mouseX >= 560 && mouseX <= 660 && mouseY >= 550 && mouseY <= 650) {

			return true

		} else {

            return false

        }



    }

}