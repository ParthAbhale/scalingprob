var mario, marioImg, mario_jump, backgroundImg, backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4, ground1, ground2, ground3, ground4, ground5, groundImg, groundImg1, groundImg2, groundImg3, groundImg4;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacleImg, obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4;
var cloud, cloudImg;
var obstacleGroup, obstacleGroup1, obstacleGroup2, obstacleGroup3, obstacleGroup4, cloudGroup, coinsGroup;

var coin, coinImg;
var sun, sunImg;
var restart, restartImg;
var gameOver, gameOverImg;

var score = 0;
var coins = 0;

var back;

var PLAY = 0;
var jumpSound, dieSound, checkpoint;
var END = 4;

var gameState = PLAY




function preload() {
    backgroundImg = loadImage("Images/download (1).jfif")
    marioImg = loadAnimation("Images/mario1.png", "Images/mario2.png", "Images/mario3.png", "Images/mario4.png", "Images/mario5.png", "Images/mario6.png")
    groundImg = loadImage("Images/ground.jfif")
    obstacleImg = loadImage("Images/rObstacle.png")
    cloudImg = loadImage("Images/rCloud.png")
    coinImg = loadImage("Images/rCoin.png")
    sunImg = loadImage("Images/rSun.png")
    restartImg = loadImage("Images/icon.png")
    gameOverImg = loadImage("Images/download.png")
    backgroundImg1 = loadImage("Images/images.jfif")
    backgroundImg2 = loadImage("Images/background2.jfif")
    backgroundImg3 = loadImage("Images/images (1).jfif")
    backgroundImg4 = loadImage("Images/images (2).jfif")
    groundImg1 = loadImage("Images/ground5.jfif")
    groundImg2 = loadImage("Images/groun.jfif")
    groundImg3 = loadImage("Images/ground2.jfif")
    groundImg4 = loadImage("Images/ground4.jfif")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkpoint = loadSound("checkPoint.mp3")
    mario_jump = loadAnimation("Images/mario3.png")
    obstacleImg1 = loadImage("Images/rSnake.png")
    obstacleImg2 = loadImage("Images/rGhost.png")
    obstacleImg3 = loadImage("Images/rLion.png")
    obstacleImg4 = loadImage("Images/rDragon.png")
}


function setup() {

    createCanvas(900, 700)
    mario = createSprite(100, 450, 10, 10)
    mario.addAnimation("running", marioImg)
    mario.scale = 0.4;
    mario.debug = false
    mario.setCollider("rectangle", 0, 0, 200, 200)

    ground1 = createSprite(700, 610)
    ground1.scale = 4.3
    ground2 = createSprite(700, 610)
    ground1.scale = 4.3
    ground3 = createSprite(700, 610)
    ground1.scale = 4.3
    ground4 = createSprite(700, 610)
    ground1.scale = 4.3
    ground5 = createSprite(700, 610)

    sun = createSprite(width - 50, 40)
    sun.addImage(sunImg);
    sun.scale = 0.4




    obstacleGroup = createGroup();
    obstacleGroup1 = createGroup();
    obstacleGroup2 = createGroup();
    obstacleGroup3 = createGroup();
    obstacleGroup4 = createGroup();
    cloudGroup = createGroup();
    coinsGroup = createGroup();


}

