export const AdmirableConfig: (config?: Phaser.Types.Core.GameConfig) => Phaser.Types.Core.GameConfig = (c) => Object.assign({
  title: 'Admirable',
  version: '0.1.0',
  url: 'https://github.com/bdogan/admirable',
  parent: 'admirable', // Wrapper id in the html file.
  type: Phaser.AUTO,
  backgroundColor: '#003459',
  autoFocus: true,
  disableContextMenu: true,
  fps: {
    target: 60,
  },
  input: {
    gamepad: false,
    keyboard: true,
    mouse: true,
    touch: false,
  },
  banner: {
    background: ['#00A8E8', '#007EA7', '#003459', '#00171F'],
    hidePhaser: true,
  },
  scale: {
    height: 480,
    resolution: 1,
    width: 960,
    zoom: 1,
  },
}, c || {}) as Phaser.Types.Core.GameConfig;
