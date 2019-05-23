
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor(unRenderer) {
    super();

    // Control de colisiones
    this.colliders = [];

    // Iluminacion de la escena
    this.createLights();

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera(unRenderer);

    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);

    // Por último creamos el objeto de revolucion, como una instancia de una clase propia, que gestionará su creación y la interacción con la misma
    this.world = new World();
    this.add(this.world);

    this.track = new Track();
    this.add(this.track);

    this.ship = new Ship(this.track.spline());
    this.add(this.ship);



  }

  createCamera(unRenderer) {
    //-----Quitar el */ para poner la camara de la nave linea 43 y 62


    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000);
    // También se indica dónde se coloca
    this.camera.position.set(20, 10, 20);
    // Y hacia dónde mira
    //var look = new THREE.Vector3(0, 0, 0);
    //this.camera.lookAt(look);
    this.add(this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls(this.camera, unRenderer);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    //this.cameraControl.target = look;

    //------------------------------------

   /*// Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400000);
    // También se indica dónde se coloca
    this.camera.position.set(-150,25,-150);
    // Y hacia dónde mira
    var look = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(look);
    this.add(this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls(this.camera, unRenderer);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;*/
  }

  createLights() {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 2);
    // La añadimos a la escena
    this.add(ambientLight);

    var light = new THREE.PointLight( 0xff0000, 1, 100 ); 
    light.position.set( 500, 500, 500 ); 
    this.add( light );

  }

  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.ship.getCamera();
    //return this.camera;
  }

  setCameraAspect(ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  collitionsControl() {

    // Obtenemos el mesh de la nave
    this.colliders.push(this.ship.getShip());

    // Añadimos los objetos del mundo para colisiones
  

  }

  update() {
    // Se muestran o no los ejes según lo que idique la GUI
    //this.axis.visible = this.guiControls.axisOnOff;

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    this.world.update();
    this.ship.update();

    // Control de colisiones

    /* this.colliderSystem.computeAndNotify(this.colliders);
    this.colliders[0].update();
    this.colliders[1].update();*/

  }
}