/* Lecture 16
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class RobotPart extends gfx.Transform3
{
    public name: string;
    public boneDirection: gfx.Vector3;
    public boneLength: number;

    constructor(name: string)
    {
        super();

        this.name = name;
        this.boneDirection = new gfx.Vector3();
        this.boneLength = 0;

        if(this.name == 'root')
        {
            this.boneLength = 0.05;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('upperArm');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'upperArm')
        {
            this.boneLength = 0.5;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('middleArm');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'middleArm')
        {
            this.boneLength = 0.4;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();

            const child = new RobotPart('lowerArm');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'lowerArm')
        {
            this.boneLength = 0.4;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();
        }
    }

    // Recursively create all the mesh geometry for the robot parts. 
    // Each mesh will be defined in the robot part's local space.
    createMeshes(): void
    {
        const axes = new gfx.Axes3(0.15);
        axes.lookAt(this.boneDirection);
        axes.translateZ(-this.boneLength);
        this.add(axes);

        if(this.name == 'upperArm')
        {
            const arm = gfx.MeshFactory.createBox(0.05, 0.05, this.boneLength);
            arm.lookAt(this.boneDirection);
            arm.translateZ(-this.boneLength/2);
            this.add(arm);

            const sphere = gfx.MeshFactory.createSphere(0.05, 1);
            sphere.lookAt(this.boneDirection);
            sphere.translateZ(-this.boneLength);
            this.add(sphere);
        }
        else if(this.name == 'middleArm')
        {
            const arm = gfx.MeshFactory.createBox(0.05, 0.05, this.boneLength);
            arm.lookAt(this.boneDirection);
            arm.translateZ(-this.boneLength/2);
            this.add(arm);

            const sphere = gfx.MeshFactory.createSphere(0.05, 1);
            sphere.lookAt(this.boneDirection);
            sphere.translateZ(-this.boneLength);
            this.add(sphere);
        }
        else if(this.name == 'lowerArm')
        {
            const arm = gfx.MeshFactory.createBox(0.05, 0.05, this.boneLength);
            arm.lookAt(this.boneDirection);
            arm.translateZ(-this.boneLength/2);
            this.add(arm);

            const sphere = gfx.MeshFactory.createSphere(0.05, 1);
            sphere.lookAt(this.boneDirection);
            sphere.translateZ(-this.boneLength);
            this.add(sphere);
        }

        this.children.forEach((child: gfx.Transform3)=>{
            if(child instanceof RobotPart)
                child.createMeshes();
        });
    }
}