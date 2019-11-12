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
        var dd = degrees + ( minutes / 60 ) + ( seconds / 3600 );
        if( direction == "S" || direction == "W" ) {
            dd = dd * -1; 
        }

        return dd;
    }

    static getStaticGoogleMapImage( $pos, $zoom, $w, $h )
    {
        let lat = $pos.lat;
        let lng = $pos.lng;

        let w = $w;
        let h = $h;
        let zoom = $zoom;

        let map = "";
        map += "https://maps.googleapis.com/maps/api/staticmap?";
        map += "center=" + lat  + "," + lng;
        map += "&zoom=" + zoom;
        map += "&size=" + w + "x" + h;
        map += "&markers=color:red";
        map += "%7C%7C" + lat + "," + lng;
        map += "&maptype=roadmap";
        map += "&key=" + "AIzaSyDTBk9ygjxvVMy-a99bauzRV_bXGY3sFzI";

        return map;
    }

    static dataURItoBlob( dataURI )
    {
        return new Promise(( resolve, reject ) => {
            let byteString = atob(dataURI.split(',')[1]);
            let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++)
            {
                ia[i] = byteString.charCodeAt(i);
            }
            
            let bb = new Blob([ab], { "type": mimeString });            
            resolve( bb );
        });

        // let byteString = atob(dataURI.split(',')[1]);
        // let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        // let ab = new ArrayBuffer(byteString.length);
        // let ia = new Uint8Array(ab);
        // for (let i = 0; i < byteString.length; i++)
        // {
        //     ia[i] = byteString.charCodeAt(i);
        // }

        // let bb = new Blob([ab], { "type": mimeString });
        // return bb;
    }

}