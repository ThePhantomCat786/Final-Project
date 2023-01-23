// This is not a class
// It is the collision file where all the collision functions stay

// This is the player terrain collision function
function terrainCollision(pX, pY, pW, pH, gX, gY, gW, gH) {

    // Makes a wider standing platform
    gW = 108

    // If the player hits a dirt block on the side, the will automatically go up it
    if (gY <= (pY + 84)) {

        pY = pY - 16

        player.setY(pY)

    }

    // Checks and returns if the player is touching the ground or not
    return (pX < pX + gW && pX + pW > pX && pY < gY + gH && pY + pH > gY) 

}

// This is the enemy terrain collision function
// Same as player
function terrainCollisionEnemy(eX, eY, eW, eH, gX, gY, gW, gH, i) {

    gW = 52

    if (gY <= (eY + 50)) {

        eY = eY - 64

        enemy[i].setY(eY)

    }

    if (eX < eX + gW && eX + eW > eX && eY < gY + gH && eY + eH > gY) {

        return true

    }

}

// This is the item terrain collision function
// Same as enemy
function terrainCollisionItem(eX, eY, eW, eH, gX, gY, gW, gH, i) {

    gW = 52

    if (gY <= eY + 4) {

        eY = eY - 16

        item[i].setY(eY)

    }

    return (eX < eX + gW && eX + eW > eX && eY < gY + gH && eY + eH > gY)

}

// This function is used to check the collision between the enemy and the player
function enemyCollision(pX, pY, pW, pH, eX, eY, eW, eH) {

    if (pX < eX + eW && pX + pW > eX && pY < eY + eH && pY + pH > eY) {

        return true

    } else {

        return false

    }

}

// This function is used to check the collision between the item and the player
function itemCollision(pX, pY, pW, pH, eX, eY, eW, eH) {

    if (pX < eX + eW && pX + pW > eX && pY < eY + eH && pY + pH > eY) {

        return true

    } else {

        return false

    }

}