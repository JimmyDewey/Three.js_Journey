import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/4.png");

// Fonts
const fontLoader = new FontLoader();
fontLoader.load("fonts/Smiley Sans Oblique_Regular.json", (font) => {
    const textGeometry = new TextGeometry("杜威", {
        font: font,
        size: 0.5,
        depth: 0.1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
    });
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5,
    // )
    textGeometry.center();

    // const textMaterial = new THREE.MeshBasicMaterial()
    // textMaterial.wireframe = true

    const textMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);

    const donutGeometry = new THREE.TorusGeometry();
    const donutMeterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
    });

    for (let i = 0; i < 100; i++) {
        const donut = new THREE.Mesh(donutGeometry, donutMeterial);

        donut.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        donut.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            2 * Math.PI
        );

        const scale = Math.random();
        donut.scale.set(scale, scale, scale);
        scene.add(donut);
    }
});

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
);
camera.position.z = 3;
// scene.add(camera)

const control = new OrbitControls(camera, canvas);
control.update();
control.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    control.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();
