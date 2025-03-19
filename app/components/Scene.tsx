"use client";

import { useEffect } from "react";
import * as THREE from "three"; //importing entire ThreeJS

export default function Scene() {
  useEffect(() => {
    // useEffect cuz we are creating this ones the page renders and not every time a state changes
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, //FOV
      window.innerWidth / window.innerHeight, //aspect ratio
      0.1, //Everything clorser will not render
      1000 //Everything further will render
    );

    const color = new THREE.Color().setHex(0x112233); //Defining a hex value color which is blue
    scene.background = color; //Changing the background color

    const renderer = new THREE.WebGLRenderer(); //Turns the drawing into a component
    renderer.setSize(window.innerWidth, window.innerHeight); // Sets the size of the component / render
    document.body.appendChild(renderer.domElement); // Adds the component to the DOM

    // Position camera
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Add a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1); //Length of the verticies
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 2, 0);
    scene.add(cube);

    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      side: THREE.DoubleSide, // Make the plane visible from both sides
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true; // added shadows
    scene.add(floor);

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5); // Adjusted light position
    scene.add(light);

    // Add ambient light so the floor is visible
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Animation loop (updated 60 times per refresh / 60fps)
    function animate() {
      requestAnimationFrame(animate); //tells the browser that it should call this 60 times per refresh

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera); //rerenderes everything
    }

    animate();
  }, []); // Does this only at the start

  return null; //No jsx so..
}
