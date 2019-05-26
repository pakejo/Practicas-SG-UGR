
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor() {
    super();

    // Control de colisiones
    this.colliders = [];

    // Iluminacion de la escena
    this.createLights();

    // Por último creamos el objeto de revolucion, como una instancia de una clase propia, que gestionará su creación y la interacción con la misma
    this.world = new World();
    this.add(this.world);

    this.track = new Track();
    this.add(this.track);

    this.ship = new Ship(this.track.spline());
    this.add(this.ship);

    // Sistema de colisiones
    this.colliderSystem = new THREEx.ColliderSystem();
    this.collitionsControl();

    // Inicio del juego (evita que se ejecuten los listener de las colisiones al crearlas)
    this.gameStart = false;
  }

  /**
   * Funcion que crera la iluminacion de la escena
   * Consiste en una luz ambienta y otra puntual
   * del mismo color
   */
  createLights() {
    var ambientLight = new THREE.AmbientLight(0xccddee, 2);
    // La añadimos a la escena
    this.add(ambientLight);

    var light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(500, 500, 500);
    this.add(light);

  }

  /**
   * Usado por el render para obtener la camara de la escena
   */
  getCamera() {
    return this.ship.getCamera();
    //return this.camera;
  }

  /**
   * Permite cambiar la relacion de aspecto de la camara
   * en caso de que cambie el tamaño de la ventana
   */
  setCameraAspect(ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Crea el sistema de colisones
   * Obtiene todos los obstaculos del mundo 
   * y el objeto que representa la nave.
   * Tambien crea el listener para la nave
   */
  collitionsControl() {

    var that = this;

    // Añadimos los objetos del mundo para colisiones
    var obstaculos = this.world.getObstacles();

    for (var i = 0; i < obstaculos.length; i++) {
      var collider = new THREEx.Collider.createFromObject3d(obstaculos[i]);
      this.colliders.push(collider);
    }

    // La nave
    var colliderShip = new THREEx.Collider.createFromObject3d(this.ship.getShip());

    colliderShip.addEventListener('contactEnter', function (otherCollider) {

      if (that.gameStart) {
        if (otherCollider.id < 2)
          that.ship.winLife();
        else
          that.ship.lostLife();
      }
    });

    this.colliders.push(colliderShip);

  }

  /**
   * Usado por el script cuando inicia la partida
   * Evita que se ejecute el listener de la nave 
   * caundo este se crea
   */
  start() {
    this.gameStart = true;
  }

  /**
   * Funcion que actualiza toda la escena
   */
  update() {
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    this.world.update();
    this.ship.update();

    // Control de colisiones
    for (var i = 0; i < this.colliders.length; i++)
      this.colliders[i].update();

    this.colliderSystem.computeAndNotify(this.colliders);


  }
}