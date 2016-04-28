/**
 * Sair Game
 * Game class
 *
 * written by Matthias Neid
 **/

function Game()
{
    // DEFINITION
    this.clientuuid = false;
    this.current = false;
    this.targetSet = false;
    this.Speed = 1;

    /**
     * Initializes the GAME
     */
    this.Initialize = function()
    {
        this.LoadMap();
        this.LoadVehicle();
    }

    this.LoadMap = function()
    {
        Engine.Objects.Add("map", {x:0,y:0,z:0}, "map", 200, {x:0,y:0,z:0});

        // Materials
    		ground_material = Physijs.createMaterial(
    			new THREE.MeshLambertMaterial({ color: 0xff6666 }),
    			.8, // high friction
    			.4 // low restitution
    		);
        var ground_geometry = new THREE.PlaneGeometry( 300, 300, 100, 100 );
    		for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
    			var vertex = ground_geometry.vertices[i];
    		}
    		ground_geometry.computeFaceNormals();
    		ground_geometry.computeVertexNormals();

    		// If your plane is not square as far as face count then the HeightfieldMesh
    		// takes two more arguments at the end: # of x faces and # of z faces that were passed to THREE.PlaneMaterial
    		ground = new Physijs.HeightfieldMesh(
    				ground_geometry,
    				ground_material,
    				0 // mass
    		);
    		ground.rotation.x = -Math.PI / 2;
    		ground.receiveShadow = true;
    		Engine.scene.add( ground );
    }

    this.LoadVehicle = function()
    {
      var car = {};

      // Car
      car_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ color: 0xff6666 }),
        .8, // high friction
        .2 // low restitution
      );

      wheel_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ color: 0x444444 }),
        .8, // high friction
        .5 // medium restitution
      );
      wheel_geometry = new THREE.CylinderGeometry( 2, 2, 1, 8 );

      car.body = new Physijs.BoxMesh(
        new THREE.CubeGeometry( 10, 5, 7 ),
        car_material,
        1000
      );
      car.body.position.y = 10;
      car.body.receiveShadow = car.body.castShadow = true;
      Engine.scene.add( car.body );

      car.wheel_fl = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
      );
      car.wheel_fl.rotation.x = Math.PI / 2;
      car.wheel_fl.position.set( -3.5, 6.5, 5 );
      car.wheel_fl.receiveShadow = car.wheel_fl.castShadow = true;
      Engine.scene.add( car.wheel_fl );
      car.wheel_fl_constraint = new Physijs.DOFConstraint(
        car.wheel_fl, car.body, new THREE.Vector3( -3.5, 6.5, 5 )
      );
      Engine.scene.addConstraint( car.wheel_fl_constraint );
      car.wheel_fl_constraint.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
      car.wheel_fl_constraint.setAngularUpperLimit({ x: 0, y: Math.PI / 8, z: 0 });

      car.wheel_fr = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
      );
      car.wheel_fr.rotation.x = Math.PI / 2;
      car.wheel_fr.position.set( -3.5, 6.5, -5 );
      car.wheel_fr.receiveShadow = car.wheel_fr.castShadow = true;
      Engine.scene.add( car.wheel_fr );
      car.wheel_fr_constraint = new Physijs.DOFConstraint(
        car.wheel_fr, car.body, new THREE.Vector3( -3.5, 6.5, -5 )
      );
      Engine.scene.addConstraint( car.wheel_fr_constraint );
      car.wheel_fr_constraint.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
      car.wheel_fr_constraint.setAngularUpperLimit({ x: 0, y: Math.PI / 8, z: 0 });

      car.wheel_bl = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
      );
      car.wheel_bl.rotation.x = Math.PI / 2;
      car.wheel_bl.position.set( 3.5, 6.5, 5 );
      car.wheel_bl.receiveShadow = car.wheel_bl.castShadow = true;
      Engine.scene.add( car.wheel_bl );
      car.wheel_bl_constraint = new Physijs.DOFConstraint(
        car.wheel_bl, car.body, new THREE.Vector3( 3.5, 6.5, 5 )
      );
      Engine.scene.addConstraint( car.wheel_bl_constraint );
      car.wheel_bl_constraint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
      car.wheel_bl_constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });

      car.wheel_br = new Physijs.CylinderMesh(
        wheel_geometry,
        wheel_material,
        500
      );
      car.wheel_br.rotation.x = Math.PI / 2;
      car.wheel_br.position.set( 3.5, 6.5, -5 );
      car.wheel_br.receiveShadow = car.wheel_br.castShadow = true;
      Engine.scene.add( car.wheel_br );
      car.wheel_br_constraint = new Physijs.DOFConstraint(
        car.wheel_br, car.body, new THREE.Vector3( 3.5, 6.5, -5 )
      );
      Engine.scene.addConstraint( car.wheel_br_constraint );
      car.wheel_br_constraint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
      car.wheel_br_constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });

      document.addEventListener(
        'keydown',
        function( ev ) {
          switch( ev.keyCode ) {
            case 37:
              // Left
              car.wheel_fl_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, 1, 200 );
              car.wheel_fr_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, 1, 200 );
              car.wheel_fl_constraint.enableAngularMotor( 1 );
              car.wheel_fr_constraint.enableAngularMotor( 1 );
              break;

            case 39:
              // Right
              car.wheel_fl_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, -1, 200 );
              car.wheel_fr_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, -1, 200 );
              car.wheel_fl_constraint.enableAngularMotor( 1 );
              car.wheel_fr_constraint.enableAngularMotor( 1 );
              break;

            case 38:
              // Up
              car.wheel_bl_constraint.configureAngularMotor( 2, 1, 0, 5, 2000 );
              car.wheel_br_constraint.configureAngularMotor( 2, 1, 0, 5, 2000 );
              car.wheel_bl_constraint.enableAngularMotor( 2 );
              car.wheel_br_constraint.enableAngularMotor( 2 );
              break;

            case 40:
              // Down
              car.wheel_bl_constraint.configureAngularMotor( 2, 1, 0, -5, 2000 );
              car.wheel_br_constraint.configureAngularMotor( 2, 1, 0, -5, 2000 );
              car.wheel_bl_constraint.enableAngularMotor( 2 );
              //car.wheel_br_constraint.enableAngularMotor( 2 );
              break;
          }
        }
      );

      document.addEventListener(
        'keyup',
        function( ev ) {
          switch( ev.keyCode ) {
            case 37:
              // Left
              car.wheel_fl_constraint.disableAngularMotor( 1 );
              car.wheel_fr_constraint.disableAngularMotor( 1 );
              break;

            case 39:
              // Right
              car.wheel_fl_constraint.disableAngularMotor( 1 );
              car.wheel_fr_constraint.disableAngularMotor( 1 );
              break;

            case 38:
              // Up
              car.wheel_bl_constraint.disableAngularMotor( 2 );
              car.wheel_br_constraint.disableAngularMotor( 2 );
              break;

            case 40:
              // Down
              car.wheel_bl_constraint.disableAngularMotor( 2 );
              car.wheel_br_constraint.disableAngularMotor( 2 );
              break;
          }
        }
      );
      Engine.camera.addTarget({
            name: 'me',
            targetObject: car.body,
            cameraPosition: new THREE.Vector3(0, 20, 40),
            cameraRotation: new THREE.Euler( 0.2, Math.PI, 0, 'XYZ' ),
            fixed: false,
            stiffness: 1,
            matchRotation: true
        });

        Engine.camera.setTarget('me');

    }
}
