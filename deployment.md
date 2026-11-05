# Deployment & Reviewer Guide — Company A, Kochi
## Holiday Operations & Direct Booking Platform

**Project GitHub Repository**: [https://github.com/Kalaiyarasan200/Tour-Operator](https://github.com/Kalaiyarasan200/Tour-Operator)  
**Target Client**: Company A, Kochi (48-member Kerala luxury & inbound tour operator, ₹28–34 Cr revenue, ~4,300 bookings/year)  
**Primary Deliverable**: In-house booking platform, multi-channel enquiry desk, 1-hour SLA priority inbox, AI Co-Pilot with strict DB pricing, 1-click quote builder, self-service package CMS with rollback, and 140 legacy SEO redirects engine.

---

## 1. System Prerequisites

Before running the application locally, ensure you have:
- **Node.js**: `v18.0.0` or higher (Node 20+ LTS recommended)
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`
- **Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari
- **Operating System**: Windows, macOS, or Linux

---

## 2. Step-by-Step Local Setup & Execution

### Step 1: Clone the Repository
Open your terminal or command prompt and clone the repository:
```bash
git clone https://github.com/Kalaiyarasan200/Tour-Operator.git
cd Tour-Operator
```
*(If the folder is cloned under `company-a-kochi`, ensure you `cd company-a-kochi`)*

### Step 2: Install Dependencies
Install the required packages using npm:
```bash
npm install
```
*Key dependencies installed:*
- `react` (`^19.3.1`) & `react-dom`: Modern concurrent UI library
- `lucide-react` (`^1.66.0`): Consistent editorial iconography
- `vite` (`^8.3.5`): Fast build tooling and HMR dev server

### Step 3: Start the Development Server
Launch the local development server:
```bash
npm run dev
```
The terminal will display the local development address:
```
  VITE v8.3.5  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Access the Application
Open your browser and navigate to:
```
http://localhost:5173/
```
*(Or `http://127.0.0.1:5173/`)*

### Step 5: (Optional) Build & Run Production Preview
To verify the production build artifact:
```bash
# Compile optimized bundle into /dist
npm run build

# Preview the production build locally
npm run preview
```
Production build assets will be served at `http://localhost:4173/`.

---

## 3. Deployment Architecture & Hosting

The application is architected as a modern, high-performance Single Page Application (SPA). It can be deployed with zero server maintenance to any modern cloud edge provider:

### Option A: Vercel (Recommended)
1. Import the repository into your Vercel Dashboard from GitHub.
2. Framework Preset: **Vite**
3. Root Directory: `./`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Single Page App Rewrites (`vercel.json` already compatible):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Option B: Netlify
1. Connect repository in Netlify console.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. SPA Redirects: Add `/* /index.html 200` to `public/_redirects`.

### Option C: GitHub Pages / Cloudflare Pages / AWS S3 + CloudFront
1. Run `npm run build`.
2. Deploy the contents of the `dist/` directory directly to the bucket or static hosting provider.

---

## 4. Environment Variables Needed (Names Only)

As per the submission security guidelines, **only names are listed, never values**.

The platform is designed with a **local-first, zero-friction review architecture**. It comes fully preloaded with rich seed data, mock API responses, and an intelligent heuristic AI parser that runs deterministically in the client runtime. **No external API keys or secrets are required to run, review, and evaluate 100% of the platform's features.**

When configuring an enterprise production cloud deployment, the following environment variables are supported:

| Environment Variable Name | Purpose / Scope |
| :--- | :--- |
| `VITE_APP_TITLE` | Brand heading and title metadata |
| `VITE_API_BASE_URL` | Base URL for remote backend services (optional in local mode) |
| `VITE_STORAGE_PREFIX` | Namespace prefix for browser storage isolation |
| `VITE_DEFAULT_SLA_MINUTES` | SLA target window duration (defaults to 60 minutes) |
| `VITE_WHATSAPP_SIMULATOR_ENABLED` | Toggle for the in-app WhatsApp ingestion simulator |
| `VITE_GEMINI_API_KEY` | Optional key for live LLM inference extensions |
| `VITE_MAPS_EMBED_KEY` | Optional Google Maps API key for live satellite view |
| `NODE_ENV` | Runtime environment identifier (`development` / `production`) |

> **Security Note**: No secrets, production database credentials, or real customer Personally Identifiable Information (PII) are stored or tracked in this repository.

---

## 5. Demo Login & Role Switcher Details for the Reviewer

To allow reviewers to test the complete multi-stakeholder workflow without tedious authentication friction, the application features an **interactive Role Switcher Toolbar** fixed at the very top of the screen.

Reviewers can switch roles instantly with a single click. Pre-configured staff accounts and roles include:

### 1. Role: Traveller (Public Prospective Guest)
- **Primary Landing View**: Public Destination Explorer (`home`)
- **Key Capabilities**:
  - Filter packages by destination region, trip duration, and travel style.
  - Explore detailed day-wise itinerary for `PKG-KL-07` (*Munnar, Thekkady and Alleppey Houseboat*) and `PKG-SI-12` (*Tamil Nadu Temple Heritage*).
  - Interact with the **bespoke Topographic SVG Route Map**.
  - Review transparent seasonal pricing matrices (Peak, Monsoon, Summer).
  - Trigger the **Universal Multi-Channel Enquiry Modal** and test the one-click sample query injector.
  - Read Travel Journal blog articles with contextual package booking cards.

### 2. Role: Consultant (Rahul M. & Priya S.)
- **Primary Landing View**: Unified Priority Inbox (`inbox`)
- **Pre-Configured Staff Profiles**:
  - **Rahul M.**: Senior Kerala Specialist (`rahul.tours@companya-kochi.com`)
  - **Priya S.**: Honeymoon & Luxury Retreats Specialist (`priya.honeymoon@companya-kochi.com`)
- **Key Capabilities**:
  - **Real-Time 1-Hour SLA Countdown Clock**: Traffic-light badges (Green: >35m left, Amber: 15–35m left, Red Alert: <15m left).
  - **AI Co-Pilot Drawer**: Side-by-side view of incoming raw messages vs extracted structured entities.
  - **Human-in-the-Loop Correction**: Instantly adjust extracted adults, children, dates, and budget; click "Recalculate Price & Draft".
  - **Strict DB Price Grounding**: Draft replies strictly query the package price table (`per-person twin sharing + extra bed + 5% GST`). The AI never hallucinates pricing.
  - **1-Click Quote Builder**: Configure custom add-ons and generate shareable, printable quotations (`QT-2026-101`).

### 3. Role: Editor (Arun K.)
- **Primary Landing View**: Self-Service Package CMS (`cms-packages`)
- **Pre-Configured Staff Profile**:
  - **Arun K.**: Content & Web Editor (`arun.editor@companya-kochi.com`)
- **Key Capabilities**:
  - **5-Minute Package Authoring**: Create new itineraries or edit existing seasonal rates in minutes.
  - **Version History & 1-Click Rollback**: Track audit diffs (timestamp, author, summary) and roll back to previous versions with one click.
  - **Live Preview Toggle**: Verify public traveler layout before publishing changes.
  - **Travel Journal CMS**: Publish stories with embedded package cards to monetize organic traffic.

### 4. Role: Admin / Founder-MD
- **Primary Landing View**: Executive Business ROI Dashboard (`metrics`)
- **Pre-Configured Staff Profile**:
  - **Founder-MD**: Managing Director & Operations Head (`md@companya-kochi.com`)
  - Direct Phone: `+91 484 266 8000`
- **Key Capabilities**:
  - **Financial ROI Model**: Real-time breakdown of the ₹66.82 Lakh/year legacy revenue leak.
  - **Dynamic SLA Sensitivity Slider**: Simulate recovered bookings and margin recovery as SLA compliance increases.
  - **Team Activity Audit Log**: Immutable record of all package edits, quote dispatches, and role actions.
  - **140 Legacy 301 Redirects Engine**: Manage 6 years of legacy `.php` URLs with a live interactive redirect tester.

---

## 6. Recommended 5-Minute Reviewer Verification Script

Follow these 7 steps to evaluate the product and verify all requirements:

1. **Test the Candidate Prompt Sample Enquiry**:
   - As **Traveller**, click the floating **"Enquire Now"** button or open any package.
   - Click the blue pill button: **"Inject Sample Enquiry (Vikram Nair)"**.
   - Notice the exact prompt message populated:
     > *"Hi, 2 adults and 1 kid, Kerala 5-6 nights in December, budget around 1.2 lakh total, houseboat a must"*
   - Verify DPDP Act 2023 consent checkbox is checked, then click **"Send Holiday Enquiry"**.
   - Observe the instant automated branded acknowledgement template dispatched to the traveler.

2. **Verify 1-Hour SLA Countdown Clock in Admin Inbox**:
   - Click **"Go to Admin Inbox"** on the toast or switch role to **Consultant** on the top toolbar.
   - Select enquiry **ENQ-2026-101 (Vikram Nair)**.
   - Observe the live countdown clock showing time remaining out of the 60-minute SLA.

3. **Evaluate the AI Co-Pilot Drawer**:
   - Inspect the **Side-by-Side comparison**: Raw message on the left; structured extracted fields on the right.
   - Note the extracted parameters: 2 adults, 1 child, December (Peak Season), 5-6 nights, ₹1,20,000 budget.
   - Observe the **Smart Package Matcher**: `PKG-KL-07` matched with a **98% confidence fit**.
   - Review the **Strict DB-Grounded Draft Reply**:
     - 2 Adults @ ₹32,500 pp = ₹65,000
     - 1 Child extra bed @ ₹12,500 = ₹12,500
     - Subtotal = ₹77,500
     - 5% GST = ₹3,875
     - Grand Total = **₹81,375 net** (Fits within the ₹1.2L budget with ₹38,625 cushion).
   - Test human correction: Change adults to 3, click **"Recalculate Price & Draft"**, and watch the price update instantly using database rates.

4. **Generate a 1-Click Printable Quote**:
   - In the AI drawer, click **"1-Click Quote Builder"**.
   - Toggle an add-on (e.g. *Houseboat Upper-Deck Dining*).
   - Click **"Create & Lock Quotation"**.
   - Click **"Open Branded Traveller View"** to inspect the client-facing quotation page (`/quote/QT-2026-101`) with Kerala Govt accreditation, GSTIN, and print styling.

5. **Test Self-Service Package CMS & 1-Click Rollback**:
   - Switch role to **Editor**.
   - Edit `PKG-KL-07` (*Munnar, Thekkady and Alleppey Houseboat*).
   - Under the "Seasonal Pricing" tab, change Peak Season rate from `₹32,500` to `₹34,000`.
   - Enter revision summary: *"Annual tariff adjustment"* and click **"Save Package as New Version"**.
   - Switch to the "Version History & Rollback" tab: observe Version 2 logged. Click **"Rollback to Version 1"** and confirm that rates revert in under 5 seconds!

6. **Inspect the Travel Journal & SEO 140 Redirects Engine**:
   - Navigate to **"SEO & Redirects"** in the footer or menu.
   - In the **Live Redirect Tester**, enter `/packages/munnar-thekkady-alleppey.php`.
   - Click **"Test URL"** and verify that it matches modern path `/packages/munnar-thekkady-alleppey-houseboat` with an HTTP 301 status, protecting 6 years of search equity.

7. **Review Founder-MD Business ROI Dashboard**:
   - Switch role to **Admin** and click **"Founder-MD Dashboard"**.
   - Adjust the SLA compliance slider to see the financial recovery model calculate recovered gross margins.

---

## 7. Data Reset & Troubleshooting

- **Resetting Demo Data**: If you wish to restore all packages, inquiries, quotes, and audit logs to their pristine initial state, click **"Reset Demo Data"** in the top Role Switcher toolbar.
- **Port Conflict**: If port 5173 is already in use, Vite will automatically select the next available port (e.g. `http://localhost:5174/`).
- **Clearing State**: Local state is saved under `companya_` localStorage keys. Running `localStorage.clear()` in the browser console will restore factory defaults upon reload.

