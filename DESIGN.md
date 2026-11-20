---
name: Blue Perfumery
description: Sıcak butik. The bottle's bordo label, gold metal and ivory ground, set as a storefront you shop by smell.
colors:
  bordo: "#561726"
  bordo-deep: "#3b0f1a"
  bordo-mute: "#b07f88"
  ivory: "#f6efe6"
  sand: "#eadfcf"
  gold: "#c9a45c"
  ink: "#2a1418"
  ink-soft: "#6b4a50"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "clamp(2.5rem, 7vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "6rem"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "3.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Bodoni Moda, Didot, Bodoni MT, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Jost, Futura, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Jost, Futura, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Jost, Futura, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.42em"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-sm: "40px"
  gutter-lg: "64px"
  section: "80px"
  section-lg: "112px"
  container: "1440px"
  header: "72px"
components:
  button-bordo:
    backgroundColor: "{colors.bordo}"
    textColor: "{colors.ivory}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-bordo-hover:
    backgroundColor: "{colors.bordo-deep}"
    textColor: "{colors.ivory}"
  button-ivory:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.bordo-deep}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-ivory-hover:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.bordo-deep}"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-line-ivory:
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  chip-family:
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  chip-family-active:
    backgroundColor: "{colors.bordo}"
    textColor: "{colors.ivory}"
  input-underline:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0"
    height: "56px"
  product-tile:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    typography: "{typography.subtitle}"
    rounded: "{rounded.none}"
  scent-caption:
    backgroundColor: "{colors.bordo-deep}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "32px"
    width: "22rem"
  header-solid:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    height: "72px"
---

# Design System: Blue Perfumery

## Overview

**Creative North Star: "The Bottle Is the System"**

Every surface is built from the bottle itself: the bordo label owns whole regions, the ivory ground is where reading happens, and gold behaves like the square cap and the "BLUE" lettering, as metal. Display type is a Didone (Bodoni Moda) that echoes the label's "BLUE"; running text is a geometric sans (Jost) that echoes "MADE WITH LOVE". Corners are square everywhere because the cap and label are square.

The rhythm alternates full-bleed colour fields rather than stacking cards. A typical page moves bordo field, ivory reading ground, sand advice band, bordo statement, bordo-deep footer. Density is low and the type is large. Scent names and product names are set in the display face at sizes that make them the navigation, not decoration. Product photographs sit bare in 4:5 frames with nothing around them. The name and notes sit beneath the photo as plain text, not inside a card.

Motion is short and exponential. One upward clip-path wipe ("pour") reveals a newly matched bottle photograph. Text that swaps beside it rises in. Everything else fades.

**Key Characteristics:**
- Three-material palette: bordo label, ivory ground, gold metal; sand and ink are supporting tones.
- Didone display at menu scale; geometric sans for everything read.
- Square corners (0px) on every element.
- Flat, colour-field depth; one shadow in the whole system.
- Photographs bare in 4:5 frames, never carded.

## Colors

A warm, low-key boutique palette taken directly from the bottle: wine-dark label red, cream paper, brushed gold.

### Primary
- **Label Bordo** (bordo): owns whole regions (home hero, closing statement, About hero, the Mira launcher and panel header), primary buttons, the active family chip, the selected quiz option, and stock badges on tiles. Also used for scrollbar thumb, caret and text selection.
- **Cellar Bordo** (bordo-deep): the deeper field under bordo: footer, mobile menu overlay, photo wells behind bottle images on bordo, the hero caption plate, and the hover state of bordo buttons.
- **Faded Label** (bordo-mute): the inactive scent families on the bordo hero (4.0:1 on bordo; display size only) and the "MADE WITH LOVE" line in the mobile menu.

### Secondary
- **Cap Gold** (gold): metal only. Used for hairline rules (section dividers, the price rule on the product page, the shop tab baseline), underline decoration on links and active nav, the scent-menu active rule, the quiz progress bar, and the focus outline on bordo grounds (on ivory and sand the focus ring is bordo, for contrast). As text it appears only on bordo or bordo-deep: the "BLUE" wordmark, the footer "BLUE", the hero caption product name, the active item in the mobile menu.

### Neutral
- **Ivory Ground** (ivory): the page background and the text colour on every bordo field.
- **Sand** (sand): the advice band (Mira section, About contact), the photo-well colour behind tiles while images load, and the hover state of ivory buttons and quiz options.
- **Ink** (ink): body text and headings on ivory and sand (15.2:1 on ivory). It is used at low alpha for hairline borders (10–40%).
- **Soft Ink** (ink-soft): secondary text such as notes lists, audience/ml lines, counts and intros (6.8:1 on ivory, 5.9:1 on sand).

