const express = require('express')
const router = express.Router();
const {listAnime, 
    listAnimeByID,
     addAnime,
      deleteAnime, 
      updateAnime} = require ('../controllers/Anime');


router.get('/', listAnime);
router.get('/:Rank',listAnimeByID); // https//localhost:3000/api/v1/Anime/?
router.put('/', addAnime);
router.patch('/:Rank', updateAnime);
router.delete('/:Rank', deleteAnime);

module.exports = router

// http://localhost:3000/api/v1/Anime


