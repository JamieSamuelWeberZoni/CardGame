/**
 * Project      : Jeu de carte
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : main.js
 * FileDesc     : The JS code for the application
 * Author       : Weber Jamie
 * Date         : 20 November 2023
*/

let player;
let cards;
let game = document.querySelector("#game");
function title() {
    game.innerHTML = "";
    let title = document.createElement("h1");
        title.innerHTML = "Steampunk Card Battle";
    let startBtn = document.createElement("button");
        startBtn.type = "button";
        startBtn.innerHTML = "JOUER";
        startBtn.addEventListener("click", charSelect);
    game.append(title);
    game.append(startBtn);
}

function charSelect() {
    game.innerHTML = "";
    let title = document.createElement("h1");
        title.innerHTML = "Choisissez un personnage";
    let list = document.createElement("ul");
        let char1 = document.createElement("li");
            let name = document.createElement("h2");
                name.innerHTML = "Pablo";
            let desc = document.createElement("p");
                desc.innerHTML = "Points de Vie = 50 \r\n Puissance = 10 \r\n Points d'Action = 10 \r\n Or = 30";
            char1.append(name);
            char1.append(desc);
            char1.addEventListener("click", () => {startGame(50, 10, 10, 30);});
        list.append(char1);
    game.append(title);
    game.append(list);
}

function startGame(health, power, actionPoints, gold) {
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
    for(let i = 0; i < 1; i++) {
        deck.addCard(cards[3])
    }
    for(let i = 0; i < 1; i++) {
        deck.addCard(cards[4])
    }
    for(let i = 0; i < 1; i++) {
        deck.addCard(cards[5])
    }
    for(let i = 0; i < 1; i++) {
        deck.addCard(cards[6])
    }
    for(let i = 0; i < 1; i++) {
        deck.addCard(cards[7])
    }
    for(let i = 0; i < 1; i++) {
        deck.addCard(cards[8])
    }
    for(let i = 0; i < 3; i++) {
        deck.addCard(cards[9])
    }
    player = new Player(health, actionPoints, deck, gold, power);
}

function setCard() {
    cards = [];
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        let damage = user.getInfos.power + uBoost.pwrBoost;
        while(vBoost.defBoost > 0 && damage > 0) {
            vBoost.defBoost--;
            damage--;
        }
        victim.takeDmg(damage - vBoost.defBoost);
    }, 3, "", "Coup de couteau", "Enleve des points de vies selons la puissance de l'utilisateur, son boost de puissance et la defense de la victime"));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        user.heal(Math.floor(Math.random * 10) + 5);
    }, 2, "", "bandage", "soigne entre 5 et 15 pv"));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        let power = user.getInfos.power + uBoost.pwrBoost;
        damage = power * Math.floor(Math.random() * 3);
        while(vBoost.defBoost > 0 && damage > 0) {
            vBoost.defBoost--;
            damage--;
        }
        victim.takeDmg(damage - vBoost.defBoost);
    }, 5, "", "tire de couteau", "fait entre zéro et deux fois les dégats de coup de couteau"));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost += 21;
        uBoost.pwrBoost -= 3;
        uBoost.actBoost -= 3;
    }, 4, "", "plastron royal", ""));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost -= 8;
        uBoost.pwrBoost += 7;
        uBoost.actBoost -= 3;
    }, 4, "", "marteau en plombs", ""));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost -= 8;
        uBoost.pwrBoost -= 3;
        uBoost.actBoost += 6;
    }, 4, "", "ailes biologiques", ""));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost += 16;
    }, 6, "", "couvercle en cuir", ""));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.pwrBoost += 5;
    }, 6, "", "poing américain", ""));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.actBoost += 4;
    }, 6, "", "ailes d'aciers", ""));
    cards.push(new Card((user, victim, uBoost, vBoost) => {
        uBoost.defBoost = 0;
        vBoost.defBoost = 0;
        uBoost.actBoost = 0;
        vBoost.actBoost = 0;
        uBoost.pwrBoost = 0;
        vBoost.pwrBoost = 0;
    }, 2, ""));
}

