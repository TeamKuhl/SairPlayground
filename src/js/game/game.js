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
        Engine.Objects.Add("map", {x:0,y:0,z:0}, "map", 200, {x:0,y:0,z:0});
    }
}
