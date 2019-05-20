class World extends THREE.Mesh{
    constructor(){
        super();

        this.geometry = new THREE.CubeGeometry(10000,10000,10000);

        var buildingTexture = new THREE.TextureLoader().load('imgs/textura_edificio2.jpg');

        //Tunel
        var skyscraper1 = new THREE.Mesh();
            skyscraper1.geometry = new THREE.CubeGeometry(140,150,60);
            skyscraper1.material = new THREE.MeshBasicMaterial ({map: buildingTexture});

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

        //Cross
        this.cross1 = new THREE.Mesh();
        this.cross1.geometry = new THREE.BoxGeometry(3,20,3);
        this.cross1.material = new THREE.MeshNormalMaterial();

        this.cross1.rotateX(Math.PI/4);
        this.cross1.position.set(0,30,-188);

        this.cross2 = new THREE.Mesh();
        this.cross2.geometry = new THREE.BoxGeometry(3,20,3);
        this.cross2.material = new THREE.MeshNormalMaterial();

        this.cross2.rotateX(-Math.PI/4);
        this.cross2.position.set(0,30,-188);

        this.crossRotation = 0.0;
        //------------------------------

        //Clock
        this.clock1 = new THREE.Mesh();
        this.clock1.geometry = new THREE.BoxGeometry(20,8,3);
        this.clock1.material = new THREE.MeshNormalMaterial();

        this.clock1.rotateY(Math.PI/4);
        this.clock1.position.set(-200,20,-97);

        this.clock2 = new THREE.Mesh();
        this.clock2.geometry = new THREE.BoxGeometry(20,8,3);
        this.clock2.material = new THREE.MeshNormalMaterial();

        this.clock2.rotateY(-Math.PI/4);
        this.clock2.position.set(-200,20,-97);

        this.clockRotation = 0.0;
        //-------------------------------------

        //Zig Zag
        this.zigzag1 = new THREE.Mesh();
        this.zigzag1.geometry = new THREE.BoxGeometry(0.5,8,20);
        this.zigzag1.material = new THREE.MeshNormalMaterial();
        this.zigzag1.position.set(0,25,-50);

        this.zigzag1.rotateY(Math.PI/4);

        this.zigzag2 = new THREE.Mesh();
        this.zigzag2.geometry = new THREE.BoxGeometry(0.5,8,20);
        this.zigzag2.material = new THREE.MeshNormalMaterial();
        this.zigzag2.position.set(-20,25,-5);

        this.zigzag2.rotateY(Math.PI/4);

        this.zigzag3 = new THREE.Mesh();
        this.zigzag3.geometry = new THREE.BoxGeometry(0.5,8,20);
        this.zigzag3.material = new THREE.MeshNormalMaterial();
        this.zigzag3.position.set(-60,25,10);

        this.zigzag3.rotateY(Math.PI/4);

        this.zigzag4 = new THREE.Mesh();
        this.zigzag4.geometry = new THREE.BoxGeometry(0.5,8,20);
        this.zigzag4.material = new THREE.MeshNormalMaterial();
        this.zigzag4.position.set(50,25,-65);

        this.zigzag4.rotateY(Math.PI/4);

        



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
        this.add(this.cross2);
        this.add(this.cross1);
        this.add(this.clock1);
        this.add(this.clock2);
        this.add(this.zigzag1);
        this.add(this.zigzag2);
        this.add(this.zigzag3);
        this.add(this.zigzag4);

        // Sonidos

        // create an AudioListener and add it to the camera
        var listener = new THREE.AudioListener();
        this.add(listener);

        // create a global audio source
        var sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'sounds/fondo.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.3 );
            sound.play();
        });
    
    }

    update(){
        this.crossRotation += 0.06;
        this.clockRotation += 0.04;
        this.cross1.rotation.set(this.crossRotation,0,0);
        this.cross2.rotation.set(-this.crossRotation,0,0);

        this.clock1.rotation.set(0,this.clockRotation,0);
        this.clock2.rotation.set(0,this.clockRotation,0);
    }
}