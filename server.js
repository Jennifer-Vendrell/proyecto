const express = require('express');
require('dotenv').config();
const cors = require('cors');
const AnimeRouter = require('./routes/Anime')

class Server  {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Paths
        this.basePath = '/api/v1';
        this.AnimePath = `${this.basePath}/Anime`;

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.Anime(cors());
        this.app.Anime(express.json());
    }

    routes() {
        this.app.Anime(this.AnimePath, AnimeRouter)
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`)
        })
    }
}

module.exports = Server;