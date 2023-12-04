/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : js/Battle.js
 * FileDesc     : The class of the battles you fight
 * Author       : Weber Jamie
 * Date         : 27 November 2023
 */


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
        let hand = this.#hand.startTurn(this.#player.actionPoints + this.#pBoost.actBoost);
        this.#pBoost.actBoost = 0;
        return hand;
    }

    /**
     * @description Start the turn of the ennemy
     */
    startEnnemy() {
        this.#ennemy.maxAction(this.#eBoost.actBoost);
        this.#eBoost.actBoost = 0;
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
            this.#pBoost.pwrBoost = 0;
        } else {
            this.#eBoost.pwrBoost = 0;
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

    /**
     * @description Get the stats of the ennemy we can see during the fight
     * 
     * @returns The stats we can see of the ennemy
     */
    getEnnStats() {
        return {
            eName: this.#ennemy.getInfos().eName,
            health: this.#ennemy.getInfos().health,
            image: this.#ennemy.getInfos().image,
            bPwr: this.#eBoost.pwrBoost,
            bAct: this.#eBoost.actBoost,
            bDef: this.#eBoost.defBoost
        };
    }

    /**
     * @description Get the stats of the player we can see during the fight
     * 
     * @returns The stats we can see of the player
     */
    getPlayerStats() {
        return {
            pName: this.#player.getName(),
            hp: this.#player.getInfos().hp, 
            max: this.#player.getInfos().max, 
            action: this.#player.getInfos().action,
            power: this.#player.getInfos().power,
            gold: this.#player.getInfos().gold,
            bPwr: this.#pBoost.pwrBoost,
            bAct: this.#pBoost.actBoost,
            bDef: this.#pBoost.defBoost
        };
    }
}