### Named Rules
**The Metal Rule.** Gold is never text on ivory or sand (2.1:1 and 1.8:1). On light grounds gold is a 1px rule or an underline decoration; text over it stays ink.

**The Label Owns Regions Rule.** Bordo is applied as a full-bleed field or a solid button, not as a tint, gradient wash or border colour on ivory. The only gradient is the bordo-deep (85%) scrim behind the transparent header on the home hero.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni MT, serif)
**Body Font:** Jost (with Futura, system-ui, sans-serif)

**Character:** A high-contrast Didone set large against a quiet geometric sans. This repeats the two typefaces on the bottle label. Italic Bodoni carries the voice of a question or an aside.

### Hierarchy
- **Display** (400, clamp(2.5rem, 7vw, 5.25rem), 1.02): the scent-family menu on the home hero, set as stacked buttons.
- **Headline** (500, 3rem mobile to 6rem desktop, ~1.02): page h1s (collection pages, About hero, product name at up to 4.5rem, quiz result).
- **Title** (500, 2.25–3.5rem, 1–1.1): section h2s ("Raftakiler", Mira band, About sections), and the shop's family tabs at 1.5–1.875rem.
- **Subtitle** (500, 1.25rem mobile / 1.5rem sm+, 1.25): product names under tiles, Mira product rows, PDP sub-headings.
- **Body** (400, 1.0625rem, 1.6): all running text; measure capped at 48–65ch.
- **Body small** (400, 0.9375rem): notes lists, nav links, tile metadata, chips, footer bar.
- **Label** (500, 0.625–0.75rem, 0.42–0.5em tracking, uppercase): the brand lockup lines only ("PERFUMERY", "MADE WITH LOVE"). Menu triggers ("MENÜ", "KAPAT") use 0.9375rem at 0.2em.

All h1–h3 use the display face at 500 with -0.015em tracking and balanced wrapping. Paragraphs use pretty wrapping. Prices and counts use tabular numerals.

### Named Rules
**The Italic Voice Rule.** Bodoni italic is used for questions and asides: the hero question, the Mira launcher, the mobile menu links, and an emphasised clause inside a headline ("Mira'ya sor."). It is not used for labels or metadata.

**The Lockup Rule.** Wide-tracked uppercase sans is reserved for the bottle's own lockup lines. It is not a section label above headings.

## Layout

The container is 1440px (90rem), centred. Gutters are 20px on mobile, 40px from 640px and 64px from 1024px. Every section and the header share these gutters. Major sections pad 80px vertically (112px on desktop). Page tops clear the fixed 72px header with 112px (144px desktop) of top padding.

The home hero is a two-column grid on desktop: text column plus a 42% photo column. The photo bleeds to the top and right edges and the hero is at least one full viewport tall. On mobile the menu stacks above a 60svh photo, with a bordo-deep strip showing the matched product and a buy action. Product grids are 2 / 3 / 4 columns (mobile / 640px / 1024px). Column gaps are 16–32px; row gaps are large (48–64px) so each tile reads as an object. Detail and quiz pages use asymmetric 5:6 or 5:7 splits with a sticky image column. Hairline rules divide content instead of boxes.

## Elevation & Depth

The system is flat. Depth comes from stacking colour fields (ivory above sand, bordo above bordo-deep) and from photographs. Only one surface floats: the Mira chat panel on desktop, which casts a soft wine-tinted ambient shadow.

### Shadow Vocabulary
- **Mira panel** (`box-shadow: 0 24px 56px -16px rgba(42,11,19,0.45), 0 6px 16px -8px rgba(42,11,19,0.3)`): only on the floating chat dialog at 640px and wider.

### Named Rules
**The Field Not Float Rule.** Separate content with a change of ground or a 1px rule, not a shadow. The hero caption plate gets its frame from an inset gold outline (40% alpha, -10px offset), not from a shadow.

## Shapes

Every corner is square (0px), including buttons, chips, inputs, selects, the chat panel, badges and checkbox squares. Form controls reset to `rounded-none` explicitly. Photographs use a 4:5 crop with `object-cover`. Borders are 1px hairlines: gold for structural dividers, and ink at 10–40% alpha for controls and list separators. Short gold rules (20–96px wide, 1px tall) act as markers: beside the active scent, before each note on the product page, and under the About headline.

## Components

