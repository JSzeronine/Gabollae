<template>
    <div class="test-bx">
        <div class="map-content">
            <div class="map-container" ref="mapContainer">
                <GmapMap class="gmap-container" ref="mapRef" :center="mapCenter" :zoom="15" style="width:100%; height:300px"></GmapMap>
            </div>
        </div>

        <div>
            <TravelList />
        </div>
    </div>
</template>

<script>

import TravelList from "@/components/common/travel_list";
export default {
    components : {
        TravelList
    },

    data(){
        return{
            mapCenter : { lat : 37.555184, lng : 126.970780 },
            capture : ""
        }
    },

    mounted(){
        let vm = this;
        window.onload = async () => {
            vm.map = await this.$refs.mapRef.$mapPromise;
            let marker = new google.maps.Marker({
                position : new google.maps.LatLng( vm.mapCenter.lat, vm.mapCenter.lng ),
                map : vm.map,
            });

            // console.log( vm.map );
            // console.log( vm.map.data );
        }

        this.show();
    },

    methods : {
        show(){
            this.load();
        },

        async load(){
            let list = [];
            let v = 0;

            for( let i = 0; i < 10; i++ )
            {
                v = await this.showPromise();
                list.push( v );
            }

            console.log( list );
        },

        showPromise(){
            return new Promise(( resolve, reject ) => {
                setTimeout(() => {
                    resolve( 1 );
                }, 100 );
            })
        }
    }
}
</script>

<style lang="scss">
    .test-bx{
        .slide-bx{
            position: absolute; left: 0px; top: 0px;
        }
        
        .map-content{ width: 100%; height: 100%;
            .map-container{ width: 100%; height: 300px; overflow: hidden;
                .vue-map-container{ width: 100%; height: 300px; display: block;
                    .vue-map{ width: 100%; height: 300px; 
                    }
                }
            }
        }
    }
</style>