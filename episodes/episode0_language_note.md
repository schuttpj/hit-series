# Episode 0 language standards

Applied to `episode0_grid_codes.html` and future HIT Technology Series episodes.

## Voice and audience

- Write for project directors, mechanical engineers, and grid-connection stakeholders who may not live in protection engineering.
- Use plain, declarative sentences. Prefer one idea per sentence.
- British English: **data centre**, **energise**, **behaviour**, **metre** (when referring to units of measure in prose).
- Avoid second person (**you**, **your**) in body copy unless quoting a requirement verbatim.

## Punctuation and typography

- **No em dashes (—)** in body copy, legends, buttons, or canvas annotation strings. Use commas, full stops, colons, or parentheses instead.
- Avoid en dashes (–) in prose ranges where possible; write **0.5 s to 2 s** or use **to**.
- No ellipses (…) in UI hints or labels.
- No tilde approximations (~); write **approximately** or give a sourced number.

## Terminology

- Define acronyms on first use in each major section: **Voltage ride-through (VRT)**, **Active power recovery (APR)**, etc.
- Say **grid operator**, **ISO**, or **RTO** when the jurisdiction includes ERCOT, SPP, AESO, or IESO. Reserve **TSO** for transmission-system operators (EirGrid, Fingrid, Energinet, TenneT, RTE).
- **Large Computational Load (LCL)** in ERCOT context; avoid deprecated **LEL**.
- **Connection agreement** or **connection conditions**, not informal **counterparty** unless explaining the contractual shift explicitly.

## Factual claims

- Every quantitative claim must trace to a file in `referencedocs/` or `gcc_compliance/`.

## Technology claims (HIT vs grid-side compensation)

- **HIT is series voltage injection** (DVR function), not shunt reactive compensation. Per `docs/energy_storage_architecture.md` §2: E-STATCOM performs shunt V/Q at the PCC; these are distinct functions.
- **Do not claim** that HIT or HIT+BESS "replaces" STATCOM, E-STATCOM, or grid-side compensation infrastructure. HIT may reduce the need for discrete LV harmonic filters or PFC cubicles (per `referencedocs/HIT basis of design.md` §10.1.3); whether PCC-level shunt equipment is required is site-specific.
- **HIT does not** provide transmission-system reactive support equivalent to E-STATCOM. **HIT cannot** inject active power on a phase whose source is disconnected without separate energy storage.
- Frame outcomes as **simulation results**, **evaluated in study**, or **may** / **within ±20% range** — not proven, guaranteed, or compliance demonstrated unless citing an accepted interconnection filing.
- Distinguish **facility LV bus** functions from **point of interconnection (PCC)** grid-support functions.

## Index page disclaimer

- State **demonstration purposes only**; technology not yet commercially mature.
- Direct performance criteria, validation, and readiness questions to the **OEM (Ionate)**.
- Note that modelled limits and simulation assumptions are **OEM design-dependent** and subject to change.

- APR wording: **at least 90% of pre-fault active power**, never **full power draw**.
- Incident examples: cite **NERC LLTF (2025)** for July 2024 Dominion-area disconnections; do not attribute to ESIG unless the full report states the event.
- Illustrative chart tiers (e.g. 0.35 pu / 250 ms) must be labelled as representative of operator test profiles, not universal limits.

## Tone to avoid

- Marketing slogans without source (**Day 1**, **Scale changed everything**).
- Anthropomorphism (**the grid feels it**).
- Casual dismissals (**someone else's problem**, **good engineering, faster is better**).
- Unverified distance or scale exaggeration (**hundreds of kilometres away** for SSTI).

## Sources used in Episode 0

| Topic | Reference |
|-------|-----------|
| Operator patchwork | ESIG Table 1 (2026 report) |
| APR 90% / timing | EirGrid CC.7.4.3.2; ERCOT NOGRR-282 NOG 2.15(3)(e) |
| July 2024 load loss | NERC LLTF white paper (2025), via `docs/technology_mechanisms_analysis.md` |
| AI cyclic load | Microsoft/NVIDIA, *Power Stabilization for AI Training Datacenters* (2025) |
| SSTI example | ESIG report Figure 10 (900 MVA unit, 14 Hz, 50 MW oscillation) |
