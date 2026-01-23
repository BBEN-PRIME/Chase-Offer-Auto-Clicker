# Chase Offer Auto-Clicker (Tampermonkey)

Adds a floating **"CHASE TURBO"** HUD with **START ADDING** / **STOP** on the Chase merchant offers page and automatically adds each visible offer with short delays. Use **STOP** to interrupt at any time.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. In Chrome, ensure **Developer mode** is enabled for extensions:
   - `chrome://extensions` → toggle **Developer mode** on.
3. In Tampermonkey, ensure userscripts are allowed:
   - Tampermonkey Dashboard → **Settings** → enable **Allow User Scripts** (wording may vary by version).
4. Create a new userscript and paste in `chase-offer-auto-clicker.user.js`.
5. Visit the Chase merchant offers page: `https://secure.chase.com/.../merchantOffers` (must match the script `@match`).
6. Click **START ADDING**.

## Notes

- Only runs on pages whose URL contains `merchantOffers`; the HUD does not appear elsewhere.
- Clicks offers via `[role="button"][tabindex="0"]` and uses SVG `path` count to detect “Add” states.
- **STOP** interrupts the wait timers so you can pause immediately.
- Only processes offers currently in the DOM; scroll for more, then run again.

## Disclaimer

This project is provided for educational purposes. Use at your own risk and in accordance with the website’s terms.
