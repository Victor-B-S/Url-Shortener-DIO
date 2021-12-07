import { URLModel } from "../database/model/URL"
import { Request, Response } from "express"
import shortId from 'shortid'
import { config } from '../config/Constants'

export class URLController {
    public async shorten(req: Request, response: Response): Promise <void> {
        const { originalURL } = req.body

        //para evitar textos aleatorios... ou pelo menos textos aleatorios que nao comecem com http. :)
        if (originalURL.substring(0,4) != "http" ) {
            response.status(400).json( { error: "URL must start with http or https to be valid" } )
            return
        }
        const url = await URLModel.findOne({ originalURL })
        if ( url ){
            response.json(url)
            return
        }
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        const timesUsed = 0
        const newUrl = await URLModel.create({ originalURL, hash, shortURL, timesUsed  })
        response.json({ newUrl })
    }

    public async redirect(req: Request, response: Response): Promise <void> {
        const { hash } = req.params
        const url = await  URLModel.findOne({ hash })

        if (url) {
            response.redirect(url.originalURL)
            url.timesUsed++
            await url.save()
            return
        }

        response.status(400).json( { error: "URL not found" } )
    }

    public async top(req: Request, response: Response): Promise <void> {
        const topTenMostUsed = await URLModel.find().sort({ timesUsed : -1 }).limit(10)
        response.json({ topTenMostUsed })
    }
}