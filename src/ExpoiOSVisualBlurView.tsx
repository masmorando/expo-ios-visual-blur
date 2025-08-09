import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoiOSVisualBlurViewProps } from './ExpoiOSVisualBlur.types';

const NativeView: React.ComponentType<ExpoiOSVisualBlurViewProps> =
  requireNativeView('ExpoiOSVisualBlur');

export default function ExpoiOSVisualBlurView(props: ExpoiOSVisualBlurViewProps) {
  return <NativeView {...props} />;
}
