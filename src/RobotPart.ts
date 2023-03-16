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

            const child = new RobotPart('endEffector');
            child.position.copy(this.boneDirection);
            child.position.multiplyScalar(this.boneLength);
            this.add(child);
        }
        else if(this.name == 'endEffector')
        {
            this.boneLength = 0.075;
            this.boneDirection.set(0.001, 1, 0);
            this.boneDirection.normalize();
        }
    }

    // Recursively create all the mesh geometry for the robot parts. 
    // Each mesh will be defined in the robot part's local space.
    createMeshes(): void
    {
        // const axes = new gfx.Axes3(0.15);
        // axes.lookAt(this.boneDirection);
        // axes.translateZ(-this.boneLength);
        // this.add(axes);

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
        else if(this.name == 'endEffector')
        {
            const pincherRoot = new gfx.Transform3();
            pincherRoot.lookAt(this.boneDirection);
            pincherRoot.translateZ(-this.boneLength/2);
            this.add(pincherRoot);

            const pincher = gfx.MeshFactory.createBox(0.025, 0.025, 0.1);

            const leftPincher1 = new gfx.MeshInstance(pincher);
            leftPincher1.translateX(0.05);
            leftPincher1.rotateY(gfx.MathUtils.degreesToRadians(-45));
            pincherRoot.add(leftPincher1);

            const leftPincher2 = new gfx.MeshInstance(pincher);
            leftPincher2.translateZ(-0.04);
            leftPincher2.rotateY(gfx.MathUtils.degreesToRadians(75));
            leftPincher2.translateZ(-0.04);
            leftPincher1.add(leftPincher2);

            const rightPincher1 = new gfx.MeshInstance(pincher);
            rightPincher1.translateX(-0.05);
            rightPincher1.rotateY(gfx.MathUtils.degreesToRadians(45));
            pincherRoot.add(rightPincher1);

            const rightPincher2 = new gfx.MeshInstance(pincher);
            rightPincher2.translateZ(-0.04);
            rightPincher2.rotateY(gfx.MathUtils.degreesToRadians(-75));
            rightPincher2.translateZ(-0.04);
            rightPincher1.add(rightPincher2);
        }

        this.children.forEach((child: gfx.Transform3)=>{
            if(child instanceof RobotPart)
                child.createMeshes();
        });
    }
}