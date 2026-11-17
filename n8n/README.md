# Well Flabb Fitness Club - Automation & Database Guide

## 1. Credentials Required

### A. Supabase
* **Database Connection URL (PostgreSQL Direct / Pooler):**
  * `Host`: `db.[PROJECT_REF].supabase.co`
  * `Port`: `5432` or `6543`
  * `Database`: `postgres`
  * `User`: `postgres`
  * `Password`: `[YOUR_SUPABASE_DB_PASSWORD]`
* **API Credentials (for Web Frontend `.env`):**
  * `VITE_SUPABASE_URL`: `https://[PROJECT_REF].supabase.co`
  * `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR...`

### B. Meta WhatsApp Cloud API / AiSensy
* **Meta WhatsApp Cloud API (Direct):**
  * `WHATSAPP_PHONE_NUMBER_ID`: Numerical ID from Meta Business Suite (e.g. `102938475610293`)
  * `WHATSAPP_TOKEN`: Permanent System User Access Token with `whatsapp_business_messaging` permission
  * `WHATSAPP_BUSINESS_ACCOUNT_ID`: Meta WABA ID
* **AiSensy Alternative:**
  * `AISENSY_API_KEY`: Found in AiSensy Dashboard -> Manage -> API Keys
  * Endpoint: `https://backend.aisensy.com/campaign/t1/api/v2`

### C. Razorpay Payment Links
* Razorpay Dashboard -> Payment Links -> Create custom short URLs or Dynamic Links (`https://rzp.io/l/wellflabb-[plan]`)

---

## 2. WhatsApp Meta Approved Templates

### Template 1: Instant Lead Free Trial Welcome
* **Name:** `well_flabb_trial_reserved`
* **Category:** `MARKETING` or `UTILITY`
* **Language:** `English (en)`
* **Header:** None
* **Body:**
  ```text
  Hi {{1}}, your free trial at Well Flabb is reserved. Which day suits you?
  ```
* **Sample Parameters:**
  * `{{1}}`: `Amit`
* **Buttons:**
  1. Quick Reply: `Confirm Today`
  2. Quick Reply: `Confirm Tomorrow`
  3. Call Phone: `+919999636973` (Call Coach Rahul)

---

### Template 2: 3-Day Unconverted Lead Follow-Up
* **Name:** `well_flabb_lead_followup_3d`
* **Category:** `MARKETING`
* **Language:** `English (en)`
* **Header:** `Text` -> `Well Flabb Fitness Club • Delhi`
* **Body:**
  ```text
  Hi {{1}}, Coach Rahul here from Well Flabb Fitness Club.

  One of our members recently shared:
  "Trainer gives attention to each and every trainee and gives proper guidance for diet and weight loss."

  Would you still like to experience your free trial session this week? Reply YES to pick your slot.
  ```
* **Sample Parameters:**
  * `{{1}}`: `Pooja`
* **Buttons:**
  1. Quick Reply: `Yes, Book My Slot`
  2. Quick Reply: `Need More Info`

---

### Template 3: Membership Renewal Reminder (7, 3, 0 Days)
* **Name:** `well_flabb_renewal_reminder`
* **Category:** `UTILITY`
* **Language:** `English (en)`
* **Header:** `Text` -> `Membership Renewal Notice`
* **Body:**
  ```text
  Hi {{1}}, your {{2}} gym membership at Well Flabb Fitness Club expires in {{3}}.

  Keep your fitness streak alive with Coach Rahul! Renew online using this Razorpay link: {{4}} or visit our reception desk. See you on the floor!
  ```
* **Sample Parameters:**
  * `{{1}}`: `Vikram`
  * `{{2}}`: `Quarterly`
  * `{{3}}`: `3 days`
  * `{{4}}`: `https://rzp.io/l/wellflabb-quarterly`
* **Buttons:**
  1. URL Button: `Renew on Razorpay` -> `{{4}}`
  2. Quick Reply: `I have renewed`

---

### Template 4: 10-Day Inactive Member Nudge
* **Name:** `well_flabb_inactive_nudge`
* **Category:** `MARKETING`
* **Language:** `English (en)`
* **Header:** None
* **Body:**
  ```text
  Hi {{1}}, Coach Rahul from Well Flabb here! I noticed you haven't checked in for your workouts in the past 10 days.

  Life gets busy, but your health and fitness progress matter. What time can we expect you back this week? Let me know if you need any adjustments to your routine!
  ```
* **Sample Parameters:**
  * `{{1}}`: `Gaurav`
* **Buttons:**
  1. Quick Reply: `Coming this evening`
  2. Quick Reply: `Coming tomorrow`
  3. Quick Reply: `Need workout change`
