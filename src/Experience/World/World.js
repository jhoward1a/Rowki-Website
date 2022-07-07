import Experience from '../Experience.js'
import Camera from '../Camera.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import IMOS from './IMOS.js'
import WDDH90224 from './WDDH90224.js'
import Door90Slab from './Door90Slab.js'
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
        this.doors = [
        ];

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()

             //Axes Helper
            const axesHelper = new THREE.AxesHelper(200)
            this.scene.add(axesHelper)
            
            //Get Sources
            const sources = this.experience.resources.sources

            //Create Model (Loaded without Add - For Each?)
            const unit90 = new buildunits('WDDH90224',50);
            const imos1 = new buildunits('openUnit',50);

            //Load doors and add all to array [doors]
            var doorarray = sources.filter(item => item.parttype === 'door');
            let doorlist = [];
            doorarray.forEach((doorarray) => doorlist.push(new Door90Slab(doorarray,50)))
            

            // const Door90Slab_1 = new Door90Slab('Door90Slab',50,0)
            // this.doors.push(Door90Slab_1);
            
            //Clone & Add to scene
            var imos2 = imos1.model.clone(true);
            this.scene.add(imos2) 
            var bbox1 = new THREE.Box3().setFromObject(imos2);
            const bboxsize1 = bbox1.getSize( new THREE.Vector3() );
            this.allobj.push(imos2);

            const scene1 = this.scene
            const allobj = this.allobj
            const doors = doorlist
            
            //Track buttons
            document.getElementById('OP600').onclick = function() {clicked(this,imos1,scene1,allobj,doors)};
            document.getElementById('WDDH90224').onclick = function() {clicked(this,unit90,scene1,allobj,doors)};

            
            
            this.environment = new Environment()
            
        });



        function clicked(obj, modelpicked, scene, allobj,doors){

            //Get ID
            var id = obj.id
            console.log(id)

            //Clone & Add to scene
            var model = modelpicked.model.clone(true)
            scene.add(model)

            //Get last object in array (Right)
            const lastElement = allobj[allobj.length - 1]
            const lastbox = new THREE.Box3().setFromObject(lastElement)
            const lastsize = lastbox.getSize(new THREE.Vector3())

            //Get first object in array (Left)
            const firstElement = allobj[0]
            const firstbox = new THREE.Box3().setFromObject(firstElement)
            const firstsize = firstbox.getSize(new THREE.Vector3())
    
            //Current model size
            var bbox = new THREE.Box3().setFromObject(model)
            const bboxsize = bbox.getSize(new THREE.Vector3())
            var diff = bboxsize.x - lastsize.x
            const toggle = document.querySelector('#side');
            console.log(toggle.checked);
            
            if (toggle.checked == true) {
                //To Left
                model.position.x = lastElement.position.x 
                model.position.x = model.position.x - lastsize.x - diff
                allobj.push(model)
                
                //Find door that matches size and chosen type
                var modelwidth = model.children[0].userData.Length //Get required width
                var door = doors.find(door => door.size === modelwidth && door.type == "slab"); //Find within doors object array
                var doormodel = door.model.clone(true) //clone
                scene.add(doormodel) //Add
                doormodel.position.x = model.position.x //Position
            }

            else if (toggle.checked == false) {
                //To Right
                model.position.x = firstElement.position.x 
                model.position.x = model.position.x + firstsize.x
                allobj.unshift(model)
                
                //Add chosen door 
                const door = doors[doors.length - 1]
                var door1 = door.model.clone(true)
                scene.add(door1)
                door1.position.x = model.position.x

            }

            //Extend Plinth & Cornice

            
        
    }



    }

    
    
}