const {request, response} = require('express');
const animeModel = require('../models/anime');
const pool = require('../db');

// primer endpoint

const listAnime= async (req = request, res = response) => {
    let conn;

    try{
        conn =  await pool.getConnection();

        const anime = await conn.query(animeModel.getAll,(err)=>{
            if (err){
                throw err;
            }
        })
        res.json(anime);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn){
            conn.end()
        }
    }
}


// segundo endpoint

const listAnimeByID = async (req = request, res = response) => {
    const {Rank} = req.params;
    let conn;

    if (isNaN(Rank)){
        res.status(400).json ({msg: `The Rank is invalid`});
        return;
    }

    try{
        conn =  await pool.getConnection();

        const [Anime] = await conn.query(animeModel.getByRank, [Rank] ,(err)=>{
            if (err){
                throw err;
            }
        })

        if (!Anime){
            res.status(404).json({msg: `Anime with ID ${Rank} not found`});
            return;
        }

        res.json(Anime);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn){
            conn.end();
        }
    }
}

// tercer endpoint

const addAnime = async (req = request, res = response) =>{
    const {
        
        
        Name,
        Type,
        Episodes,
        Studio, 
    } = req.body;

    if (  !Name  || !Type || !Episodes || !Studio ){
        res.status(400).json({msg: 'Missing information'});
        return;
    }



    const Anime= 
       [
        
        Name,
        Type,
        Episodes,
        Studio,
         ]
    let conn;

    try{
        conn = await pool.getConnection();

        const [AnimeExists] = await conn.query(AnimeModel.getByAnime,[Anime],(err)=>{
            if (err) throw err;
        })
        if (AnimeExists){
            res.status(409).json({msg: `Anime ${Anime} already exists`});
            return;
        }

        

        const AnimeAdded = await conn.query(AnimeModel.addRow,[...Anime], (err)=>{
            if (err) throw err;
        })

        if (AnimeAdded.affectedRows === 0){
            throw new Error('Anime not Added');
        }
        
        res.json({msg: 'Anime added succesfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}

// cuarto endpoitn Aqui va la para actualizar un usuario si existe
const updateAnime = async (req = request, res = response) => {
    let conn;

    const {
        
        Name,
        Type,
        Episodes,
        Studio
    
    } = req.body;

    const {Rank} = req.params;


    let AnimeNewData = [
        
        Name,
        Type,
        Episodes,
        Studio
        
    ];

    try {
        conn = await pool.getConnection();

const [AnimeExists] = await conn.query
(animeModel.getByRank, 
    [Rank], 
    (err) => {
    if (err) throw err;
});

if (!AnimeExists || AnimeExists.is_active === 0){
    res.status(409).json({msg: `Anime with ID ${Rank} not found`});
         return;
}

const [NameExists] = await conn.query(animeModel.getByName, [Name], (err) => {
    if (err) throw err;
    })
    if (NameExists) {
        res.status(409).json({msg: `name  already exists`});
        return;
       }



        const AnimeOldData = [
        
        AnimeExists.Name,
        AnimeExists.Type,
        AnimeExists.Episodes,
        AnimeExists.Studio,
          
      ];

      AnimeNewData.forEach((AnimeData, index) =>{
        if (!AnimeData){
            AnimeNewData[index] = AnimeOldData[index];
        }
      })
           const UpdateAnime = await conn.query(
            animeModel.updateRow,
            [...AnimeNewData, Rank],
            (err) =>{
                if (err) throw err;
            }
           )

 if (UpdateAnime.affecteRows === 0){
   throw new Error('Anime not added')
        } 

        res.json({msg: 'Anime UPDATED SECCESFULLY'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    } finally {
        if (conn) conn.end();
    }
}
// quinto endpoitn 

const deleteAnime = async (req = request, res = response) =>{
    let conn;
    const {Rank} = req.params;

    try{
        conn = await pool.getConnection();

        const [AnimeExists] = await conn.query(animeModel.getByRank,[Rank], (err) =>{
            if (err) throw err;
        });
        if (!AnimeExists || AnimeExists.is_active === 0){
            res.status(404).json({msg: `Anime with ID ${id} not found`});
            return;
        }
        const AnimeDeleted = await conn.query(animeModel.deleteAnime,[Rank],(err) =>{
            if (err) throw err;
        });
        
        if (AnimeDeleted.affectedRows === 0){
            throw new Error('Anime not deleted');
        }

        res.json({msg:'Anime deleted succesfully'});

    }catch (error){
        console.log(error);
        res.status(500).json(error);
    }finally {
        if (conn) conn.end();
    }
}

  






module.exports = {listAnime, listAnimeByID, addAnime, updateAnime ,deleteAnime}

// routes       controllers       models(DB)