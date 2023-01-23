function terrainCollision(pX, pY, pW, pH, gX, gY, gW, gH) {

    gW = 52

    // fill(255)
    // //rect(pX, gY, gW, gH)
    // fill(0)

    if (gY <= (pY + 90)) {

        pY = pY - 16

        player.setY(pY)

    }

    return (pX < pX + gW && pX + pW > pX && pY < gY + gH && pY + pH > gY) 

}

function terrainCollisionEnemy(eX, eY, eW, eH, gX, gY, gW, gH, i) {

    gW = 52

    // fill(255)
    // rect(eX, gY, gW, gH)
    // fill(0)

    if (gY <= (eY + 50)) {

        eY = eY - 64

        enemy[i].setY(eY)

    }

    if (eX < eX + gW && eX + eW > eX && eY < gY + gH && eY + eH > gY) {

        return true

    }

}

function terrainCollisionItem(eX, eY, eW, eH, gX, gY, gW, gH, i) {

    gW = 52

    // fill(255)
    // rect(eX, gY, gW, gH)
    // fill(0)

    if (gY <= (eY + 20)) {

        eY = eY - 16

        item[i].setY(eY)

    }

    if (eX < eX + gW && eX + eW > eX && eY < gY + gH && eY + eH > gY) {

        return true

    }

}

function enemyCollision(pX, pY, pW, pH, eX, eY, eW, eH) {

    if (pX < eX + eW && pX + pW > eX && pY < eY + eH && pY + pH > eY) {

        return true

    } else {

        return false

    }

}

function itemCollision(pX, pY, pW, pH, eX, eY, eW, eH) {

    if (pX < eX + eW && pX + pW > eX && pY < eY + eH && pY + pH > eY) {

        return true

    } else {

        return false

    }

}