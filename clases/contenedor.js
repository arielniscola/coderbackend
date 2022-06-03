const fs = require('fs');

class Contenedor{

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async save(obj){
        try {
            let contenido = await this.getAll();   
            //convertir a json contenido del archivo
            let idCount = 0;
            //obtener el id del ultimo elemento y asigno el consecutivo
            if(contenido.length > 0){
                idCount = contenido[contenido.length -1].id;              
            }
            obj.id = idCount + 1;
            contenido.push(obj);
            contenido = JSON.stringify(contenido, null,'\t'); //formatear string
            //reescribo arhivo actualizado
            await fs.promises.writeFile(`./archivos/${this.nombreArchivo}.txt`, contenido);
            return idCount;
        }
        catch (err){
            return err;
        };

    }

    async getById(id){
        try {
           let objetos = await this.getAll();
     //busco en el array el objeto con ID igual al proporcionado  
           for(let i=0; i < objetos.length; i++){              
               if(objetos[i].id == id){
                   return objetos[i]
               }else if( i == objetos.length -1){
                    return null
               }
           }         
        } catch (error) {
            return error
        }     
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(`./archivos/${this.nombreArchivo}.txt`, 'utf-8');
            return JSON.parse(contenido); 
        } catch (err) {
            return err;
        }
    }

    async deleteById(id){
        try {
            let objetos = await this.getAll();
        
            //buscar el archivo con ID proporcionado, eliminar del array el objeto
            for(let i=0; i < objetos.length; i++){              
                if(objetos[i].id == id){
                   objetos.splice(i, 1);
                   let contenido = JSON.stringify(objetos, null, '\t'); 
                   await fs.promises.writeFile(`./archivos/${this.nombreArchivo}.txt`, contenido); //reescribo archivo con objeto eliminado
                   console.log(`Objeto con ID: ${id} ha sido eliminado`);
                }else if( i == objetos.length -1){
                     console.log('No se encuentra objeto con ID especificado');
                }
            }
        } catch (error) {
            console.log(`No se borro objeto debido a un error: ${error}`);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`./archivos/${this.nombreArchivo}.txt`, '[]');
            console.log("Todos los objetos han sido borrados");
        } catch (err) {
            console.log(`No se borraron objetos: ${err}`);
        }
    }
}


module.exports = Contenedor;