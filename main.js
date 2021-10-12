const deepCopy = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value)
  }

  return outObject
}//https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}//https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};//https://github.com/substack/point-in-polygon https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
function partition(arr, start, end, comp){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (comp(arr[i], pivotValue)) {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        // Moving to next element
        pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    return pivotIndex;
};
function quickSort(arr, comp = (a,b)=>(a<b)) {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    stack = [];
    
    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);
    
    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while(stack[stack.length - 1] >= 0){
        
        // Extracting the top unsorted subarray
    	end = stack.pop();
        start = stack.pop();
        
        pivotIndex = partition(arr, start, end, comp);
        
        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start){
        	stack.push(start);
            stack.push(pivotIndex - 1);
		}
        
        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end){
        	stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
}//https://stackabuse.com/quicksort-in-javascript/ modified
function foursq1x4matrixMult(x=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],y=[1,2,3,4]) {//dim 1 is vertical
	return [x[0][0]*y[0]+x[1][0]*y[1]+x[2][0]*y[2]+x[3][0]*y[3],x[0][1]*y[0]+x[1][1]*y[1]+x[2][1]*y[2]+x[3][1]*y[3],x[0][2]*y[0]+x[1][2]*y[1]+x[2][2]*y[2]+x[3][2]*y[3],x[0][3]*y[0]+x[1][3]*y[1]+x[2][3]*y[2]+x[3][3]*y[3]]
}
function vectorAdd(a,b) {
	return a.map((x,i)=>x+b[i])
}
function vectorMul(a,b) {
	return a.map((x,i)=>x*b)
}
function vectorDiv(a,b) {
	return a.map((x,i)=>x/b)
}
function vectorDot(a,b) {
	return a.map((x,i)=>x*b[i])
}
function vectorDot2(a,b) {
	return a.map((x,i)=>x*b[i]).reduce((a,b)=>a+b)
}
function vectorInv(a) {
	return a.map((x)=>-x)
}
function vectorSub(a,b) {
	return a.map((x,i)=>x-b[i])
}
function vectorMag(a) {
	return Math.sqrt(a.reduce((c,b)=>(c+b*b),0))
}
function vectorNorm(a) {
	return vectorDiv(a, vectorMag(a))
}
function pointToBlockNoOrigin(block, pos, matrixInfo) {
	let toOrigin = vectorSub(origin, block[1])
	let newPos = vectorAdd(pos, toOrigin)
	if (matrixInfo) newPos = foursq1x4matrixMult(matrixInfo[1], newPos)// un-transform position
	let out = newPos.map((x,i)=>{
		if (x < 0) return 0
		if (x <= block[2][i]) return x
		return block[2][i]
	})
	//console.log(out)
	if (matrixInfo) out = foursq1x4matrixMult(matrixInfo[0], out)
	return out
}
function pointToBlock(block, pos, matrixInfo) {
	let toOrigin = vectorSub(origin, block[1])
	out = vectorSub(pointToBlockNoOrigin(block, pos, matrixInfo), toOrigin)//re-transform output
	return out
}
function vertToMatr(a,b,c,d) {
	return [[a,0,0,0],[0,b,0,0],[0,0,c,0],[0,0,0,d]]
}
const canvas = document.getElementById("main")
const context = canvas.getContext("2d")
const degToRad = Math.PI/180
const ident = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
const ident3 = [[1,0,0],[0,1,0],[0,0,1]]
const identTHREE = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
const origin = [0,0,0,0]
const faces4D = [[[0,0,0,0],[1,0,0,0],[1,1,0,0],[0,1,0,0]],[[0,0,0,0],[1,0,0,0],[1,0,1,0],[0,0,1,0]],[[0,0,0,0],[0,1,0,0],[0,1,1,0],[0,0,1,0]],[[0,0,1,0],[1,0,1,0],[1,1,1,0],[0,1,1,0]],[[0,1,0,0],[1,1,0,0],[1,1,1,0],[0,1,1,0]],[[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,0,1,0]],[[0,0,0,1],[1,0,0,1],[1,1,0,1],[0,1,0,1]],[[0,0,0,1],[1,0,0,1],[1,0,1,1],[0,0,1,1]],[[0,0,0,1],[0,1,0,1],[0,1,1,1],[0,0,1,1]],[[0,0,1,1],[1,0,1,1],[1,1,1,1],[0,1,1,1]],[[0,1,0,1],[1,1,0,1],[1,1,1,1],[0,1,1,1]],[[1,0,0,1],[1,1,0,1],[1,1,1,1],[1,0,1,1]],[[0,0,0,0],[1,0,0,0],[1,0,0,1],[0,0,0,1]],[[0,0,1,0],[1,0,1,0],[1,0,1,1],[0,0,1,1]],[[0,1,0,0],[1,1,0,0],[1,1,0,1],[0,1,0,1]],[[0,1,1,0],[1,1,1,0],[1,1,1,1],[0,1,1,1]],[[0,0,0,0],[0,1,0,0],[0,1,0,1],[0,0,0,1]],[[0,0,1,0],[0,1,1,0],[0,1,1,1],[0,0,1,1]],[[1,0,0,0],[1,1,0,0],[1,1,0,1],[1,0,0,1]],[[1,0,1,0],[1,1,1,0],[1,1,1,1],[1,0,1,1]],[[0,0,0,0],[0,0,1,0],[0,0,1,1],[0,0,0,1]],[[0,1,0,0],[0,1,1,0],[0,1,1,1],[0,1,0,1]],[[1,0,0,0],[1,0,1,0],[1,0,1,1],[1,0,0,1]],[[1,1,0,0],[1,1,1,0],[1,1,1,1],[1,1,0,1]]]//important
const edges4D = [[[0,0,0,0],[1,0,0,0]],[[0,0,0,1],[1,0,0,1]],[[0,0,1,0],[1,0,1,0]],[[0,0,1,1],[1,0,1,1]],[[0,1,0,0],[1,1,0,0]],[[0,1,0,1],[1,1,0,1]],[[0,1,1,0],[1,1,1,0]],[[0,1,1,1],[1,1,1,1]],[[0,0,0,0],[0,1,0,0]],[[0,0,0,1],[0,1,0,1]],[[0,0,1,0],[0,1,1,0]],[[0,0,1,1],[0,1,1,1]],[[1,0,0,0],[1,1,0,0]],[[1,0,0,1],[1,1,0,1]],[[1,0,1,0],[1,1,1,0]],[[1,0,1,1],[1,1,1,1]],[[0,0,0,0],[0,0,1,0]],[[0,0,0,1],[0,0,1,1]],[[0,1,0,0],[0,1,1,0]],[[0,1,0,1],[0,1,1,1]],[[1,0,0,0],[1,0,1,0]],[[1,0,0,1],[1,0,1,1]],[[1,1,0,0],[1,1,1,0]],[[1,1,0,1],[1,1,1,1]],[[0,0,0,0],[0,0,0,1]],[[0,0,1,0],[0,0,1,1]],[[0,1,0,0],[0,1,0,1]],[[0,1,1,0],[0,1,1,1]],[[1,0,0,0],[1,0,0,1]],[[1,0,1,0],[1,0,1,1]],[[1,1,0,0],[1,1,0,1]],[[1,1,1,0],[1,1,1,1]]]
const vertexes4D = [[0,0,0,0],[0,0,0,1],[0,0,1,0],[0,0,1,1],[0,1,0,0],[0,1,0,1],[0,1,1,0],[0,1,1,1],[1,0,0,0],[1,0,0,1],[1,0,1,0],[1,0,1,1],[1,1,0,0],[1,1,0,1],[1,1,1,0],[1,1,1,1]]
const blockPropsG = {
	1: {
		color: "#000000",
		edge: '#ffffff44',
	},
	2: {
		color: "#ff0000",
		edge: '#00000044',
		death: true
	},
	3: {
		color: "#ffff00",
		edge: '#00000044',
		bounce: true
	},
	4: {
		color: "#ff8800",
		edge: '#00000044',
		conveyorUp: true
	},
}
//const slicer = new Slicing()
//const tesseractMesh = new Mode4D(document).constructTesseract()
var level = [[1, [55, 50, 12, 7], [50, 50, 50, 50], undefined],[2, [180, 70, 12, 7], [50, 50, 50, 50], undefined]]//[block, position, size, transform, ...other]
var matrixInfo = [undefined, undefined] //optimisation
var lastFrame = 0
var selected = null
var player = {
	camera: {
		position: [80,120,40,7],
		position3: [10,20,10],
		vector: [0,0,1,0],
		matrix: deepCopy(ident),
		matrix3: deepCopy(ident3),
		invMatrix: deepCopy(ident)
	},
	checkPoint: {
		position: [80,170,12+25,7],
		velocity: [0,0,0,0],
		gravity: [0, -100, 0, 0],
		gravMatrix: deepCopy(ident),
		gravInverse: deepCopy(ident),
		jumps: 1,
		maxJumps: 1,
	},
	position: [80,170,12+25,7],
	velocity: [0,0,0,0],
	gravity: [0, -100, 0, 0],
	gravMatrix: deepCopy(ident),
	gravInverse: deepCopy(ident),
	jumps: 1,
	maxJumps: 1,
	now: new Date().getTime()+1
}
function renderMarch() {
	for (i=0;i<canvas.width;i++) {
		for (j=0;j<canvas.height;j++){
			let rayVector = player.camera.vector//change this later to be based on camera?
			let xfact=((i/canvas.width)-0.5)*90*degToRad
			let yfact=((j/canvas.height)-0.5)*90*degToRad
			let rayPos = player.camera.position
			rayVector = foursq1x4matrixMult(multiply([[Math.cos(yfact),0,Math.sin(yfact),0],[0,1,0,0],[-Math.sin(yfact),0,Math.cos(yfact),0],[0,0,0,1]], [[Math.cos(xfact),-Math.sin(xfact),0,0],[Math.sin(xfact),Math.cos(xfact),0,0],[0,0,1,0],[0,0,0,1]], ), rayVector)
			context.fillStyle = "#ffffff"
			for (let k=0; k<10; k++) {
				let best = Infinity
				let bestPoint = null
				let shouldBreak = false
				level.forEach((x,i)=>{
					if (shouldBreak) return
					let pos = pointToBlock(x, rayPos, matrixInfo[i])
					let relPos = vectorSub(rayPos, pos) 
					if (vectorMag(relPos) < best) {best = vectorMag(relPos);bestPoint = pos}
					if (best < 0.01) {
						context.fillStyle = "rgb("+[255-255/k,255-255/k,255-255/k]+")";
						shouldBreak = true
					}
				})
				if (shouldBreak) {
					break;
				} else {
					context.fillStyle = "rgb("+[255-255/best,255-255/best,255-255/best]+")";
				}
				rayPos = vectorAdd(rayPos, vectorMul(rayVector, best))
			}
			context.fillRect(i,canvas.height-j,1,1)
		}
	}
}
function getScreenCoords(x) {
	let pos = x
	pos=vectorSub(pos, player.camera.position)
	let S = 1
	pos=[vectorDot2(pos, player.camera.matrix[0])*S,vectorDot2(pos, player.camera.matrix[1])*S,vectorDot2(pos, player.camera.matrix[2])*S, pos[3]]//xyz position
	let T = 1/Math.tan(Math.PI/4)
	S = T / vectorDot2(pos.slice(0,3), player.camera.matrix3[2])
	pos=[vectorDot2(pos.slice(0,2), player.camera.matrix3[0])*S,vectorDot2(pos.slice(0,2), player.camera.matrix3[1])*S, pos[2], pos[3]]//xy z depth position
	//console.clear()
	//console.log(pos[2])
	return pos.map(x=>((x+2.5)/10))
}
function render() {
	let faces = level.map((block,i)=>{
		let hasMtx = false
		if (matrixInfo[i]) hasMtx = true
		let onWpos = false
		let onWneg = false
		let blockCamCoords = vertexes4D.forEach(x=>{
			if (onWneg && onWpos) return
			let T = 1/Math.tan(Math.PI/4)
			let pos = x
			pos = vectorDot(pos, block[2])
			if (hasMtx) pos = foursq1x4matrixMult(matrixInfo[i][0],pos)
			pos=vectorAdd(pos, block[1])//vertex positions
			pos=vectorSub(pos, player.camera.position)
			pos[3]=vectorDot2(pos, player.camera.matrix[3])
			if (pos[3] < 20) onWneg = true
			if (pos[3] > block[2][3]-20) onWpos = true
		})
		let canInteract = onWneg && onWpos
		let vertexes = vertexes4D.map(x=>{
			let T = 1/Math.tan(Math.PI/4)
			let pos = x
			pos = vectorDot(pos, block[2])
			if (hasMtx) pos = foursq1x4matrixMult(matrixInfo[i][0],pos)
			pos=vectorAdd(pos, block[1])//vertex positions
			let posinworld = pos
			pos=vectorSub(pos, player.camera.position)
			if (!canInteract) return [x, [-Infinity, -Infinity, pos[2], pos[3]]]
			let S = 1
			pos=[vectorDot2(pos, player.camera.matrix[0])*S,vectorDot2(pos, player.camera.matrix[1])*S,vectorDot2(pos, player.camera.matrix[2])*S, pos[3]]//xyz position
			S = T / vectorDot2(pos.slice(0,3), player.camera.matrix3[2])
			if (S < 0) return [x, [-Infinity, -Infinity, pos[2], pos[3]]]
			pos=[vectorDot2(pos.slice(0,2), player.camera.matrix3[0])*S,vectorDot2(pos.slice(0,2), player.camera.matrix3[1])*S, pos[2], pos[3]]//xy z depth position
			//console.clear()
			//console.log(pos[2])
			return [x, pos.map(x=>((x+2.5)/10))]
		})
		let vertexesMap = {}
		vertexes.forEach((x)=>{
			vertexesMap[x[0].toString()] = x[1]//set up for (hopefully) fast transforming into faces
		})
		return faces4D.map(x=>x.map(y=>vertexesMap[y.toString()]))
		//return xyz faces of block, zdepth
	})
	context.fillStyle = "#ffffff"
	context.fillRect(0,0,canvas.width,canvas.height)
	faces=faces.map((y,i)=>y.map(x=>x.concat(i))).reduce((a,b)=>a.concat(b)).sort((a,b)=>{
		let A = a[0][2]+a[1][2]+a[2][2]+a[3][2]
		let B = b[0][2]+b[1][2]+b[2][2]+b[3][2]
		if (A < B) {return 1} else {return -1}})
		faces.forEach(x=>{
			//context.fillStyle = "#ffffff"
			//context.fillRect(0,0,canvas.width,canvas.height)
			let zm = 0//(level[x[x.length-1]][2][2])/100
			//let A = x[0][2]+x[1][2]+x[2][2]+x[3][2]
			//let B = x[0][3]+x[1][3]+x[2][3]+x[3][3]
			//if (x[0][0] < -0.2 || x[1][0] < -0.2||x[2][0] < -0.2||x[3][0] < -0.2) {return}
			//if (x[0][1] < -0.2 || x[1][1] < -0.2||x[2][1] < -0.2||x[3][1] < -0.2) {return}
			if (x[0][0] == -Infinity || x[1][0] == -Infinity||x[2][0] == -Infinity||x[3][0] == -Infinity) {return}
			//if (x[0][1] > 1.2 || x[1][1] > 1.2||x[2][1] > 1.2||x[3][1] > 1.2) {return}
			
			//if ((x[0][2] < zm || x[1][2] < zm||x[2][2] < zm||x[3][2] < zm)) {return}
			//if ((x[0][3] < wm || x[1][3] < wm||x[2][3] < wm||x[3][3] < wm)) {return}
			let p01 = whereInt(x[0], x[1])
			let p10 = whereInt(x[1], x[0])
			let p12 = whereInt(x[1], x[2])
			let p21 = whereInt(x[2], x[1])
			let p23 = whereInt(x[2], x[3])
			let p32 = whereInt(x[3], x[2])
			let p30 = whereInt(x[3], x[0])
			let p03 = whereInt(x[0], x[3])
			//let p03 = whereInt(x[0], x[3])
			let blockProps = blockPropsG[level[x[x.length-1]][0]] ?? {}
			if ((typeof blockProps) == "function") blockProps = blockProps(x)
			context.moveTo(p01[0]*canvas.width,canvas.height-p01[1]*canvas.height)
			context.beginPath()
			context.lineWidth = 1
			context.strokeStyle = blockProps.edge ?? "#000000"
			context.fillStyle = blockProps.color ?? "#ff00ff"
			if (x[x.length-1] == selected) {
				context.lineWidth = 5
				context.strokeStyle = "#0000ff"
			}
			// 
			context.lineTo(p10[0]*canvas.width,canvas.height-p10[1]*canvas.height)
			context.lineTo(p12[0]*canvas.width,canvas.height-p12[1]*canvas.height)
			context.lineTo(p21[0]*canvas.width,canvas.height-p21[1]*canvas.height)
			context.lineTo(p23[0]*canvas.width,canvas.height-p23[1]*canvas.height)
			context.lineTo(p32[0]*canvas.width,canvas.height-p32[1]*canvas.height)
			context.lineTo(p30[0]*canvas.width,canvas.height-p30[1]*canvas.height)
			context.lineTo(p03[0]*canvas.width,canvas.height-p03[1]*canvas.height)
			context.lineTo(p01[0]*canvas.width,canvas.height-p01[1]*canvas.height)
			//console.log(p01)
			//document.getElementById("log").innerHTML += "<br>"+p01.map(Math.floor) + " | "+p12.map(Math.floor)+" | "+p23.map(Math.floor)+" | "+p30.map(Math.floor)		//context.lineTo(p03[0]*canvas.width,canvas.height-p03[1]*canvas.height)
			context.fill()
			context.stroke()
		})
		/*let x = getScreenCoords(vectorAdd(player.position,foursq1x4matrixMult(player.camera.matrix, [0.6804138174397717, 0.6804138174397717, 0.272165526975908,0])))
		context.fillStyle = "#0000ff88"
		context.fillRect(x[0]*canvas.width-2,canvas.height-x[1]*canvas.height-1,3,1)
		context.fillRect(x[0]*canvas.width-1,canvas.height-x[1]*canvas.height-2,1,3)*/
		if (control.x) {
			renderBlock(vectorAdd(player.position,vectorSub(foursq1x4matrixMult(player.camera.matrix, [136.08276348795434,136.08276348795434,54.4331053951816,0]), [25,25,25,0])), [50,50,50,50], "#00000000", "#00000088")
		}
}
function renderBlock(pos, width, color, border, matrix) {
	let faces = ((block,i)=>{
		let hasMtx = false
		if (matrix) hasMtx = true
		let onWpos = false
		let onWneg = false
		let blockCamCoords = vertexes4D.forEach(x=>{
			if (onWneg && onWpos) return
			let T = 1/Math.tan(Math.PI/4)
			let pos = x
			pos = vectorDot(pos, block[2])
			if (hasMtx) pos = foursq1x4matrixMult(matrix,pos)
			pos=vectorAdd(pos, block[1])//vertex positions
			pos=vectorSub(pos, player.camera.position)
			pos[3]=vectorDot2(pos, player.camera.matrix[3])
			if (pos[3] < 20) onWneg = true
			if (pos[3] > block[2][3]-20) onWpos = true
		})
		let canInteract = onWneg && onWpos
		//console.log(canInteract)
		let vertexes = vertexes4D.map(x=>{
			let T = 1/Math.tan(Math.PI/4)
			let pos = x
			pos = vectorDot(pos, block[2])
			if (hasMtx) pos = foursq1x4matrixMult(matrix, pos)
			pos=vectorAdd(pos, block[1])//vertex positions
			//console.log(pos[3])
			let posinworld = pos
			pos=vectorSub(pos, player.camera.position)
			if (!canInteract) return [x, [-Infinity, -Infinity, pos[2], pos[3]]]
			let S = 1
			pos=[vectorDot2(pos, player.camera.matrix[0])*S,vectorDot2(pos, player.camera.matrix[1])*S,vectorDot2(pos, player.camera.matrix[2])*S, pos[3]]//xyz position
			S = T / vectorDot2(pos.slice(0,3), player.camera.matrix3[2])
			if (S < 0 || S > 30) return [x, [-Infinity, -Infinity, pos[2], pos[3]]]
			pos=[vectorDot2(pos.slice(0,2), player.camera.matrix3[0])*S,vectorDot2(pos.slice(0,2), player.camera.matrix3[1])*S, pos[2], pos[3]]//xy z depth position
			//console.clear()
			//console.log(pos[2])
			return [x, pos.map(x=>((x+2.5)/10))]
		})
		let vertexesMap = {}
		vertexes.forEach((x)=>{
			vertexesMap[x[0].toString()] = x[1]//set up for (hopefully) fast transforming into faces
		})
		return faces4D.map(x=>x.map(y=>vertexesMap[y.toString()]))
		//return xyz faces of block, zdepth
	})([0, pos, width])
	faces=faces.map((y,i)=>y.map(x=>x.concat(i))).sort((a,b)=>{
		let A = a[0][2]+a[1][2]+a[2][2]+a[3][2]
		let B = b[0][2]+b[1][2]+b[2][2]+b[3][2]
		if (A < B) {return 1} else {return -1}})
		faces.forEach(x=>{
			if (x[0][0] == -Infinity || x[1][0] == -Infinity||x[2][0] == -Infinity||x[3][0] == -Infinity) {return}
			let p01 = whereInt(x[0], x[1])
			let p12 = whereInt(x[1], x[2])
			let p23 = whereInt(x[2], x[3])
			let p30 = whereInt(x[3], x[0])
			//let p03 = whereInt(x[0], x[3])
			context.moveTo(p01[0]*canvas.width,canvas.height-p01[1]*canvas.height)
			context.beginPath()
			context.lineWidth = 1
			context.strokeStyle = border
			context.fillStyle = color
			context.lineTo(p12[0]*canvas.width,canvas.height-p12[1]*canvas.height)
			context.lineTo(p23[0]*canvas.width,canvas.height-p23[1]*canvas.height)
			context.lineTo(p30[0]*canvas.width,canvas.height-p30[1]*canvas.height)
			context.lineTo(p01[0]*canvas.width,canvas.height-p01[1]*canvas.height)
			//document.getElementById("log").innerHTML += "<br>"+p01.map(Math.floor) + " | "+p12.map(Math.floor)+" | "+p23.map(Math.floor)+" | "+p30.map(Math.floor)		//context.lineTo(p03[0]*canvas.width,canvas.height-p03[1]*canvas.height)
			//console.log(context.fill)
			context.fill()
			context.stroke()
		})
}
function respawn() {
	Object.keys(player.checkPoint).forEach((x)=>{
		player[x]=deepCopy(player.checkPoint[x])
	})
}
function flipy(x) {return [x[0],1-x[1]]}
function squish(x) {
	return [x[0],x[1]]//really minor qol
}
const leftEdge  = [[0, 0], [0, 1]]
const rightEdge = [[1, 0],[1, 1]]
const topEdge   = [[0, 0], [1, 0]]
const bottomEdge= [[0,1], [1, 1]]//really really minor optimisations
function whereInt(x,y) {
	if (x[0] > 0 && x[0] < 1 && x[1] < 1 && x[1] > 0) return x//within bounds
	// i hate this
	let z = []
	let w = []
	let v = [squish(x), squish(y)]
	w = math.intersect(...v, ...leftEdge)
	if (w) z.push(w)
	w = math.intersect(...v, ...rightEdge)
	if (w) z.push(w)
	w = math.intersect(...v, ...topEdge)
	if (w) z.push(w)
	w = math.intersect(...v, ...bottomEdge)
	if (w) z.push(w)
	if (z.length > 0) {
		return z.reduce((a,b)=>{
			let u = Math.sqrt((x[0]-b[0])**2 + (x[1]-b[1])**2)
			//debugger
			if (u < a[1]) {
				return [b, u]
			}
			return a
		}, [z[0], Infinity])[0]
	}
	return x//should never be here but juuust in case
}
function renderSlice() {
	let modW= foursq1x4matrixMult(player.camera.matrix,player.camera.position)[3]
	let faces = level.map((block,i)=>{
		let hasMtx = false
		if (matrixInfo[i]) hasMtx = true
		tesseractMesh.matrix.elements=[...(player.camera.matrix.reduce((a,b)=>a.concat(b)))]
		//tesseractMesh.applyMatrix({elements:[...player.camera.matrix.reduce((a,b)=>a.concat(b))]})
		tesseractMesh.matrixWorld = tesseractMesh.matrix.getInverse(tesseractMesh.matrix)
		//console.log(tesseractMesh.matrix)
		geom=slicer.SliceConvex4D(tesseractMesh, tesseractMesh.rawFacets, 'w', modW/block[2][3])
		if (!geom) return []
		let vertexes = geom.vertices.map(x=>{
			let T = 1/Math.tan(Math.PI/6)
			let pos = [x.x,x.y,x.z,0]
			if (hasMtx) pos = foursq1x4matrixMult(matrixInfo[i][0],x)
			pos=vectorAdd(vectorDot(pos, block[2]), block[1])//vertex positions
			pos=vectorSub(pos, player.camera.position)
			let S = T / vectorDot2(pos, player.camera.matrix[3])
			pos=[vectorDot2(pos, player.camera.matrix[0])*S,vectorDot2(pos, player.camera.matrix[1])*S,vectorDot2(pos, player.camera.matrix[2])*S, pos[3]]//xyz position
			S = T / vectorDot2(pos.slice(0,3), player.camera.matrix3[2])
			pos=[vectorDot2(pos.slice(0,2), player.camera.matrix3[0])*S,vectorDot2(pos.slice(0,2), player.camera.matrix3[1])*S,pos[2], pos[3]]//xy z depth position
			return [x, pos.map(x=>((x+5)/10))]
		})
		let vertexesMap = {}
		vertexes.forEach((x,i)=>{
			vertexesMap[i] = x[1]//set up for (hopefully) fast transforming into faces
		})
		return geom.faces.map(x=>[vertexesMap[x.a],vertexesMap[x.b],vertexesMap[x.c]])
		//return xyz faces of block, zdepth
	})
	context.fillStyle = "#ffffff"
	context.fillRect(0,0,canvas.width,canvas.height)
	faces=faces.map((y,i)=>y.map(x=>x.concat(i))).reduce((a,b)=>a.concat(b)).sort((a,b)=>{
		let A = a[0][2]+a[1][2]+a[2][2]
		let B = b[0][2]+b[1][2]+b[2][2]
		if (A >= B) {return 1} else {return -1}})
		faces.forEach(x=>{
			//context.fillStyle = "#ffffff"
			//context.fillRect(0,0,canvas.width,canvas.height)
			/*
			if (x[0][0] < 0 || x[1][0] < 0||x[2][0] < 0||x[3][0] < 0) {return}
			if (x[0][1] < 0 || x[1][1] < 0||x[2][1] < 0||x[3][1] < 0) {return}
			if (x[0][0] > 1 || x[1][0] > 1||x[2][0] > 1||x[3][0] > 1) {return}
			if (x[0][1] > 1 || x[1][1] > 1||x[2][1] > 1||x[3][1] > 1) {return}*/
			context.moveTo(x[0][0]*canvas.width,canvas.height-x[0][1]*canvas.height)
			context.beginPath()
			context.strokeStyle = "#00000044"
			context.fillStyle = colors[level[x[x.length-1]][0]]
			context.lineTo(x[1][0]*canvas.width,canvas.height-x[1][1]*canvas.height)
			context.lineTo(x[2][0]*canvas.width,canvas.height-x[2][1]*canvas.height)
			context.lineTo(x[0][0]*canvas.width,canvas.height-x[0][1]*canvas.height)
			context.fill()
			context.stroke()
		})
}//i need to convert the rot. matrix to a vector for raymarching eventually don't i
function handleRescale() {
	let scale = Math.min(window.innerHeight/canvas.height*3,window.innerWidth/canvas.width*4)
	if (scale == window.innerHeight/canvas.height*3) {
		scale /=3
	} else {
		scale /= 4
	}
	scale = scale
	canvas.style.transform = "scale("+scale+","+scale+")"
	document.getElementById("player").style.transform = "scale("+scale+","+scale+")"
}
function gravSquish(x) {
	let mag = vectorMag(x)
	let y =foursq1x4matrixMult(player.gravMatrix,x)
	y[1] = 0
	y=foursq1x4matrixMult(player.gravInverse,y)
	return vectorMul(y, mag)
}
function gravSquishNoMag(x) {
	let y =foursq1x4matrixMult(player.gravMatrix,x)
	y[1] = 0
	y=foursq1x4matrixMult(player.gravInverse,y)
	return y
}
function tick(delta) {
	let dt=(((delta??(lastFrame+1))-lastFrame)/1000)
	//console.log([dt,new Date().getTime()-lastFrame])
	lastFrame = delta
	if (control.left) {
		player.velocity = vectorAdd(player.velocity,vectorMul(gravSquish(foursq1x4matrixMult(player.camera.matrix, [-30,0,0,0])), dt))
	}
	if (control.right) {
		player.velocity = vectorAdd(player.velocity,vectorMul(gravSquish(foursq1x4matrixMult(player.camera.matrix, [30,0,0,0])), dt))
	}
	if (control.up) {
		player.velocity = vectorAdd(player.velocity,vectorMul(gravSquish(foursq1x4matrixMult(player.camera.matrix, [0,0,30,0])), dt))
	}
	if (control.down) {
		player.velocity = vectorAdd(player.velocity,vectorMul(gravSquish(foursq1x4matrixMult(player.camera.matrix, [0,0,-30,0])), dt))
	}
	if (control.ana) {
		player.velocity = vectorAdd(player.velocity,vectorMul(gravSquish(foursq1x4matrixMult(player.camera.matrix, [0,0,0,30])), dt))
	}
	if (control.kata) {
		player.velocity = vectorAdd(player.velocity,vectorMul(gravSquish(foursq1x4matrixMult(player.camera.matrix, [0,0,0,-30])), dt))
	}
	//console.clear()
	document.getElementById("log").innerHTML = ""
	//document.getElementById("log").innerHTML += player.position.map(Math.floor) + "|" + player.velocity.map(Math.floor) + " | " + player.gravity.map(Math.floor)
	//debugger
	player.velocity = vectorAdd(player.velocity, vectorMul(player.gravity, dt))
	player.position = vectorAdd(player.position, vectorMul(player.velocity, dt))
	level.forEach((x,i)=>{
		let point = pointToBlock(x, player.position, matrixInfo[i])
		let relpoint = vectorSub(player.position,point)
		let dist = vectorMag(relpoint)
		//console.warn(dist)
		//document.getElementById("log").innerHTML += "<br>"+Math.floor(dist)+" | "+relpoint.map(Math.floor)+" | "+point.map(Math.floor)
		if (dist < 20) {
			//console.log(dist)
			if (!isNaN(vectorNorm(relpoint)[0])) {
				let oldPos = deepCopy(player.position)
				let multiplier = 20-dist
				let blockProps = blockPropsG[x[0]] ?? {}
				if ((typeof blockProps) == "function") blockProps = blockProps(x)
				if (!blockProps.isNonSolid) {
					player.position = vectorAdd(player.position, vectorMul(vectorNorm(relpoint), multiplier))
					player.velocity = vectorSub(player.velocity, vectorMul(vectorSub(oldPos, player.position),10))
					let normPoint = vectorNorm(relpoint)
					let normGrav  = vectorNorm(player.gravity)
					let angle = Math.acos(normPoint[0] * normGrav[0] + normPoint[1] * normGrav[1]+normPoint[2] * normGrav[2]+normPoint[3] * normGrav[3])
					if (angle > Math.PI - degToRad * 45) {
						player.jumps = player.maxJumps
						if (blockProps.bounce) player.velocity = vectorAdd(gravSquishNoMag(player.velocity), vectorMul(vectorInv(vectorNorm(player.gravity)),250))
					} else {
						if (blockProps.conveyorUp) player.velocity = vectorAdd(gravSquishNoMag(player.velocity), vectorMul(vectorInv(vectorNorm(player.gravity)),100))
					}
				}
				if (blockProps.death) respawn()
			}
		}
		let squishVel = gravSquishNoMag(player.velocity)
		let diff = vectorSub(player.velocity, squishVel)
		player.velocity = vectorAdd(diff,vectorDiv(squishVel, Math.pow(2, dt*3)))
	})
	player.camera.position = deepCopy(player.position)
	render()
	requestAnimationFrame(tick)
}
//document.getElementById("player").getContext("2d").arc(128,96,2,0,Math.PI*2)
document.getElementById("player").getContext("2d").fillStyle="#000000"
document.getElementById("player").getContext("2d").fillRect(127,96,3,1)
document.getElementById("player").getContext("2d").fillRect(128,95,1,3)
//document.getElementById("player").getContext("2d").fill()
matrixInfo = level.map((block)=>{if (block[3]) if (block[3][0]) if (block[3][0][0]) return [block[3], math.inv(block[3])]})
window.addEventListener('resize', handleRescale)
handleRescale()
var control = {}
document.addEventListener("keyup", function (input) {
    let key = input.code;
    switch (key) {
      case "ArrowLeft":
      case "KeyA":
        control.left = false;
        break;
      case "ArrowRight":
      case "KeyD":
        control.right = false;
        break;
      case "ArrowUp":
      case "KeyW":
        control.up = false;
        break;
      case "ArrowDown":
      case "KeyS":
        control.down = false;
        break;
	  case "KeyQ":
        control.kata = false;
        break;
	  case "KeyE":
        control.ana = false;
        break;
	  case "Space":
		if (player.jumps > 0) {
			player.velocity = vectorAdd(gravSquishNoMag(player.velocity), vectorMul(vectorInv(vectorNorm(player.gravity)),150))
			player.jumps--
		}
	  break;
	  case "KeyX":
		control.x = false
		level.push([1, vectorAdd(player.position,vectorSub(foursq1x4matrixMult(player.camera.matrix, [136.08276348795434,136.08276348795434,54.4331053951816,0]), [25,25,25,0])), [50,50,50,50], undefined])
		matrixInfo.push(undefined)
	  break;
	  case "KeyM":
		player.camera.matrix = deepCopy(ident)
		break;
	}
})
document.addEventListener("keydown", function (input) {
    let key = input.code;
    /*if (!(key === "F12" || (key === "KeyC" && input.altKey && input.metaKey))) {
      input.preventDefault();
    }*/
    switch (key) {
      case "ArrowUp":
      case "KeyW":
        if (!input.shiftKey && !(input.ctrlKey || input.metaKey)) {
          control.up = true;
        }
        break;
      case "ArrowDown":
      case "KeyS":
        if (!input.shiftKey && !(input.ctrlKey || input.metaKey))
          control.down = true;
        break;
      case "ArrowLeft":
      case "KeyA":
        if (!input.shiftKey && !(input.ctrlKey || input.metaKey))
          control.left = true;
        break;
      case "ArrowRight":
      case "KeyD":
        if (!input.shiftKey && !(input.ctrlKey || input.metaKey))
          control.right = true;
        break;
	  case "KeyQ":
        control.kata = true;
        break;
	  case "KeyE":
        control.ana = true;
        break;
	  case "KeyX":
		control.x = true;
	  break;
	  case "KeyR":
		respawn()
	  break;
	}
})
document.addEventListener("mousemove", function (input) {
    input.preventDefault();
    let xfact = input.movementX/100
    let yfact = input.movementY/100
	if (input.ctrlKey) {
		player.camera.matrix=multiply(player.camera.matrix, 
		multiply(
		multiply(
		[
		[Math.cos(xfact),-Math.sin(xfact),0,0],
		[Math.sin(xfact),Math.cos(xfact),0,0],
		[0,0,1,0],
		[0,0,0,1]],
		[
		[1,0,0,0],
		[0,1,0,0],
		[0,0,Math.cos(xfact),Math.sin(xfact)],
		[0,0,-Math.sin(xfact),Math.cos(xfact)]],
		),
		multiply(
		[[Math.cos(yfact),0,Math.sin(yfact),0],[0,1,0,0],[-Math.sin(yfact),0,Math.cos(yfact),0],[0,0,0,1]],
		[
		[Math.cos(yfact),0,0,-Math.sin(yfact)],
		[0,1,0,0],
		[0,0,1,0],
		[Math.sin(yfact),0,0,Math.cos(yfact)]]
		)
		))
	} else if (!input.shiftKey) {
		player.camera.matrix=
		multiply(
		multiply(
		[
		[Math.cos(xfact),0,Math.sin(xfact),0],
		[0,1,0,0],
		[-Math.sin(xfact),0,Math.cos(xfact),0],
		[0,0,0,1]
		],//XZ plane
		[
		[1,0,0,0],
		[0,Math.cos(yfact),-Math.sin(yfact),0],
		[0,Math.sin(yfact),Math.cos(yfact),0],
		[0,0,0,1]//YZ plane
		]
		),
		player.camera.matrix,
		)
	} else {
		player.camera.matrix=multiply(player.camera.matrix, multiply(
		[
		[Math.cos(xfact),-Math.sin(xfact),0,0],
		[Math.sin(xfact),Math.cos(xfact),0,0],
		[0,0,1,0],
		[0,0,0,1],//XY plane
		],
		[
		[Math.cos(yfact),0,0,-Math.sin(yfact)],
		[0,1,0,0],
		[0,0,1,0],
		[Math.sin(yfact),0,0,Math.cos(yfact)]//XW plane
		]))
	}
	xfact = -xfact
    yfact = -yfact
	if (input.ctrlKey) {
		player.camera.invMatrix=multiply(player.camera.invMatrix, 
		multiply(
		multiply(
		[
		[Math.cos(xfact),-Math.sin(xfact),0,0],
		[Math.sin(xfact),Math.cos(xfact),0,0],
		[0,0,1,0],
		[0,0,0,1]],
		[
		[1,0,0,0],
		[0,1,0,0],
		[0,0,Math.cos(xfact),Math.sin(xfact)],
		[0,0,-Math.sin(xfact),Math.cos(xfact)]],
		),
		multiply(
		[[Math.cos(yfact),0,Math.sin(yfact),0],[0,1,0,0],[-Math.sin(yfact),0,Math.cos(yfact),0],[0,0,0,1]],
		[
		[Math.cos(yfact),0,0,-Math.sin(yfact)],
		[0,1,0,0],
		[0,0,1,0],
		[Math.sin(yfact),0,0,Math.cos(yfact)]]
		)
		))
	} else if (!input.shiftKey) {
		player.camera.invMatrix=
		multiply(
		multiply(
		[
		[Math.cos(xfact),0,Math.sin(xfact),0],
		[0,1,0,0],
		[-Math.sin(xfact),0,Math.cos(xfact),0],
		[0,0,0,1]
		],//XZ plane
		[
		[1,0,0,0],
		[0,Math.cos(yfact),-Math.sin(yfact),0],
		[0,Math.sin(yfact),Math.cos(yfact),0],
		[0,0,0,1]//YZ plane
		]
		),
		player.camera.invMatrix,
		)
	} else {
		player.camera.invMatrix=multiply(player.camera.invMatrix, multiply(
		[
		[Math.cos(xfact),-Math.sin(xfact),0,0],
		[Math.sin(xfact),Math.cos(xfact),0,0],
		[0,0,1,0],
		[0,0,0,1],//XY plane
		],
		[
		[Math.cos(yfact),0,0,-Math.sin(yfact)],
		[0,1,0,0],
		[0,0,1,0],
		[Math.sin(yfact),0,0,Math.cos(yfact)]//XW plane
		]))
	}
})
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.getElementById("button").onclick = ()=>{
	canvas.requestFullscreen().then(()=>{
		canvas.requestPointerLock()
	})
}
document.addEventListener("mousedown", function(input){
	//input.preventDefault()
})
document.addEventListener("contextmenu", function(input){
	input.preventDefault()//march ray to select things
	let rayPos = player.camera.position
	let metaBest = Infinity
	rayVector = foursq1x4matrixMult(player.camera.matrix, [0.6804138174397717, 0.6804138174397717, 0.272165526975908,0])
	//console.log(rayVector)
	selected = null
	for (let k=0; k<10; k++) {
		let best = Infinity
		let bestPoint = null
		let shouldBreak = false
		level.forEach((x,i)=>{
			if (shouldBreak) return
			let pos = pointToBlock(x, rayPos, matrixInfo[i])
			let relPos = vectorSub(rayPos, pos) 
			if (vectorMag(relPos) < best) {best = vectorMag(relPos);bestPoint = pos;if (best < metaBest) {metaBest = best;selected = i}}
			if (best < 0.01) {
				selected = i
				shouldBreak = true
			}
		})
		if (shouldBreak) {
			break;
		}
		rayPos = vectorAdd(rayPos, vectorMul(rayVector, best))
	}
	if (selected != null) {//just in case it's a void level
		let editor = document.getElementById("editor")
		editor.innerHTML = ''//erase everything
		let axies = ["X","Y","Z","W","Width","Height","Depth","Quad"]//what's the name for multiple axises
		for (let i=0;i<8;i++) {
			let elem=document.createElement("span")
			editor.appendChild(elem)
			let elemm = document.createElement("span")
			elem.appendChild(elemm)
			elemm.textContent = axies[i]
			elemm = document.createElement("input")
			elemm.type = "text"
			elemm.id = axies[i].toLowerCase()
			elem.appendChild(elemm)
			elemm.value = level[selected][1].concat(level[selected][2])[i]
			elemm = document.createElement("br")
			elem.appendChild(elemm)
		}
		let elem=document.createElement("span")
		editor.appendChild(elem)
		let elemm = document.createElement("span")
		elem.appendChild(elemm)
		elemm.textContent = "Type"
		elemm = document.createElement("input")
		elemm.type = "text"
		elemm.id = "type"
		elemm.value = level[selected][0]
		elem.appendChild(elemm)//spaghetti code go br
		elemm = document.createElement("br")
		elem.appendChild(elemm)
		elem=document.createElement("button")
		editor.appendChild(elem)
		elem.textContent = "Save"
		elem.onclick = function() {
			axies.forEach((x, i)=>{
				let y = parseFloat(document.getElementById(x.toLowerCase()).value)
				if (isNaN(y)) {
					document.getElementById(x.toLowerCase()).value = level[selected][1].concat(level[selected][2])[i]
					y = parseFloat(document.getElementById(x.toLowerCase()).value)
				}
				if (i < 4) {
					level[selected][1][i] = y
				} else {
					level[selected][2][i-4] = y
				}
			})
			let y = parseInt(document.getElementById("type").value)
			if (isNaN(y)) {
				document.getElementById("type").value = level[selected][0]
				y = parseFloat(document.getElementById(x.toLowerCase()).value)
			}
			level[selected][0] = y
		}
		elem=document.createElement("button")
		editor.appendChild(elem)
		elem.textContent = "Delete"
		elem.onclick = function() {
			if (selected != null) {
				level.splice(selected,1)
				selected = null
				editor.innerHTML = ''
			}
		}
		elem=document.createElement("button")
		editor.appendChild(elem)
		elem.textContent = "Deselect"
		elem.onclick = function() {
			selected = null
			editor.innerHTML = ''
		}
	}
})
function toggleFloatBox() {
	let elem = document.getElementById("floatbox")
	if (elem.style.display == "none") {
		elem.style.display = "block"
	} else {
		elem.style.display = "none"
	}
}
render()
tick(0)