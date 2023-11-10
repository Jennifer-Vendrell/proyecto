const animeModel = {
    getAll:`
        SELECT
            *
        FROM
            Anime
    `,
    getByRank: `
    SELECT
    *
    FROM
        Anime
    WHERE
        Rank= ?
    `,
    getByName: `
    SELECT
    *
    FROM
        Anime
    WHERE
        Name= ?
    `,
    
    addAnime:`
    INSERT INTO
        Anime
         (
       
        
        Name,
        Type,
        Episodes,
        Studio
        
        
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `,
    updateAnime: `
    UPDATE
        Anime
    SET
    Name = ?
    Type = ?
    Episodes = ?
    Studio = '?
    
    
    WHERE
        Rank = ?
`,
    deleteAnime: `         
        UPDATE FROM
            Anime
     WHERE
         Rank = ?
    `,
}

module.exports = animeModel;