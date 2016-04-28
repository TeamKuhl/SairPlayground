// Inininininit

// configure physijs
Physijs.scripts.worker = 'src/vendor/threejs/plugins/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

// create objects
var Engine = new Engine();
var Game = new Game();

Engine.Initialize();
Engine.Models.Load([
	{name:"plane",path:"vehicles/planes/cessna-152",loader:"collada"},
	{name:"fire",path:"vehicles/ground/feuerwehr",loader:"collada"},
	{name:"tanka",path:"vehicles/ground/tank-lkw",loader:"collada"},
	{name:"map",path:"maps/hockenheimring",loader:"collada"},
	{name:"trees",path:"landscape/trees",loader:"collada"}
],function(){

	$('#loader').fadeOut();
	Game.Initialize();

},
function(mdl, info){
	var total = Math.round(mdl.loaded / mdl.total * 100);
	var percent = Math.round(info.loaded / info.total * 100);
	var loadtext = mdl.path+" ["+percent+"%]";
	$('#loadinfo').html(loadtext);
	$('#loadbar').css({width:total+"%"});
});
