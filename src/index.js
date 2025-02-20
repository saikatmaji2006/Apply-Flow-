import dotenv from "dotenv"
import express from "express";
import { app } from "./app.js";
dotenv.config({
    path: './.env'
})
console.log(`${process.env.mongodbURI}`)

import connectDB from "./db/index.js";
connectDB()
.then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
        const host = server.address().address;
        console.log(`⚙️ Server is running at http://${host === '::' ? 'localhost' : host}:${process.env.PORT}`);
    })
    process.on('SIGTERM', () => {
        console.log('Process terminated. Closing server...');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    });
    process.on('SIGINT', () => {
        console.log('Interrupt received. Closing server...');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



