function terrainCollision(pX, pY, pW, pH, gX, gY, gW, gH) {

    fill(255)
    rect(pX, gY, gW, gH)
    fill(0)

    //console.log(gY)

    return (pX < pX + gW && pX + pW > pX && pY < gY + gH && pY + pH > gY) 

}