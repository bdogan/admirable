import 'Phaser';

/**
 * Admirable scene decorator
 * @param _config Phaser.Types.Scenes.SettingsConfig
 */
export function AdmirableScene(_config: Phaser.Types.Scenes.SettingsConfig) {
  return function <T extends new(...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
          super(Object.assign(_config, args[0] || {}));
        }
    };
  };
}
