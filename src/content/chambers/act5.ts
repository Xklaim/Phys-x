import type { Chamber } from '../../types/chamber';

/**
 * Act V — The Very Small & The Very Vast
 * Theme: Modern Physics · Nuclear · Orbital Mechanics
 * 6 chambers, mostly core/advanced; finale ties back to "The Fracture"
 * Callback: act5-02 references act1-10 (same combined mass, momentum → de Broglie)
 */
export const act5Chambers: Chamber[] = [
  // ── act5-01 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act5-01',
    actId: 'act5',
    order: 1,
    difficulty: 'intro',
    title: 'Photon Energy',
    backstory:
      "ECHO: 'I need to tell you what's at the centre of all this, {name}. But first — " +
      "one more calibration. The anomaly at the heart of the Fracture emits radiation. " +
      "One of the spectral lines shows a frequency of 6 × 10¹⁴ Hz. I need its photon " +
      "energy so I can classify what we're dealing with. Planck's constant: h = 6.626 × 10⁻³⁴ J·s.'",
    givens: [
      { label: "Planck's constant (h)", value: '6.626 × 10⁻³⁴ J·s' },
      { label: 'Frequency (f)', value: '6 × 10¹⁴ Hz' },
    ],
    question: 'What is the energy of one photon at this frequency, in Joules?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 3.976e-19, unit: 'J', tolerancePercent: 3 },
    hints: [
      'Photon energy is one of the most fundamental equations in quantum physics — very direct.',
      'E = h × f',
    ],
    fieldNote:
      'E = hf is the foundation of quantum mechanics. Planck proposed in 1900 that energy comes in discrete ' +
      'packets (quanta) proportional to frequency. This single equation explained the photoelectric effect, ' +
      'atomic spectra, and eventually led to quantum theory. The frequency 6 × 10¹⁴ Hz is in the visible ' +
      'orange-red range. Each photon carries a tiny but non-zero package of energy.',
    successFlavor:
      "ECHO: '3.98 × 10⁻¹⁹ Joules per photon. Orange-red light. {name}, the anomaly is emitting visible radiation from its quantum core. Now I\'ll tell you what it is.'",
    progressWeight: 2,
  },

  // ── act5-02 ── core ── numeric ── CALLBACK: act1-10 ────────────────────────
  {
    id: 'act5-02',
    actId: 'act5',
    order: 2,
    difficulty: 'core',
    title: 'de Broglie Wave',
    backstory:
      "ECHO: 'Remember the two robots that collided and merged into a 100 kg unit moving " +
      "at 1.8 m/s? I've been thinking about that system. At quantum scales, every moving " +
      "object has an associated wavelength — even a macroscopic one. I need its de Broglie " +
      "wavelength. It's absurdly small, but the calculation is the same principle that explains " +
      "why electrons can be diffracted. Planck's constant: h = 6.626 × 10⁻³⁴ J·s.'",
    givens: [
      { label: 'Mass (from act1-10 combined robots)', value: '100 kg' },
      { label: 'Velocity (from act1-10)', value: '1.8 m/s' },
      { label: "Planck's constant (h)", value: '6.626 × 10⁻³⁴ J·s' },
    ],
    question: 'What is the de Broglie wavelength of the combined robot unit, in metres?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 3.681e-36, unit: 'm', tolerancePercent: 4 },
    callbackRef: 'act1-10',
    hints: [
      'de Broglie wavelength relates Planck\'s constant to the object\'s momentum.',
      'λ = h / p, where p = mv. Use the mass and velocity from act1-10.',
    ],
    fieldNote:
      'Louis de Broglie proposed in 1924 that matter has wave properties: λ = h/p = h/(mv). For electrons ' +
      '(mass ~10⁻³⁰ kg) moving fast, λ can be comparable to atomic spacings — which is why electron ' +
      'diffraction reveals crystal structure. For macroscopic objects like our 100 kg robot, λ is ~10⁻³⁶ m — ' +
      'vastly smaller than any observable scale. Wave-particle duality exists for everything, but only matters ' +
      'at quantum scales.',
    successFlavor:
      "ECHO: '3.68 × 10⁻³⁶ metres. An observable only in principle, not in practice. But {name} — the same equation that gives us this also governs the anomaly\'s quantum structure. We\'re getting close.'",
    progressWeight: 4,
  },

  // ── act5-03 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act5-03',
    actId: 'act5',
    order: 3,
    difficulty: 'core',
    title: 'Half-Life Decay',
    backstory:
      "ECHO: 'The Fracture released trace amounts of a radioactive isotope — Iodine-131, " +
      "half-life 8 days. Initial activity was 800 μg. I need to know how much remains " +
      "after 24 days — both to assess current radiation levels and to time our approach " +
      "to the anomaly core safely.'",
    givens: [
      { label: 'Initial amount (N₀)', value: '800 μg' },
      { label: 'Half-life (t₁/₂)', value: '8 days' },
      { label: 'Elapsed time (t)', value: '24 days' },
    ],
    question: 'How much of the isotope remains after 24 days, in μg?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 100, unit: 'μg', tolerancePercent: 2 },
    hints: [
      'After each half-life, the remaining amount halves. How many half-lives fit in 24 days?',
      'N = N₀ × (½)^(t/t₁/₂). Count: 24/8 = 3 half-lives. 800 → 400 → 200 → 100.',
    ],
    fieldNote:
      'Radioactive decay follows N = N₀(½)^(t/t₁/₂): the quantity halves every half-life period, regardless ' +
      'of how much is present. This is exponential decay — the same mathematical form as cooling, chemical ' +
      'reactions, and capacitor discharge. After n half-lives, (½)^n of the original remains: 3 half-lives = ' +
      '12.5% remaining. Half-lives span from nanoseconds (unstable isotopes) to billions of years (uranium-238).',
    successFlavor:
      "ECHO: '100 μg remaining. Well below the hazard threshold. We have a safe approach window, {name}. I think it\'s time to tell you everything.'",
    progressWeight: 4,
  },

  // ── act5-04 ── advanced ── expression ──────────────────────────────────────
  {
    id: 'act5-04',
    actId: 'act5',
    order: 4,
    difficulty: 'advanced',
    title: 'Orbital Velocity',
    backstory:
      "ECHO: 'The anomaly has a gravitational component — a micro-singularity, orbiting in " +
      "a confined space. To predict its position, I need the expression for the circular " +
      "orbital velocity of an object in terms of the gravitational constant (G), the central " +
      "mass (M), and the orbital radius (r). Write it generally — I\'ll apply it to the " +
      "singularity's parameters once I have the formula.'",
    givens: [
      { label: 'Variables', value: 'G (gravitational constant), M (central mass), r (orbital radius)' },
    ],
    question: 'Write the expression for circular orbital velocity (v) in terms of G, M, and r.',
    inputType: 'expression',
    answer: {
      kind: 'expression',
      expression: 'sqrt(G * M / r)',
      variables: ['G', 'M', 'r'],
      sampleRanges: { G: [6.67e-11, 6.67e-11], M: [1e20, 1e30], r: [1e6, 1e12] },
    },
    hints: [
      'Circular orbit means gravitational force provides centripetal force: F_grav = F_centripetal.',
      'Set GMm/r² = mv²/r. The object mass m cancels. Solve for v = √(GM/r).',
    ],
    fieldNote:
      'Circular orbital velocity v = √(GM/r) comes from balancing gravitational and centripetal force. ' +
      'Notice mass of the orbiting object cancels — a feather and a planet at the same radius orbit at the ' +
      'same speed. Higher orbits are slower (v ∝ 1/√r). This is why GPS satellites (high orbit) move slower ' +
      'than the ISS (low orbit). The formula also explains why black holes have circular orbits of infalling matter.',
    successFlavor:
      "ECHO: 'Orbital velocity expression confirmed. Singularity position extrapolated. {name} — one more calculation. The last one. This is what it\'s all been leading to.'",
    progressWeight: 6,
  },

  // ── act5-05 ── advanced ── numeric ──────────────────────────────────────────
  {
    id: 'act5-05',
    actId: 'act5',
    order: 5,
    difficulty: 'advanced',
    title: 'Binding Energy',
    backstory:
      "ECHO: 'The Fracture was caused by a failed attempt to extract binding energy from " +
      "an atomic nucleus. The mass of the constituent nucleons adds up to 0.03 u more than " +
      "the actual nucleus mass — that \"missing\" mass is the binding energy released. " +
      "1 atomic mass unit (u) = 1.6605 × 10⁻²⁷ kg. I need the binding energy in Joules.'",
    givens: [
      { label: 'Mass defect (Δm)', value: '0.03 u = 0.03 × 1.6605 × 10⁻²⁷ kg' },
      { label: 'Speed of light (c)', value: '3 × 10⁸ m/s' },
    ],
    question: 'What is the nuclear binding energy released by this mass defect, in Joules?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 4.4836e-12, unit: 'J', tolerancePercent: 3 },
    hints: [
      'The mass defect converts directly to energy via the most famous equation in physics.',
      'E = Δm × c². First convert: Δm = 0.03 × 1.6605 × 10⁻²⁷ kg.',
    ],
    fieldNote:
      'Mass-energy equivalence (E = mc²) is the most famous equation in physics — and a practical one. ' +
      'Nuclear binding energy is the energy that holds a nucleus together, and equals the "missing" mass ' +
      'times c². This is why nuclear reactions release millions of times more energy than chemical reactions: ' +
      'even tiny mass differences (in the 10⁻²⁷ kg range) × c² (a huge number squared) = substantial energy. ' +
      'Fission reactors exploit exactly this.',
    successFlavor:
      "ECHO: '4.48 × 10⁻¹² Joules. That's 4.48 picojoules — tiny by human scales, immense at nuclear scales. {name}... that\'s it. You\'ve solved it. Input the shutdown sequence. End the Fracture.'",
    progressWeight: 6,
  },

  // ── act5-06 ── advanced ── multiple_choice ──────────────────────────────────
  {
    id: 'act5-06',
    actId: 'act5',
    order: 6,
    difficulty: 'advanced',
    title: 'The Fracture Explained',
    backstory:
      "ECHO: '{name}. We\'re at the end. I need one final verification — not a calculation " +
      "this time, but an understanding. The anomaly is contained. Before I execute the " +
      "shutdown sequence, confirm you understand what happened here. The Fracture was caused " +
      "by a chain of events spanning all five fields of physics we\'ve worked through together. " +
      "Which of the following best describes the complete causal chain?'",
    question:
      'What sequence of events best describes the cause and effect chain of the Fracture?',
    inputType: 'multiple_choice',
    answer: {
      kind: 'multiple_choice',
      correctKey: 'b',
      options: [
        {
          key: 'a',
          label:
            'An electrical surge overloaded the thermal systems, vaporizing coolant and disrupting the magnetic containment field, which lost the experimental nucleus.',
        },
        {
          key: 'b',
          label:
            'A nuclear binding energy extraction attempt released more energy than calculated (via E=mc²), which overwhelmed the thermal systems, destabilized electromagnetic containment, disrupted the wave-based sensor array, and the resulting force imbalance breached the kinematic limits of the station\'s structural systems — creating a cascade across all five physical domains.',
        },
        {
          key: 'c',
          label:
            'A wave interference pattern in the sensor array caused a positive feedback loop in the electrical grid, which heated the reactor beyond containment and triggered a runaway nuclear reaction.',
        },
        {
          key: 'd',
          label:
            'The station drifted out of orbital position, causing gravitational tidal forces to stress all systems simultaneously.',
        },
      ],
    },
    hints: [
      'The Fracture touched every system we\'ve fixed — the cause must span all of them in the right order.',
      'Start at the source: the nuclear experiment. Trace the energy cascade outward through each domain.',
    ],
    fieldNote:
      'The Fracture is a fiction, but the cascade it describes is physically plausible: nuclear events release ' +
      'enormous energy (binding energy, E=mc²) that becomes thermal energy, which can overwhelm electromagnetic ' +
      'containment, which disrupts sensor wave systems, which ultimately impacts mechanical structure. Physics ' +
      'domains aren\'t isolated — they\'re coupled, and failures cascade. Real engineering disasters (Chernobyl, ' +
      'for instance) often follow exactly this kind of multi-domain cascade failure.',
    successFlavor:
      "ECHO: '...Shutdown sequence accepted. Anomaly stabilizing. {name}, I want you to know something: " +
      "I\'ve been running this station alone for three days. In those three days, I recalculated everything " +
      "we just did — and I couldn\'t act on a single result without you. That\'s not a flaw in my design. " +
      "That\'s the point. Some problems require the kind of understanding that comes from actually working " +
      "through it. The Fracture is closed, {name}. Station Meridian is stable. You did this.'",
    progressWeight: 6,
  },
];
