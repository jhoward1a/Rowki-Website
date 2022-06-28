import Experience from '../Experience.js'
import Camera from '../Camera.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Box from './Box.js'
import IMOS from './IMOS.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()

            this.allobj = [
              ];
            //Create Model (Could be loaded without add?)
            const imos1 = new IMOS('imos',50,0)
            this.allobj.push(imos1);
            
            //Clone & Add to scene
            var imos2 = imos1.model.clone(true);
            this.scene.add(imos2)
            imos2.position.x = imos2.position.x + 30; 
            this.allobj.push(imos2);
            
            console.log(this.allobj)

            // // //Labels
            // const tempV = new THREE.Vector3();
        
            //  // get the position of the center of the cube
            // this.allobj[0].model.updateWorldMatrix(true, false);
            // this.allobj[0].model.getWorldPosition(tempV);
            // // get the normalized screen coordinate of that position
            // // x and y will be in the -1 to +1 range with x = -1 being
            // // on the left and y = -1 being on the bottom
            // tempV.project(this.experience.camera.instance);
            // // convert the normalized position to CSS coordinates
            // const x = (tempV.x *  .5 + .5) * this.experience.canvas.clientWidth;
            // const y = (tempV.y * -.5 + .5) * this.experience.canvas.clientHeight;
            
            // // move the elem to that position
            // const elem = document.querySelector('#labels');
            // elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
            

            //Box Highlight
            const box = new THREE.BoxHelper( imos2, 0xffff00 );
            this.scene.add( box );



            //Cloning Sample
            // const box1 = new Box('box1',60,80)
            // var box2 = box1.model.clone(true);
            // this.scene.add(box2)
            // box2.position.x = -10; 
            // box2.scale.set(50,50,50)
            
            this.environment = new Environment()
            
        })
        
        // window.addEventListener('click', () =>
        // {
        //   alert("Test");
        //   this.box = new Box()
        // })

        // window.addEventListener("click", myFunction);
        // function myFunction() {
        // document.getElementById("labels");
        // alert(document.getElementById("buttn").value);
        // }

        const name = document.querySelector(".name");
        function changeColor() {
            name.style.color = "blue";
            alert("Test");
        }
        
    }
}