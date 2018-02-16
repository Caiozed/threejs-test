var camera, scene, renderer;
var geometry, material, mesh;
var loader = new THREE.GLTFLoader();
var lighting, ambient, keyLight, fillLight, backLight;
var model, controls;

init();

update();

function init(){
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 100);
    camera.position.z = 1;
    
    scene = new THREE.Scene();
    
    geometry = new THREE.CubeGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();
    
    mesh = new THREE.Mesh(geometry, material)
    
    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    
    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
    
    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
    scene.add(mesh);
    scene.add(ambient);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls( camera );
}


// Load a glTF resource
loader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        model = gltf;
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Scene
		gltf.scenes; // Array<THREE.Scene>
		gltf.cameras; // Array<THREE.Camera>

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



function update(){
    
    requestAnimationFrame(update);
    
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    
    controls.update();
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', function(){
   var width = window.innerWidth;
   var height = window.innerHeight;
   
   renderer.setSize(width, height);
   camera.aspect = width/height;
   camera.updateProjectionMatrix();
});