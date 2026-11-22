import type { SubtopicNote, WorkedExample } from '../../types/syllabus';

export interface TextbookEnrichment {
  bigIdea: string;
  stepByStepMethod: string[];
  comparisonTable: NonNullable<SubtopicNote['comparisonTable']>;
  extraStudyNotes: SubtopicNote['studyNotes'];
  extraWorkedExamples: WorkedExample[];
  rapidSummary: NonNullable<SubtopicNote['rapidSummary']>;
}

export const TEXTBOOK_GUIDE_1_TO_4: Record<string, TextbookEnrichment> = {
  '1.1': {
    bigIdea: 'Every whole number above $1$ has a unique "prime DNA" (prime factorisation). Once you break numbers down into prime factors, comparing what they share gives the HCF, while combining their highest powers gives the LCM.',
    stepByStepMethod: [
      'Divide the integer repeatedly by the smallest prime ($2, 3, 5, 7, \\dots$) until you reach $1$.',
      'Write each number as a product of primes using index notation (e.g. $120 = 2^3 \\times 3 \\times 5$).',
      'For HCF, circle only primes present in ALL numbers and multiply the LOWEST power of each.',
      'For LCM, include EVERY prime from ANY number and multiply the HIGHEST power of each.',
    ],
    comparisonTable: {
      title: 'Number Classification Quick Reference',
      headers: ['Number Family', 'Definition', 'Examples', 'Exam Watch-out'],
      rows: [
        ['Prime number', 'Integer $> 1$ with exactly $2$ distinct factors', '$2, 3, 5, 7, 11, 13$', '$1$ is NOT prime; $2$ is the only even prime'],
        ['Rational ($\\mathbb{Q}$)', 'Expressible as $\\frac{p}{q}$ ($p,q\\in\\mathbb{Z}, q\\neq 0$)', '$-4, \\frac{3}{7}, 0.25, 0.\\dot{3}$', 'All recurring decimals are rational'],
        ['Irrational', 'Non-terminating, non-repeating decimal', '$\\sqrt{2}, \\sqrt{5}, \\pi, 3\\pi$', '$\\sqrt{9}=3$ is rational, not irrational'],
        ['Reciprocal of $x$', 'Multiplicative inverse $\\frac{1}{x}$', 'Reciprocal of $\\frac{3}{4}$ is $\\frac{4}{3}$', '$0$ has no reciprocal'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Using Prime Factors to Test for Square & Cube Numbers (Coursebook Ch. 1.3–1.4 Method)',
        body: 'In Morrison & Hamshaw’s Cambridge Coursebook exercises, you are often asked for the smallest positive integer $k$ that makes $N \\times k$ a perfect square or perfect cube. A number is a perfect square if and only if EVERY exponent in its prime factorisation is even (multiples of $2$); it is a perfect cube if and only if EVERY exponent is a multiple of $3$. Multiply by the missing prime factors needed to bump incomplete exponents up to the next multiple of $2$ or $3$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding $k$ to make a perfect square',
        question: 'Given $140 = 2^2 \\times 5 \\times 7$, find the smallest positive integer $k$ such that $140k$ is a square number.',
        marks: 2,
        steps: [
          'Inspect exponents in $2^2 \\times 5^1 \\times 7^1$: the power of $2$ is already even ($2$), while $5$ and $7$ each have exponent $1$ (odd).',
          'Multiply by $5 \\times 7 = 35$ so that $140k = 2^2 \\times 5^2 \\times 7^2 = (2 \\times 5 \\times 7)^2 = 70^2$.',
        ],
        answer: '$k = 35$',
        markSchemeNotes: 'M1 for identifying odd powers of $5$ and $7$, A1 for $k = 35$.',
      },
    ],
    rapidSummary: [
      { rule: 'HCF vs LCM', detail: 'HCF takes shared primes (lowest powers); LCM takes all primes (highest powers).' },
      { rule: 'Prime test', detail: '$1$ is not prime; $2$ is the smallest and only even prime.' },
      { rule: 'Product check', detail: 'For two numbers $a$ and $b$, $\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b$.' },
    ],
  },
  '1.2': {
    bigIdea: 'Sets are well-defined collections and Venn diagrams turn logical words ("AND", "OR", "NOT") into visual regions you can shade and count systematically without double-counting overlaps.',
    stepByStepMethod: [
      'List $\\mathscr{E}$ cleanly first whenever elements are finite integers.',
      'Fill in Venn diagrams from the CENTRE intersection outward ($A \\cap B \\cap C \\to$ pairs $\\to$ single regions $\\to$ outside $(A \\cup B)\'$).',
      'Translate symbols carefully: $\\cap$ means "and" (overlap), $\\cup$ means "or" (combined), and $\'$ means "not" (complement).',
      'Check that every region in the rectangle sums back to $n(\\mathscr{E})$.',
    ],
    comparisonTable: {
      title: 'Cambridge 0580 Set Notation Guide',
      headers: ['Symbol', 'Meaning', 'Venn Region Description'],
      rows: [
        ['$A \\cap B$', 'Intersection ($A$ AND $B$)', 'Only the overlapping lens between $A$ and $B$'],
        ['$A \\cup B$', 'Union ($A$ OR $B$)', 'Everything inside circle $A$, circle $B$, or both'],
        ['$A\'$', 'Complement (NOT $A$)', 'Everything inside $\\mathscr{E}$ outside circle $A$'],
        ['$A \\cap B\'$', 'In $A$ ONLY (not $B$)', 'Crescent of $A$ excluding overlap with $B$'],
        ['$A \\subset B$', 'Proper subset', 'Circle $A$ sits completely inside circle $B$ ($A \\neq B$)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Three-Set Venn Diagrams & Algebraic Regions (Extended)',
        body: 'In Paper 4, an unknown $x$ is often placed in the triple intersection $n(A \\cap B \\cap C) = x$. Express every two-way overlap as $(\\text{given pair total} - x)$ so the central region is not counted twice, then build an equation summing all eight regions (including outside) equal to $n(\\mathscr{E})$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Shading and set-builder notation',
        question: 'If $\\mathscr{E} = \\{1, 2, 3, \\dots, 10\\}$, $P = \\{\\text{primes}\\}$, and $E = \\{\\text{even numbers}\\}$, list the elements of $P\' \\cap E$.',
        marks: 2,
        steps: [
          'List $P = \\{2, 3, 5, 7\\}$ so $P\' = \\{1, 4, 6, 8, 9, 10\\}$.',
          'List $E = \\{2, 4, 6, 8, 10\\}$. Take elements in BOTH $P\'$ and $E$.',
        ],
        answer: '$\\{4, 6, 8, 10\\}$',
        markSchemeNotes: 'M1 for $P$ or $P\'$ listed correctly, A1 for $\\{4, 6, 8, 10\\}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Inclusion–Exclusion', detail: '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$ prevents double counting.' },
      { rule: '$n(\\emptyset) = 0$', detail: 'The empty set has zero elements; write $\\emptyset$, never $\\{\\emptyset\\}$.' },
      { rule: 'Fill order', detail: 'Always populate the centre intersection first, then subtract to find outer crescents.' },
    ],
  },
  '1.3': {
    bigIdea: 'Powers compress repeated multiplication ($a^n$), while roots undo powers. For decimals, track decimal places carefully because squaring doubles decimal places while taking a square root halves them.',
    stepByStepMethod: [
      'Separate the sign, integer digits, and decimal place shift before taking roots mentally.',
      'Check if the root index is even (requires a non-negative base in real numbers) or odd (preserves minus signs).',
      'Group perfect-square or perfect-cube factors under large radicals to simplify without a calculator.',
    ],
    comparisonTable: {
      title: 'Benchmark Squares, Cubes & Decimal Roots',
      headers: ['Expression', 'Value', 'Decimal Pattern'],
      rows: [
        ['$11^2, 12^2, 13^2, 14^2, 15^2$', '$121, 144, 169, 196, 225$', '$\\sqrt{1.96} = 1.4$ (halve $2$ d.p. to $1$ d.p.)'],
        ['$2^3, 3^3, 4^3, 5^3, 6^3$', '$8, 27, 64, 125, 216$', '$\\sqrt[3]{0.008} = 0.2$ (divide $3$ d.p. by $3$)'],
        ['$\\sqrt[3]{-125}$', '$-5$', 'Negative base stays negative for odd roots'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Estimating & Bounding Irrational Roots on Paper 1 / Paper 2',
        body: 'To estimate $\\sqrt{50}$ without a calculator, sandwich $50$ between consecutive square numbers: $49 < 50 < 64 \\implies 7 < \\sqrt{50} < 8$. Since $50$ is just above $49$, $\\sqrt{50} \\approx 7.07$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Cube root of a decimal without calculator',
        question: 'Evaluate $\\sqrt[3]{0.027} \\times \\sqrt{0.04}$.',
        marks: 2,
        steps: [
          'Convert to fractions: $\\sqrt[3]{\\frac{27}{1000}} = \\frac{3}{10} = 0.3$.',
          '$\\sqrt{\\frac{4}{100}} = \\frac{2}{10} = 0.2$. Multiply: $0.3 \\times 0.2 = 0.06$.',
        ],
        answer: '$0.06$',
        markSchemeNotes: 'B1 for $0.3$ and $0.2$, A1 for $0.06$.',
      },
    ],
    rapidSummary: [
      { rule: 'Principal root $\\sqrt{x}$', detail: '$\\sqrt{25} = +5$, whereas solving $x^2 = 25$ gives $x = \\pm 5$.' },
      { rule: 'Decimal places under roots', detail: 'Convert $0.0064$ to $\\frac{64}{10000}$ so $\\sqrt{0.0064} = \\frac{8}{100} = 0.08$.' },
    ],
  },
  '1.4': {
    bigIdea: 'Fractions, decimals, and percentages are three languages for the exact same proportion. In Extended algebra, recurring decimals turn into exact fractions by shifting decimal places so the infinite repeating tail cancels out completely.',
    stepByStepMethod: [
      'Write $x = \\text{decimal}$ with digits expanded past the repeating block.',
      'Multiply by $10^k$ to align the start of the repeating tail just after the decimal point (if non-repeating digits precede it).',
      'Multiply again by $10^r$ (where $r$ is the repeating cycle length) and subtract so the infinite tails cancel.',
      'Divide and cancel common factors until the fraction is in simplest form.',
    ],
    comparisonTable: {
      title: 'Core Equivalences & Recurring Decimal Templates',
      headers: ['Fraction', 'Decimal', 'Percentage'],
      rows: [
        ['$\\frac{1}{8}, \\frac{3}{8}, \\frac{5}{8}, \\frac{7}{8}$', '$0.125, 0.375, 0.625, 0.875$', '$12.5\\%, 37.5\\%, 62.5\\%, 87.5\\%$'],
        ['$\\frac{1}{3}, \\frac{2}{3}$', '$0.\\dot{3}, 0.\\dot{6}$', '$33.\\dot{3}\\%, 66.\\dot{6}\\%$'],
        ['$\\frac{1}{6}, \\frac{5}{6}$', '$0.1\\dot{6}, 0.8\\dot{3}$', '$16.\\dot{6}\\%, 83.\\dot{3}\\%$'],
        ['$\\frac{1}{20}, \\frac{1}{25}, \\frac{1}{40}$', '$0.05, 0.04, 0.025$', '$5\\%, 4\\%, 2.5\\%$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Ordering Mixed Fractions, Decimals & Percentages',
        body: 'In Core Paper 1, convert every number to decimals (to 3 or 4 decimal places) OR to percentages before comparing sizes. Never compare numerators of fractions with different denominators directly.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Mixed recurring decimal proof (Extended)',
        question: 'Show algebraically that $0.4\\dot{7} = \\frac{43}{90}$.',
        marks: 2,
        steps: [
          'Let $x = 0.4777\\dots$, so $10x = 4.777\\dots$ and $100x = 47.777\\dots$.',
          'Subtract: $100x - 10x = 47.777\\dots - 4.777\\dots \\implies 90x = 43 \\implies x = \\frac{43}{90}$.',
        ],
        answer: '$\\frac{43}{90}$ (shown)',
        markSchemeNotes: 'M1 for $100x - 10x$, A1 for $90x = 43 \\implies \\frac{43}{90}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Percent means per 100', detail: 'To convert any fraction or decimal to $\\%$, multiply by $100$.' },
      { rule: 'Tail-cancellation rule', detail: 'For $1$ repeating digit multiply by $10$; for $2$ repeating digits multiply by $100$.' },
    ],
  },
  '1.5': {
    bigIdea: 'Inequality symbols ($<, >, \\le, \\ge$) act as strict comparators on the number line: numbers further to the right are always greater, so $-2$ is greater than $-5$.',
    stepByStepMethod: [
      'Convert all values in a mixed list into aligned decimals (e.g. $4$ d.p.) before sorting.',
      'For negative numbers, remember larger magnitude means smaller value ($-3.8 < -3.2$).',
      'Read inequality boundaries carefully: $x > 3$ excludes $3$, while $x \\ge 3$ includes $3$.',
    ],
    comparisonTable: {
      title: 'Inequality Symbols & Number-Line Conventions',
      headers: ['Symbol', 'Meaning', 'Integer Example ($x \\in \\mathbb{Z}$)', 'Graph / Boundary Circle'],
      rows: [
        ['$<$', 'Strictly less than', '$x < 4 \\implies \\dots, 1, 2, 3$', 'Open hollow circle $\\circ$'],
        ['$\\le$', 'Less than or equal to', '$x \\le 4 \\implies \\dots, 2, 3, 4$', 'Filled solid circle $\\bullet$'],
        ['$>$', 'Strictly greater than', '$x > -2 \\implies -1, 0, 1, \\dots$', 'Open hollow circle $\\circ$'],
        ['$\\neq$', 'Not equal to', '$x \\neq 0$', 'Exclude endpoint'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Comparing Negative Decimals & Fractions',
        body: 'Write positive equivalents side-by-side first, then reverse the order when negative signs are restored. For example, $0.625 > 0.6$, so $-0.625 < -0.6$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Ordering mixed numbers',
        question: 'Arrange in ascending order: $0.62$, $\\frac{5}{8}$, $61.5\\%$, $\\frac{3}{5}$.',
        marks: 2,
        steps: [
          'Convert all to decimals: $0.620$, $\\frac{5}{8}=0.625$, $61.5\\%=0.615$, $\\frac{3}{5}=0.600$.',
          'Order smallest to largest: $0.600 < 0.615 < 0.620 < 0.625$.',
        ],
        answer: '$\\frac{3}{5},\\ 61.5\\%,\\ 0.62,\\ \\frac{5}{8}$',
        markSchemeNotes: 'M1 for converting at least two correctly, A1 for exact original list in ascending order.',
      },
    ],
    rapidSummary: [
      { rule: 'Rewrite using original values', detail: 'After converting to decimals to sort, always write your final answer using the question\'s original forms.' },
      { rule: 'Negative ordering', detail: '$-10 < -1$ because $-10$ sits further left on the number line.' },
    ],
  },
  '1.6': {
    bigIdea: 'BODMAS enforces a single universal grammar for arithmetic expressions (Brackets / Of-Indices / Divide-Multiply / Add-Subtract), treating fraction bars and radical roots as grouping symbols alongside parentheses.',
    stepByStepMethod: [
      'Evaluate inside grouping symbols first—brackets $( )$, $[ ]$, horizontal fraction bars, and root signs $\\sqrt{\\dots}$—working from innermost to outermost.',
      'Compute powers and roots ("Of" / Indices) next.',
      'Perform Division and Multiplication left-to-right.',
      'Perform Addition and Subtraction left-to-right; convert mixed numbers to improper fractions before multiplying or dividing.',
    ],
    comparisonTable: {
      title: 'BODMAS & Fraction Operations (Coursebook Ch. 1.5–1.6 & 5.2)',
      headers: ['Operation', 'Exact Method', 'Common Error to Avoid'],
      rows: [
        ['Grouping symbols', 'Work inside parentheses, fraction bars, and roots first', 'Never divide across a fraction bar before simplifying top & bottom'],
        ['Add / Subtract fractions', 'Find Lowest Common Denominator, adjust numerators', 'Never add denominators across'],
        ['Multiply fractions', 'Cross-cancel common factors, multiply top $\\times$ top and bottom $\\times$ bottom', 'Convert mixed numbers to improper first'],
        ['Divide fractions', 'Keep first, Change $\\div$ to $\\times$, Flip second (KCF)', 'Only flip the divisor, never the first fraction'],
        ['Directed numbers', 'Same signs $\\to +$; Different signs $\\to -$', 'Keep $-(-a) = +a$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Grouping Symbols & Showing Method (Coursebook Ch. 1.6)',
        body: 'In Papers 1 and 2, Cambridge mark schemes explicitly award method marks (`M1`) ONLY if you respect grouping symbols (brackets, fraction bars, and roots) and show conversion of mixed numbers to improper fractions with common denominators (for $+ / -$) or the inverted divisor (for $\\div$).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Mixed number subtraction & division',
        question: 'Work out $2\\frac{1}{3} \\div \\left(1\\frac{1}{4} - \\frac{1}{2}\\right)$ without a calculator.',
        marks: 3,
        steps: [
          'Evaluate bracket: $\\frac{5}{4} - \\frac{2}{4} = \\frac{3}{4}$.',
          'Convert $2\\frac{1}{3} = \\frac{7}{3}$. Multiply by reciprocal: $\\frac{7}{3} \\times \\frac{4}{3} = \\frac{28}{9} = 3\\frac{1}{9}$.',
        ],
        answer: '$3\\frac{1}{9}$ (or $\\frac{28}{9}$)',
        markSchemeNotes: 'B1 for $\\frac{3}{4}$ inside bracket, M1 for $\\frac{7}{3} \\times \\frac{4}{3}$, A1 for $3\\frac{1}{9}$.',
      },
    ],
    rapidSummary: [
      { rule: 'BODMAS priority', detail: 'Brackets (and fraction bars/roots) $\\to$ Of/Indices $\\to$ Division/Multiplication (L to R) $\\to$ Addition/Subtraction (L to R).' },
      { rule: 'Mixed numbers first', detail: 'Always turn $2\\frac{3}{5}$ into $\\frac{13}{5}$ before $\\times$ or $\\div$.' },
    ],
  },
  '1.7': {
    bigIdea: 'Index laws turn multiplication/division into simple addition/subtraction of exponents whenever bases match. Negative indices flip reciprocals, and fractional indices mean roots.',
    stepByStepMethod: [
      'Rewrite composite numbers as powers of a prime base (e.g. $8 = 2^3$, $27 = 3^3$, $\\frac{1}{9} = 3^{-2}$).',
      'Apply power-of-a-power $(a^m)^n = a^{mn}$ before combining products/quotients.',
      'For fractional negative exponents $a^{-m/n}$: take the $n$-th root first to keep numbers small, raise to power $m$, then take reciprocal.',
    ],
    comparisonTable: {
      title: 'Complete Index Laws Reference',
      headers: ['Law', 'Formula', 'Example'],
      rows: [
        ['Product & Quotient', '$a^m \\times a^n = a^{m+n},\\ \\frac{a^m}{a^n} = a^{m-n}$', '$x^5 \\div x^{-2} = x^{7}$'],
        ['Zero index', '$a^0 = 1\\ (a \\neq 0)$', '$(5x^3)^0 = 1$'],
        ['Negative index', '$a^{-n} = \\frac{1}{a^n}$', '$4^{-2} = \\frac{1}{16}$'],
        ['Fractional index', '$a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$', '$27^{\\frac{2}{3}} = (\\sqrt[3]{27})^2 = 3^2 = 9$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Solving Index Equations by Equating Bases (Extended)',
        body: 'If $4^{2x - 1} = 32$, express both sides with prime base $2$: $(2^2)^{2x-1} = 2^5 \\implies 2^{4x-2} = 2^5$. Since the exponential function is one-to-one, equate exponents directly: $4x - 2 = 5 \\implies x = 1.75$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Fractional & negative index simplification',
        question: 'Simplify $\\left(\\frac{16x^8}{81y^{-4}}\\right)^{-\\frac{3}{4}}$.',
        marks: 3,
        steps: [
          'Take fourth root first: $\\left(\\frac{2x^2}{3y^{-1}}\\right)^{-3} = \\left(\\frac{2x^2y}{3}\\right)^{-3}$.',
          'Apply negative sign (invert) and cube: $\\left(\\frac{3}{2x^2y}\\right)^3 = \\frac{27}{8x^6y^3}$.',
        ],
        answer: '$\\frac{27}{8x^6y^3}$',
        markSchemeNotes: 'M1 for fourth root or inverting, B1 for numerator $27$ / denominator $8$, A1 fully simplified.',
      },
    ],
    rapidSummary: [
      { rule: 'Negative index $\\neq$ negative value', detail: '$5^{-2} = +\\frac{1}{25}$, never $-25$.' },
      { rule: 'Root before power', detail: 'In $a^{m/n}$, evaluate $\\sqrt[n]{a}$ first so intermediate numbers stay small.' },
    ],
  },
  '1.8': {
    bigIdea: 'Standard form separates size (the power of $10$) from significant digits ($A \\in [1, 10)$), making astronomical and microscopic arithmetic effortless without counting zeroes.',
    stepByStepMethod: [
      'Place the decimal point immediately after the first non-zero digit so $1 \\le A < 10$.',
      'Count places moved: large numbers ($\\ge 10$) have positive $n$; small decimals ($< 1$) have negative $n$.',
      'For multiplication/division: operate on the $A$ coefficients and add/subtract powers of $10$ separately.',
      'For addition/subtraction: match the powers of $10$ first, add/subtract the coefficients, then re-normalise $A$ into $[1, 10)$.',
    ],
    comparisonTable: {
      title: 'Standard Form Operations Summary',
      headers: ['Task', 'Key Strategy', 'Example'],
      rows: [
        ['Multiply', '$(A_1 \\times A_2) \\times 10^{n_1 + n_2}$', '$(4\\times 10^5)(3\\times 10^4) = 12\\times 10^9 = 1.2\\times 10^{10}$'],
        ['Divide', '$\\frac{A_1}{A_2} \\times 10^{n_1 - n_2}$', '$(6\\times 10^3) \\div (2\\times 10^{-4}) = 3\\times 10^7$'],
        ['Add / Subtract', 'Align exponents to larger $10^n$ first', '$4.2\\times 10^5 + 3\\times 10^4 = (4.2 + 0.3)\\times 10^5 = 4.5\\times 10^5$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Re-normalising Overflow After Arithmetic',
        body: 'If your product gives $24 \\times 10^{-5}$, move the decimal one place left (making $24$ smaller by $\\div 10$) and compensate by increasing the exponent by $+1$: $2.4 \\times 10^{-4}$. Remember $-5 + 1 = -4$, NOT $-6$!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Adding two numbers in standard form (Non-Calculator)',
        question: 'Calculate $6.4 \\times 10^{-3} - 8 \\times 10^{-4}$, giving your answer in standard form.',
        marks: 2,
        steps: [
          'Rewrite $8 \\times 10^{-4} = 0.8 \\times 10^{-3}$ so both share $10^{-3}$.',
          'Subtract coefficients: $(6.4 - 0.8) \\times 10^{-3} = 5.6 \\times 10^{-3}$.',
        ],
        answer: '$5.6 \\times 10^{-3}$',
        markSchemeNotes: 'M1 for matching powers of $10$, A1 for $5.6 \\times 10^{-3}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Strict range $1 \\le A < 10$', detail: '$0.8 \\times 10^4$ and $12 \\times 10^4$ are NOT valid standard form.' },
      { rule: 'Exponent direction', detail: 'Shift decimal LEFT $\\implies$ ADD to exponent; shift RIGHT $\\implies$ SUBTRACT from exponent.' },
    ],
  },
  '1.9': {
    bigIdea: 'Estimation gives a fast mental sanity check by rounding every value to $1$ significant figure (or compatible multiples for roots) before calculating.',
    stepByStepMethod: [
      'To round to $n$ significant figures, count from the FIRST non-zero digit on the left.',
      'Check the next digit: $5$ or above rounds up; below $5$ keeps the digit unchanged, padding trailing integer places with zeroes.',
      'For exam estimation ("estimate the value of..."), round EACH term in the formula to $1$ s.f. FIRST — never round the exact answer at the end!',
    ],
    comparisonTable: {
      title: 'Decimal Places vs Significant Figures',
      headers: ['Number', 'To $2$ d.p.', 'To $2$ s.f.', 'To $1$ s.f.'],
      rows: [
        ['$483.71$', '$483.71$', '$480$', '$500$'],
        ['$0.04086$', '$0.04$', '$0.041$', '$0.04$'],
        ['$19.96$', '$19.96$', '$20$', '$20$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Cambridge Standard Rounding Rule',
        body: 'Unless a question specifies otherwise (or money requires $2$ d.p. / angles require $1$ d.p.), give non-exact answers correct to **$3$ significant figures** (`3 s.f.`). Never round intermediate values mid-calculation; keep full display precision or $5+$ s.f. until the final line.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Show-all-steps $1$ s.f. estimation',
        question: 'By writing each number correct to $1$ significant figure, estimate $\\frac{41.8 \\times \\sqrt{98.4}}{0.492}$.',
        marks: 2,
        steps: [
          'Round each term to $1$ s.f.: $41.8 \\approx 40$, $\\sqrt{98.4} \\approx \\sqrt{100} = 10$, $0.492 \\approx 0.5$.',
          'Calculate: $\\frac{40 \\times 10}{0.5} = \\frac{400}{0.5} = 800$.',
        ],
        answer: '$800$',
        markSchemeNotes: 'B1 for $40$, $100$ (or $10$), and $0.5$ shown explicitly, A1 for $800$.',
      },
    ],
    rapidSummary: [
      { rule: 'Zeros in significant figures', detail: 'Leading zeros (`0.0052`) never count; sandwiched/trailing zeros after a decimal (`4.050`) DO count.' },
      { rule: 'Default exam precision', detail: '$3$ s.f. general, $1$ d.p. for angles in degrees, $2$ d.p. for currency.' },
    ],
  },
  '1.10': {
    bigIdea: 'Every physical measurement rounded to step $u$ hides an uncertainty band of $\\pm\\frac{1}{2}u$. Calculating upper and lower bounds tracks the worst-case maximum and minimum possible results.',
    stepByStepMethod: [
      'Identify the rounding unit $u$ (e.g. nearest $1\\text{ cm} \\implies u=1$, nearest $0.1\\text{ kg} \\implies u=0.1$, nearest $10 \\implies u=10$).',
      'Write $\\text{LB} = x - \\frac{u}{2}$ and $\\text{UB} = x + \\frac{u}{2}$ for every measured quantity immediately.',
      'To MAXIMISE $a + b$ or $a \\times b$: use $\\text{UB}(a)$ and $\\text{UB}(b)$. To MINIMISE: use $\\text{LB}(a)$ and $\\text{LB}(b)$.',
      'CRITICAL FOR SUBTRACTION & DIVISION: $\\text{UB}(a - b) = \\text{UB}(a) - \\text{LB}(b)$ and $\\text{UB}(a \\div b) = \\text{UB}(a) \\div \\text{LB}(b)$!',
    ],
    comparisonTable: {
      title: 'Bounds Arithmetic Matrix',
      headers: ['Expression', 'Lower Bound (Minimum)', 'Upper Bound (Maximum)'],
      rows: [
        ['$A + B$', '$A_{\\text{LB}} + B_{\\text{LB}}$', '$A_{\\text{UB}} + B_{\\text{UB}}$'],
        ['$A - B$', '$A_{\\text{LB}} - B_{\\text{UB}}$', '$A_{\\text{UB}} - B_{\\text{LB}}$'],
        ['$A \\times B$', '$A_{\\text{LB}} \\times B_{\\text{LB}}$', '$A_{\\text{UB}} \\times B_{\\text{UB}}$'],
        ['$A \\div B$', '$A_{\\text{LB}} \\div B_{\\text{UB}}$', '$A_{\\text{UB}} \\div B_{\\text{LB}}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Significant-Figure Bounds & Inequality Notation',
        body: 'When a value $m = 340$ is rounded to $2$ significant figures, the place value of the last significant digit ($4$) is tens ($u = 10$), so $\\frac{u}{2} = 5$, giving $335 \\le m < 345$. Notice the strict `$<$ ` on the upper bound in error intervals, while in formula substitution we always plug in $345$ (never $344.99$).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Upper bound of speed (division rule)',
        question: 'A car travels $240\\text{ km}$ (nearest $10\\text{ km}$) in $3.0\\text{ hours}$ (nearest $0.1\\text{ h}$). Find the upper bound of its average speed.',
        marks: 3,
        steps: [
          'Distance bounds: $235 \\le d < 245$. Time bounds: $2.95 \\le t < 3.05$.',
          'Maximise $\\text{Speed} = \\frac{d}{t}$ using $\\frac{d_{\\text{UB}}}{t_{\\text{LB}}} = \\frac{245}{2.95} = 83.0508\\dots$',
        ],
        answer: '$83.1\\text{ km/h}$ ($3$ s.f.)',
        markSchemeNotes: 'B1 for $245$ and $2.95$, M1 for $245 \\div 2.95$, A1 for $83.1$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never use .999', detail: 'Use exact half-step $x + \\frac{u}{2}$ as the upper bound (e.g. $12.5$, not $12.49$).' },
      { rule: 'Flip denominators', detail: 'Dividing by the SMALLEST denominator produces the LARGEST quotient.' },
    ],
  },
  '1.11': {
    bigIdea: 'Ratios compare parts side by side. Adding all parts finds the size of one equal share, while writing $1 : n$ compares quantities as unit multiples.',
    stepByStepMethod: [
      'Convert quantities to the SAME unit before simplifying a ratio.',
      'Sum the ratio parts if given the total, OR take the difference between ratio parts if told "A receives $24$ more than B".',
      'Find the value of $1$ part first, then multiply to answer what the question asks.',
    ],
    comparisonTable: {
      title: 'Three Classic Cambridge Ratio Problems',
      headers: ['Clue Given', 'Method to Find $1$ Part', 'Example ($3 : 5$)'],
      rows: [
        ['Total sum given', '$1\\text{ part} = \\text{Total} \\div (a + b)$', 'Total $= 64 \\implies 64 \\div 8 = 8$'],
        ['One person\'s share given', '$1\\text{ part} = \\text{Share} \\div \\text{their parts}$', 'First gets $18 \\implies 18 \\div 3 = 6$'],
        ['Difference between shares', '$1\\text{ part} = \\text{Difference} \\div (b - a)$', '$B$ gets $14$ more $\\implies 14 \\div 2 = 7$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Combining Two Linked Ratios ($A:B$ and $B:C$)',
        body: 'To merge $A:B = 2:3$ and $B:C = 4:5$, scale both ratios so the linking term $B$ matches the LCM of $3$ and $4$ ($12$): multiply the first by $4$ ($8:12$) and the second by $3$ ($12:15$), giving $A:B:C = 8:12:15$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Combining three-way ratios',
        question: 'In a bag, red : blue $= 3 : 4$ and blue : green $= 6 : 7$. Find red : blue : green in simplest form.',
        marks: 2,
        steps: [
          'LCM of $4$ and $6$ (the blue parts) is $12$.',
          'Scale: $\\text{R}:\\text{B} = 9:12$ and $\\text{B}:\\text{G} = 12:14$. Combine: $9 : 12 : 14$.',
        ],
        answer: '$9 : 12 : 14$',
        markSchemeNotes: 'M1 for matching blue to $12$ (or $24$), A1 for $9:12:14$.',
      },
    ],
    rapidSummary: [
      { rule: 'Equal units first', detail: 'Simplify $40\\text{ cm} : 2\\text{ m}$ as $40 : 200 = 1 : 5$.' },
      { rule: 'Map scale $1 : n$', detail: 'Remember areas scale by $n^2$ ($1\\text{ cm}^2 = n^2\\text{ cm}^2$), not $n$.' },
    ],
  },
  '1.12': {
    bigIdea: 'A rate divides one changing quantity by another (distance per time, mass per volume, force per area). Never average speeds across unequal times — always divide TOTAL distance by TOTAL time.',
    stepByStepMethod: [
      'Write the formula triangle carefully: $D = S \\times T$, $M = \\rho \\times V$, $F = P \\times A$.',
      'Convert all durations into consistent units (minutes $\\div 60 \\to$ decimal hours; $\\text{km/h} \\div 3.6 \\to \\text{m/s}$).',
      'For multi-stage journeys, sum ALL distances and ALL times separately before dividing.',
    ],
    comparisonTable: {
      title: 'Compound Measures & Unit Conversions',
      headers: ['Quantity', 'Formula', 'Common Unit Conversion'],
      rows: [
        ['Speed', '$\\frac{\\text{Total Distance}}{\\text{Total Time}}$', '$\\text{km/h} \\div 3.6 = \\text{m/s}$'],
        ['Density', '$\\frac{\\text{Mass}}{\\text{Volume}}$', '$1\\text{ g/cm}^3 = 1000\\text{ kg/m}^3$'],
        ['Pressure', '$\\frac{\\text{Force}}{\\text{Area}}$', '$1\\text{ N/m}^2 = 1\\text{ Pa}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Flow Rates & Filling Containers (Rate Application)',
        body: 'To find how long water flowing at speed $v\\text{ m/s}$ through a pipe of cross-section area $A\\text{ m}^2$ takes to fill a tank of volume $V_{\\text{tank}}$: treat the water entering per second as a cylinder or prism of volume $A \\times v$ per second, so $\\text{Time (s)} = \\frac{V_{\\text{tank}}}{A \\times v}$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Density of an alloy mixture',
        question: 'Metal $A$ ($120\\text{ g}$, density $8\\text{ g/cm}^3$) and Metal $B$ ($90\\text{ g}$, density $6\\text{ g/cm}^3$) are melted into an alloy. Calculate the density of the alloy.',
        marks: 3,
        steps: [
          'Find individual volumes: $V_A = 120 \\div 8 = 15\\text{ cm}^3$ and $V_B = 90 \\div 6 = 15\\text{ cm}^3$.',
          'Total mass $= 210\\text{ g}$, total volume $= 30\\text{ cm}^3$, so $\\text{Density} = 210 \\div 30 = 7\\text{ g/cm}^3$.',
        ],
        answer: '$7\\text{ g/cm}^3$',
        markSchemeNotes: 'M1 for finding volumes $15$ and $15$, M1 for $\\text{total mass} \\div \\text{total volume}$, A1 for $7$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never average two speeds', detail: '$\\text{Average speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}}$.' },
      { rule: 'Volume conversion factor', detail: '$1\\text{ m}^3 = 100^3\\text{ cm}^3 = 1\\,000\\,000\\text{ cm}^3$.' },
    ],
  },
  '1.13': {
    bigIdea: 'Think of every percentage change as multiplying by a single decimal multiplier ($1 \\pm \\frac{r}{100}$). Going forwards multiplies by $m$; going backwards ("reverse percentage") ALWAYS divides by $m$.',
    stepByStepMethod: [
      'Identify whether the given value is the ORIGINAL ($100\\%$) or the NEW value after change.',
      'Calculate multiplier $m = 1 + \\frac{r}{100}$ (increase) or $1 - \\frac{r}{100}$ (decrease).',
      'Forward: $\\text{New} = \\text{Original} \\times m$. Reverse: $\\text{Original} = \\text{New} \\div m$.',
      'For compound interest over $n$ years: $\\text{Amount} = P \\times m^n$; subtract $P$ if asked ONLY for the interest earned!',
    ],
    comparisonTable: {
      title: 'Simple Interest vs Compound Interest vs Reverse %',
      headers: ['Topic', 'Formula', 'When Used'],
      rows: [
        ['Percentage Change', '$\\frac{\\text{New} - \\text{Original}}{\\text{Original}} \\times 100\\%$', 'Profit, loss, markup, inflation'],
        ['Simple Interest', '$I = \\frac{PRT}{100},\\ A = P + I$', 'Same fixed dollar interest every year'],
        ['Compound Interest', '$A = P\\left(1 + \\frac{r}{100}\\right)^n$', 'Interest added to balance each year'],
        ['Reverse Percentage', '$\\text{Original} = \\text{Final} \\div m$', 'Sale price or taxed price given, find original'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Successive Percentage Changes',
        body: 'Increasing by $20\\%$ then decreasing by $20\\%$ does NOT return to $100\\%$! Multiply the two multipliers together: $1.20 \\times 0.80 = 0.96$, which is a net $4\\%$ decrease.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Simple vs Compound interest comparison',
        question: 'Invest $\\$1500$ for $3$ years at $5\\%$ per year. How much MORE interest does compound interest earn than simple interest?',
        marks: 4,
        steps: [
          'Simple interest: $I_S = \\frac{1500 \\times 5 \\times 3}{100} = \\$225$.',
          'Compound amount: $1500 \\times 1.05^3 = \\$1736.4375$, so $I_C = 1736.4375 - 1500 = \\$236.4375$.',
          'Difference: $236.4375 - 225 = \\$11.44$.',
        ],
        answer: '$\\$11.44$',
        markSchemeNotes: 'M1 simple interest $225$, M1 $1500\\times 1.05^3$, M1 subtract $1500$ and $225$, A1 $11.44$.',
      },
    ],
    rapidSummary: [
      { rule: 'Reverse = Divide', detail: 'Original price is ALWAYS $100\\%$; divide sale price by $(1 - \\frac{r}{100})$.' },
      { rule: 'Check question wording', detail: '"Total value" means $A$, whereas "compound interest earned" means $A - P$.' },
    ],
  },
  '1.14': {
    bigIdea: 'Scientific calculators follow BIDMAS strictly, so multi-term numerators, denominators, and negative numbers inside powers MUST be bracketed properly. On 2025–2027 exams, reserve calculator work for Papers 3 and 4.',
    stepByStepMethod: [
      'Confirm `D` (Degree mode) appears at the top of your calculator screen.',
      'Use the fraction template key $\\frac{\\square}{\\square}$ or explicit parentheses `(top) ÷ (bottom)`.',
      'Always wrap negative bases in parentheses: `(-3)^2 = 9`.',
      'Write down the unrounded calculator value ($5$–$6$ digits) as an intermediate line before rounding to $3$ s.f.',
    ],
    comparisonTable: {
      title: 'Common Calculator Trap Keys',
      headers: ['Intended Math', 'Correct Keystroke', 'Wrong Keystroke Result'],
      rows: [
        ['$(-4)^2$', '`(-4)^2` $\\to +16$', '`-4^2` $\\to -16$'],
        ['$\\frac{8+4}{2+1}$', '`(8+4)÷(2+1)` $\\to 4$', '`8+4÷2+1` $\\to 11$'],
        ['$\\sin 30^\\circ$', 'Degree mode `D` $\\to 0.5$', 'Radian mode `R` $\\to -0.988$'],
        ['$3\\text{ h } 24\\text{ min}$', '`3 °\'" 24 °\'"` $\\to 3.4\\text{ h}$', 'Typing `3.24`'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Using ANS Memory to Preserve Accuracy',
        body: 'In multi-part trigonometry or mensuration questions (Paper 4), store full calculator values with `ANS` or `STO A` rather than re-typing a rounded $3$ s.f. value into Part (b). Premature rounding frequently costs the final `A1` accuracy mark.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Two-step calculator rounding check',
        question: 'Use your calculator to evaluate $\\frac{7.4^2 + 3.1}{\\sqrt[3]{29.5} - 1.2}$ to $3$ significant figures.',
        marks: 2,
        steps: [
          'Numerator $= 54.76 + 3.1 = 57.86$. Denominator $= 3.08987\\dots - 1.2 = 1.88987\\dots$.',
          'Divide: $57.86 \\div 1.88987\\dots = 30.6158\\dots \\approx 30.6$.',
        ],
        answer: '$30.6$',
        markSchemeNotes: 'B1 for $30.615\\dots$ seen, A1 for $30.6$.',
      },
    ],
    rapidSummary: [
      { rule: 'Show unrounded step', detail: 'Write $4$–$5$ significant digits before rounding to $3$ s.f.' },
      { rule: 'Paper rules (2025–2027)', detail: 'Papers 1 & 2: Non-Calculator; Papers 3 & 4: Calculator allowed.' },
    ],
  },
  '1.15': {
    bigIdea: 'Time uses base-$60$ ($1\\text{ h} = 60\\text{ min}$, $1\\text{ min} = 60\\text{ s}$), NOT base-$100$. Always convert minutes into hours by dividing by $60$, and count forward hour-by-hour when finding durations.',
    stepByStepMethod: [
      'Add $12$ to afternoon `pm` hours (except $12:\\text{xx pm}$) to convert to $24$-hour clock.',
      'To find elapsed time between $t_1$ and $t_2$, bridge to the next whole hour, jump whole hours, then add remaining minutes.',
      'To convert decimal hours (e.g. $2.35\\text{ h}$) to hours & minutes, multiply ONLY the decimal part ($0.35 \\times 60 = 21\\text{ min}$).',
    ],
    comparisonTable: {
      title: '12-Hour, 24-Hour & Decimal Time Conversions',
      headers: ['12-Hour Clock', '24-Hour Clock', 'Decimal Hours Equivalence'],
      rows: [
        ['$12:15\\text{ a.m.}$', '$00\\,15$', '$0.25\\text{ h}$ after midnight'],
        ['$12:45\\text{ p.m.}$', '$12\\,45$', '$12.75\\text{ h}$'],
        ['$3:20\\text{ p.m.}$', '$15\\,20$', '$15\\frac{1}{3}\\text{ h} \\approx 15.33\\text{ h}$'],
        ['$11:54\\text{ p.m.}$', '$23\\,54$', '$23.9\\text{ h}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'International Time Zones & Overnight Journeys',
        body: 'East is ahead ($+$) and West is behind ($-$). When solving flight duration problems, convert BOTH departure and arrival into the SAME time zone first (e.g. local time at departure), subtract to get flight duration, or add flight duration then shift by the time difference.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Converting speed-formula decimal hours back to minutes',
        question: 'A coach drives $156\\text{ km}$ at $48\\text{ km/h}$. Give the journey time in hours and minutes.',
        marks: 2,
        steps: [
          '$\\text{Time} = 156 \\div 48 = 3.25\\text{ hours}$.',
          '$0.25 \\times 60 = 15\\text{ minutes}$, so $3\\text{ hours } 15\\text{ minutes}$.',
        ],
        answer: '$3\\text{ hours } 15\\text{ minutes}$',
        markSchemeNotes: 'M1 for $156 \\div 48 = 3.25$, A1 for $3\\text{ h } 15\\text{ min}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never write 2.30 h for 2 h 30 m', detail: '$2\\text{ h } 30\\text{ m} = 2.5\\text{ hours}$; $1\\text{ h } 12\\text{ m} = 1.2\\text{ hours}$.' },
      { rule: 'Bridge whole hours', detail: 'Avoid vertical borrowing in base-10 when subtracting clock times.' },
    ],
  },
  '1.16': {
    bigIdea: 'Money problems test three everyday financial mechanics: converting currencies along a known unit rate ($1\\text{ Home} = r\\text{ Foreign}$), applying percentage commissions/discounts/profit/loss cleanly, and comparing unit prices for "best buy" decisions.',
    stepByStepMethod: [
      'Write the exchange rate clearly as $1\\text{ Base} = r\\text{ Target}$. Ask yourself: "Should the numerical amount get larger or smaller?"',
      'Going FROM the $1$-unit currency $\\to$ MULTIPLY by $r$. Going BACK TO the $1$-unit currency $\\to$ DIVIDE by $r$.',
      'Deduct bank commission BEFORE converting currency (unless stated otherwise), and retain full calculator decimals until rounding final money to $2$ decimal places (nearest cent/penny).',
      'For wages & utility bills: split regular hours vs overtime rate ($1.5\\times$ or $2\\times$), or fixed standing charge $+$ (units used $\\times$ tariff).',
    ],
    comparisonTable: {
      title: 'Cambridge 0580 Money & Financial Arithmetic Guide',
      headers: ['Situation', 'Formula / Direction', 'Worked Mini-Example'],
      rows: [
        ['Convert $1\\text{ Home} = r\\text{ Foreign}$ forward', '$\\text{Home} \\times r$', '$\\$200$ at $\\$1 = €0.92 \\implies 200 \\times 0.92 = €184$'],
        ['Convert back to the "$1$" currency', '$\\text{Foreign} \\div r$', '$€184$ back at $0.92 \\implies 184 \\div 0.92 = \\$200$'],
        ['Bank commission ($c\\%$ fee)', 'Fee $= \\frac{c}{100} \\times \\text{Amount}$; Net $= \\text{Amount} \\times (1 - \\frac{c}{100})$', '$2\\%$ commission on $\\$500$ leaves $\\$490$'],
        ['Profit or Loss $\\%$', '$\\frac{\\text{Selling} - \\text{Cost}}{\\text{Cost Price}} \\times 100\\%$', 'Buy $\\$40$, sell $\\$50 \\implies \\frac{10}{40}\\times 100 = 25\\%$'],
        ['Best Buy (value comparison)', 'Compare $\\text{Cost} \\div \\text{Mass}$ or $\\text{Mass} \\div \\text{Cost}$', '$500\\text{ g}$ for $\\$2.40$ ($\\$0.48/100\\text{ g}$) beats $300\\text{ g}$ for $\\$1.56$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Overtime Wages, Household Bills & Commission (Coursebook Focus)',
        body: 'Beyond exchange rates, Cambridge 0580 Core and Extended papers routinely set real-world financial tables:',
        bullets: [
          'Overtime Pay: Basic hours are paid at standard hourly rate $R$, while extra hours above the threshold (e.g. $> 40\\text{ h}$) are paid at "time-and-a-half" ($1.5R$) or "double time" ($2R$). Calculate regular pay and overtime pay separately, then add.',
          'Utility Bills (Electricity / Water / Phone): Subtract previous meter reading from current meter reading to get units consumed, multiply by unit cost, add any fixed quarterly standing charge, then apply VAT/sales tax last.',
          'Profit & Loss vs Margin: Percentage profit or loss is ALWAYS measured out of the **Cost Price (original price)**, NEVER the selling price unless explicitly specified.',
        ],
      },
      {
        heading: 'Comparing Two Exchange Rates (Bank A vs Bank B)',
        body: 'If Bank A offers $\\$1 = 1.38\\text{ CAD}$ with zero fee, and Bank B offers $\\$1 = 1.42\\text{ CAD}$ with a flat $\\$15$ fee, convert the SAME dollar amount (remembering to subtract Bank B\'s $\\$15$ fee BEFORE multiplying by $1.42$) and compare the final CAD received.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Best-buy unit price & overtime pay',
        question: '(a) A $750\\text{ g}$ box of cereal costs $\\$3.60$ and a $1.2\\text{ kg}$ box costs $\\$5.40$. Show which box is better value. (b) Maya earns $\\$16/\\text{h}$ for a basic $38$-hour week and time-and-a-half for overtime. Calculate her pay for working $44$ hours.',
        marks: 4,
        steps: [
          '(a) Convert to same unit: $1.2\\text{ kg} = 1200\\text{ g}$. Price per $100\\text{ g}$: Small $= \\frac{3.60}{7.5} = \\$0.48$, Large $= \\frac{5.40}{12} = \\$0.45$. Since $\\$0.45 < \\$0.48$, the $1.2\\text{ kg}$ box is better value.',
          '(b) Basic pay $= 38 \\times 16 = \\$608$. Overtime hours $= 44 - 38 = 6\\text{ h}$ at $16 \\times 1.5 = \\$24/\\text{h}$. Overtime pay $= 6 \\times 24 = \\$144$. Total $= 608 + 144 = \\$752$.',
        ],
        answer: '(a) $1.2\\text{ kg}$ box ($\\$0.45$ vs $\\$0.48$ per $100\\text{ g}$); (b) $\\$752$',
        markSchemeNotes: 'M1 equal mass unit comparison, A1 $1.2\\text{ kg}$ with comparable figures; M1 $38\\times 16 + 6\\times 16\\times 1.5$, A1 $\\$752$.',
      },
    ],
    rapidSummary: [
      { rule: 'Always show 2 d.p. for money', detail: 'Write $\\$14.50$, NOT $\\$14.5$ (unless exact integer $\\$14$).' },
      { rule: 'Keep full precision mid-way', detail: 'Round ONLY on your final answer line; carry $5+$ d.p. through multi-step currency chains.' },
      { rule: 'Cost price in denominator', detail: '$\\%\\text{ profit} = \\frac{\\text{Profit}}{\\text{Cost Price}} \\times 100\\%$.' },
    ],
  },
  '1.17': {
    bigIdea: 'Whenever a population, account balance, or car value changes by a FIXED PERCENTAGE per unit time (instead of a fixed amount), it grows or decays exponentially via $y = A \\times b^t$.',
    stepByStepMethod: [
      'Convert the percentage rate $r\\%$ into the base multiplier $b$: $b = 1 + \\frac{r}{100}$ (growth) or $b = 1 - \\frac{r}{100}$ (decay/depreciation).',
      'Check the time period $n$ carefully (months vs years vs decades!).',
      'Substitute into $V = V_0 \\times b^n$. To find $n$ when $V$ is known, test integer powers of $b$ systematically (trial and improvement).',
    ],
    comparisonTable: {
      title: 'Exponential Growth vs Depreciation Models',
      headers: ['Type', 'Base $b$', 'Long-Term Behaviour'],
      rows: [
        ['Growth ($+r\\%$)', '$b = 1 + \\frac{r}{100} > 1$', 'Doubles repeatedly at fixed intervals'],
        ['Depreciation ($-r\\%$)', '$0 < b = 1 - \\frac{r}{100} < 1$', 'Shrinks toward zero without reaching zero'],
        ['Bacteria / Half-life', '$b = 2$ (doubling) or $b = 0.5$ (halving)', '$n =$ number of doubling/halving cycles'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Finding the Time $n$ or Initial Value $V_0$ (Extended)',
        body: 'In Paper 4, you are often asked: "After how many complete years does the value first drop below half its original price?" Set $b^n < 0.5$ and compute $b^1, b^2, b^3, \\dots$ cleanly showing the values immediately before and after crossing $0.5$ to earn full method marks.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding years to fall below half value',
        question: 'A machine depreciates by $15\\%$ per year. After how many complete years is it worth less than half its purchase price?',
        marks: 3,
        steps: [
          'Multiplier $b = 1 - 0.15 = 0.85$. Test powers until $0.85^n < 0.5$.',
          '$0.85^4 = 0.5220 > 0.5$, while $0.85^5 = 0.4437 < 0.5$.',
        ],
        answer: '$5$ years',
        markSchemeNotes: 'M1 for $0.85^n < 0.5$, B1 for testing $0.85^4$ and $0.85^5$, A1 for $5$.',
      },
    ],
    rapidSummary: [
      { rule: 'Growth vs Decay base', detail: '$b > 1$ grows; $0 < b < 1$ decays.' },
      { rule: 'Never multiply linearly', detail: '$10\\%$ depreciation for $3$ years is $0.9^3 = 0.729$ ($27.1\\%$ loss), NOT $30\\%$!' },
    ],
  },
  '1.18': {
    bigIdea: 'Surds are exact square roots of non-square numbers. Treat $\\sqrt{p}$ like an algebraic variable $x$: collect like surds after pulling out the largest perfect square factor.',
    stepByStepMethod: [
      'Factor out the LARGEST square number ($4, 9, 16, 25, 36, 49, \\dots$) using $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$.',
      'Combine like surds ($a\\sqrt{k} + b\\sqrt{k} = (a+b)\\sqrt{k}$); NEVER add unlike surds like $\\sqrt{2} + \\sqrt{3}$.',
      'To rationalise $\\frac{c}{\\sqrt{a}}$, multiply top & bottom by $\\sqrt{a}$. For $\\frac{c}{a + \\sqrt{b}}$, multiply by the conjugate $a - \\sqrt{b}$.',
    ],
    comparisonTable: {
      title: 'Surd Simplification & Rationalising Rules',
      headers: ['Form', 'Action', 'Result'],
      rows: [
        ['$\\sqrt{a} \\times \\sqrt{a}$', 'Square the root', '$a$'],
        ['$\\sqrt{k^2 b}$', 'Pull perfect square outside', '$k\\sqrt{b}$'],
        ['$\\frac{c}{\\sqrt{a}}$', 'Multiply top & bottom by $\\sqrt{a}$', '$\\frac{c\\sqrt{a}}{a}$'],
        ['$\\frac{c}{p + \\sqrt{q}}$', 'Multiply by conjugate $(p - \\sqrt{q})$', '$\\frac{c(p - \\sqrt{q})}{p^2 - q}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Expanding Brackets with Surds (Non-Calculator Paper 2)',
        body: 'Use FOIL carefully just like algebra: $(3 + \\sqrt{5})(2 - \\sqrt{5}) = 6 - 3\\sqrt{5} + 2\\sqrt{5} - 5 = 1 - \\sqrt{5}$. Remember that $(\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b$ is why conjugates always eliminate radicals from denominators!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Rationalising a binomial denominator',
        question: 'Write $\\frac{10}{4 - \\sqrt{6}}$ in the form $a + b\\sqrt{6}$.',
        marks: 3,
        steps: [
          'Multiply numerator and denominator by the conjugate $4 + \\sqrt{6}$.',
          'Denominator: $(4 - \\sqrt{6})(4 + \\sqrt{6}) = 16 - 6 = 10$.',
          'Numerator: $10(4 + \\sqrt{6})$. Cancel $10$: $4 + \\sqrt{6}$.',
        ],
        answer: '$4 + \\sqrt{6}$',
        markSchemeNotes: 'M1 for $\\times \\frac{4+\\sqrt{6}}{4+\\sqrt{6}}$, A1 denominator $10$, A1 $4 + \\sqrt{6}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never split sums', detail: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$, NEVER $\\sqrt{9} + \\sqrt{16} = 7$.' },
      { rule: 'Conjugate sign flip', detail: 'Conjugate of $a + b\\sqrt{c}$ is $a - b\\sqrt{c}$.' },
    ],
  },
  '2.1': {
    bigIdea: 'Algebra uses letters for unknown numbers so we can generalise rules and rearrange equations safely using inverse operations like balancing scales.',
    stepByStepMethod: [
      'When substituting negative numbers, wrap EVERY letter in parentheses first (e.g. $x = -2 \\implies 3(-2)^2$).',
      'To change the subject: clear fractions and roots first, expand brackets, and collect all target-subject terms on one side.',
      'If the target variable appears twice, factorise it out into a single bracket and divide by the remaining factor.',
    ],
    comparisonTable: {
      title: 'Changing the Subject Strategy',
      headers: ['Formula Structure', 'First Step', 'Key Trick'],
      rows: [
        ['Fraction $y = \\frac{ax+b}{c}$', 'Multiply both sides by $c$', 'Clear denominator early'],
        ['Root $T = 2\\pi\\sqrt{\\frac{L}{g}}$', 'Divide by $2\\pi$, then square both sides', 'Square ALL terms, never piece-by-piece'],
        ['Subject appears twice', 'Multiply out denominator and gather terms', 'Factorise target letter into one bracket'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Translating Word Sentences into Algebraic Expressions',
        body: 'In Core and Extended exams, phrases like "five less than twice a number $n$" become $2n - 5$ (not $5 - 2n$), and "cost of $x$ apples at $c$ cents and $y$ pears at $d$ dollars" require matching units ($0.01cx + dy$ dollars) before forming equations.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Rearranging a formula with a square root',
        question: 'Make $r$ the subject of $V = \\frac{1}{3}\\pi r^2 h$.',
        marks: 2,
        steps: [
          'Multiply by $3$ and divide by $\\pi h$: $r^2 = \\frac{3V}{\\pi h}$.',
          'Take square root: $r = \\sqrt{\\frac{3V}{\\pi h}}$ (positive radius in mensuration).',
        ],
        answer: '$r = \\sqrt{\\frac{3V}{\\pi h}}$',
        markSchemeNotes: 'M1 for $r^2 = \\frac{3V}{\\pi h}$, A1 for square root.',
      },
    ],
    rapidSummary: [
      { rule: 'Parentheses on substitution', detail: 'Always substitute $x = -3$ as $(-3)$, never $-3$ bare.' },
      { rule: 'Subject appears once', detail: 'Factorise the target variable out if it starts in two places.' },
    ],
  },
  '2.2': {
    bigIdea: 'Expanding multiplies brackets out into a sum of terms; factorising reverses the process into a clean product of brackets. Checking HCF and difference of two squares first catches most exam tricks.',
    stepByStepMethod: [
      'Always scan for a Highest Common Factor (HCF) across ALL terms first.',
      'Check if two squared terms are subtracted ($a^2 - b^2 \\to (a-b)(a+b)$).',
      'For $ax^2 + bx + c$, find two integers whose product is $ac$ and sum is $b$, split $bx$, and factorise in pairs.',
      'For triple brackets $(x+p)(x+q)(x+r)$, expand two brackets fully, simplify, then multiply by the third.',
    ],
    comparisonTable: {
      title: 'Factorisation Patterns at a Glance',
      headers: ['Expression Pattern', 'Factorised Form', 'Example'],
      rows: [
        ['Common factor', '$k(a + b)$', '$6x^2y - 9xy^2 = 3xy(2x - 3y)$'],
        ['Difference of squares', '$(a - b)(a + b)$', '$16x^2 - 49 = (4x - 7)(4x + 7)$'],
        ['Monic quadratic', '$(x + p)(x + q)$', '$x^2 - 5x - 14 = (x - 7)(x + 2)$'],
        ['Grouping (4 terms)', '$(a + b)(c + d)$', '$ax + ay + bx + by = (a + b)(x + y)$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Grouping Four-Term Expressions with Minus Signs',
        body: 'When factorising $2ax - 4ay - 3bx + 6by$, pair carefully: $2a(x - 2y) - 3b(x - 2y) = (2a - 3b)(x - 2y)$. Notice factoring out $-3b$ flips $+6by$ inside the second bracket to $-2y$ so both brackets match identically!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Expanding three brackets',
        question: 'Expand and simplify $(x + 2)(x - 1)(x + 3)$.',
        marks: 3,
        steps: [
          'Expand first two: $(x + 2)(x - 1) = x^2 + x - 2$.',
          'Multiply by $(x + 3)$: $x(x^2 + x - 2) + 3(x^2 + x - 2) = x^3 + x^2 - 2x + 3x^2 + 3x - 6 = x^3 + 4x^2 + x - 6$.',
        ],
        answer: '$x^3 + 4x^2 + x - 6$',
        markSchemeNotes: 'B1 for $x^2 + x - 2$, M1 for multiplying by $(x+3)$, A1 simplified.',
      },
    ],
    rapidSummary: [
      { rule: 'Factorise = brackets', detail: 'Expanding removes brackets; factorising puts brackets back.' },
      { rule: 'Check by multiplying back', detail: 'You can verify any factorisation by mentally expanding it.' },
    ],
  },
  '2.3': {
    bigIdea: 'Algebraic fractions obey identical laws to numerical fractions: you may ONLY cancel FACTORS (things multiplied together), NEVER individual terms separated by $+$ or $-$.',
    stepByStepMethod: [
      'Factorise every numerator and denominator completely FIRST before touching or cancelling anything.',
      'Cancel identical bracket factors top and bottom.',
      'For addition/subtraction, use the product of distinct denominators as the common denominator and wrap subtracted numerators in brackets.',
    ],
    comparisonTable: {
      title: 'Valid vs Illegal Cancellation',
      headers: ['Expression', 'Right or Wrong?', 'Reason'],
      rows: [
        ['$\\frac{x(x+3)}{(x+3)(x-2)} = \\frac{x}{x-2}$', 'Correct', '$(x+3)$ multiplies both top and bottom'],
        ['$\\frac{x + 3}{x + 5} = \\frac{3}{5}$', 'WRONG', '$x$ is added, not a factor!'],
        ['$\\frac{a}{x+1} - \\frac{b}{x-1} = \\frac{a(x-1) - b(x+1)}{(x+1)(x-1)}$', 'Correct', 'Full common denominator with bracketed minus'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Factorising Before Combining Fractions',
        body: 'In Paper 2/4, a quadratic denominator almost always shares a linear factor with the other denominator: e.g. in $\\frac{3}{x-2} + \\frac{5}{x^2-4}$, factorise $x^2 - 4 = (x-2)(x+2)$ so the LCD is just $(x-2)(x+2)$, NOT $(x-2)(x^2-4)$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Simplifying a rational algebraic fraction',
        question: 'Simplify $\\frac{2x^2 - 8}{x^2 + x - 6}$.',
        marks: 3,
        steps: [
          'Factorise top: $2(x^2 - 4) = 2(x - 2)(x + 2)$.',
          'Factorise bottom: $(x + 3)(x - 2)$.',
          'Cancel common factor $(x - 2)$ to leave $\\frac{2(x + 2)}{x + 3}$.',
        ],
        answer: '$\\frac{2(x + 2)}{x + 3}$ (or $\\frac{2x + 4}{x + 3}$)',
        markSchemeNotes: 'B1 top factorised, B1 bottom factorised, A1 simplified.',
      },
    ],
    rapidSummary: [
      { rule: 'Factorise first, cancel second', detail: 'Never cancel terms joined by $+$ or $-$.' },
      { rule: 'Bracket negative numerators', detail: 'In $-\\frac{2x-5}{3}$, the minus applies to BOTH $2x$ and $-5$.' },
    ],
  },
  '2.4': {
    bigIdea: 'Powers of $x$ and variables inside brackets follow the exact same index laws as numbers — remember that an exponent outside a bracket multiplies BOTH the coefficient power AND every letter exponent inside.',
    stepByStepMethod: [
      'Apply outside powers to coefficients too: $(3x^2)^3 = 3^3 \\cdot x^{2\\times 3} = 27x^6$.',
      'Simplify fractions by dividing coefficients normally and subtracting exponents of matching letters.',
      'Rewrite roots cleanly in fractional exponent form ($\\sqrt{x} = x^{1/2}$) when simplifying algebraic expressions.',
    ],
    comparisonTable: {
      title: 'Algebraic Index Simplifications',
      headers: ['Expression', 'Step', 'Result'],
      rows: [
        ['$(2a^3b)^4$', '$2^4 a^{12} b^4$', '$16a^{12}b^4$'],
        ['$\\frac{12x^6}{3x^{-2}}$', '$(12\\div 3) x^{6 - (-2)}$', '$4x^8$'],
        ['$(9x^4)^{\\frac{1}{2}}$', '$9^{1/2} x^{4 \\times 1/2}$', '$3x^2$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Avoiding Negative Exponents Inside Brackets',
        body: 'In expressions like $\\frac{(2x^{-2})^3}{4x^{-4}}$, evaluate the top first to get $\\frac{8x^{-6}}{4x^{-4}} = 2x^{-6 - (-4)} = 2x^{-2} = \\frac{2}{x^2}$. Subtracting negative powers carefully prevents sign slips.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Equating algebraic powers',
        question: 'Find $k$ and $n$ if $\\frac{18x^5 y^{-1}}{(3x^2 y)^2} = kx^n y^{-3}$.',
        marks: 2,
        steps: [
          'Expand denominator: $(3x^2 y)^2 = 9x^4 y^2$.',
          'Divide: $\\frac{18}{9} x^{5-4} y^{-1-2} = 2 x^1 y^{-3}$, so $k = 2, n = 1$.',
        ],
        answer: '$k = 2,\\ n = 1$',
        markSchemeNotes: 'B1 for $9x^4 y^2$, A1 for $k=2, n=1$.',
      },
    ],
    rapidSummary: [
      { rule: 'Power the coefficient too', detail: '$(5x^2)^2 = 25x^4$, NOT $5x^4$.' },
      { rule: 'Negative minus negative', detail: '$x^3 \\div x^{-2} = x^{3 - (-2)} = x^5$.' },
    ],
  },
  '2.5': {
    bigIdea: 'To solve equations, isolate $x$: linear equations move terms symmetrically; simultaneous equations eliminate one variable; quadratics can be factored, completed-square, or plugged into the quadratic formula.',
    stepByStepMethod: [
      'Linear: clear denominators, expand brackets, group $x$ terms on one side.',
      'Simultaneous (both linear): scale to match coefficients and add/subtract; (one linear + one quadratic): rearrange linear and substitute.',
      'Quadratic: set equal to ZERO ($ax^2 + bx + c = 0$); factorise if possible, or use quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.',
    ],
    comparisonTable: {
      title: 'Choosing the Right Equation Method',
      headers: ['Equation Type', 'Best Method', 'Key Check'],
      rows: [
        ['Linear $ax + b = cx + d$', 'Balance both sides', 'Check sign when moving terms'],
        ['2 Linear equations', 'Elimination (or Substitution)', 'Plug $(x, y)$ back into BOTH equations'],
        ['Quadratic (integer roots)', 'Factorise $= 0$', 'Every factor $= 0$ gives a root'],
        ['Quadratic ("to 2 d.p." / "3 s.f.")', 'Quadratic Formula (or Complete Square)', 'Must check BOTH $\\pm$ signs in formula'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Completing the Square & Finding Vertex (Extended)',
        body: 'Writing $x^2 + bx + c$ as $\\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2 + c$ simultaneously solves equations AND reveals the turning point (minimum/maximum vertex) at $\\left(-\\frac{b}{2},\\ c - \\left(\\frac{b}{2}\\right)^2\\right)$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Quadratic word problem (area)',
        question: 'A rectangle has length $(x + 5)\\text{ cm}$, width $(x - 1)\\text{ cm}$, and area $40\\text{ cm}^2$. Form and solve an equation to find $x$.',
        marks: 4,
        steps: [
          'Area equation: $(x + 5)(x - 1) = 40 \\implies x^2 + 4x - 5 = 40 \\implies x^2 + 4x - 45 = 0$.',
          'Factorise: $(x + 9)(x - 5) = 0 \\implies x = -9$ or $x = 5$. Since width $x - 1 > 0$, reject $-9$, so $x = 5$.',
        ],
        answer: '$x = 5$',
        markSchemeNotes: 'M1 setting $(x+5)(x-1)=40$, M1 factorising, A1 $x=5$ (with negative rejected).',
      },
    ],
    rapidSummary: [
      { rule: 'Always $= 0$ for quadratics', detail: 'Never divide by $x$ in $x^2 = 5x$ or you lose the $x = 0$ solution!' },
      { rule: 'Reject impossible geometry', detail: 'Lengths, ages, and counts must be positive.' },
    ],
  },
  '2.6': {
    bigIdea: 'Inequalities work almost identically to equations, EXCEPT multiplying or dividing by a negative number reverses the inequality sign; quadratic inequalities use a quick parabola sketch.',
    stepByStepMethod: [
      'Solve linear inequalities like equations, flipping `$<$ ` $\\leftrightarrow$ `$>` ` whenever multiplying or dividing by a negative number.',
      'For quadratic inequalities ($x^2 - 9 < 0$), find the roots ($\\pm 3$) first, sketch the $U$-shaped curve, then read the interval where the curve is above or below zero.',
      'For graphical regions ($y \\le mx + c$), plot boundary line (solid for $\\le/\\ge$, dashed for $</>$) and test a point like $(0, 0)$.',
    ],
    comparisonTable: {
      title: 'Quadratic Inequality Sign Rules ($a > 0$)',
      headers: ['Inequality (Roots $\\alpha < \\beta$)', 'Graph Position', 'Solution Interval'],
      rows: [
        ['$(x - \\alpha)(x - \\beta) < 0$', 'Between roots (below $x$-axis)', '$\\alpha < x < \\beta$ (one connected interval)'],
        ['$(x - \\alpha)(x - \\beta) > 0$', 'Outside roots (above $x$-axis)', '$x < \\alpha$ or $x > \\beta$ (two tails)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Cambridge Shading Convention for Unwanted Regions',
        body: 'In Paper 2/4 graphing questions, check carefully whether the question asks you to shade the **wanted** region OR leave the **wanted region $R$ UNSHADED** (Cambridge standard!). Always label the clean wanted region clearly with `$R$` as instructed.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Solving a quadratic inequality (Extended)',
        question: 'Find the range of values of $x$ satisfying $x^2 - 2x - 15 > 0$.',
        marks: 3,
        steps: [
          'Factorise: $(x - 5)(x + 3) = 0$, giving critical roots $x = -3$ and $x = 5$.',
          'Since coefficient of $x^2$ is positive ($U$-curve), $y > 0$ lies on the outer wings.',
        ],
        answer: '$x < -3$ or $x > 5$',
        markSchemeNotes: 'M1 factorising, A1 critical values $-3, 5$, A1 $x < -3$ or $x > 5$.',
      },
    ],
    rapidSummary: [
      { rule: 'Flip sign on $\\div (-k)$', detail: '$-2x < 10 \\implies x > -5$.' },
      { rule: 'Sketch before writing quadratic range', detail: 'Never just replace `$=$` with `$<$` on roots.' },
    ],
  },
  '2.7': {
    bigIdea: 'Every sequence follows a hidden $n$-th term formula $u_n$. Constant first differences give linear $dn + c$, constant second differences give quadratic $an^2 + bn + c$, and constant ratios give geometric $ar^{n-1}$.',
    stepByStepMethod: [
      'Compute first differences between consecutive terms. If constant ($d$), write $u_n = dn + c$ where $c = u_1 - d$.',
      'If first differences vary, compute SECOND differences ($D_2$). If constant, $a = \\frac{D_2}{2}$; subtract $an^2$ from each term and find linear $bn + c$ of the remainder.',
      'If consecutive terms multiply by a constant ratio $r$, write $u_n = a r^{n-1}$.',
    ],
    comparisonTable: {
      title: 'Three Sequence Types in IGCSE 0580',
      headers: ['Sequence Type', 'Signature Test', '$n$-th Term Formula'],
      rows: [
        ['Linear (Arithmetic)', 'Constant 1st difference $d$', '$u_n = u_1 + (n - 1)d$'],
        ['Quadratic', 'Constant 2nd difference $D_2$', '$u_n = an^2 + bn + c,\\ a = \\frac{D_2}{2}$'],
        ['Geometric (Exponential)', 'Constant multiplier ratio $r = \\frac{u_2}{u_1}$', '$u_n = a r^{n-1}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Testing If a Number Belongs to a Sequence',
        body: 'To test whether $185$ is in $u_n = 4n - 3$, set $4n - 3 = 185 \\implies 4n = 188 \\implies n = 47$. Since $n = 47$ is a positive integer, YES, $185$ is the $47$th term! If $n$ comes out fractional or negative, it is NOT in the sequence.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Cubic / Special sequence recognition',
        question: 'Find the $n$-th term of the geometric sequence $3, 6, 12, 24, \\dots$.',
        marks: 2,
        steps: [
          'First term $a = 3$, common ratio $r = 6 \\div 3 = 2$.',
          'Apply $u_n = a r^{n-1} = 3 \\times 2^{n-1}$.',
        ],
        answer: '$3 \\times 2^{n-1}$',
        markSchemeNotes: 'B1 for $2^{n-1}$, A1 for $3 \\times 2^{n-1}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Half the second difference', detail: 'In a quadratic sequence, $a = \\frac{\\text{2nd difference}}{2}$.' },
      { rule: '$n$ must be a positive integer', detail: 'Only positive whole numbers ($1, 2, 3, \\dots$) count as valid term positions.' },
    ],
  },
  '2.8': {
    bigIdea: 'Direct proportion means two quantities scale by the SAME factor ($y = kx$), whereas inverse proportion means multiplying one quantity DIVIDES the other by the same factor ($y = \\frac{k}{x}$).',
    stepByStepMethod: [
      'Translate words into a formula with unknown constant $k$ (watch for squares, cubes, or roots like $\\sqrt{x}$ or $x^2$!).',
      'Plug in the given $(x_0, y_0)$ pair to solve for the exact constant $k$.',
      'Rewrite the complete law with $k$ substituted in, then solve for the required value.',
    ],
    comparisonTable: {
      title: 'Direct vs Inverse Proportion Laws',
      headers: ['Wording', 'Equation', 'Graph Shape ($x > 0$)'],
      rows: [
        ['$y$ directly proportional to $x$', '$y = kx$', 'Straight line through $(0, 0)$'],
        ['$y$ proportional to $x^2$', '$y = kx^2$', 'Upward curve through $(0, 0)$'],
        ['$y$ inversely proportional to $x$', '$y = \\frac{k}{x}$', 'Decreasing hyperbola'],
        ['$y$ inversely proportional to $\\sqrt{x}$', '$y = \\frac{k}{\\sqrt{x}}$', 'Decreasing curve ($x > 0$)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Percentage Effect Questions Without Knowing $k$',
        body: 'If $y \\propto \\frac{1}{x^2}$ and $x$ is doubled ($2x$), then $y_{\\text{new}} = \\frac{k}{(2x)^2} = \\frac{1}{4}\\left(\\frac{k}{x^2}\\right) = \\frac{1}{4}y$, meaning $y$ becomes a quarter of its original value ($75\\%$ decrease).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Direct proportion to square root',
        question: '$P$ is directly proportional to $\\sqrt{q}$. When $q = 16$, $P = 20$. Find $q$ when $P = 35$.',
        marks: 3,
        steps: [
          'Write $P = k\\sqrt{q} \\implies 20 = k\\sqrt{16} = 4k \\implies k = 5$.',
          'When $P = 35$: $35 = 5\\sqrt{q} \\implies \\sqrt{q} = 7 \\implies q = 49$.',
        ],
        answer: '$q = 49$',
        markSchemeNotes: 'M1 for $P = k\\sqrt{q}$, A1 for $k = 5$, A1 for $q = 49$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never forget powers/roots', detail: 'Read whether proportionality involves $x$, $x^2$, $x^3$, or $\\sqrt{x}$.' },
      { rule: 'Constant $k$ stays fixed', detail: 'Solve $k$ once from the initial pair and reuse it throughout.' },
    ],
  },
  '2.9': {
    bigIdea: 'In Distance–Time graphs, the slope (gradient) IS the speed. In Speed–Time graphs, the slope IS the acceleration and the AREA under the curve IS the total distance travelled.',
    stepByStepMethod: [
      'Check the vertical axis label FIRST: is it **Distance** or **Speed**?',
      'Match units carefully: if speed is in $\\text{m/s}$, time must be in seconds; if speed is in $\\text{km/h}$, time must be in hours!',
      'To find distance from a Speed–Time graph, split the region underneath into rectangles, triangles, and trapeziums and sum their areas.',
    ],
    comparisonTable: {
      title: 'Distance–Time vs Speed–Time Graphs',
      headers: ['Graph Feature', 'Distance–Time Graph', 'Speed–Time Graph'],
      rows: [
        ['Horizontal flat line', 'Stationary (Speed $= 0$)', 'Constant speed (Acceleration $= 0$)'],
        ['Gradient (Slope)', 'Speed ($\\frac{\\Delta d}{\\Delta t}$)', 'Acceleration ($\\frac{\\Delta v}{\\Delta t}$)'],
        ['Negative slope', 'Returning toward start', 'Deceleration / braking'],
        ['Area under line', 'No physical meaning in 0580', 'Total Distance Travelled'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Calculating Instantaneous Speed/Acceleration from Curved Graphs',
        body: 'If a Distance–Time or Speed–Time graph is a curve, find the instantaneous rate of change at time $t = T$ by drawing a straight **tangent** touching the curve neatly at $t = T$ and calculating the gradient $\\frac{\\Delta y}{\\Delta x}$ of that tangent line.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Total distance from a trapezium Speed–Time graph',
        question: 'A train accelerates uniformly from rest to $24\\text{ m/s}$ in $10\\text{ s}$, cruises at $24\\text{ m/s}$ for $30\\text{ s}$, then decelerates to rest in $8\\text{ s}$. Calculate the total distance travelled.',
        marks: 3,
        steps: [
          'Represent shape as a trapezium with parallel sides $a = 30\\text{ s}$, $b = 10 + 30 + 8 = 48\\text{ s}$, and height $24\\text{ m/s}$.',
          'Area $= \\frac{1}{2}(30 + 48) \\times 24 = 39 \\times 24 = 936\\text{ m}$.',
        ],
        answer: '$936\\text{ m}$',
        markSchemeNotes: 'M1 for splitting into triangle/rectangle or trapezium, M1 full sum, A1 $936\\text{ m}$.',
      },
    ],
    rapidSummary: [
      { rule: 'Check the $y$-axis first!', detail: 'Flat line on $d$-$t$ means stopped; flat line on $v$-$t$ means moving at steady speed.' },
      { rule: 'Deceleration has NO minus sign', detail: 'If acceleration is $-3\\text{ m/s}^2$, say "deceleration $= 3\\text{ m/s}^2$".' },
    ],
  },
  '2.10': {
    bigIdea: 'The intersection points of two plotted graphs give the exact simultaneous solutions of their equations, while drawing a tangent lets you read the instantaneous gradient of a curve.',
    stepByStepMethod: [
      'Fill in the table of values by bracketing negative $x$ inputs in your calculator ($y = (-2)^3 - 3(-2)$).',
      'Plot each $(x, y)$ point cleanly with a small sharp cross (`x`), then connect with one smooth continuous freehand curve (never ruler segments!).',
      'To solve $f(x) = g(x)$ using your plotted curve $y = f(x)$, rearrange so one side matches your plotted curve and draw the straight line $y = g(x)$ on the same grid.',
    ],
    comparisonTable: {
      title: 'Standard IGCSE Graph Shapes',
      headers: ['Equation Family', 'Shape Name', 'Key Behaviour'],
      rows: [
        ['$y = ax^2 + bx + c$', 'Parabola ($U$ or $\\cap$)', 'Symmetric around turning point'],
        ['$y = ax^3 + bx^2 + cx + d$', 'Cubic S-curve', 'Up to $2$ turning points'],
        ['$y = \\frac{a}{x}$ ($a > 0$)', 'Reciprocal hyperbola', 'Two branches; asymptotes at axes ($x \\neq 0$)'],
        ['$y = a \\cdot b^x$ ($b > 1$)', 'Exponential curve', 'Crosses $(0, a)$; steep growth'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Solving a Modified Equation by Drawing a Straight Line (Extended)',
        body: 'Suppose you already plotted $y = x^2 - 3x + 1$, and Part (c) asks you to solve $x^2 - 5x - 2 = 0$ graphically. Subtract the new equation from your plotted curve: $y - 0 = (x^2 - 3x + 1) - (x^2 - 5x - 2) = 2x + 3$. Plot the line $y = 2x + 3$ and read the $x$-coordinates of intersection!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding the straight line to draw',
        question: 'The graph of $y = x^2 - 4x$ is drawn. State the equation of the straight line you should draw to solve $x^2 - 6x + 3 = 0$.',
        marks: 2,
        steps: [
          'Rearrange $x^2 - 6x + 3 = 0$ to isolate $x^2 - 4x$ on the left.',
          'Add $2x - 3$ to both sides: $x^2 - 4x = 2x - 3$. Draw $y = 2x - 3$.',
        ],
        answer: '$y = 2x - 3$',
        markSchemeNotes: 'M1 for matching $x^2 - 4x$ on one side, A1 for $y = 2x - 3$.',
      },
    ],
    rapidSummary: [
      { rule: 'Never connect curve points with a ruler', detail: 'Always draw a smooth continuous freehand curve.' },
      { rule: 'Divide by $0$ undefined', detail: 'Reciprocal graphs $y = \\frac{k}{x}$ never touch the $y$-axis.' },
    ],
  },
  '2.11': {
    bigIdea: 'Beyond reading tables of points, recognising key shapes ($x^n$, $\\frac{a}{x}$, $a^x$) lets you sketch curves immediately using intercepts, symmetry, and asymptotes.',
    stepByStepMethod: [
      'Find the $y$-intercept by setting $x = 0$ (if defined).',
      'Find $x$-intercepts (roots) by factorising or setting $y = 0$.',
      'Check symmetry / end behaviour as $x \\to \\pm\\infty$ and draw asymptotes (dashed lines the curve approaches without crossing).',
    ],
    comparisonTable: {
      title: 'Sketching Checklist by Function Family',
      headers: ['Function', 'Intercepts', 'Asymptotes / Symmetry'],
      rows: [
        ['Quadratic $y = (x - p)(x - q)$', '$(p,0), (q,0), (0, pq)$', 'Line of symmetry $x = \\frac{p+q}{2}$'],
        ['Reciprocal $y = \\frac{a}{x^2}$ ($a > 0$)', 'No axis intercepts', 'Both branches above $x$-axis ($y > 0$)'],
        ['Exponential $y = k \\cdot a^x$', '$(0, k)$', 'Horizontal asymptote $y = 0$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Distinguishing $y = \\frac{1}{x}$ vs $y = \\frac{1}{x^2}$',
        body: 'In $y = \\frac{1}{x}$, negative $x$ gives negative $y$ (Quadrants I and III). In $y = \\frac{1}{x^2}$, squaring $x$ keeps $y$ strictly positive for both $+x$ and $-x$ (Quadrants I and II, symmetric about the $y$-axis).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Sketching a factored quadratic',
        question: 'State the intercepts and vertex coordinates of $y = (x - 2)(x - 6)$.',
        marks: 3,
        steps: [
          '$x$-intercepts: $(2, 0)$ and $(6, 0)$. $y$-intercept ($x=0$): $(-2)(-6) = 12 \\implies (0, 12)$.',
          'Vertex $x = \\frac{2+6}{2} = 4$; $y = (4-2)(4-6) = -4 \\implies (4, -4)$.',
        ],
        answer: 'Roots $(2,0),(6,0)$; $y$-int $(0,12)$; vertex $(4,-4)$',
        markSchemeNotes: 'B1 roots, B1 $y$-intercept, B1 vertex $(4, -4)$.',
      },
    ],
    rapidSummary: [
      { rule: 'Label intercepts & turning point', detail: 'A sketch does not need a plotted grid, only shape and key coordinates.' },
      { rule: 'Asymptotes = forbidden lines', detail: 'Draw dashed boundary lines where denominator equals zero or exponential $y = 0$.' },
    ],
  },
  '2.12': {
    bigIdea: 'Differentiation gives the gradient formula $\\frac{\\mathrm{d}y}{\\mathrm{d}x}$ at ANY point $x$ on a curve. Where a curve peaks or bottoms out (a stationary point), its tangent is completely flat ($\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 0$).',
    stepByStepMethod: [
      'Rewrite terms into power form $ax^n$ first (constants differentiate to $0$, linear $bx$ differentiates to $b$).',
      'Apply the power rule to each term: $\\frac{\\mathrm{d}}{\\mathrm{d}x}(ax^n) = anx^{n-1}$.',
      'To find turning/stationary points, solve $\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 0$ for $x$, then substitute back into original $y$ for coordinates.',
      'To classify maximum vs minimum, check $\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2}$ (positive $\\implies$ minimum; negative $\\implies$ maximum) or test gradient signs just left and right.',
    ],
    comparisonTable: {
      title: 'Differentiation Rules & Stationary Classification',
      headers: ['Rule / Test', 'Formula / Condition', 'Meaning'],
      rows: [
        ['Power rule', '$\\frac{\\mathrm{d}}{\\mathrm{d}x}(ax^n) = anx^{n-1}$', 'Instantaneous gradient function'],
        ['Stationary point', '$\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 0$', 'Horizontal tangent (local max or min)'],
        ['Minimum point', '$\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2} > 0$', 'Curve opens upward ($- \\to 0 \\to +$ slope)'],
        ['Maximum point', '$\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2} < 0$', 'Curve opens downward ($+ \\to 0 \\to -$ slope)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Important Scope Note for 0580 (Integer Exponents $\\ge 0$)',
        body: 'In IGCSE 0580 Extended, differentiation focuses on polynomials of the form $ax^n$ where $n$ is a positive integer or zero (including expanding products like $x(x-4)^2$ before differentiating). Always expand brackets first!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Classifying a stationary point',
        question: 'Find the stationary point of $y = 6x - x^2$ and state whether it is a maximum or minimum.',
        marks: 3,
        steps: [
          'Differentiate: $\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 6 - 2x = 0 \\implies x = 3$.',
          'Coordinate: $y = 6(3) - 3^2 = 9$, so $(3, 9)$. Second derivative $\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2} = -2 < 0 \\implies$ Maximum.',
        ],
        answer: '$(3, 9)$, Maximum',
        markSchemeNotes: 'M1 for $6 - 2x = 0$, A1 $(3, 9)$, B1 Maximum with valid reason.',
      },
    ],
    rapidSummary: [
      { rule: 'Expand brackets before differentiating', detail: 'Turn $y = (x+2)(x-3)$ into $x^2 - x - 6$ first.' },
      { rule: 'Always give BOTH $(x, y)$ if asked for coordinates', detail: 'Plug stationary $x$ back into the ORIGINAL $y$ equation.' },
    ],
  },
  '2.13': {
    bigIdea: 'A function $\\mathrm{f}(x)$ is a machine mapping inputs to outputs. Composite $\\mathrm{fg}(x)$ means pass $x$ into $\\mathrm{g}$ FIRST, then feed that output into $\\mathrm{f}$. Inverse $\\mathrm{f}^{-1}(x)$ runs the machine backwards.',
    stepByStepMethod: [
      'Evaluate $\\mathrm{fg}(a)$ from RIGHT to LEFT: compute $\\mathrm{g}(a)$ first, then $\\mathrm{f}(\\text{result})$.',
      'To find $\\mathrm{f}^{-1}(x)$: replace $\\mathrm{f}(x)$ with $y$, swap $x$ and $y$, rearrange to make $y$ the subject, and write $\\mathrm{f}^{-1}(x) = \\dots$',
      'Remember $\\mathrm{f}^{-1}(x)$ is NOT the reciprocal $\\frac{1}{\\mathrm{f}(x)}$!',
    ],
    comparisonTable: {
      title: 'Function Operations Summary',
      headers: ['Notation', 'Order / Method', 'Common Misconception'],
      rows: [
        ['$\\mathrm{fg}(x)$', '$\\mathrm{f}(\\mathrm{g}(x))$ — apply $\\mathrm{g}$ first', 'NOT $\\mathrm{f}(x) \\times \\mathrm{g}(x)$ and usually $\\neq \\mathrm{gf}(x)$'],
        ['$\\mathrm{f}^{-1}(x)$', 'Swap $x \\leftrightarrow y$ and solve for $y$', 'NOT $[\\mathrm{f}(x)]^{-1} = \\frac{1}{\\mathrm{f}(x)}$'],
        ['$\\mathrm{ff}^{-1}(x)$', 'Always cancels back to $x$', 'Domain matches range of inverse'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Values Excluded from a Function\'s Domain',
        body: 'In $\\mathrm{h}(x) = \\frac{5}{2x - 6}$, you cannot divide by zero, so set $2x - 6 = 0 \\implies x = 3$ must be excluded from the domain ($x \\neq 3$). Geometrically, $y = \\mathrm{f}^{-1}(x)$ is always the reflection of $y = \\mathrm{f}(x)$ across the line $y = x$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding an algebraic inverse function',
        question: 'Given $\\mathrm{f}(x) = \\frac{2x + 1}{x - 3}$ ($x \\neq 3$), find $\\mathrm{f}^{-1}(x)$.',
        marks: 3,
        steps: [
          'Write $y = \\frac{2x + 1}{x - 3}$ and swap $x$ and $y$: $x = \\frac{2y + 1}{y - 3}$.',
          'Solve for $y$: $xy - 3x = 2y + 1 \\implies y(x - 2) = 3x + 1 \\implies \\mathrm{f}^{-1}(x) = \\frac{3x + 1}{x - 2}$.',
        ],
        answer: '$\\mathrm{f}^{-1}(x) = \\frac{3x + 1}{x - 2}$',
        markSchemeNotes: 'M1 for clearing denominator after swapping, M1 grouping $y$ terms, A1 final.',
      },
    ],
    rapidSummary: [
      { rule: 'Right-to-left composition', detail: '$\\mathrm{fg}(x) = \\mathrm{f}(\\mathrm{g}(x))$.' },
      { rule: 'Reverse flowchart', detail: 'For linear functions like $3x - 5$, add $5$ then divide by $3$: $\\frac{x+5}{3}$.' },
    ],
  },
  '3.1': {
    bigIdea: 'Cartesian coordinates $(x, y)$ pinpoint any flat position using horizontal shift $x$ first and vertical shift $y$ second ("along the corridor, up/down the stairs").',
    stepByStepMethod: [
      'Read horizontal axis ($x$) first, vertical axis ($y$) second.',
      'Check quadrant signs: Q1 $(+,+)$, Q2 $(-,+)$, Q3 $(-,-)$, Q4 $(+,-)$.',
      'Check the axis scale carefully before plotting — one grid square does not always equal $1$ unit!',
    ],
    comparisonTable: {
      title: 'Axes & Quadrants Quick Check',
      headers: ['Location', 'Condition', 'Example'],
      rows: [
        ['On $x$-axis', '$y = 0$', '$(5, 0)$'],
        ['On $y$-axis', '$x = 0$', '$(0, -4)$'],
        ['Origin', '$x = 0, y = 0$', '$(0, 0)$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Completing Symmetric Shapes on Coordinate Axes',
        body: 'In Core/Extended Paper 1, given three vertices of a parallelogram or rhombus, use vector shifts ($\\Delta x, \\Delta y$) from one pair of opposite corners to locate the exact fourth vertex cleanly.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Fourth vertex of a parallelogram',
        question: 'Points $A(1, 2)$, $B(5, 2)$, and $C(7, 6)$ are three vertices of parallelogram $ABCD$. Find coordinates of $D$.',
        marks: 2,
        steps: [
          'Moving $B(5,2) \\to A(1,2)$ shifts $(-4, 0)$.',
          'Apply the same shift from $C(7,6)$: $D = (7 - 4, 6 + 0) = (3, 6)$.',
        ],
        answer: '$D(3, 6)$',
        markSchemeNotes: 'M1 for matching opposite side shift, A1 for $(3, 6)$.',
      },
    ],
    rapidSummary: [
      { rule: '$x$ before $y$', detail: 'Point $(a, b)$ moves $a$ horizontally then $b$ vertically.' },
      { rule: 'Zero on the OTHER axis', detail: 'Points on the $x$-axis have $y = 0$; points on the $y$-axis have $x = 0$.' },
    ],
  },
  '3.2': {
    bigIdea: 'To draw a straight line $y = mx + c$, pick $3$ convenient $x$-values, compute $y$, plot the points, and join them across the ENTIRE grid with a ruler.',
    stepByStepMethod: [
      'Rearrange to $y = mx + c$ or plug in $x = 0$ and $y = 0$ to find intercepts quickly.',
      'Plot at least $3$ points (the third acts as an instant error check!).',
      'Draw one straight line extending across the full grid width.',
    ],
    comparisonTable: {
      title: 'Special Line Equations',
      headers: ['Equation', 'Direction', 'Gradient'],
      rows: [
        ['$x = k$', 'Vertical line through $(k, 0)$', 'Undefined'],
        ['$y = k$', 'Horizontal line through $(0, k)$', '$0$'],
        ['$y = x$', 'Diagonal through origin at $45^\\circ$', '$1$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Cover-Up Intercept Method for $ax + by = c$',
        body: 'For lines in general form like $3x + 4y = 12$, setting $x = 0$ immediately gives $4y = 12 \\implies (0, 3)$, and setting $y = 0$ gives $3x = 12 \\implies (4, 0)$. Joining those two intercepts plots the line in seconds.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Testing if a point lies on a line',
        question: 'Does the point $P(4, -5)$ lie on the line $3x + 2y = 2$?',
        marks: 2,
        steps: [
          'Substitute $x = 4, y = -5$ into LHS: $3(4) + 2(-5) = 12 - 10 = 2$.',
          'Since LHS equals RHS ($2$), YES, $P$ lies on the line.',
        ],
        answer: 'Yes ($12 - 10 = 2$)',
        markSchemeNotes: 'M1 substitution, A1 conclusion with $2 = 2$.',
      },
    ],
    rapidSummary: [
      { rule: 'Always plot 3 points', detail: 'If the 3 points do not form a straight line, re-check your arithmetic!' },
      { rule: 'Verify by substitution', detail: 'A point $(p, q)$ lies on $y = mx + c$ only when $q = mp + c$.' },
    ],
  },
  '3.3': {
    bigIdea: 'Gradient measures steepness: vertical rise divided by horizontal run ($m = \\frac{y_2 - y_1}{x_2 - x_1}$). Positive tilts uphill left-to-right; negative tilts downhill.',
    stepByStepMethod: [
      'Label points $(x_1, y_1)$ and $(x_2, y_2)$ in order so you never swap numerator and denominator order.',
      'Compute $m = \\frac{y_2 - y_1}{x_2 - x_1}$ keeping negative signs bracketed.',
      'Sanity-check the sign visually: uphill left-to-right must be $+$; downhill must be $-$.',
    ],
    comparisonTable: {
      title: 'Gradient Signs & Special Slopes',
      headers: ['Visual Direction (Left $\\to$ Right)', 'Gradient Value', 'Description'],
      rows: [
        ['Rises uphill', '$m > 0$', 'Positive correlation / increasing'],
        ['Falls downhill', '$m < 0$', 'Negative correlation / decreasing'],
        ['Completely flat', '$m = 0$', 'Horizontal line $y = c$'],
        ['Vertical wall', 'Undefined', 'Division by $\\Delta x = 0$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Showing Three Points Are Collinear',
        body: 'Points $A, B, C$ lie on the same straight line if and only if $\\text{gradient}(AB) = \\text{gradient}(BC)$ (since both share point $B$).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Finding a missing coordinate from gradient',
        question: 'The line through $(2, 5)$ and $(k, 17)$ has gradient $3$. Find $k$.',
        marks: 2,
        steps: [
          'Set up $\\frac{17 - 5}{k - 2} = 3 \\implies \\frac{12}{k - 2} = 3$.',
          'Multiply: $3(k - 2) = 12 \\implies k - 2 = 4 \\implies k = 6$.',
        ],
        answer: '$k = 6$',
        markSchemeNotes: 'M1 gradient equation, A1 $k = 6$.',
      },
    ],
    rapidSummary: [
      { rule: 'Rise over Run', detail: 'Always put $y$-difference on top and $x$-difference on the bottom.' },
      { rule: 'Horizontal vs Vertical', detail: 'Horizontal lines have gradient $0$; vertical lines have undefined gradient.' },
    ],
  },
  '3.4': {
    bigIdea: 'The midpoint simply averages the $x$-coordinates and averages the $y$-coordinates; the distance between two points applies Pythagoras to the horizontal and vertical gaps $(\\Delta x, \\Delta y)$.',
    stepByStepMethod: [
      'Midpoint $M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$ — average $x$ and average $y$.',
      'Length $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ (always positive because squares kill minus signs).',
      'Leave exact surd answers like $\\sqrt{50} = 5\\sqrt{2}$ in Paper 2 unless decimals ($3$ s.f.) are requested.',
    ],
    comparisonTable: {
      title: 'Midpoint vs Distance Formulae',
      headers: ['Quantity', 'Formula', 'Output Type'],
      rows: [
        ['Midpoint $M$', '$\\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$', 'Coordinate pair $(x_M, y_M)$'],
        ['Distance $AB$', '$\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$', 'Single positive length'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Reverse Midpoint Problems',
        body: 'If $M(4, 1)$ is the midpoint of $A(1, -3)$ and $B(x, y)$, solve $\\frac{1 + x}{2} = 4 \\implies x = 7$ and $\\frac{-3 + y}{2} = 1 \\implies y = 5$, or simply repeat the jump from $A$ to $M$: $(+3, +4)$ again gives $B(7, 5)$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Reverse midpoint endpoint',
        question: '$M(-2, 5)$ is the midpoint of $PQ$. Given $P(3, 1)$, find $Q$.',
        marks: 2,
        steps: [
          'Step from $P$ to $M$: $\\Delta x = -2 - 3 = -5$, $\\Delta y = 5 - 1 = +4$.',
          'Repeat step from $M$: $Q = (-2 - 5, 5 + 4) = (-7, 9)$.',
        ],
        answer: '$Q(-7, 9)$',
        markSchemeNotes: 'M1 for midpoint formula or vector step, A1 $(-7, 9)$.',
      },
    ],
    rapidSummary: [
      { rule: 'Square before adding', detail: 'In $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$, wrap negative differences in brackets before squaring.' },
      { rule: 'Midpoint adds, Distance subtracts', detail: 'Average coordinates ($+$) for midpoint; subtract differences ($-$) inside distance.' },
    ],
  },
  '3.5': {
    bigIdea: 'Every non-vertical line is uniquely pinned down by its steepness $m$ and its starting height $c$ on the $y$-axis: $y = mx + c$. Rearranging $ax + by + c = 0$ into $y = mx + c$ reveals both instantly.',
    stepByStepMethod: [
      'Find gradient $m$ (from two points, a diagram, or another parallel/perpendicular line).',
      'Plug in one known point $(x_0, y_0)$ into $y = mx + c$ to solve for $c$.',
      'Write the final equation cleanly in whichever form the question specifies ($y = mx + c$ or $ax + by = c$).',
    ],
    comparisonTable: {
      title: 'Standard Linear Equation Forms',
      headers: ['Form', 'Best For', 'Example'],
      rows: [
        ['$y = mx + c$', 'Reading gradient $m$ and $y$-int $c$ instantly', '$y = 3x - 4 \\implies m=3, c=-4$'],
        ['$ax + by = d$', 'Integer-coefficient Paper 2/4 answers', '$2x + 5y = 10$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Finding Gradient from a Graph Grid',
        body: 'Pick two points where the line crosses exact grid intersections far apart, draw a right-angled triangle, and divide vertical grid units by horizontal grid units — always checking the scale numbers on both axes (each square might not equal $1$ unit!).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Equation from two coordinates',
        question: 'Find the equation of the straight line passing through $(2, -1)$ and $(6, 11)$.',
        marks: 3,
        steps: [
          'Gradient $m = \\frac{11 - (-1)}{6 - 2} = \\frac{12}{4} = 3$.',
          'Plug in $(2, -1)$: $-1 = 3(2) + c \\implies c = -7$. Equation: $y = 3x - 7$.',
        ],
        answer: '$y = 3x - 7$',
        markSchemeNotes: 'M1 for $m=3$, M1 substituting point, A1 $y = 3x - 7$.',
      },
    ],
    rapidSummary: [
      { rule: 'Isolate $y$ to read $m$', detail: 'In $2y + 4x = 10$, first divide by $2$: $y = -2x + 5$, so $m = -2$ (NOT $4$!).' },
      { rule: 'Check axis scales on graphs', detail: 'Read grid axis values directly — never count raw squares assuming $1:1$ scale.' },
    ],
  },
  '3.6': {
    bigIdea: 'Parallel lines share the exact same steepness ($m_1 = m_2$), so their equations differ ONLY by their $y$-intercept shift $c$.',
    stepByStepMethod: [
      'Rearrange the given line into $y = mx + c$ to read off $m_1$.',
      'Keep $m_2 = m_1$ identical for the parallel line.',
      'Substitute the given point $(x_0, y_0)$ into $y = m_1 x + c$ to find the new $c$.',
    ],
    comparisonTable: {
      title: 'Parallel Lines Comparison',
      headers: ['Line 1', 'Line 2', 'Relationship'],
      rows: [
        ['$y = 4x + 1$', '$y = 4x - 9$', 'Parallel ($m_1 = m_2 = 4$)'],
        ['$3x + y = 7$', '$6x + 2y = 5$', 'Parallel ($m_1 = m_2 = -3$)'],
        ['$y = 2x + 1$', '$y = -2x + 1$', 'NOT parallel ($2 \\neq -2$)'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Proving Parallelism in Vector / Coordinate Geometry',
        body: 'In Paper 4, showing two lines never meet simply requires rearranging both into $y = mx + c$ and proving their gradients $m_1$ and $m_2$ are identical while their $y$-intercepts differ.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Parallel line from general form',
        question: 'Find the equation of the line parallel to $2x + 5y = 10$ passing through $(5, -3)$.',
        marks: 3,
        steps: [
          'Rearrange: $5y = -2x + 10 \\implies y = -\\frac{2}{5}x + 2$, so $m = -\\frac{2}{5}$.',
          'Substitute $(5, -3)$: $-3 = -\\frac{2}{5}(5) + c \\implies -3 = -2 + c \\implies c = -1$.',
        ],
        answer: '$y = -\\frac{2}{5}x - 1$',
        markSchemeNotes: 'M1 for $m = -\\frac{2}{5}$, M1 substituting $(5, -3)$, A1 final.',
      },
    ],
    rapidSummary: [
      { rule: 'Parallel = Same $m$', detail: 'Never copy the $x$-coefficient before isolating $1y$.' },
      { rule: 'Distinct lines need different $c$', detail: 'Equal $m$ AND equal $c$ represents the exact same line rather than two parallel lines.' },
    ],
  },
  '3.7': {
    bigIdea: 'Perpendicular lines meet at $90^\\circ$ and have opposite tilts: one slopes up while the other slopes down, so their gradients are negative reciprocals ($m_1 \\times m_2 = -1$).',
    stepByStepMethod: [
      'Find $m_1$ of the original line (or segment $AB$).',
      'Flip the fraction AND change its sign: $m_\\perp = -\\frac{1}{m_1}$.',
      'For a perpendicular bisector of $AB$, find BOTH the midpoint $M$ AND $m_\\perp$, then plug $M$ into $y = m_\\perp x + c$.',
    ],
    comparisonTable: {
      title: 'Negative Reciprocal Gradient Pairs',
      headers: ['Original Gradient $m_1$', 'Perpendicular Gradient $m_\\perp$', 'Product Check'],
      rows: [
        ['$3$', '$-\\frac{1}{3}$', '$3 \\times (-\\frac{1}{3}) = -1$'],
        ['$-\\frac{2}{5}$', '$+\\frac{5}{2}$', '$(-\\frac{2}{5}) \\times \\frac{5}{2} = -1$'],
        ['$1$', '$-1$', '$1 \\times (-1) = -1$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Four-Step Perpendicular Bisector Recipe (High-Yield Exam Question)',
        body: 'Perpendicular bisector questions appear in almost every Extended session: (1) Midpoint $M$ of $AB$, (2) Gradient $m_{AB}$, (3) Negative reciprocal $m_\\perp$, (4) Plug $M$ into $y = m_\\perp x + c$. NEVER plug $A$ or $B$ into Step 4 — only the midpoint $M$ lies on the bisector!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Perpendicular bisector of segment $AB$',
        question: 'Find the equation of the perpendicular bisector of $A(1, 2)$ and $B(5, 10)$.',
        marks: 4,
        steps: [
          'Midpoint $M = (\\frac{1+5}{2}, \\frac{2+10}{2}) = (3, 6)$.',
          'Gradient $m_{AB} = \\frac{10-2}{5-1} = 2 \\implies m_\\perp = -\\frac{1}{2}$.',
          'Substitute $M(3, 6)$: $6 = -\\frac{1}{2}(3) + c \\implies c = 7.5$.',
        ],
        answer: '$y = -\\frac{1}{2}x + 7.5$',
        markSchemeNotes: 'B1 midpoint $(3,6)$, B1 $m_{AB}=2$, M1 $m_\\perp = -\\frac{1}{2}$ + sub $(3,6)$, A1 final.',
      },
    ],
    rapidSummary: [
      { rule: 'Perpendicular bisector uses MIDPOINT $M$', detail: 'Plug $M$ (not $A$ or $B$) into $y = m_\\perp x + c$.' },
      { rule: 'Flip AND negate', detail: 'Changing only the sign or only flipping loses all follow-through accuracy marks.' },
    ],
  },
  '4.1': {
    bigIdea: 'Geometry problems rely on precise definitions: congruent shapes are identical twins ($\\text{SSS, SAS, ASA, RHS}$), while similar shapes are scaled versions with equal angles and proportional sides.',
    stepByStepMethod: [
      'Mark equal angles, parallel arrows (`>`), and equal side ticks directly onto the diagram first.',
      'Check polygon names carefully by counting vertices ($5$: Pentagon, $6$: Hexagon, $7$: Heptagon, $8$: Octagon, $10$: Decagon).',
      'Classify quadrilaterals using BOTH side equality and diagonal angles.',
    ],
    comparisonTable: {
      title: 'Quadrilateral Hierarchy & Properties',
      headers: ['Quadrilateral', 'Sides & Parallelism', 'Angles & Diagonals'],
      rows: [
        ['Parallelogram', 'Opposite sides parallel & equal', 'Opposite angles equal; diagonals bisect each other'],
        ['Rhombus', 'All $4$ sides equal; opposite parallel', 'Diagonals bisect at $90^\\circ$ and bisect vertex angles'],
        ['Rectangle', 'Opposite sides parallel & equal', 'All angles $90^\\circ$; equal diagonals bisecting each other'],
        ['Kite', '$2$ pairs of adjacent equal sides', 'One pair of opposite angles equal; diagonals meet at $90^\\circ$'],
        ['Trapezium', 'Exactly $1$ pair of parallel sides', 'Co-interior angles between parallel sides sum to $180^\\circ$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Four Congruence Proof Criteria (SSS, SAS, ASA, RHS)',
        body: 'To prove $\\triangle ABC \\equiv \\triangle DEF$ in Paper 4, state THREE matching facts with reasons (e.g. "$AB = DE$ (given)", "$\\angle B = \\angle E$ (alternate angles)", "$BC = EF$ (given)") and finish with the valid test (`SAS`, NOT `ASS`/`SSA`, which is ambiguous!).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Naming polygons & angle types',
        question: 'Write down the mathematical name of (a) a $7$-sided polygon, (b) a triangle with two equal sides, and (c) an angle of $195^\\circ$.',
        marks: 3,
        steps: [
          '(a) $7$ sides $\\to$ Heptagon.',
          '(b) Two equal sides $\\to$ Isosceles triangle.',
          '(c) Between $180^\\circ$ and $360^\\circ$ $\\to$ Reflex angle.',
        ],
        answer: '(a) Heptagon, (b) Isosceles, (c) Reflex',
        markSchemeNotes: 'B1 each correct geometric term.',
      },
    ],
    rapidSummary: [
      { rule: 'Never use ASS/SSA or AAA', detail: 'Valid congruence proofs are SSS, SAS, ASA/AAS, and RHS only.' },
      { rule: 'Congruent vs Similar', detail: 'Congruent shapes are identical in size ($k = 1$); similar shapes preserve angles with scaled sides.' },
    ],
  },
  '4.2': {
    bigIdea: 'Straightedge-and-compass constructions draw exact points at fixed distances without guessing. Keeping compass arcs clearly visible earns the method marks on Cambridge papers.',
    stepByStepMethod: [
      'Draw base segment accurately with a sharp pencil and ruler.',
      'Open compasses to exact required radius and swing smooth arcs (NEVER erase arcs!).',
      'For a perpendicular bisector: open compass past halfway of $AB$, swing arcs above & below from $A$ and $B$.',
      'For an angle bisector: swing one arc from vertex cutting both arms, then swing equal arcs from those two crossings.',
    ],
    comparisonTable: {
      title: 'Standard Compass Constructions',
      headers: ['Construction', 'Arc Method', 'Locus Meaning'],
      rows: [
        ['Perpendicular bisector of $AB$', 'Equal radii $> \\frac{1}{2}AB$ from $A$ and $B$', 'Points equidistant from two points $A$ and $B$'],
        ['Angle bisector of $\\angle ABC$', 'Arc from $B$, then equal arcs from both intersections', 'Points equidistant from two lines $BA$ and $BC$'],
        ['Circle of radius $r$ around $P$', 'Compass centred at $P$, radius $r$', 'Points at fixed distance $r$ from point $P$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Checking Ruler & Protractor Tolerances',
        body: 'Cambridge mark schemes typically enforce $\\pm 2\\text{ mm}$ tolerance on drawn lengths and $\\pm 2^\\circ$ tolerance on drawn angles. Always sharpen your pencil and align the `0` crosshairs of the protractor carefully.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Loci intersection summary',
        question: 'A treasure is buried equidistant from trees $A$ and $B$, and less than $4\\text{ cm}$ from post $C$. Describe the construction needed.',
        marks: 2,
        steps: [
          'Draw the perpendicular bisector of segment $AB$ (equidistant from $A$ and $B$).',
          'Draw a circle of radius $4\\text{ cm}$ centred at $C$; highlight the segment of the bisector lying inside that circle.',
        ],
        answer: 'Segment of perpendicular bisector of $AB$ inside circle centre $C$, radius $4\\text{ cm}$',
        markSchemeNotes: 'B1 perpendicular bisector of $AB$, B1 circle radius $4\\text{ cm}$ at $C$.',
      },
    ],
    rapidSummary: [
      { rule: 'Keep all compass arcs!', detail: 'Erasing construction arcs costs the construction method marks.' },
      { rule: 'Perpendicular vs Angle bisector', detail: 'Equal distance from $2$ points $\\to$ perp bisector; equal distance from $2$ lines $\\to$ angle bisector.' },
    ],
  },
  '4.3': {
    bigIdea: 'Three-figure bearings remove compass ambiguity by fixing TWO universal rules: ALWAYS start at North ($000^\\circ$), and ALWAYS turn CLOCKWISE using three digits.',
    stepByStepMethod: [
      'Read the phrase "bearing of $B$ **from** $A$": draw a vertical North arrow (`N`) at the **FROM** point ($A$).',
      'Measure the clockwise angle from North at $A$ to line $AB$.',
      'Pad angles below $100^\\circ$ with a leading zero (e.g. $054^\\circ$, never $54^\\circ$).',
      'To reverse ("bearing of $A$ from $B$"): add $180^\\circ$ if original $< 180^\\circ$, or subtract $180^\\circ$ if original $\\ge 180^\\circ$.',
    ],
    comparisonTable: {
      title: 'Compass Points, Reverse Bearings & Extended Trig Strategy',
      headers: ['Bearing Case / Direction', 'Bearing Rule / Method', 'Opposite / Formula'],
      rows: [
        ['North / East / South / West', '$000^\\circ, 090^\\circ, 180^\\circ, 270^\\circ$', 'Reverse by $\\pm 180^\\circ$ to stay in $[000^\\circ, 360^\\circ)$'],
        ['NE / SE / SW / NW', '$045^\\circ, 135^\\circ, 225^\\circ, 315^\\circ$', 'Always pad with leading zero if $< 100^\\circ$'],
        ['Right-angled turn ($90^\\circ$ between legs)', 'Pythagoras + SOH CAH TOA', '$c = \\sqrt{a^2 + b^2}$, $\\tan\\theta = \\frac{O}{A}$'],
        ['Non-right-angled 3-point triangle ($A,B,C$)', 'Parallel North co-interior angle $\\to$ Cosine / Sine Rule', '$b^2 = a^2 + c^2 - 2ac\\cos B$, $\\frac{\\sin A}{a} = \\frac{\\sin B}{b}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Combining Parallel North Lines with Trigonometry (Extended Paper 4)',
        body: 'All vertical North arrows are strictly parallel! Use co-interior angles ($180^\\circ - \\theta$) and alternate angles inside the diagram to find an interior angle of $\\triangle ABC$, then apply Sine Rule or Cosine Rule (`6.5`) to calculate missing distances or return bearings.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Scale drawing + bearing',
        question: 'On a map with scale $1\\text{ cm}$ represents $5\\text{ km}$, harbour $H$ is $3.4\\text{ cm}$ from ship $S$ on a bearing of $215^\\circ$. Find (a) the actual distance and (b) the bearing of $S$ from $H$.',
        marks: 2,
        steps: [
          '(a) Actual distance $= 3.4 \\times 5 = 17\\text{ km}$.',
          '(b) Back bearing (since $215^\\circ > 180^\\circ$): $215^\\circ - 180^\\circ = 035^\\circ$.',
        ],
        answer: '(a) $17\\text{ km}$, (b) $035^\\circ$',
        markSchemeNotes: 'B1 $17\\text{ km}$, B1 $035^\\circ$.',
      },
    ],
    rapidSummary: [
      { rule: 'North, Clockwise, 3 Digits', detail: 'Stand at the point AFTER "from", turn clockwise from North, and write a leading zero when $< 100^\\circ$ (e.g. $045^\\circ$).' },
      { rule: 'Reverse bearing = $\\pm 180^\\circ$', detail: 'Switch direction between $A$ and $B$ by adding or subtracting $180^\\circ$ to stay in $[000^\\circ, 360^\\circ)$.' },
      { rule: 'Extended: Parallel North = Transversal', detail: 'Use co-interior $180^\\circ - \\theta$ at vertex $B$ before applying Sine or Cosine Rule.' },
    ],
  },
  '4.4': {
    bigIdea: 'When a 2D shape or 3D solid is enlarged by linear scale factor $k$, EVERY length scales by $k$, EVERY area scales by $k^2$, and EVERY volume (or mass of same material) scales by $k^3$.',
    stepByStepMethod: [
      'Match corresponding sides opposite equal angles (especially in "bowtie" parallel triangles!).',
      'Find linear scale factor $k = \\frac{\\text{New length}}{\\text{Original length}}$, or extract $k = \\sqrt{\\frac{A_2}{A_1}}$ or $k = \\sqrt[3]{\\frac{V_2}{V_1}}$.',
      'Scale lengths by $k$, surface/cross-section areas by $k^2$, and volumes/masses by $k^3$.',
    ],
    comparisonTable: {
      title: '1D Length vs 2D Area vs 3D Volume Scaling',
      headers: ['Dimension', 'Scale Factor', 'Reverse Step to Linear $k$'],
      rows: [
        ['Lengths, Perimeters, Radii', '$k$', '$k$ directly'],
        ['Areas, Surface Areas', '$k^2$', '$k = \\sqrt{\\text{Area ratio}}$'],
        ['Volumes, Capacities, Uniform Masses', '$k^3$', '$k = \\sqrt[3]{\\text{Volume ratio}}$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Separating Overlapping Triangles (Textbook Tip)',
        body: 'When a smaller triangle sits inside a larger triangle ($\\triangle ADE$ inside $\\triangle ABC$ with $DE \\parallel BC$), ALWAYS sketch the two triangles SEPARATELY side-by-side! That prevents the classic mistake of using only the truncated segment $DB$ instead of the full side $AB = AD + DB$.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Area & Volume link in similar solids',
        question: 'Two mathematically similar cylinders have volumes $54\\text{ cm}^3$ and $250\\text{ cm}^3$. The surface area of the smaller cylinder is $72\\text{ cm}^2$. Find the surface area of the larger cylinder.',
        marks: 3,
        steps: [
          'Volume ratio $= \\frac{250}{54} = \\frac{125}{27}$. Take cube root for length scale factor: $k = \\sqrt[3]{\\frac{125}{27}} = \\frac{5}{3}$.',
          'Area scale factor $= k^2 = \\frac{25}{9}$. Larger SA $= 72 \\times \\frac{25}{9} = 200\\text{ cm}^2$.',
        ],
        answer: '$200\\text{ cm}^2$',
        markSchemeNotes: 'M1 for $k = \\frac{5}{3}$, M1 for $72 \\times (\\frac{5}{3})^2$, A1 $200$.',
      },
    ],
    rapidSummary: [
      { rule: 'Always pass through $k$ first!', detail: 'Volume $\\xrightarrow{\\sqrt[3]{\\cdot}}$ Length $k$ $\\xrightarrow{(\\cdot)^2}$ Area.' },
      { rule: 'Match opposite sides', detail: 'Identify equal angle pairs before dividing corresponding sides.' },
    ],
  },
  '4.5': {
    bigIdea: 'Line symmetry folds a shape onto itself across a mirror line; rotational symmetry spins it around a centre and counts how many times it matches within one full $360^\\circ$ turn.',
    stepByStepMethod: [
      'Check horizontal, vertical, and diagonal mirror lines carefully (diagonals of a non-square rectangle are NOT mirror lines!).',
      'Count how many times a trace overlaps cleanly during a full $360^\\circ$ spin to get rotational symmetry order.',
      'For 3D prisms, remember a uniform prism always has a plane of symmetry slicing midway through its length.',
    ],
    comparisonTable: {
      title: '2D & 3D Symmetry Cheat Sheet',
      headers: ['Shape', 'Lines / Planes of Symmetry', 'Rotational Order'],
      rows: [
        ['Equilateral triangle', '$3$ lines', 'Order $3$'],
        ['Parallelogram', '$0$ lines', 'Order $2$'],
        ['Rhombus (non-square)', '$2$ lines (diagonals)', 'Order $2$'],
        ['Regular $n$-gon', '$n$ lines', 'Order $n$'],
        ['Cuboid (square cross-section)', '$5$ planes', 'Order $4$ along main axis'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Symmetry of Prisms & Pyramids (Extended)',
        body: 'A cylinder has infinitely many planes of symmetry containing its central axis PLUS one perpendicular cross-sectional plane halfway up its height. A right cone has infinitely many planes through its apex and base diameter.',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Symmetry of shaded grid',
        question: 'State the order of rotational symmetry and number of lines of symmetry of a square-based right pyramid.',
        marks: 2,
        steps: [
          'Four planes of symmetry pass vertically through the apex (two joining opposite base midpoints, two joining opposite base diagonals).',
          'Rotating $360^\\circ$ around the vertical axis matches $4$ times (order $4$).',
        ],
        answer: '$4$ planes of symmetry; rotational order $4$',
        markSchemeNotes: 'B1 for $4$ planes, B1 for order $4$.',
      },
    ],
    rapidSummary: [
      { rule: 'No rotational order $0$', detail: 'Every shape matches itself after $360^\\circ$, so the minimum order is $1$.' },
      { rule: 'Rectangle diagonals', detail: 'Diagonals of a rectangle are NOT lines of symmetry (only squares and rhombuses have diagonal symmetry).' },
    ],
  },
  '4.6': {
    bigIdea: 'Angle geometry rests on two clean foundations: a straight transversal cutting parallel lines repeats just two supplementary angles ($\\theta$ and $180^\\circ - \\theta$), and walking around ANY convex polygon turns through $360^\\circ$ of exterior angles.',
    stepByStepMethod: [
      'Spot parallel line arrows (`>`) cut by a transversal: classify the pair as **Corresponding** (`F`, equal), **Alternate** (`Z`, equal), or **Co-interior / Allied** (`C`, sum to $180^\\circ$).',
      'If two parallel lines meet via a bent vertex instead of a straight line, draw an **auxiliary parallel line** right through the bend!',
      'For ANY regular polygon question, convert to **Exterior Angles FIRST**: $\\text{Exterior} = 180^\\circ - \\text{Interior}$, then $n = \\frac{360^\\circ}{\\text{Exterior}}$.',
      'For irregular polygons with $n$ sides, compute total interior sum $S = (n - 2) \\times 180^\\circ$ and subtract or solve algebraically.',
    ],
    comparisonTable: {
      title: 'Transversal Angle Rules & Regular Polygon Reference',
      headers: ['Rule / Polygon', 'Condition / Interior Sum', 'Relationship / Exterior', 'Formal Reason / Interior'],
      rows: [
        ['Corresponding (`F`)', 'Parallel lines + transversal, same side', 'Angles are **equal** ($a = b$)', '"Corresponding angles"'],
        ['Alternate (`Z`)', 'Parallel lines + transversal, opposite sides', 'Angles are **equal** ($a = c$)', '"Alternate angles"'],
        ['Co-interior / Allied (`C`)', 'Parallel lines + transversal, trapped inside', 'Sum $= 180^\\circ$ ($a + d = 180^\\circ$)', '"Co-interior angles sum to $180^\\circ$"'],
        ['Vertically opposite (`X`)', 'Two intersecting straight lines', 'Opposite angles **equal**', '"Vertically opposite angles"'],
        ['Regular Pentagon ($n=5$)', '$540^\\circ$', '$72^\\circ$', '$108^\\circ$'],
        ['Regular Hexagon ($n=6$)', '$720^\\circ$', '$60^\\circ$', '$120^\\circ$'],
        ['Regular Octagon ($n=8$)', '$1080^\\circ$', '$45^\\circ$', '$135^\\circ$'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Auxiliary Parallel Lines & Algebraic Transversal Proofs (Extended)',
        body: 'In Extended papers, two parallel horizontal lines $AB$ and $DE$ are often joined by a two-segment path $A\\text{–}C\\text{–}E$ forming a chevron at $C$. Draw a horizontal dashed line $CF \\parallel AB \\parallel DE$ right through $C$: the angle at $C$ splits cleanly into an upper angle (alternate or co-interior with $\\angle BAC$) plus a lower angle (alternate or co-interior with $\\angle DEC$).',
      },
      {
        heading: 'Regular vs Irregular Polygons — Which Formula to Pick?',
        body: 'Think of $(n - 2) \\times 180^\\circ$ as splitting an $n$-sided polygon from one corner into $(n - 2)$ triangles. This sum formula holds for BOTH regular and irregular polygons! However, you can ONLY divide by $n$ (or use $\\text{Exterior} = \\frac{360^\\circ}{n}$) when the question says the polygon is **REGULAR** (all sides and all angles equal).',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Auxiliary parallel line in a chevron + Regular polygon met at a point',
        question: '(a) Lines $PQ$ and $RS$ are parallel. Point $T$ lies between them with $\\angle QPT = 38^\\circ$ and $\\angle TSR = 47^\\circ$ (angled towards $T$ on the same right side). Find reflex $\\angle PTS$. (b) Two regular octagons and a regular polygon $P$ meet around a point. Find $n$ for $P$.',
        marks: 4,
        steps: [
          '(a) Draw an auxiliary line through $T$ parallel to $PQ$ and $RS$. Co-interior angles on the right side give $\\text{upper part} = 180^\\circ - 38^\\circ = 142^\\circ$ and $\\text{lower part} = 180^\\circ - 47^\\circ = 133^\\circ$, so reflex $\\angle PTS = 142^\\circ + 133^\\circ = 275^\\circ$ (acute $\\angle PTS = 38^\\circ + 47^\\circ = 85^\\circ$).',
          '(b) Regular octagon interior $= 180 - \\frac{360}{8} = 135^\\circ$. Around point: $\\text{Int}_P = 360 - 2(135) = 90^\\circ \\implies \\text{Ext}_P = 90^\\circ \\implies n = \\frac{360}{90} = 4$ sides.',
        ],
        answer: '(a) $275^\\circ$ (acute $85^\\circ$), (b) $4$ sides',
        markSchemeNotes: 'M1 auxiliary parallel line or $38+47$, A1 $275^\\circ$; M1 octagon $135^\\circ$, A1 $4$ sides.',
      },
    ],
    rapidSummary: [
      { rule: 'Corresponding & Alternate = Equal; Co-interior = $180^\\circ$', detail: 'Write formal names ("alternate angles", "co-interior angles sum to $180^\\circ$"), never "Z/F/C angles".' },
      { rule: 'Auxiliary parallel line', detail: 'Slice zig-zag vertices between parallel lines with an extra parallel line.' },
      { rule: 'Exterior polygon shortcut', detail: 'For regular polygons, find $\\text{Exterior} = 180^\\circ - \\text{Interior}$ first, then $n = \\frac{360^\\circ}{\\text{Ext}}$.' },
    ],
  },
  '4.7': {
    bigIdea: 'Before reaching for advanced circle theorems, check three Core rules that solve half of all circle diagrams: every radius has equal length (isosceles triangles!), diameters create $90^\\circ$ at the circumference, and tangents meet radii at $90^\\circ$.',
    stepByStepMethod: [
      'Mark equal tick lines on EVERY radius drawn from centre $O$.',
      'Spot any line passing through $O$ to the edge (diameter $\\implies 90^\\circ$ at circumference).',
      'Spot any tangent touching at $T$ ($\\angle\\text{radius–tangent} = 90^\\circ$, and two tangents from external $P$ are equal: $PA = PB$).',
    ],
    comparisonTable: {
      title: 'Fundamental Circle Theorems (Part I)',
      headers: ['Theorem', 'Visual Trigger', 'Exact Reason for Mark Scheme'],
      rows: [
        ['Angle in semicircle', 'Triangle built on a diameter', 'Angle in a semicircle is $90^\\circ$'],
        ['Tangent $\\perp$ radius', 'Line touches circle at $1$ point', 'Angle between tangent and radius is $90^\\circ$'],
        ['Two tangents from $P$', 'Two tangents meet outside circle', 'Tangents from an external point are equal ($PA = PB$)'],
        ['Chord symmetry (Ext)', 'Line from $O$ bisects chord', 'Perpendicular from centre bisects a chord'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Perpendicular Bisector of a Chord & Kite Symmetry (Extended)',
        body: 'When two tangents $PA$ and $PB$ meet a circle with centre $O$, quadrilateral $OAPB$ is ALWAYS a symmetric kite with two right angles ($\\angle OAP = \\angle OBP = 90^\\circ$), meaning $\\angle AOB + \\angle APB = 180^\\circ$ and line $OP$ bisects both angles!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Two tangents forming a cyclic kite',
        question: 'Tangents $PA$ and $PB$ touch circle centre $O$ at $A$ and $B$. If $\\angle APB = 52^\\circ$, find $\\angle OAB$.',
        marks: 3,
        steps: [
          'In kite $OAPB$, $\\angle OAP = \\angle OBP = 90^\\circ$, so $\\angle AOB = 180^\\circ - 52^\\circ = 128^\\circ$.',
          '$\\triangle OAB$ is isosceles ($OA = OB$ radii), so $\\angle OAB = \\frac{180^\\circ - 128^\\circ}{2} = 26^\\circ$.',
        ],
        answer: '$26^\\circ$',
        markSchemeNotes: 'M1 for $\\angle AOB = 128^\\circ$, M1 isosceles $\\triangle OAB$, A1 $26^\\circ$.',
      },
    ],
    rapidSummary: [
      { rule: 'Always mark radii first', detail: 'Two radii + chord always creates an isosceles triangle.' },
      { rule: 'Two right-angle triggers', detail: 'Diameter subtends $90^\\circ$; tangent meets radius at $90^\\circ$.' },
    ],
  },
  '4.8': {
    bigIdea: 'Four Extended circle theorems track arcs and tangents: double angle at centre, equal angles in the same segment, $180^\\circ$ across cyclic quadrilaterals, and the alternate segment theorem.',
    stepByStepMethod: [
      'Trace the TWO endpoints of an arc along the circumference to see what angles stand on that exact arc.',
      'Check if an angle stands at centre $O$ ($2\\theta$) vs circumference ($\\theta$).',
      'Check whether ALL FOUR corners of a quadrilateral touch the circumference (cyclic quad $\\implies$ opposite sum $180^\\circ$).',
      'Where a tangent meets a triangle vertex, compare tangent–chord angle directly to the interior triangle angle facing that chord.',
    ],
    comparisonTable: {
      title: 'Extended Circle Theorems & Exact Reasons',
      headers: ['Theorem', 'Algebraic Rule', 'Required Wording'],
      rows: [
        ['Centre vs Circumference', '$\\angle AOB = 2 \\times \\angle ACB$', 'Angle at centre is twice angle at circumference'],
        ['Same Segment', '$\\angle ACB = \\angle ADB$', 'Angles in the same segment are equal'],
        ['Cyclic Quadrilateral', '$A + C = 180^\\circ,\\ B + D = 180^\\circ$', 'Opposite angles of a cyclic quadrilateral sum to $180^\\circ$'],
        ['Alternate Segment', '$\\angle TAB = \\angle ACB$', 'Alternate segment theorem'],
      ],
    },
    extraStudyNotes: [
      {
        heading: 'Exterior Angle of a Cyclic Quadrilateral',
        body: 'Extending side $AB$ of cyclic quadrilateral $ABCD$ past $B$ to $E$ forms exterior angle $\\angle CBE$. Since $\\angle CBE + \\angle ABC = 180^\\circ$ and $\\angle ADC + \\angle ABC = 180^\\circ$, the exterior angle equals the interior opposite angle: $\\angle CBE = \\angle ADC$!',
      },
    ],
    extraWorkedExamples: [
      {
        title: 'Alternate segment theorem + triangle angle chase',
        question: 'Triangle $ABC$ is inscribed in a circle. Tangent $XY$ touches the circle at $A$. $\\angle XAB = 58^\\circ$ and $\\angle YAC = 47^\\circ$. Find $\\angle BAC$.',
        marks: 2,
        steps: [
          '$XAY$ is a straight line at $A$, so angles on a straight line sum to $180^\\circ$: $58^\\circ + \\angle BAC + 47^\\circ = 180^\\circ$.',
          '$\\angle BAC = 180^\\circ - 105^\\circ = 75^\\circ$ (and by alternate segment theorem, $\\angle ACB = 58^\\circ, \\angle ABC = 47^\\circ$).',
        ],
        answer: '$75^\\circ$',
        markSchemeNotes: 'M1 for $180 - (58 + 47)$, A1 for $75^\\circ$.',
      },
    ],
    rapidSummary: [
      { rule: 'Four corners ON circle = Cyclic', detail: 'If any corner is at centre $O$, it is NOT cyclic.' },
      { rule: 'Give full theorem names', detail: 'Cambridge often awards separate `B1` marks for the exact geometrical reason.' },
    ],
  },
};