function draw() {





    if (gameState === PLAY) {



        spawnObstacle();
        spawClouds();
        spawCoins();

        if (score < 0) {
            background(backgroundImg)
            mario.collide(ground1)
            ground1.visible = true
            ground2.visible = false;
            ground3.visible = false;
            ground4.visible = false;
            ground5.visible = false;
        } else if (score < 1000) {
            background(backgroundImg1)
            mario.collide(ground2)
            ground2.velocityX = -5
            ground1.visible = false
            ground2.visible = true;
            ground3.visible = false;
            ground4.visible = false;
            ground5.visible = false;

            ground2.addImage(groundImg1)
            if (ground2.x < 300) {
                ground2.x = 450
            }
            // ground.scale = 5.5
        } else if (score < 2000) {
            background(backgroundImg2)
            mario.collide(ground3)
            ground3.velocityX = -5
            ground1.visible = false
            ground2.visible = false;
            ground3.visible = true;
            ground4.visible = false;
            ground5.visible = false;

            ground3.addImage(groundImg2)
            if (ground3.x < 300) {
                ground3.x = 450
            }
        } else if (score < 3000) {
            background(backgroundImg3)
            mario.collide(ground4)
            ground4.velocityX = -5
            ground1.visible = false
            ground2.visible = false;
            ground3.visible = false;
            ground4.visible = true;
            ground5.visible = false;

            ground4.addImage(groundImg3)
            if (ground4.x < 300) {
                ground4.x = 450
            }
        } else if (score < 4000) {
            background(backgroundImg4)
            mario.collide(ground5)
            ground5.velocityX = -5
            ground1.visible = false
            ground2.visible = false;
            ground3.visible = false;
            ground4.visible = false;
            ground5.visible = false;

            ground5.addImage(groundImg4)
            if (ground5.x < 300) {
                ground5.x = 450
            }
        }

        if (mario.isTouching(coinsGroup)) {
            coinsGroup.destroyEach();
            console.log("parth")
        }



        gameOver = createSprite(width / 2, height / 2);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 4;
        gameOver.visible = false;

        restart = createSprite(width / 2, height / 2 + 150)
        restart.addImage(restartImg)
        restart.scale = 0.2;
        restart.visible = false;


        if (keyDown("space") && mario.y > 440) {
            mario.velocityY = -20
            mario.changeAnimation("jumping", mario_jump)
            jumpSound.play();
        }

        if (coinsGroup.isTouching(mario)) {
            console.log("Parth")
            coinsGroup.destroyEach();
            coins = coins + 1
        }


        mario.velocityY = mario.velocityY + 0.8
        mario.collide(ground1)


        ground1.velocityX = -5

        if (ground1.x < 300) {
            ground1.x = 450
        }


        score = score + 0.1

        if (score > 1000) {
            spawnObstacle1();
            coinsGroup.destroyEach();
            cloudGroup.destroyEach();
            obstacleGroup.destroyEach();
            if (obstacleGroup1.isTouching(mario)) {
                console.log("Parth")
                dieSound.play();
                gameState = END;
            }

        } else if (score > 2000) {
            spawnObstacle2();
            coinsGroup.destroyEach();
            cloudGroup.destroyEach();
            obstacleGroup1.destroyEach();
            if (obstacleGroup2.isTouching(mario)) {
                dieSound.play();
                gameState = END;
            }

        } else if (score > 3000) {
            spawnObstacle3();
            coinsGroup.destroyEach();
            cloudGroup.destroyEach();
            obstacleGroup2.destroyEach();
            if (obstacleGroup2.isTouching(mario)) {
                dieSound.play();
                gameState = END;
            }

        } else if (score > 4000) {
            spawnObstacle4();
            coinsGroup.destroyEach();
            cloudGroup.destroyEach();
            obstacleGroup3.destroyEach();
            if (obstacleGroup3.isTouching(mario)) {
                dieSound.play();
                gameState = END;
            }

        }



        if (obstacleGroup.isTouching(mario)) {
            dieSound.play();
            gameState = END;
        }


    } else if (gameState === END) {




        sun.visible = false;

        mario.velocityY = 0
        ground.velocityX = 0
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);

        obstacleGroup.setLifetimeEach(-1)
        cloudGroup.setLifetimeEach(-1)
        coinsGroup.setLifetimeEach(-1)



        // background(gameOverImg)

        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)) {
            reset();
        }

    }





    drawSprites();
    textSize(30)
    fill("yellow")

    text("SURVIVAL: " + Math.round(score), 50, 50);
    text("COINS: " + coins, 50, 100);

}


function spawnObstacle() {
    if (frameCount % 100 === 0) {
        obstacle = createSprite(900, 450)
        obstacle.addImage(obstacleImg)
        obstacle.scale = 0.4
        obstacle.velocityX = -5
        obstacle.lifeTime = 180
        obstacle.debug = false
        obstacleGroup.add(obstacle)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 200, 200)
    }
}
function spawnObstacle1() {
    if (frameCount % 100 === 0) {
        obstacle1 = createSprite(900, 470)
        obstacle1.addImage(obstacleImg1)
        obstacle1.scale = 0.4
        obstacle1.velocityX = -5
        obstacle1.lifeTime = 180
        obstacle1.debug = false
        obstacleGroup1.add(obstacle1)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 200, 200)
    }
}
function spawnObstacle2() {
    if (frameCount % 100 === 0) {
        obstacle2 = createSprite(900, 470)
        obstacle2.addImage(obstacleImg2)
        obstacle2.scale = 0.4
        obstacle2.velocityX = -5
        obstacle2.lifeTime = 180
        obstacle2.debug = false
        obstacleGroup2.add(obstacle2)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 200, 200)
    }
}
function spawnObstacle3() {
    if (frameCount % 100 === 0) {
        obstacle3 = createSprite(900, 470)
        obstacle3.addImage(obstacleImg3)
        obstacle3.scale = 0.4
        obstacle3.velocityX = -5
        obstacle3.lifeTime = 180
        obstacle3.debug = false
        obstacleGroup3.add(obstacle3)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 200, 200)
    }
}
function spawnObstacle4() {
    if (frameCount % 100 === 0) {
        obstacle4 = createSprite(900, 470)
        obstacle4.addImage(obstacleImg4)
        obstacle4.scale = 0.4
        obstacle4.velocityX = -5
        obstacle4.lifeTime = 180
        obstacle4.debug = false
        obstacleGroup3.add(obstacle4)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 200, 200)
    }
}


function spawClouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(900, random(30, 200))
        cloud.addImage(cloudImg)
        cloud.scale = 0.4
        cloud.velocityX = -5
        cloud.lifeTime = 180
        cloudGroup.add(cloud)
    }
}

function spawCoins() {
    if (frameCount % 60 === 0) {
        coin = createSprite(900, random(430, 470))
        coin.addImage(coinImg)
        coin.scale = 0.2
        coin.velocityX = -5
        coin.lifeTime = 180
        coinsGroup.add(cloud)
    }
}

function reset() {
    gameState = PLAY;
    score = 0;
    coins = 0;
    ground.addImage(groundImg)
    coinsGroup.destroyEach();
    cloudGroup.destroyEach();
    obstacleGroup.destroyEach();
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    obstacleGroup4.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
}