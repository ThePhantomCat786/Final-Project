// A Slimy Day
// Date: 1/24/23
// Author: Ayaz B.
// Description: A fun little game where you survive against slimes and find items to help you survive

// Function to load images
function preload() {
	
	// Menu background
	menuBg = loadImage("menuBackground.jpg")

	// Game background
	bg = loadImage("skybg.jpg")

	// Grass texture
	g = loadImage("Grass.png")
	g2 = loadImage("Grass2.png")

	// Player texture
	heroIdle = loadImage("heroIdle.png")
	heroL = loadImage("heroL.gif")
	heroR = loadImage("heroR.gif")
	jumpL = loadImage("jumpL.png")
	jumpR = loadImage("jumpR.png")
	heroAtkL = loadImage("heroAtkL.png")
	heroAtkR = loadImage("heroAtkR.png")

	// Enemy texture
	slimeL = loadImage("slimeLeft.gif")
	slimeR = loadImage("slimeRight.gif")

	// Item textures
	chickenNugget = loadImage("chickennugget.png")
	elixr = loadImage("elixr.png")
	potion = loadImage("potion.png")
	soda = loadImage("soda.png")

}

// Function to setup up the program
function setup() {

	// Create canvas
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT)

	// Create menu object
	menu = new Menu()
	playTF = false

	// Load and set fonts
	myFont = loadFont("Platinum Sign.ttf")
	myFont2 = loadFont("BOSTON CAPS.ttf")
	textFont(myFont)

	// Initialize object arrays
	enemy = []
	item = []
	initX = []

	// Initialize player location variables
	pX = 540
	pY = 10
	pW = 100
	pH = 100
	fgX = 0

	// Initialize enemy location variables
	eX = 0
	eY = 0

	// Initialize item location variables
	iX = 0

	// Set the ground collision to false
	terrainCollide = false
	enemyTerrainCollide = false
	itemTerrainCollide = false

	// Create world
	world = new tileMap(5120, 46, 16, 16)
	world.createMap()

	// Create player object
	player = new Player(pX, pY, pW, pH)

	// Create item objects
	totalItems = 10
	// Loop to create item objects
	for (i = 0; i <= totalItems; i++) {

		item[i] = new Item()
		
	}

	// Create enemy objects
	totalEnemies = 5
	// Loop to create enemy objects
	for (i = 0; i <= totalEnemies; i++) {

		initX[i] = random(1280, 1480)

		enemy[i] = new Enemy(initX[i])
		
	}

	// Initialize the grass block locations
	gY = 0
	egY = 0
	igY = 0


}

// Draw function 
function draw() {

	// When the menu is active, this if statemant is set to false
	if (playTF == false) {

		menu.renderMenu()

		playTF = menu.playButton()

	// After hitting play, the playTF variable will become true causing the game to start
	} else {

		// Change font
		textFont(myFont2)
		textSize(20)

		// Draw the map
		world.drawMap(pX, pY)

		// Display FPS
		text(int(frameRate()), 20, 20)

		// For loop for the enemies and the player
		// This is the main function of the game
		// The players and the enemies are in the same loop as many variables are required to be transfered between the two
		// Therefore, both objects need the most up to date info on the locations of each other
		for (var i = 0; i <= totalEnemies; i++) {

			// Get the player location
			pX = player.getX()
			pY = player.getY()
		
			// Find the grass block which the player is standing on 
			gY = world.findHighest(pX)
		
			// Check and see if they player is standing on the block or not
			// If they are then return true
			terrainCollide = terrainCollision(player.getPx(), player.getY(), player.getW(), player.getH(), world.getGx(), gY, world.getGw(), world.getGh()) 
		
			// Render the player
			player.renderPlayer()
			// Render the player Ui
			player.updatePlayerUi()
			// Move the player
			player.playerMovement(terrainCollide, i)

			// Get the enemy location
			eX = enemy[i].getX()
			eY = enemy[i].getY()
		
			// Get the grass block the enemy is standing on 
			egY = world.findHighestEnemy(eX, pX)
		
			// Check if the grass is colliding with the enemy
			enemyTerrainCollilde = terrainCollisionEnemy(enemy[i].getX(), enemy[i].getY(), enemy[i].getW(), enemy[i].getH(), world.getGx(), egY, world.getGw(), world.getGh(), i) 

			// Render enemy
			enemy[i].renderEnemy()
			// Update enemy ui
			enemy[i].updateEnemyUi()
			// Move enemy
			enemy[i].enemyMovement(player.getPx(), pY, enemyTerrainCollide)
		
			// Attack checks
			// Checks if the enemy attacked the user
			enemy[i].enemyAttack(player.getPx(), pY, pW, pH)
			// Checks if the player attacked the enemy
			player.playerAttack(eX, eY, enemy[i].getW(), enemy[i].getH(), i)

		}

		// This loop is for the items
		// They need a separate loop as they run seperatly from the enemies and the player
		// Also because they have 10 indicies instead of just 5 
		for (var i = 0; i <= totalItems; i++) {

			// Find the block the item is standing on 
			igY = world.findHighestItem(item[i].getX(), player.getX())

			// Render the items
			item[i].renderItem()
			// Update the item ui
			item[i].updateItemUi()
			// Move the items
			item[i].itemMovement(i, igY)

			// Check to see if the player collided with the item so that they can recieve its benefits and collect it
			item[i].checkCollection(player.getPx(), player.getY(), pW, pH)

		}

		// Checks if the player has died
		// If true, display game over
		if (player.gameOver() == true) {

			textFont(myFont)

			fill(0)
			rect(0, 0, 2560, 1440)

			fill(255)
			textSize(42)
			text("YOU DIED", 400, 370)

		}

	}

}