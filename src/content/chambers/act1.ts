import type { Chamber } from '../../types/chamber';

/**
 * Act I — Power & Motion
 * Theme: Kinematics · Forces · Energy/Work · Momentum
 * 10 chambers, difficulty intro → advanced
 */
export const act1Chambers: Chamber[] = [
  // ── act1-01 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act1-01',
    actId: 'act1',
    order: 1,
    difficulty: 'intro',
    title: 'First Light',
    backstory:
      "ECHO: '{name}, you're awake. Good — the backup lighting rig in this corridor is stuck " +
      "on a timed relay from before the Fracture. I can see the numbers but I can't act on " +
      "them. You'll need to close the loop yourself. Corridor sensors show a maintenance drone " +
      "was moving at a constant velocity when it went dark.'",
    givens: [
      { label: 'Distance traveled', value: '18 m' },
      { label: 'Time elapsed', value: '6 s' },
    ],
    question: "What was the drone's constant velocity, in m/s?",
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 3, unit: 'm/s', tolerancePercent: 2 },
    hints: [
      'Constant velocity means no acceleration — one formula covers this whole problem.',
      'velocity = distance ÷ time',
    ],
    fieldNote:
      'For an object moving at constant velocity, speed is just distance divided by time ' +
      '(v = d/t). It\'s the simplest kinematics relationship there is, but it\'s the foundation ' +
      'everything else in this Act builds on — once acceleration gets involved, you\'re really ' +
      'just tracking how velocity itself changes over time.',
    successFlavor:
      "The corridor lights flicker, then hold steady. ECHO: 'Relay's closed. Nicely done, {name}.'",
    progressWeight: 2,
  },

  // ── act1-02 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act1-02',
    actId: 'act1',
    order: 2,
    difficulty: 'intro',
    title: 'Falling Panel',
    backstory:
      "ECHO: 'There's a loose ceiling panel in Bay 3. My structural sensors show it dropped " +
      "from a standstill and hit the deck 2.4 seconds later. I need to know how far it fell " +
      "so I can flag whether the bay struts are compromised. Assume standard station gravity.'",
    givens: [
      { label: 'Initial velocity', value: '0 m/s (dropped from rest)' },
      { label: 'Gravitational acceleration', value: '9.8 m/s²' },
      { label: 'Time of fall', value: '2.4 s' },
    ],
    question: 'How far did the panel fall, in metres?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 28.22, unit: 'm', tolerancePercent: 3 },
    hints: [
      'This is uniformly accelerated motion from rest — there\'s a kinematic equation that gives displacement directly.',
      'd = ½ × g × t² — plug in g = 9.8 and t = 2.4',
    ],
    fieldNote:
      'When an object accelerates uniformly from rest, the distance it covers is d = ½at². ' +
      'Notice how distance grows with the square of time — an object falling for twice as long ' +
      'covers four times the distance, not twice. This non-linear growth is why free-fall physics ' +
      'can feel counterintuitive at first.',
    successFlavor:
      "ECHO: 'That's a 28-metre drop. Bay 3 struts are intact — the panel mounting failed, not the structure. Good catch, {name}.'",
    progressWeight: 2,
  },

  // ── act1-03 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act1-03',
    actId: 'act1',
    order: 3,
    difficulty: 'intro',
    title: 'Accelerating Cart',
    backstory:
      "ECHO: 'A supply cart in the cargo ring was in motion when the Fracture hit. Logs show " +
      "it was moving at 2 m/s and then an automated booster fired, accelerating it at a " +
      "constant rate. I need its velocity 8 seconds after the boost started to recalculate " +
      "its current position in the ring.'",
    givens: [
      { label: 'Initial velocity', value: '2 m/s' },
      { label: 'Acceleration', value: '1.5 m/s²' },
      { label: 'Time of boost', value: '8 s' },
    ],
    question: "What was the cart's velocity 8 seconds after the boost started, in m/s?",
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 14, unit: 'm/s', tolerancePercent: 2 },
    hints: [
      'The cart starts with an existing velocity and gains more — use the standard velocity-time equation.',
      'v = u + at, where u is the initial velocity.',
    ],
    fieldNote:
      'The equation v = u + at is the backbone of kinematics: starting velocity plus the ' +
      'velocity gained from acceleration over time. It\'s linear — each second of constant ' +
      'acceleration adds the same fixed amount to velocity. Once you understand this, the ' +
      'more complex displacement equations follow naturally.',
    successFlavor:
      "ECHO: 'Position recalculated. The cart's in Corridor G, exactly where it should be. Nice work, {name}.'",
    progressWeight: 2,
  },

  // ── act1-04 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act1-04',
    actId: 'act1',
    order: 4,
    difficulty: 'core',
    title: 'Displacement Arc',
    backstory:
      "ECHO: 'We need to get an emergency patch kit from one end of the access tunnel to the " +
      "other. A pneumatic launch system can fire it, but I need to know where it'll land to " +
      "open the right airlock at the right moment. The launcher fires horizontally at 5 m/s, " +
      "and the kit accelerates forward at 3 m/s² along the tube for 4 seconds.'",
    givens: [
      { label: 'Initial velocity', value: '5 m/s' },
      { label: 'Acceleration', value: '3 m/s²' },
      { label: 'Time', value: '4 s' },
    ],
    question: 'How far does the patch kit travel along the tunnel, in metres?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 44, unit: 'm', tolerancePercent: 2 },
    hints: [
      'This needs both initial velocity and acceleration contributing to displacement — there\'s one equation that captures both.',
      's = ut + ½at². Plug in u=5, a=3, t=4.',
    ],
    fieldNote:
      's = ut + ½at² is the complete kinematic displacement formula. The first term (ut) accounts ' +
      'for how far the object would travel at its starting velocity alone; the second term (½at²) ' +
      'adds the extra distance gained from acceleration. Both terms contribute, and the squared time ' +
      'in the second term means acceleration becomes increasingly dominant over longer intervals.',
    successFlavor:
      "ECHO: 'Airlock D-7 prepped and open. Kit incoming — 44 metres, right on target. {name}, you're getting good at this.'",
    progressWeight: 4,
  },

  // ── act1-05 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act1-05',
    actId: 'act1',
    order: 5,
    difficulty: 'intro',
    title: 'Pressure Seal Force',
    backstory:
      "ECHO: 'The magnetic lock on the reactor anteroom has failed. A hydraulic ram can " +
      "force the door, but the ram's specs give thrust in terms of pressure — I need the " +
      "actual force it delivers so I know if it'll breach the seal. Mass of the ram piston " +
      "and door assembly is 120 kg, and the required acceleration to breach is 2.5 m/s².'",
    givens: [
      { label: 'Mass of piston + door assembly', value: '120 kg' },
      { label: 'Required acceleration', value: '2.5 m/s²' },
    ],
    question: 'What net force is required to breach the seal, in Newtons?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 300, unit: 'N', tolerancePercent: 2 },
    hints: [
      'Force, mass, and acceleration are the three players here. Newton has a law for exactly this.',
      'F = m × a',
    ],
    fieldNote:
      'Newton\'s Second Law — F = ma — states that the net force on an object equals its mass ' +
      'times its acceleration. It\'s powerful because it works in reverse too: if you know the force ' +
      'and want the acceleration, or know the acceleration and want the force, the same equation serves ' +
      'all three cases. It\'s the reason heavier objects require more force to achieve the same change in motion.',
    successFlavor:
      "ECHO: '300 Newtons. The ram can manage 340 at full pressure — we're clear. Anteroom accessible, {name}.'",
    progressWeight: 2,
  },

  // ── act1-06 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act1-06',
    actId: 'act1',
    order: 6,
    difficulty: 'core',
    title: 'Friction Hold',
    backstory:
      "ECHO: 'There's a heavy equipment crate that needs to be pushed across the lab floor " +
      "to reach a broken conduit panel. The crate has a mass of 80 kg, and the rubber floor " +
      "has a kinetic friction coefficient of 0.35. I need the friction force opposing motion " +
      "so the repair team can calibrate their push force correctly. Gravity is 9.8 m/s².'",
    givens: [
      { label: 'Mass of crate', value: '80 kg' },
      { label: 'Coefficient of kinetic friction (μₖ)', value: '0.35' },
      { label: 'Gravitational acceleration', value: '9.8 m/s²' },
    ],
    question: 'What is the friction force opposing the crate\'s motion, in Newtons?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 274.4, unit: 'N', tolerancePercent: 3 },
    hints: [
      'Friction force depends on the normal force — which on a flat surface equals the weight of the object.',
      'F_friction = μₖ × N, and N = m × g on a horizontal surface.',
    ],
    fieldNote:
      'Kinetic friction force is F = μₖ × N, where N (the normal force) is the force the surface ' +
      'pushes back against the object\'s weight. On flat ground, N = mg. The friction coefficient μₖ ' +
      'encodes how "grippy" the surface pair is — rubber on rubber is ~0.8, ice on steel is ~0.03. ' +
      'Friction doesn\'t depend on contact area or speed (for basic Coulomb friction), only on normal force and material.',
    successFlavor:
      "ECHO: '274 Newtons to slide it — the team needs about 280 to account for starting friction. Crate is moving. Conduit panel accessible, {name}.'",
    progressWeight: 4,
  },

  // ── act1-07 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act1-07',
    actId: 'act1',
    order: 7,
    difficulty: 'core',
    title: 'Lift Shaft Work',
    backstory:
      "ECHO: 'The primary elevator is offline, but the manual winch system is functional. " +
      "I need to verify the winch can provide enough work to raise a 200 kg equipment " +
      "module 15 metres straight up to Deck 4. The pull is vertical, so the force is " +
      "fully aligned with the displacement.'",
    givens: [
      { label: 'Mass of module', value: '200 kg' },
      { label: 'Height to raise', value: '15 m' },
      { label: 'Gravitational acceleration', value: '9.8 m/s²' },
    ],
    question: 'How much work must the winch do to raise the module, in Joules?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 29400, unit: 'J', tolerancePercent: 2 },
    hints: [
      'Work equals force times distance — but first you need the force required to lift the module.',
      'The force to lift equals weight (F = mg). Then W = F × d.',
    ],
    fieldNote:
      'Work is W = F × d × cos(θ), where θ is the angle between the force and the direction of motion. ' +
      'When force is directly aligned with displacement (θ = 0°, cos = 1), it simplifies to W = Fd. ' +
      'To lift an object against gravity, the force must equal the object\'s weight (mg), so W = mgh. ' +
      'Work measures the energy transferred — this 29,400 J of work becomes the module\'s gravitational potential energy.',
    successFlavor:
      "ECHO: 'Winch rated to 35,000 J continuous pull — we have margin. Module cleared for lift to Deck 4. Good thinking, {name}.'",
    progressWeight: 4,
  },

  // ── act1-08 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act1-08',
    actId: 'act1',
    order: 8,
    difficulty: 'core',
    title: 'Kinetic Energy Audit',
    backstory:
      "ECHO: 'A 2.5 kg inspection drone is flying through the maintenance corridor at " +
      "12 m/s when it clips a beam and I need to know how much kinetic energy is involved — " +
      "this determines whether the impact could damage the beam's structural integrity or " +
      "just bounce the drone. That same mass is going to come up again later, by the way.'",
    givens: [
      { label: 'Mass of drone', value: '2.5 kg' },
      { label: 'Velocity', value: '12 m/s' },
    ],
    question: "What is the drone's kinetic energy, in Joules?",
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 180, unit: 'J', tolerancePercent: 2 },
    hints: [
      'Kinetic energy depends on both mass and the square of speed.',
      'KE = ½mv²',
    ],
    fieldNote:
      'Kinetic energy (KE = ½mv²) is the energy of motion. The v² term is crucial — doubling speed ' +
      'quadruples KE. This is why vehicle collision physics feels so disproportionate at highway speeds. ' +
      'Note also that KE is always positive: it doesn\'t have direction, just magnitude. When a moving ' +
      'object is brought to rest, that KE goes somewhere — usually heat and deformation.',
    successFlavor:
      "ECHO: '180 Joules — enough to dent aluminum but not compromise a structural beam. Drone bounced, beam intact. Log that mass, {name} — we\'ll see it again.'",
    progressWeight: 4,
  },

  // ── act1-09 ── advanced ── numeric ──────────────────────────────────────────
  {
    id: 'act1-09',
    actId: 'act1',
    order: 9,
    difficulty: 'advanced',
    title: 'Conservation of Energy',
    backstory:
      "ECHO: 'A secondary power cell has rolled off a shelf and is sliding down an " +
      "inclined equipment rack, frictionless, from a height of 3.2 metres above the deck. " +
      "I need to know how fast it's moving when it reaches the bottom so I can calibrate " +
      "the catch mechanism. Mass of the cell is 0.8 kg.'",
    givens: [
      { label: 'Height of shelf', value: '3.2 m' },
      { label: 'Mass of power cell', value: '0.8 kg' },
      { label: 'Gravitational acceleration', value: '9.8 m/s²' },
      { label: 'Friction', value: 'None (frictionless surface)' },
    ],
    question: 'What is the speed of the power cell when it reaches the deck, in m/s? (Round to 2 decimal places)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 7.92, unit: 'm/s', tolerancePercent: 3 },
    hints: [
      'No friction means all the potential energy converts to kinetic energy — set PE = KE and solve for v.',
      'mgh = ½mv². The mass cancels. Solve for v: v = √(2gh).',
    ],
    fieldNote:
      'When there\'s no friction, total mechanical energy is conserved: PE + KE = constant. At the top, ' +
      'all energy is potential (PE = mgh, KE = 0). At the bottom, all is kinetic (KE = ½mv², PE = 0). ' +
      'Setting them equal and solving gives v = √(2gh) — notice the mass cancels completely. A feather and ' +
      'a bowling ball on a frictionless slide reach the same speed from the same height.',
    successFlavor:
      "ECHO: '7.92 m/s on impact. Catch mechanism armed. Cell secured — that's the power core for Corridor East, {name}. We're ahead of schedule.'",
    progressWeight: 6,
  },

  // ── act1-10 ── advanced ── numeric ──────────────────────────────────────────
  {
    id: 'act1-10',
    actId: 'act1',
    order: 10,
    difficulty: 'advanced',
    title: 'Momentum Transfer',
    backstory:
      "ECHO: 'Last one for this sector, {name}. Two service robots collided near the " +
      "junction: Robot A (mass 60 kg) was moving at 3 m/s east; Robot B (mass 40 kg) was " +
      "stationary. After impact they locked together and moved as one unit. I need the " +
      "velocity of the combined unit to update the navigation grid — and the object mass " +
      "we get from this will be referenced in Act V. Stay sharp.'",
    givens: [
      { label: 'Mass of Robot A', value: '60 kg' },
      { label: 'Velocity of Robot A', value: '3 m/s (east)' },
      { label: 'Mass of Robot B', value: '40 kg' },
      { label: 'Velocity of Robot B', value: '0 m/s (stationary)' },
    ],
    question: 'What is the velocity of the combined unit after the perfectly inelastic collision, in m/s?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 1.8, unit: 'm/s', tolerancePercent: 2 },
    hints: [
      'In a perfectly inelastic collision, the two objects stick together. Total momentum is conserved.',
      'p_before = p_after: (m₁v₁ + m₂v₂) = (m₁ + m₂)v_f. Solve for v_f.',
    ],
    fieldNote:
      'Momentum (p = mv) is conserved in all collisions when no external forces act. In a perfectly ' +
      'inelastic collision, the objects stick and move as one. While momentum is conserved, kinetic energy ' +
      'is not — some is lost to deformation, heat, sound. The ratio of final KE to initial KE here is ' +
      '60% — 40% was lost in the collision. Remember the combined mass (100 kg) — it appears again later.',
    successFlavor:
      "ECHO: '1.8 m/s combined. Navigation grid updated. And {name} — lock that 100 kg figure in your head. You\'ll need it in the final Act.'",
    progressWeight: 6,
  },
];
