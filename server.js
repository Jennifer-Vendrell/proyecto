const express = require('express');
require('dotenv').config();
const cors = require('cors');
const animeRouter = require('./routes/anime')

class Server  {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Paths
        this.basePath = '/api/v1';
        this.animePath = `${this.basePath}/anime`;

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.animePath, animeRouter)
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`)
        })
    }
}

module.exports = Server;