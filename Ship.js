class Ship extends THREE.Mesh {

    constructor(spline) {
        super();

        // Variables de control de la nave
        this.keyboard = new THREEx.KeyboardState();
        this.UI = new GUI();
        this.t = 0.0;
        this.spline = spline;
        this.lifes = 3;
        this.endGame = false
        this.movimientoLateral = 0.0;
        var texture = new THREE.TextureLoader().load('imgs/ship_texture.jpg');

        //------------------------------------
        //Inicio de creacion del objeto de la nave

        //Body, driver and frontal guns-------
        var body = new THREE.CylinderGeometry(0, 3, 30, 3);
        var driver = new THREE.SphereGeometry(3, 32, 32);
        var gun1 = new THREE.CylinderGeometry(0.2, 0.2, 7, 32);
        var gun2 = new THREE.CylinderGeometry(0.2, 0.2, 7, 32);

        body.rotateX(-Math.PI / 2);
        driver.rotateX(-Math.PI / 2);
        gun1.rotateX(-Math.PI / 2);
        gun2.rotateX(-Math.PI / 2);

        body.rotateY(-Math.PI / 2);
        driver.rotateY(-Math.PI / 2);
        gun1.rotateY(-Math.PI / 2);
        gun2.rotateY(-Math.PI / 2);

        gun1.translate(5, 1, 1);
        gun2.translate(5, 1, -1);

        driver.translate(-8, 2, 0);

        body.translate(0, 0, 0);
        body.scale(1, 1, 2.4);

        var bodybsp = new ThreeBSP(body);
        var driverbsp = new ThreeBSP(driver);
        var gun1bsp = new ThreeBSP(gun1);
        var gun2bsp = new ThreeBSP(gun2);

        //Wings and back guns----------------------

        var frontal1 = new THREE.BoxGeometry(2, 20, 0.5);
        var frontal1part = new THREE.BoxGeometry(2, 9, 0.5);
        var frontal2 = new THREE.BoxGeometry(2, 20, 0.5);
        var frontal2part = new THREE.BoxGeometry(2, 9, 0.5);
        var unionwings = new THREE.BoxGeometry(18, 3, 0.5);
        var gun3 = new THREE.CylinderGeometry(0.2, 0.2, 7, 32);
        var gun4 = new THREE.CylinderGeometry(0.2, 0.2, 7, 32);
        var back1part = new THREE.BoxGeometry(9, 4, 0.5);
        var back2part = new THREE.BoxGeometry(9, 4, 0.5);

        frontal1.rotateX(-Math.PI / 2);
        frontal1part.rotateX(-Math.PI / 2);
        frontal2.rotateX(-Math.PI / 2);
        frontal2part.rotateX(-Math.PI / 2);
        unionwings.rotateX(-Math.PI / 2);
        gun3.rotateX(-Math.PI / 2);
        gun4.rotateX(-Math.PI / 2);
        back1part.rotateX(-Math.PI / 2);
        back2part.rotateX(-Math.PI / 2);

        frontal1.rotateY(-Math.PI / 2);
        frontal1part.rotateY(-Math.PI / 2);
        frontal2.rotateY(-Math.PI / 2);
        frontal2part.rotateY(-Math.PI / 2);
        unionwings.rotateY(-Math.PI / 2);
        gun3.rotateY(-Math.PI / 2);
        gun4.rotateY(-Math.PI / 2);
        back1part.rotateY(-Math.PI / 2);
        back2part.rotateY(-Math.PI / 2);


        frontal1.translate(0, 0, -9);
        frontal1part.translate(5, 0, 11.7);
        frontal1part.rotateY(Math.PI / 10);

        frontal2.translate(0, 0, 9);
        frontal2part.translate(5, 0, -11.7);
        frontal2part.rotateY(-Math.PI / 10);

        back1part.rotateY(-Math.PI / 4);
        back2part.rotateY(Math.PI / 4);
        back1part.translate(-9, 0, -11);
        back2part.translate(-9, 0, 11);


        unionwings.translate(-8.5, 0, 0);

        gun3.translate(-4, 0, 6);
        gun4.translate(-4, 0, -6);


        var frontal1bsp = new ThreeBSP(frontal1);
        var frontal1partbsp = new ThreeBSP(frontal1part);
        var frontal2bsp = new ThreeBSP(frontal2);
        var frontal2partbsp = new ThreeBSP(frontal2part);
        var unionwingsbsp = new ThreeBSP(unionwings);
        var gun3bsp = new ThreeBSP(gun3);
        var gun4bsp = new ThreeBSP(gun4);
        var back1partbsp = new ThreeBSP(back1part);
        var back2partbsp = new ThreeBSP(back2part);

        //Boosters----------------------
        var booster1 = new THREE.CylinderGeometry(1.8, 1.8, 2, 32, 32);
        var booster1deep = new THREE.CylinderGeometry(1.6, 1.6, 2, 32);
        var booster2 = new THREE.CylinderGeometry(1, 1, 2, 32, 32);
        var booster2deep = new THREE.CylinderGeometry(0.8, 0.8, 2, 32, 32);
        var booster3 = new THREE.CylinderGeometry(1, 1, 2, 32, 32);
        var booster3deep = new THREE.CylinderGeometry(0.8, 0.8, 2, 32, 32);

        booster1.rotateX(-Math.PI / 2);
        booster1deep.rotateX(-Math.PI / 2);
        booster2.rotateX(-Math.PI / 2);
        booster2deep.rotateX(-Math.PI / 2);
        booster3.rotateX(-Math.PI / 2);
        booster3deep.rotateX(-Math.PI / 2);

        booster1.rotateY(-Math.PI / 2);
        booster1deep.rotateY(-Math.PI / 2);
        booster2.rotateY(-Math.PI / 2);
        booster2deep.rotateY(-Math.PI / 2);
        booster3.rotateY(-Math.PI / 2);
        booster3deep.rotateY(-Math.PI / 2);


        booster1.translate(-16, 0.5, 0);
        booster1deep.translate(-16, 0.5, 0);
        booster2.translate(-16, -0.5, 3);
        booster2deep.translate(-16, -0.5, 3);
        booster3.translate(-16, -0.5, -3);
        booster3deep.translate(-16, -0.5, -3);

        var booster1bsp = new ThreeBSP(booster1);
        var booster1deepbsp = new ThreeBSP(booster1deep);
        var booster2bsp = new ThreeBSP(booster2);
        var booster2deepbsp = new ThreeBSP(booster2deep);
        var booster3bsp = new ThreeBSP(booster3);
        var booster3deepbsp = new ThreeBSP(booster3deep);

        var wings = unionwingsbsp.union(gun3bsp).union(gun4bsp).union(frontal2bsp.subtract(frontal2partbsp)).union(frontal1bsp.subtract(frontal1partbsp)).subtract(back1partbsp).subtract(back2partbsp);
        var boosters = booster2bsp.subtract(booster2deepbsp).union(booster1bsp.subtract(booster1deepbsp)).union(booster3bsp.subtract(booster3deepbsp));
        var bodyMesh = bodybsp.union(driverbsp).union(gun1bsp).union(gun2bsp).union(wings).union(boosters);

        var material = new THREE.MeshBasicMaterial({ map: texture });
        this.ship = bodyMesh.toMesh();
        this.ship.material = material;

        this.ship.scale.set(0.1, 0.1, 0.1);

        // Fin de creacion del objeto
        //------------------------------------        

        // Camara del objeto
        this.camera = this.createCamera();
        this.ship.add(this.camera);
        this.ship.position.set(-0.581841 * 20, (0.151374 * 20) + 22, -1.466418 * 20);
        this.add(this.ship);


        // Posicion iniical de la nave al comenzar el juego (en la meta)
        var posicion = this.spline.getPointAt(0.7540000000000006);
        this.ship.position.copy(posicion);
        var tangente = this.spline.getTangentAt(0.7540000000000006);
        posicion.add(tangente);
        this.ship.lookAt(posicion);
        this.ship.rotateY(-Math.PI / 2);
        this.t = 0.7540000000000006

        // Inicio de la carrera
        this.cronometroIniciado = false;
    }

    /**
     * Funcion que crea la camara de la escena
     * Esta siempre siguira el movimiento de la nave
     */
    createCamera() {
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000000);
        // También se indica dónde se coloca
        camera.position.set(this.ship.position.x - 150, this.ship.position.y + 20, this.ship.position.z);
        // Y hacia dónde mira
        var look = new THREE.Vector3(this.ship.position.x, this.ship.position.y, this.ship.position.z);
        camera.lookAt(look);

        return camera;
    }

    /**
     * Utilizado por la escena para pasarle
     * la camara al render
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Utilizado por la escena para el control
     * de colisiones. Devuelve el objeto que
     * representa la nave
     */
    getShip() {
        return this.ship;
    }


    /**
     * Funcion encargada del movimiento de la nave
     * Esta consiste en coger un punto del spline
     * que define el camino de la nave y colocar la 
     * nave en ese punto. La nave se orienta a la 
     * tangente de ese punto. Ademas, mueve la nave
     * de izquierda a derecha
     */
    run() {
        var posicion = this.spline.getPointAt(this.t);
        this.ship.position.copy(posicion);
        var tangente = this.spline.getTangentAt(this.t);
        posicion.add(tangente);

        this.ship.lookAt(posicion);
        this.t += 0.001;
        this.ship.rotateY(-Math.PI / 2);

        if (this.t >= 1)
            this.t = 0.0;

        this.ship.translateZ(this.movimientoLateral);

        if (!this.cronometroIniciado) {
            this.UI.cronometroStart();
            this.cronometroIniciado = true;
        }
    }

    /**
     * Funcion que permite a la nave moverse 
     * a la izquierda dentro del limite de la pista
     */
    left() {
        this.movimientoLateral -= 0.5;

        if (this.movimientoLateral <= -9)
            this.movimientoLateral = -9.0;
    }

    /**
     * Funcion que permite a la nave moverse
     * a la derecha dentro del limite de la pista
     */
    right() {
        this.movimientoLateral += 0.5;

        if (this.movimientoLateral >= 9)
            this.movimientoLateral = 9.0;
    }

    /**
     * Funcion que permite a la nave moverse
     * a la izquierda sin necesidad de estar
     * avanzando
     */
    leftOnly() {
        this.ship.translateZ(-0.3);
        this.movimientoLateral -= 0.3;
    }

    /**
     * Funcion que permite a la nave moverse
     * a la derecha sin necesidad de estar 
     * avanzando
     */
    rightOnly() {
        this.ship.translateZ(0.3);
        this.movimientoLateral += 0.3;
    }

    /**
     * Usado por el listener de colision de
     * la nave para actualizar la interfaz
     * cuando la nave pierde una vida
     */
    lostLife() {
        this.UI.lostLife();
        this.lifes--;
    }


    /**
     * Usado por el listener de colision de
     * la nave para actualizar la interfaz
     * cuando la nave gana una vida
     */
    winLife() {
        this.UI.winLife();
        this.lifes++;
    }

    /**
     * Funcion que actualiza el estado de
     * la nave segun los eventos del teclado
     * Ademas actualiza la interfaz
     */
    update() {

        //Ship controls-------------------------------
        if(this.lifes != 0 && !this.endGame)
        {
            if (this.keyboard.pressed("up+left")) {
                this.run();
                this.left();
            }
            else if (this.keyboard.pressed("up+right")) {
                this.run();
                this.right();
            }
            else if (this.keyboard.pressed("up"))
                this.run();
            else if (this.keyboard.pressed("left"))
                this.leftOnly();
            else if (this.keyboard.pressed("right"))
                this.rightOnly();
    
    
            // Actualizacion del cronometro y vidas
            this.UI.update();
        }
        else
        {
            this.UI.endGame();
            this.endGame = true;

            if(this.keyboard.pressed("R"))
                location.reload(true);
        }

        console.log(this.t);
    }

}
