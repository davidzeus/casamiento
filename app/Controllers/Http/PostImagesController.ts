import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { DateTime } from 'luxon'

export default class PostImagesController {
    public async up(ctx: HttpContextContract) {
        const coverImage = ctx.request.file('imagen')
        if (coverImage) {
            const timestamp = DateTime.now().toFormat('yyyyMMddHHmmss')
            const uniqueFileName = `${timestamp}_.${coverImage.extname}`

            coverImage.move(Application.publicPath('uploads'), {
                name: uniqueFileName,
                overwrite: false
            })
        }
        //return ctx.response.redirect().back()
    }
}
