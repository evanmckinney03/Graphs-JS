
const CIRCLE_R = 8;

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
    console.log('background dblclicked');
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
    console.log(this.getAttribute('id'));
    this.classList.add('nodeSelected');
    this.classList.remove('nodeUnselected');
  });
  svg.appendChild(circleSVG);
}
