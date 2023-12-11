/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : main.js
 * FileDesc     : The JS code for the application
 * Author       : Weber Jamie
 * Date         : 20 November 2023
*/

/**
 * @type Player
 */
let player;

/**
 * @type Card[]
 */
let cards;

/**
 * @type number
 */
let stage;

/**
 * @type Battle
 */
let battle;

/**
 * @type Shop
 */
let shop;

/**
 * @type HTMLElement
 */
let game = document.querySelector("#game");

function startBattle() {
    let ennDeck = new Deck();
    ennDeck.addCard(cards[0]);
    ennDeck.addCard(cards[0]);
    ennDeck.addCard(cards[2]);
    ennDeck.addCard(cards[7]);
    let ennemy = new Ennemy("goblin", 60 + ((stage - 1) * 5), 12 + ((stage - 1) * 1), ennDeck, 8 + ((stage - 1) * 2), "./img/WIP/goblin.png");
    battle = new Battle(player, ennemy);
    battleScreen();
    updateInfos();
    startTurn();
}

function startGame(nameP, health, power, actionPoints, gold) {
    let deck = new Deck();
    for(let i = 0; i < 8; i++) {
        deck.addCard(cards[0])
    }
    for(let i = 0; i < 5; i++) {
        deck.addCard(cards[1])
    }
    deck.addCard(cards[3])
    deck.addCard(cards[4])
    deck.addCard(cards[5])
    player = new Player(nameP, health, actionPoints, deck, gold, power);
    stage = 1;
    shop = new Shop();
    chooseMenu();
}

function startTurn() {
    let result = battle.startTurn();
    if (result != "win" && result != "lost" && result != "continue") {
        let hand = document.querySelector("#playerHand");
        for (let i = 0; i < 5; i++) {
            let card = result[i];
            let HTMLcard = document.createElement("li");
                HTMLcard.className = "card";
                HTMLcard.id = `card${i}`;
                HTMLcard.style.backgroundImage = `url('${card.getImage()}')`;
                HTMLcard.addEventListener("click", () => {
                    let canUse = battle.getHand().useCard(i);
                    if (canUse == false) {return;}
                    battle.useCard(canUse);
                    updateInfos();
                    document.querySelector(`#card${i}`).remove();
                });
            hand.append(HTMLcard);
        }
        document.querySelector("#nextBtn").disabled = false;
        updateInfos();
        return;
    }
    endTurn(result);
}

function showShopItem() {
    let listItemH = document.querySelector("#listItem");
    listItemH.innerHTML = "";
    let listItem = shop.getItems();
    for (let i = 0; i < listItem.length; i++) {
        let button = document.createElement("button");
            button.type = "button";
            let item = listItem[i].getInfos();
            button.innerHTML = `${item.name} - ${item.price} GOLD`;
            button.className = "titleMenu centerText";
            button.addEventListener("click", () => {shop.useItem(i); showShopItem();});
        listItemH.append(button);
    }
}

function endTurn(result = null) {
    document.querySelector("#playerHand").innerHTML = "";
    document.querySelector("#nextBtn").disabled = true;
    result = result ?? battle.endTurn();
    if (result == "continue") {
        updateInfos();
        startTurn();
    } else if (result == "win") {
        player.boostHealth(3);
        player.gainGold(15);
        stage++;
        shop = new Shop();
        chooseMenu();
    } else if (result == "lost") {
        gameOverScreen();
    }
}

