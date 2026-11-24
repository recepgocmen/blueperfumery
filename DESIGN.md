---
name: Blue Perfumery
description: Parlament mavisi ve yaldız. The bottle's blue label, gilded lettering and ivory ground, set as a storefront you shop by smell.
colors:
  brand: "#1b2c82"
  brand-deep: "#121a52"
  brand-mute: "#8d99d6"
  gold: "#e2cd7c"
  gold-light: "#f3e6b4"
  gold-deep: "#c2a54a"
  gold-ink: "#947b2a"
  ivory: "#f8f5ee"
  sand: "#ece5d3"
  ink: "#0f1433"
  ink-soft: "#4a5072"
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
  button:
    fontFamily: "Jost, Futura, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.025em"
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
  keyline-band: "12px"
components:
  button-brand:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.ivory}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-brand-hover:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.ivory}"
  button-ivory:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.brand-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-ivory-hover:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.brand-deep}"
  button-line:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-line-ivory:
    textColor: "{colors.ivory}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  toggle-segment:
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  toggle-segment-active:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.brand-deep}"
  chip-family:
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  chip-family-active:
    backgroundColor: "{colors.brand}"
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
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "36px"
    width: "22rem"
  lockup-plate:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.gold}"
    rounded: "{rounded.none}"
    padding: "40px 48px 36px"
  header-solid:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    height: "72px"
  mira-launcher:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "56px"
---

# Design System: Blue Perfumery

## Overview

**Creative North Star: "The Bottle Is the System"**

Every surface is built from the bottle itself: the label's parliament blue owns whole regions, the ivory ground is where reading happens, and gold behaves like the square cap and the gilded "BLUE" lettering, as metal. Display type is a Didone (Bodoni Moda) that echoes the label's "BLUE"; running text is a geometric sans (Jost) that echoes "MADE WITH LOVE". Corners are square everywhere because the cap and label are square.

The rhythm alternates full-bleed colour fields rather than stacking cards. A typical page moves blue field, ivory reading ground, sand advice band, blue statement, deep-blue footer. Density is low and the type is large. Scent names and product names are set in the display face at sizes that make them the navigation, not decoration. Product photographs sit bare in 4:5 frames with nothing around them. The name and notes sit beneath the photo as plain text, not inside a card. Where the site shows a label of its own (the hero caption plate and the footer lockup) it borrows the label's frame: a crackle margin and one gold keyline.

Motion is short and exponential. One upward clip-path wipe ("pour") reveals a newly matched bottle photograph. Text that swaps beside it rises in. Everything else fades.

Known gap, not part of the system: the product photographs in `public/perfumes/` still show the previous burgundy label on the bottle and are scheduled to be regenerated with the blue label.

**Key Characteristics:**
- Three-material palette: blue label, ivory ground, gold metal; sand and ink are supporting tones.
- Didone display at menu scale; geometric sans for everything read.
- Square corners (0px) on every element.
- Flat, colour-field depth; one shadow in the whole system.
- Photographs bare in 4:5 frames, never carded or framed.
- One foil gradient (the "BLUE" wordmark) and one keyline frame (label plates); all other gold is flat.

## Colors

A saturated royal blue and a yellow-cast foil gold, sampled from the owner's label photographs, on warm cream paper.

### Primary
- **Parliament Blue** (brand): owns whole regions (home hero, closing statement, About hero, quiz match panel, the Mira launcher, panel header and user bubbles), primary buttons, the active family chip, the selected quiz option, and stock badges on tiles. On ivory it also appears as text for the "BLUE" wordmark in the solid header and for the campaign and low-stock lines (11.2:1), and it marks state there: the underline of the current page and of a pressed shelf filter, and the 2px rule under the active shop tab. Also used for scrollbar thumb, caret, text selection and the focus ring on light grounds. It is the footer lockup plate, and one of the two tones of the label frame's crackle.
- **Deep Label Blue** (brand-deep): the deeper field under blue: footer, mobile menu overlay, photo wells behind bottle images on blue, the hero caption plate and the mobile hero match band, the header scrim over the hero, the hover state of blue buttons, and the text colour of ivory buttons. It is the other tone of the crackle.
- **Faded Label** (brand-mute): the inactive scent families on the blue hero (4.4:1 on blue; display size only) and the "MADE WITH L♥VE" line in the mobile menu (5.9:1 on deep blue).

