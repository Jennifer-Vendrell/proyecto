const animeModel = {
    getAll:`
        SELECT
            *
        FROM
            anime
    `,
    getByRank: `
    SELECT
    *
    FROM
        anime
    WHERE
        Rank= ?
    `,
    getByName: `
    SELECT
    *
    FROM
        anime
    WHERE
        Name= ?
    `,
    
    addanime:`
    INSERT INTO
        anime
         (
        Name,
        Type,
        Episodes,
        Studio
        
        
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )
    `,
    updateanime: `
    UPDATE
        anime
    SET
    Name = ?
    Type = ?
    Episodes = ?
    Studio = '?
    
    
    WHERE
        Rank = ?
`,
    deleteanime: `         
        UPDATE FROM
            anime
     WHERE
         Rank = ?
    `,
}

Module.exports = animeModel;