function updateInfos() {
    let ennInfo = battle.getEnnStats();
    document.querySelector("#ennHealth").innerHTML = ennInfo.health;
    document.querySelector("#ennBpwr").innerHTML = ennInfo.bPwr == 0 ? "" : ennInfo.bPwr;
    document.querySelector("#ennBdef").innerHTML = ennInfo.bDef == 0 ? "" : ennInfo.bDef;
    document.querySelector("#ennBact").innerHTML = ennInfo.bAct == 0 ? "" : ennInfo.bAct;
    let playerInfo = battle.getPlayerStats();
    document.querySelector("#playerHealth").innerHTML = playerInfo.hp;
    document.querySelector("#playerAct").innerHTML = playerInfo.action;
    document.querySelector("#playerDef").innerHTML = playerInfo.bDef == 0 ? "" : ` ${playerInfo.bDef > 0 ? "+" : ""}${playerInfo.bDef}`;
    document.querySelector("#playerBPow").innerHTML = playerInfo.bPwr == 0 ? "" : ` ${playerInfo.bPwr > 0 ? "+" : ""}${playerInfo.bPwr}`;
    document.querySelector("#playerBAct").innerHTML = playerInfo.bAct == 0 ? "" : ` ${playerInfo.bAct > 0 ? "+" : ""}${playerInfo.bAct}`;
}

function setCard() {
    cards = [];

    // Coup de couteau [0]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        let damage = user.getPower() + uBoost.pwrBoost;
        while(vBoost.defBoost > 0 && damage > 0) {
            vBoost.defBoost--;
            damage--;
        }
        victim.takeDmg(damage - vBoost.defBoost);
        if (vBoost.defBoost < 0) {
            vBoost.defBoost = 0;
        }
    }, 3, "./img/WIP/CouteauCard.png", "Coup de couteau", "Enleve des points de vies selons la puissance de l'utilisateur, son boost de puissance et la defense de la victime"));
    
    // Bandage [1]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        user.heal(Math.floor(Math.random() * 15) + 5);
    }, 2, "./img/WIP/BandageCard.png", "Bandage", "Soigne entre 5 et 20 pv"));

    // Lancé de couteaux [2]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        let power = user.getInfos().power + uBoost.pwrBoost;
        damage = power * Math.floor(Math.random() * 3);
        while(vBoost.defBoost > 0 && damage > 0) {
            vBoost.defBoost--;
            damage--;
        }
        victim.takeDmg(damage - vBoost.defBoost);
    }, 5, "./img/WIP/LanceCard.png", "Lancé de couteaux", "Fait entre zéro et deux fois les dégats de Coup de couteau"));

    // Plastron royal [3]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost += 18;
        uBoost.pwrBoost -= 3;
        uBoost.actBoost -= 3;
    }, 4, "./img/WIP/PlastronCard.png", "Plastron royal", "Augmente beaucoup la défense mais baisse les actions par tour et la puissance"));

    // Marteau en plombs [4]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost -= 8;
        uBoost.pwrBoost += 7;
        uBoost.actBoost -= 3;
    }, 4, "./img/WIP/MarteauCard.png", "Marteau en plombs", "Augmente beaucoup la puissance mais baisse les actions et la défense"));

    // Ailes biologiques [5]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost -= 8;
        uBoost.pwrBoost -= 3;
        uBoost.actBoost += 6;
    }, 4, "./img/WIP/AilesCard.png", "Ailes biologiques", "Augmente beaucoup les actions mais baisse la défense et la puissance"));

    // Couvercle en cuir [6]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost += 12;
    }, 6, "./img/WIP/CouvercleCard.png", "Couvercle en cuir", "Augmente moyennement la défense"));

    // Poing américain [7]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.pwrBoost += 4;
    }, 6, "./img/WIP/PoingCard.png", "Poing américain", "Augmente moyennement la puissance"));

    // Ailes d'aciers [8]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.actBoost += 4;
    }, 6, "./img/WIP/AcierCard.png", "Ailes d'aciers", "Augmente moyennement les actions"));

    // Gaz calmant [9]
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost = 0;
        vBoost.defBoost = 0;
        uBoost.actBoost = 0;
        vBoost.actBoost = 0;
        uBoost.pwrBoost = 0;
        vBoost.pwrBoost = 0;
    }, 2, "./img/WIP/GazCalmant.png", "Gaz calmant", "Annule tout changement de stats des deux côtés"));
}

setCard();
title();