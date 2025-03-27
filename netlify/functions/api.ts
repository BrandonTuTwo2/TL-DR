import express, { Router } from "express";
import serverless from "serverless-http";


const api = express();
const router = Router();

router.get("/test", async(req,res) => {
    console.log("tahts me ")
    res.send({
        body:"hi me to me"
    })
})


api.use("/api/", router);
export const handler = serverless(api);