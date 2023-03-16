/* Lecture 16
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { GUI } from 'dat.gui'
import { Robot } from './Robot';

export class RobotApp extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;
    private robot: Robot;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.robot = new Robot();
    }

    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, .1, 20)
        this.cameraControls.setTargetPoint(new gfx.Vector3(0, 0.75, 0));
        this.cameraControls.setDistance(1.6);

        // Set a black background
        this.renderer.background.set(0, 0, 0);
        
        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Vector3(0.3, 0.3, 0.3));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Vector3(0.6, 0.6, 0.6));
        directionalLight.position.set(2, 1, 3)
        this.scene.add(directionalLight);

        // Create a grid for the ground plane
        const gridSize = 10;
        const gridVertices: number[] = [];
        for(let i=-gridSize/2; i <= gridSize/2; i++)
        {
            gridVertices.push(-gridSize/2, 0, i);
            gridVertices.push(gridSize/2, 0, i);
            gridVertices.push(i, 0, -gridSize/2);
            gridVertices.push(i, 0, gridSize/2);
        }

        const gridLines = new gfx.Line3(gfx.LineMode3.LINES);
        gridLines.setVertices(gridVertices);
        gridLines.createDefaultVertexColors();
        gridLines.color.set(0.5, 0.5, 0.5);
        this.scene.add(gridLines);

        // Add the robot to the scene
        this.scene.add(this.robot);
    }

    update(deltaTime: number): void 
    {
        // Update the camera orbit controls
        this.cameraControls.update(deltaTime);
    }
}