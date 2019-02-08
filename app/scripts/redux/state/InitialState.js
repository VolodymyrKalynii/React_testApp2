import {JsonImporter} from '../../lib/JsonImporter';


// class InitPhotos {
//     init() {
//         this.photos = JsonImporter.import('../../imgJson/photos.json')
//     }
//
//     get(){
//         this.init();
//         console.log(this.photos);
//         return this.photos
//     }
// }

export default class InitialState {
    static async loadFile() {

        InitialState.initialState = {
            photosObj: await JsonImporter.import('../../imgJson/photos.json')
        };

        console.log(InitialState.initialState.photosObj);
    }
}

InitialState.loadFile()

// console.log(InitialState.initialState);