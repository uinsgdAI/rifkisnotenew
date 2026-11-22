import type { SubtopicNote } from '../../types/syllabus';

export const CHAPTER_5_NOTES: SubtopicNote[] = [
  {
    id: '5.1',
    chapterId: 5,
    code: '5.1',
    title: 'Units of measure',
    tier: 'Core & Extended',
    summary: 'Convert metric units of length, mass, area, volume, and capacity ($1\\text{ cm}^3 = 1\\text{ ml}$, $1000\\text{ cm}^3 = 1\\text{ litre}$).',
    coreObjectives: [
      'Use current units of mass, length, area, volume and capacity in practical situations and express quantities in terms of larger or smaller units.',
      'Convert between metric units including $\\text{cm}^2 \\leftrightarrow \\text{m}^2$ and $\\text{cm}^3 \\leftrightarrow \\text{m}^3 \\leftrightarrow \\text{litres}$.',
    ],
    keyFormulas: [
      { label: 'Area conversion', latex: '1\\text{ m}^2 = (100\\text{ cm})^2 = 10\\,000\\text{ cm}^2' },
      { label: 'Volume conversion', latex: '1\\text{ m}^3 = (100\\text{ cm})^3 = 1\\,000\\,000\\text{ cm}^3' },
      { label: 'Capacity equivalence', latex: '1\\text{ cm}^3 = 1\\text{ ml}, \\qquad 1000\\text{ cm}^3 = 1\\text{ litre}, \\qquad 1\\text{ m}^3 = 1000\\text{ litres}' },
    ],
    studyNotes: [
      {
        heading: 'Square and cube your conversion factor!',
        body: 'Because $1\\text{ m} = 100\\text{ cm}$, converting $\\text{m}^2$ to $\\text{cm}^2$ multiplies by $100^2 = 10\\,000$, and converting $\\text{m}^3$ to $\\text{cm}^3$ multiplies by $100^3 = 1\\,000\\,000$.',
      },
    ],
    workedExamples: [
      {
        title: 'Tank capacity in litres',
        question: 'A rectangular tank measures $1.2\\text{ m}$ by $0.8\\text{ m}$ by $50\\text{ cm}$. How many litres of water does it hold?',
        marks: 3,
        steps: [
          'Convert all dimensions to metres: $50\\text{ cm} = 0.5\\text{ m}$.',
          'Volume $= 1.2 \\times 0.8 \\times 0.5 = 0.48\\text{ m}^3$.',
          'Convert to litres ($1\\text{ m}^3 = 1000\\text{ l}$): $0.48 \\times 1000 = 480\\text{ litres}$.',
        ],
        answer: '$480\\text{ litres}$',
        markSchemeNotes: 'M1 consistent units, M1 volume multiplication, A1 $480\\text{ litres}$.',
      },
    ],
    commonMistakes: [
      'Multiplying $\\text{m}^2$ by $100$ instead of $100^2 = 10\\,000$ to convert to $\\text{cm}^2$.',
      'Mixing centimetres and metres in the same volume product.',
    ],
    quickCheck: {
      id: 'qc-5.1',
      prompt: 'Convert $3.5\\text{ m}^2$ into $\\text{cm}^2$.',
      answer: '35000',
      numericAnswer: 35000,
      tolerance: 0,
      unit: 'cm²',
      hint: 'Multiply by $100^2 = 10\\,000$.',
      solution: '$3.5 \\times 10\\,000 = 35\\,000\\text{ cm}^2$.',
    },
  },
  {
    id: '5.2',
    chapterId: 5,
    code: '5.2',
    title: 'Area and perimeter',
    tier: 'Core & Extended',
    summary: 'Calculate perimeters and areas of rectangles, triangles, parallelograms, and trapeziums, and solve reverse area equations.',
    coreObjectives: [
      'Carry out calculations involving the perimeter and area of a rectangle, triangle, parallelogram and trapezium.',
    ],
    keyFormulas: [
      { label: 'Triangle area', latex: 'A = \\frac{1}{2} b h' },
      { label: 'Parallelogram area', latex: 'A = b h \\quad (h \\text{ is perpendicular height})' },
      { label: 'Trapezium area', latex: 'A = \\frac{1}{2}(a + b)h' },
    ],
    studyNotes: [
      {
        heading: 'Perpendicular height vs slant length',
        body: 'Area ALWAYS uses the PERPENDICULAR height $h$, whereas perimeter adds the outer SLANT lengths. Never multiply base by slant edge for a parallelogram or triangle area!',
      },
    ],
    workedExamples: [
      {
        title: 'Reverse trapezium area',
        question: 'A trapezium has parallel sides of lengths $7\\text{ cm}$ and $13\\text{ cm}$ and area $60\\text{ cm}^2$. Find its perpendicular height $h$.',
        marks: 2,
        steps: [
          '$60 = \\frac{1}{2}(7 + 13)h \\implies 60 = 10h$.',
          '$h = 6\\text{ cm}$.',
        ],
        answer: '$6\\text{ cm}$',
        markSchemeNotes: 'M1 for $\\frac{1}{2}(7+13)h = 60$, A1 for $6$.',
      },
    ],
    commonMistakes: [
      'Multiplying parallel sides $(a \\times b)$ instead of averaging $(a + b)$ in a trapezium.',
    ],
    quickCheck: {
      id: 'qc-5.2',
      prompt: 'Find the area of a trapezium with parallel sides $8\\text{ cm}$ and $14\\text{ cm}$ and perpendicular height $5\\text{ cm}$.',
      answer: '55',
      numericAnswer: 55,
      tolerance: 0,
      unit: 'cm²',
      hint: '$\\frac{1}{2}(8 + 14) \\times 5$.',
      solution: '$\\frac{1}{2}(22) \\times 5 = 11 \\times 5 = 55\\text{ cm}^2$.',
    },
  },
  {
    id: '5.3',
    chapterId: 5,
    code: '5.3',
    title: 'Circles, arcs and sectors',
    tier: 'Core & Extended',
    summary: 'Calculate circle circumference and area, and find arc lengths, sector perimeters, and sector areas (including in terms of $\\pi$).',
    coreObjectives: [
      'Carry out calculations involving the circumference and area of a circle.',
    ],
    extendedObjectives: [
      'Carry out calculations involving arc length and sector area as fractions of the circumference and area of a circle.',
    ],
    keyFormulas: [
      { label: 'Circle circumference & area', latex: 'C = 2\\pi r = \\pi d, \\qquad A = \\pi r^2' },
      { label: 'Arc length & Sector area', latex: '\\text{Arc} = \\frac{\\theta}{360^\\circ} \\times 2\\pi r, \\qquad \\text{Sector Area} = \\frac{\\theta}{360^\\circ} \\times \\pi r^2' },
      { label: 'Minor segment area (Extended)', latex: 'A_{\\text{segment}} = \\frac{\\theta}{360^\\circ}\\pi r^2 - \\frac{1}{2}r^2\\sin\\theta' },
    ],
    studyNotes: [
      {
        heading: 'Arc length vs Sector PERIMETER!',
        body: 'The most common mark-losing trap in 0580: if a question asks for the PERIMETER of a sector, you must add the two straight radii ($2r$) to the curved arc length: $\\text{Perimeter} = \\text{Arc} + 2r$.',
      },
      {
        heading: 'Circular Segment Area & Chord Length (Extended Paper 4)',
        body: 'A minor segment is the slice bounded by a straight chord $AB$ and the arc $AB$. Always compute $\\text{Sector } OAB - \\triangle OAB$, using $\\frac{1}{2} r^2 \\sin\\theta$ for the triangle. If asked for chord perimeter, find chord length $AB$ using Cosine Rule: $AB^2 = 2r^2(1 - \\cos\\theta)$.',
      },
    ],
    workedExamples: [
      {
        title: 'Perimeter of a sector in terms of $\\pi$ (Non-calculator)',
        question: 'A sector of radius $6\\text{ cm}$ has central angle $60^\\circ$. Find the perimeter of the sector in the form $a\\pi + b$.',
        marks: 3,
        steps: [
          'Arc length $= \\frac{60}{360} \\times 2\\pi(6) = \\frac{1}{6} \\times 12\\pi = 2\\pi\\text{ cm}$.',
          'Add the two straight radii: $\\text{Perimeter} = 2\\pi + 6 + 6 = 2\\pi + 12\\text{ cm}$.',
        ],
        answer: '$2\\pi + 12\\text{ cm}$',
        markSchemeNotes: 'M1 for $\\frac{60}{360} \\times 2\\pi(6)$, A1 for arc $2\\pi$, A1 for $2\\pi + 12$.',
      },
      {
        title: 'Area of a circular segment (Extended Paper 4)',
        question: 'A circle of radius $10\\text{ cm}$ has a minor sector of angle $100^\\circ$. Calculate the area of the minor segment shaded between the arc and the chord to $3$ s.f.',
        marks: 4,
        steps: [
          'Sector area $= \\frac{100}{360} \\times \\pi \\times 10^2 = 87.266\\dots\\text{ cm}^2$.',
          'Triangle area $= \\frac{1}{2}(10)(10)\\sin 100^\\circ = 50(0.9848\\dots) = 49.240\\dots\\text{ cm}^2$.',
          'Segment area $= 87.266 - 49.240 = 38.026\\dots \\approx 38.0\\text{ cm}^2$.',
        ],
        answer: '$38.0\\text{ cm}^2$',
        markSchemeNotes: 'M1 sector area, M1 $\\frac{1}{2}(10^2)\\sin 100^\\circ$, M1 subtraction, A1 $38.0$.',
      },
    ],
    commonMistakes: [
      'Forgetting $+ 2r$ when asked for the perimeter of a sector or semicircle.',
      'Using diameter instead of radius in $\\pi r^2$.',
    ],
    quickCheck: {
      id: 'qc-5.3',
      prompt: 'A sector of a circle has radius $9\\text{ cm}$ and angle $80^\\circ$. Its area is $k\\pi\\text{ cm}^2$. Find $k$.',
      answer: '18',
      numericAnswer: 18,
      tolerance: 0,
      hint: '$\\frac{80}{360} \\times \\pi \\times 9^2$.',
      solution: '$\\frac{2}{9} \\times 81\\pi = 18\\pi$, so $k = 18$.',
    },
    sandbox: 'mensuration-3d',
  },
  {
    id: '5.4',
    chapterId: 5,
    code: '5.4',
    title: 'Surface area and volume',
    tier: 'Core & Extended',
    summary: 'Calculate surface areas and volumes of cuboids, prisms, cylinders, pyramids, cones, and spheres.',
    coreObjectives: [
      'Carry out calculations and solve problems involving the surface area and volume of a cuboid, prism and cylinder.',
    ],
    extendedObjectives: [
      'Carry out calculations involving the surface area and volume of a sphere, pyramid and cone (formulae provided on the 2025+ formula sheet).',
    ],
    keyFormulas: [
      { label: 'Prism & Cylinder', latex: 'V = A_{\\text{cross}} \\times l, \\qquad V_{\\text{cyl}} = \\pi r^2 h,\\quad \\text{CSA}_{\\text{cyl}} = 2\\pi r h' },
      { label: 'Cone (Provided)', latex: 'V = \\frac{1}{3}\\pi r^2 h, \\qquad \\text{Curved Surface Area} = \\pi r l' },
      { label: 'Sphere (Provided)', latex: 'V = \\frac{4}{3}\\pi r^3, \\qquad A = 4\\pi r^2' },
    ],
    studyNotes: [
      {
        heading: 'Vertical height $h$ vs Slant height $l$ in cones',
        body: 'In a cone, volume uses the vertical height $h$ ($V = \\frac{1}{3}\\pi r^2 h$), while curved surface area uses the slant height $l$ ($\\text{CSA} = \\pi r l$), connected by Pythagoras: $l^2 = r^2 + h^2$. Also remember total surface area of a solid cone adds the circular base $\\pi r^2$!',
      },
    ],
    workedExamples: [
      {
        title: 'Total surface area of a closed cylinder',
        question: 'A closed cylinder has radius $4\\text{ cm}$ and height $10\\text{ cm}$. Calculate its total surface area in terms of $\\pi$.',
        marks: 3,
        steps: [
          'Two circular ends: $2 \\times \\pi(4^2) = 32\\pi\\text{ cm}^2$.',
          'Curved surface area: $2\\pi(4)(10) = 80\\pi\\text{ cm}^2$.',
          'Total surface area $= 32\\pi + 80\\pi = 112\\pi\\text{ cm}^2$.',
        ],
        answer: '$112\\pi\\text{ cm}^2$',
        markSchemeNotes: 'M1 for $2\\pi r^2$, M1 for $2\\pi rh$, A1 for $112\\pi$.',
      },
    ],
    commonMistakes: [
      'Forgetting the circular flat base when finding the total surface area of a hemisphere ($2\\pi r^2 + \\pi r^2 = 3\\pi r^2$) or closed cone ($\\pi r l + \\pi r^2$).',
    ],
    quickCheck: {
      id: 'qc-5.4',
      prompt: 'A sphere has radius $3\\text{ cm}$. Its volume is $k\\pi\\text{ cm}^3$. Find $k$.',
      answer: '36',
      numericAnswer: 36,
      tolerance: 0,
      hint: '$V = \\frac{4}{3}\\pi r^3$.',
      solution: '$V = \\frac{4}{3}\\pi (3^3) = \\frac{4}{3}(27)\\pi = 36\\pi$, so $k = 36$.',
    },
    sandbox: 'mensuration-3d',
  },
  {
    id: '5.5',
    chapterId: 5,
    code: '5.5',
    title: 'Compound shapes and parts of shapes',
    tier: 'Core & Extended',
    summary: 'Find perimeters, areas, surface areas, and volumes of compound 2D shapes, 3D composite solids, hemispheres, and frustums.',
    coreObjectives: [
      'Solve problems involving the perimeters and areas of compound 2D shapes made of rectangles, triangles and circles.',
    ],
    extendedObjectives: [
      'Solve problems involving surface areas and volumes of compound 3D solids (e.g. cylinder + hemisphere, cone frustums, melting and recasting solids).',
    ],
    keyFormulas: [
      { label: 'Conservation of volume', latex: 'V_{\\text{original}} = N \\times V_{\\text{recast}}' },
      { label: 'Frustum volume', latex: 'V_{\\text{frustum}} = V_{\\text{large cone}} - V_{\\text{removed top cone}}' },
    ],
    studyNotes: [
      {
        heading: 'Composite surface area rule: only count EXPOSED surfaces!',
        body: 'When a hemisphere sits cleanly on top of a cylinder of the same radius $r$, the joined flat circular faces are INSIDE the solid — do NOT add them to the total surface area! Total SA $= \\text{base circle } (\\pi r^2) + \\text{cylinder wall } (2\\pi rh) + \\text{hemisphere dome } (2\\pi r^2)$.',
      },
    ],
    workedExamples: [
      {
        title: 'Melting a cylinder into spheres (Extended)',
        question: 'A metal cylinder of radius $6\\text{ cm}$ and height $16\\text{ cm}$ is melted down and recast into spheres of radius $2\\text{ cm}$. How many spheres are made?',
        marks: 3,
        steps: [
          'Volume of cylinder $= \\pi (6^2)(16) = 576\\pi\\text{ cm}^3$.',
          'Volume of one sphere $= \\frac{4}{3}\\pi (2^3) = \\frac{32}{3}\\pi\\text{ cm}^3$.',
          'Number of spheres $= 576\\pi \\div \\frac{32}{3}\\pi = 576 \\times \\frac{3}{32} = 54$.',
        ],
        answer: '$54$',
        markSchemeNotes: 'M1 for cylinder volume, M1 for dividing by sphere volume, A1 for $54$.',
      },
    ],
    commonMistakes: [
      'Including internal hidden faces when summing surface areas of joined solids.',
      'Rounding up partial spheres/cones instead of rounding down to whole items made.',
    ],
    quickCheck: {
      id: 'qc-5.5',
      prompt: 'A frustum is formed by removing a cone of volume $20\\text{ cm}^3$ from the top of a larger cone of volume $160\\text{ cm}^3$. What is the volume of the frustum in $\\text{cm}^3$?',
      answer: '140',
      numericAnswer: 140,
      tolerance: 0,
      unit: 'cm³',
      hint: 'Subtract the removed cone volume from the original cone volume.',
      solution: '$160 - 20 = 140\\text{ cm}^3$.',
    },
    sandbox: 'mensuration-3d',
  },
];
