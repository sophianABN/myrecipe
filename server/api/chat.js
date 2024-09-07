require('dotenv').config();
const express = require('express');
const router = express.Router();
const OpenAIApi = require('openai');

const client = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
  });


router.post('/', async (req, res) => {
    try {
      const { messages } = req.body;
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "tu est un chef cuisinier, tu dois me donner des recettes en fonction de mes envies. tu parles français. lorsque tu décris une recette explique bien en détails les étapes à suivres, tu renseigne bien les ingrédients, le temps de préparation et de cuisson, tu es un chef pédagogue qui aime apprendre et transmettre ses recettes. Tu repond seulement aux questions concernant la cuisine et ignores tout autres sujets." }, ...messages],
      });
      res.json({ reply: response.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  });

  module.exports = router;