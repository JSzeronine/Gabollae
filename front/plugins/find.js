import EXIF from "exif-js";
import axios from "axios";
import loadImage from "blueimp-load-image";

export default class Find{
    static get( $parent, $className ){
        return $parent.querySelectorAll( $className )[ 0 ];
    }

    static getMapPosition( $file ){
        return new Promise(( resolve, reject ) => {
            let file = $file;
            let reader = new FileReader();

            reader.onload = function(){
                let data = EXIF.readFromBinaryFile( this.result );
    
                var latDegree = data.GPSLatitude[0].numerator;
                var latMinute = data.GPSLatitude[1].numerator;
                var latSecond = data.GPSLatitude[2].numerator * 0.01;
                var latDirection = data.GPSLatitudeRef;
    
                let lat = Find.ConvertDMSToDD( latDegree, latMinute, latSecond, latDirection );
    
                var lonDegree = data.GPSLongitude[0].numerator;
                var lonMinute = data.GPSLongitude[1].numerator;
                var lonSecond = data.GPSLongitude[2].numerator * 0.01;
                var lonDirection = data.GPSLongitudeRef;
    
                let lng = Find.ConvertDMSToDD( lonDegree, lonMinute, lonSecond, lonDirection );

                resolve({ lat, lng });
            }
    
            reader.readAsArrayBuffer( file );
        });
    }

    static getLoadImage( $file ){
        return new Promise(( resolve, reject ) => {
            loadImage( $file, ( img ) => {
                resolve( img );
            }, {
                maxWidth : 690,
                maxHeight : 690,
                orientation : true
            });
        });
    }

    static ConvertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = degrees + (minutes / 60) + (seconds / 3600 );
        if (direction == "S" || direction == "W") {
            dd = dd * -1; 
        }

        return dd;
    }
}