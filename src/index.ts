import { MongoConnection } from './database/MongoConnection'
import express, { Request, Response } from 'express'
import { URLController } from './controller/URLController'

const api = express()
api.use(express.json())

api.get('/test', (req: Request, res: Response) => {
    res.json({ success: true })
})

const database = new MongoConnection()
database.connect()

const urlController = new URLController()

api.post("/shorten", urlController.shorten)

api.get("/top10", urlController.top)

api.get("/:hash", urlController.redirect)

api.listen(5000, () => console.log("Express listening"))