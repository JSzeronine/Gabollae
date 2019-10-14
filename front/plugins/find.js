export default class Find{
    static get( $parent, $className ){
        return $parent.querySelectorAll( $className )[ 0 ];
    }
}