### Secondary
- **Foil Gold** (gold): metal on blue grounds. Hairline rules (the scent-menu active rule, the rules above the home statement and under the About headline, the hairlines above and below the mobile match band), the keyline, link and nav underlines on blue, the Mira launcher's 1px border and icon, and the focus outline on blue. As text it appears only on blue or deep blue (7.7:1 and 10.2:1): the matched product name on the hero plate and mobile band, the footer "MADE WITH L♥VE" line, the hovered or current item in the mobile menu.
- **Foil Highlight** (gold-light): the bright band inside the foil gradient. It is not used anywhere else.
- **Foil Shadow** (gold-deep): the dark ends of the foil gradient. It is not used anywhere else.
- **Rule Gold** (gold-ink): metal on ivory and sand, darkened so a 1px line holds 3:1 there (3.8:1 on ivory, 3.3:1 on sand). Section dividers, the price rule on the product page, the shop tab baseline, the short marker rules, link underlines, and the quiz progress bar.

### Neutral
- **Ivory Ground** (ivory): the page background and the text colour on every blue field (11.2:1 on blue, 14.9:1 on deep blue).
- **Sand** (sand): the advice band (Mira section, About contact), the photo-well colour behind tiles while images load, and the hover state of ivory buttons and quiz options.
- **Ink** (ink): body text and headings on ivory and sand (16.5:1 on ivory). A blue-black, not a neutral black. It is used at low alpha for hairline borders (10–40%) and it tints the one shadow.
- **Soft Ink** (ink-soft): secondary text such as notes lists, audience/ml lines, counts and intros (7.2:1 on ivory, 6.2:1 on sand).

### Named Rules
**The Metal Rule.** Gold is never text on ivory or sand (gold 1.5:1 and 1.3:1; even gold-ink is 3.8:1 and 3.3:1). On light grounds gold is a 1px gold-ink rule or an underline decoration; text over it stays ink.

**The Three Golds Rule.** Each gold has one job. Gold is the metal on blue and deep blue. Gold-ink is the metal on ivory and sand. Gold-deep and gold-light exist only as stops of the foil gradient.

**The Blue State Rule.** On ivory and sand, selection and current location are marked in blue: the current page, a pressed filter, the active tab, a selected chip or quiz row. Gold-ink there is structure and measure (dividers, markers, link underlines, the quiz progress bar), not selection. On blue grounds the cue is ivory or gold.

**The One Foil Rule.** Only the "BLUE" wordmark carries the foil gradient (gold-deep, gold, gold-light, gold, gold-deep at 105deg): in the header while it sits on a blue ground, in the mobile menu and in the footer lockup. Where the browser cannot clip a background to text it falls back to flat gold. On ivory the wordmark is flat blue. All other gold is flat.

**The Label Owns Regions Rule.** Blue is applied as a full-bleed field, a solid control, short emphasis text, a state underline or rule, or the crackle inside the label frame, not as a tint or a wash. The only gradients are the foil wordmark and the deep-blue scrim that fades out below the transparent header on the desktop home hero.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni MT, serif)
**Body Font:** Jost (with Futura, system-ui, sans-serif)

**Character:** A high-contrast Didone set large against a quiet geometric sans. This repeats the two typefaces on the bottle label. Italic Bodoni carries the voice of a question or an aside.

### Hierarchy
- **Display** (400, clamp(2.5rem, 7vw, 5.25rem), 1.02): the scent-family menu on the desktop home hero, set as stacked buttons. On mobile the same menu is a horizontal scroller at 1.875rem.
- **Headline** (500, 3rem mobile to 6rem desktop, ~1.02): page h1s (collection pages, About hero, 404; product name and quiz result at up to 4.5rem).
- **Title** (500, 2.25–3.5rem, 1–1.1): section h2s ("Raftakiler", Mira band, About sections), and the shop's family tabs at 1.5–1.875rem.
- **Subtitle** (500, 1.25rem mobile / 1.5rem sm+, 1.25): product names under tiles, PDP sub-headings.
- **Body** (400, 1.0625rem, 1.6): all running text; measure capped at 48–68ch.
- **Body small** (400, 0.9375rem): notes lists, nav links, tile metadata, chips, footer bar, Mira messages.
- **Button** (500, 1rem, 0.025em tracking): every button label.
- **Label** (500, 0.625–0.75rem, 0.42–0.5em tracking, uppercase): the brand lockup lines only ("PERFUMERY", "MADE WITH LOVE").

