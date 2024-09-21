
const CIRCLE_R = 8;
let selectedNode = -1;

window.onload = init;

function init() {
  let svg = document.getElementById('svg');
  let id = 0;
  //create a rectangle to fill the SVG background
  let background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('width', svg.getAttribute('width'));
  background.setAttribute('height', svg.getAttribute('height'));
  background.setAttribute('id', 'background');
  svg.appendChild(background);
  background.addEventListener('dblclick', function(e) {
    createNode(e.clientX, e.clientY, id++);
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

function createNode(x, y, id) {  
  let svg = document.getElementById('svg');
  let circleSVG = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleSVG.setAttribute('r', CIRCLE_R);
  circleSVG.setAttribute('cx', x);
  circleSVG.setAttribute('cy', y);
  circleSVG.classList.add('node');
  circleSVG.classList.add('nodeUnselected');
  circleSVG.setAttribute('id', 'node' + id);
  circleSVG.addEventListener('mousedown', function() {
    let nodeNum = parseInt(this.getAttribute('id').substring('node'.length));
    if(selectedNode != nodeNum) {
      //the node clicked is unselected
      this.classList.add('nodeSelected');
      this.classList.remove('nodeUnselected');
      deselectNode();
      selectedNode = nodeNum;
    } else {
      //the node clicked is selected
      deselectNode()
    }
  });
  svg.appendChild(circleSVG);
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
