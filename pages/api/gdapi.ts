import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path';

let dbkey:string = '{ "type": "service_account", "project_id": "magicfootballapi", "private_key_id": "7c21c7fd04984dc141729edf506e1bafd26cb9ca", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCDSZ+hijJUyOZm\nDHnd3mHEMk49J1aUAKs8xeh9jF+h9Eq0H8tvzrrILG4LAZeOl05jvCeeqdkdlDX3\nXY/LDOWx40zp/O3nuj0Ehy0EK3zPkCesMtB44fbo+UC0/6H0blr1wI6sUcBRDXvl\n6M2He9fmTzveDTTD5AcO62hLmStvbvAIyhvomaCLP0N7bkSzZpsrnXwSRkhsyflz\nZJlM3NRlUd1VxOLH+NKdz/6LSfyNyEzOmwH5rm9Gmnu2tvIz9lZYp4Fmp6WW08Ni\nKs9Qbb8AuoP2vdlTLsdPoTwq7czB1fVbaznQOxA3mUPSjejvqxQ3GFya7kZDWYbn\ns9ZBTIOXAgMBAAECggEAE+xO8TC2RUTc0eJVdrnnPuLIxLb83dDhgNjNAzW+KCbu\nVI9OoVT55flNacDVbaoVwe+CWQLlaSZeBNU0m60FXmK5VU4wvC2i/NZBRT9kMrYU\nOdQsQWvpEEm4QWoEUGzpbh8eh5U7CLxxxN34nUrJ5LAOzGUB+4grGgnXS0GfOcr1\ntO4OJdU0V8jxH0b/hGeX28X/Pat3uHKezLS258ReHP8h3ajkr7fVQ2BDmdirPu/n\n8aozgD549UO7gHQxHPWkVDfd10VGtkthnKEyyB+KBwetycVczxgX9uoBPEZH+3tK\n4FT7qbPy0nAQXjlLWl7IeN9PLcN1Yw18YlhFXucHIQKBgQC5ZEPC+DkQWowK/Fgt\nnqjgMXwwVZQqDwCnjF1+htsNujB+nXtpcw9Z1z+TvneGII0gBB6Y/hM/8CX5X1bX\nYXW93jLXg5EY4IlwbJDeYECpEzEW6EsNrb0j7QfBbVZ9tqwRJT60M7Cp7FB4W5ey\nkbxXZt9JUUrenYVlv3jGImhHWwKBgQC1SjK7IlSzaZI3A9YuZntzKNycVM4fgEmP\n+NpTZAFIDsQu/kyjxV5PMvHYrP/o5a9qHcveDqwS/tDhpVOAwpwE60N/USTPejWH\nKUj1eAcAr4snwmpAdonKQxOW7ZWNQaZQF5AwqqgS3fdqjVSfgCoKJbjZ11DihVJG\nBa/dUAdldQKBgH6rHQlX5FViKJFQ/UaeQzB7Xyj/L+7UtVPFOhQ7O+xTLNM18p6H\n+RMfWNcvqibAkuwvJGDQKILlKG0MUR9z/aiu6voJcNgYgo+H/iuShFuBO2c1bCJ6\ndOLZDxWACTp313UXh5JERw6y4gB6RFnD7XWiWimUG52i7wQoIPLvi2RFAoGBAKqW\nWw5Dy7fXC0LBVXTr8hX2yUBBfIOfz5it7aKyY5JOcsRVfgBM4+VaZsAgad3Y4yrT\nRtZ4r+pf5GWvj9eFSBJI3oaa8CxbLqs0afaxLsWyaRrMkfZ+lEHCxFgsz6DPuZN7\n2K4yp1y5iOq2en5rtyM9Q6eYOAAuu7AwAcAaYhtRAoGBAJ5Sq3pq+gqKTfEPkmHR\nThAyg/cJNMQU9ganmA6Rd/z4iRt/8pmBc0g2xuY1Hl3QBgGm8grIM0UlrWpNazh2\nUr1AXIlHdvvFeYqbl+9+aD9YT87CFEkoUv2PndyzcoWHgbRRT324zUhVZJmb9U7Y\ndGUqOizUS78EvNPP+YUuyAsT\n-----END PRIVATE KEY-----\n", "client_email": "googlesheetreadermf@magicfootballapi.iam.gserviceaccount.com", "client_id": "103642200996200353006", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googlesheetreadermf%40magicfootballapi.iam.gserviceaccount.com" } '

class CharData {
  name: string;

  constructor(name:string) {
    this.name = name
  }
}

type Data = JSON & {
  characters: Character[];
}

type Character = object & {

}


export default async function HandlerGD(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    let { body, method } = req
    const filePath = path.join(process.cwd(), 'public', 'JSON', 'test.json')

    function GET():void {
      const data = getData()
      res.status(200).json(data)
    }

    function POST():void {
      // let { name } = body
      // if(!name) {
      //   return res.status(400).send('Bad Request')
      // }
      const data = getData()
      data.characters.push(new CharData('name'))
      if(saveData(data)) {
        res.status(200).send('success')
      } else {
        res.status(400).send('Error happened when server attempted to save file')
      }
    }

    const getData = ():Data => {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      } catch (err:any) {
        res.status(400).send('Error happened when server attempted to read file')
        return err
      }
    }
    const saveData = (data:Data):boolean => {
      try {
        fs.writeFileSync(filePath, JSON.stringify(data))
        return true
      } catch (err:any) {
        return false
      }
    }

      method === "POST"
    ? POST()
    : method === "PUT"
    ? console.log("PUT")
    : method === "DELETE"
    ? console.log("DELETE")
    : method === "GET"
    ? GET()
    : res.status(404).send('Wrong request')
  }