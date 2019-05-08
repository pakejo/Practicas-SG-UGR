class Track extends THREE.Mesh {

    constructor() {
        super();

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
        
            this.scale.set(20,20,20);
    }
}