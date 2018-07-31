(function() {
  console.log('INJECTED HERE TO MAKE TRELLO FUN');

  const sigmoid = x => (x / (1 + Math.abs(x)));
  let regRotateZ = /rotateZ\((.*?)\)/g;
  const rotateZValue = (transformString) => {
    if (transformString) {
      console.log(transformString);
      let intermediate = regRotateZ.exec(transformString);
      if (intermediate) {
        return +intermediate[1].split('d')[0];
      } else {
        return 0;
      }
    } 
    return 0;
  }

  let Mouse = {
    x: 0,
    y: 0
  };

  let t = {
    x: 0,
    y: 0
  };

  let target = document.querySelector('a.active-card');
  let zRotation = 0;

  const update = () => {

    if (!target) {
      target = document.querySelector('.active-card');
    }

    if (target && (target.style.position === 'absolute')) { 
      if (!target.style.transform) { // Target doesn't have a transform property yet
        target.style.transform = 'rotateZ(0)';
      } else { // Target has a transform property
        // zRotation = rotateZValue(target.style.transform);
        // Then update the roatation
        let xV = Mouse.x - t.x;

        t.x = Mouse.x;
        t.y = Mouse.y;

        zRotation = zRotation * 0.9 + ((sigmoid(xV)));
        if (Math.abs(zRotation) < 0.01) zRotation = 0;

        target.style.transform = `rotateZ(${zRotation}deg)`;
      }
    }

    requestAnimationFrame(update);
  };

  update();

  document.addEventListener('mousemove', (e) => {
    Mouse.x = e.clientX;
    Mouse.y = e.clientY;

    target = document.querySelector('.active-card');
  });

  document.addEventListener('mouseup', () => {
    // Remove the applied trasnfrom styles
    target.style.transform = '';
  });

})();