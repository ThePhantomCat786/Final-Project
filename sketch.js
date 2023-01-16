function preload() {

	bg = loadImage("pixelSky.png")

	g = loadImage("Grass1.png")
	g2 = loadImage("Grass2.png")

	s = loadImage("Snow1.png")
	s2 = loadImage("Snow2.png")

}

function setup() {

	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT)

	//mainMenu = new menu()

	pX = 640
	pY = -120
	fgX = 0
	collision = false

	world = new tileMap(5120, 46, 16, 16, pX)
	world.createMap()

	player = new Player(pX, pY)

	gY = 0

}

function draw() {


	world.drawMap(pX, pY)

	text(int(frameRate()), 20, 20)

	pX = player.getX()
	pY = player.getY()

	gY = world.findHighest(pX)

	collision = terrainCollision(pX, pY, player.getW(), player.getH(), world.getGx(), gY, world.getGw(), world.getGh()) 

	player.renderPlayer()
	player.playerMovement(collision)

}