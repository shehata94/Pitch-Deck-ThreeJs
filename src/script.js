import './style.css'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import * as TWEEN from '@tweenjs/tween.js'
import { gsap } from 'gsap'

// // new syntax

// import '../assets/js/jquery.scrollex.min.js';
// import '../assets/js/jquery.scrolly.min.js';

/**
 * Loaders
 */
 const loadingBarElement = document.querySelector('.loading-bar')
 const loadingManager = new THREE.LoadingManager(
     // Loaded
     () =>
     {
         // Wait a little
         window.setTimeout(() =>
         {
             // Animate overlay
             gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })
 
             // Update loadingBarElement
             loadingBarElement.classList.add('ended')
             loadingBarElement.style.transform = ''

             //remove overrelay
             scene.remove(overlay);
         }, 500)
     },
 
     // Progress
     (itemUrl, itemsLoaded, itemsTotal) =>
     {
         // Calculate the progress and update the loadingBarElement
         const progressRatio = itemsLoaded / itemsTotal
         loadingBarElement.style.transform = `scaleX(${progressRatio})`
     }
 )

/**
 * Base
 */
// Debug
const debugObject = {}
// const gui = new dat.GUI({
//     width: 400
// })

/**
 * _x: -0.3774015135630563, _y: 0.9958511560876554, _z: 0.3211534444923604
 * 
 * 
 
 * 
 * 
 */


const p1 = new THREE.Vector3 ( 21.763652772096076,  5.49270779956247,  13.5443305753787);
const r1 = new THREE.Vector3 ( -0.39203822978987923, 1.1109771409356626,0.35481674897531207 );

// const p11 = new THREE.Vector3 (-8.315980752354882, 5.187403222182887,  20.344033449004606 
//     );
// const r11 = new THREE.Vector3 ( -0.23118325411985696, -0.35614984292237944,  -0.08189012187852014
//     );

// const p12 = new THREE.Vector3 (3.493763190622637,  5.851474882497529,  -17.82960392219633
//     );
// const r12 = new THREE.Vector3 (  -2.9697847644049453,  -0.3050469669993208,  -3.089525542147404
//     );

// const p13 = new THREE.Vector3 (24.239387934121623,  4.069542070711661,  5.518781500831513
//     );
// const r13 = new THREE.Vector3 (  -1.802494599077566,  1.4633245415809835,  1.8037911439616179);

const p2 = new THREE.Vector3 (  23.447555404197228,  15.545271193512548,  12.107204433881073 );
const r2 = new THREE.Vector3 ( -1.9246731793171608,  1.2680450607018368,  1.9400722425534704);
   

const p3 = new THREE.Vector3 (-0.03985731428070949,  28.91711160739548,  17.56988505108027  );
const r3 = new THREE.Vector3 ( -0.6601644595076988,  1.1659131935224454,  0.6197938690854381 );

const p4 = new THREE.Vector3 ( 23.48500889177191,  40.16556270615759,  14.273385197196715);
const r4 = new THREE.Vector3 (  -1.3391465856499845,  1.1979654083409226, 1.3227283729240327
    );

const p5 = new THREE.Vector3 ( 0.2740705103234724, 52.96119543411295,  10.75317811640101
    );
const r5 = new THREE.Vector3 (-2.2514695866674486, 1.052373361910417,  2.3211593873700482
    );

const p6 = new THREE.Vector3 (  21.797696309714844,  63.272320354582085, 15.709142067151312
    );
const r6 = new THREE.Vector3 ( -0.6816749243014696,  1.0429803814685066, 0.6114010818502155,
    );

const p7 = new THREE.Vector3 (  1.854416805016271, 77.39586000879589, 12.36209939265084 
    );
const r7 = new THREE.Vector3 (    -2.087096261798173,  1.2663757702665859,  2.10754423108256,
    );

const p8= new THREE.Vector3 (    2.0310686740810056,  56.92211403193314, 12.747620066094765
    );
