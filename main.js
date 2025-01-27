const counterZoom = document.querySelector('zoom-value');

const btn = counterZoom.addEventListener('click', (event) => {
  const acczoomtext = document.querySelector('acc-zoom-text');
  console.log("counterZoom.value => "+counterZoom.value);
  acczoomtext.value = counterZoom.value;
  });  
  

  function toggleAction(event) {
  const zoomText = document.querySelector('acc-zoom-text');
  zoomText.active = event.active
  }