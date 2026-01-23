// ==UserScript==
// @name         Chase-Offer-Auto-Clicker
// @version      2.7
// @match        https://secure.chase.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const btnSelection = '[role="button"][tabindex="0"] > :nth-child(2)';
    let isRunning = false;

    // Helper to allow the "Stop" button to interrupt the wait timers
    const smartWait = (ms) => new Promise(resolve => {
        const start = Date.now();
        const interval = setInterval(() => {
            if (!isRunning || (Date.now() - start) >= ms) {
                clearInterval(interval);
                resolve();
            }
        }, 50); // Check every 50ms if user hit Stop
    });

    function createHUD() {
        if (!window.location.href.includes('merchantOffers') || document.getElementById('chase-hud')) return;

        const hud = document.createElement('div');
        hud.id = 'chase-hud';
        hud.style = 'position:fixed; top:120px; right:20px; z-index:999999; background:#117aca; color:white; padding:15px; border-radius:10px; width:180px; font-family:sans-serif; border:2px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.4);';
        hud.innerHTML = `
            <div style="font-weight:bold; margin-bottom:10px; text-align:center; font-size:14px;">CHASE TURBO</div>
            <button id="start-btn" style="width:100%; padding:10px; cursor:pointer; font-weight:bold; border-radius:5px; border:none; background:white; color:#117aca; transition: 0.2s;">START ADDING</button>
            <div id="hud-status" style="font-size:11px; margin-top:10px; text-align:center; opacity:0.9;">Ready</div>
        `;
        document.body.appendChild(hud);
        document.getElementById('start-btn').onclick = toggleScript;
    }

    async function toggleScript() {
        const startBtn = document.getElementById('start-btn');
        const status = document.getElementById('hud-status');

        if (isRunning) {
            isRunning = false;
            startBtn.innerText = "START ADDING";
            startBtn.style.background = "white";
            startBtn.style.color = "#117aca";
            status.innerText = "Stopped.";
            return;
        }

        isRunning = true;
        startBtn.innerText = "STOP";
        startBtn.style.background = "#ff4d4d";
        startBtn.style.color = "white";

        while (isRunning) {
            const remaining = [...document.querySelectorAll(btnSelection)].filter(b =>
                b.lastChild.childNodes[0].querySelectorAll('path').length > 1
            );

            if (remaining.length === 0) {
                status.innerText = "Done! Scroll for more.";
                isRunning = false;
                break;
            }

            status.innerText = `Adding... (${remaining.length} left)`;
            remaining[0].childNodes[0].click();

            await smartWait(300); // Turbo Detail Wait
            if (!isRunning) break;

            const back = document.querySelector('[variant="back"]')?.shadowRoot?.querySelector('#back-button') ||
                         document.querySelector('[aria-label="Back"]');

            if (back) {
                back.click();
                await smartWait(500); // Turbo Return Wait
            } else {
                await smartWait(300);
            }

            if (!isRunning) break;
            window.scrollBy(0, 40);
        }

        isRunning = false;
        startBtn.innerText = "START ADDING";
        startBtn.style.background = "white";
        startBtn.style.color = "#117aca";
    }

    setInterval(createHUD, 500);
})();