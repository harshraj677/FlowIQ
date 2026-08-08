# assets

This folder contains brand and design artifacts that support development and design work but are not bundled into the application binary.

Typical contents

- Approved logos, source SVGs, and high-resolution exports.
- Design mockups, screenshots, and style guides.
- Source files used by designers (Figma exports, Sketch, or Adobe files).

Usage guidance

- Runtime assets for the app should be placed in `mobile/assets` or `mobile/src/assets`.
- Use this folder for canonical brand files and documentation that designers and product stakeholders reference.
- Keep file names stable and add a small README note when updating primary brand marks.

Suggested improvements

- Add a `brand-guidelines.md` with color palettes, typography, and logo usage rules.
- Store optimized web-ready assets in a `dist/` subfolder to simplify CI export.