const r8 = new THREE.Vector3 (   0.2503964098357062, 1.2211563011118631, -0.23581867992474856,);

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Overlay
 */
 const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
 const overlayMaterial = new THREE.ShaderMaterial({
     // wireframe: true,
     transparent: true,
     uniforms:
     {
         uAlpha: { value: 1 }
     },
     vertexShader: `
         void main()
         {
             gl_Position = vec4(position, 1.0);
         }
     `,
     fragmentShader: `
         uniform float uAlpha;
 
         void main()
         {
             gl_FragColor = vec4(0.192, 0.141, 0.314, uAlpha);
         }
     `
 })
 const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
 scene.add(overlay)
 



/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)
// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('KIMO.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const bakedTexture2 = textureLoader.load('vr.jpg')
bakedTexture2.flipY = false
bakedTexture2.encoding = THREE.sRGBEncoding

const bakedTexture3 = textureLoader.load('card.jpg')
bakedTexture3.flipY = false
bakedTexture3.encoding = THREE.sRGBEncoding

const bakedTexture4= textureLoader.load('mic.jpg')
bakedTexture4.flipY = false
bakedTexture4.encoding = THREE.sRGBEncoding

const bakedTexture5= textureLoader.load('cam.jpg')
bakedTexture5.flipY = false
bakedTexture5.encoding = THREE.sRGBEncoding

const bakedTexture6= textureLoader.load('truck.jpg')
bakedTexture6.flipY = false
bakedTexture6.encoding = THREE.sRGBEncoding

const bakedTexture7= textureLoader.load('products.jpg')
bakedTexture7.flipY = false
bakedTexture7.encoding = THREE.sRGBEncoding


/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
const bakedMaterial2 = new THREE.MeshBasicMaterial({ map: bakedTexture2 })
const bakedMaterial3 = new THREE.MeshBasicMaterial({ map: bakedTexture3 })
const bakedMaterial4 = new THREE.MeshBasicMaterial({ map: bakedTexture4 })
const bakedMaterial5 = new THREE.MeshBasicMaterial({ map: bakedTexture5 })
const bakedMaterial6 = new THREE.MeshBasicMaterial({ map: bakedTexture6 })
const bakedMaterial7 = new THREE.MeshBasicMaterial({ map: bakedTexture7 })


/**
 * Model
 */

const meshh = new THREE.MeshBasicMaterial({color:0xff0000})
var kimo =gltfLoader.load(
    'scenethereejs18.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial)
    

        //repositioning
        gltf.scene.position.x = 4
        
    }
)
gltfLoader.load(
    'vr.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial2)
     
        //repositioning
        gltf.scene.position.x = 12
        gltf.scene.position.y = 12
        
    }
)

gltfLoader.load(
    'CARD.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial3)
     
        //repositioning
        gltf.scene.position.x = -12
        gltf.scene.position.y = 24
        
    }
)

gltfLoader.load(
    'mic.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial4)
     
        //repositioning
        gltf.scene.position.x = 12
        gltf.scene.position.y = 36
        
    }
)

gltfLoader.load(
    'cam.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial5)
     
        //repositioning
        gltf.scene.position.x = -12
        gltf.scene.position.y = 48
        
    }
)

gltfLoader.load(
    'truck.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial6)
     
        //repositioning
        gltf.scene.position.x = 12
        gltf.scene.position.y = 60
        
    }
)

gltfLoader.load(
    'PRODUCTS.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.traverse((child) => child.material = bakedMaterial7)
     
        //repositioning
        gltf.scene.position.x = -12
        gltf.scene.position.y = 72
        
    }
)
/**
 * Fireflies
 */
// Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 5000
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for(let i = 0; i < firefliesCount; i++)
{
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 50
    positionArray[i * 3 + 1] = Math.random() * 80
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 50

    scaleArray[i] = Math.random()
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material
const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms:
    {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 200 }
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
})

// gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('firefliesSize');



// Points
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
fireflies.position.x = 4
scene.add(fireflies)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.set( p1.x, p1.y, p1.z );
camera.rotation.set( r1.x, r1.y, r1.z );

