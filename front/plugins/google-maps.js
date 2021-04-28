import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use( VueGoogleMaps, {
    load : {
        key : "AIzaSyD-OHykomBujNBzD0Rp3piSfXLz4ws5wgU",
        // v : "GOOGLE_MAPS_VERSION",
        v : '3.37',
        libraries : "places"
    }
});