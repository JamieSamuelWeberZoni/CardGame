/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : js/Hand.js
 * FileDesc     : The class for the hand of the player during a battle
 * Author       : Weber Jamie
 * Date         : 27 November 2023
 */

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