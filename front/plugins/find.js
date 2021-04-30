import EXIF from "exif-js";
import loadImage from "blueimp-load-image";

export default class Find{
    static get( $parent, $className ){
        return $parent.querySelectorAll( $className )[ 0 ];
    }

    // 이메일 유효검사
    static getCheckEmail(str) {
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (regExp.test(str)) return true;
        else return false;
    }

    static getCheckPassword( $id, $pW, $pWconfirm ){
        var pw_passed = true;
        var pw = $pW;
        var pw2 = $pWconfirm;
        var id = $id;

        pw_passed = true;

        var pattern1 = /[0-9]/;
        var pattern2 = /[a-zA-Z]/;
        var pattern3 = /[~!@\#$%<>^&*]/;
        var pw_msg = "";

        if(id.length == 0) {
                alert("아이디를 입력해주세요");
                return false;
            } else {
                //필요에따라 아이디 벨리데이션
            }

        if(pw.length == 0) {
                alert("비밀번호를 입력해주세요");
                return false;
            } else {
                if( pw  !=  pw2) {
                        alert("비밀번호가 일치하지 않습니다.");
                        return false;
                    }
            }

        if(!pattern1.test(pw)||!pattern2.test(pw)||!pattern3.test(pw)||pw.length<8||pw.length>50){
            alert("영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.");
            return false;
        }          

        if(pw.indexOf(id) > -1) {
            alert("비밀번호는 ID를 포함할 수 없습니다.");
            return false;
        }

        var SamePass_0 = 0; //동일문자 카운트
        var SamePass_1 = 0; //연속성(+) 카운드
        var SamePass_2 = 0; //연속성(-) 카운드

        for(var i=0; i < pw.length; i++) {
                var chr_pass_0;
                var chr_pass_1;
                var chr_pass_2;

                if(i >= 2) {
                    chr_pass_0 = pw.charCodeAt(i-2);
                    chr_pass_1 = pw.charCodeAt(i-1);
                    chr_pass_2 = pw.charCodeAt(i);

                    //동일문자 카운트
                    if((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)) {
                    SamePass_0++;
                    } 
                    else {
                    SamePass_0 = 0;
                }

                    //연속성(+) 카운드
                    if(chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
                        SamePass_1++;
                    }
                    else {
                    SamePass_1 = 0;
                    }

                    //연속성(-) 카운드
                    if(chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
                        SamePass_2++;
                    } 
                    else {
                    SamePass_2 = 0;
                    }  
                }     

            if(SamePass_0 > 0) {
                alert("동일문자를 3자 이상 연속 입력할 수 없습니다.");
                pw_passed=false;
                }

            if(SamePass_1 > 0 || SamePass_2 > 0 ) {
                alert("영문, 숫자는 3자 이상 연속 입력할 수 없습니다.");
                pw_passed=false;
                } 

                if(!pw_passed) {             
                    return false;
                    break;
            }
        }

        return true;
    }

    static getMapPosition( $file ){
        return new Promise(( resolve, reject ) => {
            let file = $file;
            let reader = new FileReader();

            reader.onload = function(){
                let data = EXIF.readFromBinaryFile( this.result );

                if( !data.GPSLatitude ){
                    resolve({ lat : null, lng : null });
                    return;
                }
    
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
            let w = 600;
            loadImage( $file, ( img ) => {
                resolve( img );
            }, {
                // maxWidth : w,
                maxHeight : w,
                orientation : 1
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
            let byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            let ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            let bb = new Blob([ia], {type:mimeString});         
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