All h1–h3 use the display face at 500 with -0.015em tracking and balanced wrapping. Paragraphs use pretty wrapping. Prices and counts use tabular numerals. The matched product name on the hero is set in uppercase Bodoni with 0.06em tracking, like the label's lettering (1.625rem on the desktop plate, 1.125rem on the mobile band).

### Named Rules
**The Italic Voice Rule.** Bodoni italic is used for questions and asides: the hero question, the Mira launcher, the mobile menu links, and an emphasised clause inside a headline ("Mira'ya sor."). It is not used for labels or metadata.

**The Lockup Rule.** Wide-tracked uppercase sans (0.42–0.5em) is reserved for the bottle's own lockup lines. Short uppercase control labels use tighter tracking and are controls, not captions: the menu triggers "MENÜ" and "KAPAT" (0.9375rem, 0.2em) and the Kadın / Erkek toggle (0.875rem, 0.14em). Neither treatment is a section label above a heading.

## Layout

The container is 1440px (90rem), centred. Gutters are 20px on mobile, 40px from 640px and 64px from 1024px. Every section and the header share these gutters. Colour bands pad 80px vertically (112px on desktop); the home shelf and the closing statement open with more air (96–112px, 144–160px on desktop). Page tops clear the fixed 72px header with 112px (144px desktop) of top padding.

The home hero is a two-column grid on desktop: text column plus a 42% photo column. The photo bleeds to the top and right edges and the hero is at least one full viewport tall; the caption plate (22rem wide) hangs 64px above the bottom, pulled a third of its width over the text column. On mobile the toggle, question and a horizontally scrolling family list sit above a 52svh photo, with a deep-blue match band over its lower edge showing the matched product's name, price and a buy action. Product grids are 2 / 3 / 4 columns (mobile / 640px / 1024px). Column gaps are 16–32px; row gaps are large (48–64px) so each tile reads as an object. Detail pages use an asymmetric 5:6 split with a sticky image column; the quiz pairs a fluid question column with a fixed 26rem (32rem from 1280px) sticky match panel. Hairline rules divide content instead of boxes.

## Elevation & Depth

