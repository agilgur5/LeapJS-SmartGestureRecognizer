var renderer, scene, camera, controls, stats, container;
var info, palm, phalanges = [];
init();
animate();

function init() {
  var light, geometry, material, mesh;
  // Three.js basics
  scene = new THREE.Scene();
  container = document.getElementById( 'visualizer' );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( container.offsetWidth, container.offsetHeight );
  container.appendChild( renderer.domElement );
  camera = new THREE.PerspectiveCamera( 40, container.offsetWidth / container.offsetHeight, 1, 3000 );
  camera.position.set( 0, 250, 600 );
  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.target.set( 0, 100, 0 );
  // palm
  geometry = new THREE.BoxGeometry( 80, 20, 80 );
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -30 ) );  // to to +30 if using pitch roll & yaw
  material = new THREE.MeshNormalMaterial();
  palm = new THREE.Mesh( geometry, material );
  scene.add( palm );
  // phalanges
  geometry = new THREE.BoxGeometry( 16, 12, 1 );
  for ( var i = 0; i < 15; i++) {
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    phalanges.push( mesh );
  }
}
Leap.loop( function( frame ) {
  var hand, phalanx, point, length;
  if ( frame.hands.length ) {
    hand = frame.hands[0];
    palm.position.set( hand.palmPosition[0], hand.palmPosition[1], hand.palmPosition[2] );
    //      palm.rotation.set( hand.pitch(), -hand.yaw(), hand.roll() );
    direction = new THREE.Vector3( hand.direction[0], hand.direction[1], hand.direction[2] );  // best so far
    palm.lookAt( direction.add( palm.position ) );
    palm.rotation.z = -hand.roll();
  }
  var iLen = ( frame.pointables.length < 5 ) ? frame.pointables.length : 5;
  for (var i = 0; i < iLen; i++) {
    for ( var j = 0; j < 3; j++) {
      phalanx = phalanges[ 3 * i + j];
      point = frame.pointables[i].positions[j];
      phalanx.position.set( point[0], point[1], point[2] );
      point = frame.pointables[i].positions[ j + 1 ];
      point = new THREE.Vector3( point[0], point[1], point[2] );
      phalanx.lookAt( point );
      length = phalanx.position.distanceTo( point );
      phalanx.translateZ( 0.5 * length );
      phalanx.scale.set( 1, 1, length );
    }
  }
});
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
}