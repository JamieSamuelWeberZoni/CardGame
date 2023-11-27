/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : js/Ennemy.js
 * FileDesc     : The class for the ennemy you battle
 * Author       : Weber Jamie
 * Date         : 27 November 2023
 */

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
     * 
     * @param {number} boost The act boost
     */
    maxAction(boost) {
        this.#actionPoints = this.#maxAction + boost;
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
