<template>
    <div class="gmap">
        <GmapMap
            :center="{lat:10, lng:10}"
            :zoom="12"
            map-type-id="terrain"
            style="width:100%; height:100%"
            >
            <gmap-info-window :position="{lat:10, lng:10}">
                차 막혀!!
            </gmap-info-window>
            <!-- <gmap-marker :position="{lat:10, lng:10}">
            </gmap-marker> -->
        </GmapMap>
    </div>
</template>


<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .gmap{
        width: 100%;
        height: 500px;
    }
</style>