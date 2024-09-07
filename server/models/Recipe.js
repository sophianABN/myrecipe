const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  preparationTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  difficulty: { type: String, enum: ['facile', 'moyen', 'difficile'], required: true },
  servings: { type: Number, required: true },
  category: { type: String, required: true },
  cuisine: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  images: [{ type: String }],
  video: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);