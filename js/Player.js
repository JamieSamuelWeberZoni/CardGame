/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : js/Player.js
 * FileDesc     : The class for the player and their stats
 * Author       : Weber Jamie
 * Date         : 27 November 2023
 */

/**
 * The class for the player and their stats
 */
class Player {
    /**
     * The name of the player
     */
    #name;

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
     * @param {string} name The name of the Player and his character
     * @param {number} health The amount of health the player has at the start of a run
     * @param {number} actionPoints The number of action points the player has at the start of a run
     * @param {Deck} deck The deck the player has at the start of the run
     * @param {number} gold The amount of gold the player has at the start of a run
     * @param {number} power The power the player has at the start of a run
     */
    constructor(name, health, actionPoints, deck, gold, power) {
        this.#name = name;
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

    /**
     * @description Get the name of the player
     * 
     * @returns The name of the player and it's character
     */
    getName() {
        return this.#name;
    }

}