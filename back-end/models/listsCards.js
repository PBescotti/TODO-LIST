const mongoose = require("mongoose");
const validator = require('validator')

const ListCardSchema = new mongoose.Schema({
  listID: { type: String, required: true },
  cardTitle: { type: String, require: true }
});
const ListsCards = mongoose("ListsCards", ListCardSchema)

async function getCardsFromListID(listID) {
    return await ListsCards.find({listID: listID});
}

async function createCard(data) {
    const newCard = ListsCards(data)

    try {
        const saved = await newCard.save() 
        return {success: true, card: saved}
    } catch (err) {
        return {succesS: false, error: err.message}
    }
}
