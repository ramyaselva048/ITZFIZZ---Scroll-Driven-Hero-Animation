# ITZFIZZ Scroll-Driven Hero Animation

A modern, high-performance digital agency landing page built for ITZFIZZ, featuring a sophisticated scroll-driven 3D hero animation, GSAP ScrollTrigger choreography, clean typography, and responsive architecture.

## Overview

This project was engineered as a Web Development Internship assignment evaluation for **ITZFIZZ**. The core highlight is a futuristic, scroll-synchronized central visual in the hero section that reacts directly to the user's scroll position with smooth interpolation (scrubbing), independent layer parallax, and 3D spatial transforms.

## Features

- **React + TypeScript + Vite**: Ultra-fast build pipeline with strict typing and modern component composition.
- **GSAP & GSAP ScrollTrigger**: Scroll-driven motion mechanics with `scrub: 1.2` interpolation and hardware-accelerated 3D transforms (`translate3d`, `rotateX`, `rotateY`, `rotateZ`, `scale`).
- **Initial Load Animation**: Staggered entry animation on first render for the "WELCOME ITZFIZZ" headline, subtext, CTA buttons, and impact statistics using `gsap.context()`.
- **Pure CSS & SVG Geometric Visuals**: The central visual core and project showcase cards are crafted entirely from CSS shapes, gradients, and custom SVG paths—no copyrighted, watermarked, or paid asset bloat.
- **Impact Statistics**: 4 verified key metrics (`95% Client Satisfaction`, `80+ Projects Delivered`, `90% Performance`, `70+ Happy Clients`) with clean responsive layout.
- **Full Agency Page Architecture**:
  - Glassmorphic Navbar with mobile hamburger menu and smooth drawer
  - Hero Section (above the fold) with wide-tracked headline and scroll indicator
  - About Section with technical agency dossier
  - Services Section (Web Development, UI/UX Design, E-Commerce Solutions, Digital Solutions)
  - Selected Projects Showcase (Digital Commerce, Smart Dashboard, Creative Web Experience) with interactive case study modal
  - 4-Step Process Section (01 Discover, 02 Design, 03 Develop, 04 Launch) with ScrollTrigger reveal
  - Final Call to Action ("Let's Build Something Exceptional")
  - Footer with brand credentials, social links, and contact information
  - Functional Contact / Project Inquiry modal with instant form validation and success feedback
- **Responsive & Accessible**: Strict zero-horizontal-overflow design across mobile, tablet, laptop, and desktop viewports, with support for `prefers-reduced-motion`.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Animation**: GSAP 3 + ScrollTrigger
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Database**: MySQL / TiDB Cloud (Serverless v8.5)
- **Backend API**: Express + mysql2

## Database Integration

The application is connected to a cloud MySQL / TiDB Cloud serverless database:
- **Host**: `gateway01.ap-southeast-1.prod.aws.tidbcloud.com`
- **Database**: `itzfizz`
- **Table**: `contact_inquiries`
- **API Endpoints**:
  - `GET /api/db/status` — Live connection health and serverless telemetry
  - `POST /api/contact` — Securely records name, email, subject, and message
  - `GET /api/inquiries` — Retrieves stored inquiries

When visitors submit the Contact form, their inquiry is simultaneously stored in MySQL and forwarded directly to WhatsApp (+91 8825641424).

## Run Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. Clone or extract the project repository:
   ```bash
   git clone <repository-url>
   cd itzfizz-hero-animation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).

## Deployment to Render (Recommended for Full-Stack & MySQL)

Since this project features an Express backend for MySQL database storage and API endpoints along with the React Vite frontend, **Render Web Service** is the recommended deployment platform.

### Step-by-Step Render Deployment:

1. Push your project to **GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Fill in the exact settings:
   - **Name**: `itzfizz-agency` (or your choice)
   - **Region**: `Singapore (Southeast Asia)` (matches TiDB Cloud region for fastest response)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`
5. In **Environment Variables** (Advanced / Environment), add:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = `mysql://rHUHLpc64mrScvX.root:1hCYJl9CIr8XAqNv@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/itzfizz`
6. Click **Deploy Web Service**.
7. Once deployed, Render will provide your live URL (e.g., `https://itzfizz-agency.onrender.com`).

---

## Deployment to GitHub Pages (Static Mode)

This project is pre-configured with a relative base path (`base: './'` in `vite.config.ts`), making it directly compatible with GitHub Pages hosting under any repository name.

### Method 1: Using GitHub Pages Actions (Recommended)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete ITZFIZZ scroll-driven hero animation assignment"
   git push origin main
   ```

2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. Select the standard **Static HTML** or **Vite** starter workflow:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ['main']

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'
         - name: Install dependencies
           run: npm ci
         - name: Build project
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

### Method 2: Manual gh-pages Branch

1. Install `gh-pages` as a development dependency:
   ```bash
   npm install -D gh-pages
   ```

2. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Run the deployment script:
   ```bash
   npm run deploy
   ```

4. Go to **Settings** > **Pages** in your GitHub repository and set the branch to `gh-pages` and folder to `/ (root)`. Your site will be live at `https://<username>.github.io/<repo-name>/`.

---

© 2026 ITZFIZZ. Crafted for the Web Development Internship Evaluation.
