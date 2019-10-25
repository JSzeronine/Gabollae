import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use( VueGoogleMaps, {
    load : {
        key : "AIzaSyDTBk9ygjxvVMy-a99bauzRV_bXGY3sFzI",
        // v : "GOOGLE_MAPS_VERSION",
        v : '3.37',
        libraries : "places"
    }
});