The system is flat. Depth comes from stacking colour fields (ivory above sand, blue above deep blue) and from photographs. Only one surface floats: the Mira chat panel on desktop, which casts a soft ink-tinted ambient shadow.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 24px 56px -16px rgba(15,20,51,0.45), 0 6px 16px -8px rgba(15,20,51,0.3)`): only on the floating chat dialog at 640px and wider.

### Named Rules
**The Field Not Float Rule.** Separate content with a change of ground or a 1px rule, not a shadow. The hero caption plate overlaps the photograph without a shadow; its edge is the keyline frame.

## Shapes

Every corner is square (0px), including buttons, chips, inputs, selects, the chat panel, badges and checkbox squares. Form controls reset to square explicitly. Photographs use a 4:5 crop, filling the frame. Borders are 1px hairlines: gold-ink for structural dividers on light grounds, gold or ivory at 15–60% on blue, and ink at 10–40% alpha for controls and list separators. Short gold rules (20–96px wide, 1px tall) act as markers: beside the active scent, before each note on the product page, above the home statement, and under the About and 404 headlines.

The one framed shape is the label frame: a 12px band of fine crackle (a 12px repeating tile) around the edge of a plate, with a single 1px gold keyline at the band's inner edge. The crackle is tone on tone and takes the other blue: blue lines on the deep-blue hero plate, deep-blue lines on the blue footer plate. It is flat: no bevel, no glow, no second line.

### Named Rules
**The Label Frame Rule.** The keyline frame appears only where the site shows a label of its own: the hero caption plate and the footer "BLUE / MADE WITH L♥VE" lockup. It never frames a photograph, a card, a button or a section. The Mira launcher's 1px gold edge is a plain border on a blue control, with no band and no crackle; it is that component's detail, not a frame and not a button variant. The app icon and share image are the label itself and carry the keyline alone, without crackle.

## Components

### Buttons
Solid, square, and set in the sans at 1rem and weight 500, with slight tracking.
- **Shape:** square (0px), min-height 48px (56px beside the Mira input), 24px horizontal padding.
- **Brand:** blue fill, ivory text. The primary action on ivory (order on PDP, Mira'ya sor, header "Koleksiyon" once scrolled).
- **Ivory:** ivory fill, deep-blue text. The primary action on blue fields.
- **Line / Line-ivory:** 1px current-colour border (ivory at 60% on blue). Used for secondary actions.
- **Hover:** 200ms colour transitions only. Blue goes to deep blue, ivory to sand, and line buttons gain a 5–10% wash.
- **Focus:** a 2px outline chosen by ground. On ivory and sand it is blue at 3px offset. Inside blue fields and for ivory-text controls it is gold at 3px offset. On a control that is itself blue (brand button, Mira launcher, chat send button, active chip) it is gold inset 5px inside the fill, so it reads whatever the control sits on; the selected quiz row insets it 2px.
- **Disabled (sold out):** ink 30% border, soft-ink text, not-allowed cursor. Disabled submit actions drop to 40% opacity.

### Segmented toggle
The Kadın / Erkek switch on the hero: two square segments in a 1px ivory 40% border, 44px tall, 20px padding, uppercase sans at 0.875rem with 0.14em tracking. The pressed segment fills ivory with deep-blue text; the other is ivory at 80% and gains a 10% ivory wash on hover.

### Chips
- **Style:** square, 1px ink 25% border, body-small text, 44px tall, 16px padding (shop scent-family filters; Mira suggestion buttons use ink 30% and 0.875rem).
- **State:** the active chip fills blue with ivory text. The hover state darkens the border to ink.

### Text filters and tabs
Pressed filters use a blue underline rather than a fill: a 1px blue underline with ink text on the home shelf filters, and a 2px blue bottom border on the shop's display-type tabs over a gold-ink baseline. Header nav links show the same 1px underline on hover and for the current page: blue on the ivory header, gold over the hero. Counts sit beside labels in tabular figures.

### Links
Underlined at 1px, 0.25em below the text. The underline is gold-ink on light grounds and gold on blue; it turns to the text colour on hover. Link text stays ink or ivory.

### Cards / Containers
- **Corner Style:** square.
- **Background:** none. Product tiles are a bare 4:5 photo on a sand well, followed by plain text: name, three notes, audience · ml, price and a "Satın al" link.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none on tiles; hairline rules between list rows.
- **Badge:** a blue tag with ivory text flush to the photo's left edge for low stock or sold out.
- **Hover:** the photo scales to 1.04 over 700ms with the pour ease.

### Inputs / Fields
- **Style:** underline only: transparent background, 1px ink 40% bottom border, no side padding, 56px tall, text 1.125–1.25rem.
- **Focus:** the bottom border turns blue, plus the blue focus outline.
- **Select:** square, 1px ink border, transparent, with an inline chevron icon.
- **Quiz options:** full-width rows in display type (1.5–1.75rem), 56px tall, between ink 20% hairlines, with a 20px square check box. The selected row fills blue with ivory text; unselected rows wash sand on hover.

### Navigation
- **Header:** fixed and 72px tall. On the home hero it is transparent over a deep-blue scrim, with a foil wordmark and a line-ivory "Koleksiyon" button. From 1024px the scrim runs 92% to 84% across the bar and fades to nothing 72px below it, so the nav stays legible where it crosses the photograph. Below 1024px it is a flat 92% bar confined to the header's height, so it never dims the controls under it. Past the hero, and on every other route, it is ivory with an ink 10% bottom rule, a blue wordmark and a brand button. Links are body-small with wide tracking.
- **Wordmark:** "BLUE" in Bodoni at 1.75rem, weight 500, 0.08em tracking, over "PERFUMERY" in the lockup label. On hover the foil's highlight travels across the letters (background-position sweep, 1400ms, pour ease).
- **Mobile:** a "MENÜ" text trigger opens a full-screen deep-blue overlay. Links are bottom-aligned in italic Bodoni (2.25–3.5rem) and turn gold when hovered or current. Beneath them sits "MADE WITH L♥VE" in the lockup label, faded-label blue, with the heart drawn as a filled shape. The overlay fades in.
- **Footer:** deep blue. The lockup plate sits at the left, a blue plate with deep-blue crackle: foil "BLUE" at 5–6rem above "MADE WITH L♥VE" in flat gold (0.75rem, 0.5em tracking, the heart drawn as a filled shape in the same gold), inside the label frame. A two-column link list sits beside it, with an ivory 15% rule above the contact bar.

### Scent Menu (signature)
The home hero's family list is a menu set in display type. The active family is ivory, with a gold rule that grows to 80px over 700ms on desktop. The other families are faded-label blue. Hover, focus or click selects a family; the Kadın / Erkek toggle swaps the list. The matched photo then pours upward over the previous one. On desktop a deep-blue caption plate in the label frame (36px padding) overlaps the photo's lower-left edge. It holds the product name in gold uppercase Bodoni, three notes, the price, and the İncele / Satın al actions. Its contents rise in. On mobile the plate is replaced by a deep-blue match band with a gold hairline above and below, the name in gold uppercase Bodoni, the price and a line-ivory buy button.

### Mira
The Mira launcher is a fixed 56px blue bar at bottom-right with a 1px gold border, a gold chat icon and an italic "Mira". The panel has a square ivory body, a blue header and blue user bubbles. Assistant replies are plain text, and product rows are separated by hairlines. The send button is a 44px blue square. Icons are Lucide outlines at 1.5–2 stroke, 20px.

### Brand rasters
The app icon (`src/app/icon.png`, 512px; `src/app/apple-icon.png`, 180px) is a blue square with one inset gold keyline and "BL / UE" stacked in flat gold Bodoni, as on the bottle. The share image (`public/og.png`, 1200×630) is a blue field with the keylined lockup: "BLUE" over "MADE WITH L♥VE" in flat gold. Rasters use flat gold, not the foil gradient. Provenance: all three were rendered from HTML with Bodoni Moda via Playwright on 2026-11-23.

## Do's and Don'ts

### Do:
- **Do** give blue a full-bleed region or a solid control. Text on blue is ivory, or gold for the brand and product name.
- **Do** use gold only as metal: 1px rules, underline decoration, the keyline, progress and active markers. Use gold on blue and gold-ink on ivory and sand. Use gold as text only on blue or deep blue.
- **Do** keep the foil gradient on the "BLUE" wordmark alone, with the flat-gold fallback.
- **Do** set scent and product names in Bodoni Moda at headline scale, and keep reading text in Jost at 1.0625rem / 1.6.
- **Do** keep every corner square (0px).
- **Do** show product photographs bare in a 4:5 frame on a sand well, with name, notes, audience · ml, price and a "Satın al" link as plain text beneath.
- **Do** mark state on ivory and sand in blue: a blue underline for the current page or a pressed filter, a blue fill for a selected chip or row.
- **Do** pick the focus ring by ground: blue on ivory and sand, gold on blue, gold inset 5px on a blue control.
- **Do** use the pour wipe (clip-path inset 100%→0, 700ms, cubic-bezier(0.16, 1, 0.3, 1)) only when a newly matched bottle photo is revealed. Use rise (12px, 500ms) for the text that swaps with it, and fade (300ms) for everything else.

### Don't:
- **Don't** set gold text on ivory or sand, and don't use gold or gold-deep for lines there; they disappear. Lines on light grounds are gold-ink.
- **Don't** put the foil gradient on headings, product names, buttons or rules.
- **Don't** put the keyline frame around a photograph, a tile, a button or a section. It belongs to the hero caption plate and the footer lockup.
- **Don't** put product photos inside cards, bordered boxes or shadowed containers.
- **Don't** add drop shadows to anything except the floating Mira panel.
- **Don't** round corners or use pill shapes.
- **Don't** put a small tracked-uppercase label above a heading. The wide-tracked treatment belongs only to the bottle's "PERFUMERY" / "MADE WITH LOVE" lockup.
- **Don't** introduce colours outside the eleven tokens. Use alpha steps of ink or ivory for hairlines and washes.
