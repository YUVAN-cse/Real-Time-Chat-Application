import dotenv from 'dotenv'
import connectDB from './db/connect.db.js';
dotenv.config({ path: './.env' })

import {server , io ,app} from "./socket/socket.js"

// import app from "./app.js";

connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch(err => console.log(err));