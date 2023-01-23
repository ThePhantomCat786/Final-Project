function preload() {

	bg = loadImage("pixelSky.png")

	g = loadImage("Grass1.png")
	g2 = loadImage("Grass2.png")

	slimeL = loadImage("slimeLeft.gif")
	slimeR = loadImage("slimeRight.gif")

	chickenNugget = loadImage("chickennugget.png")
	elixr = loadImage("elixr.png")
	potion = loadImage("potion.png")
	soda = loadImage("soda.png")

}

function setup() {

	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT)

	//mainMenu = new menu()

	enemy = []
	item = []
	initX = []

	pX = 540
	pY = 10
	pW = 50
	pH = 100
	fgX = 0

	eX = 0
	eY = 0

	iX = 0
	iVeloX = 0
	igY = 0

	terrainCollide = false
	enemyTerrainCollide = false
	itemTerrainCollide = false

	world = new tileMap(5120, 46, 16, 16, pX)
	world.createMap()

	player = new Player(pX, pY, pW, pH)

	totalItems = 10

	for (i = 0; i <= totalItems; i++) {

		item[i] = new Item()
		
	}

	totalEnemies = 5

	for (i = 0; i <= totalEnemies; i++) {

		initX[i] = random(1280, 1480)

		enemy[i] = new Enemy(initX[i])
		
	}

	gY = 0
	egY = 0
	enemyCounter = 0


}

function draw() {


	world.drawMap(pX, pY)

	text(int(frameRate()), 20, 20)

	for (var i = 0; i <= totalEnemies; i++) {

		pX = player.getX()
		pY = player.getY()
	
		gY = world.findHighest(pX)
	
		terrainCollide = terrainCollision(player.getPx(), player.getY(), player.getW(), player.getH(), world.getGx(), gY, world.getGw(), world.getGh()) 
	
		player.renderPlayer()
		player.updatePlayerUi()
		player.playerMovement(terrainCollide, i)
	

		//enemy[i].setEnemies(totalEnemies)

		eX = enemy[i].getX()
		eY = enemy[i].getY()
	
		egY = world.findHighestEnemy(eX, pX)
	
		enemyTerrainCollilde = terrainCollisionEnemy(enemy[i].getX(), enemy[i].getY(), enemy[i].getW(), enemy[i].getH(), world.getGx(), egY, world.getGw(), world.getGh(), i) 

		enemy[i].renderEnemy()
		enemy[i].updateEnemyUi()
		enemy[i].enemyMovement(player.getPx(), pY, enemyTerrainCollide)
	
		// Attack checks
		enemy[i].enemyAttack(player.getPx(), pY, pW, pH)
		player.playerAttack(eX, eY, enemy[i].getW(), enemy[i].getH(), i)

	}

	for (var i = 0; i <= totalItems; i++) {

		//iX = item[i].getX()

		igY = world.findHighestItem(item[i].getX(), player.getX())

		itemTerrainCollilde = terrainCollisionItem(item[i].getX(), item[i].getY(), item[i].getW(), item[i].getH(), world.getGx(), igY, world.getGw(), world.getGh(), i) 

		item[i].renderItem()
		item[i].updateItemUi()
		iVeloX = player.getBgVeloX()
		item[i].itemMovement(itemTerrainCollide, iVeloX)

		item[i].checkCollection(player.getPx(), player.getY(), pW, pH)

	}

	if (player.gameOver() == true) {

		fill(0)
		rect(0, 0, 2560, 1440)

		fill(255)
		text("YOU DIED", 600, 360)

	}

}