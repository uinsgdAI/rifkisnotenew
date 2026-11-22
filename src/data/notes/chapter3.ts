import type { SubtopicNote } from '../../types/syllabus';

export const CHAPTER_3_NOTES: SubtopicNote[] = [
  {
    id: '3.1',
    chapterId: 3,
    code: '3.1',
    title: 'Coordinates',
    tier: 'Core & Extended',
    summary: 'Read, plot, and interpret Cartesian coordinates $(x, y)$ across all four quadrants.',
    coreObjectives: [
      'Use and interpret Cartesian coordinates in two dimensions.',
    ],
    keyFormulas: [
      { label: 'Coordinate convention', latex: '(x, y) = (\\text{horizontal}, \\text{vertical})' },
    ],
    studyNotes: [
      {
        heading: 'Quadrants and symmetry in the plane',
        body: 'Always move horizontally along the $x$-axis first, then vertically along the $y$-axis. Points on the $x$-axis have $y = 0$; points on the $y$-axis have $x = 0$.',
      },
    ],
    workedExamples: [
      {
        title: 'Fourth vertex of a parallelogram',
        question: 'Points $A(1, 2)$, $B(5, 2)$, and $C(6, 5)$ are three vertices of parallelogram $ABCD$. Find the coordinates of $D$.',
        marks: 2,
        steps: [
          'Vector $\\vec{BA} = (-4, 0)$.',
          'Apply the same shift from $C(6, 5)$: $D = (6 - 4, 5 + 0) = (2, 5)$.',
        ],
        answer: '$(2, 5)$',
        markSchemeNotes: 'M1 for matching horizontal/vertical shift, A1 for $(2, 5)$.',
      },
    ],
    commonMistakes: [
      'Reversing $(x, y)$ as $(y, x)$ when reading points from a grid.',
    ],
    quickCheck: {
      id: 'qc-3.1',
      prompt: 'A point is at $(-3, 4)$ and translates $5$ units right and $6$ units down. What is its new $x$-coordinate?',
      answer: '2',
      numericAnswer: 2,
      tolerance: 0,
      hint: 'Add $5$ to $-3$.',
      solution: '$(-3 + 5, 4 - 6) = (2, -2)$, so the $x$-coordinate is $2$.',
    },
  },
  {
    id: '3.2',
    chapterId: 3,
    code: '3.2',
    title: 'Drawing linear graphs',
    tier: 'Core & Extended',
    summary: 'Draw straight-line graphs from equations in the form $y = mx + c$ or $ax + by = c$.',
    coreObjectives: [
      'Draw straight-line graphs for linear equations.',
    ],
    keyFormulas: [
      { label: 'Cover-up intercept method', latex: 'ax + by = c \\implies x\\text{-int } (\\tfrac{c}{a}, 0),\\ y\\text{-int } (0, \\tfrac{c}{b})' },
    ],
    studyNotes: [
      {
        heading: 'Plotting three points for verification',
        body: 'Two points define a line, but calculating THREE points catches arithmetic errors immediately: if the third point does not lie on the same straight ruler line, re-check your substitution!',
      },
    ],
    workedExamples: [
      {
        title: 'Finding intercepts of $2x + 3y = 12$',
        question: 'Find the coordinates where the line $2x + 3y = 12$ crosses the $x$-axis and $y$-axis.',
        marks: 2,
        steps: [
          'Crosses $x$-axis when $y = 0$: $2x = 12 \\implies x = 6 \\implies (6, 0)$.',
          'Crosses $y$-axis when $x = 0$: $3y = 12 \\implies y = 4 \\implies (0, 4)$.',
        ],
        answer: '$(6, 0)$ and $(0, 4)$',
        markSchemeNotes: 'B1 for $(6, 0)$, B1 for $(0, 4)$.',
      },
    ],
    commonMistakes: [
      'Drawing vertical lines $x = k$ horizontally or horizontal lines $y = k$ vertically.',
    ],
    quickCheck: {
      id: 'qc-3.2',
      prompt: 'At what $y$-value does the line $3x - 2y = 10$ cross the $y$-axis?',
      answer: '-5',
      numericAnswer: -5,
      tolerance: 0,
      hint: 'Substitute $x = 0$.',
      solution: '$-2y = 10 \\implies y = -5$.',
    },
    sandbox: 'linear-graph',
  },
  {
    id: '3.3',
    chapterId: 3,
    code: '3.3',
    title: 'Gradient of linear graphs',
    tier: 'Core & Extended',
    summary: 'Find the gradient of a straight line from a graph or from two coordinate pairs $(x_1, y_1)$ and $(x_2, y_2)$.',
    coreObjectives: [
      'Find the gradient of a straight line.',
    ],
    extendedObjectives: [
      'Calculate the gradient of a straight line from the coordinates of two points on it.',
    ],
    keyFormulas: [
      { label: 'Gradient formula', latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{Rise}}{\\text{Run}}' },
    ],
    studyNotes: [
      {
        heading: 'Checking sign and grid scales',
        body: 'Lines sloping upward left-to-right have positive gradient; lines sloping downward have negative gradient. When reading rise/run off a graph, ALWAYS read the axis numbers — do not count grid squares if the $x$ and $y$ axes have different scales!',
      },
    ],
    workedExamples: [
      {
        title: 'Gradient between two points',
        question: 'Find the gradient of the line joining $A(-2, 7)$ and $B(4, -5)$.',
        marks: 2,
        steps: [
          'Substitute into $m = \\frac{y_2 - y_1}{x_2 - x_1}$: $m = \\frac{-5 - 7}{4 - (-2)}$.',
          'Simplify: $m = \\frac{-12}{6} = -2$.',
        ],
        answer: '$-2$',
        markSchemeNotes: 'M1 for $\\frac{-5 - 7}{4 - (-2)}$, A1 for $-2$.',
      },
    ],
    commonMistakes: [
      'Putting $\\frac{x_2 - x_1}{y_2 - y_1}$ upside down instead of $\\frac{\\Delta y}{\\Delta x}$.',
      'Counting squares instead of reading axis scale values.',
    ],
    quickCheck: {
      id: 'qc-3.3',
      prompt: 'Find the gradient of the line passing through $(1, 3)$ and $(5, 19)$.',
      answer: '4',
      numericAnswer: 4,
      tolerance: 0,
      hint: '$\\frac{19 - 3}{5 - 1}$.',
      solution: '$m = \\frac{16}{4} = 4$.',
    },
    sandbox: 'linear-graph',
  },
  {
    id: '3.4',
    chapterId: 3,
    code: '3.4',
    title: 'Length and midpoint',
    tier: 'Extended',
    summary: 'Calculate the exact length and midpoint of a line segment joining two coordinate points.',
    coreObjectives: [
      'Find the midpoint of simple horizontal or vertical segments.',
    ],
    extendedObjectives: [
      'Calculate the length and the coordinates of the midpoint of a straight line from the coordinates of its end points.',
    ],
    keyFormulas: [
      { label: 'Length of segment', latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}' },
      { label: 'Midpoint', latex: 'M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)' },
    ],
    studyNotes: [
      {
        heading: 'Reversing the midpoint formula',
        body: 'If you are given one endpoint $A$ and the midpoint $M$, and asked for $B$, use the step-jump method: find the change in $x$ and $y$ from $A$ to $M$, then apply that exact same change from $M$ to $B$.',
      },
    ],
    workedExamples: [
      {
        title: 'Length and midpoint of $AB$ (Extended)',
        question: 'Points $A(-1, 4)$ and $B(5, -4)$ form a line segment. Find (a) the midpoint and (b) the length $AB$.',
        marks: 4,
        steps: [
          '(a) Midpoint $= \\left(\\frac{-1 + 5}{2}, \\frac{4 + (-4)}{2}\\right) = (2, 0)$.',
          '(b) $AB = \\sqrt{(5 - (-1))^2 + (-4 - 4)^2} = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.',
        ],
        answer: '(a) $(2, 0)$, (b) $10$',
        markSchemeNotes: 'B1 for $(2, 0)$, M1 for $6^2 + 8^2$, A1 for $10$.',
      },
    ],
    commonMistakes: [
      'Subtracting coordinates instead of averaging (adding and dividing by $2$) for the midpoint.',
    ],
    quickCheck: {
      id: 'qc-3.4',
      prompt: 'Find the length of the line segment joining $(1, 2)$ and $(4, 6)$.',
      answer: '5',
      numericAnswer: 5,
      tolerance: 0,
      hint: '$\\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{3^2 + 4^2}$.',
      solution: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$.',
    },
    sandbox: 'linear-graph',
  },
  {
    id: '3.5',
    chapterId: 3,
    code: '3.5',
    title: 'Equations of linear graphs',
    tier: 'Core & Extended',
    summary: 'Interpret and find the equation of a straight line in the form $y = mx + c$ or $ax + by = c$.',
    coreObjectives: [
      'Interpret and obtain the equation of a straight-line graph in the form $y = mx + c$.',
    ],
    keyFormulas: [
      { label: 'Slope-intercept form', latex: 'y = mx + c \\quad (m = \\text{gradient},\\ c = y\\text{-intercept})' },
      { label: 'Point-gradient equation', latex: 'y - y_1 = m(x - x_1)' },
    ],
    studyNotes: [
      {
        heading: 'Rearranging before reading gradient',
        body: 'Never read $m$ from $3x + 2y = 8$ as $3$! Always rearrange into $y = mx + c$ first: $2y = -3x + 8 \\implies y = -1.5x + 4$, so gradient $m = -1.5$ and $y$-intercept is $(0, 4)$.',
      },
    ],
    workedExamples: [
      {
        title: 'Line through two points',
        question: 'Find the equation of the straight line passing through $(2, 5)$ and $(6, 13)$.',
        marks: 3,
        steps: [
          'Gradient $m = \\frac{13 - 5}{6 - 2} = \\frac{8}{4} = 2$.',
          'Substitute $(2, 5)$ into $y = 2x + c$: $5 = 2(2) + c \\implies c = 1$.',
          'Equation: $y = 2x + 1$.',
        ],
        answer: '$y = 2x + 1$',
        markSchemeNotes: 'M1 for gradient $2$, M1 for substituting a point to find $c$, A1 for $y = 2x + 1$.',
      },
    ],
    commonMistakes: [
      'Reading $m$ from $ax + by = c$ without isolating $y$.',
    ],
    quickCheck: {
      id: 'qc-3.5',
      prompt: 'What is the gradient of the line $4x + 2y = 10$?',
      answer: '-2',
      numericAnswer: -2,
      tolerance: 0,
      hint: 'Rearrange into $y = mx + c$: $2y = -4x + 10$.',
      solution: '$y = -2x + 5$, so the gradient is $-2$.',
    },
    sandbox: 'linear-graph',
  },
  {
    id: '3.6',
    chapterId: 3,
    code: '3.6',
    title: 'Parallel lines',
    tier: 'Core & Extended',
    summary: 'Find the equation of a straight line parallel to a given line passing through a specified point.',
    coreObjectives: [
      'Determine the equation of a straight line parallel to a given line.',
    ],
    keyFormulas: [
      { label: 'Parallel condition', latex: 'L_1 \\parallel L_2 \\iff m_1 = m_2' },
    ],
    studyNotes: [
      {
        heading: 'Same gradient, new $y$-intercept',
        body: 'Parallel lines have the EXACT same gradient $m$. Copy $m$ from the reference line (after rearranging to $y = mx + c$ if needed), then substitute the given point $(x_1, y_1)$ to solve for the new $c$.',
      },
    ],
    workedExamples: [
      {
        title: 'Parallel line equation',
        question: 'Find the equation of the line parallel to $y = 3x - 7$ that passes through $(2, 1)$.',
        marks: 2,
        steps: [
          'Parallel gradient $m = 3$.',
          'Substitute $(2, 1)$ into $y = 3x + c$: $1 = 3(2) + c \\implies c = -5$.',
          'Equation: $y = 3x - 5$.',
        ],
        answer: '$y = 3x - 5$',
        markSchemeNotes: 'B1 for gradient $3$, A1 for $y = 3x - 5$.',
      },
    ],
    commonMistakes: [
      'Keeping the old $c$ value instead of solving for the new $y$-intercept.',
    ],
    quickCheck: {
      id: 'qc-3.6',
      prompt: 'A line is parallel to $y = 5x + 2$ and passes through $(1, 9)$. What is its $y$-intercept $c$?',
      answer: '4',
      numericAnswer: 4,
      tolerance: 0,
      hint: '$9 = 5(1) + c$.',
      solution: '$9 = 5 + c \\implies c = 4$.',
    },
    sandbox: 'linear-graph',
  },
  {
    id: '3.7',
    chapterId: 3,
    code: '3.7',
    title: 'Perpendicular lines',
    tier: 'Extended',
    summary: 'Find gradients and equations of perpendicular lines and perpendicular bisectors of line segments.',
    coreObjectives: [
      'Recognise right-angled intersections on coordinate axes.',
    ],
    extendedObjectives: [
      'Find the gradient of parallel and perpendicular lines and determine the equation of a perpendicular bisector.',
    ],
    keyFormulas: [
      { label: 'Perpendicular gradients', latex: 'm_1 \\times m_2 = -1 \\iff m_2 = -\\frac{1}{m_1}' },
    ],
    studyNotes: [
      {
        heading: 'Finding a perpendicular bisector in 4 steps',
        body: 'To find the perpendicular bisector of segment $AB$: (1) Find the midpoint $M$ of $AB$. (2) Find the gradient $m_{AB}$. (3) Take the negative reciprocal $m_{\\perp} = -\\frac{1}{m_{AB}}$. (4) Substitute $M$ and $m_{\\perp}$ into $y = mx + c$.',
      },
    ],
    workedExamples: [
      {
        title: 'Perpendicular bisector (Extended)',
        question: 'Find the equation of the perpendicular bisector of $A(1, 2)$ and $B(5, 10)$.',
        marks: 4,
        steps: [
          'Midpoint $M = \\left(\\frac{1+5}{2}, \\frac{2+10}{2}\\right) = (3, 6)$.',
          'Gradient $m_{AB} = \\frac{10 - 2}{5 - 1} = \\frac{8}{4} = 2$.',
          'Perpendicular gradient $m_{\\perp} = -\\frac{1}{2}$.',
          'Substitute $(3, 6)$: $6 = -\\frac{1}{2}(3) + c \\implies c = 7.5$. Equation: $y = -0.5x + 7.5$.',
        ],
        answer: '$y = -\\frac{1}{2}x + \\frac{15}{2}$',
        markSchemeNotes: 'B1 midpoint $(3, 6)$, B1 $m_{AB}=2$, M1 $m_{\\perp}=-0.5$, A1 equation.',
      },
    ],
    commonMistakes: [
      'Taking only the reciprocal ($\\frac{1}{m}$) or only the negative ($-m$) instead of BOTH negative AND reciprocal.',
      'Using an endpoint $A$ or $B$ instead of the midpoint $M$ for a perpendicular bisector.',
    ],
    quickCheck: {
      id: 'qc-3.7',
      prompt: 'A line has gradient $\\frac{2}{3}$. What is the gradient of a line perpendicular to it? (Enter as decimal or -a/b)',
      answer: '-1.5',
      acceptedAnswers: ['-1.5', '-3/2'],
      numericAnswer: -1.5,
      tolerance: 0.001,
      hint: 'Flip the fraction and change the sign.',
      solution: '$m_{\\perp} = -\\frac{1}{2/3} = -\\frac{3}{2} = -1.5$.',
    },
    sandbox: 'linear-graph',
  },
];
