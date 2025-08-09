import { registerWebModule, NativeModule } from 'expo';

import { ExpoiOSVisualBlurModuleEvents } from './ExpoiOSVisualBlur.types';

class ExpoiOSVisualBlurModule extends NativeModule<ExpoiOSVisualBlurModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoiOSVisualBlurModule, 'ExpoiOSVisualBlurModule');
