import Experience from '../Experience.js'
import Camera from '../Camera.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import IMOS from './IMOS.js'
import WDDH90224 from './WDDH90224.js'
import * as THREE from 'three'
import buildunits from './Units.js'



export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.allobj = [
        ];

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()

             //Axes Helper
            const axesHelper = new THREE.AxesHelper(200)
            this.scene.add(axesHelper)
            
              
            //Create Model (Loaded without Add - For Each?)
            const imos1 = new IMOS('openUnit',50,0)
            const unit90 = new WDDH90224('WDDH90224',50,0)
            
            //Clone & Add to scene
            var imos2 = imos1.model.clone(true);
            this.scene.add(imos2) 
            var bbox1 = new THREE.Box3().setFromObject(imos2);
            const bboxsize1 = bbox1.getSize( new THREE.Vector3() );
            this.allobj.push(imos2);

            const scene1 = this.scene
            const allobj = this.allobj
            
            //Track buttons
            document.getElementById('OP600').onclick = function() {clicked(this,imos1,scene1,allobj)};
            document.getElementById('WDDH90224').onclick = function() {clicked(this,unit90,scene1,allobj)};

            
            
            this.environment = new Environment()
            
        });



        function clicked(obj, imos, scene, allobj){

            //Get ID
            var id = obj.id
            console.log(id)
            //Clone & Add to scene
            var model1 = imos.model.clone(true)
            scene.add(model1)


            //Get last object in array (Right)
            const lastElement = allobj[allobj.length - 1]
            const lastbox = new THREE.Box3().setFromObject(lastElement)
            const lastsize = lastbox.getSize(new THREE.Vector3())

            //Get first object in array (Left)
            const firstElement = allobj[0]
            const firstbox = new THREE.Box3().setFromObject(firstElement)
            const firstsize = firstbox.getSize(new THREE.Vector3())
    
            // var target = new THREE.Vector3() // create once an reuse it
            // lastElement.getWorldPosition(target)
            // console.log(target)
    
    
    
            //Current model size
            var bbox = new THREE.Box3().setFromObject(model1)
            const bboxsize = bbox.getSize(new THREE.Vector3())
            var diff = bboxsize.x - lastsize.x
            // var half = bboxsize.x / 2
            // var move = half + diff

            const toggle = document.querySelector('#side');
            console.log(toggle.checked);
            
            if (toggle.checked == true) {
            //To Left
            model1.position.x = lastElement.position.x 
            model1.position.x = model1.position.x - lastsize.x - diff
            allobj.push(model1)

            }

            else if (toggle.checked == false) {
            //To Right
            model1.position.x = firstElement.position.x 
            model1.position.x = model1.position.x + firstsize.x
            allobj.unshift(model1)
            }

            //Extend Plinth & Cornice

            //Add chosen door 
        
    }



    }

    
    
}