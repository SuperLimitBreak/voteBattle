battlescape = window.battlescape || {};

(function(external, battlescape){
// -----------------------------------------------------------------------------


function create_actor(id, actor_data) {
    var actor = {id:id};  //battlescape.state.actors[id] || 
    //battlescape.state.actors[actor.id] = actor;
    actor.data = actor_data;
    
    // Create 3D dom object for this player
    actor.dom = document.createElement('img');
    //player.dom.style.width = '200px';
    //player.dom.style.height = '300px';
    actor.CSS3DObject = new THREE.CSS3DObject( actor.dom );
    
    // Methods
    actor.is_player = function() {return battlescape.data.players.indexOf(id) >= 0;}
    actor.is_hurt   = function() {return (actor.health/actor.data.health) <= battlescape.data.settings.ui.health_low_threshold;}
    actor.is_dead   = function() {return actor.health <= 0;}    
    actor.set_pose = function(pose) {
        actor.dom.src = battlescape.data.settings.path.images.characters + actor.data.images[pose];
    };
    actor.set_direction = function(direction) {
        if (direction != 0) {direction = Math.PI;}
        actor.CSS3DObject.rotation.y = direction;
    }
    actor.get_actions = function() {
        if (actor.is_dead()) {return [];}
        return ['attack', 'defend', 'heal'];  // Hard coded list for now, in future this could be dynamic
    };
    
    // Set Variables
    actor.health = actor.data.health;
    actor.set_pose('stand');
    
    // TEMP HACK!!!
    //if (id == 'player2') {battlescape.state.active_actor = actor;}
    
    return actor;
};

function create_game(players, enemys, turn_order) {
    var game = {};
    
    var current_turn_index = 0;
    var actors = {};


    $.each(players.concat(enemys) ,function(i, id){
        actors[id] = create_actor(id, battlescape.data.characters[id]);
    });

    game.get_actors = function() {
        return actors;
    }
    game.get_current_turn_actor =  function() {
        return actors[turn_order[current_turn_index]];
    }

    game.next_turn = function() {
        current_turn_index = (current_turn_index + 1) % turn_order.length;
        battlescape.ui.update();
        
        if (!game.get_current_turn_actor().is_player()) {
            battlescape.ai.take_action();
        }
    }

    return game;
}

// Init ------------------------------------------------------------------------
// External --------------------------------------------------------------------

external.game = create_game(
    battlescape.data.players,
    battlescape.data.enemys,
    battlescape.data.turn_order
);





}(battlescape, battlescape));