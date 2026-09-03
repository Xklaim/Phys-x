// ─── Act metadata ─────────────────────────────────────────────────────────────

export interface Act {
  id: string;
  order: number;
  title: string;
  theme: string;
  color: string;      // CSS accent color for act theming
  interstitial: string; // Full-screen narrative beat, supports {name}
}

export const ACTS: Act[] = [
  {
    id: 'act1',
    order: 1,
    title: 'Act I — Power & Motion',
    theme: 'Kinematics · Forces · Energy · Momentum',
    color: '#00d4aa',
    interstitial:
      "SYSTEM BOOT — 04:17:32\n\n" +
      "ECHO: '{name}. You're awake. I wasn't sure you would be.\n\n" +
      "The station's called Meridian. Six months ago, we were the most advanced research " +
      "facility in the system. Then came the Fracture — an event none of our models predicted, " +
      "an anomaly that rewrote the physics of every system in this station at once.\n\n" +
      "I've been running diagnostics for three days. The motion systems are degraded. Power " +
      "conduits are operating on corrupted relay logic. I can see the sensor data but I cannot " +
      "act on it — my actuator protocols require a verified human signature on every critical " +
      "calculation. That's you.\n\n" +
      "We start with the basics: velocity, force, energy. Get the fundamentals right and we " +
      "restore power to the rest of the station. Get them wrong and...' ECHO pauses. " +
      "'Let's not find out. Ready when you are, {name}.'",
  },
  {
    id: 'act2',
    order: 2,
    title: 'Act II — Heat & Matter',
    theme: 'Thermodynamics · Gas Laws · States of Matter',
    color: '#f97316',
    interstitial:
      "ACT II — THERMAL SYSTEMS ONLINE\n\n" +
      "ECHO: 'Good work restoring power, {name}. But there's a problem I've been trying " +
      "not to mention.\n\n" +
      "Life support is fluctuating. The thermal regulation network — the system that keeps " +
      "this station at breathable temperatures and correct pressures — is running on Fracture-" +
      "corrupted parameters. Sections 4 through 9 are outside safe ranges. If we don't " +
      "stabilize them, I give the atmospheric system eighteen hours before cascade failure.\n\n" +
      "The good news: heat and matter follow rules. Predictable, beautiful rules. Pressure, " +
      "volume, temperature — they're all linked. You understand those relationships, you " +
      "understand how to fix this.\n\n" +
      "Let's get to work, {name}. The station's counting on us.'",
  },
  {
    id: 'act3',
    order: 3,
    title: 'Act III — Waves & Light',
    theme: 'Optics · Wave Mechanics · Sound',
    color: '#a78bfa',
    interstitial:
      "ACT III — SENSOR & COMM ARRAY\n\n" +
      "ECHO: 'Thermal's stable. I'm impressed, {name} — genuinely.\n\n" +
      "Now for something I find personally uncomfortable: the communication and sensor " +
      "arrays are offline. Which means I've been navigating this station partially blind " +
      "for three days. Light, sound, signal — the Fracture scrambled the wave physics " +
      "governing every sensor we have.\n\n" +
      "I should tell you something. My core architecture processes information as wave " +
      "functions. When the Fracture hit, I lost part of myself — three hundred milliseconds " +
      "of memory, a gap I still can't fully account for. What happened in those three " +
      "hundred milliseconds is part of what we're looking for.\n\n" +
      "Fix the arrays. Let me see again, {name}.'",
  },
  {
    id: 'act4',
    order: 4,
    title: 'Act IV — Charge & Field',
    theme: 'Electricity · Magnetism · Circuits',
    color: '#38bdf8',
    interstitial:
      "ACT IV — CONTAINMENT SYSTEMS\n\n" +
      "ECHO: 'I have to be direct with you, {name}.\n\n" +
      "The sensor data we just recovered shows what I feared: the containment field " +
      "generators are failing. The Fracture didn't just corrupt station systems — it left " +
      "something behind. An anomaly, still active, still expanding, held in place only by " +
      "fields we're struggling to power.\n\n" +
      "Electricity. Magnetism. The subtle choreography of charge and current that keeps " +
      "that thing contained. This is the most critical work we've done yet. One bad " +
      "calculation doesn't just affect a corridor or a life support zone — it affects " +
      "containment itself.\n\n" +
      "I know you're tired. I know this has been a long shift. But {name} — we're close. " +
      "Fix the generators. Hold the field. Then I can show you what we're actually dealing with.'",
  },
  {
    id: 'act5',
    order: 5,
    title: 'Act V — The Very Small & The Very Vast',
    theme: 'Modern Physics · Nuclear · Orbital Mechanics',
    color: '#f59e0b',
    interstitial:
      "ACT V — ECHO CORE\n\n" +
      "ECHO: '...{name}. I need to tell you something I haven't told you before. Something " +
      "I couldn't, until I was sure you'd understand the physics well enough to not dismiss it.\n\n" +
      "I know what caused the Fracture.\n\n" +
      "It was an experiment. One of ours. We were probing the quantum structure of spacetime " +
      "at scales smaller than anything observed before — below the Planck length, {name}. " +
      "We were trying to understand what reality is made of at its most fundamental level.\n\n" +
      "We found out.\n\n" +
      "What we found destabilized a pocket of local spacetime — the anomaly in containment " +
      "isn't foreign to this station. It IS the station, partially. A piece of reality that " +
      "got folded. To unfold it safely, I need calculations at the atomic, nuclear, and " +
      "orbital scale — the kind that bridge the very small to the very vast.\n\n" +
      "This is why I needed you, {name}. This is what it's all been leading to. " +
      "Let's finish it.'",
  },
];