scene.add(camera)
// gui.add(camera.position, 'x', 0,60).step(2);
// gui.add(camera.position, 'y', 0,60).step(1);
// gui.add(camera.position, 'z', 0,12).step(1);
// gui.add(camera.rotation, 'x',-3.14,3.14).step(.05);
// gui.add(camera.rotation, 'y', -3.14,3.14).step(.05);
// gui.add(camera.rotation, 'z', -3.14,3.14).step(.05);
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#3A2670'
renderer.setClearColor(debugObject.clearColor)
// gui
//     .addColor(debugObject, 'clearColor')
//     .onChange(() =>
//     {
//         console.log(camera.rotation)
//         console.log(camera.position)

//         renderer.setClearColor(debugObject.clearColor)
//     })

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        // camera.zoom = (sizes.width / sizes.height)*.4
        camera.updateProjectionMatrix()
        
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
        // Update fireflies
        firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    })
    
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update materials
    // portalLightMaterial.uniforms.uTime.value = elapsedTime
    firefliesMaterial.uniforms.uTime.value = elapsedTime

    //Tween
    TWEEN.update();

    
    // Update controls
//    controls.update()

    // Render
    renderer.render(scene, camera)
    


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//TWEEN


function setupTween (pos, endPos,rot, endRot, duration,kimo2)
{
    //TWEEN.removeAll();    // remove previous tweens if needed

    new TWEEN.Tween (pos)
        .to (endPos, duration)
        .easing (TWEEN.Easing.Linear.None)
        .onUpdate (
            function() {
                // copy incoming position into capera position
                camera.position.copy (pos);
            }).onComplete(kimo2)
        .start();
        new TWEEN.Tween (rot)
        .to (endRot, duration)
        .easing (TWEEN.Easing.Linear.None)
        .onUpdate (
            function() {
                // copy incoming position into capera position
                camera.rotation.copy(rot);
            })
        .start();

}
        

var someElement=document.getElementById("one");
var someElement1=document.getElementById("intro");

var point4 =document.getElementById("point4");

function isElementInViewPort(bounding) {
    if(bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        {
            return true
        }else{
            return false
        }
    
}
window.addEventListener("scroll", function (ev) {
    var point1 = document.getElementById("intro").getBoundingClientRect();
    var point2 = document.getElementById("point2").getBoundingClientRect();
    var point3 = document.getElementById("point3").getBoundingClientRect();
    var point4 = document.getElementById("point4").getBoundingClientRect();
    var point5 = document.getElementById("point5").getBoundingClientRect();
    var point6 = document.getElementById("point6").getBoundingClientRect();
    var point7 = document.getElementById("point7").getBoundingClientRect();
    var point7a = document.getElementById("point7a").getBoundingClientRect();
    var point7b = document.getElementById("point7b").getBoundingClientRect();
    var point7c = document.getElementById("point7c").getBoundingClientRect();
   
    if (isElementInViewPort(point2)) {
        setupTween(camera.position.clone(), p2, camera.rotation.clone(), r2, 1000)
    } else if (isElementInViewPort(point3)) {
        setupTween(camera.position.clone(), p3, camera.rotation.clone(), r3, 1000)
    } else if (isElementInViewPort(point4)) {
        setupTween(camera.position.clone(), p4, camera.rotation.clone(), r4, 1000)
    } else if (isElementInViewPort(point5)) {
        setupTween(camera.position.clone(), p5, camera.rotation.clone(), r5, 1000)
    } else if (isElementInViewPort(point6)) {
        setupTween(camera.position.clone(), p6, camera.rotation.clone(), r6, 1000)
    } else if (isElementInViewPort(point7)) {
        setupTween(camera.position.clone(), p7, camera.rotation.clone(), r7, 1000)
    } else if (isElementInViewPort(point7a)) {
        setupTween(camera.position.clone(), p7, camera.rotation.clone(), r7, 1000)
    } else if (isElementInViewPort(point7b)) {
        setupTween(camera.position.clone(), p7, camera.rotation.clone(), r7, 1000)
    } else if (isElementInViewPort(point7c)) {
        setupTween(camera.position.clone(), p7, camera.rotation.clone(), r7, 1000)
    } else if (isElementInViewPort(point1)) {
        setupTween(camera.position.clone(), p1, camera.rotation.clone(), r1, 1000)
    }

    else {
        setupTween(camera.position.clone(), p8, camera.rotation.clone(), r8, 1000)

    }

})




