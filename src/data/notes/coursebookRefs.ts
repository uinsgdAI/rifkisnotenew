import type { CoursebookRef } from '../../types/syllabus';

export interface CoursebookAlignment {
  ref: CoursebookRef;
  tip: string;
  fastForward: string;
}

const UNIT_TITLES: Record<number, string> = {
  1: 'Unit 1: Number',
  2: 'Unit 2: Algebra, Geometry & Probability',
  3: 'Unit 3: Sequences, Lines & Statistics',
  4: 'Unit 4: Measurement, Equations & Trigonometry',
  5: 'Unit 5: Money, Graphs, Symmetry & Data',
  6: 'Unit 6: Ratio, Functions, Vectors & Probability',
};

const CHAPTER_TITLES: Record<number, string> = {
  1: 'Reviewing number concepts',
  2: 'Making sense of algebra',
  3: 'Lines, angles and shapes',
  4: 'Collecting, organising and displaying data',
  5: 'Fractions and standard form',
  6: 'Equations and rearranging formulae',
  7: 'Perimeter, area and volume',
  8: 'Introduction to probability',
  9: 'Sequences and sets',
  10: 'Straight lines and quadratic equations',
  11: "Pythagoras' theorem and similar shapes",
  12: 'Averages and measures of spread',
  13: 'Understanding measurement',
  14: 'Further solving of equations and inequalities',
  15: 'Scale drawings, bearings and trigonometry',
  16: 'Scatter diagrams and correlation',
  17: 'Managing money',
  18: 'Curved graphs',
  19: 'Symmetry',
  20: 'Histograms and frequency distribution diagrams',
  21: 'Ratio, rate and proportion',
  22: 'More equations, formulae and functions',
  23: 'Vectors and transformations',
  24: 'Probability using tree diagrams and Venn diagrams',
};

function ref(
  unit: number,
  chapter: number,
  sections: string,
  editionNote?: string
): CoursebookRef {
  return {
    unit,
    unitTitle: UNIT_TITLES[unit],
    chapter,
    chapterTitle: CHAPTER_TITLES[chapter],
    sections,
    ...(editionNote ? { editionNote } : {}),
  };
}

