function terrainCollision(pX, pY, pW, pH, gX, gY, gW, gH) {

    fill(0)
    rect(pX, gY, gW, gH)

    pX = gX

    return (pX < gX + gW && pX + pW > gX && pY < gY + gH && pY + pH > gY) 

}