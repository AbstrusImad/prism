# Prism

**Ethical dilemmas refracted through three philosophical lenses under GenLayer validator consensus.**

## Overview

Prism is a philosophical debate platform where users submit ethical dilemmas and receive multi-perspective AI analysis through three independent philosophical frameworks: utilitarian, deontological, and virtue ethics. Each lens evaluates the dilemma separately, producing a scored verdict with detailed reasoning. The three perspectives converge in a synthesis panel that identifies where the frameworks agree, where they diverge, and what the consensus reveals about the ethical landscape of the question.

The analysis runs through `gl.nondet.exec_prompt` under GenLayer validator consensus on Bradbury Testnet. A custom validator function compares leader and validator outputs with exact decision matching and numeric score tolerance. The consensus result is not decoration, it is a settled on-chain judgment that all five validators independently verified.

## Architecture

```
+-------------------+        +---------------------------+
|                   |        |  GenLayer Intelligent     |
|  Next.js Frontend |        |  Contract (future)        |
|  (Static Export)  |        |                           |
|                   |        |  - Dilemma storage        |
|  - Submit dilemma |<------>|  - 3 AI lens analyses     |
|  - View analyses  |        |  - Custom validator       |
|  - Browse archive |        |  - Synthesis convergence  |
|                   |        |  - Paged view methods     |
+-------------------+        +---------------------------+
          |                            |
          v                            v
   genlayer-js / RPC          Bradbury Testnet (5 validators)
```

The frontend is a pure static SPA built with Next.js 14 (App Router, static export). The contract layer is structured for future deployment, with demo data providing full interactivity in frontend-only mode.

## Art Direction

**Soft light neumorphic** with a document/editorial page architecture. Pale `#eef0f4` background with softly extruded surfaces, large radii, and dual-light shadow systems. Lavender-to-rose gradient accent. Manrope for display, DM Sans for body, Fira Code for data.

### Signature Element

The prism canvas renders a translucent triangular prism with spectral light beams refracting through it. As the user scrolls, the beams spread wider and intensify, the prism glows brighter, and more particles emerge along the spectral paths. The animation is `requestAnimationFrame`-driven, devicePixelRatio-aware, and pauses when the tab is hidden or the canvas leaves the viewport.

## Frontend Stack

- **Next.js 14.2.29** with static export for GitHub Pages
- **TypeScript** throughout with strict mode
- **Tailwind CSS** with custom design tokens for neumorphic surfaces
- **GSAP + Lenis** for smooth scroll behavior
- **lucide-react** for icon system (no emojis)
- **genlayer-js 1.1.8** for chain integration (structured, ready for contract)

### Key UX Decisions

- Document/editorial layout with sticky sidebar table of contents
- Three lens sections as long-form editorial prose with expandable key arguments
- Scroll-driven section reveals using native CSS `animation-timeline: view()`
- Scroll progress indicator using native CSS `animation-timeline: scroll()`
- Neumorphic button states: raised (rest), elevated (hover), inset (active), disabled
- Real-time form validation with character counters and inline error text
- Confirmation dialog before any write transaction
- Toast system with spring-enter/exit animations

## Quick Start

```bash
git clone https://github.com/<username>/prism.git
cd prism/frontend
npm install
npm run dev
```

Open `http://localhost:3000/prism` in your browser.

## Deploy to GitHub Pages

```bash
cd frontend
npm run deploy
```

The `deploy` script runs `next build` then pushes the `out/` directory to the `gh-pages` branch.

## Contract Integration

The contract integration layer (`src/lib/contract.ts`) is structured and ready:
- `readClient` for view calls (paged reads, stats)
- `makeWalletClient` for write transactions
- `pollUntilDecided` for transaction polling with non-terminal timeout handling
- `extractLeaderDraft` for surfacing the AI's draft verdict mid-consensus

When the Intelligent Contract is deployed, set `CONTRACT_ADDRESS` and `DEPLOY_TX` in `contract.ts` and replace the demo data imports with real chain reads.

## Live Links

- **dApp**: [https://<username>.github.io/prism/](https://<username>.github.io/prism/)
- **Contract**: Pending deployment

## License

MIT
