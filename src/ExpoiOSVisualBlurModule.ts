import { NativeModule, requireNativeModule } from 'expo';

import { ExpoiOSVisualBlurModuleEvents } from './ExpoiOSVisualBlur.types';

declare class ExpoiOSVisualBlurModule extends NativeModule<ExpoiOSVisualBlurModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoiOSVisualBlurModule>('ExpoiOSVisualBlur');