/**
 * The class for the cards you / the ennemy can use during a battle
 */
class Card {
    /**
     * The function to use when the card is used
     */
    #func;

    /**
     * The cost of the card in action points
     */
    #cost;

    /**
     * The image of the card
     */
    #image;

    /**
     * The name of the card
     */
    #name

    /**
     * The description of the card
     */
    #desc

    /**
     * @description The constructor of the class  
     *              Set the function and cost of a card
     * 
     * @param {Function} func The function to do when using the card
     * @param {number} cost The cost of the card
     * @param {string} image The image of the card
     */
    constructor(func, cost, image, name, desc) {
        this.#func = func;
        this.#cost = cost;
        this.#image = image;
        this.#name = name;
        this.#desc = desc;
    }

    /**
     * @description Verify if the user has enough action point and if yes use the card
     * 
     * @param {number} actionPoints The number of action points the user has
     * 
     * @returns **The function** to execute and **the cost** if the user has enough action point  
     *          **false** if the user doesn't have enough action points
     */
    useCard(actionPoints)
    {
        if (actionPoints < this.#cost) {
            return false;
        }
        return {func : this.#func, cost : this.#cost};
    }

    getImage() {
        return this.#image;
    }

    getCost() {
        return this.#cost;
    }
}

/**
 * The class for the deck of a user
 */
class Deck {
    /**
     * The cards of the array
     */
    #cards;

    /**
     * @description The constructor of the class  
     *              Set #cards as an array
     */
    constructor() {
        this.#cards = [];
    }

    /**
     * @description Add a card to the deck
     * 
     * @param {Card} card The card to add
     */
    addCard(card) {
        this.#cards.push(card);
    }

    /**
     * @description Returns the array of cards
     * 
     * @returns The cards in the deck
     */
    getCards()
    {
        return this.#cards;
    }
}

/**
 * The class for the player and they're stats
 */
class Player {
    /**
     * The maximum health the player can have
     */
    #maxHealth;

    /**
     * The player's current health
     */
    #health;

    /**
     * The number of action points the player has during a turn
     */
    #actionPoints;

    /**
     * The deck of the player
     */
    #deck;

    /**
     * The amount of gold the player has
     */
    #gold;

    /**
     * The power of the player
     */
    #power;

    /**
     * @description The constructor of the class  
     *              Set all the stats of the player at the start of a run
     * 
     * @param {number} health The amount of health the player has at the start of a run
     * @param {number} actionPoints The number of action points the player has at the start of a run
     * @param {Deck} deck The deck the player has at the start of the run
     * @param {number} gold The amount of gold the player has at the start of a run
     * @param {number} power The power the player has at the start of a run
     */
    constructor(health, actionPoints, deck, gold, power) {
        this.#health = health;
        this.#maxHealth = health;
        this.#actionPoints = actionPoints;
        this.#deck = deck;
        this.#gold = gold;
        this.#power = power;
    }

    /**
     * @description Take health from the player
     * 
     * @param {number} dmg The amount of damage taken
     */
    takeDmg(dmg) {
        if (dmg > 0) {
            this.#health -= dmg;
        }
    }

    /**
     * @description Give health to the player up to the maximum
     * 
     * @param {number} health The amount of health to heal
     */
    heal(health) {
        this.#health += health;
        if (this.#health > this.#maxHealth) {
            this.#health = this.#maxHealth;
        }
    }

    /**
     * @description Boost the health stat
     * 
     * @param {number} boost The amount to boost
     */
    boostHealth(boost) {
        this.#maxHealth += boost;
    }

    /**
     * @description Boost the action stat
     * 
     * @param {number} boost The amount to boost
     */
    boostAction(boost) {
        this.#actionPoints += boost;
    }

    /**
     * @description Boost the power stat
     * 
     * @param {number} boost The amount to boost
     */
    boostPower(boost) {
        this.#power += boost;
    }

    /**
     * @description Add gold to the current amount
     * 
     * @param {number} gold The amount of gold to add
     */
    gainGold(gold) {
        this.#gold += gold;
    }

