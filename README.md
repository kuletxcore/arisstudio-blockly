# ArisStudio Blockly

A Blockly-based visual script builder for ArisStudio.

Because the upstream ArisStudio project has stopped development, this project is expected to be archived.

## Before you start

1. Download and extract a release of the ArisStudio project, then follow its documentation to download data assets and place them in the `Data` folder. Make sure `ArisStudio.exe` runs correctly.
2. Download and extract this project's release package, or open the browser version at `https://sanmusen214.github.io/arisstudio-blockly/`.
   - If you use the desktop app, you can enable automatic export. Click the auto-export button in the upper-right corner and select a text file from the ArisStudio project `0Txt` folder. Later Blockly edits will be exported automatically.
   - If you use the browser version, automatic saving is unavailable.
3. Use the generated script in ArisStudio.

## Usage notes

- Asset nicknames should not contain spaces. English nicknames are recommended.
- Character spr assets do not need file extensions in load commands. Other imported assets should include their file extensions where required.
- If ArisStudio reports that a key does not exist in the dictionary, check that the import name and the usage name match.
- Some large Blockly workspaces can become slow to drag. Use the mouse wheel for vertical scrolling and Shift + mouse wheel for horizontal scrolling when possible.

## Links

- ArisStudio: https://github.com/Tualin14/ArisStudio
- Blockly app releases: https://github.com/sanmusen214/arisstudio-blockly/releases
- Documentation: https://as.t14.me/docs/as-commands/load-commands
