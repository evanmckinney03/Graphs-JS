
const CIRCLE_R = 8;

window.onload = init;

function init() {
  let svg = document.getElementById('svg');
  let id = 0;
  svg.addEventListener('mousedown', function(e) {
    createNode(e.clientX, e.clientY, id++);
  });
}

function createNode(x, y, id) {  
  let svg = document.getElementById('svg');
  let circleSVG = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleSVG.setAttribute('r', CIRCLE_R);
  circleSVG.setAttribute('cx', x);
  circleSVG.setAttribute('cy', y);
  circleSVG.setAttribute('class', 'node');
  circleSVG.setAttribute('id', 'node' + id);
  svg.appendChild(circleSVG);
}