    /**
     * @description Remove gold to the current amount
     * 
     * @param {number} gold The amount of gold to use
     */
    useGold(gold) {
        this.#gold -= gold;
    }

    /**
     * @description Add a card to the deck
     * 
     * @param {Card} card The card to add
     */
    addCard(card) {
        this.#deck.addCard(card);
    }

    /**
     * @description Get some infos to show to the player
     * 
     * @returns The infos of the player
     */
    getInfos() {
        return {
            hp: this.#health, 
            max: this.#maxHealth, 
            action: this.#actionPoints,
            power: this.#power,
            gold: this.#gold
        };
    }

    /**
     * @description Get the deck of the player
     * 
     * @returns The deck of the player
     */
    getDeck() {
        return this.#deck;
    }


}

/**
 * The class for the ennemy you battle
 */
class Ennemy {
    /**
     * The name of the ennemy
     */
    #name;

    /**
     * The health of the ennemy
     */
    #health;

    /**
     * The maximum action points the ennemy can use
     */
    #maxAction;

    /**
     * The number of action points the ennemy currently has
     */
    #actionPoints;

    /**
     * The deck of the ennemy
     */
    #deck;

    /**
     * The power of the ennemy
     */
    #power;

    /**
     * The image of the ennemy
     */
    #image;

    /**
     * @description The constructor of the class  
     *              Sets everything for the ennemy
     * 
     * @param {string} name The name of the ennemy
     * @param {number} health The health of the ennemy at the start of the fight
     * @param {number} actionPoints The maximum amount of action points
     * @param {Deck} deck The deck of the ennemy
     * @param {number} power The power of the ennemy
     * @param {string} image The image of the ennemy
     */
    constructor(name, health, actionPoints, deck, power, image) {
        this.#name = name;
        this.#health = health;
        this.#maxAction = actionPoints;
        this.#actionPoints = actionPoints;
        this.#deck = deck;
        this.#power = power;
        this.#image = image;
    }

    /**
     * @description Lose the given amount of health
     * 
     * @param {number} dmg The amount of damage taken
     */
    takeDmg(dmg) {
        if (dmg > 0) {
            this.#health -= dmg;
        }
    }

    /**
     * @description Set the action points to it's maximum
     */
    maxAction() {
        this.#actionPoints = this.#maxAction;
    }

    /**
     * @description Lose some action points
     * 
     * @param {number} amount The amount of action points lost
     */
    loseAction(amount) {
        this.#actionPoints -= amount;
    }

    /**
     * @description Uses a card if the ennemy can
     * 
     * @returns **The function** to execute and **the cost** if the user has enough action point  
     *          **false** if the user doesn't have enough action points
     */
    useCard() {
        let cards = this.#deck.getCards().filter((item) => {
            let cost = item.getCost();
            return this.#actionPoints <= cost;
        });
        if (cards.length === 0) {
            return false;
        }
        return cards[Math.floor(Math.random() * cards.length)].useCard(this.#actionPoints);
    }

    /**
     * @description Get the power of the ennemy
     * 
     * @returns The power of the ennemy
     */
    getPower() {
        return this.#power;
    }

    /**
     * @description Get some infos of the ennemy
     * 
     * @returns Some infos of the ennemy
     */
    getInfos() {
        return {name: this.#name, health: this.#health, image: this.#image};
    }
}

class Boost {
    defBoost;
    pwrBoost;
    actBoost;

    constructor() {
        this.defBoost = 0;
        this.pwrBoost = 0;
        this.actBoost = 0;
    }
}

/**
 * The class for the hand of the player during a battle
 */
class Hand {
    /**
     * The pile in which the hand draws cards
     */
    #pile;

    /**
     * The hand the player can use during their turns
     */
    #hand;

    /**
     * The pile of card discarded after being used/discarded
     */
    #discard;

    /**
     * The number of action points the player has left
     */
    #actionPoints;

    /**
     * @description The constructor of the class  
     *              Set the pile of cards to the player's deck
     * 
     * @param {Player} player The player that plays the game
     */
    constructor(player) {
        this.#pile = player.getDeck().getCards();
        this.#discard = [];
        this.#hand = [];
    }