export const COURSEBOOK_ALIGNMENT_0580: Record<string, CoursebookAlignment> = {
  // Chapter 1 — Number
  '1.1': {
    ref: ref(1, 1, '1.1 Different types of numbers, 1.2 Multiples & factors, 1.3 Prime numbers (pp. 2–9); 9.2 Rational & irrational numbers'),
    tip: 'Remember that 1 has only one factor so it is NOT prime, and 0 is classified as an integer rather than a natural (counting) number.',
    fastForward: 'Prime factors and types of numbers underpin simplifying fractions (Ch. 5), rational/irrational proofs (Ch. 9), and surds.',
  },
  '1.2': {
    ref: ref(3, 9, '9.3 Sets (pp. 185–197)'),
    tip: 'Always populate Venn diagrams from the innermost intersection outward, checking that every region inside the rectangle sums to n(ℰ).',
    fastForward: 'Venn diagrams return in Unit 6 (Ch. 24.3–24.4) to calculate combined and conditional probabilities directly from counted regions.',
  },
  '1.3': {
    ref: ref(1, 1, '1.4 Powers and roots (pp. 10–12)'),
    tip: 'Know perfect squares up to 15² = 225 and cubes up to 10³ = 1000 by sight; remember a negative number still has a real negative cube root.',
    fastForward: 'Square roots link directly into Pythagoras’ theorem (Ch. 11.1), indices (Ch. 2.5), and exact surds.',
  },
  '1.4': {
    ref: ref(2, 5, '5.1 Equivalent fractions, 5.2 Operations on fractions, 5.3 Percentages (pp. 103–113); 9.2 Recurring decimals'),
    tip: 'For recurring decimals (Extended), multiply by powers of 10 so both equations share the exact same infinite tail before subtracting.',
    fastForward: 'Fraction equivalence and percentages extend directly into probability calculations (Ch. 8) and managing money (Ch. 17).',
  },
  '1.5': {
    ref: ref(1, 1, '1.1 Using symbols to link numbers, 1.5 Working with directed numbers (pp. 3, 13–14); 5.1 Fractions'),
    tip: 'Convert mixed fractions, decimals, and percentages into aligned decimals to compare sizes safely, then write your final list in the original given formats.',
    fastForward: 'Inequality symbols (<, >, ≤, ≥) reappear when solving linear inequalities and shading regions in a plane (Ch. 14.2–14.3).',
  },
  '1.6': {
    ref: ref(1, 1, '1.5 Working with directed numbers, 1.6 Order of operations (pp. 13–17); 5.2 Operations on fractions'),
    tip: 'Follow BODMAS strictly: work from the innermost grouping symbols outward—treating fraction bars and radical roots as hidden brackets.',
    fastForward: 'You will apply these exact order-of-operation rules to indices and standard form in Ch. 5 and algebraic substitution in Ch. 2.',
  },
  '1.7': {
    ref: ref(1, 2, '2.5 Indices (pp. 35–44); 5.4 Standard form numerical powers'),
    tip: 'For negative fractional indices like 27^(-2/3), flip for the negative sign, take the cube root first to keep numbers small, then raise to the power.',
    fastForward: 'The laws of indices transfer directly to algebraic terms in Ch. 2 and standard form operations in Ch. 5.4.',
  },
  '1.8': {
    ref: ref(2, 5, '5.4 Standard form, 5.5 Your calculator and standard form (pp. 114–119)'),
    tip: 'Check that A in A × 10ⁿ always satisfies 1 ≤ A < 10; never write the calculator display literally as 3.2^5—always write 3.2 × 10⁵.',
    fastForward: 'Standard form is used throughout science links and metric unit conversions in Unit 4 (Ch. 13.1).',
  },
  '1.9': {
    ref: ref(1, 1, '1.7 Rounding numbers (pp. 18–19); Ch. 5: 5.6 Estimation (pp. 119–122)'),
    tip: 'The first significant figure is the first non-zero digit reading left to right; all zeros after it count, and for estimation always round to 1 s.f. BEFORE calculating.',
    fastForward: 'Upper and lower bounds in Unit 4 (Ch. 13.3) analyse the exact error interval created whenever a measurement is rounded.',
  },
  '1.10': {
    ref: ref(4, 13, '13.3 Upper and lower bounds (pp. 289–293)'),
    tip: 'Halve the rounding unit to find ± half-unit bounds; to maximise A/B or A − B, pair upper bound on A with lower bound on B.',
    fastForward: 'Error bounds combine with area, volume, and speed formulas across Units 5 and 6 to test worst-case physical limits.',
  },
  '1.11': {
    ref: ref(6, 21, '21.1 Working with ratio, 21.2 Ratio and scale, 21.5 Proportion (pp. 507–514, 525–527)'),
    tip: 'Match units first before simplifying a ratio, and check whether a given dollar amount represents the total, one share, or the difference between shares.',
    fastForward: 'Linear ratios expand to map areas (1 : k²) in similarity (Ch. 11.3) and algebraic direct/inverse variation (Ch. 21.6).',
  },
  '1.12': {
    ref: ref(6, 21, '21.3 Rates (pp. 515–516)'),
    tip: 'Never average two speeds directly—find Total Distance and Total Time separately first, converting minutes cleanly by dividing by 60.',
    fastForward: 'Rates connect directly to gradients of distance–time and speed–time kinematic graphs in Ch. 21.4.',
  },
  '1.13': {
    ref: ref(2, 5, '5.3 Percentages (pp. 109–113); Unit 5 Ch. 17: 17.2–17.3 Managing money'),
    tip: 'Use decimal multipliers (e.g. 1.15 or 0.85); to reverse a percentage change, always divide the new amount by the multiplier.',
    fastForward: 'Repeated multipliers drive compound interest, depreciation, and exponential growth models in Ch. 17.2.',
  },
  '1.14': {
    ref: ref(1, 1, '1.6 Using a calculator efficiently (pp. 17–18); Ch. 5: 5.5 Calculator & standard form (p. 118)'),
    tip: 'Wrap multi-term numerators, denominators, and negative bases in brackets when entering expressions, and confirm Degree mode (D) before trigonometry.',
    fastForward: 'Keep full unrounded values stored in calculator memory during multi-step trigonometry (Ch. 15) and bounds (Ch. 13) questions.',
  },
  '1.15': {
    ref: ref(4, 13, '13.2 Time (pp. 285–288)'),
    tip: 'Do not read 2.30 hours as 2 h 30 min—multiply the decimal part by 60 (0.30 × 60 = 18 min), and bridge through whole hours for durations.',
    fastForward: 'Converting minutes to decimal hours is essential whenever computing speed in km/h from timetables (Ch. 21.3–21.4).',
  },
  '1.16': {
    ref: ref(4, 13, '13.5 More money (pp. 297–300); Unit 5 Ch. 17: Managing money (17.1–17.3, pp. 394–414)'),
    tip: 'Write currency answers to 2 decimal places unless told otherwise; check whether converting from the 1-unit side (multiply) or back to it (divide).',
    fastForward: 'Bank interest, profit/loss, and currency graphs connect directly to Ch. 13.4 conversion graphs and Ch. 17.2 compound interest.',
  },
  '1.17': {
    ref: ref(5, 17, '17.2 Borrowing and investing money — compound growth & depreciation (pp. 401–408)'),
    tip: 'For exponential decay or depreciation at r%, multiply repeatedly by (1 − r/100)ⁿ rather than subtracting a constant percentage each year.',
    fastForward: 'Exponential curves y = aˣ appear alongside curved graphs in Ch. 18.5 for visualising rapid growth and half-life decay.',
  },
  '1.18': {
    ref: ref(3, 9, '9.2 Rational and irrational numbers (pp. 182–184)', 'Includes 2025–2027 Extended Surds supplement (simplifying & rationalising denominators).'),
    tip: 'Only combine like surds (e.g. 2√3 + √3); clear binomial surd denominators by multiplying top and bottom by the conjugate p − q√r.',
    fastForward: 'Exact surd arithmetic helps keep exact answers in Pythagoras’ theorem (Ch. 11.1) and non-calculator trigonometry.',
  },

  // Chapter 2 — Algebra and Graphs
  '2.1': {
    ref: ref(1, 2, '2.1 Using letters to represent unknown values, 2.2 Substitution (pp. 24–28)'),
    tip: 'Always wrap negative substituted values inside brackets before evaluating—for example, when x = −3, x² = (−3)² = +9, not −9.',
    fastForward: 'Confident substitution prepares you for evaluating formulas (Ch. 6.4) and plotting curved tables of values (Ch. 18).',
  },
  '2.2': {
    ref: ref(1, 2, '2.3–2.4 Simplifying & brackets (pp. 29–34); Ch. 6: 6.1, 6.3; Ch. 10: 10.2; Ch. 14: 14.7'),
    tip: 'Multiply every term inside a bracket by the sign in front, and for quadratic factorisation always check for a common numeric/algebraic factor first.',
    fastForward: 'Factorising quadratics and difference of two squares is essential for simplifying algebraic fractions in Ch. 14.8.',
  },
  '2.3': {
    ref: ref(4, 14, '14.8 Algebraic fractions (pp. 326–331)'),
    tip: 'Never cancel individual terms across a + or − sign; factorise numerator and denominator completely before cancelling common brackets.',
    fastForward: 'Equating combined algebraic fractions leads to quadratic equations in Ch. 14.6–14.8 and problem-solving in Ch. 22.1.',
  },
  '2.4': {
    ref: ref(1, 2, '2.5 Indices (pp. 35–44)'),
    tip: 'When raising a bracketed product like (3x²y)³ to a power, remember to raise the numerical coefficient too (3³ = 27).',
    fastForward: 'Algebraic index laws combine with fractional powers in calculus differentiation (Ch. 18.7) and proportional variation.',
  },
  '2.5': {
    ref: ref(2, 6, '6.2 Solving linear equations, 6.4 Rearranging formulae (pp. 125–132); Ch. 14: 14.1, 14.5–14.6; Ch. 22: 22.1–22.2'),
    tip: 'Always inspect coefficients before choosing between completing the square, factorising, or the quadratic formula—and keep ± with square roots.',
    fastForward: 'Solving quadratic and simultaneous equations lets you locate curve intersections algebraically in Ch. 18.4.',
  },
  '2.6': {
    ref: ref(4, 14, '14.2 Linear inequalities, 14.3 Regions in a plane, 14.4 Linear programming (pp. 310–320)'),
    tip: 'Flip the inequality sign whenever you multiply or divide both sides by a negative number, and use dashed lines for strict (<, >) boundaries.',
    fastForward: 'Feasible regions on coordinate axes connect directly to straight-line equations in Ch. 10.1.',
  },
  '2.7': {
    ref: ref(3, 9, '9.1 Sequences (pp. 174–181)'),
    tip: 'Check second differences immediately if first differences are not constant: a constant second difference of 2a means the n² coefficient is a.',
    fastForward: 'Linear nth terms connect to linear functions (Ch. 10.1), while geometric sequences share exponential structure with Ch. 17.2.',
  },
  '2.8': {
    ref: ref(6, 21, '21.6 Direct and inverse proportion in algebraic terms (pp. 528–531)'),
    tip: 'Translate the proportional statement into an equation with constant k first (y = kxⁿ or y = k/xⁿ), solve for k using the given pair, then rewrite.',
    fastForward: 'Inverse proportion y = k/x produces the rectangular hyperbola studied geometrically in Ch. 18.2.',
  },
  '2.9': {
    ref: ref(4, 13, '13.4 Conversion graphs (pp. 294–296); Unit 6 Ch. 21: 21.4 Kinematic graphs (pp. 517–524)'),
    tip: 'In speed–time graphs, the gradient gives acceleration while the area under the graph (trapezia and triangles) equals distance travelled.',
    fastForward: 'Estimating instantaneous gradients on curved distance–time graphs leads directly to tangents and derived functions in Ch. 18.6–18.7.',
  },
  '2.10': {
    ref: ref(5, 18, '18.1–18.5 Drawing quadratic, reciprocal & non-linear graphs (pp. 416–440)'),
    tip: 'Plot reciprocal curves carefully either side of x = 0—never connect branches across the vertical asymptote where division by zero occurs.',
    fastForward: 'Solving f(x) = g(x) by adding a straight line onto an existing curve saves re-plotting in Ch. 18.3–18.4.',
  },
  '2.11': {
    ref: ref(5, 18, '18.1–18.5 Key features of parabolas, cubics, reciprocals & exponential curves (pp. 416–440)'),
    tip: 'Label axes intercepts, turning points, and asymptotes clearly on sketches; factor form gives x-intercepts while completed square form gives the vertex.',
    fastForward: 'Differentiation (Ch. 18.7) finds exact coordinates of turning points without plotting tables of values.',
  },
  '2.12': {
    ref: ref(5, 18, '18.6 Finding the gradient of a curve, 18.7 Derived functions (pp. 441–452)'),
    tip: 'Set dy/dx = 0 to locate stationary points, then test values of dy/dx slightly left and right (or check d²y/dx²) to distinguish maxima from minima.',
    fastForward: 'Stationary points apply to optimisation problems in mensuration (Ch. 7) and motion analysis in Ch. 21.4.',
  },
  '2.13': {
    ref: ref(6, 22, '22.3 Functions and function notation (pp. 546–553)'),
    tip: 'Work from the inside out on composite functions fg(x) = f(g(x)), and remember that domain restrictions ban zero denominators or negative square roots.',
    fastForward: 'The graph of an inverse function f⁻¹(x) is the geometric reflection of y = f(x) across the line y = x (Ch. 23.1).',
  },

  // Chapter 3 — Coordinate Geometry
  '3.1': {
    ref: ref(3, 10, '10.1 Straight lines — reading & plotting Cartesian coordinates (pp. 200–203)'),
    tip: 'Read horizontal x-coordinate first and vertical y-coordinate second ("along the corridor, up/down the stairs"); points on the x-axis have y = 0.',
    fastForward: 'Coordinates are the foundation for straight-line equations (Ch. 10.1), scatter diagrams (Ch. 16), and plane transformations (Ch. 23).',
  },
  '3.2': {
    ref: ref(3, 10, '10.1 Drawing straight-line graphs from equations (pp. 203–207)'),
    tip: 'Always plot at least three coordinates (not just two) so any arithmetic slip stands out immediately when a point falls off the line.',
    fastForward: 'Simultaneous linear equations can be solved geometrically by reading the intersection point of two straight lines (Ch. 14.1).',
  },
  '3.3': {
    ref: ref(3, 10, '10.1 Gradient of a straight line (pp. 201–205)'),
    tip: 'Keep pairs in matching order in (y₂ − y₁)/(x₂ − x₁); double-check visually that uphill lines have positive gradient and downhill lines negative.',
    fastForward: 'Constant line gradient generalises to the tangent gradient at a point on any curve in Ch. 18.6.',
  },
  '3.4': {
    ref: ref(3, 10, '10.1 Straight lines — midpoint & segment length (pp. 206–210); Ch. 11: 11.1 Pythagoras’ theorem'),
    tip: 'Midpoint averages x and y separately ((x₁+x₂)/2, (y₁+y₂)/2), whereas length applies Pythagoras’ theorem to horizontal and vertical differences.',
    fastForward: 'Midpoint and perpendicular gradient combine to construct the exact equation of a perpendicular bisector.',
  },
  '3.5': {
    ref: ref(3, 10, '10.1 Finding the equation of a straight line y = mx + c (pp. 207–215)'),
    tip: 'For ax + by = c, rearrange to make y the subject before reading gradient m and intercept c—do not read off the x-coefficient un-rearranged.',
    fastForward: 'Rearranging straight-line equations directly supports linear regions and inequalities in Ch. 14.3.',
  },
  '3.6': {
    ref: ref(3, 10, '10.1 Parallel lines (pp. 210–212)'),
    tip: 'Parallel lines share the identical gradient m; substitute the known point into y = mx + c to solve for the new y-intercept.',
    fastForward: 'Parallel direction vectors in Ch. 23.2 share the same scalar-multiple property as parallel line gradients.',
  },
  '3.7': {
    ref: ref(3, 10, '10.1 Perpendicular lines (pp. 212–215)'),
    tip: 'Take the negative reciprocal of the gradient (m₁ × m₂ = −1); for a perpendicular bisector, use BOTH the midpoint and the perpendicular gradient.',
    fastForward: 'Perpendicularity tests also verify right-angled triangles and radius-tangent geometry in Ch. 19.3.',
  },

  // Chapter 4 — Geometry
  '4.1': {
    ref: ref(1, 3, '3.1–3.5 Lines, triangles, quadrilaterals & circles (pp. 46–64); Ch. 11: 11.4 Congruence (pp. 244–252)'),
    tip: 'State exact geometrical terms (acute, obtuse, reflex, alternate, corresponding, co-interior, chord, tangent) when giving reasons in proofs.',
    fastForward: 'Congruence criteria (SSS, SAS, ASA, RHS) prepare you for similarity proofs in Ch. 11.2 and circle proofs in Ch. 19.',
  },
  '4.2': {
    ref: ref(1, 3, '3.6 Construction (pp. 65–68)'),
    tip: 'Never rub out compass construction arcs—leaving clean, crisp arcs visible on paper is how examiners award construction marks.',
    fastForward: 'Perpendicular bisectors and angle bisectors also form the geometric basis of loci and triangle circumcentres/incentres.',
  },
  '4.3': {
    ref: ref(4, 15, '15.1 Scale drawings, 15.2 Bearings (pp. 336–339)'),
    tip: 'Every bearing has three properties: measured from North, clockwise, and written as 3 digits (e.g. 042°); back bearing differs by ±180°.',
    fastForward: 'Non-right-angled bearing paths combine with the Sine and Cosine rules in Ch. 15.6.',
  },
  '4.4': {
    ref: ref(3, 11, '11.2 Understanding similar triangles, 11.3 Understanding similar shapes (pp. 231–243)'),
    tip: 'If the linear scale factor is k, then areas scale by k² and volumes scale by k³—remember to take cube roots first when moving from volume to length.',
    fastForward: 'Similar triangles connect directly to the intersecting chord theorems in Ch. 19 and trigonometric ratios in Ch. 15.',
  },
  '4.5': {
    ref: ref(5, 19, '19.1 Symmetry in 2D, 19.2 Symmetry in 3D, 19.3 Symmetry properties of circles (pp. 461–469)'),
    tip: 'Check both reflection lines and rotational order carefully: a parallelogram has 0 lines of symmetry and rotational symmetry of order 2.',
    fastForward: 'Circle symmetry properties (equal chords equidistant from centre, perpendicular bisector of chord) launch circle theorems in Ch. 19.4.',
  },
  '4.6': {
    ref: ref(1, 3, '3.1 Lines and angles, 3.2 Triangles, 3.3 Quadrilaterals, 3.4 Polygons (pp. 46–63)'),
    tip: 'For regular polygons, finding the exterior angle first (360° ÷ n) and subtracting from 180° is faster and far less error-prone than interior sums.',
    fastForward: 'Angle-chasing skills carry directly into circle angle theorems in Ch. 19.4 and triangle trigonometry in Ch. 15.',
  },
  '4.7': {
    ref: ref(5, 19, '19.3 Symmetry properties of circles, 19.4 Angle relationships in circles (pp. 467–482)'),
    tip: 'Whenever a problem mentions "tangent", immediately draw in the 90° angle with the radius; verify that a cyclic quadrilateral’s 4 vertices all touch the circumference.',
    fastForward: 'Circle theorems integrate with Pythagoras’ theorem (Ch. 11.1) and arc/sector calculations (Ch. 7.1).',
  },
  '4.8': {
    ref: ref(5, 19, '19.4 Alternate segment theorem & further circle angle relationships (pp. 475–482)'),
    tip: 'For the alternate segment theorem, check which chord forms the tangent angle—the equal inscribed angle is the one subtended by that same chord in the opposite segment.',
    fastForward: 'Combined circle-and-tangent geometry problems regularly link with trigonometry (SOH CAH TOA and Sine/Cosine rules) on Paper 4.',
  },

  // Chapter 5 — Mensuration
  '5.1': {
    ref: ref(4, 13, '13.1 Understanding units (pp. 283–285)'),
    tip: 'To convert area units, SQUARE the linear conversion (1 m² = 100² cm² = 10 000 cm²); to convert volume units, CUBE it (1 m³ = 10⁶ cm³ = 1000 litres).',
    fastForward: 'Careful metric conversion prevents unit-mismatch errors inside density and compound rate formulas in Ch. 21.3.',
  },
  '5.2': {
    ref: ref(2, 7, '7.1 Perimeter and area in two dimensions (pp. 135–147)'),
    tip: 'Always use the perpendicular height—never the slanted side—when finding areas of parallelograms, triangles, and trapezia.',
    fastForward: '2D polygon areas form the cross-section base needed to calculate prism volumes in Ch. 7.3.',
  },
  '5.3': {
    ref: ref(1, 3, '3.5 Circles (p. 64); Unit 2 Ch. 7: 7.1 Arc length & sector area (pp. 142–147)'),
    tip: 'Add the two straight radii (+ 2r) when finding the perimeter of a sector—arc length θ/360 × 2πr only measures the curved edge.',
    fastForward: 'Sector area and arc length turn directly into the curved surface area (πrl) when folded into a cone in Ch. 7.3.',
  },
  '5.4': {
    ref: ref(2, 7, '7.2 Three-dimensional objects, 7.3 Surface areas and volumes of solids (pp. 148–159)'),
    tip: 'Distinguish vertical cone height h (used in volume 1/3 πr²h) from slant height l (used in curved surface area πrl); link them via l² = r² + h².',
    fastForward: 'Cones, spheres, and pyramids connect with Pythagoras’ theorem (Ch. 11.1) and 3D similarity scale factors (k³) in Ch. 11.3.',
  },
  '5.5': {
    ref: ref(2, 7, '7.1 & 7.3 Compound shapes, frustums & hollowed solids (pp. 144–159)'),
    tip: 'Sketch each hidden or shared face separately: when joining a hemisphere onto a cylinder, the circular base between them is internal and NOT part of outer surface area.',
    fastForward: 'Volume-conservation ("melted and recast") problems become algebraic equations to solve in Ch. 22.1.',
  },

  // Chapter 6 — Trigonometry
  '6.1': {
    ref: ref(3, 11, "11.1 Pythagoras' theorem (pp. 227–230)"),
    tip: 'Identify the hypotenuse (longest side, opposite the 90° angle) first: add squares to find the hypotenuse, subtract squares to find a shorter side.',
    fastForward: 'Pythagoras’ theorem extends directly into coordinate distance (Ch. 10.1), 3D diagonals (Ch. 15.8), and trig identities (Ch. 15).',
  },
  '6.2': {
    ref: ref(4, 15, '15.3 Understanding tangent, cosine and sine ratios, 15.4 Solving problems using trigonometry (pp. 340–359)'),
    tip: 'Angle of elevation and angle of depression are BOTH measured from the horizontal—never from the vertical wall or mast.',
    fastForward: 'Right-angled trigonometry lays the groundwork for trig graphs beyond 90° (Ch. 15.5) and 3D angles (Ch. 15.8).',
  },
  '6.3': {
    ref: ref(4, 15, '15.3–15.4 Right-angled triangles (pp. 340–359)', 'Includes 2025–2027 Extended non-calculator exact trigonometric values (0°, 30°, 45°, 60°, 90°).'),
    tip: 'Sketch the 1–1–√2 isosceles triangle (45°) and the 2–2–2 equilateral triangle halved into 1–√3–2 (30° and 60°) to derive any exact trig value on Paper 2.',
    fastForward: 'Exact trig values pair directly with exact surds (1.18) and non-right-angled Sine/Cosine rules on non-calculator questions.',
  },
  '6.4': {
    ref: ref(4, 15, '15.5 Sines, cosines and tangents of angles more than 90° (pp. 360–363)'),
    tip: 'Because sin θ = sin(180° − θ), an inverse sine equation sin x = k in 0° ≤ x ≤ 360° has TWO solutions: check symmetry on the sine wave!',
    fastForward: 'Angle symmetry for obtuse angles (> 90°) explains the ambiguous case when applying the Sine Rule in Ch. 15.6.',
  },
  '6.5': {
    ref: ref(4, 15, '15.6 The sine and cosine rules, 15.7 Area of a triangle (pp. 364–374)'),
    tip: 'Follow BODMAS strictly in the Cosine Rule a² = b² + c² − 2bc cos A: evaluate 2bc cos A as one product before subtracting from b² + c².',
    fastForward: 'Sine rule, Cosine rule, and 1/2 ab sin C are central tools in 3D trigonometry and bearing problems (Ch. 15.8).',
  },
  '6.6': {
    ref: ref(4, 15, '15.8 Trigonometry in three dimensions (pp. 375–382)'),
    tip: 'To find the angle between a slanted line and a base plane, drop a perpendicular from the top vertex to the base and extract that right-angled 2D triangle.',
    fastForward: 'Spatial 3D reasoning carries over into 3D symmetry (Ch. 19.2) and volume calculations (Ch. 7.3).',
  },

  // Chapter 7 — Transformations and Vectors
  '7.1': {
    ref: ref(6, 23, '23.1 Simple plane transformations, 23.3 Further transformations (pp. 557–569, 582–594)'),
    tip: 'Always state the single geometric transformation and ALL required parameters (e.g. rotation: angle, direction, and centre) — describing two transformations loses marks.',
    fastForward: 'Negative enlargement scale factors invert shapes across the centre, while translations link directly to column vectors in Ch. 23.2.',
  },
  '7.2': {
    ref: ref(6, 23, '23.2 Vectors (pp. 570–581)'),
    tip: 'In column vectors (x over y), the top component moves horizontally (+ right, − left) and the bottom component vertically (+ up, − down).',
    fastForward: 'Column vectors link algebraic translations (Ch. 23.1) with vector magnitude and geometry proofs.',
  },
  '7.3': {
    ref: ref(6, 23, '23.2 Magnitude of a vector (pp. 575–577)'),
    tip: 'Vector magnitude |v| = √(x² + y²) is always non-negative—square any negative component inside brackets before summing.',
    fastForward: 'Vector length directly parallels coordinate segment length √((Δx)² + (Δy)²) in Ch. 10.1 & Ch. 11.1.',
  },
  '7.4': {
    ref: ref(6, 23, '23.2 Position vectors & geometrical vector proofs (pp. 577–581)'),
    tip: 'To prove two vectors are parallel, show one is a scalar multiple of the other (v = ku); to prove points A, B, C are collinear, also note they share a common point.',
    fastForward: 'Vector ratio splits integrate straight into geometric similarity problems (Ch. 11.2–11.3).',
  },

  // Chapter 8 — Probability
  '8.1': {
    ref: ref(2, 8, '8.1 Basic probability, 8.2 Theoretical probability, 8.3 Complementary events (pp. 161–165)'),
    tip: 'Write probabilities as exact fractions, decimals, or percentages in [0, 1]—never write ratios like "3 : 5" or phrases like "3 out of 5".',
    fastForward: 'Single-event complement rule P(A′) = 1 − P(A) simplifies multi-stage "at least one" tree diagram questions in Ch. 24.',
  },
  '8.2': {
    ref: ref(2, 8, '8.1–8.2 Experimental probability & expected frequency (pp. 161–164)'),
    tip: 'Relative frequency estimates probability most reliably when the number of trials is large; Expected number = P(event) × Number of trials.',
    fastForward: 'Experimental data distributions connect directly to statistical frequency tables in Ch. 4 and Ch. 12.',
  },
  '8.3': {
    ref: ref(2, 8, '8.4 Possibility diagrams, 8.5 Combined events (pp. 165–172); Unit 6 Ch. 24: 24.1–24.3 Tree & Venn diagrams (pp. 597–603)'),
    tip: 'Along branches representing "AND" events, MULTIPLY probabilities; across mutually exclusive branches representing "OR" outcomes, ADD their products.',
    fastForward: 'Check carefully whether items are replaced or kept ("without replacement"), which alters denominator counts in Ch. 24.4.',
  },
  '8.4': {
    ref: ref(6, 24, '24.4 Conditional probability (pp. 604–610)'),
    tip: 'On Venn diagrams, conditional probability P(A | B) restricts the denominator strictly to n(B) rather than the full universal set n(ℰ).',
    fastForward: 'Tree diagrams without replacement and Venn conditioning combine cleanly in structured Paper 4 problems.',
  },

  // Chapter 9 — Statistics
  '9.1': {
    ref: ref(1, 4, '4.1 Collecting and classifying data, 4.2 Organising data (pp. 74–85)'),
    tip: 'Countable whole values (shoe sizes, goals scored) are discrete; measured quantities on a continuous scale (height, mass, time) are continuous.',
    fastForward: 'Discrete vs continuous data types determine whether bar charts (with gaps) or histograms (without gaps) are used in Ch. 4 & Ch. 20.',
  },
  '9.2': {
    ref: ref(1, 4, '4.3 Interpreting charts (pp. 86–100); Unit 3 Ch. 12: 12.2 Making comparisons using averages and ranges (pp. 257–258)'),
    tip: 'When comparing two data sets for 2 marks, state ONE average comparison (e.g. higher median) AND ONE spread comparison (lower range/IQR = more consistent) in context.',
    fastForward: 'Box-and-whisker plots (Ch. 12.6) visualise median and interquartile range comparisons side by side.',
  },
  '9.3': {
    ref: ref(3, 12, '12.1 Different types of average, 12.3 Frequency data, 12.4 Grouped continuous data (pp. 254–264)'),
    tip: 'For grouped data estimated mean, multiply each class MIDPOINT by its frequency and divide by total frequency—never divide by the number of classes.',
    fastForward: 'Averages and quartiles extend directly into cumulative frequency curves and box-and-whisker plots in Ch. 12.5–12.6 & Ch. 20.2.',
  },
  '9.4': {
    ref: ref(1, 4, '4.3 Using charts to display data — pictograms, bar charts, pie charts & stem-and-leaf (pp. 86–100)'),
    tip: 'Always include a key on stem-and-leaf diagrams and double-check that pie chart sector angles sum cleanly to 360°.',
    fastForward: 'Unequal class intervals later require frequency density histograms in Unit 5 (Ch. 20.1).',
  },
  '9.5': {
    ref: ref(4, 16, '16.1 Introduction to bivariate data — scatter diagrams & correlation (pp. 384–393)'),
    tip: 'Pass your line of best fit through the mean point (x̄, ȳ), and warn against extrapolation outside the observed data range.',
    fastForward: 'Interpreting positive/negative/zero linear trends connects directly to straight-line gradients in Ch. 10.1.',
  },
  '9.6': {
    ref: ref(3, 12, '12.5 Percentiles & quartiles, 12.6 Box-and-whisker plots (pp. 265–276); Unit 5 Ch. 20: 20.2 Cumulative frequency (pp. 492–505)'),
    tip: 'Plot cumulative frequencies at the UPPER boundary of each class interval, and find median at n/2, Q₁ at n/4, Q₃ at 3n/4 (IQR = Q₃ − Q₁).',
    fastForward: 'Box-and-whisker plots compare skewed distributions immediately using minimum, Q₁, median, Q₃, and maximum.',
  },
  '9.7': {
    ref: ref(5, 20, '20.1 Histograms (pp. 485–491)'),
    tip: 'In IGCSE histograms with unequal class widths, the vertical axis is ALWAYS Frequency Density = Frequency ÷ Class Width, and bar AREA equals frequency.',
    fastForward: 'Finding frequencies from bar areas lets you compute quartiles and medians cleanly when combined with Ch. 20.2.',
  },
};
