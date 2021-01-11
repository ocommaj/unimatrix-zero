import LifeGame from './_lifeGame';

const meshModifiers = {
  position(mesh, position) {
    for (const [key, value] of Object.entries(position)) {
      if (mesh.position.hasOwnProperty(key)) {
        mesh.position[key] = value;
      }
    }
  },
  rotate(mesh, rotation, isRelative = true) {
    for (const [key, value] of Object.entries(rotation)) {
      mesh.rotation[key] = isRelative ? mesh.rotation[key] + value : value;
    }
  },
  scale(mesh, scale) {
    for (const [key, value] of Object.entries(scale)) {
      mesh.scale[key] = value;
    }
  },
};

export { meshModifiers, LifeGame };
