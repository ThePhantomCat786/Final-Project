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

	enemy = []
	initX = []

	pX = 540
	pY = 0
	pW = 50
	pH = 100
	fgX = 0

	eX = 0
	eY = 0

	terrainCollide = false
	enemyTerrainCollide = false

	world = new tileMap(5120, 46, 16, 16, pX)
	world.createMap()

	player = new Player(pX, pY, pW, pH)

	totalEnemies = 5

	for (i = 0; i <= totalEnemies; i++) {

		initX[i] = random(1280, 1480)

		enemy[i] = new Enemy(initX[i])
		
	}

	gY = 0
	egY = 0
	enemyStatus = 0
	enemyCounter = 0

}

function draw() {


	world.drawMap(pX, pY)

	text(int(frameRate()), 20, 20)

	pX = player.getX()
	pY = player.getY()

	gY = world.findHighest(pX)

	terrainCollide = terrainCollision(player.getPx(), player.getY(), player.getW(), player.getH(), world.getGx(), gY, world.getGw(), world.getGh()) 

	player.renderPlayer()
	player.updatePlayerUi()
	player.playerMovement(terrainCollide)

	for (var i = 0; i <= totalEnemies; i++) {

		// if (enemy[i].getEnemyStatus() == true) {

		// 	//set the enemy counter variable please
		// 	enemyCounter = (totalEnemies/i)

		// } else {

		// 	null

		// }

		// enemy[i].setEnemies(totalEnemies, enemyCounter)

		eX = enemy[i].getX()
		eY = enemy[i].getY()
	
		egY = world.findHighestEnemy(eX, pX)
	
		enemyTerrainCollilde = terrainCollisionEnemy(enemy[i].getX(), enemy[i].getY(), enemy[i].getW(), enemy[i].getH(), world.getGx(), egY, world.getGw(), world.getGh(), i) 
	
		enemy[i].renderEnemy()
		enemy[i].updateEnemyUi()
		enemy[i].enemyMovement(player.getPx(), pY, enemyTerrainCollide)
	
		// Attack checks
		enemy[i].enemyAttack(pX, pY, pW, pH)
		player.playerAttack(eX, eY, enemy[i].getW(), enemy[i].getH(), i)

		if (enemy[i].enemyAdder(totalEnemies) == true) {

			totalEnemies = totalEnemies + 1

			enemy.push(new Enemy(random(2400, 2500)))

		}

	}

	if (player.gameOver() == true) {

		fill(0)
		rect(0, 0, 2560, 1440)

		fill(255)
		text("YOU DIED", 600, 360)

	}

}