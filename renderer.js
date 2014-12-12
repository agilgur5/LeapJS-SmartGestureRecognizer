  // Global Variables for THREE.JS
  var container , camera, scene, renderer , stats;
  // Global variable for leap
  var frame, controller;

  // Setting up how big we want the scene to be
  var sceneSize = 100;
  var leftHand , rightHand;


  // Get everything set up
  init();
  // Start the frames rolling
  animate();


  function init(){

    controller = new Leap.Controller();
    scene = new THREE.Scene();
    container = document.getElementById( 'visualizer' );
    
    camera = new THREE.PerspectiveCamera( 
      50 ,
      container.offsetWidth / container.offsetHeight,
      sceneSize / 100 ,
      sceneSize * 4
    );
    // placing our camera position so it can see everything
    camera.position.z = sceneSize;

    // Setting up our Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    container.appendChild( renderer.domElement );

    // Making sure our renderer is always the right size
    window.addEventListener( 'resize', onWindowResize , false );    
   
    leftHand = new ConnectedHand( controller );
    leftHand.addToScene( scene );
    rightHand = new ConnectedHand( controller );
    rightHand.addToScene( scene );
    
    var geo = new THREE.IcosahedronGeometry( 2 , 1 );
    var mat = new THREE.MeshNormalMaterial();
    var joint = new THREE.Object3D();
    var mesh = new THREE.Mesh(geo ,  mat );
    joint.add( mesh );

   
    var connection = new THREE.Object3D();
    var squisher = new THREE.Object3D();
    var mat = new THREE.LineBasicMaterial();
    mat.color.setHSL( .0 , .9 , .6 );

    var line = createFlatCircle( -40 , 20 , 20 , mat );
    squisher.add( line );
    var line = createFlatCircle( -40 , 10 , 20 , mat );
    squisher.add( line );
    
    var mat = new THREE.LineBasicMaterial();
    mat.color.setHSL( .05 , .9 , .6 );
    var line = createFlatCircle( -15 , 15 , 20 , mat );
    squisher.add( line );
    var line = createFlatCircle( -15 , 12 , 20 , mat );
    squisher.add( line );


    var mat = new THREE.LineBasicMaterial();
    mat.color.setHSL( .1 , .9 , .6 );
    var line = createFlatCircle( 5 , 10 , 20 , mat );
    squisher.add( line );
    var line = createFlatCircle( 5 , 8 , 20 , mat );
    squisher.add( line );

    var mat = new THREE.LineBasicMaterial();
    mat.color.setHSL( .1 , .9 , .6 );
    var line = createFlatCircle( 30 , 6 , 20 , mat );
    squisher.add( line );
    var line = createFlatCircle( 30 , 4 , 20 , mat );
    squisher.add( line );

    squisher.scale.y = .01;
    squisher.scale.x = .12;
    squisher.scale.z = .12;

    connection.add( squisher );

    palm = new THREE.Object3D();

    for( var i = 0; i < 8; i++ ){
      var mat = new THREE.LineBasicMaterial();
      mat.color.setHSL( .4 + ( i * .01 ) , .9 , .6 );
      var line = createFlatCircle( -1  , 4  , 20 , mat );
      line.position.x = Math.cos(Math.PI * (i) / 4) * (6);
      line.position.z = Math.sin(Math.PI * (i) / 4) * (6);
      palm.add( line );
    }

    leftHand.createFingers( joint , connection );
    leftHand.createPalm( joint , connection , palm );

    rightHand.createFingers( joint , connection );
    rightHand.createPalm( joint , connection , palm );

    controller.connect();
  }

  function createCircleGeo( radius , count ){
    var geometry = new THREE.Geometry();
    for( var i = 0; i <= count; i++ ){
      var t = ( i / count ) * Math.PI * 2;
      v = new THREE.Vector3(
        Math.cos( t ) * radius,
        0,
        Math.sin( t ) * radius
      );
      geometry.vertices.push( v );
    }

    return geometry;
  }

  function createFlatCircle( y , radius , count , mat ){
    var geo = createCircleGeo( radius , count );
    var line = new THREE.Line( geo , mat );
    line.rotation.x = Math.PI //2;
    line.position.y = y;
    return line;
  }

  function animate(){
    // Tells us which hand to update with
    leftHand.update( 'left' );
    rightHand.update( 'right' );

    renderer.render( scene , camera );
    requestAnimationFrame( animate );
  }

  // Resets the renderer to be the proper size
  function onWindowResize(){
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }