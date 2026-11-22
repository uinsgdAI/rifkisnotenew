import type { SubtopicNote } from '../../types/syllabus';

export const CHAPTER_6_NOTES: SubtopicNote[] = [
  {
    id: '6.1',
    chapterId: 6,
    code: '6.1',
    title: 'Pythagoras’ theorem',
    tier: 'Core & Extended',
    summary: 'Use Pythagoras’ theorem $a^2 + b^2 = c^2$ to calculate unknown sides in right-angled triangles and coordinate distances.',
    coreObjectives: [
      'Know and use Pythagoras’ theorem in two dimensions.',
    ],
    keyFormulas: [
      { label: 'Hypotenuse', latex: 'c = \\sqrt{a^2 + b^2}' },
      { label: 'Shorter leg', latex: 'a = \\sqrt{c^2 - b^2}' },
    ],
    studyNotes: [
      {
        heading: 'Always locate the right angle first',
        body: 'The hypotenuse $c$ is ALWAYS opposite the $90^\\circ$ angle and is the longest side. Add squares to find the hypotenuse; subtract squares ($c^2 - b^2$) to find a shorter leg.',
      },
    ],
    workedExamples: [
      {
        title: 'Finding a shorter side in an isosceles triangle',
        question: 'An isosceles triangle has two equal sides of length $10\\text{ cm}$ and a base of $12\\text{ cm}$. Find its perpendicular height.',
        marks: 3,
        steps: [
          'Drop a perpendicular to split the base in half: $12 \\div 2 = 6\\text{ cm}$.',
          'Apply Pythagoras: $h = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8\\text{ cm}$.',
        ],
        answer: '$8\\text{ cm}$',
        markSchemeNotes: 'B1 for $6\\text{ cm}$ half-base, M1 for $\\sqrt{10^2 - 6^2}$, A1 for $8$.',
      },
    ],
    commonMistakes: [
      'Adding squares when finding a shorter side instead of subtracting.',
      'Forgetting to take the square root at the end.',
    ],
    quickCheck: {
      id: 'qc-6.1',
      prompt: 'A right-angled triangle has hypotenuse $17\\text{ cm}$ and one leg $8\\text{ cm}$. Find the length of the other leg in cm.',
      answer: '15',
      numericAnswer: 15,
      tolerance: 0,
      unit: 'cm',
      hint: '$\\sqrt{17^2 - 8^2}$.',
      solution: '$\\sqrt{289 - 64} = \\sqrt{225} = 15\\text{ cm}$.',
    },
    sandbox: 'trigonometry-triangle',
  },
  {
    id: '6.2',
    chapterId: 6,
    code: '6.2',
    title: 'Right-angled triangles',
    tier: 'Core & Extended',
    summary: 'Apply SOH CAH TOA trigonometric ratios to calculate sides, angles, and angles of elevation and depression.',
    coreObjectives: [
      'Apply Pythagoras’ theorem and the sine, cosine and tangent ratios for acute angles to the calculation of a side or an angle of a right-angled triangle.',
      'Solve problems using angles of elevation and depression.',
    ],
    keyFormulas: [
      { label: 'SOH CAH TOA', latex: '\\sin\\theta = \\frac{\\text{O}}{\\text{H}},\\qquad \\cos\\theta = \\frac{\\text{A}}{\\text{H}},\\qquad \\tan\\theta = \\frac{\\text{O}}{\\text{A}}' },
    ],
    studyNotes: [
      {
        heading: 'Angles of elevation and depression',
        body: 'Both are ALWAYS measured from the HORIZONTAL line (never from the vertical!). By alternate angles between parallel horizontal lines, the angle of depression from $A$ down to $B$ equals the angle of elevation from $B$ up to $A$.',
      },
    ],
    workedExamples: [
      {
        title: 'Unknown in denominator ($x$ at bottom)',
        question: 'In a right-angled triangle, angle $A = 35^\\circ$ and the opposite side is $14\\text{ cm}$. Find the hypotenuse $h$ to $3$ s.f.',
        marks: 2,
        steps: [
          '$\\sin 35^\\circ = \\frac{14}{h}$.',
          'Multiply by $h$ and divide by $\\sin 35^\\circ$: $h = \\frac{14}{\\sin 35^\\circ} = 24.408\\dots \\approx 24.4\\text{ cm}$.',
        ],
        answer: '$24.4\\text{ cm}$',
        markSchemeNotes: 'M1 for $\\frac{14}{\\sin 35^\\circ}$, A1 for $24.4$.',
      },
    ],
    commonMistakes: [
      'Multiplying $14 \\times \\sin 35^\\circ$ when the unknown is in the denominator instead of dividing.',
      'Measuring angle of depression from the vertical wall instead of the horizontal.',
    ],
    quickCheck: {
      id: 'qc-6.2',
      prompt: 'In a right-angled triangle, the opposite side to angle $\\theta$ is $5\\text{ cm}$ and the adjacent side is $5\\text{ cm}$. What is $\\theta$ in degrees?',
      answer: '45',
      numericAnswer: 45,
      tolerance: 0,
      unit: '°',
      hint: '$\\tan\\theta = \\frac{5}{5} = 1$.',
      solution: '$\\theta = \\tan^{-1}(1) = 45^\\circ$.',
    },
    sandbox: 'trigonometry-triangle',
  },
  {
    id: '6.3',
    chapterId: 6,
    code: '6.3',
    title: 'Exact trigonometric values',
    tier: 'Extended',
    summary: 'Know and use exact values of $\\sin\\theta, \\cos\\theta, \\tan\\theta$ for $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ on non-calculator papers.',
    coreObjectives: [
      'Recognise right-triangle proportions.',
    ],
    extendedObjectives: [
      'Know the exact values of $\\sin x, \\cos x$ for $x = 0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ and $\\tan x$ for $x = 0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ$ (tested on Paper 2 non-calculator).',
    ],
    keyFormulas: [
      { label: 'Sine special values', latex: '\\sin 0^\\circ=0,\\ \\sin 30^\\circ=\\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\sin 60^\\circ=\\frac{\\sqrt{3}}{2},\\ \\sin 90^\\circ=1' },
      { label: 'Cosine special values', latex: '\\cos 0^\\circ=1,\\ \\cos 30^\\circ=\\frac{\\sqrt{3}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 60^\\circ=\\frac{1}{2},\\ \\cos 90^\\circ=0' },
      { label: 'Tangent special values', latex: '\\tan 0^\\circ=0,\\ \\tan 30^\\circ=\\frac{\\sqrt{3}}{3},\\ \\tan 45^\\circ=1,\\ \\tan 60^\\circ=\\sqrt{3}' },
    ],
    studyNotes: [
      {
        heading: 'Derive them in 10 seconds with two triangles!',
        body: 'Draw an equilateral triangle of side $2$ cut in half (gives $30^\\circ, 60^\\circ$ with sides $1, \\sqrt{3}, 2$) and an isosceles right triangle with legs $1, 1$ and hypotenuse $\\sqrt{2}$ (gives $45^\\circ$). You will never forget an exact value on Paper 2!',
      },
    ],
    workedExamples: [
      {
        title: 'Non-calculator exact trigonometry (Extended)',
        question: 'Find the exact value of $\\sin 60^\\circ \\cos 30^\\circ + \\tan 45^\\circ$.',
        marks: 2,
        steps: [
          'Substitute exact values: $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$, $\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$, $\\tan 45^\\circ = 1$.',
          '$\\left(\\frac{\\sqrt{3}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) + 1 = \\frac{3}{4} + 1 = \\frac{7}{4}$ (or $1.75$).',
        ],
        answer: '$\\frac{7}{4}$',
        markSchemeNotes: 'B1 for exact trig values, A1 for $\\frac{7}{4}$.',
      },
    ],
    commonMistakes: [
      'Swapping $\\sin 30^\\circ = \\frac{1}{2}$ and $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$.',
    ],
    quickCheck: {
      id: 'qc-6.3',
      prompt: 'Evaluate $4\\sin 30^\\circ + \\tan^2 60^\\circ$ without a calculator.',
      answer: '5',
      numericAnswer: 5,
      tolerance: 0,
      hint: '$\\sin 30^\\circ = 0.5$ and $\\tan 60^\\circ = \\sqrt{3}$.',
      solution: '$4(0.5) + (\\sqrt{3})^2 = 2 + 3 = 5$.',
    },
  },
  {
    id: '6.4',
    chapterId: 6,
    code: '6.4',
    title: 'Trigonometric functions',
    tier: 'Extended',
    summary: 'Sketch graphs of $y = \\sin x, \\cos x, \\tan x$ and solve trigonometric equations for $0^\\circ \\le x \\le 360^\\circ$.',
    coreObjectives: [
      'Understand acute trigonometric ratios.',
    ],
    extendedObjectives: [
      'Recognise, sketch and interpret graphs of trigonometric functions for $0^\\circ \\le x \\le 360^\\circ$.',
      'Solve simple trigonometric equations for values between $0^\\circ$ and $360^\\circ$.',
    ],
    keyFormulas: [
      { label: 'Sine symmetry', latex: '\\sin(180^\\circ - \\theta) = \\sin\\theta' },
      { label: 'Cosine symmetry', latex: '\\cos(360^\\circ - \\theta) = \\cos\\theta' },
      { label: 'Tangent periodicity', latex: '\\tan(\\theta + 180^\\circ) = \\tan\\theta' },
    ],
    studyNotes: [
      {
        heading: 'Finding ALL solutions in $0^\\circ \\le x \\le 360^\\circ$',
        body: 'Your calculator only returns ONE principal angle. Use CAST or the wave symmetry to find the second angle! For $\\sin x = k$: second angle is $180^\\circ - x_1$. For $\\cos x = k$: second angle is $360^\\circ - x_1$. For $\\tan x = k$: add $180^\\circ$.',
      },
    ],
    workedExamples: [
      {
        title: 'Solving $\\cos x = -0.5$ on $[0^\\circ, 360^\\circ]$ (Extended)',
        question: 'Solve $\\cos x = -0.5$ for $0^\\circ \\le x \\le 360^\\circ$.',
        marks: 3,
        steps: [
          'Principal angle from calculator: $\\cos^{-1}(-0.5) = 120^\\circ$.',
          'Second solution by cosine symmetry: $360^\\circ - 120^\\circ = 240^\\circ$.',
        ],
        answer: '$120^\\circ,\\ 240^\\circ$',
        markSchemeNotes: 'B1 for $120^\\circ$, B1 for $240^\\circ$ (and B1 if no extra invalid values).',
      },
    ],
    commonMistakes: [
      'Giving only one solution when the domain is $0^\\circ \\le x \\le 360^\\circ$.',
    ],
    quickCheck: {
      id: 'qc-6.4',
      prompt: 'If $\\sin x = 0.5$ for $0^\\circ \\le x \\le 360^\\circ$, one solution is $30^\\circ$. What is the other solution in degrees?',
      answer: '150',
      numericAnswer: 150,
      tolerance: 0,
      unit: '°',
      hint: '$180^\\circ - 30^\\circ$.',
      solution: '$180^\\circ - 30^\\circ = 150^\\circ$.',
    },
  },
  {
    id: '6.5',
    chapterId: 6,
    code: '6.5',
    title: 'Non-right-angled triangles',
    tier: 'Extended',
    summary: 'Solve non-right-angled triangles using the Sine Rule, Cosine Rule, and Area formula $\\frac{1}{2}ab\\sin C$.',
    coreObjectives: [
      'Calculate area of a triangle given base and perpendicular height.',
    ],
    extendedObjectives: [
      'Solve problems using the sine and cosine rules for any triangle and the formula area of triangle $= \\frac{1}{2}ab\\sin C$.',
      'Recognise the ambiguous case of the sine rule (obtuse angle $180^\\circ - \\theta$).',
    ],
    keyFormulas: [
      { label: 'Sine Rule', latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}' },
      { label: 'Cosine Rule', latex: 'a^2 = b^2 + c^2 - 2bc\\cos A, \\qquad \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}' },
      { label: 'Area of any triangle', latex: '\\text{Area} = \\frac{1}{2}ab\\sin C' },
    ],
    studyNotes: [
      {
        heading: 'Sine Rule vs Cosine Rule decision tree',
        body: 'Do you have a matched opposite pair (an angle AND the side opposite it)? YES $\\to$ use Sine Rule. NO (either SAS — two sides and included angle — or SSS — all three sides) $\\to$ use Cosine Rule.',
      },
    ],
    workedExamples: [
      {
        title: 'Cosine rule + area (Extended)',
        question: 'In $\\triangle ABC$, $AB = 8\\text{ cm}$, $AC = 11\\text{ cm}$, and $\\angle BAC = 65^\\circ$. Find $BC$ and the area of $\\triangle ABC$ to $3$ s.f.',
        marks: 5,
        steps: [
          'Use Cosine Rule (SAS): $BC^2 = 8^2 + 11^2 - 2(8)(11)\\cos 65^\\circ = 64 + 121 - 176(0.4226\\dots) = 110.619\\dots$',
          '$BC = \\sqrt{110.619\\dots} = 10.517\\dots \\approx 10.5\\text{ cm}$.',
          'Area $= \\frac{1}{2}(8)(11)\\sin 65^\\circ = 44(0.9063\\dots) = 39.877\\dots \\approx 39.9\\text{ cm}^2$.',
        ],
        answer: '$BC = 10.5\\text{ cm}$, Area $= 39.9\\text{ cm}^2$',
        markSchemeNotes: 'M1 Cosine rule setup, M1 $\\sqrt{110.6}$, A1 $10.5$, M1 $\\frac{1}{2}(8)(11)\\sin 65$, A1 $39.9$.',
      },
      {
        title: 'Ambiguous Case of the Sine Rule (Obtuse Angle, Extended)',
        question: 'In $\\triangle PQR$, $PQ = 9\\text{ cm}$, $QR = 6\\text{ cm}$, and $\\angle QPR = 35^\\circ$. Given that $\\angle PRQ$ is obtuse, calculate $\\angle PRQ$ to $1$ d.p.',
        marks: 3,
        steps: [
          'Apply Sine Rule: $\\frac{\\sin R}{9} = \\frac{\\sin 35^\\circ}{6} \\implies \\sin R = \\frac{9 \\sin 35^\\circ}{6} = 0.86036\\dots$',
          'Calculator gives the acute angle: $\\sin^{-1}(0.86036) = 59.357^\\circ$.',
          'Because $\\angle PRQ$ is obtuse, subtract from $180^\\circ$: $180^\\circ - 59.357^\\circ = 120.6^\\circ$.',
        ],
        answer: '$120.6^\\circ$',
        markSchemeNotes: 'M1 Sine Rule setup, A1 acute $59.4^\\circ$, A1 obtuse $120.6^\\circ$.',
      },
    ],
    commonMistakes: [
      'Evaluating $b^2 + c^2 - 2bc$ BEFORE multiplying by $\\cos A$ (violates BIDMAS).',
      'Forgetting that $\\cos(\\text{obtuse angle})$ is negative.',
    ],
    quickCheck: {
      id: 'qc-6.5',
      prompt: 'Find the area of $\\triangle PQR$ if $PQ = 10\\text{ cm}$, $PR = 12\\text{ cm}$, and $\\angle QPR = 30^\\circ$.',
      answer: '30',
      numericAnswer: 30,
      tolerance: 0,
      unit: 'cm²',
      hint: '$\\text{Area} = \\frac{1}{2}(10)(12)\\sin 30^\\circ$ and $\\sin 30^\\circ = 0.5$.',
      solution: '$\\frac{1}{2}(10)(12)(0.5) = 30\\text{ cm}^2$.',
    },
    sandbox: 'trigonometry-triangle',
  },
  {
    id: '6.6',
    chapterId: 6,
    code: '6.6',
    title: 'Pythagoras’ theorem and trigonometry in 3D',
    tier: 'Extended',
    summary: 'Solve 3D problems involving cuboids, pyramids, and wedges by identifying right-angled 2D cross-sections and angle between a line and a plane.',
    coreObjectives: [
      'Identify faces, edges, and vertices of 3D solids.',
    ],
    extendedObjectives: [
      'Solve trigonometrical problems in three dimensions, including finding the angle between a line and a plane.',
    ],
    keyFormulas: [
      { label: 'Space diagonal of a cuboid', latex: 'D = \\sqrt{l^2 + w^2 + h^2}' },
    ],
    studyNotes: [
      {
        heading: 'How to find the angle between a line $AG$ and a plane',
        body: '1. Drop a perpendicular from the upper endpoint $G$ straight down onto the plane (say point $C$ on the base). 2. Join $C$ to $A$ (this line $AC$ is the projection). 3. Draw the flat 2D right-angled triangle $\\triangle ACG$ separately and calculate $\\angle GAC$ using $\\tan$ or $\\sin$!',
      },
    ],
    workedExamples: [
      {
        title: 'Space diagonal and elevation angle in a cuboid (Extended)',
        question: 'A cuboid $ABCDEFGH$ has base $AB = 8\\text{ cm}$, $BC = 6\\text{ cm}$ and vertical height $CG = 5\\text{ cm}$. Find the angle $AG$ makes with the base $ABCD$ to $1$ d.p.',
        marks: 4,
        steps: [
          'Find base diagonal $AC = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10\\text{ cm}$.',
          'In vertical right-angled $\\triangle ACG$, $\\tan(\\angle GAC) = \\frac{CG}{AC} = \\frac{5}{10} = 0.5$.',
          '$\\angle GAC = \\tan^{-1}(0.5) = 26.565\\dots \\approx 26.6^\\circ$.',
        ],
        answer: '$26.6^\\circ$',
        markSchemeNotes: 'M1 for $AC = \\sqrt{8^2 + 6^2} = 10$, M1 for $\\tan \\theta = \\frac{5}{10}$, A1 for $26.6^\\circ$.',
      },
      {
        title: 'Angle between sloping triangular face and pyramid base (Extended)',
        question: 'A right square-based pyramid $VABCD$ has base side $10\\text{ cm}$ and vertical height $VM = 12\\text{ cm}$ ($M$ is base centre). Find the angle between triangular face $VBC$ and the horizontal base.',
        marks: 3,
        steps: [
          'Let $N$ be the midpoint of edge $BC$. Perpendicular distance $MN$ from centre $M$ to edge $BC$ is $\\frac{10}{2} = 5\\text{ cm}$.',
          'In vertical right-angled $\\triangle VMN$: $\\tan(\\angle VNM) = \\frac{VM}{MN} = \\frac{12}{5} = 2.4$.',
          '$\\angle VNM = \\tan^{-1}(2.4) = 67.38\\dots \\approx 67.4^\\circ$.',
        ],
        answer: '$67.4^\\circ$',
        markSchemeNotes: 'B1 for $MN = 5\\text{ cm}$, M1 $\\tan\\theta = \\frac{12}{5}$, A1 $67.4^\\circ$.',
      },
    ],
    commonMistakes: [
      'Using an edge of the base instead of the diagonal projection when calculating the angle with the base plane.',
    ],
    quickCheck: {
      id: 'qc-6.6',
      prompt: 'Find the length of the space diagonal of a cuboid with dimensions $3\\text{ cm} \\times 4\\text{ cm} \\times 12\\text{ cm}$.',
      answer: '13',
      numericAnswer: 13,
      tolerance: 0,
      unit: 'cm',
      hint: '$D = \\sqrt{3^2 + 4^2 + 12^2}$.',
      solution: '$\\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\text{ cm}$.',
    },
  },
];
