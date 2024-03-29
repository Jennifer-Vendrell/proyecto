const animeModel = {
    getAll: `
       SELECT 
             *
          FROM
             anime
    `,
    getByRank:`
    SELECT 
             *
          FROM
          anime
            WHERE
                Rank =?
    `,

    getByName:`
    SELECT 
             *
          FROM
          anime
            WHERE
                Name =?
    `,

    addanime: `
    INSERT INTO 
    anime(
            Rank,
            Name,
            Type,
            Episodes,
            Studio
       
      
    )VALUES(
       ?, ?, ?, ?, ?
    )
    `,
    
    updateanime: `
    UPDATE  
       anime
    SET 
    Name= ?,
    Type = ?,
    Episodes= ?,
    Studio = ?
   
    WHERE
       Rank=?
    `,
    
    deleteanime:`
    
    DELETE FROM
           anime
       WHERE
           Rank =?
    
    `
    }
    module.exports = animeModel;
    