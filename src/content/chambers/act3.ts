import type { Chamber } from '../../types/chamber';

/**
 * Act III — Waves & Light
 * Theme: Optics · Wave Mechanics · Sound
 * 8 chambers, difficulty intro → advanced
 * Callback: act3-04 references act1-01 (same drone, same v=d/t relationship)
 */
export const act3Chambers: Chamber[] = [
  // ── act3-01 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act3-01',
    actId: 'act3',
    order: 1,
    difficulty: 'intro',
    title: 'Frequency Lock',
    backstory:
      "ECHO: 'The station communication array is broadcasting on a corrupted wavelength. " +
      "To lock onto the correct frequency, I need you to calculate it from the wave data. " +
      "The signal propagates at the speed of light, but it's a microwave band — much " +
      "shorter than visible light. Wavelength is 0.03 m; wave speed is 3 × 10⁸ m/s.'",
    givens: [
      { label: 'Wave speed (v)', value: '3 × 10⁸ m/s' },
      { label: 'Wavelength (λ)', value: '0.03 m' },
    ],
    question: 'What is the frequency of the signal, in Hz?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 1e10, unit: 'Hz', tolerancePercent: 2 },
    hints: [
      'Wave speed, frequency, and wavelength are linked by a fundamental wave equation.',
      'v = f × λ. Rearrange for f = v / λ.',
    ],
    fieldNote:
      'The wave equation v = fλ relates speed, frequency, and wavelength for any wave. For electromagnetic ' +
      'waves in a vacuum, speed is always c ≈ 3 × 10⁸ m/s, so frequency and wavelength are inversely ' +
      'proportional — shorter wavelength means higher frequency. Microwaves (cm-range wavelengths) sit in ' +
      'the 10¹⁰ Hz range; visible light is ~10¹⁴–10¹⁵ Hz.',
    successFlavor:
      "ECHO: '10 GHz — that's our station comm band. Array locked. I can hear the relay satellites again. Good work, {name}.'",
    progressWeight: 2,
  },

  // ── act3-02 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act3-02',
    actId: 'act3',
    order: 2,
    difficulty: 'intro',
    title: "Snell's Gate",
    backstory:
      "ECHO: 'One of the optical sensors uses a glass prism to direct laser calibration " +
      "beams. A beam hits the glass surface at 30° to the normal in air. I need the angle " +
      "of refraction inside the glass to verify the beam path hasn't shifted post-Fracture. " +
      "Refractive index of air: 1.0. Refractive index of the glass: 1.5.'",
    givens: [
      { label: 'Refractive index of air (n₁)', value: '1.0' },
      { label: 'Angle of incidence (θ₁)', value: '30°' },
      { label: 'Refractive index of glass (n₂)', value: '1.5' },
    ],
    question: 'What is the angle of refraction (θ₂) inside the glass, in degrees? (Round to 1 decimal place)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 19.5, unit: '°', tolerancePercent: 3 },
    hints: [
      'Refraction at an interface follows a law relating the two angles and the two refractive indices.',
      "Snell's Law: n₁ sin(θ₁) = n₂ sin(θ₂). Solve for θ₂ = arcsin(n₁ sin(θ₁) / n₂).",
    ],
    fieldNote:
      "Snell's Law (n₁sinθ₁ = n₂sinθ₂) describes how light bends when crossing between materials of different " +
      "refractive index. Light slows down in denser media (higher n) and bends toward the normal — that's why " +
      "a straw in a glass of water looks bent. The refractive index n = c/v, where v is the speed of light " +
      "in that medium. Glass (~n=1.5) slows light to about 67% of its vacuum speed.",
    successFlavor:
      "ECHO: '19.5° — the beam path is exactly where it should be. Optical sensor calibrated. The array is coming back together, {name}.'",
    progressWeight: 2,
  },

  // ── act3-03 ── intro ── numeric ─────────────────────────────────────────────
  {
    id: 'act3-03',
    actId: 'act3',
    order: 3,
    difficulty: 'intro',
    title: 'Mirror Array',
    backstory:
      "ECHO: 'One of the mirror segments in the sensor array has rotated by 15° from its " +
      "calibrated position. A laser beam hits the misaligned mirror at an angle of incidence " +
      "of 40°. I need to verify the angle of reflection to trace where the laser is now " +
      "pointing so we can avoid accidentally illuminating a sensor that can't handle the " +
      "intensity.'",
    givens: [
      { label: 'Angle of incidence', value: '40° (to the mirror normal)' },
    ],
    question: 'What is the angle of reflection from the mirror, in degrees?',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 40, unit: '°', tolerancePercent: 1 },
    hints: [
      'Reflection follows one of the simplest laws in all of optics.',
      'Angle of incidence = angle of reflection. Both measured from the normal to the surface.',
    ],
    fieldNote:
      'The Law of Reflection states that the angle of incidence equals the angle of reflection, both ' +
      'measured from the normal (a line perpendicular to the surface at the point of reflection). This ' +
      'holds perfectly for specular (mirror-like) reflection. Diffuse reflection from rough surfaces ' +
      'scatters light in many directions — same law, but applied to many microscopic surface angles simultaneously.',
    successFlavor:
      "ECHO: '40°, as expected. Beam is pointing harmlessly at the absorber panel. Mirror recalibrated in software. Nice and clean, {name}.'",
    progressWeight: 2,
  },

  // ── act3-04 ── core ── expression ── CALLBACK: act1-01 ─────────────────────
  {
    id: 'act3-04',
    actId: 'act3',
    order: 4,
    difficulty: 'core',
    title: "The Drone's Last Signal",
    backstory:
      "ECHO: 'I've been going through the archived logs, {name}. That maintenance drone " +
      "from the corridor — the one you clocked at a steady pace — sent one final status " +
      "ping before it went dark. I need the general relationship between how far a signal " +
      "travels and how long it takes, so I can work out when this ping was actually sent " +
      "versus when we received it. The signal moves at the speed of light through station comms.'",
    givens: [
      { label: 'Signal speed (c)', value: 'Constant (speed of light)' },
    ],
    question:
      'Write the general expression for the time delay (t) of a signal traveling distance (d) at speed (c).',
    inputType: 'expression',
    answer: {
      kind: 'expression',
      expression: 'd / c',
      variables: ['d', 'c'],
      sampleRanges: { d: [1, 1000], c: [1e6, 3e8] },
    },
    callbackRef: 'act1-01',
    hints: [
      'This is the same distance/time/speed relationship from the corridor drone — just rearranged.',
      'You\'re solving for time, not velocity: t = d / v, with v = c here.',
    ],
    fieldNote:
      'Signal delay works exactly like the velocity problem from Act I, just solved for a different ' +
      'variable: time = distance ÷ speed. It\'s a good reminder that in physics you often don\'t need ' +
      'a new formula for a new-sounding problem — you need to recognize it\'s the same relationship, ' +
      'rearranged for what you\'re actually looking for.',
    successFlavor:
      "ECHO runs the numbers instantly once it has the relationship. 'That's all I needed. Cross-referencing now — give me a moment, {name}.'",
    progressWeight: 4,
  },

  // ── act3-05 ── core ── numeric ──────────────────────────────────────────────
  {
    id: 'act3-05',
    actId: 'act3',
    order: 5,
    difficulty: 'core',
    title: 'Doppler Alert',
    backstory:
      "ECHO: 'An emergency beacon is broadcasting at 440 Hz, but the relay repeater is " +
      "moving away from us at 20 m/s as the station drifts. I need to know what frequency " +
      "we'll actually receive from the moving source, so I can recalibrate the receiver. " +
      "Speed of sound in the station air ducts: 340 m/s.'",
    givens: [
      { label: 'Source frequency (f₀)', value: '440 Hz' },
      { label: 'Speed of sound (v)', value: '340 m/s' },
      { label: 'Speed of source (v_s)', value: '20 m/s (moving away from observer)' },
      { label: 'Observer velocity', value: '0 m/s (stationary)' },
    ],
    question: 'What is the observed frequency of the beacon signal, in Hz? (Round to 1 decimal place)',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 415.6, unit: 'Hz', tolerancePercent: 2 },
    hints: [
      'A source moving away from you produces a lower observed frequency — the classic Doppler effect.',
      'f_observed = f₀ × v / (v + v_s) when the source moves away from a stationary observer.',
    ],
    fieldNote:
      'The Doppler effect describes how relative motion between a source and observer changes the observed ' +
      'frequency of waves. A source moving away stretches the wavefronts (lower frequency, lower pitch). ' +
      'The formula is f\' = f₀(v ± v_o)/(v ∓ v_s), where the signs depend on relative motion direction. ' +
      'Astronomers use this with light (redshift) to measure how fast galaxies are receding from us.',
    successFlavor:
      "ECHO: '415.6 Hz — receiver recalibrated. Beacon acquired. {name}, we just used the same physics that tells us the universe is expanding. Not bad for a Tuesday.'",
    progressWeight: 4,
  },

  // ── act3-06 ── core ── multiple_choice ─────────────────────────────────────
  {
    id: 'act3-06',
    actId: 'act3',
    order: 6,
    difficulty: 'core',
    title: 'Interference Pattern',
    backstory:
      "ECHO: 'The holographic display system is producing strange banding artifacts — " +
      "bright and dark stripes where the display should be uniform. My optical analysis " +
      "indicates this is a wave interference phenomenon. I need you to identify the correct " +
      "condition for the bright (constructive) bands to confirm what's causing them.'",
    question:
      'Bright fringes in a double-slit experiment occur when:',
    inputType: 'multiple_choice',
    answer: {
      kind: 'multiple_choice',
      correctKey: 'c',
      options: [
        { key: 'a', label: 'The path difference between the two slits is exactly half a wavelength (λ/2).' },
        { key: 'b', label: 'The two waves from each slit arrive exactly 90° out of phase.' },
        { key: 'c', label: 'The path difference between the two slits is a whole number of wavelengths (nλ).' },
        { key: 'd', label: 'The slits are separated by exactly one wavelength.' },
      ],
    },
    hints: [
      'Constructive interference requires the waves to arrive in phase — peaks aligning with peaks.',
      'For waves to arrive in phase, their path lengths must differ by exactly a whole number of wavelengths.',
    ],
    fieldNote:
      'Constructive interference (bright fringes) occurs when the path difference Δd = nλ (n = 0, 1, 2...), ' +
      'meaning the waves arrive in phase and their amplitudes add. Destructive interference (dark fringes) ' +
      'occurs when Δd = (n + ½)λ — waves arrive exactly half a wavelength out of step and cancel. This ' +
      'wave behavior is the definitive proof that light has wave properties.',
    successFlavor:
      "ECHO: 'Constructive interference — path difference is an integer multiple of wavelength. Adjusting the display emitter spacing now. Artifacts cleared, {name}.'",
    progressWeight: 4,
  },

  // ── act3-07 ── advanced ── numeric ──────────────────────────────────────────
  {
    id: 'act3-07',
    actId: 'act3',
    order: 7,
    difficulty: 'advanced',
    title: 'Lens Focus',
    backstory:
      "ECHO: 'One of the science lab's optical instruments uses a converging lens with a " +
      "focal length of 0.20 m. An object is placed 0.50 m from the lens. I need to know " +
      "where the image forms on the other side of the lens — a repair technician needs to " +
      "position the image sensor at exactly that distance for the instrument to function.'",
    givens: [
      { label: 'Focal length (f)', value: '0.20 m' },
      { label: 'Object distance (d_o)', value: '0.50 m' },
    ],
    question: 'Where does the image form? Give the image distance (d_i), in metres.',
    inputType: 'numeric',
    answer: { kind: 'numeric', value: 0.333, unit: 'm', tolerancePercent: 3 },
    hints: [
      'The thin lens equation links focal length, object distance, and image distance.',
      '1/f = 1/d_o + 1/d_i. Rearrange for 1/d_i = 1/f - 1/d_o, then take the reciprocal.',
    ],
    fieldNote:
      'The thin lens equation (1/f = 1/d_o + 1/d_i) is derived from Snell\'s Law applied to the geometry ' +
      'of a curved surface. A converging lens focuses parallel rays to a focal point. Objects beyond f produce ' +
      'real images on the far side; objects inside f produce virtual images (like a magnifying glass). ' +
      'Magnification is m = -d_i/d_o — the negative sign means real images are inverted.',
    successFlavor:
      "ECHO: '33.3 cm from the lens. Sensor repositioned. Instrument back in calibration. {name}, that's the array fully operational.'",
    progressWeight: 6,
  },

  // ── act3-08 ── advanced ── expression ──────────────────────────────────────
  {
    id: 'act3-08',
    actId: 'act3',
    order: 8,
    difficulty: 'advanced',
    title: 'Diffraction Limit',
    backstory:
      "ECHO: 'I need a general expression for the minimum angular resolution our telescope " +
      "sensor can achieve — its diffraction limit. This determines the finest detail the " +
      "sensor can resolve, and I need the formula in terms of the wavelength (λ) of light " +
      "used and the diameter (D) of the aperture. Use the standard Rayleigh criterion.'",
    givens: [
      { label: 'Wavelength', value: 'λ (variable)' },
      { label: 'Aperture diameter', value: 'D (variable)' },
      { label: 'Rayleigh constant', value: '1.22 (dimensionless prefactor)' },
    ],
    question: 'Write the expression for the minimum angular resolution θ (in radians) using the Rayleigh criterion.',
    inputType: 'expression',
    answer: {
      kind: 'expression',
      expression: '1.22 * lambda / D',
      variables: ['lambda', 'D'],
      sampleRanges: { lambda: [400e-9, 700e-9], D: [0.01, 10] },
    },
    hints: [
      'The Rayleigh criterion gives the smallest resolvable angle as a ratio of wavelength to aperture size, with a small prefactor.',
      'θ_min = 1.22 × λ / D',
    ],
    fieldNote:
      'The Rayleigh criterion (θ_min = 1.22λ/D) sets the fundamental resolution limit for any aperture-based ' +
      'optical system — telescope, microscope, camera. Larger apertures and shorter wavelengths give finer ' +
      'resolution. This is why radio telescopes must be enormous (long wavelengths) and why electron ' +
      'microscopes (short de Broglie wavelengths) can image individual atoms.',
    successFlavor:
      "ECHO: 'Rayleigh criterion confirmed. Sensor resolution spec updated. {name}, we can now resolve objects at the station\'s design limit. The array is complete.'",
    progressWeight: 6,
  },
];
