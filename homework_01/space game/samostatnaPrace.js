let canvasWidth = 1000;
let canvasHeight = 800;

let poziceHraceX = 0;
let poziceHraceY = canvasHeight / 9 * 7;
let sirkaHrace = canvasWidth / 7;
let vyskaHrace = canvasHeight / 10;

let rychlostHrace = 5;

let poziceProjektiluHraceX = 0;
let poziceProjektiluHraceY = 100;
let sirkaProjektiluHrace = canvasWidth / 40;
let vyskaProjektiluHrace = canvasHeight / 20;
let poziceProjektiluNepriteleX = 0;
let poziceProjektiluNepriteleY = canvasHeight + 1000;

let rychlostProjektilu = 10;

let sirkaNepratele = canvasWidth / 20;
let vyskaNepratele = canvasHeight / 20;
let poziceNepratel = new Array(30);
let rychlostNepratel = 0.3;

let score = 1;

for (let i = 0; i < poziceNepratel.length; i++) {
    poziceNepratel[i] = [(i % 10) * (sirkaNepratele * 1.7),
        Math.floor(i / 10) * (vyskaNepratele * 1.7)];
}

function draw() {
    background(0);
    pohybHrace();
    pohybNepratel();
    pohybProjektiluHrace();
    kolizeProjektiluANepratel();
    vykresliProjektilHrace();
    nakresliHrace();
    vystrelProjektilHrace();
    nakresliNepratele();
    nakresliProjektilNepritele();
    pohybProjektiluNepratel();
    vystrelProjektilNepritele();
    kolizeProjektiluAHrace();
}

function nakresliHrace() {
    fill("red");
    rect(poziceHraceX, poziceHraceY, sirkaHrace, vyskaHrace);
}

function pohybHrace() {
    if (isKeyPressed("a") && poziceHraceX > 0) {
        poziceHraceX -= rychlostHrace;
    }
    
    if (isKeyPressed("d") && poziceHraceX + sirkaHrace < canvasWidth) {
        poziceHraceX += rychlostHrace;
    }
}

function vykresliProjektilHrace() {
    if (poziceProjektiluHraceY > -sirkaProjektiluHrace) {
        fill("green");
        rect(poziceProjektiluHraceX, poziceProjektiluHraceY, sirkaProjektiluHrace, vyskaProjektiluHrace);
    }
}

function pohybProjektiluHrace() {
    poziceProjektiluHraceY -= rychlostProjektilu;
}

function vystrelProjektilHrace() {
    if (isKeyPressed(" ") && poziceProjektiluHraceY < -vyskaProjektiluHrace) {
        poziceProjektiluHraceX = poziceHraceX + (sirkaHrace - sirkaProjektiluHrace) / 2;
        poziceProjektiluHraceY = poziceHraceY;
    }
}

function nakresliNepratele() {
    for (let i = 0; i < poziceNepratel.length; i++) {
        fill("purple");
        rect(poziceNepratel[i][0], poziceNepratel[i][1], sirkaNepratele, vyskaNepratele);
    }
}

function pohybNepratel() {
    let zmenaSmeru = false;
    for (let i = 0; i < poziceNepratel.length; i++) {
        poziceNepratel[i][0] += rychlostNepratel;
        
        if (poziceNepratel[i][0] < 0 || poziceNepratel[i][0] + sirkaNepratele > canvasWidth) {
            zmenaSmeru = true;
        } 
    }
    if (zmenaSmeru) {
        for (let i = 0; i < poziceNepratel.length; i++) {
            poziceNepratel[i][1] += vyskaNepratele;
            
        }
        rychlostNepratel *= -1.1;
    }
}

function kolizeObdelniku(x1, y1, s1, v1, x2, y2, s2, v2) {
    return x1 + s1 > x2 && x2 + s2 > x1 && y1 + v1 > y2 && y2 + v2 > y1;
}

function odstranNepritele(index) {
    poziceNepratel.splice(index, 1);
}

function restart() {
    poziceHraceX = 0;
    poziceHraceY = canvasHeight / 9 * 7;
    poziceProjektiluHraceX = 0;
    poziceProjektiluHraceY = -1000;
    rychlostNepratel = 0.3;
    poziceNepratel = new Array(30);
    
    for (let i = 0; i < poziceNepratel.length; i++) {
        poziceNepratel[i] = [(i % 10) * sirkaNepratele * 1.8, Math.floor(i /10) * vyskaNepratele * 1.8];
    }
}

function kolizeProjektiluANepratel() {
    for (let i = 0; i < poziceNepratel.length; i++) {  
        if (kolizeObdelniku(poziceNepratel[i][0], poziceNepratel[i][1], sirkaNepratele,vyskaNepratele,
            poziceProjektiluHraceX,poziceProjektiluHraceY, sirkaProjektiluHrace,vyskaProjektiluHrace)) {
                odstranNepritele(i);
                poziceProjektiluHraceX = 0; 
                poziceProjektiluHraceY = -1000;   
                score += 200;
                if (poziceNepratel.length == 0 ) {
                    restart();
                }
                return;
        
        }
    }
}

function nakresliProjektilNepritele() {
    if (poziceProjektiluNepriteleY >- vyskaProjektiluHrace) {
        fill("red")
        rect(poziceProjektiluNepriteleX, poziceProjektiluNepriteleY, sirkaProjektiluHrace, vyskaProjektiluHrace);
    }
}

function  pohybProjektiluNepratel() {
    if (poziceProjektiluNepriteleY < canvasHeight) {
        poziceProjektiluNepriteleY += rychlostProjektilu;
    }
}

function vystrelProjektilNepritele() {
    if (poziceProjektiluNepriteleY >= canvasHeight) {
        let index = Math.floor(random(0, poziceNepratel.length));
        poziceProjektiluNepriteleX = poziceNepratel[index][0] + sirkaNepratele / 2 - sirkaProjektiluHrace / 2;
        poziceProjektiluNepriteleY = poziceNepratel[index][1];
    }
}

function  kolizeProjektiluAHrace() {
    if (kolizeObdelniku(poziceHraceX,poziceHraceY,sirkaHrace,vyskaHrace, 
        poziceProjektiluNepriteleX,poziceProjektiluNepriteleY,sirkaProjektiluHrace,vyskaProjektiluHrace)) {
          score = 0;
          restart()
        }  
      }
