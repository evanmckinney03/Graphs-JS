
const CIRCLE_R = 8;
let selectedNode = -1;

window.onload = init;

function init() {
  const svg = document.getElementById('svg');
  //create a rectangle to fill the SVG background
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('width', svg.getAttribute('width'));
  background.setAttribute('height', svg.getAttribute('height'));
  background.setAttribute('id', 'background');
  svg.append(background);
  let nodeID = 0;
  background.addEventListener('dblclick', function(e) {
    createNode(e.clientX, e.clientY, nodeID++);
    console.log('background double clicked');
  });
  background.addEventListener('click', function(e) {
    deselectNode();
  });

  //check if delete key is pressed
  document.addEventListener('keydown', function(e) {
    if(e.key == 'Delete') {
      const element = document.getElementById('node' + selectedNode);
      if(element) {
        element.remove();
	selectedNode = -1;
      }
    }
  });
}

function createNode(x, y, nodeID) {  
  const svg = document.getElementById('svg');
  const circleSVG = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleSVG.setAttribute('r', CIRCLE_R);
  circleSVG.setAttribute('cx', x);
  circleSVG.setAttribute('cy', y);
  circleSVG.classList.add('node');
  circleSVG.classList.add('nodeUnselected');
  circleSVG.setAttribute('id', 'node' + nodeID);
  circleSVG.addEventListener('mousedown', function() {
    let nodeNum = parseInt(this.getAttribute('id').substring('node'.length));
    if(selectedNode != nodeNum) {
      //the node clicked is unselected
      if(selectedNode > -1) {
        //another node is selected
	console.log("draw line btwn " + selectedNode + " " + nodeNum);
	createLine(selectedNode, nodeNum);
      } else {
	//no other node is selected
        this.classList.add('nodeSelected');
        this.classList.remove('nodeUnselected');
        deselectNode();
        selectedNode = nodeNum;
      }
    } else {
      //the node clicked is selected
      deselectNode()
    }
  });
  svg.append(circleSVG);
}

function createLine(nodeA, nodeB) { 
  const svg = document.getElementById('svg');
  const nodeASVG = document.getElementById('node' + nodeA);
  const nodeBSVG = document.getElementById('node' + nodeB);
  const lineSVG = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineSVG.setAttribute('x1', nodeASVG.getAttribute('cx'));
  lineSVG.setAttribute('y1', nodeASVG.getAttribute('cy'));
  lineSVG.setAttribute('x2', nodeBSVG.getAttribute('cx'));
  lineSVG.setAttribute('y2', nodeBSVG.getAttribute('cy'));
  lineSVG.setAttribute('id', 'line' + nodeA + ',' + nodeB);
  lineSVG.setAttribute('class', 'line');
  //want to insert after the background rectangle so nodes are infront of the line
  const background = document.getElementById('background');
  svg.insertBefore(lineSVG, background.nextSibling);
}

//deselects the node in the selected global var
function deselectNode() {
  if(selectedNode > -1) {
    const node = document.getElementById('node' + selectedNode);
    node.classList.add('nodeUnselected');
    node.classList.remove('nodeSelected');
    selectedNode = -1;
  }
}
