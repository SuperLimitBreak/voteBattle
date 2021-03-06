(function(external, graphics, battlescape){

// Variables -------------------------------------------------------------------

var scene = graphics.scene;



// Build 3D Scene --------------------------------------------------------------

function build_scene() {
    // TODO - Clear the scene HERE!!!
    
    $.each(battlescape.data.players ,function(i, player_id){
        var actor = battlescape.get_game().get_actors()[player_id];
        actor.CSS3DObject.position.x = 0 + (200*i);
        actor.CSS3DObject.position.y = (actor.get_data().height/2);
        actor.CSS3DObject.position.z = -300 + (200*i);
        scene.add(actor.CSS3DObject);
    });
    
    $.each(battlescape.data.enemys ,function(i, enemy_id){
        var actor = battlescape.get_game().get_actors()[enemy_id];
        actor.CSS3DObject.position.x = -1000 - (200*i);
        actor.CSS3DObject.position.y = (actor.get_data().height/2);
        actor.CSS3DObject.position.z = 0 + (200*i);
        scene.add(actor.CSS3DObject);
    });

    var dom = document.createElement('div');
    dom.style.width = battlescape.data.enviroment.floor.size+'px';
    dom.style.height = dom.style.width;
    dom.style.backgroundImage = "url('images/textures/"+battlescape.data.enviroment.floor.texture+"')";
    floor_CSS3DObject = new THREE.CSS3DObject(dom);
    floor_CSS3DObject.position.x = 0;
    floor_CSS3DObject.position.y = 0;
    floor_CSS3DObject.position.z = 0;
    floor_CSS3DObject.rotation.x = Math.PI/2;
    scene.add(floor_CSS3DObject);
    battlescape.doom = dom;
    
}


// Init ------------------------------------------------------------------------


// Export ----------------------------------------------------------------------

external.build_scene = build_scene

}(battlescape, graphics, battlescape));