/* eslint-disable prettier/prettier */
//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExcelJS from 'exceljs'
import View from '@ioc:Adonis/Core/View'
const fs = require('fs')
export default class AuthController {
  public async login({ request, response }) {
    const { email } = request.all()
    // Validar con el archivo Excel
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile('Copia_de_Confirmacion.xlsx') // Ruta al archivo Excel
    const worksheet = workbook.getWorksheet(1)

    let storedEmails: any = []
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const mail = row.getCell(5).value
        storedEmails.push(mail)
      }
    })
    if (storedEmails.includes(email)) {
      // cargo todas las variables
      const dataHTML = {
        name1: "Angie",
        name2: "David",
        location: "mapa",
        contact: "David: 1171011639 / Angie: 1164379078",
        banner: "./banner.jpg"
        //images: ["/public/image1", "/public/image1"]
      };
      return View.render('main3', dataHTML)
    } else {
      return View.render('errors.unauthorized')
    }
  }
}
