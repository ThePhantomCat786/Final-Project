function terrainCollision(pX, pY, pW, pH, gX, gY, gW, gH) {

    gW = 48 

    // fill(255)
    // //rect(pX, gY, gW, gH)
    // fill(0)

    //console.log(gY)

    if (gY < (pY + 90)) {

        pY = pY - 16

        player.setY(pY)

    }

    return (pX < pX + gW && pX + pW > pX && pY < gY + gH && pY + pH > gY) 

}

function enemyCollision(pX, pY, pW, pH, eX, eY, eW, eH) {

    if (pX < eX + eW && pX + pW > eX && pY < eY + eH && pY + pH > eY) {

        return true

    }

}