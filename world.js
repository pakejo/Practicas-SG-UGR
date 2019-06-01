class World extends THREE.Mesh{
    constructor(){
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.SunOfDeathRotation = 0.0;
        this.geometry = new THREE.CubeGeometry(10000,10000,10000);

        var buildingTexture = new THREE.TextureLoader().load('imgs/textura_edificio2.jpg');

        var extrudeSettings = {
            steps: 1,
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0,
            bevelSegments: 50
        };

        //Tunel
        var skyscraper1 = new THREE.Mesh();
            skyscraper1.geometry = new THREE.CubeGeometry(140,150,60);
            skyscraper1.material = new THREE.MeshBasicMaterial ({map: buildingTexture});

        var hole1 = new THREE.CubeGeometry(140,20,40);
        var hole1bsp = new ThreeBSP(hole1);
        var skyscraper1bsp = new ThreeBSP(skyscraper1);
        var building1 = skyscraper1bsp.subtract(hole1bsp);
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

        //Cross
        this.cross1 = new THREE.Mesh();
        this.cross1.geometry = new THREE.BoxGeometry(3,40,3);
        this.cross1.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/lightning_texture.jpg')});

        this.cross1.rotateX(Math.PI/4);
        this.cross1.position.set(0,5,-188);

        this.crossRotation = 0.0;
        //------------------------------

        //Clock
        this.clock1 = new THREE.Mesh();
        this.clock1.geometry = new THREE.BoxGeometry(20,8,3);
        this.clock1.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/lava_texture.jpg')});

        this.clock1.rotateY(Math.PI/4);
        this.clock1.position.set(-200,22,-97);

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

        //Lifes------------------------
        var heartShape = new THREE.Shape();

        heartShape.moveTo(0.0,0.0,0.0);
        heartShape.bezierCurveTo(8.0, 4.0, 4.0, 8.0, 0.0, 6.0);
        heartShape.bezierCurveTo(-4.0, 8.0, -8.0, 4.0, 0.0, 0.0);

        var geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        var heart_texture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/heart_texture2.jpg')});
        this.LifeRotation = 0.0;
        this.Life1 = new THREE.Mesh(geometry, heart_texture);
        this.Life1.rotateY(this.LifeRotation);
        this.Life1.scale.set(0.3,0.3,0.3);
        this.Life1.position.set(-180,19,-115);

        this.Life2 = new THREE.Mesh(geometry, heart_texture);
        this.Life2.rotateY(this.LifeRotation);
        this.Life2.scale.set(0.3,0.3,0.3);
        this.Life2.position.set(-49,22, 0);
        
        //-----------------------------------

        //Goal-------------------------------
        this.goal = new THREE.Mesh();
        this.goal.geometry = new THREE.BoxGeometry(0.5,8,20);
        this.goal.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/goal_texture.jpg')});
        this.goal.rotateY(Math.PI/8);
        this.goal.position.set(-200,35,-243);
        //----------------------------------

        //Trol Sphere-------------------
        this.sphere = new THREE.Mesh();
        this.sphere.material = new THREE.MeshBasicMaterial({ color: 0xFD0101 });
        this.sphere.geometry = new THREE.SphereGeometry(10, 30);

        this.spherePart1 = new THREE.Mesh();
        this.spherePart1.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/trol_texture.jpg')});
        this.spherePart1.geometry = new THREE.BoxGeometry(80,10,3);
        this.spherePart1.position.set(-70,0,0);

        this.spherePart2 = new THREE.Mesh();
        this.spherePart2.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/trol_texture.jpg')});
        this.spherePart2.geometry = new THREE.BoxGeometry(80,10,3);
        this.spherePart2.position.set(70,0,0);

        this.spherePart3 = new THREE.Mesh();
        this.spherePart3.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/trol_texture.jpg')});
        this.spherePart3.geometry = new THREE.BoxGeometry(3,10,80);
        this.spherePart3.position.set(0,0,-70);

        this.spherePart4 = new THREE.Mesh();
        this.spherePart4.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/trol_texture.jpg')});
        this.spherePart4.geometry = new THREE.BoxGeometry(3,10,80);
        this.spherePart4.position.set(0,0,70);

        this.SunOfDeath = new THREE.Mesh();

        this.SunOfDeath.add(this.sphere);
        this.SunOfDeath.add(this.spherePart1);
        this.SunOfDeath.add(this.spherePart2);
        this.SunOfDeath.add(this.spherePart3);
        this.SunOfDeath.add(this.spherePart4);

        
        this.SunOfDeath.position.set(-60,25,168);




        this.texture = 
        [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_ft.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_bk.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_up.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_dn.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_rt.jpg'),side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('imgs/criminal-impact_lf.jpg'),side: THREE.DoubleSide})  
        ];
        

        this.worldMaterial = new THREE.MeshFaceMaterial(this.texture);

        this.world = new THREE.Mesh(this.geometry, this.worldMaterial);

        this.building1Mesh = building1.toMesh();

        this.building1Mesh.rotateY(Math.PI/4);
        this.building1Mesh.position.set(0,25,-27);

        this.add(this.world);
        this.add(this.building1Mesh);
        
        this.add(cylinderMesh);
        this.add(this.cross1);
        this.add(this.clock1);
        this.add(this.zigzag1);
        this.add(this.zigzag2);
        this.add(this.zigzag3);
        this.add(this.zigzag4);
        this.add(this.Life1);
        this.add(this.Life2);
        this.add(this.goal);
        this.add(this.SunOfDeath);

        // Sonidos------------------------

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
        //--------------------------------

    }

    /**
     * Usao por la escena para obtener una lista
     * con todos los objetos con los que puede 
     * colisionar la nave
     */
    getObstacles() {
        var lista = [];

        lista.push(this.Life1);
        lista.push(this.Life2);
        lista.push(this.cross1);
        lista.push(this.clock1);
        lista.push(this.zigzag1);
        lista.push(this.zigzag2);
        lista.push(this.zigzag3);
        lista.push(this.zigzag3);
        lista.push(this.zigzag4);
        lista.push(this.spherePart1);
        lista.push(this.spherePart2);
        lista.push(this.spherePart3);
        lista.push(this.spherePart4);

        
        return lista;
    }

    /**
     * Funcion encargada de las animacion 
     * de los obstaculos de la escena 
     */
    update(){
        this.crossRotation += 0.05;
        this.clockRotation += 0.04;
        this.LifeRotation += 0.02;
        this.SunOfDeathRotation +=0.06;

        this.SunOfDeath.rotation.set(0,-this.SunOfDeathRotation,0);

        this.cross1.rotation.set(this.crossRotation,0,0);
 

        //Change clock rotation
        if(this.counter >= 200 && this.counter <=400){
            this.clock1.rotation.set(0,this.clockRotation,0);
            if(this.counter == 400)
                this.counter = 0;
        }else{
            this.clock1.rotation.set(0,-this.clockRotation,0);

        }

        if(this.counter2 >= 50 && this.counter2 <=100){
            this.zigzag1.rotation.set(0,-Math.PI/4,0);
            this.zigzag3.rotation.set(0,-Math.PI/4,0);
            this.zigzag2.rotation.set(0,Math.PI/4,0);
            this.zigzag4.rotation.set(0,Math.PI/4,0);

            if(this.counter2 == 100)
                this.counter2 = 0;
        }else{

            this.zigzag2.rotation.set(0,-Math.PI/4,0);
            this.zigzag4.rotation.set(0,-Math.PI/4,0);
            this.zigzag3.rotation.set(0,Math.PI/4,0);
            this.zigzag1.rotation.set(0,Math.PI/4,0);
        }

            
        this.counter++;
        this.counter2++;


        this.Life1.rotation.set(0,this.LifeRotation,0);
        this.Life2.rotation.set(0,this.LifeRotation,0);
    }
    
}