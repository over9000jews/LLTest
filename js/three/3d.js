var camera;
var dna;
var scene;
var materials;

function threeScrollToGene(gene){
	
	var OFFSET = -45;
	var ROW_HEIGHT = 2;
	
	camera.position.y = OFFSET-(gene/2*ROW_HEIGHT);
}

function setupMaterials(renderer){
	
	var blue = "#50608F";
	var brightBlue = "#7887AB"
	var yellow = '#D4C26A';
	var brightYellow = '#807615';
	var purple = '#6F4D8F';
	var brightPurple = '#9775AA';
	var green =  '#499273';
	var brightGreen =  '#CD6771';
	var grey = '#656269';
	var highlight = '#eeeeee';
	var highlight_solid = '#F6A4AC';
	var textColor = "white";
	var highlighted_textColor = "black";

	//grey
	var greyTexture= new THREEx.DynamicTexture(512,512);
	var greyMaterial  = new THREE.MeshPhongMaterial({
		map : greyTexture.texture
	});
	greyTexture.clear(grey);
	greyTexture.context.font	= "bold 80px Arial";
	greyTexture.drawText('', 32, 256, 'red');
	greyTexture.texture.anisotropy = renderer.getMaxAnisotropy();

	//blue
	var blueTexture	= new THREEx.DynamicTexture(512,512);
	var blueMaterial   = new THREE.MeshPhongMaterial({
		map : blueTexture.texture
	});
	blueTexture.clear(blue);
	blueTexture.context.font	= "bold 80px Arial";
	blueTexture.drawText('a a a a a a a a a', 32, 256, textColor);
	blueTexture.texture.anisotropy = renderer.getMaxAnisotropy();

	//shinyBlue
	var shinyBlueTexture	= new THREEx.DynamicTexture(512,512);
	var shinyBlueMaterial   = new THREE.MeshPhongMaterial({
		map : shinyBlueTexture.texture,
		specular: highlight,
		shininess: 100
	});
	shinyBlueTexture.clear(highlight_solid);
	shinyBlueTexture.context.font	= "bold 80px Arial";
	shinyBlueTexture.drawText('a a a a a a a a a', 32, 256, highlighted_textColor);
	shinyBlueTexture.texture.anisotropy = renderer.getMaxAnisotropy();


	//yellow
	var yellowTexture	= new THREEx.DynamicTexture(512,512);
	var yellowMaterial   = new THREE.MeshPhongMaterial({
		map : yellowTexture.texture
	});
	yellowTexture.clear(yellow);
	yellowTexture.context.font	= "bold 80px Arial";
	yellowTexture.drawText('t t t t t t t t t', 32, 256, textColor);
	yellowTexture.texture.anisotropy = renderer.getMaxAnisotropy();
	
	//shinyYellow
	var shinyYellowTexture	= new THREEx.DynamicTexture(512,512);
	var shinyYellowMaterial   = new THREE.MeshPhongMaterial({
		map : shinyYellowTexture.texture,
		specular: highlight,
		shininess: 100
	});
	shinyYellowTexture.clear(highlight_solid);
	shinyYellowTexture.context.font	= "bold 80px Arial";
	shinyYellowTexture.drawText('t t t t t t t t t', 32, 256,highlighted_textColor);
	shinyYellowTexture.texture.anisotropy = renderer.getMaxAnisotropy();
	
	//purple
	var purpleTexture	= new THREEx.DynamicTexture(512,512);
	var purpleMaterial   = new THREE.MeshPhongMaterial({
		map : purpleTexture.texture
	});
	purpleTexture.clear(purple);
	purpleTexture.context.font = "bold 80px Arial";
	purpleTexture.drawText('g g g g g g g g g', 32, 256, textColor);
	purpleTexture.texture.anisotropy = renderer.getMaxAnisotropy();

	//shiny purple
	var shinyPurpleTexture	= new THREEx.DynamicTexture(512,512);
	var shinyPurpleMaterial   = new THREE.MeshPhongMaterial({
		map : shinyPurpleTexture.texture,
		specular: highlight,
		shininess: 100
	});
	shinyPurpleTexture.clear(highlight_solid);
	shinyPurpleTexture.context.font = "bold 80px Arial";
	shinyPurpleTexture.drawText('g g g g g g g g g', 32, 256, highlighted_textColor);
	shinyPurpleTexture.texture.anisotropy = renderer.getMaxAnisotropy();

	
	//green
	var greenTexture	= new THREEx.DynamicTexture(512,512);
	var greenMaterial   = new THREE.MeshPhongMaterial({
		map : greenTexture.texture
	});
	greenTexture.clear(green);
	greenTexture.context.font	= "bold 80px Arial";
	greenTexture.drawText('c c c c c c c c c', 32, 256, textColor);
	greenTexture.texture.anisotropy = renderer.getMaxAnisotropy();
	
	//shiny green
	var shinyGreenTexture	= new THREEx.DynamicTexture(512,512);
	var shinyGreenMaterial   = new THREE.MeshPhongMaterial({
		map : shinyGreenTexture.texture,
		specular: highlight,
		shininess: 100
	});
	
	shinyGreenTexture.clear(highlight_solid);
	shinyGreenTexture.context.font = "bold 80px Arial";
	shinyGreenTexture.drawText('c c c c c c c c c', 32, 256, highlighted_textColor);
	shinyGreenTexture.texture.anisotropy = renderer.getMaxAnisotropy();
	
	var materials = {
		'blue' : blueMaterial,
		'yellow' : yellowMaterial,
		'purple' : purpleMaterial,
		'green' : greenMaterial,
		'grey' : greyMaterial,
		'shinyBlue' : shinyBlueMaterial,
		'shinyYellow' : shinyYellowMaterial,
		'shinyPurple' : shinyPurpleMaterial,
		'shinyGreen': shinyGreenMaterial
	}

	return materials;
}

