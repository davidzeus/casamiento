/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { DateTime } from 'luxon'
import fs from 'fs/promises'
import { join } from 'path'

export default class PostImagesController {
  public async up(ctx: HttpContextContract) {
    try {
      const coverImage = ctx.request.file('imagen')
      if (coverImage) {
        const timestamp = DateTime.now().toFormat('yyyyMMddHHmmss')
        const uniqueFileName = `${timestamp}_.${coverImage.extname}`

        coverImage.move(Application.publicPath('uploads'), {
          name: uniqueFileName,
          overwrite: false,
        })
        return ctx.response.status(200).json(uniqueFileName)
      }
      return ctx.response.status(400).json({ message: 'No se proporcionó una imagen' })
    } catch (error) {
      console.log(error)
    }
  }

  //obtener imagenes
  public async get(ctx: HttpContextContract) {
    try {
      const directorio = Application.publicPath('uploads')
      const archivos = await fs.readdir(directorio)
      const imagenes = archivos.filter(async (archivo) =>
        (await fs.stat(join(directorio, archivo))).isFile()
      )
      ctx.response.status(200).json(imagenes)
    } catch (error) {
      console.log(error)
      ctx.response.status(500).json({ error: 'Error al leer el directorio de imágenes' })
    }

    //return ctx.response.redirect().back()
  }
}
