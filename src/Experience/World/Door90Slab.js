import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Door90Slab
{
    constructor(name,scale)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        //Variables
        this.scale = scale
        // this.size = 900
        // this.type = "slab"
        this.name = name

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }


        this.resource = this.resources.items.Door90Slab
        
        // Resource
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene

        //Set Scale
        this.model.scale.set(this.scale, this.scale, this.scale)
        
        this.model.position.y = 7;
        

        //Log Size
        // let measure = new THREE.Vector3();
        // let box2 = box.getSize(measure);
        // console.log( measure );
        
        //Add to scene
        //this.scene.add(this.model)


        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

}