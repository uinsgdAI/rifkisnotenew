import type { TextbookEnrichment } from './textbookGuide1to4';

export const TEXTBOOK_GUIDE_5_TO_9: Record<string, TextbookEnrichment> = {
  '5.1': {
    bigIdea: 'Converting metric units is simply multiplying or dividing by powers of $10$ — EXCEPT for area ($10^2$) and volume ($10^3$), because squares have two perpendicular dimensions and cubes have three!',
    stepByStepMethod: [
      'Write the linear conversion factor $k$ first (e.g. $1\\text{ m} = 100\\text{ cm}$, $1\\text{ km} = 1000\\text{ m}$).',
      'To convert area units, multiply or divide by $k^2$ ($1\\text{ m}^2 = 10\\,000\\text{ cm}^2$).',
      'To convert volume units, multiply or divide by $k^3$ ($1\\text{ m}^3 = 1\\,000\\,000\\text{ cm}^3$); remember $1\\text{ litre} = 1000\\text{ cm}^3$.',
    ],
    comparisonTable: {
      title: 'Metric Length, Area, Volume & Capacity Scale Factors',
      headers: ['Dimension', 'Conversion Pair', 'Scale Factor'],
      rows: [
        ['Length', '$1\\text{ m} \\leftrightarrow \\text{cm}$', '$\\times 100$ / $\\div 100$'],
        ['Area', '$1\\text{ m}^2 \\leftrightarrow \\text{cm}^2$', '$\\times 100^2 = 10\\,000$'],
        ['Volume', '$1\\text{ m}^3 \\leftrightarrow \\text{cm}^3$', '$\\times 100^3 = 1\\,000\\,000$'],
        ['Capacity', '$1\\text{ litre} \\leftrightarrow \\text{cm}^3$', '$1\\text{ L} = 1000\\text{ cm}^3 = 1000\\text{ ml}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Square & Cube Conversion Trap in Real-World Contexts',
        body: 'In carpeting, tiling, or tank-filling questions, dimensions are frequently mixed (e.g. tank floor $2.4\\text{ m} \\times 1.5\\text{ m}$ filled with $600\\text{ ml}$ bottles). Convert ALL lengths into centimetres FIRST ($240\\text{ cm} \\times 150\\text{ cm}$) or convert litres to $\\text{m}^3$ ($1000\\text{ L} = 1\\text{ m}^3$) before dividing.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Converting area & capacity',
        question: '(a) Convert $4.2\\text{ m}^2$ into $\\text{cm}^2$. (b) A rectangular tank measures $50\\text{ cm} \\times 40\\text{ cm} \\times 30\\text{ cm}$. How many litres does it hold?',
        marks: 3,
        steps: [
          '(a) $4.2 \\times 100^2 = 4.2 \\times 10\\,000 = 42\\,000\\text{ cm}^2$.',
          '(b) Volume $= 50 \\times 40 \\times 30 = 60\\,000\\text{ cm}^3$. Divide by $1000$: $60\\text{ litres}$.',
        ],
        answer: '(a) $42\\,000\\text{ cm}^2$, (b) $60\\text{ litres}$',
        markSchemeNotes: 'B1 $42\\,000$; M1 $60\\,000 \\div 1000$, A1 $60\\text{ L}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Square/Cube your conversion factor', detail: '$1\\text{ cm}^2 = 10^2 = 100\\text{ mm}^2$; $1\\text{ cm}^3 = 10^3 = 1000\\text{ mm}^3$.' },
      { rule: 'Volume to capacity', detail: '$1000\\text{ cm}^3 = 1\\text{ litre}$ and $1\\text{ m}^3 = 1000\\text{ litres}$.' },
    ],
  },
  '5.2': {
    bigIdea: 'For triangles, parallelograms, and trapeziums, height MUST always be the **perpendicular** height ($90^\\circ$ to the base), never the slanted edge length.',
    stepByStepMethod: [
      'Trace the base and verify you have the perpendicular height $h$ (look for the $90^\\circ$ square symbol!).',
      'Split L-shapes or compound figures by drawing clean horizontal or vertical cuts, or subtract unshaded cut-outs from an enclosing rectangle.',
      'For perimeter, walk carefully around ONLY the OUTER boundary — never include internal cut lines!',
    ],
    comparisonTable: {
      title: '2D Area Formulae (Memorised for 2025–2027)',
      headers: ['Shape', 'Area Formula', 'Perimeter Note'],
      rows: [
        ['Rectangle', '$l \\times w$', '$2(l + w)$'],
        ['Triangle', '$\\frac{1}{2} \\times b \\times h$', 'Sum of all $3$ outer sides'],
        ['Parallelogram', '$b \\times h$', '$2(a + b)$ using slanted side'],
        ['Trapezium', '$\\frac{1}{2}(a + b)h$', 'Average of parallel sides $\\times$ perp height'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Working Backwards from a Given Area (Algebraic Lengths)',
        body: 'In Paper 3 and Paper 4, you may be given a trapezium\'s area and asked to find a missing parallel side or height, or form a quadratic equation in $x$. Write the formula first, substitute known numbers, and solve carefully step by step.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Reverse trapezium formula',
        question: 'A trapezium has area $54\\text{ cm}^2$, perpendicular height $6\\text{ cm}$, and one parallel side $7\\text{ cm}$. Find the length of the other parallel side.',
        marks: 2,
        steps: [
          'Substitute into $A = \\frac{1}{2}(a + b)h$: $54 = \\frac{1}{2}(7 + b)(6) = 3(7 + b)$.',
          'Divide by $3$: $18 = 7 + b \\implies b = 11\\text{ cm}$.',
        ],
        answer: '$11\\text{ cm}$',
        markSchemeNotes: 'M1 for $\\frac{1}{2}(7+b)\\times 6 = 54$, A1 $11$.',
      },
    ],
    rapidSummary: [
      { rule: 'Memorise Trapezium area', detail: 'Area $= \\frac{1}{2}(a + b)h$ is NOT on the 2025–2027 formula sheet.' },
      { rule: 'Outer boundary only', detail: 'Internal dividing lines count toward area sum, never perimeter.' },
    ],
  },
  '5.3': {
    bigIdea: 'An arc is simply the fraction $\\frac{\\theta}{360}$ of a full circle\'s circumference ($2\\pi r$), and a sector is that exact same fraction $\\frac{\\theta}{360}$ of the full circle\'s area ($\\pi r^2$).',
    stepByStepMethod: [
      'Convert diameter to radius immediately ($r = \\frac{d}{2}$) before squaring!',
      'Keep $\\pi$ exact until the end on Non-Calculator Papers 1 & 2 ("give your answer in terms of $\\pi$").',
      'For PERIMETER of a sector, remember BOTH straight radii PLUS the curved arc: $P = 2r + \\frac{\\theta}{360}(2\\pi r)$.',
    ],
    comparisonTable: {
      title: 'Circles, Arcs & Sectors Comparison',
      headers: ['Measurement', 'Full Circle', 'Sector of Angle $\\theta$'],
      rows: [
        ['Curve length / Circumference', '$2\\pi r = \\pi d$', 'Arc length $= \\frac{\\theta}{360} \\times 2\\pi r$'],
        ['Area', '$\\pi r^2$', 'Sector area $= \\frac{\\theta}{360} \\times \\pi r^2$'],
        ['Full Perimeter', '$2\\pi r$', '$2r + \\frac{\\theta}{360} \\times 2\\pi r$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Area of a Circular Segment (Sector minus Triangle)',
        body: 'In Extended Paper 4, the minor segment cut off by chord $AB$ equals $\\text{Sector } OAB - \\triangle OAB$. Use $\\frac{\\theta}{360}\\pi r^2 - \\frac{1}{2} r^2 \\sin\\theta$!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Total perimeter of a sector in terms of $\\pi$',
        question: 'A sector has radius $9\\text{ cm}$ and angle $80^\\circ$. Find its perimeter in the form $a + b\\pi$.',
        marks: 3,
        steps: [
          'Arc length $= \\frac{80}{360} \\times 2\\pi(9) = \\frac{2}{9} \\times 18\\pi = 4\\pi\\text{ cm}$.',
          'Add two straight radii: Perimeter $= 9 + 9 + 4\\pi = 18 + 4\\pi\\text{ cm}$.',
        ],
        answer: '$18 + 4\\pi\\text{ cm}$',
        markSchemeNotes: 'M1 for $\\frac{80}{360}\\times 2\\pi\\times 9 = 4\\pi$, A1 for $18 + 4\\pi$.',
      },
    ],
    rapidSummary: [
      { rule: 'Sector perimeter needs $+ 2r$', detail: 'Arc length alone omits the two straight edge radii.' },
      { rule: 'Keep exact $\\pi$', detail: 'On Non-Calculator Papers 1/2, leave answers like $12\\pi + 8$.' },
    ],
  },
  '5.4': {
    bigIdea: 'Every straight prism has volume $\\text{Cross-section Area} \\times \\text{Length}$. Every pointed pyramid or cone takes exactly $\\frac{1}{3}$ of its matching prism/cylinder volume.',
    stepByStepMethod: [
      'Identify whether the solid is uniform (prism/cylinder) or pointed (pyramid/cone $\\to \\frac{1}{3}$ factor).',
      'Check if a cylinder or hollow hemisphere is **open** at the top or **solid** when calculating total surface area (do you include $1$ or $2$ circular caps?).',
      'For cones, separate perpendicular height $h$ (volume) from slant height $l = \\sqrt{r^2 + h^2}$ (curved surface area $\\pi r l$).',
    ],
    comparisonTable: {
      title: '3D Volume & Surface Area Formulae (2025–2027)',
      headers: ['Solid', 'Volume', 'Total Surface Area', 'On Formula Sheet?'],
      rows: [
        ['Uniform Prism / Cylinder', '$A_{\\text{cross}} \\times l$ / $\\pi r^2 h$', 'Sum of faces / $2\\pi r h + 2\\pi r^2$', 'Memorise'],
        ['Pyramid / Cone', '$\\frac{1}{3} A_{\\text{base}} h$ / $\\frac{1}{3}\\pi r^2 h$', 'Base + $\\pi r l$ ($l=\\sqrt{r^2+h^2}$)', 'Provided for Cone/Pyramid'],
        ['Sphere', '$\\frac{4}{3}\\pi r^3$', '$4\\pi r^2$', 'Provided'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Conservation of Volume When Melting / Pouring Liquids',
        body: 'When a solid metal sphere or cuboid is melted and recast into smaller cones, or water pours from one container into another, **Total Volume stays strictly constant**. Set $V_{\\text{before}} = N \\times V_{\\text{after}}$ and cancel $\\pi$ on both sides before reaching for your calculator!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Solid hemisphere total surface area',
        question: 'Calculate the exact total surface area of a solid hemisphere of radius $5\\text{ cm}$ in terms of $\\pi$.',
        marks: 3,
        steps: [
          'Curved dome area $= \\frac{1}{2}(4\\pi r^2) = 2\\pi(5^2) = 50\\pi\\text{ cm}^2$.',
          'Flat circular base area $= \\pi r^2 = \\pi(5^2) = 25\\pi\\text{ cm}^2$. Total $= 75\\pi\\text{ cm}^2$.',
        ],
        answer: '$75\\pi\\text{ cm}^2$',
        markSchemeNotes: 'M1 curved area $2\\pi r^2$, M1 adding flat circle $\\pi r^2$, A1 $75\\pi$.',
      },
    ],
    rapidSummary: [
      { rule: 'Solid hemisphere SA $= 3\\pi r^2$', detail: 'Half a sphere ($2\\pi r^2$) PLUS the flat circular cut face ($\\pi r^2$).' },
      { rule: 'Cone height vs slant height', detail: 'Volume uses vertical $h$; Curved SA uses slant $l = \\sqrt{r^2 + h^2}$.' },
    ],
  },
  '5.5': {
    bigIdea: 'Compound shapes break into standard rectangles, triangles, sectors, cylinders, and cones. Frustums (cones/pyramids with top tips chopped off) subtract the small upper piece from the full original cone/pyramid.',
    stepByStepMethod: [
      'Divide compound shapes into clean numbered parts ($V_1, V_2$ or $A_1, A_2$).',
      'For TOTAL surface area of joined solids (e.g. hemisphere on top of cylinder), calculate ONLY the **exposed outside surfaces** — do NOT include the hidden circular seam inside!',
      'For a frustum of a cone, use similar triangles ($\\frac{r}{R} = \\frac{h_{\\text{small}}}{H_{\\text{full}}}$) to find full height, then subtract $V_{\\text{big}} - V_{\\text{small}}$.',
    ],
    comparisonTable: {
      title: 'Compound Solid Strategies',
      headers: ['Composite Solid', 'Volume Rule', 'Exposed Surface Area Rule'],
      rows: [
        ['Cylinder + Hemisphere (capsule/silo)', '$V_{\\text{cyl}} + V_{\\text{hemi}}$', 'Base $\\pi r^2$ + Wall $2\\pi r h$ + Dome $2\\pi r^2$'],
        ['Cone Frustum (chopped top)', '$V_{\\text{large cone}} - V_{\\text{removed tip}}$', 'Bottom circle + Top circle + $(\\pi R L - \\pi r l)$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Finding Similar Heights in Frustums (Extended)',
        body: 'Never subtract slant heights naively without finding the apex height via similar triangles: if top radius is $4\\text{ cm}$ and bottom radius is $10\\text{ cm}$, the removed top cone is linearly $0.4$ of the entire full cone.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Frustum volume using similar cones',
        question: 'A cone of height $12\\text{ cm}$ and base radius $6\\text{ cm}$ has the top $4\\text{ cm}$ sliced off horizontally. Find the frustum volume in terms of $\\pi$.',
        marks: 3,
        steps: [
          'Removed tip has height $4\\text{ cm}$, linear ratio $k = \\frac{4}{12} = \\frac{1}{3}$, so tip radius $= 6 \\times \\frac{1}{3} = 2\\text{ cm}$.',
          'Frustum volume $= \\frac{1}{3}\\pi(6^2)(12) - \\frac{1}{3}\\pi(2^2)(4) = 144\\pi - \\frac{16}{3}\\pi = \\frac{416}{3}\\pi\\text{ cm}^3$.',
        ],
        answer: '$\\frac{416}{3}\\pi\\text{ cm}^3$',
        markSchemeNotes: 'B1 tip radius $2\\text{ cm}$, M1 subtracting two cone volumes, A1 $\\frac{416}{3}\\pi$.',
      },
    ],
    rapidSummary: [
      { rule: 'Subtract hidden seams', detail: 'Joined interior faces are invisible from the outside and do not count toward Surface Area.' },
      { rule: 'Frustums = Big minus Tip', detail: 'Find the full original height via similar radii ($r/R = h/H$) first.' },
    ],
  },
  '6.1': {
    bigIdea: 'Pythagoras applies strictly to right-angled triangles linking side lengths ONLY ($a^2 + b^2 = c^2$), where hypotenuse $c$ is always the longest side facing the $90^\\circ$ angle.',
    stepByStepMethod: [
      'Identify the hypotenuse (directly opposite the $90^\\circ$ box) and label it $c$.',
      'To find the hypotenuse: ADD squares ($c = \\sqrt{a^2 + b^2}$).',
      'To find a shorter leg: SUBTRACT squares ($a = \\sqrt{c^2 - b^2}$).',
    ],
    comparisonTable: {
      title: 'Common Pythagorean Triples (Non-Calculator Speed)',
      headers: ['Basic Triple', 'Scaled Multiples', 'Exam Tip'],
      rows: [
        ['$3, 4, 5$', '$6, 8, 10$ · $9, 12, 15$ · $1.5, 2, 2.5$', 'Spot immediately on Paper 1 & 2'],
        ['$5, 12, 13$', '$10, 24, 26$ · $2.5, 6, 6.5$', 'Frequent in circle tangent questions'],
        ['$8, 15, 17$', '$16, 30, 34$', 'Check longest side is opposite $90^\\circ$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Converse of Pythagoras (Testing Right Angles)',
        body: 'To prove $\\triangle ABC$ has a right angle, compute $a^2 + b^2$ (the two shorter sides) and $c^2$ (the longest side) separately. If $a^2 + b^2 = c^2$, it IS right-angled opposite $c$; if unequal, it is NOT right-angled.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Converse test + coordinate distance',
        question: 'A triangle has sides $9\\text{ cm}$, $12\\text{ cm}$, and $16\\text{ cm}$. Show whether it is right-angled.',
        marks: 2,
        steps: [
          'Shorter sides squared: $9^2 + 12^2 = 81 + 144 = 225$.',
          'Longest side squared: $16^2 = 256$. Since $225 \\neq 256$, NOT right-angled.',
        ],
        answer: 'No, not right-angled ($225 \\neq 256$)',
        markSchemeNotes: 'M1 for $9^2 + 12^2$ and $16^2$, A1 valid conclusion.',
      },
    ],
    rapidSummary: [
      { rule: 'Hypotenuse = biggest side', detail: 'If finding a shorter side, ALWAYS subtract from hypotenuse squared.' },
      { rule: '3D cuboid diagonal', detail: 'Apply Pythagoras twice cleanly: $d = \\sqrt{a^2 + b^2 + c^2}$.' },
    ],
  },
  '6.2': {
    bigIdea: 'In any right-angled triangle with acute angle $\\theta$, SOH-CAH-TOA connects two side lengths to $\\theta$. Every triangle with the same angle $\\theta$ shares exact fixed side ratios.',
    stepByStepMethod: [
      'Label `H` (Hypotenuse opposite $90^\\circ$), `O` (Opposite $\\theta$), and `A` (Adjacent next to $\\theta$).',
      'Pick the ratio containing ONLY the side you have and the side/angle you want (`SOH`, `CAH`, or `TOA`).',
      'When solving for a missing ANGLE, use the inverse key ($\\sin^{-1}, \\cos^{-1}, \\tan^{-1}$).',
      'When unknown is in the denominator ($\\sin 35^\\circ = \\frac{12}{x}$), swap $x$ and $\\sin 35^\\circ$: $x = \\frac{12}{\\sin 35^\\circ}$.',
    ],
    comparisonTable: {
      title: 'SOH-CAH-TOA Selection Matrix',
      headers: ['Known / Target Sides', 'Ratio', 'Inverse Angle Formula'],
      rows: [
        ['Opposite & Hypotenuse', '$\\sin\\theta = \\frac{O}{H}$', '$\\theta = \\sin^{-1}\\left(\\frac{O}{H}\\right)$'],
        ['Adjacent & Hypotenuse', '$\\cos\\theta = \\frac{A}{H}$', '$\\theta = \\cos^{-1}\\left(\\frac{A}{H}\\right)$'],
        ['Opposite & Adjacent', '$\\tan\\theta = \\frac{O}{A}$', '$\\theta = \\tan^{-1}\\left(\\frac{O}{A}\\right)$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Angles of Elevation & Depression',
        body: 'Both angles are ALWAYS measured from the **horizontal** eye line (never from a vertical cliff or wall!). By alternate angles on parallel horizontals, the angle of depression from cliff-top $A$ down to boat $B$ equals the angle of elevation from $B$ up to $A$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Unknown in denominator',
        question: 'In a right triangle, the side adjacent to $38^\\circ$ is $14\\text{ cm}$. Calculate the hypotenuse length to $3$ s.f.',
        marks: 2,
        steps: [
          'Adjacent & Hypotenuse $\\to$ Cosine: $\\cos 38^\\circ = \\frac{14}{H}$.',
          'Rearrange: $H = \\frac{14}{\\cos 38^\\circ} = 17.766\\dots \\approx 17.8\\text{ cm}$.',
        ],
        answer: '$17.8\\text{ cm}$',
        markSchemeNotes: 'M1 for $\\frac{14}{\\cos 38^\\circ}$, A1 for $17.8$.',
      },
    ],
    rapidSummary: [
      { rule: 'Denominator unknown $\\implies$ Divide', detail: 'Do NOT multiply $14 \\times \\cos 38^\\circ$ when $H$ is on the bottom!' },
      { rule: 'Angles to 1 d.p.', detail: 'Cambridge standard accuracy for degree angles is $1$ decimal place.' },
    ],
  },
  '6.3': {
    bigIdea: 'For Non-Calculator Paper 2, exact trigonometric values come straight from half an equilateral triangle ($30^\\circ$-$60^\\circ$-$90^\\circ$) and an isosceles right triangle ($45^\\circ$-$45^\\circ$-$90^\\circ$).',
    stepByStepMethod: [
      'Draw the $1$-$1$-$\\sqrt{2}$ right triangle for $45^\\circ$ and the $1$-$\\sqrt{3}$-$2$ triangle for $30^\\circ, 60^\\circ$.',
      'Recall the square-root pattern for sine: $\\frac{\\sqrt{0}}{2}, \\frac{\\sqrt{1}}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, \\frac{\\sqrt{4}}{2}$ across $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$!',
      'Divide $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ if you forget any exact tangent value, and leave answers in simplified surd form.',
    ],
    comparisonTable: {
      title: 'Exact Trigonometric Values Table (Paper 2 Essential)',
      headers: ['Angle $\\theta$', '$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$'],
      rows: [
        ['$0^\\circ$', '$0$', '$1$', '$0$'],
        ['$30^\\circ$', '$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$'],
        ['$45^\\circ$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$1$'],
        ['$60^\\circ$', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$', '$\\sqrt{3}$'],
        ['$90^\\circ$', '$1$', '$0$', 'Undefined'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Combining Exact Trig Values with Surds',
        body: 'In Paper 2 non-calculator questions, expect exact right triangles with angles $30^\\circ, 45^\\circ$, or $60^\\circ$ where final lengths must stay in simplified surd form such as $6\\sqrt{3}$ or $4\\sqrt{2}$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Exact triangle calculation (Paper 2 Non-Calculator)',
        question: 'A right triangle has hypotenuse $10\\text{ cm}$ and angle $60^\\circ$. Find the exact perimeter in the form $a + b\\sqrt{3}$.',
        marks: 3,
        steps: [
          'Adjacent $= 10\\cos 60^\\circ = 10(\\frac{1}{2}) = 5\\text{ cm}$.',
          'Opposite $= 10\\sin 60^\\circ = 10(\\frac{\\sqrt{3}}{2}) = 5\\sqrt{3}\\text{ cm}$. Perimeter $= 10 + 5 + 5\\sqrt{3} = 15 + 5\\sqrt{3}\\text{ cm}$.',
        ],
        answer: '$15 + 5\\sqrt{3}\\text{ cm}$',
        markSchemeNotes: 'B1 adj $5$, B1 opp $5\\sqrt{3}$, A1 $15 + 5\\sqrt{3}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Cosine reverses Sine', detail: '$\\sin 30^\\circ = \\cos 60^\\circ = 0.5$ because $30^\\circ + 60^\\circ = 90^\\circ$.' },
      { rule: 'Know both Paper 2 triangles', detail: 'Sketch $1$-$1$-$\\sqrt{2}$ ($45^\\circ$) and $1$-$\\sqrt{3}$-$2$ ($30^\\circ/60^\\circ$) at the start of Non-Calculator Paper 2.' },
    ],
  },
  '6.4': {
    bigIdea: 'Sine and Cosine curves oscillate smoothly between $-1$ and $+1$ every $360^\\circ$, meaning trigonometric equations usually produce TWO angles between $0^\\circ$ and $360^\\circ$ using wave symmetry.',
    stepByStepMethod: [
      'Find the principal calculator angle $\\theta_1 = \\sin^{-1}(\\dots)$ or $\\cos^{-1}(\\dots)$ or $\\tan^{-1}(\\dots)$.',
      'Use curve symmetry to find the second solution in $[0^\\circ, 360^\\circ]$: Sine $\\to 180^\\circ - \\theta_1$; Cosine $\\to 360^\\circ - \\theta_1$; Tangent $\\to \\theta_1 + 180^\\circ$.',
      'If $\\sin\\theta = -k$, first find acute reference $\\alpha = \\sin^{-1}(+k)$, then place into Quadrant 3 ($180^\\circ + \\alpha$) and Quadrant 4 ($360^\\circ - \\alpha$).',
    ],
    comparisonTable: {
      title: 'Trig Function Properties & Symmetry ($0^\\circ \\le x \\le 360^\\circ$)',
      headers: ['Function', 'Period', 'Range', 'Second Solution Shortcut'],
      rows: [
        ['$y = \\sin x$', '$360^\\circ$', '$-1 \\le y \\le 1$', '$180^\\circ - x_1$ (and $+360^\\circ$ if negative)'],
        ['$y = \\cos x$', '$360^\\circ$', '$-1 \\le y \\le 1$', '$360^\\circ - x_1$'],
        ['$y = \\tan x$', '$180^\\circ$', 'All real $y$', '$x_1 + 180^\\circ$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Asymptotes of $y = \\tan x$',
        body: 'Because $\\tan x = \\frac{\\sin x}{\\cos x}$, wherever $\\cos x = 0$ (at $90^\\circ$ and $270^\\circ$), $\\tan x$ shoots to $\\pm\\infty$ along vertical asymptotes.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Solving negative cosine equation',
        question: 'Solve $\\cos x = -0.5$ for $0^\\circ \\le x \\le 360^\\circ$.',
        marks: 2,
        steps: [
          'Calculator gives $x_1 = \\cos^{-1}(-0.5) = 120^\\circ$.',
          'Cosine symmetry gives $x_2 = 360^\\circ - 120^\\circ = 240^\\circ$.',
        ],
        answer: '$120^\\circ$ and $240^\\circ$',
        markSchemeNotes: 'B1 $120^\\circ$, B1 $240^\\circ$.',
      },
    ],
    rapidSummary: [
      { rule: 'Use ASTC / wave symmetry', detail: 'Almost all trig equations in $[0^\\circ, 360^\\circ]$ have $2$ solutions.' },
      { rule: 'Check tangent period', detail: '$\\tan x$ repeats every $180^\\circ$ with vertical asymptotes at $90^\\circ$ and $270^\\circ$.' },
    ],
  },
  '6.5': {
    bigIdea: 'For ANY non-right triangle, Sine Rule matches opposite side–angle pairs ($\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$), while Cosine Rule handles two sides + included angle (`SAS`) or all three sides (`SSS`).',
    stepByStepMethod: [
      'Always label corners $A, B, C$ and opposite lowercase sides $a, b, c$.',
      'Check if you know a complete opposite pair ($a$ and $\\angle A$): YES $\\implies$ Sine Rule; NO (`SAS` or `SSS`) $\\implies$ Cosine Rule.',
      'For area of any triangle without perpendicular height: $\\text{Area} = \\frac{1}{2}ab\\sin C$ using two sides and the INCLUDED angle between them.',
    ],
    comparisonTable: {
      title: 'Sine Rule vs Cosine Rule Decision Table',
      headers: ['Known Information', 'Formula to Use', 'Watch-out'],
      rows: [
        ['Opposite pair $(a, A)$ + another side or angle', '$\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$', 'Ambiguous case if finding obtuse angle via $\\sin^{-1}$'],
        ['2 sides + angle between them (`SAS`)', '$c^2 = a^2 + b^2 - 2ab\\cos C$', 'Remember to take $\\sqrt{\\cdot}$ at the end!'],
        ['All 3 sides known (`SSS`)', '$\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}$', 'Side $c$ subtracted is opposite target angle $C$'],
        ['Area from `SAS`', '$\\text{Area} = \\frac{1}{2}ab\\sin C$', 'Must use the INCLUDED angle $C$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'The Ambiguous Case of the Sine Rule (Obtuse Angle Check)',
        body: 'Because $\\sin(180^\\circ - \\theta) = \\sin\\theta$, calculator $\\sin^{-1}$ ALWAYS returns an acute angle! If the question states or shows angle $B$ is **obtuse**, subtract your calculator result from $180^\\circ$ (or use Cosine Rule when possible, since $\\cos^{-1}$ distinguishes obtuse angles automatically!).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding largest angle from SSS',
        question: 'A triangle has sides $5\\text{ cm}$, $7\\text{ cm}$, and $10\\text{ cm}$. Calculate the largest angle to $1$ d.p.',
        marks: 3,
        steps: [
          'The largest angle faces the longest side ($c = 10\\text{ cm}$).',
          '$\\cos C = \\frac{5^2 + 7^2 - 10^2}{2(5)(7)} = \\frac{25 + 49 - 100}{70} = \\frac{-26}{70} \\implies C = \\cos^{-1}(-\\frac{26}{70}) = 111.8^\\circ$.',
        ],
        answer: '$111.8^\\circ$',
        markSchemeNotes: 'M1 Cosine Rule with $10^2$ subtracted, A1 $-26/70$, A1 $111.8^\\circ$.',
      },
    ],
    rapidSummary: [
      { rule: 'BIDMAS on Cosine Rule', detail: 'NEVER calculate $(a^2 + b^2 - 2ab)$ before multiplying by $\\cos C$!' },
      { rule: 'Area = $\\frac{1}{2}ab\\sin C$', detail: 'Check you are using two sides and the INCLUDED angle between them.' },
    ],
  },
  '6.6': {
    bigIdea: '3D trigonometry never needs 3D equations — slice any 3D cuboid or pyramid to extract a flat 2D right-angled triangle containing your target angle or line.',
    stepByStepMethod: [
      'Highlight the target line segment and the horizontal floor plane directly underneath it.',
      'Drop a vertical perpendicular straight from the upper endpoint down onto the plane to form a flat 2D right-angled triangle.',
      'Find the diagonal on the floor first using 2D Pythagoras, then solve the upright right-angled triangle using SOH-CAH-TOA.',
    ],
    comparisonTable: {
      title: '3D Triangles Strategy Summary',
      headers: ['Problem Type', '2D Slice Triangle', 'Formula'],
      rows: [
        ['Space diagonal of cuboid $a\\times b\\times c$', 'Floor diagonal $\\to$ vertical height', '$d = \\sqrt{a^2 + b^2 + c^2}$'],
        ['Angle between line $AG$ & base plane', 'Drop vertical $GC$ down to floor corner $C$', '$\\tan\\theta = \\frac{\\text{Vertical height } GC}{\\text{Base diagonal } AC}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Using Exact Midpoints in Symmetrical Pyramids',
        body: 'In a square-based right pyramid $VABCD$, apex $V$ sits directly above the intersection $M$ of base diagonals $AC$ and $BD$. Always sketch flat base $ABCD$ separately first to compute $AM = \\frac{1}{2}AC$, then solve upright triangle $\\triangle VMA$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Angle between space diagonal and base',
        question: 'A cuboid measures $8\\text{ cm} \\times 6\\text{ cm} \\times 5\\text{ cm}$ (height $5\\text{ cm}$). Find the angle its space diagonal makes with the horizontal base.',
        marks: 3,
        steps: [
          'Base diagonal $AC = \\sqrt{8^2 + 6^2} = 10\\text{ cm}$.',
          'In upright triangle, $\\tan\\theta = \\frac{5}{10} = 0.5 \\implies \\theta = \\tan^{-1}(0.5) = 26.6^\\circ$.',
        ],
        answer: '$26.6^\\circ$',
        markSchemeNotes: 'B1 base diagonal $10$, M1 $\\tan\\theta = 5/10$, A1 $26.6^\\circ$.',
      },
    ],
    rapidSummary: [
      { rule: 'Always draw the 2D triangle separately', detail: 'Sketch the extracted triangle flat on the page with its $90^\\circ$ box before using SOH-CAH-TOA.' },
      { rule: 'Keep extra digits mid-calculation', detail: 'Do not round your base diagonal before using it inside the second 2D triangle!' },
    ],
  },
  '7.1': {
    bigIdea: 'Four geometric transformations move shapes around a grid: Translations slide, Reflections flip across a mirror line, Rotations turn around a pivot, and Enlargements scale from a centre.',
    stepByStepMethod: [
      'When asked to **describe fully** a SINGLE transformation, state the exact transformation name PLUS all required parameters (never combine two transformations into one!).',
      'Check congruence vs similarity: translations, reflections, and rotations preserve size; ONLY enlargements change size (negative $k$ flips $180^\\circ$ across the centre!).',
      'Test a single clear vertex first with tracing paper or ray lines before moving the whole shape.',
    ],
    comparisonTable: {
      title: 'Full Description Requirements (Full Marks Checklist)',
      headers: ['Transformation', 'Marks Usually Awarded For:', 'Example Full Answer'],
      rows: [
        ['Translation', 'Name + column vector $\\binom{x}{y}$', 'Translation by $\\binom{-4}{3}$'],
        ['Reflection', 'Name + exact mirror line equation', 'Reflection in the line $y = x$'],
        ['Rotation', 'Name + angle + direction ($\\text{CW/ACW}$) + centre', 'Rotation $90^\\circ$ clockwise, centre $(1, 2)$'],
        ['Enlargement', 'Name + scale factor $k$ + centre $(x, y)$', 'Enlargement, scale factor $-2$, centre $(0, 1)$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Finding the Centre of Rotation or Enlargement Visually',
        body: 'To find a centre of enlargement, draw straight rays connecting corresponding vertices (Object $A \\to$ Image $A\'$, $B \\to B\'$); all rays intersect at the exact centre! If image vertices swapped orientation upside down, the scale factor $k$ is NEGATIVE and rays cross through the centre.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Negative enlargement coordinates',
        question: 'Triangle $T$ has vertex $A(3, 4)$. Enlarge $T$ by scale factor $-2$ with centre $(1, 1)$. Find the image $A\'$.',
        marks: 2,
        steps: [
          'Vector from centre $(1,1)$ to $A(3,4)$ is $\\binom{2}{3}$.',
          'Multiply vector by $-2$: $\\binom{-4}{-6}$. Add to centre: $A\' = (1 - 4, 1 - 6) = (-3, -5)$.',
        ],
        answer: '$A\'(-3, -5)$',
        markSchemeNotes: 'M1 vector $\\times (-2)$, A1 $(-3, -5)$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never name two transformations', detail: 'Cambridge "describe fully the SINGLE transformation" awards $0$ marks for double answers.' },
      { rule: 'Negative enlargement flips $180^\\circ$', detail: 'Count vector steps from the centre and multiply by $-k$ to land on the opposite side.' },
    ],
  },
  '7.2': {
    bigIdea: 'Vectors track directed journeys ("magnitude AND direction") rather than fixed positions. To walk from $A$ to $B$ using position vectors from origin $O$, always subtract end minus start: $\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$.',
    stepByStepMethod: [
      'Write $\\overrightarrow{AB} = \\overrightarrow{AO} + \\overrightarrow{OB} = -\\mathbf{a} + \\mathbf{b} = \\mathbf{b} - \\mathbf{a}$.',
      'To add or subtract column vectors $\\binom{x}{y}$, add top components together and bottom components together separately.',
      'To show two vectors are parallel, show one is a scalar multiple of the other ($\\mathbf{u} = k\\mathbf{v}$).',
    ],
    comparisonTable: {
      title: 'Column Vector Arithmetic Rules',
      headers: ['Operation', 'Formula', 'Meaning'],
      rows: [
        ['Addition', '$\\binom{x_1}{y_1} + \\binom{x_2}{y_2} = \\binom{x_1+x_2}{y_1+y_2}$', 'Combined nose-to-tail journey'],
        ['Scalar multiple', '$k\\binom{x}{y} = \\binom{kx}{ky}$', 'Parallel vector scaled by $k$'],
        ['Position $\\to$ displacement', '$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}$', 'Journey from $A$ to $B$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Dividing a Segment in a Given Vector Ratio',
        body: 'If point $P$ lies on $AB$ such that $AP : PB = 2 : 3$, then $P$ sits $\\frac{2}{2 + 3} = \\frac{2}{5}$ of the way along $\\overrightarrow{AB}$, so $\\overrightarrow{AP} = \\frac{2}{5}\\overrightarrow{AB}$ and $\\overrightarrow{OP} = \\overrightarrow{OA} + \\frac{2}{5}\\overrightarrow{AB}$. Always add the ratio parts for the denominator!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Vector displacement between coordinates',
        question: 'Point $P$ is $(3, -2)$ and $\\overrightarrow{PQ} = \\binom{-5}{7}$. Find the coordinates of $Q$.',
        marks: 2,
        steps: [
          '$\\overrightarrow{OQ} = \\overrightarrow{OP} + \\overrightarrow{PQ} = \\binom{3}{-2} + \\binom{-5}{7} = \\binom{-2}{5}$.',
        ],
        answer: '$Q(-2, 5)$',
        markSchemeNotes: 'M1 adding position + displacement, A1 $(-2, 5)$.',
      },
    ],
    rapidSummary: [
      { rule: 'Write column vectors vertically', detail: 'Use $\\binom{x}{y}$ without a horizontal fraction bar.' },
      { rule: 'End minus Start', detail: 'Always remember $\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\mathbf{b} - \\mathbf{a}$.' },
    ],
  },
  '7.3': {
    bigIdea: 'The magnitude $|\\mathbf{v}|$ of a vector $\\binom{x}{y}$ is simply its geometric arrow length computed via Pythagoras: $\\sqrt{x^2 + y^2}$.',
    stepByStepMethod: [
      'Compute horizontal $x$ and vertical $y$ components into a single column vector $\\binom{x}{y}$ first.',
      'Square both numbers (wrapping negatives in brackets so $(-y)^2 > 0$), add, and take $\\sqrt{\\cdot}$.',
      'Scale lengths linearly for multiples: $|k\\mathbf{v}| = |k| \\cdot |\\mathbf{v}|$.',
    ],
    comparisonTable: {
      title: 'Vector vs Magnitude Comparison',
      headers: ['Quantity', 'Notation', 'Output'],
      rows: [
        ['Vector', '$\\mathbf{a} = \\binom{-3}{4}$', 'Directed shift ($2$ numbers)'],
        ['Magnitude', '$|\\mathbf{a}| = \\sqrt{(-3)^2 + 4^2} = 5$', 'Single positive scalar length'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Magnitude of Parallel Scaled Vectors',
        body: 'Scaling a vector by $k$ multiplies its magnitude by $|k|$: $|3\\mathbf{a}| = 3|\\mathbf{a}|$ and $|-2\\mathbf{a}| = 2|\\mathbf{a}|$ (lengths are never negative!).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Magnitude of resultant vector',
        question: 'If $\\mathbf{p} = \\binom{2}{-1}$ and $\\mathbf{q} = \\binom{1}{5}$, find $|\\mathbf{p} + \\mathbf{q}|$.',
        marks: 2,
        steps: [
          'First add vectors: $\\mathbf{p} + \\mathbf{q} = \\binom{3}{4}$.',
          'Take magnitude: $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.',
        ],
        answer: '$5$',
        markSchemeNotes: 'M1 for $\\binom{3}{4}$, A1 for $5$.',
      },
    ],
    rapidSummary: [
      { rule: 'Magnitude is NEVER negative', detail: '$|\\mathbf{v}| \\ge 0$ always.' },
      { rule: 'Add vectors BEFORE length', detail: 'Compute $\\mathbf{a} + \\mathbf{b}$ into one column before applying Pythagoras ($|\\mathbf{a}+\\mathbf{b}| \\neq |\\mathbf{a}| + |\\mathbf{b}|$ unless parallel).' },
    ],
  },
  '7.4': {
    bigIdea: 'In vector geometry proofs, every vector arrow can be detoured through ANY sequence of known paths summing head-to-tail. Parallel and collinear statements both boil down to showing one vector is a constant multiple of the other.',
    stepByStepMethod: [
      'Read arrow directions carefully on the diagram ($-\\mathbf{a}$ reverses the arrow!).',
      'Express both vectors to compare in terms of the simplest base vectors $\\mathbf{a}$ and $\\mathbf{b}$.',
      'Factor out constants cleanly to compare direction vectors: if $\\overrightarrow{PQ} = k\\,\\overrightarrow{RS}$, then $PQ \\parallel RS$; if they ALSO share a point, $P, Q, S$ are collinear.',
    ],
    comparisonTable: {
      title: 'Vector Geometry Proof Phrases (Exam Mark Scheme)',
      headers: ['Vector Result', 'What You Must Conclude Explicitly'],
      rows: [
        ['$\\overrightarrow{CD} = 3\\,\\overrightarrow{AB}$', '$CD$ is parallel to $AB$ AND $CD = 3 \\times AB$'],
        ['$\\overrightarrow{PQ} = 2\\,\\overrightarrow{PR}$', 'Parallel vectors sharing common point $P \\implies P, Q, R$ are collinear'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Ratio of Triangle Areas Sharing Vectors',
        body: 'In Paper 4 extensions, if two triangles share the same height and base ratio $k : 1$, their areas are in ratio $k : 1$; if they are mathematically similar triangles formed by parallel bases ($\\overrightarrow{DE} = k\\overrightarrow{BC}$), their area ratio is $k^2 : 1$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Collinearity proof with midpoint',
        question: 'In $\\triangle OAB$, $\\overrightarrow{OA} = \\mathbf{a}$ and $\\overrightarrow{OB} = \\mathbf{b}$. $M$ is the midpoint of $OA$, and $N$ lies on $OB$ with $ON = \\frac{1}{3}OB$. Express $\\overrightarrow{MN}$ in terms of $\\mathbf{a}$ and $\\mathbf{b}$.',
        marks: 2,
        steps: [
          '$\\overrightarrow{MO} = -\\frac{1}{2}\\mathbf{a}$ and $\\overrightarrow{ON} = \\frac{1}{3}\\mathbf{b}$.',
          'Add along path: $\\overrightarrow{MN} = \\overrightarrow{MO} + \\overrightarrow{ON} = \\frac{1}{3}\\mathbf{b} - \\frac{1}{2}\\mathbf{a}$.',
        ],
        answer: '$\\frac{1}{3}\\mathbf{b} - \\frac{1}{2}\\mathbf{a}$',
        markSchemeNotes: 'M1 valid route $MO + ON$, A1 simplified expression.',
      },
    ],
    rapidSummary: [
      { rule: 'Parallel + Common point = Collinear', detail: 'State BOTH the scalar multiple AND the shared point to earn the proof mark.' },
      { rule: 'Ratio denominators = sum of parts', detail: 'If $AP : PB = 2 : 3$, then $\\overrightarrow{AP} = \\frac{2}{5}\\overrightarrow{AB}$ (NOT $\\frac{2}{3}$!).' },
    ],
  },
  '8.1': {
    bigIdea: 'Probability scales every chance strictly from $0$ (impossible) to $1$ (certain), so the probabilities of all mutually exclusive outcomes ALWAYS sum to $1$.',
    stepByStepMethod: [
      'Check equally likely sample space outcomes or count favourable cases divided by total cases.',
      'Use complement $P(\\text{not } A) = 1 - P(A)$ whenever counting "at least one" or "not".',
      'Give final answers as simplified fractions, decimals, or percentages — NEVER ratios like $1:4$.',
    ],
    comparisonTable: {
      title: 'Probability Scale & Complement Rules',
      headers: ['Value / Notation', 'Meaning', 'Format Allowed'],
      rows: [
        ['$P(A) = 0$', 'Impossible event', 'Write exact fraction, decimal, or percentage'],
        ['$P(A) = 1$', 'Certain event', 'NEVER write as a ratio like `$1:4$` or `"1 in 4"`!'],
        ['$P(A\') = 1 - P(A)$', 'Complement (does not happen)', 'Quickest way to find missing table entries'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Finding Missing Probabilities in Spinner Tables',
        body: 'When a biased spinner table lists numerical probabilities plus $x$ and $2x$, set the sum of ALL probabilities in the row equal to $1$ and solve the linear equation cleanly.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Biased spinner table sum = 1',
        question: 'A biased $4$-sided spinner has $P(1)=0.35$, $P(2)=0.25$, $P(3)=x$, $P(4)=3x$. Find $P(4)$.',
        marks: 3,
        steps: [
          'Total $= 1 \\implies 0.35 + 0.25 + 4x = 1 \\implies 4x = 0.40 \\implies x = 0.10$.',
          'Thus $P(4) = 3(0.10) = 0.30$.',
        ],
        answer: '$0.30$',
        markSchemeNotes: 'M1 sum $= 1$, A1 $x = 0.10$, A1 $0.30$.',
      },
    ],
    rapidSummary: [
      { rule: 'Always $0 \\le P \\le 1$', detail: 'If your answer is $> 1$ or negative, stop and check!' },
      { rule: 'Mutually exclusive sum $= 1$', detail: 'Set all outcome rows in a complete probability distribution equal to $1$.' },
    ],
  },
  '8.2': {
    bigIdea: 'Theoretical probability predicts what SHOULD happen in an ideal experiment, while relative frequency uses real trial data to estimate probability — the larger the number of trials, the more reliable the estimate.',
    stepByStepMethod: [
      'Relative frequency $= \\frac{\\text{Observed count}}{\\text{Total trials}}$.',
      'Expected frequency over $N$ future trials $= N \\times P(\\text{event})$.',
      'Note that expected frequency is a theoretical long-run average (can be decimal like $12.5$, though word contexts often round).',
    ],
    comparisonTable: {
      title: 'Theoretical vs Experimental Probability',
      headers: ['Concept', 'Formula', 'When Used'],
      rows: [
        ['Relative frequency', '$\\frac{\\text{Successes}}{\\text{Total trials}}$', 'Estimating biased outcomes from experiments'],
        ['Expected frequency', '$N \\times p$', 'Predicting average count out of $N$ repeats'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Evaluating Reliability in Exam Answers',
        body: 'If Cambridge asks "Which student\'s estimate is more reliable and why?", ALWAYS pick the student who carried out the **largest number of trials** and write: "More trials give a more reliable estimate of probability."',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Relative & expected frequency',
        question: 'A drawing pin lands point-up $28$ times in $80$ throws. Estimate how many times it lands point-up in $500$ throws.',
        marks: 2,
        steps: [
          'Relative frequency $= \\frac{28}{80} = 0.35$.',
          'Expected count $= 500 \\times 0.35 = 175$.',
        ],
        answer: '$175$',
        markSchemeNotes: 'M1 for $\\frac{28}{80} \\times 500$, A1 for $175$.',
      },
    ],
    rapidSummary: [
      { rule: 'More trials = Better estimate', detail: 'State the trial count explicitly when comparing reliability.' },
      { rule: 'Expected frequency $\\neq$ probability', detail: 'Expected count equals $N \\times p$, NOT just $p$.' },
    ],
  },
  '8.3': {
    bigIdea: '**Mutually exclusive** events cannot happen together ($P(A \\cap B) = 0$), whereas **independent** events do not affect each other ($P(A \\cap B) = P(A)\\times P(B)$). On tree diagrams: **MULTIPLY along branches** (AND), **ADD between separate winning paths** (OR), and reduce remaining totals when picking **WITHOUT replacement**!',
    stepByStepMethod: [
      'Test event type first: Mutually Exclusive ($P(A \\cap B) = 0 \\implies P(A \\cup B) = P(A) + P(B)$) vs Overlapping ($P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$).',
      'Test Independence: WITH replacement is independent ($P(A \\cap B) = P(A)\\cdot P(B)$); WITHOUT replacement is dependent (denominator AND matching numerator drop by $1$ on second branch!).',
      'Ensure every pair or trio of branches from a single tree node sums strictly to $1$.',
      'Multiply fractions along each relevant route, sum qualifying routes, or use $1 - P(\\text{none})$ for "at least one" shortcuts.',
    ],
    comparisonTable: {
      title: 'Mutually Exclusive, Independent & Tree Diagram Rules',
      headers: ['Event Type / Condition', 'Exact Algebraic Rule', '2nd Tree Branch / Venn Effect'],
      rows: [
        ['Mutually exclusive ($A$ or $B$)', '$P(A \\cup B) = P(A) + P(B)$', '$P(A \\cap B) = 0$ (disjoint Venn circles)'],
        ['Non-mutually exclusive ($A$ or $B$)', '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$', 'Subtract overlap once so it is not double-counted'],
        ['Independent (e.g. With replacement)', '$P(A \\cap B) = P(A) \\times P(B)$', '2nd stage branch probabilities stay unchanged'],
        ['Dependent (Without replacement)', '$P(A \\cap B) = P(A) \\times P(B \\mid A)$', 'Total drops by $1$ on 2nd stage; check both orders $R,B$ and $B,R$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Three-Colour Trees & Sample Space Grids',
        body: 'When a bag has 3 colours (e.g. Red, Blue, Green) and 2 balls are picked, you do NOT need to compute all $9$ branches — only trace the exact branches asked for (or use $1 - P(\\text{same})$ for "different colours"!). For two dice/spinners, draw a $6 \\times 6$ two-way grid instead of a $36$-branch tree.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'At least one without replacement',
        question: 'A box holds $4$ mint and $6$ lemon sweets. Two sweets are taken WITHOUT replacement. Find the probability that at least one sweet is mint.',
        marks: 3,
        steps: [
          'Use complement: $1 - P(\\text{neither is mint}) = 1 - P(\\text{Lemon, Lemon})$.',
          '$P(L, L) = \\frac{6}{10} \\times \\frac{5}{9} = \\frac{30}{90} = \\frac{1}{3}$, so $P(\\text{at least 1 mint}) = 1 - \\frac{1}{3} = \\frac{2}{3}$.',
        ],
        answer: '$\\frac{2}{3}$',
        markSchemeNotes: 'M1 for $\\frac{6}{10} \\times \\frac{5}{9}$, M1 $1 - P(L,L)$, A1 $\\frac{2}{3}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Mutually Exclusive vs Independent', detail: 'Mutually exclusive $\\implies P(A \\cap B) = 0$; Independent $\\implies P(A \\cap B) = P(A)P(B)$.' },
      { rule: 'Multiply AND, Add OR', detail: 'Along branches = $\\times$; combining different winning branches = $+$.' },
      { rule: 'Without replacement drops denominator', detail: 'Reduce total items by $1$ on the 2nd stage (and matching colour if picked first).' },
    ],
  },
  '8.4': {
    bigIdea: 'Conditional probability $P(A \\mid B)$ zooms in on a RESTRICTED world: given event $B$ definitely happened, ONLY elements or tree paths satisfying $B$ go into your new denominator!',
    stepByStepMethod: [
      'Identify the "given that ..." condition — THAT restricted group or sum of paths becomes your new denominator.',
      'Put the intersection ($A$ AND $B$) in the numerator: $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$.',
      'Check independence whenever asked: compute $P(A \\mid B)$ and check if it equals $P(A)$ (or check $P(A \\cap B) = P(A)P(B)$).',
    ],
    comparisonTable: {
      title: 'Unconditional vs Conditional Venn, Table & Tree Probability',
      headers: ['Question Wording', 'Denominator Used', 'Formula'],
      rows: [
        ['Probability chosen student plays chess AND tennis', 'Entire universal set $n(\\mathscr{E})$', '$\\frac{n(C \\cap T)}{n(\\mathscr{E})}$'],
        ['**Given** student plays chess, probability they play tennis', 'ONLY chess players $n(C)$', '$\\frac{n(C \\cap T)}{n(C)}$'],
        ['**Given** 2nd counter is Blue (Tree), probability 1st was Red', 'Sum of ALL paths ending in Blue', '$\\frac{P(R, B)}{P(R, B) + P(B, B)}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Two-Way Tables & Conditional Tree Branches',
        body: 'In two-way tables, conditional wording ("If one of the *girls* is picked at random...") locks you strictly onto the "Girls" row total rather than the grand total. On a tree diagram, read the condition carefully to sum all qualifying terminal paths for the denominator.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Conditional probability from Venn diagram',
        question: 'In a club of $40$ members, $22$ swim ($S$), $18$ cycle ($C$), and $8$ do both. Given a randomly chosen member cycles, find the probability they also swim.',
        marks: 2,
        steps: [
          'Restrict denominator to cyclists ONLY: $n(C) = 18$.',
          'Out of those $18$ cyclists, $8$ also swim: $P(S \\mid C) = \\frac{8}{18} = \\frac{4}{9}$.',
        ],
        answer: '$\\frac{4}{9}$',
        markSchemeNotes: 'M1 denominator $18$, A1 $\\frac{4}{9}$.',
      },
    ],
    rapidSummary: [
      { rule: '"Given that B..." swaps denominator', detail: 'Divide by $n(B)$ or $P(B)$, NOT $n(\\mathscr{E})$ or $1$.' },
      { rule: 'Independent test', detail: 'Events are independent ONLY if $P(A \\cap B) = P(A) \\times P(B)$, equivalently $P(A \\mid B) = P(A)$.' },
    ],
  },
  '9.1': {
    bigIdea: 'Statistics begins with classifying data cleanly: Discrete data is COUNTED in distinct steps ($0, 1, 2, \\dots$), while Continuous data is MEASURED along an unbroken scale ($174.3\\text{ cm}, 12.84\\text{ s}$).',
    stepByStepMethod: [
      'Ask: "Is this number obtained by COUNTING items/sizes or MEASURING on a ruler/scale/stopwatch?"',
      'Check if data is non-numerical (Qualitative) vs numerical (Quantitative).',
      'When designing grouped class intervals for continuous data, write strict inequality bounds without gaps ($10 < h \\le 20$, $20 < h \\le 30$).',
    ],
    comparisonTable: {
      title: 'Statistical Data Types Classification',
      headers: ['Category', 'Sub-type', 'IGCSE Examples'],
      rows: [
        ['Qualitative', 'Non-numerical categories', 'Eye colour, transport mode, favourite subject'],
        ['Quantitative Discrete', 'Exact isolated values (often integers/shoe sizes)', 'Goals scored, siblings, UK shoe size ($7, 7.5, 8$)'],
        ['Quantitative Continuous', 'Measured on continuous scale', 'Height, weight, temperature, race time, distance'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Designing Unbiased Questionnaire Questions (Core)',
        body: 'A good survey question must avoid leading words, include a clear time frame ("How many books did you read *in the last month*?"), and use non-overlapping exhaustive response boxes (`0–2`, `3–5`, `6+`).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Choosing continuous vs discrete bounds',
        question: 'A teacher groups students\' masses ($m\\text{ kg}$). Why is writing classes as `$40–50$` and `$50–60$` flawed, and how should it be written?',
        marks: 2,
        steps: [
          'Overlap flaw: a mass of exactly $50\\text{ kg}$ falls into BOTH groups.',
          'Fix with strict inequalities: $40 < m \\le 50$ and $50 < m \\le 60$.',
        ],
        answer: 'Overlap at $50$; write $40 < m \\le 50$ and $50 < m \\le 60$',
        markSchemeNotes: 'B1 overlap flaw identified, B1 strict boundary inequality shown.',
      },
    ],
    rapidSummary: [
      { rule: 'Counted = Discrete; Measured = Continuous', detail: 'Half-values like shoe sizes ($6.5$) remain discrete.' },
      { rule: 'Survey checklist', detail: 'Clear time frame + non-overlapping boxes + unbiased phrasing.' },
    ],
  },
  '9.2': {
    bigIdea: 'Reading charts and two-way tables converts visual patterns into conclusions. To compare ANY two datasets on Cambridge papers, ALWAYS give one comment comparing an **average** and one comparing **spread/consistency** in context.',
    stepByStepMethod: [
      'Complete two-way tables by filling any row or column that has only ONE missing cell first.',
      'Check row totals and column totals match the overall grand total at bottom-right.',
      'For comparison marks, pair every number explicitly ("Class A median $74 >$ Class B median $68$, so Class A scored higher on average") plus context ("Class B IQR $6 <$ Class A IQR $14$, so Class B is more consistent").',
    ],
    comparisonTable: {
      title: 'Interpreting & Comparing Distributions',
      headers: ['Measure Type', 'Examples', 'What Larger vs Smaller Means'],
      rows: [
        ['Location / Average', 'Mean, Median, Mode', 'Higher value = higher/faster/older typical result'],
        ['Spread / Dispersion', 'Range, Interquartile Range (IQR)', 'SMALLER value = MORE consistent / less varied'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Reading Dual & Compound Bar Charts Carefully',
        body: 'In compound (stacked) bar charts, NEVER read a middle segment\'s frequency directly from the top of that bar — subtract the bottom boundary from the top boundary of the shaded band!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Completing a two-way table',
        question: 'Out of $80$ students, $45$ are boys. $26$ boys study Art. In total, $44$ students study Music (the only other option). Find how many girls study Art.',
        marks: 3,
        steps: [
          'Girls total $= 80 - 45 = 35$. Boys studying Music $= 45 - 26 = 19$.',
          'Girls studying Music $= 44 - 19 = 25 \\implies$ Girls studying Art $= 35 - 25 = 10$.',
        ],
        answer: '$10$ girls',
        markSchemeNotes: 'B1 girls $=35$ or boys Music $=19$, M1 subtracting from $44$ / $35$, A1 $10$.',
      },
    ],
    rapidSummary: [
      { rule: 'Smaller IQR / Range = More consistent', detail: 'Never say a smaller range means "worse" or "lower scores".' },
      { rule: 'Two comparison sentences', detail: 'Always compare ONE average (mean/median) AND ONE spread (range/IQR) with context.' },
    ],
  },
  '9.3': {
    bigIdea: 'Mean balances total sum across every value ($\\frac{\\sum x}{n}$), Median picks the middle value after sorting, Mode picks the most frequent value, and for grouped tables we estimate the mean using class **midpoints**.',
    stepByStepMethod: [
      'Raw list: SORT ascending first for Median ($\\frac{n+1}{2}$-th position) and Range ($\\text{Max} - \\text{Min}$).',
      'Ungrouped frequency table: multiply $x \\times f$ row-by-row, sum $\\sum xf$, and divide by $\\sum f$ (TOTAL frequency, never number of rows!).',
      'Grouped frequency table: find MIDPOINT $x_{\\text{mid}} = \\frac{\\text{low} + \\text{high}}{2}$ of each class first, then $\\bar{x} \\approx \\frac{\\sum f x_{\\text{mid}}}{\\sum f}$.',
    ],
    comparisonTable: {
      title: 'Mean vs Median vs Mode vs Range',
      headers: ['Statistic', 'How to Compute', 'Advantage / Weakness'],
      rows: [
        ['Mean ($\\bar{x}$)', '$\\frac{\\sum fx}{\\sum f}$', 'Uses all data, but distorted by extreme outliers'],
        ['Median', 'Middle value at position $\\frac{n+1}{2}$', 'Unaffected by extreme outliers'],
        ['Mode / Modal class', 'Highest frequency value / group', 'Only average valid for non-numeric categories'],
        ['Range', '$\\text{Largest} - \\text{Smallest}$', 'Sensitive to single outliers (unlike IQR)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Reverse Mean & Combined Mean Problems (Exam Favourite)',
        body: 'Whenever a question says "The mean of $8$ numbers is $15$. Another number is added and the mean becomes $16$", multiply immediately to unlock the **total sum**: Original sum $= 8 \\times 15 = 120$; New sum $= 9 \\times 16 = 144$; Added number $= 144 - 120 = 24$!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Median from a discrete frequency table',
        question: 'A die is rolled $25$ times: scores $1, 2, 3, 4, 5, 6$ occur with frequencies $3, 5, 4, 6, 4, 3$. Find the median score.',
        marks: 2,
        steps: [
          'Median position $= \\frac{25 + 1}{2} = 13$th value.',
          'Running cumulative frequencies: score $1 \\to 3$, score $2 \\to 8$, score $3 \\to 12$, score $4 \\to 18$. The $13$th value sits in score $4$.',
        ],
        answer: '$4$',
        markSchemeNotes: 'M1 for position $\\frac{25+1}{2} = 13$ or cumulative counts, A1 for $4$.',
      },
    ],
    rapidSummary: [
      { rule: 'Grouped mean uses MIDPOINTS', detail: 'Always compute $\\sum(f \\times x_{\\text{mid}}) \\div \\sum f$.' },
      { rule: 'Combined sums', detail: '$\\text{Sum} = \\text{Mean} \\times \\text{Count}$.' },
    ],
  },
  '9.4': {
    bigIdea: 'Statistical charts turn numbers into geometry: pie charts map proportions to fractions of $360^\\circ$, stem-and-leaf plots preserve raw digits sorted visually, and frequency polygons connect class midpoints.',
    stepByStepMethod: [
      'Pie chart angle: $\\theta = \\frac{\\text{Category Frequency}}{\\text{Total Frequency}} \\times 360^\\circ$; reverse count: $\\text{Frequency} = \\frac{\\theta}{360^\\circ} \\times \\text{Total}$.',
      'Stem-and-leaf: sort leaves in ascending order outward from the stem AND always write a `Key` (e.g. `4 | 2 represents 42`).',
      'Frequency polygon: plot $(x_{\\text{mid}},\\ f)$ at class MIDPOINTS and connect adjacent points with straight ruler lines.',
    ],
    comparisonTable: {
      title: 'Charts Construction Checklist',
      headers: ['Diagram', 'What to Plot', 'Mandatory Feature'],
      rows: [
        ['Pie chart', 'Sector angles summing to $360^\\circ$', 'Label every sector cleanly'],
        ['Bar chart', 'Equal-width bars with equal gaps', 'Label axes & uniform vertical scale'],
        ['Stem-and-leaf', 'Ordered leaves per stem row', 'Always include an explicit **Key**'],
        ['Frequency polygon', 'Straight lines between $(x_{\\text{mid}}, f)$', 'Plot at class MIDPOINTS, not endpoints'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Back-to-Back Stem-and-Leaf Diagrams',
        body: 'When comparing two datasets across a shared central stem, read leaves from the centre OUTWARD (so left leaves increase right-to-left!). Note also that a pie chart shows proportions ONLY — two unequal-sized groups can have identical angles!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding total survey size from one pie sector',
        question: 'In a pie chart, $42$ students chose Tennis and their sector angle is $105^\\circ$. Find the total number of students surveyed.',
        marks: 2,
        steps: [
          'Fraction for Tennis $= \\frac{105}{360} = \\frac{7}{24}$.',
          'Scale up: Total $= 42 \\div \\frac{105}{360} = 42 \\times \\frac{360}{105} = 144$ students.',
        ],
        answer: '$144$ students',
        markSchemeNotes: 'M1 for $42 \\times \\frac{360}{105}$, A1 for $144$.',
      },
    ],
    rapidSummary: [
      { rule: 'Stem-and-leaf Key required', detail: 'Missing the `Key` always drops $1$ mark.' },
      { rule: 'Pie charts show ratios, not totals', detail: 'A $90^\\circ$ sector means $25\\%$ of whichever total sample was surveyed.' },
    ],
  },
  '9.5': {
    bigIdea: 'Scatter diagrams test bivariate relationships: positive correlation slopes up together, negative correlation slopes down inversely, and the best line of best fit balances points evenly while passing through the mean point $(\\bar{x}, \\bar{y})$.',
    stepByStepMethod: [
      'Check scale carefully before plotting ordered pairs $(x, y)$.',
      'Classify correlation: upward drift = positive, downward drift = negative, scattered cloud = zero/no correlation.',
      'Draw a single straight ruler line of best fit with roughly equal points above and below (passing through $(\\bar{x}, \\bar{y})$ if given; NEVER force through $(0,0)$ unless data demands it!).',
    ],
    comparisonTable: {
      title: 'Scatter Graph Interpretation Guide',
      headers: ['Pattern', 'Correlation Type', 'Prediction Reliability'],
      rows: [
        ['Rises tightly left $\\to$ right', 'Strong positive', 'Interpolation inside data range is reliable'],
        ['Falls left $\\to$ right', 'Negative', 'As $x$ increases, $y$ tends to decrease'],
        ['Random cloud', 'Zero / no correlation', 'Do NOT draw a line of best fit'],
        ['Isolated distant point', 'Outlier / anomaly', 'Ignore when positioning line of best fit'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Why Extrapolation Fails in Exam Questions',
        body: 'If Cambridge asks "Why is your prediction for $x = 120$ unreliable?", state clearly: **"$120$ lies outside the range of the given data (extrapolation), and the linear trend may not continue."**',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Anchoring line of best fit through $(\\bar{x}, \\bar{y})$',
        question: 'Five students revise for $x$ hours and score $y\\%$. Mean hours $\\bar{x} = 6$, mean score $\\bar{y} = 68$. A line of best fit has gradient $4.5$. Find its equation.',
        marks: 2,
        steps: [
          'The line of best fit MUST pass through $(\\bar{x}, \\bar{y}) = (6, 68)$.',
          '$68 = 4.5(6) + c \\implies c = 68 - 27 = 41 \\implies y = 4.5x + 41$.',
        ],
        answer: '$y = 4.5x + 41$',
        markSchemeNotes: 'M1 substituting $(6, 68)$, A1 $y = 4.5x + 41$.',
      },
    ],
    rapidSummary: [
      { rule: 'Mean point anchor', detail: 'Pass your line of best fit through $(\\bar{x}, \\bar{y})$ when means are provided.' },
      { rule: 'Beware extrapolation', detail: 'Predictions outside the observed $x$-range are unreliable because the trend may change.' },
    ],
  },
  '9.6': {
    bigIdea: 'A cumulative frequency curve accumulates running totals ("how many values are $\\le x$?"). Always plot cumulative counts against the **UPPER class boundary**, then read off Quartiles at $\\frac{N}{4}$, $\\frac{N}{2}$, and $\\frac{3N}{4}$.',
    stepByStepMethod: [
      'Add frequencies progressively top-to-bottom to complete the Cumulative Frequency column (ending cleanly at total $N$).',
      'Plot each point at **(Upper boundary of class, Cumulative frequency)**, anchored at $0$ on the lowest class start.',
      'Join points with a smooth increasing S-curve (ogive).',
      'Read horizontally from $\\frac{N}{4}$ ($Q_1$), $\\frac{N}{2}$ (Median $Q_2$), and $\\frac{3N}{4}$ ($Q_3$) down to the horizontal data axis; compute $\\text{IQR} = Q_3 - Q_1$.',
    ],
    comparisonTable: {
      title: 'Cumulative Frequency Curve Cutoffs ($N$ Total Items)',
      headers: ['Measure', 'Vertical Axis Position', 'Interpretation'],
      rows: [
        ['Lower Quartile ($Q_1$)', '$\\frac{1}{4}N$ ($25\\%$)', '$25\\%$ of data lies below $Q_1$'],
        ['Median ($Q_2$)', '$\\frac{1}{2}N$ ($50\\%$)', 'Middle $50\\%$ benchmark'],
        ['Upper Quartile ($Q_3$)', '$\\frac{3}{4}N$ ($75\\%$)', '$75\\%$ of data lies below $Q_3$'],
        ['Interquartile Range (IQR)', '$Q_3 - Q_1$', 'Spread of the middle $50\\%$ (ignores outliers)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: '"More Than" & Box-Plot Links (Paper 4)',
        body: 'Because the vertical axis counts values **less than or equal to** $x$, whenever asked "How many students scored *more than* $70$ marks?", read cumulative count $c$ at $x = 70$ and subtract **$N - c$**! On a box-and-whisker plot, the five markers are $\\text{Min}, Q_1, Q_2, Q_3, \\text{Max}$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Percentiles & Box-plot comparison',
        question: 'A cumulative frequency graph of $160$ runners shows $Q_1 = 28\\text{ min}$, Median $= 34\\text{ min}$, $Q_3 = 41\\text{ min}$, and the $90$th percentile time is $49\\text{ min}$. Find (a) the IQR and (b) how many runners took longer than $49\\text{ min}$.',
        marks: 3,
        steps: [
          '(a) $\\text{IQR} = Q_3 - Q_1 = 41 - 28 = 13\\text{ minutes}$.',
          '(b) $90\\%$ took $\\le 49\\text{ min}$, so $10\\%$ took longer: $0.10 \\times 160 = 16$ runners.',
        ],
        answer: '(a) $13\\text{ min}$, (b) $16$ runners',
        markSchemeNotes: 'B1 $13$; M1 $0.10\\times 160$, A1 $16$.',
      },
    ],
    rapidSummary: [
      { rule: 'Upper endpoints, NOT midpoints!', detail: 'Plot cumulative frequency at the right-hand boundary of every interval.' },
      { rule: 'More than $k \\implies N - \\text{CF}(k)$', detail: 'Always subtract from total $N$ for "greater than" questions.' },
    ],
  },
  '9.7': {
    bigIdea: 'In a histogram with unequal bar widths, bar HEIGHT is NOT frequency — **BAR AREA IS FREQUENCY**! Think of Frequency Density as "items per unit width" ($\\text{FD} = \\frac{\\text{Frequency}}{\\text{Class Width}}$).',
    stepByStepMethod: [
      'Compute **Class Width** $= \\text{Upper Bound} - \\text{Lower Bound}$ for every row in the table.',
      'Compute **Frequency Density** $= \\frac{\\text{Frequency}}{\\text{Class Width}}$ for every row.',
      'Draw bars touching edge-to-edge across the exact horizontal widths with height equal to Frequency Density.',
      'If working backwards from a drawn histogram without vertical numbers, pick the ONE bar whose frequency is known in the table, calculate its $\\text{FD}$, and label the vertical axis scale proportionally!',
    ],
    comparisonTable: {
      title: 'Bar Chart vs Histogram (Unequal Class Widths)',
      headers: ['Feature', 'Standard Bar Chart', 'IGCSE Histogram'],
      rows: [
        ['Data type', 'Discrete / Categorical', 'Continuous grouped intervals'],
        ['Bar widths', 'Uniform width with gaps between bars', 'Actual class widths; touching bars (NO gaps)'],
        ['Vertical axis ($y$-axis)', 'Raw Frequency', '**Frequency Density** $= \\frac{\\text{Frequency}}{\\text{Class Width}}$'],
        ['What represents Frequency?', 'Height of bar', '**AREA** of bar ($\\text{Width} \\times \\text{Height}$)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Reverse Histogram Calibration ("Complete the Table and Draw Missing Bars")',
        body: 'In almost every Paper 4 Extended session, one bar is already drawn AND its frequency row is given in the table (e.g. $0 < t \\le 10$ has frequency $15$ and bar height $3\\text{ cm}$). Since true $\\text{FD} = 15 \\div 10 = 1.5$, you know $1.5\\text{ FD} = 3\\text{ cm}$ (i.e. $1\\text{ unit of FD} = 2\\text{ cm}$, or count small squares: total squares in that bar represent $15$ items!). Both **Frequency Density** and **Area-per-Square** give the exact right missing frequencies and bar heights.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Calibrating a partly drawn histogram & table',
        question: 'On a histogram, the interval $10 < x \\le 30$ has frequency $40$ and bar height $4\\text{ cm}$. (a) Find the bar height for $30 < x \\le 35$ which has frequency $15$. (b) The bar for $35 < x \\le 50$ has height $6\\text{ cm}$; find its frequency.',
        marks: 4,
        steps: [
          'Reference $\\text{FD}$ for $10 < x \\le 30$: width $= 20$, so $\\text{FD} = 40 \\div 20 = 2.0$, represented by $4\\text{ cm}$ ($2\\text{ cm}$ per FD unit).',
          '(a) For $30 < x \\le 35$: width $= 5$, $\\text{FD} = 15 \\div 5 = 3.0 \\implies$ height $= 3.0 \\times 2 = 6\\text{ cm}$.',
          '(b) Height $6\\text{ cm} \\implies \\text{FD} = 6 \\div 2 = 3.0$. Width $= 50 - 35 = 15$, so Frequency $= 3.0 \\times 15 = 45$.',
        ],
        answer: '(a) $6\\text{ cm}$, (b) $45$',
        markSchemeNotes: 'B1 ref FD $= 2.0$, M1 scale $\\times 2$ + FD $3.0$, A1 $6\\text{ cm}$; M1 $3.0\\times 15$, A1 $45$.',
      },
    ],
    rapidSummary: [
      { rule: 'Frequency = Area = Width $\\times$ FD', detail: 'Never plot raw frequency on the vertical axis when widths vary.' },
      { rule: 'Touching bars', detail: 'Continuous histograms have zero gaps between adjacent bars.' },
    ],
  },
};
