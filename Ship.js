class Ship extends THREE.Mesh {

    constructor(){
        super();

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
       
        var ship = bodyMesh.toMesh(material);

        //ship.scale(0.5,0.5,0.5);
        this.add(ship);
    }

    update(){

    }


}