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
let cards;
let stage;
let game = document.querySelector("#game");

/**
 * @description The function to write the text for the title screen
 */
function title() {
    game.innerHTML = "";
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

function chooseMenu() {
    game.innerHTML = "";
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
    game.append(title);
    game.append(subTitle);
}

function startGame(nameP, health, power, actionPoints, gold) {
    let deck = new Deck();
    for(let i = 0; i < 8; i++) {
        deck.addCard(cards[0])
    }
    for(let i = 0; i < 5; i++) {
        deck.addCard(cards[1])
    }
    for(let i = 0; i < 3; i++) {
        deck.addCard(cards[2])
    }
    deck.addCard(cards[3])
    deck.addCard(cards[4])
    deck.addCard(cards[5])
    deck.addCard(cards[6])
    deck.addCard(cards[7])
    deck.addCard(cards[8])
    for(let i = 0; i < 3; i++) {
        deck.addCard(cards[9])
    }
    player = new Player(nameP, health, actionPoints, deck, gold, power);
    stage = 1;
    chooseMenu();
}

function setCard() {
    cards = [];

    // Coup de couteau
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        let damage = user.getInfos.power + uBoost.pwrBoost;
        while(vBoost.defBoost > 0 && damage > 0) {
            vBoost.defBoost--;
            damage--;
        }
        victim.takeDmg(damage - vBoost.defBoost);
    }, 3, "", "Coup de couteau", "Enleve des points de vies selons la puissance de l'utilisateur, son boost de puissance et la defense de la victime"));
    
    // Bandage
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        user.heal(Math.floor(Math.random * 15) + 5);
    }, 2, "", "Bandage", "Soigne entre 5 et 20 pv"));

    // Lancé de couteaux
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        let power = user.getInfos.power + uBoost.pwrBoost;
        damage = power * Math.floor(Math.random() * 3);
        while(vBoost.defBoost > 0 && damage > 0) {
            vBoost.defBoost--;
            damage--;
        }
        victim.takeDmg(damage - vBoost.defBoost);
    }, 5, "", "Lancé de couteaux", "Fait entre zéro et deux fois les dégats de Coup de couteau"));

    // Plastron royal
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost += 18;
        uBoost.pwrBoost -= 3;
        uBoost.actBoost -= 3;
    }, 4, "", "Plastron royal", "Augmente beaucoup la défense mais baisse les actions par tour et la puissance"));

    // Marteau en plombs
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost -= 8;
        uBoost.pwrBoost += 7;
        uBoost.actBoost -= 3;
    }, 4, "", "Marteau en plombs", "Augmente beaucoup la puissance mais baisse les actions et la défense"));

    // Ailes biologiques
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost -= 8;
        uBoost.pwrBoost -= 3;
        uBoost.actBoost += 6;
    }, 4, "", "Ailes biologiques", "Augmente beaucoup les actions mais baisse la défense et la puissance"));

    // Couvercle en cuir
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost += 12;
    }, 6, "", "Couvercle en cuir", "Augmente moyennement la défense"));

    // Poing américain
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.pwrBoost += 5;
    }, 6, "", "Poing américain", "Augmente moyennement la puissance"));

    // Ailes d'aciers
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.actBoost += 4;
    }, 6, "", "Ailes d'aciers", "Augmente moyennement les actions"));

    // Gaz calmant
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost = 0;
        vBoost.defBoost = 0;
        uBoost.actBoost = 0;
        vBoost.actBoost = 0;
        uBoost.pwrBoost = 0;
        vBoost.pwrBoost = 0;
    }, 2, "", "Gaz calmant", "Annule tout changement de stats des deux côtés"));
}

setCard();
title();