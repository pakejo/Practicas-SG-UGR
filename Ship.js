class Ship extends THREE.Mesh {

    constructor(){
        super();
        this.Clock = new THREE.Clock();
        this.delta = this.Clock.getDelta();
        this.movement = 50*this.delta;
        this.keyboard = new THREEx.KeyboardState();
        this.Speed = 1.0;

        var material = new THREE.MeshNormalMaterial();
        
       
        //Body, driver and frontal guns-------
        var body = new THREE.CylinderGeometry(0,3,30,3);
        var driver = new THREE.SphereGeometry(3,32,32);
        var gun1 = new THREE.CylinderGeometry(0.2,0.2,7,32);
        var gun2 = new THREE.CylinderGeometry(0.2,0.2,7,32);
        
        gun1.translate(1,16.5,-0.3);
        gun2.translate(-1,16.5,-0.3);

        driver.translate(0,-5,1.75);

        body.translate(0,5,0);
        body.scale(2.4,1,1);

        var bodybsp = new ThreeBSP(body);
        var driverbsp = new ThreeBSP(driver);
        var gun1bsp = new ThreeBSP(gun1);
        var gun2bsp = new ThreeBSP(gun2);

        //-------------------------------

        //Wings and back guns----------------------

        var frontal1 = new THREE.BoxGeometry(2,20,0.5);
        var frontal1part = new THREE.BoxGeometry(2,9,0.5);
        var frontal2 = new THREE.BoxGeometry(2,20,0.5);
        var frontal2part = new THREE.BoxGeometry(2,9,0.5);
        var unionwings = new THREE.BoxGeometry(18,3,0.5);
        var gun3 = new THREE.CylinderGeometry(0.2,0.2,7,32);
        var gun4 = new THREE.CylinderGeometry(0.2,0.2,7,32);
        var back1part = new THREE.BoxGeometry(9,4,0.5);
        var back2part = new THREE.BoxGeometry(9,4,0.5);


        frontal1.translate(-9,0,0);
        frontal1part.translate(-12,4,0);
        frontal1part.rotateZ(-Math.PI/10);

        frontal2.translate(9,0,0);
        frontal2part.translate(12,4,0);
        frontal2part.rotateZ(Math.PI/10);

        back1part.rotateZ(-Math.PI/4);
        back2part.rotateZ(Math.PI/4);
        back1part.translate(-9,-9,0);
        back2part.translate(9,-9,0);


        unionwings.translate(0,-6.5,0);

        gun3.translate(6,-4,-0.3);
        gun4.translate(-6,-4,-0.3);


        var frontal1bsp = new ThreeBSP(frontal1);
        var frontal1partbsp = new ThreeBSP(frontal1part);
        var frontal2bsp = new ThreeBSP(frontal2);
        var frontal2partbsp = new ThreeBSP(frontal2part);
        var unionwingsbsp = new ThreeBSP(unionwings);
        var gun3bsp = new ThreeBSP(gun3);
        var gun4bsp = new ThreeBSP(gun4);
        var back1partbsp = new ThreeBSP(back1part);
        var back2partbsp = new ThreeBSP(back2part);

        //-----------------------------

        //Boosters----------------------
        var booster1 = new THREE.CylinderGeometry(1.8,1.8,2,32,32);
        var booster1deep = new THREE.CylinderGeometry(1.6,1.6,2,32);
        var booster2 = new THREE.CylinderGeometry(1,1,2,32,32);
        var booster2deep = new THREE.CylinderGeometry(0.8,0.8,2,32,32);
        var booster3 = new THREE.CylinderGeometry(1,1,2,32,32);
        var booster3deep = new THREE.CylinderGeometry(0.8,0.8,2,32,32);

        booster1.translate(0,-11,0.5);
        booster1deep.translate(0,-11,0.5);
        booster2.translate(-3,-11,-0.5);
        booster2deep.translate(-3,-11,-0.5);
        booster3.translate(3,-11,-0.5);
        booster3deep.translate(3,-11,-0.5);

        var booster1bsp = new ThreeBSP(booster1);
        var booster1deepbsp = new ThreeBSP(booster1deep);
        var booster2bsp = new ThreeBSP(booster2);
        var booster2deepbsp = new ThreeBSP(booster2deep);
        var booster3bsp = new ThreeBSP(booster3);
        var booster3deepbsp = new ThreeBSP(booster3deep);

        

        var wings = unionwingsbsp.union(gun3bsp).union(gun4bsp).union(frontal2bsp.subtract(frontal2partbsp).union((frontal1bsp).subtract(frontal1partbsp))).subtract(back1partbsp).subtract(back2partbsp);
        var boosters = booster2bsp.subtract(booster2deepbsp).union(booster1bsp.subtract(booster1deepbsp)).union(booster3bsp.subtract(booster3deepbsp));
        var bodyMesh = bodybsp.union(driverbsp).union(gun1bsp).union(gun2bsp).union(wings).union(boosters);
       
        this.ship = bodyMesh.toMesh(material);

        this.ship.rotateX(-Math.PI/2);
        this.ship.scale.set(0.1,0.1,0.1);

        this.ship.updateMorphTargets();
        
        this.ship.position.set( -0.581841*20, (0.151374*20) +1 , -1.466418*20 );

        this.add(this.ship);


        // Camara del objeto
        this.camera = this.createCamera();
        this.ship.add(this.camera);


    }

    createCamera() {
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000000);
        // También se indica dónde se coloca
        camera.position.set(this.ship.position.x, this.ship.position.z - 150, this.ship.position.y + 20);
        // Y hacia dónde mira
        var look = new THREE.Vector3(this.ship.position.x, this.ship.position.y , this.ship.position.z);
        camera.lookAt(look);

        return camera;
    }

    getCamera() {
        return this.camera;
    }

    run(){
        this.delta = this.Clock.getDelta();
        this.movement = 50*this.delta;
        this.ship.translateY(this.movement*this.Speed);

        //this.ship.applyMatrix(new THREE.Matrix4().makeTranslation(this.ship.position.x, this.movement*this.Speed, this.ship.position.z) );
    }

    left(){
        this.delta = this.Clock.getDelta();
        this.movement = 50*this.delta;
        this.ship.rotation.z +=this.delta*2;
        
    }
    
    right(){
        this.delta = this.Clock.getDelta();
        this.movement = 50*this.delta;
        this.ship.rotation.z -= this.delta*2;
        
    }

    brake(){
        this.delta = this.Clock.getDelta();
        this.movement = 50*this.delta;
        this.ship.translateY(-this.movement);
    }

    update(){
        
        //Ship controls--------------------------------
        if(this.keyboard.pressed("up+left")){
            this.delta = this.Clock.getDelta();
            this.movement = 50*this.delta;
            this.ship.translateY(this.movement*this.Speed);
            this.ship.rotation.z +=this.delta*1.5;
        }

        if(this.keyboard.pressed("up+right")){
            this.delta = this.Clock.getDelta();
            this.movement = 50*this.delta;
            this.ship.translateY(this.movement*this.Speed);
            this.ship.rotation.z -= this.delta*1.5;
        }

        if(this.keyboard.pressed("down+left")){
            this.delta = this.Clock.getDelta();
            this.movement = 50*this.delta;
            this.ship.translateY(-this.movement*this.Speed);
            this.ship.rotation.z -= this.delta*1.5;
        }

        if(this.keyboard.pressed("down+right")){
            this.delta = this.Clock.getDelta();
            this.movement = 50*this.delta;
            this.ship.translateY(-this.movement);
            this.ship.rotation.z += this.delta*1.5;
        }

        //Air Breakers-----
        if(this.keyboard.pressed("up+a")){
            if(this.Speed > 0.0)
                this.Speed -= 0.1;

            this.delta = this.Clock.getDelta();
            this.movement = 50*this.delta;
            this.ship.translateY(this.movement*this.Speed);
            this.ship.rotation.z +=this.delta*2;
        }

        if(this.keyboard.pressed("up+d")){
            if(this.Speed > 0.0)
                this.Speed -= 0.1;

            this.delta = this.Clock.getDelta();
            this.movement = 50*this.delta;
            this.ship.translateY(this.movement*this.Speed);
            this.ship.rotation.z -=this.delta*2;
        }
        //------------------


        if(this.keyboard.pressed("right"))
        this.right();

        if(this.keyboard.pressed("left"))
        this.left();

        if(this.keyboard.pressed("up")){
            if(this.Speed <= 10.0)
                this.Speed +=0.02;

            this.run();
        }

        if(this.keyboard.pressed("down"))
        this.brake();

        if(!this.keyboard.pressed("up")){
            if(this.Speed > 0.0)
                this.Speed -= 0.01;
            else{
                this.delta = this.Clock.getDelta();
                this.movement = 50*this.delta;
                this.ship.translateY(this.movement*this.Speed);
            }
        }

        // Camino por el spline
        var time = Date.now();
        var looptime = 20000;
        var t = (time % looptime) / looptime;
        var spline = this.spline();

        var posicion = spline.getPointAt(t);
        this.ship.position.copy(posicion);
        var tangente = spline.getTangentAt(t);
        posicion.add(tangente);
        


    }

    spline() {

        var escala = 90;
        var yAxis = 4.3;

        var spline = new THREE.CatmullRomCurve3([

            new THREE.Vector3( -0.581841*escala, (0.151374*escala)+yAxis, -1.466418*escala),
            new THREE.Vector3( -0.530919*escala, (0.151374*escala)+yAxis, -1.491239*escala),
            new THREE.Vector3( -0.473851*escala, (0.151374*escala)+yAxis, -1.518598*escala),
            new THREE.Vector3( -0.411905*escala, (0.151374*escala)+yAxis, -1.547598*escala),
            new THREE.Vector3( -0.346348*escala, (0.151374*escala)+yAxis, -1.577346*escala),
            new THREE.Vector3( -0.278450*escala, (0.151374*escala)+yAxis, -1.606946*escala),
            new THREE.Vector3( -0.209477*escala, (0.151374*escala)+yAxis, -1.635502*escala),
            new THREE.Vector3( -0.140699*escala, (0.151374*escala)+yAxis, -1.662122*escala),
            new THREE.Vector3( -0.073383*escala, (0.151374*escala)+yAxis, -1.685908*escala),
            new THREE.Vector3( -0.008798*escala, (0.151374*escala)+yAxis, -1.705966*escala),
            new THREE.Vector3( 0.051789*escala, (0.151374*escala)+yAxis, -1.721402*escala),
            new THREE.Vector3( 0.107109*escala, (0.151374*escala)+yAxis, -1.731319*escala),
            new THREE.Vector3( 0.155894*escala, (0.151374*escala)+yAxis, -1.734824*escala),
            new THREE.Vector3( 0.212901*escala, (0.151374*escala)+yAxis, -1.734848*escala),
            new THREE.Vector3( 0.290930*escala, (0.151374*escala)+yAxis, -1.734914*escala),
            new THREE.Vector3( 0.385775*escala, (0.151374*escala)+yAxis, -1.735013*escala),
            new THREE.Vector3( 0.493233*escala, (0.151374*escala)+yAxis, -1.735138*escala),
            new THREE.Vector3( 0.609099*escala, (0.151374*escala)+yAxis, -1.735280*escala),
            new THREE.Vector3( 0.729170*escala, (0.151374*escala)+yAxis, -1.735430*escala),
            new THREE.Vector3( 0.849240*escala, (0.151374*escala)+yAxis, -1.735580*escala),
            new THREE.Vector3( 0.965107*escala, (0.151374*escala)+yAxis, -1.735722*escala),
            new THREE.Vector3( 1.072564*escala, (0.151374*escala)+yAxis, -1.735847*escala),
            new THREE.Vector3( 1.167410*escala, (0.151374*escala)+yAxis, -1.735946*escala),
            new THREE.Vector3( 1.245438*escala, (0.151374*escala)+yAxis, -1.736012*escala),
            new THREE.Vector3( 1.302445*escala, (0.151374*escala)+yAxis, -1.736036*escala),
            new THREE.Vector3( 1.353498*escala, (0.151374*escala)+yAxis, -1.732632*escala),
            new THREE.Vector3( 1.414356*escala, (0.151374*escala)+yAxis, -1.721685*escala),
            new THREE.Vector3( 1.481851*escala, (0.151374*escala)+yAxis, -1.702090*escala),
            new THREE.Vector3( 1.552814*escala, (0.151374*escala)+yAxis, -1.672743*escala),
            new THREE.Vector3( 1.624078*escala, (0.151374*escala)+yAxis, -1.632539*escala),
            new THREE.Vector3( 1.692475*escala, (0.151374*escala)+yAxis, -1.580374*escala),
            new THREE.Vector3( 1.754838*escala, (0.151374*escala)+yAxis, -1.515143*escala),
            new THREE.Vector3( 1.807998*escala, (0.151374*escala)+yAxis, -1.435742*escala),
            new THREE.Vector3( 1.848788*escala, (0.151374*escala)+yAxis, -1.341067*escala),
            new THREE.Vector3( 1.874040*escala, (0.151374*escala)+yAxis, -1.230013*escala),
            new THREE.Vector3( 1.880586*escala, (0.151374*escala)+yAxis, -1.101476*escala),
            new THREE.Vector3( 1.865258*escala, (0.151374*escala)+yAxis, -0.954352*escala),
            new THREE.Vector3( 1.836907*escala, (0.161772*escala)+yAxis, -0.886967*escala),
            new THREE.Vector3( 1.777303*escala, (0.190429*escala)+yAxis, -0.809552*escala),
            new THREE.Vector3( 1.692091*escala, (0.233540*escala)+yAxis, -0.722557*escala),
            new THREE.Vector3( 1.586918*escala, (0.287299*escala)+yAxis, -0.626436*escala),
            new THREE.Vector3( 1.467431*escala, (0.347901*escala)+yAxis, -0.521639*escala),
            new THREE.Vector3( 1.339276*escala, (0.411540*escala)+yAxis, -0.408618*escala),
            new THREE.Vector3( 1.208100*escala, (0.474411*escala)+yAxis, -0.287826*escala),
            new THREE.Vector3( 1.079548*escala, (0.532710*escala)+yAxis, -0.159714*escala),
            new THREE.Vector3( 0.959268*escala, (0.582629*escala)+yAxis, -0.024733*escala),
            new THREE.Vector3( 0.852906*escala, (0.620364*escala)+yAxis, 0.116663*escala),
            new THREE.Vector3( 0.766108*escala, (0.642110*escala)+yAxis, 0.264024*escala),
            new THREE.Vector3( 0.704521*escala, (0.644061*escala)+yAxis, 0.416898*escala),
            new THREE.Vector3( 0.670674*escala, (0.628213*escala)+yAxis, 0.527258*escala),
            new THREE.Vector3( 0.643261*escala, (0.597394*escala)+yAxis, 0.614616*escala),
            new THREE.Vector3( 0.621163*escala, (0.554719*escala)+yAxis, 0.684126*escala),
            new THREE.Vector3( 0.603262*escala, (0.503307*escala)+yAxis, 0.740941*escala),
            new THREE.Vector3( 0.588441*escala, (0.446272*escala)+yAxis, 0.790216*escala),
            new THREE.Vector3( 0.575580*escala, (0.386731*escala)+yAxis, 0.837104*escala),
            new THREE.Vector3( 0.563563*escala, (0.327801*escala)+yAxis, 0.886760*escala),
            new THREE.Vector3( 0.551270*escala, (0.272597*escala)+yAxis, 0.944337*escala),
            new THREE.Vector3( 0.537584*escala, (0.224237*escala)+yAxis, 1.014989*escala),
            new THREE.Vector3( 0.521387*escala, (0.185835*escala)+yAxis, 1.103870*escala),
            new THREE.Vector3( 0.501560*escala, (0.160509*escala)+yAxis, 1.216133*escala),
            new THREE.Vector3( 0.476986*escala, (0.151374*escala)+yAxis, 1.356933*escala),
            new THREE.Vector3( 0.457873*escala, (0.151374*escala)+yAxis, 1.422878*escala),
            new THREE.Vector3( 0.422863*escala, (0.151374*escala)+yAxis, 1.494418*escala),
            new THREE.Vector3( 0.372924*escala, (0.151374*escala)+yAxis, 1.568767*escala),
            new THREE.Vector3( 0.309023*escala, (0.151374*escala)+yAxis, 1.643141*escala),
            new THREE.Vector3( 0.232130*escala, (0.151374*escala)+yAxis, 1.714753*escala),
            new THREE.Vector3( 0.143211*escala, (0.151374*escala)+yAxis, 1.780818*escala),
            new THREE.Vector3( 0.043236*escala, (0.151374*escala)+yAxis, 1.838551*escala),
            new THREE.Vector3( -0.066827*escala, (0.151374*escala)+yAxis, 1.885166*escala),
            new THREE.Vector3( -0.186011*escala, (0.151374*escala)+yAxis, 1.917878*escala),
            new THREE.Vector3( -0.313348*escala, (0.151374*escala)+yAxis, 1.933901*escala),
            new THREE.Vector3( -0.447869*escala, (0.151374*escala)+yAxis, 1.930449*escala),
            new THREE.Vector3( -0.588606*escala, (0.151374*escala)+yAxis, 1.904738*escala),
            new THREE.Vector3( -0.884194*escala, (0.151374*escala)+yAxis, 1.776403*escala),
            new THREE.Vector3( -1.051511*escala, (0.151374*escala)+yAxis, 1.591457*escala),
            new THREE.Vector3( -1.107355*escala, (0.151374*escala)+yAxis, 1.361570*escala),
            new THREE.Vector3( -1.068526*escala, (0.151374*escala)+yAxis, 1.098412*escala),
            new THREE.Vector3( -0.951820*escala, (0.151374*escala)+yAxis, 0.813653*escala),
            new THREE.Vector3( -0.774037*escala, (0.151374*escala)+yAxis, 0.518961*escala),
            new THREE.Vector3( -0.551975*escala, (0.151374*escala)+yAxis, 0.226007*escala),
            new THREE.Vector3( -0.302433*escala, (0.151374*escala)+yAxis, -0.053541*escala),
            new THREE.Vector3( -0.042208*escala, (0.151374*escala)+yAxis, -0.308012*escala),
            new THREE.Vector3( 0.211900*escala, (0.151374*escala)+yAxis, -0.525737*escala),
            new THREE.Vector3( 0.443094*escala, (0.151374*escala)+yAxis, -0.695045*escala),
            new THREE.Vector3( 0.634574*escala, (0.151374*escala)+yAxis, -0.804268*escala),
            new THREE.Vector3( 0.716175*escala, (0.151374*escala)+yAxis, -0.841553*escala),
            new THREE.Vector3( 0.789126*escala, (0.151374*escala)+yAxis, -0.875894*escala),
            new THREE.Vector3( 0.853673*escala, (0.151374*escala)+yAxis, -0.908037*escala),
            new THREE.Vector3( 0.910064*escala, (0.151374*escala)+yAxis, -0.938728*escala),
            new THREE.Vector3( 0.958546*escala, (0.151374*escala)+yAxis, -0.968711*escala),
            new THREE.Vector3( 0.999368*escala, (0.151374*escala)+yAxis, -0.998732*escala),
            new THREE.Vector3( 1.032775*escala, (0.151374*escala)+yAxis, -1.029536*escala),
            new THREE.Vector3( 1.059017*escala, (0.151374*escala)+yAxis, -1.061869*escala),
            new THREE.Vector3( 1.078339*escala, (0.151374*escala)+yAxis, -1.096476*escala),
            new THREE.Vector3( 1.090991*escala, (0.151374*escala)+yAxis, -1.134102*escala),
            new THREE.Vector3( 1.097218*escala, (0.151374*escala)+yAxis, -1.175493*escala),
            new THREE.Vector3( 1.097269*escala, (0.151374*escala)+yAxis, -1.221393*escala),
            new THREE.Vector3( 1.091391*escala, (0.154283*escala)+yAxis, -1.269401*escala),
            new THREE.Vector3( 1.079831*escala, (0.162326*escala)+yAxis, -1.316661*escala),
            new THREE.Vector3( 1.062838*escala, (0.174477*escala)+yAxis, -1.363239*escala),
            new THREE.Vector3( 1.040658*escala, (0.189707*escala)+yAxis, -1.409202*escala),
            new THREE.Vector3( 1.013538*escala, (0.206992*escala)+yAxis, -1.454616*escala),
            new THREE.Vector3( 0.981727*escala, (0.225303*escala)+yAxis, -1.499547*escala),
            new THREE.Vector3( 0.945472*escala, (0.243614*escala)+yAxis, -1.544061*escala),
            new THREE.Vector3( 0.905020*escala, (0.260898*escala)+yAxis, -1.588225*escala),
            new THREE.Vector3( 0.860618*escala, (0.276129*escala)+yAxis, -1.632105*escala),
            new THREE.Vector3( 0.812515*escala, (0.288279*escala)+yAxis, -1.675767*escala),
            new THREE.Vector3( 0.760957*escala, (0.296322*escala)+yAxis, -1.719278*escala),
            new THREE.Vector3( 0.706192*escala, (0.299231*escala)+yAxis, -1.762703*escala),
            new THREE.Vector3( 0.648468*escala, (0.296322*escala)+yAxis, -1.808450*escala),
            new THREE.Vector3( 0.588032*escala, (0.288279*escala)+yAxis, -1.858137*escala),
            new THREE.Vector3( 0.525131*escala, (0.276129*escala)+yAxis, -1.910654*escala),
            new THREE.Vector3( 0.460012*escala, (0.260898*escala)+yAxis, -1.964889*escala),
            new THREE.Vector3( 0.392924*escala, (0.243614*escala)+yAxis, -2.019731*escala),
            new THREE.Vector3( 0.324114*escala, (0.225303*escala)+yAxis, -2.074068*escala),
            new THREE.Vector3( 0.253829*escala, (0.206992*escala)+yAxis, -2.126789*escala),
            new THREE.Vector3( 0.182317*escala, (0.189707*escala)+yAxis, -2.176782*escala),
            new THREE.Vector3( 0.109825*escala, (0.174477*escala)+yAxis, -2.222935*escala),
            new THREE.Vector3( 0.036600*escala, (0.162326*escala)+yAxis, -2.264137*escala),
            new THREE.Vector3( -0.037110*escala, (0.154283*escala)+yAxis, -2.299277*escala),
            new THREE.Vector3( -0.111057*escala, (0.151374*escala)+yAxis, -2.327243*escala),
            new THREE.Vector3( -0.184994*escala, (0.151374*escala)+yAxis, -2.350126*escala),
            new THREE.Vector3( -0.258674*escala, (0.151374*escala)+yAxis, -2.370692*escala),
            new THREE.Vector3( -0.331850*escala, (0.151374*escala)+yAxis, -2.388843*escala),
            new THREE.Vector3( -0.404273*escala, (0.151374*escala)+yAxis, -2.404477*escala),
            new THREE.Vector3( -0.475696*escala, (0.151374*escala)+yAxis, -2.417495*escala),
            new THREE.Vector3( -0.545872*escala, (0.151374*escala)+yAxis, -2.427797*escala),
            new THREE.Vector3( -0.614553*escala, (0.151374*escala)+yAxis, -2.435282*escala),
            new THREE.Vector3( -0.681493*escala, (0.151374*escala)+yAxis, -2.439852*escala),
            new THREE.Vector3( -0.746442*escala, (0.151374*escala)+yAxis, -2.441405*escala),
            new THREE.Vector3( -0.809155*escala, (0.151374*escala)+yAxis, -2.439842*escala),
            new THREE.Vector3( -0.869384*escala, (0.151374*escala)+yAxis, -2.435062*escala),
            new THREE.Vector3( -0.926880*escala, (0.151374*escala)+yAxis, -2.426967*escala),
            new THREE.Vector3( -1.284459*escala, (0.151374*escala)+yAxis, -2.355186*escala),
            new THREE.Vector3( -1.612595*escala, (0.151374*escala)+yAxis, -2.270968*escala),
            new THREE.Vector3( -1.910785*escala, (0.151374*escala)+yAxis, -2.176063*escala),
            new THREE.Vector3( -2.178525*escala, (0.151374*escala)+yAxis, -2.072217*escala),
            new THREE.Vector3( -2.415309*escala, (0.151374*escala)+yAxis, -1.961179*escala),
            new THREE.Vector3( -2.620634*escala, (0.151374*escala)+yAxis, -1.844697*escala),
            new THREE.Vector3( -2.793994*escala, (0.151374*escala)+yAxis, -1.724518*escala),
            new THREE.Vector3( -2.934886*escala, (0.151374*escala)+yAxis, -1.602392*escala),
            new THREE.Vector3( -3.042805*escala, (0.151374*escala)+yAxis, -1.480066*escala),
            new THREE.Vector3( -3.117246*escala, (0.151374*escala)+yAxis, -1.359288*escala),
            new THREE.Vector3( -3.157705*escala, (0.151374*escala)+yAxis, -1.241805*escala),
            new THREE.Vector3( -3.163678*escala, (0.151374*escala)+yAxis, -1.129367*escala),
            new THREE.Vector3( -3.137957*escala, (0.150825*escala)+yAxis, -0.998419*escala),
            new THREE.Vector3( -3.091908*escala, (0.149307*escala)+yAxis, -0.890629*escala),
            new THREE.Vector3( -3.027354*escala, (0.147015*escala)+yAxis, -0.804856*escala),
            new THREE.Vector3( -2.946115*escala, (0.144141*escala)+yAxis, -0.739958*escala),
            new THREE.Vector3( -2.850015*escala, (0.140880*escala)+yAxis, -0.694796*escala),
            new THREE.Vector3( -2.740871*escala, (0.137425*escala)+yAxis, -0.668228*escala),
            new THREE.Vector3( -2.620508*escala, (0.133970*escala)+yAxis, -0.659113*escala),
            new THREE.Vector3( -2.490745*escala, (0.130709*escala)+yAxis, -0.666310*escala),
            new THREE.Vector3( -2.353405*escala, (0.127835*escala)+yAxis, -0.688679*escala),
            new THREE.Vector3( -2.210307*escala, (0.125542*escala)+yAxis, -0.725078*escala),
            new THREE.Vector3( -2.063274*escala, (0.124025*escala)+yAxis, -0.774366*escala),
            new THREE.Vector3( -1.914126*escala, (0.123476*escala)+yAxis, -0.835403*escala),
            new THREE.Vector3( -1.759417*escala, (0.124025*escala)+yAxis, -0.904916*escala),
            new THREE.Vector3( -1.605143*escala, (0.125542*escala)+yAxis, -0.975495*escala),
            new THREE.Vector3( -1.453555*escala, (0.127835*escala)+yAxis, -1.045896*escala),
            new THREE.Vector3( -1.306905*escala, (0.130709*escala)+yAxis, -1.114876*escala),
            new THREE.Vector3( -1.167448*escala, (0.133970*escala)+yAxis, -1.181193*escala),
            new THREE.Vector3( -1.037435*escala, (0.137425*escala)+yAxis, -1.243603*escala),
            new THREE.Vector3( -0.919120*escala, (0.140880*escala)+yAxis, -1.300864*escala),
            new THREE.Vector3( -0.814754*escala, (0.144141*escala)+yAxis, -1.351732*escala),
            new THREE.Vector3( -0.726590*escala, (0.147015*escala)+yAxis, -1.394965*escala),
            new THREE.Vector3( -0.656882*escala, (0.149307*escala)+yAxis, -1.429318*escala),
            new THREE.Vector3( -0.607881*escala, (0.150825*escala)+yAxis, -1.453551*escala),
        ])

        return spline;
    }
}
