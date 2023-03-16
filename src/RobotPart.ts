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
    }
}