function ballMaterial(number, renderer){
	//grey
	var greyTexture= new THREEx.DynamicTexture(512,512);
	var greyMaterial  = new THREE.MeshPhongMaterial({
		map : greyTexture.texture,
	});
	greyTexture.clear(	'#656269');
	greyTexture.context.font	= "bold 80px Arial";
	var string = number.toString()+" "+number.toString()+" "+number.toString();
	greyTexture.drawText(string, 32, 256, 'white');
	greyTexture.texture.anisotropy = renderer.getMaxAnisotropy();
	
	return greyMaterial;
}

//material getter
function getMaterial(x, shiny){
	
	var material = materials.blue; //default blue
	
	switch(x){
			case 'a':
			material = shiny ? materials.shinyBlue : materials.blue;
		break;
			case 't':
			material = shiny ? materials.shinyYellow : materials.yellow;
			
		break;
			case 'g':
			material = shiny ? materials.shinyPurple : materials.purple;
			
		break;
			case 'c':
			material = shiny ? materials.shinyGreen : materials.green;
			
		break;
	}
	
	return material;

}

function updateThreeDNA(referrence, live){
	//refresh 
	for(var i = 0; i < dna.children.length ; i++){
		if(dna.children[i].children[0].label != referrence[i][0]){
			//swap
			dna.children[i].children[0].label = referrence[i][0];
			dna.children[i].children[0].material = getMaterial(referrence[i][0], false);
		}
		if(dna.children[i].children[1].label != referrence[i][1]){
			//swap
			dna.children[i].children[1].label = referrence[i][1];
			dna.children[i].children[1].material = getMaterial(referrence[i][1], false);
		}
	}
	
	
	//update new, make genes highlight Black
	for(var i = 0; i < dna.children.length ; i++){
		if(dna.children[i].children[0].label != live[i][0]){
			//swap
			dna.children[i].children[0].label = live[i][0];
			dna.children[i].children[0].material = getMaterial(live[i][0], true);
		}
		if(dna.children[i].children[1].label != live[i][1]){
			//swap
			dna.children[i].children[1].label = live[i][1];
			dna.children[i].children[1].material = getMaterial(live[i][1], true);
		}
	}
	

}

function highLightRegion(selectedGeneRegion){
	//refresh 
	for(var i = 0; i < dna.children.length ; i++){
		//clear old highlights
		dna.children[i].children[0].material = getMaterial(dna.children[i].children[0].label,false);
		dna.children[i].children[1].material = getMaterial(dna.children[i].children[1].label,false);
	}
	
	//highlights
	var start = Math.floor(selectedGeneRegion.start/2);
	var end = Math.floor(selectedGeneRegion.end/2);
	
	for(var i = start; i < end; i++){
		dna.children[i].children[0].material = getMaterial(dna.children[i].children[0].label,true);
		dna.children[i].children[1].material = getMaterial(dna.children[i].children[1].label,true);
	}
	
}

function renderDNA(sequence){

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	
	camera.position.z = 30;
	camera.position.y = -50;
	
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	$("#threeDNA").append(renderer.domElement);

	var tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
	var ballGeometry = new THREE.SphereGeometry(0.8,32,10);
	var updateFcts	= [];
	materials = setupMaterials(renderer);
				
	dna = new THREE.Object3D();
	var holder = new THREE.Object3D();
	
	for (var i = 0; i <= sequence.length; i++) {
				
		if(sequence[i] != undefined){
			
			var leftTube = new THREE.Mesh(tubeGeometry, getMaterial(sequence[i][0], false));
			leftTube.rotation.z = 90 * Math.PI/180; 
			leftTube.position.x = -3;
			leftTube.label = sequence[i][0];
			leftTube.index = i*2;

			var rightTube = new THREE.Mesh(tubeGeometry,  getMaterial(sequence[i][1], false) );
			rightTube.rotation.z = 90 * Math.PI/180;
			rightTube.position.x = 3;
			rightTube.label = sequence[i][1];
			rightTube.index = i*2+1;


			var ballRight = new THREE.Mesh( ballGeometry, ballMaterial(i*2,renderer));
			ballRight.position.x = -6;

			var ballLeft = new THREE.Mesh( ballGeometry, ballMaterial(i*2+1,renderer));
			ballLeft.position.x = 6;

			var row = new THREE.Object3D();
			row.add(leftTube);
			row.add(rightTube);
			row.add(ballRight);
			row.add(ballLeft);

			row.position.y = -(i*2);
			row.rotation.y = 30*i * Math.PI/180;

			dna.add(row);
		}

	};
	
	//some lighting
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(300, 300, 300);
	spotLight.intensity = 0.5;
	scene.add(spotLight);
	
	//some lighting
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(300, 1500, 300);
	spotLight.intensity = 0.3;
	scene.add(spotLight);
	
	//some lighting
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(300, -3000, 300);
	spotLight.intensity = 0.8;
	scene.add(spotLight);

	var light = new THREE.AmbientLight( '#d0cdcd' ); // soft white light
	scene.add( light );

	dna.position.y = -40;

	scene.add(dna);

	dna.position.y = -40;
	holder.add(dna)
	scene.add(holder);

    var clock = new THREE.Clock();

	var delta = clock.getDelta();

	var render = function () {
		requestAnimationFrame(render);
		holder.rotation.y += 0.005;
		
		//can never control this properly
        //trackballControls.update(delta);
		renderer.render(scene, camera);
	}

	render();
	
}