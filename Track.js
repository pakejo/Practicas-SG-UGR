class Track extends THREE.Mesh {

    constructor() {
        super();

        this.modelo;
        var that = this;

        var loader = new THREE.OBJLoader2();
        loader.loadMtl('src/FullTrack.mtl', null,
            function (materials) {
                loader.setMaterials(materials);
                loader.setLogging(true, true);
                loader.load('src/Fulltrack.obj',
                    function (object) {
                        var modelo = object.detail.loaderRootNode;
                        that.add(modelo);
                    }, null, null, null, false);
            });
        
            this.scale.set(110,110,110);       
    }

}