    /**
     * @description Start the turn for the player  
     *              Get 5 or less cards from the pile and put them in the hand
     * 
     * @param {number} action The amount of action points that the player can use during this turn
     * 
     * @returns the hand of the player
     */
    startTurn(action)
    {
        this.#actionPoints = action;
        this.#hand = [];
        let i = 0;
        while(i < 5 || this.#pile.length != 0) {
            let idCard = Math.floor(Math.random() * this.#pile.length);
            this.#hand.push(this.#pile.splice(idCard, 1)[0]);
            i++;
        }
        return this.#hand;
    }

    /**
     * @description Try to use a given card
     * 
     * @param {number} number The number of the card in the hand
     * 
     * @returns **A function** to execute if the card is used  
     *          **false** if we can't use the card
     */
    useCard(number) {
        let cardAction = this.#hand[number].useCard(this.#actionPoints);
        if (cardAction === false) {
            return;
        }
        this.#actionPoints -= cardAction.cost;
        this.#discard.push(this.#hand.splice(number, 1)[0]);
        return cardAction.func;
    }

    /**
     * The function to call when the player ends their turns  
     * Discard all cards in the hand  
     * If the pile is empty, put all the cards of the discard pile are put inside the pile
     */
    endTurn() {
        while(this.#hand !== 0) {
            this.#discard.push(this.#hand.pop());
        }
        if (this.#pile.length == 0) {
            this.#pile = this.#discard.splice(0, this.#discard.length);
        }
    }

    getHand() {
        return this.#hand;
    }
}

/**
 * The class of the battles you fight
 */
class Battle {
    /**
     * The player
     */
    #player;

    /**
     * The ennemy you fight
     */
    #ennemy;

    /**
     * The temp boosts of the player
     */
    #pBoost;

    /**
     * The temp boost of the ennemy
     */
    #eBoost;

    /**
     * The hand you have during the fight
     */
    #hand;

    /**
     * Whether it is the player's turn or not
     */
    #playerTurn;

    /**
     * @description The constructor of the class  
     *              Sets the infos and objects needed for a fight
     * 
     * @param {Player} player The player
     * @param {Ennemy} ennemy The ennemy you fight
     */
    constructor(player, ennemy) {
        this.#player = player;
        this.#ennemy = ennemy;
        this.#hand = new Hand(this.#player);
        this.#playerTurn = true;
        this.#pBoost = new Boost();
        this.#eBoost = new Boost();
    }

    /**
     * @description Start the current turn
     */
    startTurn() {
        if (this.#playerTurn) {
            startPlayer();
        } else {
            startEnnemy();
        }
    }

    /**
     * @description Start the turn of the player
     * 
     * @returns The hand of the player
     */
    startPlayer() {
        let hand = this.#hand.startTurn(this.#player.actionPoints);
        return hand;
    }

    /**
     * @description Start the turn of the ennemy
     */
    startEnnemy() {
        this.#ennemy.maxAction();
        while(true) {
            let canPlay = this.#ennemy.useCard();
            if (canPlay !== false)
            {
                this.#ennemy.loseAction(canPlay.cost)
                this.useCard(canPlay.func);
                continue;
            }
            break;
        }
        this.endTurn();
    }

    /**
     * @description Execute the function of a card
     * 
     * @param {Function} func The function to execute
     */
    useCard(func) {
        let player = this.#player;
        let ennemy = this.#ennemy;
        let pBoost = this.#pBoost;
        let eBoost = this.#eBoost;
        if (this.#playerTurn) {
            func(player, ennemy, pBoost, eBoost);
        } else {
            func(ennemy, player, eBoost, pBoost);
        }
    }

    /**
     * @description End the turn and check if the battle has ended
     * 
     * @returns Whether we lost, we won, or we need to continue
     */
    endTurn() {
        if (this.#playerTurn) {
            this.#hand.endTurn();
        }
        this.#playerTurn = !this.#playerTurn;
        if (this.#player.getInfos.hp <= 0) {
            return "lost";
        } else if (this.#ennemy.getHealth <= 0) {
            return "win";
        } else {
            return "continue";
        }
    }
}

setCard();
title();