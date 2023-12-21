/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : js/Card.js
 * FileDesc     : The class for the cards you / the ennemy can use during a battle
 * Author       : Weber Jamie
 * Date         : 27 November 2023
 */

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