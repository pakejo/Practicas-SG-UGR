class World extends THREE.Mesh{
    constructor(){
        super();

        this.geometry = new THREE.CubeGeometry(10000,10000,10000);

        var buildingTexture = new THREE.TextureLoader().load('imgs/textura_edificio2.jpg');

        //Tunel
        var skyscraper1 = new THREE.Mesh();
            skyscraper1.geometry = new THREE.CubeGeometry(140,150,60);
            skyscraper1.material = new THREE.MeshPhongMaterial ({map: buildingTexture});

        var hole1 = new THREE.CubeGeometry(140,20,40);
        var hole1bsp = new ThreeBSP(hole1);
        var skyscraper1bsp = new ThreeBSP(skyscraper1);
        var building1 = skyscraper1bsp.subtract(hole1bsp);
        //------

        //Toro
        /*var torus = new THREE.Mesh();
            torus.geometry = new THREE.TorusGeometry(20,6,30,200,6.3);
            torus.material = new THREE.MeshNormalMaterial();

        torus.rotateY(-Math.PI/6);
        torus.position.set(70,70,0);*/
        //--------------------

        var cylinder = new THREE.Mesh();
        cylinder.geometry = new THREE.CylinderGeometry(30,30,120,64,64);
        cylinder.material = new THREE.MeshNormalMaterial ();

        var cylinderHole = new THREE.Mesh();
        cylinderHole.geometry = new THREE.CylinderGeometry(20,20,120,64,64);
        cylinderHole.material = new THREE.MeshNormalMaterial();

        var cylinderBsp = new ThreeBSP(cylinder);
        var cylinderHoleBsp = new ThreeBSP(cylinderHole);
        var pr = cylinderBsp.subtract(cylinderHoleBsp);
        var cylinderMesh = pr.toMesh();

       
        cylinderMesh.rotateX(Math.PI/3);
        cylinderMesh.rotateZ(Math.PI/4);
        cylinderMesh.position.set(140,50,-40);

        /*var hole1 = new THREE.CubeGeometry(140,20,40);

        var hole1bsp = new ThreeBSP(hole1);
        var skyscraper1bsp = new ThreeBSP(skyscraper1);
        var building1 = skyscraper1bsp.subtract(hole1bsp);*/
        



        this.texture = 
        [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_ft.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_bk.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_up.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_dn.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_rt.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_lf.jpg'),side: THREE.DoubleSide})  
        ];

        /*var shader = THREE.ShaderLib["cube"];
        var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        uniforms['tCube'].texture= this.texture;  

        this.material = new THREE.ShaderMaterial({
            fragmentShader    : shader.fragmentShader,
            vertexShader  : shader.vertexShader,
            uniforms  : uniforms
        });*/
        

        this.worldMaterial = new THREE.MeshFaceMaterial(this.texture);

        this.world = new THREE.Mesh(this.geometry, this.worldMaterial);

        this.building1Mesh = building1.toMesh();

        this.building1Mesh.rotateY(Math.PI/4);
        this.building1Mesh.position.set(0,25,-27);

        this.add(this.world);
        this.add(this.building1Mesh);
        //this.add(torus);
        this.add(cylinderMesh);
    
    }
}