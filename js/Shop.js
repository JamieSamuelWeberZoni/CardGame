/**
 * Project      : Jeu de Cartes
 * Description  : Battle game with cards in the style of Slay the Spire
 * File         : Shpè.js
 * FileDesc     : The JS code for the class for the shop
 * Author       : Weber Jamie
 * Date         : 11 December 2023
*/

class Shop {
    #items;

    constructor() {
        this.#items = [];
        let items = [
            new ShopItem("bonus vie", () => {player.boostHealth(5);}, 12),
            new ShopItem("bonus pouvoir", () => {player.boostPower(2);}, 15),
            new ShopItem("bonus action", () => {player.boostAction(3);}, 18),
            new ShopItem("bonus complet", () => {player.boostHealth(3); player.boostPower(1); player.boostAction(2);}, 30),
            new ShopItem("carte coup de couteau", () => {player.getDeck().addCard(cards[0]);}, 8),
            new ShopItem("carte bandage", () => {player.getDeck().addCard(cards[1]);}, 8),
            new ShopItem("carte lancé de couteaux", () => {player.getDeck().addCard(cards[2]);}, 12),
            new ShopItem("carte plastron royal", () => {player.getDeck().addCard(cards[3]);}, 10),
            new ShopItem("carte marteau en plombs", () => {player.getDeck().addCard(cards[4]);}, 10),
            new ShopItem("carte ailes biologiques", () => {player.getDeck().addCard(cards[5]);}, 10),
            new ShopItem("carte couvercle en cuir", () => {player.getDeck().addCard(cards[6]);}, 24),
            new ShopItem("carte poing américain", () => {player.getDeck().addCard(cards[7]);}, 24),
            new ShopItem("carte ailes d'aciers", () => {player.getDeck().addCard(cards[8]);}, 26),
            new ShopItem("carte gaz calmant", () => {player.getDeck().addCard(cards[9]);}, 18),
        ];
        for (let i = 0; i < 5; i++)
        {
            this.#items.push(items[Math.floor(Math.random() * items.length)]);
        }
    }

    getItems() {
        return this.#items;
    }

    useItem(id) {
        if (this.#items[id].buy()){
            this.#items.splice(id, 1);
        }
    }
}

class ShopItem {
    #price;
    #item;
    #name;

    constructor(name, item, price) {
        this.#price = price;
        this.#item = item;
        this.#name = name;
    }

    buy() {
        if (player.getInfos().gold < this.#price) {
            return false;
        }
        player.useGold(this.#price);
        this.#item();
        return true;
    }

    getInfos() {
        return {price: this.#price, name: this.#name};
    }
}