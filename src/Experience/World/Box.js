import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Box
{
    constructor(name,scale,posx)
    {
        //Variables
        this.scale = scale
        this.posx = posx
        this.name - name


        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('box')
        }

        // Resource
        this.resource = this.resources.items.boxModel
        console.log(this.resource); 


        
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene

        //Generate Cube
        
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        // const cube = new THREE.Mesh( geometry, material );
        // this.model = cube;

        this.model.scale.set(this.scale, this.scale, this.scale)
        this.scene.add(this.model)

        this.model.position.x = this.posx
        this.model.position.y = this.scale/2
        

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

}