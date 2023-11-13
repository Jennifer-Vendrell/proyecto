const express = require('express')
const router = express.Router();
const {listanime, 
    listanimeByRank,
     addanime,
      deleteanime, 
      updateanime} = require ('.../controllers/anime');


      router.get('/', listanime);
      router.get('/:Rank',listanimeByRank); // https//localhost:3000/api/v1/users/?
      router.post('/', signInanime);
      router.put('/', addanime);
      router.patch('/:Rank ', updateanime);
      router.delete('/:Rank', deleteanime);

Module.exports = router

// http://localhost:3000/api/v1/anime


