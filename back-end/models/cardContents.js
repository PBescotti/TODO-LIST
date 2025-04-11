const mongoose = require("mongoose");
const validator = require('validator')

const CardContentschema = new mongoose.Schema({
  cardID: { type: String, required: true },
  type: { type: 'text' | 'image', require: true },
  text: {type: String},
  img: {type: String}
});
const CardsContents = mongoose("CardsContents", CardContentschema)

async function getListsFromEmail(email) {
    if (!email || !validator.isEmail(email)) return {}
    return await CardsContents.find({ownerEmail: email});
}

async function getListFromCardID(cardID) {
    return await CardsContents.find({cardID: cardID})
}

async function createCardContent(data) {
    if (data.type == 'text' && !data.text) return {success: false, error: "NO_TEXT_IN_TEXT_CONTENT"}
    if (data.type == 'img' && !data.img) return {success: false, error: "NO_IMG_IN_IMG_CONTENT"}

    const newCardContent = CardsContents(data)

    try {
        const saved = await newCardContent.save() 
        return {success: true, cardContent: saved}
    } catch (err) {
        return {success: false, error: err.message}
    }
}
