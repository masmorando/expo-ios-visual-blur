import * as React from 'react';

import { ExpoiOSVisualBlurViewProps } from './ExpoiOSVisualBlur.types';

export default function ExpoiOSVisualBlurView(props: ExpoiOSVisualBlurViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
