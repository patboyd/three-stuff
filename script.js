import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import './styles.css'

let run = true;

const canvas = document.querySelector("canvas.webgl")
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color: 0xFF4433, wireframe: false})
const mesh = new THREE.Mesh(geometry, material)

const group = new THREE.Group();
group.add( mesh)
scene.add(group)

const goForward = () => {
    console.log('Go forward')
    gsap.to(mesh.position, {x: 2, duration: 2, delay: 1, onComplete: goBack})
}
const goBack= () => {
    console.log('Go back')
    gsap.to(mesh.position, {x: 0, duration: 2, delay: 3, onComplete: goForward})
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1.3


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true 
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize( sizes.width, sizes.height )
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Important for efficiency across devices

const clock = new THREE.Clock()

function tick() {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    document.title = `Elapsed: ${Math.floor(elapsedTime*10000)/1000}`

    renderer.render(scene, camera)

    if(run) {
        window.requestAnimationFrame(tick)
    } else {
        console.log('no running')
    }
}

tick()

const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper)


window.addEventListener('resize', (evt) => {
    sizes.height = window.innerHeight
    sizes.width = window.innerWidth

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize( sizes.width, sizes.height )
})

window.addEventListener('dblclick', () => {
    // NOTE: This is not cross browser compatible for older versions
   if(!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})