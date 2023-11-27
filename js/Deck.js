/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : js/Deck.js
 * FileDesc     : The class for the deck of a user
 * Author       : Weber Jamie
 * Date         : 27 November 2023
 */

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