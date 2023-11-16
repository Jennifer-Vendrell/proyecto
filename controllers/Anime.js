const {request, response} = require('express');
const animeModel = require('../models/anime');
const pool = require('../DB');

// Enpoint 1//
const listanime = async(req = request, res = response)  => {
let conn;
try {
    conn = await pool.getConnection();

    const anime= await conn.query(animeModel.getAll, (err) => {
        if (err) {
            throw err;
            
        }
    })    
    res.json(anime)
} 
catch (error) {
    console.log(error);
    res.status(500).json(error);

} finally{
    if(conn)
    {conn.end();}
}
}

// Enpoint 2//
const listanimeByID = async(req = request, res = response)  => {
    const {Rank}=req.params;
    let conn; 

    if (isNaN(Rank)) {   
        res.status(400).json({msg: `THE RANK- IS INVALID`});     
        return;
        
    }
    
    try {
        conn = await pool.getConnection();
    
        const [anime] = await conn.query(animeModel.getByRank, [Rank], (err) => {  
            if (err) {
                throw err;
                
            }
        })
        if (!anime) {
            res.status(404).json({msg: `USER WITH ID ${Rank} NOT FOUND`});      
            return;
        }

        res.json(anime);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    
    } finally{
        if(conn)
        {conn.end();}
    }
    }

    // EndPoint 3 //
    const addanime = async(req = request, res = response) => {
        const {
            Rank,
            Name,
            Type,
            Episodes,
            Studio

                
        } = req.body;

        if (!Rank || !Name || !Type|| !Episodes || !Studio ) {
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


            const NameAdded = await conn.query(animeModel.addanime, [...anime], (err) => {
                if (err) throw err;
                })
                if (NameAdded.affecteRows === 0){
                    throw new Error('Name not added')
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


        //Nuevo EndPoint 4  Actualizar datos
        const updateanime = async (req = request, res = response) => {
            let conn;
        
            const {
                
            Name,
            Type,
            Episodes,
            Studio

                
            } = req.body;

            const { Rank} = req.params;

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

        if (!animeExists || animeExists.is_active ===0){
            res.status(409).json({msg: `User with ID ${Rank} not found`});
                 return;
        }

        const [NameExists] = await conn.query(animeModel.getByName, [Name], (err) => {
            if (err) throw err;
            })
            if (NameExists) {
                res.status(409).json({msg: 'Name already exists'});
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
                   const updateanime = await conn.query(
                    animeModel.updateanime,
                    [...animeNewData, Rank],
                    (err) =>{
                        if (err) throw err;
                    }
                   )

         if (updateanime.affecteRows === 0){
           throw new Error('User not added')
                } 

                res.json({msg: 'USER UPDATED SECCESFULLY'});
                
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
                return;
            } finally {
                if (conn) conn.end();
            }
        }
        
    


//endpoint 5 eliminar 
        const deleteanime = async(req = request, res = response) => {
            let conn;
            const {Rank} = req.params; 


           try {

            conn = await pool.getConnection();

            const [animeExists] = await conn.query
            (animeModel.getByRank, 
                [Rank], 
                (err) => {
                if (err) throw err;
            });

            if (!animeExists || animeExists.is_active ===0){
                res.status(409).json({msg: `User with ID ${Rank} not found`});
                     return;

            }

            const animeDeleted = await conn.query(
                animeModel.deleteanime,
                [Rank],
                (err) => {
                    if (err) throw err;
                }
            );
            
            if (animeDeleted.affecteRows === 0){
                throw new Error('User not deleted');

            }
            res.json ({msg: 'User deleted seccesfully'});

           } catch (error) {
            console.log(error);
            res.status(500).json(error);
        } finally{
            if (conn) conn.end();


        }
            
        }
   
        
    Module.exports = {listanime, listanimeByID, addanime, updateanime, deleteanime, }