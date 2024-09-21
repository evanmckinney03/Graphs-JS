

window.onload = init;

function init() {
  let svg = document.getElementById('svg');
  svg.addEventListener('mousedown', function(e) {
    console.log([e.clientX, e.clientY])
  });
}