### Buttons
Solid, square, and set in the sans at body size and weight 500, with slight tracking.
- **Shape:** square (0px), min-height 48px (56px beside the Mira input), 24px horizontal padding.
- **Bordo:** bordo fill, ivory text. The primary action on ivory (Satın al on PDP, Mira'ya sor, header "Koleksiyon" once scrolled).
- **Ivory:** ivory fill, bordo-deep text. The primary action on bordo fields.
- **Line / Line-ivory:** 1px current-colour border (ivory at 60% on bordo). Used for secondary actions.
- **Hover / Focus:** 200ms colour transitions only. Bordo goes to bordo-deep, ivory to sand, and line buttons gain a 5–10% wash. Focus is the global 2px gold outline at 3px offset.
- **Disabled (sold out):** ink 30% border, ink-soft text, not-allowed cursor.

### Chips
- **Style:** square, 1px ink 25% border, body-small text, 44px tall, 16px padding (shop scent-family filters; Mira suggestion buttons use ink 30%).
- **State:** the active chip fills bordo with ivory text. The hover state darkens the border to ink.

### Text filters and tabs
Pressed filters use a gold underline rather than a fill (home shelf filters, header nav current page, and the 2px bordo bottom border on shop tabs). Counts sit beside labels in tabular figures.

### Cards / Containers
- **Corner Style:** square.
- **Background:** none. Product tiles are a bare 4:5 photo on a sand well, followed by plain text.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none on tiles; hairline rules between list rows.
- **Hover:** the photo scales to 1.04 over 700ms with the pour ease.

### Inputs / Fields
- **Style:** underline only: transparent background, 1px ink 40% bottom border, no side padding, 56px tall, text 1.125–1.25rem.
- **Focus:** the bottom border turns bordo, plus the bordo focus outline.
- **Select:** square, 1px ink border, transparent, with an inline chevron icon.

### Navigation
- **Header:** fixed and 72px tall. On the home hero it is transparent over a bordo-deep scrim, with a gold wordmark and a line-ivory "Koleksiyon" button. Past the hero, and on every other route, it is ivory with an ink 10% bottom rule, a bordo wordmark and a bordo button. Links are body-small with wide tracking and a gold underline on hover or current page.
- **Mobile:** a "MENÜ" text trigger opens a full-screen bordo-deep overlay. Links are bottom-aligned in italic Bodoni (2.25–3.5rem) and turn gold when hovered or current. The overlay fades in.
- **Footer:** bordo-deep, with a gold display "BLUE" at 5–6rem above the "MADE WITH LOVE" lockup and a two-column link list.

### Scent Menu (signature)
The home hero's family list is a menu set in display type. The active family is ivory, with a gold rule that grows to 40–80px over 700ms. The other families are bordo-mute. Hover, focus or click selects a family. The matched photo then pours upward over the previous one. A bordo-deep caption plate with an inset gold outline overlaps the photo's lower-left edge. It holds the product name in gold uppercase Bodoni, three notes, the price, and the İncele / Satın al actions. Its contents rise in.

### Mira
The Mira launcher is a fixed bordo bar at bottom-right with a gold chat icon and an italic "Mira". The panel has a square ivory body, a bordo header and bordo user bubbles. Assistant replies are plain text, and product rows are separated by hairlines. Icons are Lucide outlines at 1.5–2 stroke, 20px.

## Do's and Don'ts

### Do:
- **Do** give bordo a full-bleed region or a solid button. Text on bordo is ivory, or gold for the brand and product name.
- **Do** use gold only as metal: 1px rules, underline decoration, progress and active markers. Use it as text only on bordo or bordo-deep.
- **Do** set scent and product names in Bodoni Moda at headline scale, and keep reading text in Jost at 1.0625rem / 1.6.
- **Do** keep every corner square (0px).
- **Do** show product photographs bare in a 4:5 frame on a sand well, with name, notes, audience · ml, price and a "Satın al" link as plain text beneath.
- **Do** use the pour wipe (clip-path inset 100%→0, 700ms, cubic-bezier(0.16, 1, 0.3, 1)) only when a newly matched bottle photo is revealed. Use rise (12px, 500ms) for the text that swaps with it, and fade (300ms) for everything else.

### Don't:
- **Don't** set gold text on ivory or sand.
- **Don't** put product photos inside cards, bordered boxes or shadowed containers.
- **Don't** add drop shadows to anything except the floating Mira panel.
- **Don't** round corners or use pill shapes.
- **Don't** put a small tracked-uppercase label above a heading. That treatment belongs only to the bottle's "PERFUMERY" / "MADE WITH LOVE" lockup.
- **Don't** introduce colours outside the eight tokens. Use alpha steps of ink or ivory for hairlines and washes.
