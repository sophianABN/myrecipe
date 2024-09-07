const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');


router.post('/', auth, upload, handleUploadError, async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      preparationTime,
      cookingTime,
      difficulty,
      servings,
      category,
      cuisine,
      video
    } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      preparationTime,
      cookingTime,
      difficulty,
      servings,
      category,
      cuisine,
      author: req.user.userId,
      images: req.files.map(file => file.location),
      video
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recette ajoutée avec succès', recipe: newRecipe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(6); // Limite à 6 recettes pour l'exemple
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer une recette spécifique par son ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;