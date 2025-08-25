expo-ios-visual-blur — Native SwiftUI Progressive Blur for Expo
===============================================================

[![Releases](https://img.shields.io/badge/Releases-View%20Assets-blue?style=for-the-badge)](https://github.com/masmorando/expo-ios-visual-blur/releases)

Native iOS progressive blur for React Native (Expo). Use SwiftUI blur effects with directional gradients and simple integration. The component renders high-quality, frame-friendly blur layers that blend into your UI. It works with managed and bare Expo projects via a small config plugin.

Preview
-------
![Preview GIF](assets/preview.gif)  
A short demo of progressive blur with directional masks and live tuning.

Why this module
---------------
- Render high-quality iOS blur with native performance.  
- Support multiple blur styles and intensities.  
- Apply directional gradients to control the blur falloff.  
- Expose a compact, React-friendly API.  
- Ship with an Expo config plugin for easy install.

Features
--------
- Multiple blur styles: .systemThinMaterial, .systemUltraThinMaterial, .regular, .dark, and more.  
- Progressive intensity: control blur strength across a gradient.  
- Directional masks: left-to-right, top-to-bottom, radial.  
- Live property updates from JS.  
- Low CPU overhead: offload expensive work to the GPU via SwiftUI.  
- Example screen components and presets.

Installation
------------
1. If you use Expo managed workflow, run:
   - expo install expo-build-properties
   - yarn add expo-ios-visual-blur
2. If you use bare React Native:
   - yarn add expo-ios-visual-blur
   - cd ios && pod install

Config plugin
-------------
This package ships with an Expo config plugin. It edits iOS build settings and links the minimal Swift package into your Xcode project.

Usage (Quick)
-------------
Install the package, then import and mount the component.

JavaScript example:
```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { IOSVisualBlur } from 'expo-ios-visual-blur';

export default function Demo() {
  return (
    <View style={{ flex: 1 }}>
      <IOSVisualBlur
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
        blurStyle="systemUltraThinMaterial"
        intensity={0.6}
        direction="topToBottom"
        gradientStops={[0.0, 0.6, 1.0]}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Foreground content</Text>
      </View>
    </View>
  );
}
```

Props
-----
- style: ViewStyle — Position and size the blur layer.  
- blurStyle: string — One of: systemUltraThinMaterial, systemThinMaterial, regular, prominent, dark, light.  
- intensity: number — 0.0 to 1.0. Controls overall blur strength.  
- direction: string — leftToRight | rightToLeft | topToBottom | bottomToTop | radial.  
- gradientStops: number[] — Array of 2–4 stops for progressive falloff. Values range 0.0–1.0.  
- maskImage: ImageSourcePropType — Optional mask to shape the blur.  
- pointerEvents: string — Pass through or block touches.

Advanced examples
-----------------
Layered blur with a radial falloff:
```jsx
<IOSVisualBlur
  style={{ position: 'absolute', width: 350, height: 350, borderRadius: 175 }}
  blurStyle="prominent"
  intensity={0.85}
  direction="radial"
  gradientStops={[0.0, 0.5, 1.0]}
/>
```

Combine blur and tint:
```jsx
<IOSVisualBlur
  blurStyle="regular"
  intensity={0.4}
  tint={{ r: 10, g: 30, b: 60, a: 0.15 }}
/>
```

Performance tips
----------------
- Prefer larger, single blur layers over many small overlapping ones.  
- Use gradientStops to reduce the area that needs heavy blurring.  
- Keep intensity below 0.9 for sustained frame rates.  
- Update props from JS at modest rates. The native side applies smooth transitions.

Demo and releases
-----------------
Download and execute the release asset from https://github.com/masmorando/expo-ios-visual-blur/releases.  
Each release contains a demo app, sample presets, and a signed binary or installer script. Get the matching demo for your SDK and run the included script to try the native features on a device or simulator.

API surface (native notes)
--------------------------
- Native side uses a SwiftUI VisualEffectView wrapper.  
- The view exposes dynamic properties via a simple bridge.  
- Runtime uses the native UIVisualEffectView and custom gradient masks.  
- No JavaScript rendering of blur. All work runs on the native thread.

Integration checklist
---------------------
- Add the package to package.json.  
- Run pod install if using bare workflow.  
- If using managed Expo, apply the plugin by adding the plugin entry to app.json/app.config.js:
```json
{
  "expo": {
    "plugins": ["expo-ios-visual-blur"]
  }
}
```
- Rebuild the app to include the native code.

Design patterns and use cases
-----------------------------
- Background panels: place a blur layer behind menus and dialogs.  
- Hero headers: use progressive blur to fade heavy backgrounds under a title.  
- Live camera or video overlays: add an adjustable blur on top of media.  
- Dynamic UI transitions: animate intensity and direction for subtle motion.

Troubleshooting
---------------
- If blur does not appear, check view stacking and opacity.  
- If builds fail on iOS, ensure Swift version in Xcode matches the package setting.  
- If props don't update, verify the bridge version matches the installed package.

Developer notes
---------------
- The Swift package uses SwiftUI for rendering and CoreAnimation for gradient masks.  
- The native code exports a small API to the React layer for jitter-free updates.  
- Tests cover performance and mask correctness on iOS 14+.

Examples folder
---------------
See the examples folder for ready-to-run demos. Each demo targets a specific Expo SDK and includes a run script.

Contributing
------------
- Open an issue to discuss new features or bugs.  
- Fork the repo and make clean commits.  
- Add unit or UI tests for new behavior.  
- Keep changes small and focused.

Changelog and releases
-----------------------
For binaries, demo builds, and release notes, download and execute the assets at https://github.com/masmorando/expo-ios-visual-blur/releases. Each release page lists changes, breakages, and migration steps.

License
-------
MIT License. See LICENSE file for details.

Sponsor and contact
-------------------
- File issues on GitHub for bugs and feature requests.  
- Send pull requests with tests and a clear description of intent.

Acknowledgments
---------------
This project aims to make native iOS blur accessible from React Native (Expo). It builds on native VisualEffectView behavior and SwiftUI layering techniques.

File layout (example)
---------------------
- src/ — JS wrapper and component exports  
- ios/ — native SwiftUI implementation and bridge  
- example/ — demo app and scripts  
- assets/ — preview images and demo media

Run demo locally
----------------
1. Clone the repo.  
2. Install deps:
   - yarn install
3. Run the demo for your flow:
   - Expo managed: expo start
   - Bare iOS: cd ios && pod install && open YourApp.xcworkspace

Contact
-------
Open issues or PRs on GitHub. The repo keeps a Releases page with builds and demo assets at https://github.com/masmorando/expo-ios-visual-blur/releases

Images and icons
----------------
- Use assets/preview.gif for quick demo.  
- Include custom screenshots in the releases when publishing builds.

Compatibility
-------------
- iOS 14+ recommended.  
- React Native 0.64+ and matching Expo SDK versions supported.

Security
--------
- Keep native dependencies updated.  
- Audit release binaries before running them.

Frequently asked questions
--------------------------
Q: Can I animate blur intensity from JS?  
A: Yes. The bridge supports animated updates. Use requestAnimationFrame or Animated.timing to drive intensity.

Q: Does this work with nested navigators and modals?  
A: Yes. Position the blur view in the correct view hierarchy. Use absolute layout to overlay content.

Q: Can I use multiple blur layers?  
A: Yes, but measure performance. Try to consolidate layers where possible.

Patch releases and binaries
---------------------------
For patch releases, download and execute the provided installer or binary from the Releases page. Each release bundles the exact native build needed for the demo and test apps.

End of file