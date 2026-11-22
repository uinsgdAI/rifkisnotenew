import type { SubtopicNote } from '../../types/syllabus';

export const CHAPTER_7_NOTES: SubtopicNote[] = [
  {
    id: '7.1',
    chapterId: 7,
    code: '7.1',
    title: 'Transformations',
    tier: 'Core & Extended',
    summary: 'Perform and describe single reflections, rotations, translations, and enlargements (including negative and fractional scale factors).',
    coreObjectives: [
      'Reflect simple plane figures in horizontal, vertical, or diagonal mirror lines ($y = \\pm x$).',
      'Rotate simple plane figures about a centre by multiples of $90^\\circ$.',
      'Construct given translations and enlargements (positive and fractional scale factors).',
      'Recognise and describe reflections, rotations, translations and enlargements.',
    ],
    extendedObjectives: [
      'Perform and describe enlargements with negative scale factors.',
    ],
    keyFormulas: [
      { label: 'Reflection description', latex: '\\text{Reflection + mirror line equation (e.g. } y = x\\text{)}' },
      { label: 'Rotation description', latex: '\\text{Rotation + angle + direction (CW/ACW) + centre } (x, y)' },
      { label: 'Translation description', latex: '\\text{Translation + column vector } \\begin{pmatrix} h \\\\ k \\end{pmatrix}' },
      { label: 'Enlargement description', latex: '\\text{Enlargement + scale factor } k + \\text{centre } (x, y)' },
    ],
    studyNotes: [
      {
        heading: 'Exact phrasing required to earn full description marks',
        body: 'Cambridge strictly requires ONE transformation name only (never write "move" or "enlarged and rotated") plus all parameters. For enlargement with negative scale factor $k = -2$ from centre $(1, 1)$, measure the vector from the centre to each vertex and multiply by $-2$ (reversing direction to the opposite side of the centre).',
      },
    ],
    workedExamples: [
      {
        title: 'Negative scale factor enlargement (Extended)',
        question: 'Triangle $A$ has vertex $P(3, 2)$. It is enlarged by scale factor $-2$ about centre $(1, 1)$. Find the image $P\'$.',
        marks: 2,
        steps: [
          'Vector from centre $(1, 1)$ to $P(3, 2)$ is $\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$.',
          'Multiply by $-2$: $\\begin{pmatrix} -4 \\\\ -2 \\end{pmatrix}$.',
          'Add to centre: $(1 - 4, 1 - 2) = (-3, -1)$.',
        ],
        answer: '$(-3, -1)$',
        markSchemeNotes: 'M1 for vector from centre $\\times (-2)$, A1 for $(-3, -1)$.',
      },
    ],
    commonMistakes: [
      'Giving two transformations when the question states "Describe fully the SINGLE transformation".',
      'Forgetting the direction (clockwise or anticlockwise) on a $90^\\circ$ rotation.',
    ],
    quickCheck: {
      id: 'qc-7.1',
      prompt: 'Point $(4, -1)$ is reflected in the line $y = x$. What is the $x$-coordinate of its image?',
      answer: '-1',
      numericAnswer: -1,
      tolerance: 0,
      hint: 'Reflection in $y = x$ swaps $(x, y) \\mapsto (y, x)$.',
      solution: 'Image is $(-1, 4)$, so its $x$-coordinate is $-1$.',
    },
  },
  {
    id: '7.2',
    chapterId: 7,
    code: '7.2',
    title: 'Vectors in two dimensions',
    tier: 'Extended',
    summary: 'Describe translations using column vectors, add and subtract vectors, and multiply vectors by scalars.',
    coreObjectives: [
      'Describe translations using column vectors.',
    ],
    extendedObjectives: [
      'Add and subtract vectors and multiply a vector by a scalar.',
      'Understand position vectors $\\vec{OA} = \\mathbf{a}$ and displacement vectors $\\vec{AB} = \\mathbf{b} - \\mathbf{a}$.',
    ],
    keyFormulas: [
      { label: 'Column vector arithmetic', latex: '\\begin{pmatrix} x_1 \\\\ y_1 \\end{pmatrix} + \\begin{pmatrix} x_2 \\\\ y_2 \\end{pmatrix} = \\begin{pmatrix} x_1 + x_2 \\\\ y_1 + y_2 \\end{pmatrix}' },
      { label: 'Displacement vector', latex: '\\vec{AB} = \\vec{OB} - \\vec{OA} = \\mathbf{b} - \\mathbf{a}' },
    ],
    studyNotes: [
      {
        heading: 'Column vectors are NOT fractions!',
        body: 'Never draw a horizontal fraction line inside $\\begin{pmatrix} 3 \\\\ -5 \\end{pmatrix}$. Remember the top number is horizontal ($x$: right $+$ / left $-$) and the bottom number is vertical ($y$: up $+$ / down $-$).',
      },
    ],
    workedExamples: [
      {
        title: 'Vector linear combination (Extended)',
        question: 'Given $\\mathbf{p} = \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$ and $\\mathbf{q} = \\begin{pmatrix} -1 \\\\ 4 \\end{pmatrix}$, calculate $2\\mathbf{p} - 3\\mathbf{q}$.',
        marks: 2,
        steps: [
          '$2\\mathbf{p} = \\begin{pmatrix} 6 \\\\ -4 \\end{pmatrix}$ and $3\\mathbf{q} = \\begin{pmatrix} -3 \\\\ 12 \\end{pmatrix}$.',
          'Subtract: $\\begin{pmatrix} 6 - (-3) \\\\ -4 - 12 \\end{pmatrix} = \\begin{pmatrix} 9 \\\\ -16 \\end{pmatrix}$.',
        ],
        answer: '$\\begin{pmatrix} 9 \\\\ -16 \\end{pmatrix}$',
        markSchemeNotes: 'M1 for either scalar multiple, A1 for $\\begin{pmatrix} 9 \\\\ -16 \\end{pmatrix}$.',
      },
    ],
    commonMistakes: [
      'Computing $\\vec{AB}$ as $\\mathbf{a} - \\mathbf{b}$ instead of $\\mathbf{b} - \\mathbf{a}$.',
    ],
    quickCheck: {
      id: 'qc-7.2',
      prompt: 'If $\\vec{OA} = \\begin{pmatrix} 2 \\\\ 7 \\end{pmatrix}$ and $\\vec{OB} = \\begin{pmatrix} 6 \\\\ 1 \\end{pmatrix}$, what is the top ($x$) component of $\\vec{AB}$?',
      answer: '4',
      numericAnswer: 4,
      tolerance: 0,
      hint: '$\\vec{AB} = \\vec{OB} - \\vec{OA}$.',
      solution: '$\\vec{AB} = \\begin{pmatrix} 6 - 2 \\\\ 1 - 7 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix}$, so top component is $4$.',
    },
  },
  {
    id: '7.3',
    chapterId: 7,
    code: '7.3',
    title: 'Magnitude of a vector',
    tier: 'Extended',
    summary: 'Calculate the magnitude $|\\mathbf{v}|$ of a two-dimensional vector using Pythagoras’ theorem.',
    coreObjectives: [
      'Relate horizontal and vertical vector components to a right-angled triangle.',
    ],
    extendedObjectives: [
      'Calculate the magnitude of a vector $\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ as $\\sqrt{x^2 + y^2}$.',
    ],
    keyFormulas: [
      { label: 'Vector magnitude', latex: '\\left|\\begin{pmatrix} x \\\\ y \\end{pmatrix}\\right| = \\sqrt{x^2 + y^2}' },
    ],
    studyNotes: [
      {
        heading: 'Squaring negative components',
        body: 'Magnitude is a length and is ALWAYS non-negative. When a component is negative, e.g. $\\begin{pmatrix} -5 \\\\ 12 \\end{pmatrix}$, $(-5)^2 = +25$, so $|\\mathbf{v}| = \\sqrt{25 + 144} = 13$.',
      },
    ],
    workedExamples: [
      {
        title: 'Magnitude of a displacement vector (Extended)',
        question: 'Points $P$ and $Q$ have position vectors $\\begin{pmatrix} 1 \\\\ 5 \\end{pmatrix}$ and $\\begin{pmatrix} 7 \\\\ -3 \\end{pmatrix}$. Find $|\\vec{PQ}|$.',
        marks: 3,
        steps: [
          '$\\vec{PQ} = \\begin{pmatrix} 7 - 1 \\\\ -3 - 5 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -8 \\end{pmatrix}$.',
          '$|\\vec{PQ}| = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.',
        ],
        answer: '$10$',
        markSchemeNotes: 'B1 for $\\begin{pmatrix} 6 \\\\ -8 \\end{pmatrix}$, M1 for $\\sqrt{6^2 + (-8)^2}$, A1 for $10$.',
      },
    ],
    commonMistakes: [
      'Evaluating $(-8)^2$ as $-64$ on a calculator without brackets.',
    ],
    quickCheck: {
      id: 'qc-7.3',
      prompt: 'Find the magnitude of $\\mathbf{v} = \\begin{pmatrix} 8 \\\\ -15 \\end{pmatrix}$.',
      answer: '17',
      numericAnswer: 17,
      tolerance: 0,
      hint: '$\\sqrt{8^2 + (-15)^2}$.',
      solution: '$\\sqrt{64 + 225} = \\sqrt{289} = 17$.',
    },
  },
  {
    id: '7.4',
    chapterId: 7,
    code: '7.4',
    title: 'Vector geometry',
    tier: 'Extended',
    summary: 'Express geometric paths in terms of given base vectors $\\mathbf{a}$ and $\\mathbf{b}$, split segments in ratios, and prove parallelism and collinearity.',
    coreObjectives: [
      'Follow directed line segments along polygon edges.',
    ],
    extendedObjectives: [
      'Represent vectors by directed line segments and use the sum and difference of two vectors to express given vectors in terms of two coplanar vectors.',
      'Use vector properties to show that two vectors are parallel or three points are collinear.',
    ],
    keyFormulas: [
      { label: 'Parallel & Collinear criterion', latex: '\\vec{PQ} = k\\vec{PR} \\implies PQ \\parallel PR \\text{ (and } P, Q, R \\text{ collinear)}' },
    ],
    studyNotes: [
      {
        heading: 'Proving collinearity in 2 sentences',
        body: 'To show points $A, B, C$ lie on a straight line (are collinear): (1) Find simplified expressions for $\\vec{AB}$ and $\\vec{BC}$ (or $\\vec{AC}$). (2) Show $\\vec{AC} = k\\vec{AB}$ (stating they are scalar multiples / parallel) AND explicitly state that they share a common point ($A$ or $B$). Without mentioning the common point, you lose the final explanation mark!',
      },
    ],
    workedExamples: [
      {
        title: 'Vector path with ratio point (Extended)',
        question: 'In $\\triangle OAB$, $\\vec{OA} = \\mathbf{a}$ and $\\vec{OB} = \\mathbf{b}$. $M$ lies on $AB$ such that $AM : MB = 1 : 2$. Find $\\vec{OM}$ in terms of $\\mathbf{a}$ and $\\mathbf{b}$.',
        marks: 3,
        steps: [
          'Find $\\vec{AB} = \\vec{AO} + \\vec{OB} = -\\mathbf{a} + \\mathbf{b}$.',
          'Since $AM : MB = 1 : 2$, $\\vec{AM} = \\frac{1}{3}\\vec{AB} = \\frac{1}{3}(\\mathbf{b} - \\mathbf{a})$.',
          '$\\vec{OM} = \\vec{OA} + \\vec{AM} = \\mathbf{a} + \\frac{1}{3}\\mathbf{b} - \\frac{1}{3}\\mathbf{a} = \\frac{2}{3}\\mathbf{a} + \\frac{1}{3}\\mathbf{b}$.',
        ],
        answer: '$\\frac{2}{3}\\mathbf{a} + \\frac{1}{3}\\mathbf{b}$',
        markSchemeNotes: 'B1 for $\\vec{AB} = \\mathbf{b} - \\mathbf{a}$, M1 for $\\mathbf{a} + \\frac{1}{3}(\\mathbf{b} - \\mathbf{a})$, A1 simplified.',
      },
      {
        title: 'Collinearity proof and area ratio (Extended Paper 4)',
        question: 'In $\\triangle OAB$, $\\vec{OA} = \\mathbf{a}$, $\\vec{OB} = \\mathbf{b}$. $P$ is on $OA$ with $OP = \\frac{2}{3}OA$, and $Q$ is the midpoint of $AB$. $R$ is extended beyond $B$ so $\\vec{OR} = 2\\mathbf{b}$. Show that $P, Q, R$ are collinear.',
        marks: 4,
        steps: [
          'Find $\\vec{OQ} = \\mathbf{a} + \\frac{1}{2}(\\mathbf{b} - \\mathbf{a}) = \\frac{1}{2}\\mathbf{a} + \\frac{1}{2}\\mathbf{b}$.',
          '$\\vec{PQ} = \\vec{OQ} - \\vec{OP} = \\left(\\frac{1}{2}\\mathbf{a} + \\frac{1}{2}\\mathbf{b}\\right) - \\frac{2}{3}\\mathbf{a} = -\\frac{1}{6}\\mathbf{a} + \\frac{1}{2}\\mathbf{b} = \\frac{1}{6}(3\\mathbf{b} - \\mathbf{a})$.',
          '$\\vec{PR} = \\vec{OR} - \\vec{OP} = 2\\mathbf{b} - \\frac{2}{3}\\mathbf{a} = \\frac{2}{3}(3\\mathbf{b} - \\mathbf{a}) = 4\\vec{PQ}$.',
          'Since $\\vec{PR} = 4\\vec{PQ}$ (parallel) and both vectors share point $P$, $P, Q, R$ are collinear.',
        ],
        answer: '$\\vec{PR} = 4\\vec{PQ}$ with common point $P$',
        markSchemeNotes: 'M1 $\\vec{PQ}$, M1 $\\vec{PR}$, A1 scalar multiple $+ $ shared point $P$.',
      },
    ],
    commonMistakes: [
      'Using $\\frac{1}{2}$ instead of $\\frac{1}{3}$ when given ratio $1 : 2$ (total parts $= 1 + 2 = 3$).',
      'Proving two vectors are parallel without noting the shared point for collinearity.',
    ],
    quickCheck: {
      id: 'qc-7.4',
      prompt: 'If $\\vec{PQ} = 2\\mathbf{a} + 6\\mathbf{b}$ and $\\vec{QR} = 3\\mathbf{a} + 9\\mathbf{b}$, then $\\vec{QR} = k\\vec{PQ}$. What is $k$?',
      answer: '1.5',
      acceptedAnswers: ['1.5', '3/2'],
      numericAnswer: 1.5,
      tolerance: 0.001,
      hint: 'Factor out $2$ from $\\vec{PQ}$ and $3$ from $\\vec{QR}$.',
      solution: '$\\vec{PQ} = 2(\\mathbf{a} + 3\\mathbf{b})$ and $\\vec{QR} = 3(\\mathbf{a} + 3\\mathbf{b})$, so $k = \\frac{3}{2} = 1.5$.',
    },
  },
];
