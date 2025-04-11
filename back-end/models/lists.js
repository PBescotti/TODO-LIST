const mongoose = require("mongoose");
const validator = require("validator");

const ListSchema = new mongoose.Schema({
  ownerEmail: { type: String, required: true },
  name: { type: String, require: true },
  categories: { type: Array }
});
const Lists = mongoose.model("Lists", ListSchema);

async function getAllLists() {
  return await Lists.find()
}

async function getListsFromEmail(email) {
  if (!email || !validator.isEmail(email)) return {};
  return await Lists.find({ ownerEmail: email });
}

async function getListFromID(id) {
  return await Lists.findById(id);
}

// DATA contains ownerMail, name
async function createList(data) {
  console.log(data)
  const newList = Lists(data);

  try {
    const saved = await newList.save();
    return { success: true, list: saved };
  } catch (err) {
    return { succesS: false, error: err.message };
  }
}

async function addCategory(listID, categoryTitle) {
  const list = await Lists.findById(listID);
  let categories = list.categories;
  categories.push(categoryTitle);

  try {
    const updated = await Lists.update_one(
      { _id: listID },
      { $set: categories }
    );
    return { success: true, list: updated };
  } catch (err) {
    return { succesS: false, error: err.message };
  }
}

async function moveCategory(listID, fromPosition, toPosition) {
  const list = await Lists.findById(listID);
  let categories = list.categories;
  if (fromPosition > toPosition)
    for (let i = fromPosition; i > toPosition; i--) {
      const temp = categories[i];
      categories[i] = categories[i - 1];
      categories[i - 1] = temp;
    }
  else
    for (let i = fromPosition; i < toPosition; i++) {
      const temp = categories[i];
      categories[i] = categories[i + 1];
      categories[i + 1] = temp;
    }

  try {
    const updated = await Lists.update_one(
      { _id: listID },
      { $set: categories }
    );
    return { success: true, list: updated };
  } catch (err) {
    return { succesS: false, error: err.message };
  }
}

module.exports = {
  getAllLists,
  getListsFromEmail,
  getListFromID,
  createList,
  addCategory,
  moveCategory
}
