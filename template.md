# E-Design Store: Design System Template

This document serves as the single source of truth for the boutique-inspired design tokens used across the Estore application.

## 🎨 Color Palette
The theme uses an earth-toned, artisanal palette designed to feel warm, high-end, and editorial.

| Token | Variable | HEX Code | Usage |
| :--- | :--- | :--- | :--- |
| **Cream (Background)** | `bg-background` | `#F3F2ED` | Primary page canvas, main body background. |
| **Maroon (Primary)** | `text-pallete-red` | `#800000` | Branding elements, high-priority buttons. |
| **Rust (Secondary)** | `text-pallete-orange`| `#982B1C` | Headings, highlights, active states. |
| **Beige (Tertiary)** | `text-pallete-beige` | `#DAD4B5` | Borders, card backgrounds, separators. |
| **Ink (Foreground)** | `text-foreground` | `#171717` | Body text, icons, primary readability. |

## ✍️ Typography Scale
**Primary Font Family:** Montserrat (Geometric Sans-Serif)

| Level | Desktop Size | Line Height | CSS Class |
| :--- | :--- | :--- | :--- |
| **H1** | `3.75rem` (60px) | `4.5rem` | `.h1` |
| **H2** | `3.0rem` (48px) | `Tight` | `.h2` |
| **H3** | `2.5rem` (40px) | `Normal` | `.h3` |
| **Body** | `1.0rem` (16px) | `Normal` | `body` |
| **Small**| `0.875rem`(14px)| `Normal` | `text-sm` |

## 🏗️ Layout & Structure
- **Container:** Max-width of `87.5rem` (1400px).
- **Responsive Padding:** `px-5` (Mobile) / `px-10` (Tablet) / `px-16` (Desktop).
- **Rounding:** `rounded-md` for buttons and secondary elements.
- **Shadows:** Standardized `shadow-sm` and `shadow-md` for product cards.

## 🧱 Component Guidelines
- **Buttons:** Use `Montserrat` semi-bold. Prefer `variant="secondary"` for "Rust" theme accents.
- **Product Cards:** Should leverage `bg-contain` for image display to ensure the full product is visible against the `pallete-cream` background.
- **Grids:** Standardize on `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` for consistency across browse pages.
