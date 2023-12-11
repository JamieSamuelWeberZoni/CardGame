/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : page.js
 * FileDesc     : The JS code for the pages of the applications
 * Author       : Weber Jamie
 * Date         : 20 November 2023
*/


/**
 * @description The function to write the text for the title screen
 */
function title() {
    game.innerHTML = "";
    game.className = "game";
    let title = document.createElement("h1");
        title.innerHTML = "Steampunk Card Battle";
        title.className = "centerText fontBig";
    let nameInput = document.createElement("input");
        nameInput.type = "string";
        nameInput.placeholder = "Nom";
        nameInput.className = "titleMenu centerText";
    let startBtn = document.createElement("button");
        startBtn.type = "button";
        startBtn.innerHTML = "JOUER";
        startBtn.className = "titleMenu centerText";
        startBtn.addEventListener("click", () => {
            if (nameInput.value != "") {
                charSelect(nameInput.value);
            } else {
                alert("Veuillez choisir un nom");
            }
        });
    game.append(title);
    game.append(nameInput);
    game.append(startBtn);
}

/**
 * @description The function to write the text for the character select screen
 * 
 * @param {string} namePlayer The name of the player
 */
function charSelect(namePlayer) {
    game.innerHTML = "";
    game.className = "game";
    let title = document.createElement("h1");
        title.innerHTML = "Choisissez un personnage ";
        let nameTitle = document.createElement("span");
            nameTitle.innerHTML = namePlayer;
            nameTitle.id = "nameTitle";
        title.append(nameTitle);
        title.className = "centerText fontBig";
    let list = document.createElement("ul");
        let char1 = document.createElement("li");
            let name1 = document.createElement("h2");
                name1.innerHTML = "Pablo";
            let desc1 = document.createElement("p");
                desc1.innerHTML = "Points de Vie = 50 \r\n Puissance = 10 \r\n Points d'Action = 10 \r\n Or = 30";
            char1.append(name1);
            char1.append(desc1);
            char1.addEventListener("click", () => {startGame(`${document.querySelector("#nameTitle").innerHTML} - Pablo`, 50, 10, 10, 30);});
        list.append(char1);
    game.append(title);
    game.append(list);
}

/**
 * @description The function to write the text for the game menu screen
 */
function chooseMenu() {
    game.innerHTML = "";
    game.className = "game";
    let title = document.createElement("h1");
        title.innerHTML = `
            ${player.getName()}<br/>
            Stage ${stage}`;
        title.className = "centerText fontBig";
    let subTitle = document.createElement("h3");
        subTitle.innerHTML = `
            HP : ${player.getInfos().hp}/${player.getInfos().max}<br/>
            Pwr : ${player.getInfos().power} - Act : ${player.getInfos().action} - Or : ${player.getInfos().gold}`;
        subTitle.className = "centerText";
    let playBtn = document.createElement("button");
        playBtn.type = "button";
        playBtn.innerHTML = "Combattre";
        playBtn.className = "centerText titleMenu";
        playBtn.addEventListener("click", startBattle);
    let shopBtn = document.createElement("button");
        shopBtn.type = "button";
        shopBtn.innerHTML = "Acheter";
        shopBtn.className = "centerText titleMenu";
        shopBtn.addEventListener("click", () => {});
    game.append(title);
    game.append(subTitle);
    game.append(playBtn);
    game.append(shopBtn);
}

/**
 * @description The function to write the text for the battle screen
 */
function battleScreen() {
    game.innerHTML = "";
    game.className = "game justifyBetween width100"
    let ennPart = document.createElement("div");
        ennPart.className = "game";
        let ennStat = document.createElement("h2");
            ennStat.className = "centerText";
            ennStat.innerHTML = `${battle.getEnnStats().eName} - `;
            let ennHealth = document.createElement("span");
                ennHealth.id = "ennHealth";
            ennStat.append(ennHealth);
        let ennBonus = document.createElement("ul");
            ennBonus.className = "listNoStyle justifyAround width100";
            let pwrB = document.createElement("li");
                pwrB.className = "centerText";
                pwrB.style.backgroundImage = "url('./img/PowerIcon.png')";
                pwrB.id = "ennBpwr";
            let defB = document.createElement("li");
                defB.className = "centerText";
                defB.style.backgroundImage = "url('./img/DefenseIcon.png')";
                defB.id = "ennBdef";
            let actB = document.createElement("li");
                actB.className = "centerText";
                actB.style.backgroundImage = "url('./img/ActionIcon.png')";
                actB.id = "ennBact";
            ennBonus.append(pwrB);
            ennBonus.append(defB);
            ennBonus.append(actB);
        let ennImg = document.createElement("img");
            ennImg.src = battle.getEnnStats().image;
            ennImg.alt = "goblin";
        ennPart.append(ennStat);
        ennPart.append(ennBonus);
        ennPart.append(ennImg);
    let playerPart = document.createElement("div");
        playerPart.className = "game justifyEnd width100";
        let hand = document.createElement("ul")
            hand.className = "listNoStyle justifyAround wrap width100";
            hand.id = "playerHand";
        let nextBtn = document.createElement("button");
            nextBtn.type = "button";
            nextBtn.innerHTML = "Passer";
            nextBtn.id = "nextBtn";
            nextBtn.addEventListener("click", () => {endTurn();});
        let pStats = document.createElement("ul");
            pStats.className = "listNoStyle justifyAround width100";
            let playerHealth = document.createElement("li");
                let pHP = document.createElement("span");
                    pHP.id = "playerHealth";
                let pBhp = document.createElement("span");
                    pBhp.id = "playerDef";
                    pBhp.className = "colorGreen";
                playerHealth.innerHTML = "santé: ";
                playerHealth.append(pHP);
                playerHealth.innerHTML += `/${battle.getPlayerStats().max} `;
                playerHealth.append(pBhp);
            let playerPower = document.createElement("li");
                let pBpwr = document.createElement("span");
                    pBpwr.id = "playerBPow";
                    pBpwr.className = "colorRed";
                playerPower.innerHTML = `puissance: ${battle.getPlayerStats().power}`;
                playerPower.append(pBpwr);
            let playerAction = document.createElement("li");
                let pAct = document.createElement("span");
                    pAct.id = "playerAct";
                let pBAct = document.createElement("span");
                    pBAct.id = "playerBAct";
                    pBAct.className = "colorBlue";
                playerAction.innerHTML = "Action: ";
                playerAction.append(pAct);
                playerAction.append(pBAct);
            pStats.append(playerHealth);
            pStats.append(playerPower);
            pStats.append(playerAction);
        playerPart.append(hand);
        playerPart.append(nextBtn);
        playerPart.append(pStats);
    game.append(ennPart);
    game.append(playerPart);
}

/**
 * @description The function to write the text for the game over screen
 */
function gameOverScreen() {
    game.innerHTML = "";
    game.className = "game";
    let titleH = document.createElement("h1");
        titleH.innerHTML = "Game Over";
    let subtitle = document.createElement("h2");
        subtitle.innerHTML = `Vous êtes mort au stage ${stage}`;
    let playBtn = document.createElement("button");
        playBtn.type = "button";
        playBtn.innerHTML = "REJOUER";
        playBtn.className = "titleMenu centerText";
        playBtn.addEventListener("click", title);
    game.append(titleH);
    game.append(subtitle);
    game.append(playBtn);
}