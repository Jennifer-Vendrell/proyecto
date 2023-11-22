const express = require('express');
const router = express.Router();
const { listanime, listanimeByID, addanime, updateanime, deleteanime} = require('../controllers/anime');


router.get('/', listanime);                            
router.get('/:Rank', listanimeByID);                                       
router.put('/', addanime);
router.patch('/:Rank', updateanime);
router.delete('/:Rank', deleteanime);



module.exports = router

// http://localhost:3000/api/v1/anime 


