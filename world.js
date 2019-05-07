
class World extends THREE.Mesh {

    constructor() {
        super();
        this.createBuildings();
    }

    createBuildings() {
        /*var texture = new THREE.TextureLoader().load('imgs/texturaEdificio.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 2, 2 );*/

        var building_1 = new THREE.Mesh(new THREE.BoxGeometry(60, 40, 60));
        building_1.material = new THREE.MeshBasicMaterial ({ color: 0x0000 });

        building_1.applyMatrix(new THREE.Matrix4().makeScale(1, 10, 1));

        this.add(building_1);
    }
}