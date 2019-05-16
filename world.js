class World extends THREE.Mesh{
    constructor(){
        super();

        this.geometry = new THREE.CubeGeometry(10000,10000,10000);

        this.texture = 
        [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/darkcity_ft.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/darkcity_bk.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/darkcity_up.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/desertsky_up.tga'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/darkcity_rt.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/darkcity_lf.jpg'),side: THREE.DoubleSide})  
        ];

        /*var shader = THREE.ShaderLib["cube"];
        var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        uniforms['tCube'].texture= this.texture;  

        this.material = new THREE.ShaderMaterial({
            fragmentShader    : shader.fragmentShader,
            vertexShader  : shader.vertexShader,
            uniforms  : uniforms
        });*/

        this.material = new THREE.MeshFaceMaterial(this.texture);
        this.world = new THREE.Mesh(this.geometry, this.material);

        this.add(this.world);
    
    }


}