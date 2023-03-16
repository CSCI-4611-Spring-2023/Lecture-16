import * as gfx from 'gophergfx'
import { RobotPart } from './RobotPart';

export class Robot extends gfx.Transform3
{
    constructor()
    {
        super();

        const base = gfx.MeshFactory.createBox(0.5, 0.05, 0.5);
        base.translateY(0.025);
        this.add(base);

        const sphere = gfx.MeshFactory.createSphere(0.1, 2);
        sphere.scale.set(1, 0.5, 1);
        sphere.translateY(0.05);
        this.add(sphere);

        this.add(new RobotPart('root'));

        this.children.forEach((child: gfx.Transform3)=>{
            if(child instanceof RobotPart)
                child.createMeshes();
        });
    }

    setPose(name: string, pose: gfx.Quaternion): void
    {
        this.children.forEach((child: gfx.Transform3)=>{
            if(child instanceof RobotPart)
                child.setPose(name, pose);
        });
    }
}