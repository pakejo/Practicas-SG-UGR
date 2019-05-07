class Track extends THREE.Mesh {

    constructor() {

        super();

        var trackShape = new THREE.Shape();

        trackShape.moveTo(-8, 2, 0);
        trackShape.lineTo(-7, 2, 0);
        trackShape.lineTo(-7, 1, 0);
        trackShape.lineTo(7, 1, 0);
        trackShape.lineTo(7, 2, 0);
        trackShape.lineTo(8, 2, 0);
        trackShape.lineTo(8, 0, 0);
        trackShape.lineTo(-8, 0, 0);
        trackShape.lineTo(-8, 2, 0);

        var trackPath = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(20, 0, 0),
            new THREE.Vector3(45, -35, 0),

            new THREE.Vector3(80, -35, 0),
            new THREE.Vector3(120, -35, -20),
            new THREE.Vector3(140, -35, -40),
            new THREE.Vector3(140, -35, -60),
            new THREE.Vector3(140, -35, -80),
            new THREE.Vector3(130, -35, -90),
            new THREE.Vector3(120, -35, -100),


            new THREE.Vector3(20, -10, -100),
            new THREE.Vector3(0, -10, -100),
            new THREE.Vector3(-20, -35, -100),
            new THREE.Vector3(-50, -35, -100),
            new THREE.Vector3(-150, -35, -100),
            new THREE.Vector3(-450, 135, -100),
            new THREE.Vector3(-500, 135, -100),
            new THREE.Vector3(-600, -100, -100),
            new THREE.Vector3(-700, -100, -100),
            new THREE.Vector3(-700, -100, 100),
            new THREE.Vector3(-700, -100, 200),
            new THREE.Vector3(-400, -100, 200),
            new THREE.Vector3(-400, -100, 100),
            new THREE.Vector3(-400, 0, 0),
            new THREE.Vector3(-400, 0, -200),
            new THREE.Vector3(-300, 0, -200),
            new THREE.Vector3(-200, 0, -200),
            new THREE.Vector3(-190, 0, -180),
            new THREE.Vector3(-160, 0, -160),
            new THREE.Vector3(-130, 0, -140),
            new THREE.Vector3(-100, -10, -120),
            new THREE.Vector3(-70, -20, -100),
            new THREE.Vector3(-40, -30, -80),
            new THREE.Vector3(-10, -40, -60),
            new THREE.Vector3(0, -40, -30),
            new THREE.Vector3(0, -40, 0),
            new THREE.Vector3(0, 30, 80),
            new THREE.Vector3(0, 30, 150),
            new THREE.Vector3(-20, 30, 170),
            new THREE.Vector3(-40, 30, 190),
            new THREE.Vector3(-80, 30, 200),
            new THREE.Vector3(-95, 30, 200),
            new THREE.Vector3(-300, 30, 200),
            new THREE.Vector3(-325, 30, 180),
            new THREE.Vector3(-325, 30, 150),
            new THREE.Vector3(-325, 30, 120),
            new THREE.Vector3(-310, 30, 90),
            new THREE.Vector3(-290, 30, 85)

        ]);



        var options = { steps: 50, curveSegments: 10, bevelSegments: 100, extrudePath: trackPath };
        var trackGeometry = new THREE.ExtrudeGeometry(trackShape, options);
        this.track = new THREE.Mesh(trackGeometry, new THREE.MeshNormalMaterial());


        //  this.add(this.track);
    }

    update() {
    }

}