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
    }

    this.LoadVehicle = function()
    {
        var mesh = new Physijs.BoxMesh(
  					car,
  					new THREE.MeshFaceMaterial( car_materials )
  				);
  				mesh.position.y = 2;
  				mesh.castShadow = mesh.receiveShadow = true;

  				vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
  					10.88,
  					1.83,
  					0.28,
  					500,
  					10.5,
  					6000
  				));
  				scene.add( vehicle );

  				window.vehicle = vehicle;
  				window.scene = scene;

  				var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );

  				for ( var i = 0; i < 4; i++ ) {
  					vehicle.addWheel(
  						wheel,
  						wheel_material,
  						new THREE.Vector3(
  								i % 2 === 0 ? -1.6 : 1.6,
  								-1,
  								i < 2 ? 3.3 : -3.2
  						),
  						new THREE.Vector3( 0, -1, 0 ),
  						new THREE.Vector3( -1, 0, 0 ),
  						0.5,
  						0.7,
  						i < 2 ? false : true
  					);
  				}

  				input = {
  					power: null,
  					direction: null,
  					steering: 0
  				};
  				document.addEventListener('keydown', function( ev ) {
  					switch ( ev.keyCode ) {
  						case 37: // left
  							input.direction = 1;
  							break;

  						case 38: // forward
  							input.power = true;
  							break;

  						case 39: // right
  							input.direction = -1;
  							break;

  						case 40: // back
  							input.power = false;
  							break;
  					}
  				});
  				document.addEventListener('keyup', function( ev ) {
  					switch ( ev.keyCode ) {
  						case 37: // left
  							input.direction = null;
  							break;

  						case 38: // forward
  							input.power = null;
  							break;

  						case 39: // right
  							input.direction = null;
  							break;

  						case 40: // back
  							input.power = null;
  							break;
  					}
  				});
    }
}
