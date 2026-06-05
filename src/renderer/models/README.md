# Command File Map

Invalid-input checks and default values are defined in each block definition. Uncomment the corresponding block folder `index` export when a block is complete. Do not rename block files.

## Load commands (`loadcmd.js`)

- Load spr characters
- Load custom characters
- Load png characters
- Load foreground, midground, and background images
- Load sound effects and background music

## Image commands (`imgcmd.js`)

- Show or hide with fade/highlight transitions
- Appear or disappear immediately
- Change opacity
- Set individual x/y/z coordinates
- Set x/y coordinates
- Move on a single x/y axis
- Move on the x/y plane
- Shake on the x/y axes
- Shake in random directions
- Scale on the x and y axes together

## Character commands (`charcmd.js`)

- Show or hide with fade/highlight transitions
- Appear or disappear immediately
- Highlight
- Change opacity
- Status
- Skin
- Expression
- Set character animation (currently unavailable)
- Set individual x/y/z coordinates
- Set x/y coordinates
- Move on a single x/y axis
- Move on the x/y plane
- Shake on the x/y axes
- Shake in random directions
- Scale on the x and y axes together
- Common scale actions: close up and return

## Sound commands (`soundcmd.js`)

- Play
- Pause
- Stop
- Volume
- Volume fade
- Loop
- Play once

## Scene commands (`scenecmd.js`)

- Focus-line effect
- Smoke effect
- Rain effect
- Snow effect
- Dust effect
- Continue marker (currently unavailable)
- End marker (currently unavailable)
- Enable or disable scene sound effects (currently unavailable)

## Select commands (`selectcmd.js`)

- One-option selection
- Two-option selection
- Three-option selection

## Special commands (`specialcmd.js`)

- Breakpoint
- Wait
- Jump
- Target marker
- Show all targets
- Toggle script
- Set autoplay speed
- Hide all text boxes

## Text commands (`textcmd.js`)

- Bottom text box
  - Set text content
  - Set text content without a breakpoint
  - Set text content and highlight a character
  - Set text content and highlight a character without a breakpoint
- Middle text box
  - Set text content
  - Set text content without a breakpoint
- Subtitle text box
  - Set text content
  - Set text content without a breakpoint
- Banner
