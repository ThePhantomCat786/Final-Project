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

	pX = 540
	pY = 0
	pW = 50
	pH = 100
	fgX = 0

	eX = 0
	eY = 0

	terrainCollide= false
	enemyTerrainCollide = false

	world = new tileMap(5120, 46, 16, 16, pX)
	world.createMap()

	player = new Player(pX, pY, pW, pH)
	enemy = new Enemy()

	gY = 0
	egY = 0

}

function draw() {


	world.drawMap(pX, pY)

	text(int(frameRate()), 20, 20)

	pX = player.getX()
	pY = player.getY()

	gY = world.findHighest(pX)

	terrainCollide = terrainCollision(player.getPx(), player.getY(), player.getW(), player.getH(), world.getGx(), gY, world.getGw(), world.getGh()) 

	player.renderPlayer()
	player.playerMovement(terrainCollide)

	eX = enemy.getX()
	eY = enemy.getY()

	egY = world.findHighest(eX)

	enemyTerrainCollilde = terrainCollision(enemy.getX(), enemy.getY(), enemy.getW(), enemy.getH(), world.getGx(), egY, world.getGw(), world.getGh()) 

	enemy.renderEnemy()
	enemy.enemyMovement(pX, pY, enemyTerrainCollide)

	// Attack checks
	enemy.enemyAttack(pX, pY, pW, pH)

}