import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Interface from './Utils/Interface.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import labels from './World/Labels.js'
import IMOS from './World/IMOS'
import buildunits from './World/Units.js'



let instance = null

const raycaster = new THREE.Raycaster()

const points = [
    // {
    //     position: new THREE.Vector3(0, 0.3, - 0.6),
    //     element: document.querySelector('.point-0')

    // },
    // {
    //     position: new THREE.Vector3(0.5, 0.8, - 1.6),
    //     element: document.querySelector('.point-1')
    // }
]

var posright;


export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.Interface = new Interface()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 0xa0a0a0 );
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()



        
        

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
            this.tick()
        })

    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    tick = () =>
    {
        
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
        
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
        

    
}




