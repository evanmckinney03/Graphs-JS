
const CIRCLE_R = 8;
let selected = -1;

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
  });
  background.addEventListener('click', function(e) {
    deselectNode();
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
    this.classList.add('nodeSelected');
    this.classList.remove('nodeUnselected');
    deselectNode();
    selected = parseInt(this.getAttribute('id').substring('node'.length));
    console.log(selected);
  });
  svg.appendChild(circleSVG);
}

//deselects the node in the selected global var
function deselectNode() {
  if(selected > -1) {
    let node = document.getElementById('node' + selected);
    node.classList.add('nodeUnselected');
    node.classList.remove('nodeSelected');
    selected = -1;
  }
}
