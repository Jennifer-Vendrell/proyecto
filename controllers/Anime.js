const {request, response} = require('express');
const animeModel = require('../models/anime');
const pool = require('../db');

// primer endpoint

const listanime= async (req = request, res = response) => {
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

const listanimeByID = async (req = request, res = response) => {
    const {Rank} = req.params;
    let conn;

    if (isNaN(Rank)){
        res.status(400).json ({msg: `The Rank is invalid`});
        return;
    }

    try{
        conn =  await pool.getConnection();

        const [anime] = await conn.query(animeModel.getByRank, [Rank] ,(err)=>{
            if (err){
                throw err;
            }
        })

        if (!anime){
            res.status(404).json({msg: `Anime with ID ${Rank} not found`});
            return;
        }

        res.json(anime);
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

const addanime = async(req = request, res = response) => {
    const {
            Rank,
            Name,
            Type,
            Episodes,
            Studio
            
    } = req.body;

    if (!Rank || !Name || !Type || !Episodes || !Studio ) {
        res.status(400).json({msg: 'MISSING INFORMATION'});
        return;
    }
    const movie = [
        Rank,
        Name,
        Type,
        Episodes,
        Studio
        ]

    let conn;

    try {
        conn = await pool.getConnection();

        const [NameExists] = await conn.query(animeModel.getByName, [Name], (err) => {
            if (err) throw err;
            })
            if (NameExists) {
                res.status(409).json({msg: 'Name ${Name} already exists'});
                return;
               }


        const NameAdded = await conn.query(animeModel.addanime, [...movie], (err) => {
            if (err) throw err;
            })
            if (NameAdded.affecteRows === 0){
                throw new Error('anime not added')
            }                                                   
            res.json({msg: 'USER ADDED SECCESFULLY'});        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }finally{
        
        if(conn)conn.end();
        
    }
    }
// cuarto endpoitn Aqui va la para actualizar un usuario si existe
const updateanime = async (req = request, res = response) => {
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

const deleteanime = async (req = request, res = response) =>{
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

  






module.exports = {listanime, listanimeByID, addanime, updateanime ,deleteanime}

// routes       controllers       models(DB)