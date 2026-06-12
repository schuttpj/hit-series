(function () {
  'use strict';

  // Change password: echo -n 'your-new-password' | shasum -a 256
  // Default password: HIT2026
  var PASSWORD_HASH = '4511a29dfa277bb8ff8cf4675f26ea4642dc4a0000d839f1d3aa007232ef484a';
  var STORAGE_KEY = 'hit-series-auth';
  var AUTH_TOKEN = 'ok';
  var SESSION_HOURS = 24;

  function readAuth(storage) {
    try {
      var raw = storage.getItem(STORAGE_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      return data && data.token === AUTH_TOKEN && Date.now() < data.expires;
    } catch (err) {
      return false;
    }
  }

  function isAuthed() {
    if (readAuth(sessionStorage) || readAuth(localStorage)) return true;
    try {
      if (window.parent !== window) {
        return readAuth(window.parent.sessionStorage) || readAuth(window.parent.localStorage);
      }
    } catch (err) {
      return false;
    }
    return false;
  }

  function saveAuth() {
    var payload = JSON.stringify({
      token: AUTH_TOKEN,
      expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000
    });
    sessionStorage.setItem(STORAGE_KEY, payload);
    localStorage.setItem(STORAGE_KEY, payload);
  }

  function sha256(text) {
    var encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(text)).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function unlock() {
    document.documentElement.classList.remove('hit-locked');
    var gate = document.getElementById('hit-auth-gate');
    if (gate) gate.remove();
  }

  function showGate() {
    document.documentElement.classList.add('hit-locked');

    var gate = document.createElement('div');
    gate.id = 'hit-auth-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'hit-auth-title');
    gate.innerHTML =
      '<div class="hit-auth-card">' +
        '<div class="hit-auth-kicker">FoundDigital DS · Confidential</div>' +
        '<h1 id="hit-auth-title">HIT Technology Series</h1>' +
        '<p>Enter the access password shared with you to view this demonstration site.</p>' +
        '<form id="hit-auth-form">' +
          '<div class="hit-auth-field">' +
            '<label for="hit-auth-password">Access password</label>' +
            '<input id="hit-auth-password" type="password" autocomplete="current-password" required>' +
          '</div>' +
          '<p class="hit-auth-error" id="hit-auth-error" aria-live="polite"></p>' +
          '<button class="hit-auth-submit" type="submit">Continue</button>' +
        '</form>' +
        '<p class="hit-auth-note">Browser-only protection. Do not share this link publicly.</p>' +
      '</div>';

    document.body.appendChild(gate);

    var form = document.getElementById('hit-auth-form');
    var input = document.getElementById('hit-auth-password');
    var error = document.getElementById('hit-auth-error');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      error.textContent = '';
      sha256(input.value).then(function (hash) {
        if (hash === PASSWORD_HASH) {
          saveAuth();
          unlock();
          return;
        }
        error.textContent = 'Incorrect password. Please try again.';
        input.value = '';
        input.focus();
      }).catch(function () {
        error.textContent = 'Unable to verify password in this browser.';
      });
    });

    input.focus();
  }

  if (isAuthed()) {
    unlock();
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showGate);
  } else {
    showGate();
  }
})();
