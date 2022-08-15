import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'


@Injectable()
export class FileService{

    createFile(file): string {
        try {
            if(!file){
                return '';
            }
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, 'static')
            // if(!fs.existsSync(filePath)) {
            //     fs.mkdirSync(filePath, {recursive: true})
            // }
            // fs.writeFileSync(path.resolve(filePath, 'aaaa.png'), '')
            return fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // removeFile(fileName: string) {

    // }

}