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

const listanimeByRank = async (req = request, res = response) => {
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
            res.status(404).json({msg: `anime with ID ${Rank} not found`});
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
const anime = [
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


    let animeNewData = [
        
        Name,
        Type,
        Episodes,
        Studio
        
    ];

    try {
        conn = await pool.getConnection();

const [animeExists] = await conn.query
(animeModel.getByRank, 
    [Rank], 
    (err) => {
    if (err) throw err;
});

if (!animeExists || animeExists.is_active === 0){
    res.status(409).json({msg: `anime with ID ${Rank} not found`});
         return;
}

const [NameExists] = await conn.query(animeModel.getByName, [Name], (err) => {
    if (err) throw err;
    })
    if (NameExists) {
        res.status(409).json({msg: `name  already exists`});
        return;
       }



        const animeOldData = [
        
        animeExists.Name,
        animeExists.Type,
        animeExists.Episodes,
        animeExists.Studio,
          
      ];

      animeNewData.forEach((animeData, index) =>{
        if (!animeData){
            animeNewData[index] = animeOldData[index];
        }
      })
           const Updateanime = await conn.query(
            animeModel.updateRow,
            [...animeNewData, Rank],
            (err) =>{
                if (err) throw err;
            }
           )

 if (Updateanime.affecteRows === 0){
   throw new Error('anime not added')
        } 

        res.json({msg: 'anime UPDATED SECCESFULLY'});
        
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

        const [animeExists] = await conn.query(animeModel.getByRank,[Rank], (err) =>{
            if (err) throw err;
        });
        if (!animeExists || AnimeExists.is_active === 0){
            res.status(404).json({msg: `anime with ID ${id} not found`});
            return;
        }
        const animeDeleted = await conn.query(animeModel.deleteanime,[Rank],(err) =>{
            if (err) throw err;
        });
        
        if (animeDeleted.affectedRows === 0){
            throw new Error('anime not deleted');
        }

        res.json({msg:'anime deleted succesfully'});

    }catch (error){
        console.log(error);
        res.status(500).json(error);
    }finally {
        if (conn) conn.end();
    }
}

  






Module.exports = {listanime, listanimeByRank, addanime, updateanime ,deleteanime}

// routes       controllers       models(DB)