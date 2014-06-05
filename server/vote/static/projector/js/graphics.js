graphics = window.graphics || {};
animation_update_functions = window.animation_update_functions || [];
(function(external, animation_update_functions){

// Constats --------------------------------------------------------------------
var DRAW_DISTANCE = 5000;

// Variables -------------------------------------------------------------------
var camera, scene, renderer, controls;

function init() {
    // Camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, DRAW_DISTANCE);
    camera.position.z = 2000;
    camera.position.y = 400;

    // Scene
    scene = new THREE.Scene();
    
    // Renderer
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.id = 'threeD';
    // DOM Addition
    //document.body.appendChild( renderer.domElement );
    document.getElementById('screen_battle').appendChild( renderer.domElement );
    // Events
    window.addEventListener('resize', onWindowResize, false);

    //controls = new THREE.OrbitControls( camera );
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 0.3;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', function(){} );
}

function render() {renderer.render( scene, camera );}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    render();
    controls.update();
    _.each(animation_update_functions, function(animation_update_function, index, list){
        animation_update_function();
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render()
}

// Init ------------------------------------------------------------------------
init();

// Export ----------------------------------------------------------------------
external.scene = scene;
external.camera = camera;
external.animate = animate;

}(graphics, animation_update_functions));