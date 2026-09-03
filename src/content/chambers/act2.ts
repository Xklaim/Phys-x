import type { Chamber } from '../../types/chamber';

/**
 * Act II — Heat & Matter
 * Theme: Thermodynamics · Gas Laws · States of Matter
 * 8 chambers, difficulty intro → advanced
 * Callback: act2-05 references act1-08 (same drone mass)
 */
export const act2Chambers: Chamber[] = [
  // ── act2-01 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act2-01',
    actId: 'act2',
    order: 1,
    difficulty: 'intro',
    title: 'Thermal Expansion',
    backstory:
      "ECHO: 'The coolant pipe running through Deck 6 is 20 metres long at 15°C. After " +
      "the Fracture, the thermal regulation in that section spiked to 115°C. I need to " +
      "know how much the pipe has expanded — the expansion will determine if it's buckling " +
      "against the hull brackets. Steel has a linear expansion coefficient of 12 × 10⁻⁶ per °C.'",
    givens: [
      { label: 'Original length (L₀)', value: '20 m' },
      { label: 'Coefficient of linear expansion (α)', value: '12 × 10⁻⁶ /°C' },
      { label: 'Temperature change (ΔT)', value: '100°C (from 15°C to 115°C)' },
    ],
    question: 'How much has the pipe expanded, in metres? (Express as a decimal)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.024, unit: 'm', tolerancePercent: 3 },
    hints: [
      'Linear thermal expansion: the amount of expansion is proportional to original length, expansion coefficient, and temperature change.',
      'ΔL = α × L₀ × ΔT',
    ],
    fieldNote:
      'Most solid materials expand when heated, and the expansion is linear for small temperature changes: ' +
      'ΔL = αL₀ΔT. The coefficient α is tiny (steel is ~12 millionths per degree) but matters a lot over long ' +
      'pipes or bridges — that\'s why expansion joints exist in both. Note the pipe expanded 2.4 cm: enough ' +
      'to cause serious stress against a rigid bracket over its 20-metre run.',
    successFlavor:
      "ECHO: '2.4 cm expansion. The brackets have 3 cm of play — we're clear, but only just. Good catch, {name}. Marking that pipe for priority inspection.'",
    progressWeight: 2,
  },

  // ── act2-02 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act2-02',
    actId: 'act2',
    order: 2,
    difficulty: 'intro',
    title: 'Pressure Gauge',
    backstory:
      "ECHO: 'Life support tank A was at a pressure of 200 kPa and a volume of 0.5 m³ " +
      "before an automated valve halved the available volume. The temperature hasn't changed. " +
      "What's the new pressure? I need this to verify the pressure relief valve threshold.'",
    givens: [
      { label: 'Initial pressure (P₁)', value: '200 kPa' },
      { label: 'Initial volume (V₁)', value: '0.5 m³' },
      { label: 'Final volume (V₂)', value: '0.25 m³' },
      { label: 'Temperature', value: 'Constant (isothermal)' },
    ],
    question: 'What is the new pressure in the tank, in kPa?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 400, unit: 'kPa', tolerancePercent: 2 },
    hints: [
      'At constant temperature, there\'s an inverse relationship between pressure and volume for an ideal gas.',
      'Boyle\'s Law: P₁V₁ = P₂V₂. Solve for P₂.',
    ],
    fieldNote:
      'Boyle\'s Law (P₁V₁ = P₂V₂) describes an isothermal gas: squeezing the same amount of gas into half ' +
      'the space doubles the pressure. Intuitively, the same number of molecules are now hitting a smaller ' +
      'container wall, hitting more often per unit area. This is the physics behind how bicycle pumps work, ' +
      'and why pressurised canisters must not be punctured.',
    successFlavor:
      "ECHO: '400 kPa — the relief valve opens at 450 kPa, so we have some margin. But not much. Flagging this valve for immediate recalibration, {name}.'",
    progressWeight: 2,
  },

  // ── act2-03 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act2-03',
    actId: 'act2',
    order: 3,
    difficulty: 'core',
    title: "Charles's Chamber",
    backstory:
      "ECHO: 'Life support tank B contains gas at a fixed pressure — the pressure regulator " +
      "there is functioning. But the temperature has risen from 250 K to 350 K. I need to " +
      "know the new volume of the gas to verify the expansion tank has enough capacity. " +
      "Initial volume was 2.0 m³.'",
    givens: [
      { label: 'Initial volume (V₁)', value: '2.0 m³' },
      { label: 'Initial temperature (T₁)', value: '250 K' },
      { label: 'Final temperature (T₂)', value: '350 K' },
      { label: 'Pressure', value: 'Constant (isobaric)' },
    ],
    question: 'What is the new volume of the gas, in m³?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 2.8, unit: 'm³', tolerancePercent: 2 },
    hints: [
      'At constant pressure, volume and temperature are directly proportional — use temperatures in Kelvin.',
      "Charles's Law: V₁/T₁ = V₂/T₂. Solve for V₂.",
    ],
    fieldNote:
      "Charles's Law states that at constant pressure, volume is proportional to absolute temperature " +
      "(V ∝ T). Critically, temperature must be in Kelvin (not Celsius), because Kelvin starts at absolute " +
      "zero — the point where molecules have minimum energy and would ideally occupy zero volume. A gas at " +
      "0°C is NOT at zero energy; it's at 273 K. Using Celsius in gas laws gives nonsensical answers.",
    successFlavor:
      "ECHO: '2.8 m³ — the expansion tank capacity is 3.2 m³. We're safe. ECHO: Honestly, {name}, we're threading a lot of needles today. Good thing you're here.'",
    progressWeight: 4,
  },

  // ── act2-04 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act2-04',
    actId: 'act2',
    order: 4,
    difficulty: 'core',
    title: 'Ideal Gas Chamber',
    backstory:
      "ECHO: 'The research chamber in Lab 2 uses an ideal gas medium for its experiments. " +
      "We need to determine the pressure of 3 moles of nitrogen gas at 300 K " +
      "contained in a 0.075 m³ vessel. The universal gas constant is R = 8.314 J/(mol·K).'",
    givens: [
      { label: 'Number of moles (n)', value: '3 mol' },
      { label: 'Temperature (T)', value: '300 K' },
      { label: 'Volume (V)', value: '0.075 m³' },
      { label: 'Gas constant (R)', value: '8.314 J/(mol·K)' },
    ],
    question: 'What is the pressure of the gas in the vessel, in Pascals?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 99768, unit: 'Pa', tolerancePercent: 2 },
    hints: [
      'This involves all four variables — pressure, volume, moles, temperature — at once.',
      'Ideal Gas Law: PV = nRT. Rearrange for P = nRT/V.',
    ],
    fieldNote:
      'The Ideal Gas Law (PV = nRT) unifies Boyle\'s and Charles\'s Laws into one equation that relates ' +
      'all four state variables of a gas simultaneously. Real gases deviate at very high pressures or very ' +
      'low temperatures, but for most practical engineering scenarios (like a research lab vessel), the ideal ' +
      'approximation is excellent. R = 8.314 J/(mol·K) is one of the fundamental constants of physical chemistry.',
    successFlavor:
      "ECHO: 'Just under 100 kPa — close to atmospheric. Lab 2 vessel is nominal. That's a nice result, {name}.'",
    progressWeight: 4,
  },

  // ── act2-05 ── core ── numeric ── CALLBACK: act1-08 ────────────────────────
  {
    id: 'act2-05',
    actId: 'act2',
    order: 5,
    difficulty: 'core',
    title: 'Absorbing the Impact',
    backstory:
      "ECHO: 'Remember that 2.5 kg inspection drone from the corridor — the one with 180 J " +
      "of kinetic energy that clipped the beam? After it bounced, it hit a water-filled " +
      "dampening reservoir. The water absorbed most of that kinetic energy as heat. I need " +
      "to know by how much the water temperature rose, so I can verify the dampening system " +
      "is within spec. The reservoir holds 0.5 kg of water. Specific heat of water: 4200 J/(kg·°C).'",
    givens: [
      { label: 'Energy absorbed (from act1-08)', value: '180 J' },
      { label: 'Mass of water', value: '0.5 kg' },
      { label: 'Specific heat capacity of water (c)', value: '4200 J/(kg·°C)' },
    ],
    question: 'By how many degrees Celsius did the water temperature rise?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.0857, unit: '°C', tolerancePercent: 5 },
    callbackRef: 'act1-08',
    hints: [
      'Heat energy absorbed, mass, specific heat, and temperature change are all related by one equation.',
      'Q = mcΔT. You have Q, m, and c — solve for ΔT.',
    ],
    fieldNote:
      'The heat equation Q = mcΔT tells us that the temperature rise depends on how much energy is added, ' +
      'how much material is absorbing it, and how thermally resistant that material is (specific heat). Water ' +
      'has an unusually high specific heat (4200 J/kg·°C), which is why it\'s excellent for thermal management — ' +
      'it takes a lot of energy to heat up. Note: the 180 J from the drone\'s kinetic energy raised 0.5 kg of ' +
      'water by less than 0.1°C. Small mechanical impacts barely register thermally.',
    successFlavor:
      "ECHO: 'Temperature rise of 0.086°C — the dampening system is working as designed. Physics is elegant that way, {name} — one problem\'s output becomes another problem\'s input.'",
    progressWeight: 4,
  },

  // ── act2-06 ── advanced ── numeric ──────────────────────────────────────────
  {
    id: 'act2-06',
    actId: 'act2',
    order: 6,
    difficulty: 'advanced',
    title: 'Efficiency Loss',
    backstory:
      "ECHO: 'The thermal power converter on Deck 3 is supposed to convert heat from the " +
      "reactor exhaust into usable electricity. The system absorbs 5000 J of heat from the " +
      "hot reservoir and exhausts 3500 J to the cold reservoir in each cycle. I need the " +
      "thermal efficiency so I can flag whether the converter is within operating spec or " +
      "losing too much to exhaust.'",
    givens: [
      { label: 'Heat absorbed from hot reservoir (Q_h)', value: '5000 J' },
      { label: 'Heat exhausted to cold reservoir (Q_c)', value: '3500 J' },
    ],
    question: 'What is the thermal efficiency of the converter? (Express as a percentage, to one decimal place)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 30, unit: '%', tolerancePercent: 3 },
    hints: [
      'Efficiency is the ratio of useful output to total input. The useful work output is what\'s left after exhaust.',
      'W = Q_h - Q_c. Efficiency η = W / Q_h × 100%.',
    ],
    fieldNote:
      'Thermal efficiency η = W/Q_h = (Q_h - Q_c)/Q_h. No heat engine can be 100% efficient — the Second ' +
      'Law of Thermodynamics guarantees some heat must be exhausted to the cold reservoir. The theoretical ' +
      'maximum for any engine operating between two temperatures is the Carnot efficiency: η_max = 1 - T_c/T_h. ' +
      'Our 30% is typical for real-world thermal converters; nuclear power plants achieve ~33%, and car engines ' +
      'about 25-35%.',
    successFlavor:
      "ECHO: '30% efficiency — right at design spec. It's not glamorous, {name}, but it's holding. Deck 3 power stable.'",
    progressWeight: 6,
  },

  // ── act2-07 ── core ── multiple_choice ─────────────────────────────────────
  {
    id: 'act2-07',
    actId: 'act2',
    order: 7,
    difficulty: 'core',
    title: 'Entropy Audit',
    backstory:
      "ECHO: 'The emergency coolant system just vented hot gas into a cold vacuum section. " +
      "My diagnostic AI is asking which thermodynamic principle confirms this process is " +
      "irreversible — but the diagnostic module is corrupted. I need you to identify the " +
      "right principle so I can verify the system log is accurate.'",
    question:
      'Hot gas spontaneously expanding into a cold vacuum is irreversible because:',
    inputType: 'multiple_choice',
    answer: {
      kind: 'multiple_choice',
      correctKey: 'b',
      options: [
        { key: 'a', label: 'Energy is lost to friction during the expansion, reducing total system energy.' },
        { key: 'b', label: 'The total entropy of the system increases — disorder always increases in spontaneous natural processes.' },
        { key: 'c', label: 'The gas molecules gain mass as they spread out, resisting compression.' },
        { key: 'd', label: 'Temperature always equalises instantly in a vacuum, preventing the process from reversing.' },
      ],
    },
    hints: [
      'Irreversibility is fundamentally linked to which thermodynamic quantity always increases in isolated systems.',
      'Think about the Second Law of Thermodynamics and what it says about entropy in any spontaneous process.',
    ],
    fieldNote:
      'The Second Law of Thermodynamics states that in any spontaneous process in an isolated system, total ' +
      'entropy (disorder) never decreases. Hot gas expanding into cold vacuum increases entropy because it ' +
      'becomes more disordered — molecules spread out, energy becomes less concentrated. The reverse (cold ' +
      'vacuum spontaneously re-compressing hot gas) would decrease entropy and never happens in nature.',
    successFlavor:
      "ECHO: 'Second Law confirmed. System log verified. {name}, you just saved me from flagging a non-existent fault. Entropy wins again.'",
    progressWeight: 4,
  },

  // ── act2-08 ── advanced ── expression ──────────────────────────────────────
  {
    id: 'act2-08',
    actId: 'act2',
    order: 8,
    difficulty: 'advanced',
    title: 'Combined Gas Law',
    backstory:
      "ECHO: 'I need a general formula for this next section — multiple gas tanks are " +
      "undergoing different pressure, volume, and temperature changes simultaneously, " +
      "and I need a relationship I can run across all of them. Write me the expression " +
      "that links the initial and final states of a fixed amount of ideal gas when all " +
      "three variables change at once.'",
    givens: [
      { label: 'Variables', value: 'P₁, V₁, T₁ (initial) and P₂, V₂, T₂ (final)' },
    ],
    question: 'Write the Combined Gas Law expression (as a ratio: left side = right side).',
    inputType: 'expression',
    answer: {
      kind: 'expression',
      expression: '(P1 * V1) / T1',
      variables: ['P1', 'V1', 'T1', 'P2', 'V2', 'T2'],
      sampleRanges: { P1: [100, 300], V1: [1, 5], T1: [200, 400], P2: [100, 300], V2: [1, 5], T2: [200, 400] },
    },
    hints: [
      'The combined gas law is Boyle\'s and Charles\'s laws merged — it says a particular combination of P, V, and T stays constant.',
      'The constant is PV/T. Write the left side of: P₁V₁/T₁ = P₂V₂/T₂',
    ],
    fieldNote:
      'The Combined Gas Law (P₁V₁/T₁ = P₂V₂/T₂) is the workhorse equation for gas problems where more than ' +
      'one state variable changes. It\'s derived directly from PV = nRT — for a fixed amount of gas (n constant), ' +
      'PV/T must always equal nR, which is constant. Lock any one variable and you recover Boyle\'s or Charles\'s Law.',
    successFlavor:
      "ECHO: 'Combined gas law confirmed. Running it across all 14 tanks now. {name}, you just saved me 40 minutes of sequential calculation.'",
    progressWeight: 6,
  },
];
