import type { Chamber } from '../../types/chamber';

/**
 * Act IV — Charge & Field
 * Theme: Electricity · Magnetism · Circuits
 * 8 chambers, difficulty intro → advanced
 * Callback: act4-05 references act2-04 (parallel between gas pressure/volume and charge/capacitance)
 */
export const act4Chambers: Chamber[] = [
  // ── act4-01 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act4-01',
    actId: 'act4',
    order: 1,
    difficulty: 'intro',
    title: "Ohm's Gate",
    backstory:
      "ECHO: 'The first containment field generator is online but drawing anomalous current. " +
      "The resistor in the control circuit has a resistance of 220 Ω and there's a 9 V supply " +
      "feeding it. I need the current flowing through this branch to verify the fuse rating.'",
    givens: [
      { label: 'Voltage (V)', value: '9 V' },
      { label: 'Resistance (R)', value: '220 Ω' },
    ],
    question: 'What is the current flowing through the resistor, in Amperes? (Round to 3 decimal places)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.0409, unit: 'A', tolerancePercent: 3 },
    hints: [
      'Voltage, current, and resistance are linked by the most fundamental law in circuit analysis.',
      "Ohm's Law: V = IR. Rearrange for I = V / R.",
    ],
    fieldNote:
      "Ohm's Law (V = IR) describes the linear relationship between voltage, current, and resistance " +
      "in an ideal resistor. Voltage is the electrical 'pressure' driving the current; resistance is what " +
      "opposes it. Current is proportional to voltage and inversely proportional to resistance — double the " +
      "voltage, double the current; double the resistance, half the current.",
    successFlavor:
      "ECHO: '40.9 mA — within fuse spec. Generator 1 control circuit nominal. {name}, we're starting to get traction here.'",
    progressWeight: 2,
  },

  // ── act4-02 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act4-02',
    actId: 'act4',
    order: 2,
    difficulty: 'intro',
    title: 'Series Circuit',
    backstory:
      "ECHO: 'Three resistors are wired in series in the secondary control loop: 100 Ω, " +
      "150 Ω, and 220 Ω. A 12 V supply drives the loop. I need the total resistance and " +
      "then the current through the loop — the current is the same everywhere in a series " +
      "circuit and I need it to size the wire gauge.'",
    givens: [
      { label: 'R₁', value: '100 Ω' },
      { label: 'R₂', value: '150 Ω' },
      { label: 'R₃', value: '220 Ω' },
      { label: 'Voltage supply', value: '12 V' },
    ],
    question: 'What is the current flowing through the series circuit, in Amperes? (Round to 4 decimal places)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.0255, unit: 'A', tolerancePercent: 3 },
    hints: [
      'In a series circuit, total resistance is just the sum of all resistors.',
      'R_total = R₁ + R₂ + R₃. Then I = V / R_total.',
    ],
    fieldNote:
      'Resistors in series simply add: R_total = R₁ + R₂ + R₃ + … The same current flows through every ' +
      'component, but the voltage splits across each proportionally to its resistance (V = IR per component). ' +
      'This is why a break anywhere in a series circuit stops all current — a chain is only as strong as its weakest link.',
    successFlavor:
      "ECHO: '25.5 mA through the series loop. Wire gauge confirmed. {name}, that's Generator 2 control loop verified.'",
    progressWeight: 2,
  },

  // ── act4-03 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act4-03',
    actId: 'act4',
    order: 3,
    difficulty: 'core',
    title: 'Parallel Network',
    backstory:
      "ECHO: 'The power distribution hub fans out to three parallel branches: 60 Ω, 40 Ω, " +
      "and 24 Ω. The hub voltage is 24 V. I need the total current drawn from the supply " +
      "to verify the main circuit breaker is sized correctly. The current here is NOT simply " +
      "addable — parallel resistors need a different approach.'",
    givens: [
      { label: 'R₁', value: '60 Ω' },
      { label: 'R₂', value: '40 Ω' },
      { label: 'R₃', value: '24 Ω' },
      { label: 'Voltage across all branches', value: '24 V' },
    ],
    question: 'What is the total current drawn from the supply, in Amperes?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 2.0, unit: 'A', tolerancePercent: 2 },
    hints: [
      'For parallel resistors, find the equivalent resistance first using the reciprocal rule, or find each branch current separately and sum them.',
      '1/R_p = 1/R₁ + 1/R₂ + 1/R₃. Or: I_total = V/R₁ + V/R₂ + V/R₃.',
    ],
    fieldNote:
      'Resistors in parallel have the same voltage across each, but current splits between branches. ' +
      'The equivalent resistance is given by 1/R_p = 1/R₁ + 1/R₂ + ... — always less than the smallest ' +
      'individual resistor. Adding more parallel paths gives the current more routes and always reduces overall ' +
      'resistance. This is why plugging in more appliances at home (parallel) can trip the breaker.',
    successFlavor:
      "ECHO: '2.0 A total — breaker rated to 3 A. Good margin. Power hub nominal. {name}, you're getting comfortable with circuit analysis.'",
    progressWeight: 4,
  },

  // ── act4-04 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act4-04',
    actId: 'act4',
    order: 4,
    difficulty: 'core',
    title: 'Power Draw',
    backstory:
      "ECHO: 'The primary containment field emitter runs at 48 V and draws 8 A. I need " +
      "to know the power it's consuming — this determines how long our reserve batteries " +
      "can sustain the containment field if main power fails. Every watt counts.'",
    givens: [
      { label: 'Voltage (V)', value: '48 V' },
      { label: 'Current (I)', value: '8 A' },
    ],
    question: 'What is the power consumed by the containment field emitter, in Watts?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 384, unit: 'W', tolerancePercent: 2 },
    hints: [
      'Power in an electrical circuit combines voltage and current — there are several equivalent formulas.',
      'P = V × I (or equivalently P = I²R or P = V²/R)',
    ],
    fieldNote:
      'Electrical power P = IV is the rate of energy delivery — how many joules per second the circuit ' +
      'consumes. The equivalent forms P = I²R and P = V²/R are useful when you know resistance instead of ' +
      'voltage or current directly. This 384 W draw is significant — equivalent to four incandescent light ' +
      'bulbs. Over time, power × time = energy (in Joules or kilowatt-hours).',
    successFlavor:
      "ECHO: '384 W. Reserve batteries: rated for 20 kWh. At 384 W constant draw, that's 52 hours. We have time. {name}, the containment field is stable — for now.'",
    progressWeight: 4,
  },

  // ── act4-05 ── core ── numeric ── CALLBACK: act2-04 ────────────────────────
  {
    id: 'act4-05',
    actId: 'act4',
    order: 5,
    difficulty: 'core',
    title: 'Capacitor Charge',
    backstory:
      "ECHO: 'The field emitter uses a large capacitor bank for energy storage. Just like " +
      "the gas chamber in the lab — where pressure, volume, and moles are linked — a " +
      "capacitor links charge, capacitance, and voltage. One capacitor in the bank has a " +
      "capacitance of 4700 μF and is charged to 24 V. I need the total charge stored.'",
    givens: [
      { label: 'Capacitance (C)', value: '4700 μF = 4.7 × 10⁻³ F' },
      { label: 'Voltage (V)', value: '24 V' },
    ],
    question: 'How much charge is stored in the capacitor, in Coulombs?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.1128, unit: 'C', tolerancePercent: 2 },
    callbackRef: 'act2-04',
    hints: [
      'The capacitor equation mirrors the gas law structure — there\'s a simple proportional relationship between three quantities.',
      'Q = C × V (charge = capacitance × voltage).',
    ],
    fieldNote:
      'A capacitor stores electrical energy in an electric field between two conductors. The charge Q = CV: ' +
      'the larger the capacitance (ability to store) and the higher the voltage (energy per charge), the more ' +
      'total charge. This is conceptually parallel to the gas law: just as PV = nRT links gas state variables, ' +
      'Q = CV links the three variables of a capacitor\'s state.',
    successFlavor:
      "ECHO: '0.113 Coulombs stored. Capacitor bank at full charge. Field emitter ready to pulse. {name}, the Ideal Gas Law and capacitor physics share more than you might think.'",
    progressWeight: 4,
  },

  // ── act4-06 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act4-06',
    actId: 'act4',
    order: 6,
    difficulty: 'core',
    title: 'Magnetic Force',
    backstory:
      "ECHO: 'The containment field uses a magnetic sector to deflect charged particles. " +
      "A proton (charge 1.6 × 10⁻¹⁹ C) is moving at 2 × 10⁶ m/s perpendicular to a " +
      "magnetic field of strength 0.5 T. I need the magnetic force on the proton to verify " +
      "the deflection radius is sufficient to contain it.'",
    givens: [
      { label: 'Charge of proton (q)', value: '1.6 × 10⁻¹⁹ C' },
      { label: 'Velocity (v)', value: '2 × 10⁶ m/s' },
      { label: 'Magnetic field strength (B)', value: '0.5 T' },
      { label: 'Angle between v and B', value: '90° (perpendicular)' },
    ],
    question: 'What is the magnetic force on the proton, in Newtons?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 1.6e-13, unit: 'N', tolerancePercent: 3 },
    hints: [
      'The magnetic force on a moving charge depends on the charge, velocity, field strength, and the angle between them.',
      'F = qvB sin(θ). With θ = 90°, sin(90°) = 1, so F = qvB.',
    ],
    fieldNote:
      'The Lorentz magnetic force (F = qvBsinθ) acts perpendicular to both the velocity and the magnetic field, ' +
      'causing circular motion in a uniform field. The radius of that circle is r = mv/(qB) — the cyclotron ' +
      'radius. Particle accelerators and mass spectrometers exploit this relationship to separate and steer ' +
      'charged particles with precision.',
    successFlavor:
      "ECHO: '1.6 × 10⁻¹³ N — deflection radius confirmed at 20 cm. Containment geometry holds. {name}, the field is doing its job.'",
    progressWeight: 4,
  },

  // ── act4-07 ── advanced ── expression ──────────────────────────────────────
  {
    id: 'act4-07',
    actId: 'act4',
    order: 7,
    difficulty: 'advanced',
    title: "Faraday's Loop",
    backstory:
      "ECHO: 'The backup generator uses electromagnetic induction — a coil rotating in a " +
      "magnetic field. I need the general expression for the EMF it induces in terms of " +
      "the number of turns (N), the change in magnetic flux (dPhi), and the change in " +
      "time (dt). Write it so I can run it for any coil configuration we have on the station.'",
    givens: [
      { label: 'Variables', value: 'N (turns), ΔΦ (change in flux in Wb), Δt (time in s)' },
    ],
    question: "Write Faraday's Law of Induction: the expression for induced EMF (ε).",
    inputType: 'expression',
    answer: {
      kind: 'expression',
      expression: '-N * dPhi / dt',
      variables: ['N', 'dPhi', 'dt'],
      sampleRanges: { N: [1, 500], dPhi: [0.001, 1], dt: [0.001, 1] },
    },
    hints: [
      'The induced EMF is proportional to how fast the magnetic flux is changing through the coil, scaled by the number of turns.',
      "ε = -N × ΔΦ/Δt. The negative sign (Lenz's Law) means the induced EMF opposes the change that created it.",
    ],
    fieldNote:
      "Faraday's Law (ε = -NΔΦ/Δt) is the foundation of every generator, transformer, and inductive charger. " +
      "The negative sign encodes Lenz's Law: nature always resists change — the induced current creates a " +
      "magnetic field opposing the flux change that caused it. More turns, faster flux change = larger EMF. " +
      "A generator converts mechanical motion (changing flux) into electrical energy through this principle.",
    successFlavor:
      "ECHO: 'Faraday's Law confirmed. Running the expression across all three backup coil configurations now. {name}, we have generator output. Containment is powered.'",
    progressWeight: 6,
  },

  // ── act4-08 ── advanced ── numeric ──────────────────────────────────────────
  {
    id: 'act4-08',
    actId: 'act4',
    order: 8,
    difficulty: 'advanced',
    title: 'Full Circuit Synthesis',
    backstory:
      "ECHO: 'The main containment control board has a two-loop circuit I need to fully " +
      "characterize. Loop 1: 12 V source, R₁ = 4 Ω (in series with loop), R₂ = 6 Ω " +
      "(shared with loop 2). Loop 2: 8 V source (opposing), R₂ = 6 Ω (shared), R₃ = 2 Ω. " +
      "I need the current through R₂ — the shared resistor — to size the heat sink.'",
    givens: [
      { label: 'Loop 1 source (V₁)', value: '12 V' },
      { label: 'R₁ (loop 1 only)', value: '4 Ω' },
      { label: 'R₂ (shared)', value: '6 Ω' },
      { label: 'Loop 2 source (V₂, opposing)', value: '8 V' },
      { label: 'R₃ (loop 2 only)', value: '2 Ω' },
    ],
    question: 'Using Kirchhoff\'s Voltage Law, what is the current through R₂ (the shared resistor), in Amperes? (Round to 2 decimal places)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.8, unit: 'A', tolerancePercent: 5 },
    hints: [
      'Assign currents I₁ and I₂ for each loop (clockwise). Apply KVL: sum of voltage drops = sum of EMFs around each loop.',
      'Loop 1: 12 = 4I₁ + 6(I₁ - I₂). Loop 2: 8 = 2I₂ + 6(I₂ - I₁). Solve this system for I₁ and I₂, then find I₂ - I₁ (or I₁ - I₂) through R₂.',
    ],
    fieldNote:
      "Kirchhoff's Voltage Law (KVL) states that the sum of voltage drops around any closed loop equals zero. " +
      "For multi-loop circuits, you set up one KVL equation per independent loop and solve the system simultaneously. " +
      "The mesh current method (assigning a current to each loop) is a clean way to do this. KVL is a direct " +
      "consequence of energy conservation — voltage is energy per charge, and energy can't accumulate in a loop.",
    successFlavor:
      "ECHO: '0.8 A through R₂. Heat sink is rated for 1.2 A — we have margin. {name}, all four generators are now operational. The containment field is fully powered.'",
    progressWeight: 6,
  },
];
