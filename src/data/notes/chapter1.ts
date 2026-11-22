import type { SubtopicNote } from '../../types/syllabus';

export const CHAPTER_1_NOTES: SubtopicNote[] = [
  {
    id: '1.1',
    chapterId: 1,
    code: '1.1',
    title: 'Types of number',
    tier: 'Core & Extended',
    summary: 'Classify integers, primes, squares, cubes, rationals, irrationals, reciprocals, and find HCF and LCM using prime factorisation.',
    coreObjectives: [
      'Identify and use natural numbers, integers (positive, zero and negative), prime numbers, square numbers, cube numbers, common factors and common multiples.',
      'Identify rational and irrational numbers and find reciprocals.',
      'Express any integer as a product of its prime factors and use this to find the Highest Common Factor (HCF) and Lowest Common Multiple (LCM).',
    ],
    keyFormulas: [
      { label: 'Prime factor form', latex: 'N = p_1^{a} \\times p_2^{b} \\times \\dots', note: 'Write prime bases in ascending order.' },
      { label: 'Reciprocal of a number', latex: '\\text{Reciprocal of } \\frac{a}{b} = \\frac{b}{a} \\quad (a \\neq 0)', note: 'Product of a number and its reciprocal is always 1.' },
      { label: 'HCF & LCM relationship', latex: '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b', note: 'Holds for any two positive integers.' },
    ],
    studyNotes: [
      {
        heading: 'Key number families',
        body: 'Cambridge Paper 1 and Paper 2 regularly open with a list of numbers from which you must pick specific types.',
        bullets: [
          'Natural numbers: whole counting numbers from $1$ upwards ($1, 2, 3, \\dots$); in Morrison & Hamshaw’s Cambridge Coursebook, $0$ is included in integers ($\\dots, -2, -1, 0, 1, 2, \\dots$) and excluded from natural numbers and prime numbers.',
          'Prime numbers: integers greater than $1$ with exactly two factors ($2, 3, 5, 7, 11, 13, 17, 19, \\dots$). Note that $1$ is NOT prime and $2$ is the only even prime.',
          'Square numbers: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225$.',
          'Cube numbers: $1, 8, 27, 64, 125, 216, 343, 512, 729, 1000$.',
          'Rational numbers can be written as $\\frac{p}{q}$ ($q \\neq 0$), including terminating and recurring decimals. Irrational numbers ($\\pi, \\sqrt{2}, \\sqrt{5}$) have non-terminating, non-repeating decimals.',
        ],
      },
      {
        heading: 'Finding HCF and LCM via Prime Factorisation',
        body: 'Break each integer down with a factor tree or repeated prime division, then compare prime factors using index form (or a Venn diagram overlap of prime factors).',
        bullets: [
          'HCF (Highest Common Factor): multiply only the prime bases present in ALL numbers using the SMALLEST power of each (the centre overlap of a prime-factor Venn diagram).',
          'LCM (Lowest Common Multiple): multiply EVERY prime base present in ANY number using the LARGEST power of each (all numbers inside the Venn union).',
        ],
      },
    ],
    workedExamples: [
      {
        title: 'HCF and LCM of 84 and 120',
        question: 'Write $84$ and $120$ as products of their prime factors. Hence find their HCF and LCM.',
        marks: 4,
        steps: [
          'Factorise $84 = 2^2 \\times 3 \\times 7$.',
          'Factorise $120 = 2^3 \\times 3 \\times 5$.',
          'Common primes with smallest powers: $2^2 \\times 3 = 12$, so $\\text{HCF} = 12$.',
          'All primes with largest powers: $2^3 \\times 3 \\times 5 \\times 7 = 840$, so $\\text{LCM} = 840$.',
        ],
        answer: '$\\text{HCF} = 12,\\ \\text{LCM} = 840$',
        markSchemeNotes: 'B1 for $84 = 2^2 \\times 3 \\times 7$, B1 for $120 = 2^3 \\times 3 \\times 5$, B1 for HCF $12$, B1 for LCM $840$.',
      },
    ],
    commonMistakes: [
      'Listing $1$ as a prime number — $1$ only has one factor, whereas a prime has exactly two.',
      'Confusing factors (smaller or equal to the number) with multiples (larger or equal to the number).',
      'Writing prime factors as a sum ($2 + 2 + 3$) instead of a product ($2^2 \\times 3$).',
    ],
    quickCheck: {
      id: 'qc-1.1',
      prompt: 'Find the Lowest Common Multiple (LCM) of $24$ and $36$.',
      answer: '72',
      numericAnswer: 72,
      tolerance: 0,
      hint: 'Write $24 = 2^3 \\times 3$ and $36 = 2^2 \\times 3^2$, then pick the highest powers.',
      solution: '$\\text{LCM} = 2^3 \\times 3^2 = 8 \\times 9 = 72$.',
    },
  },
  {
    id: '1.2',
    chapterId: 1,
    code: '1.2',
    title: 'Sets',
    tier: 'Core & Extended',
    summary: 'Interpret set notation, list elements, shade regions, and solve two- and three-set Venn diagram problems.',
    coreObjectives: [
      'Use language, notation and Venn diagrams to describe sets and represent relationships between sets.',
      'Understand $\\mathscr{E}$ (universal set), $\\emptyset$ (empty set), $\\in$, $\\notin$, $n(A)$, $A\'$, $A \\cup B$, $A \\cap B$.',
    ],
    extendedObjectives: [
      'Use subset notation $A \\subseteq B$ and proper subset $A \\subset B$.',
      'Solve problems involving three-set Venn diagrams and algebraic expressions inside regions.',
    ],
    keyFormulas: [
      { label: 'Two-set union cardinality', latex: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)', note: 'Avoid double-counting the intersection.' },
      { label: 'Complement count', latex: 'n(A\') = n(\\mathscr{E}) - n(A)' },
    ],
    studyNotes: [
      {
        heading: 'Essential Cambridge Set Notation',
        body: 'Questions frequently test exact reading of symbols in both shading and counting problems.',
        bullets: [
          '$\\mathscr{E}$: universal set containing all elements under consideration.',
          '$A \\cap B$: intersection — elements in BOTH $A$ AND $B$.',
          '$A \\cup B$: union — elements in $A$ OR $B$ OR both.',
          '$A\'$: complement — everything in $\\mathscr{E}$ that is NOT in $A$.',
          '$n(A)$: the number of elements in set $A$ (always a non-negative integer).',
        ],
      },
      {
        heading: 'Filling in Venn diagrams cleanly',
        body: 'Always start from the innermost intersection ($A \\cap B$ or $A \\cap B \\cap C$) and work outward, subtracting overlapping counts as you go. Finally check that every region sums to $n(\\mathscr{E})$.',
      },
    ],
    workedExamples: [
      {
        title: 'Two-set Venn diagram calculation',
        question: 'In a class of $30$ students, $18$ study French ($F$), $15$ study Spanish ($S$), and $5$ study neither. Find $n(F \\cap S)$.',
        marks: 3,
        steps: [
          'Students studying at least one language: $n(F \\cup S) = 30 - 5 = 25$.',
          'Use $n(F \\cup S) = n(F) + n(S) - n(F \\cap S)$.',
          '$25 = 18 + 15 - n(F \\cap S) \\implies n(F \\cap S) = 33 - 25 = 8$.',
        ],
        answer: '$8$',
        markSchemeNotes: 'M1 for $30 - 5 = 25$, M1 for $18 + 15 - 25$, A1 for $8$.',
      },
    ],
    commonMistakes: [
      'Placing the total $n(F)$ into the "French only" crescent instead of subtracting $n(F \\cap S)$.',
      'Forgetting the outer box region representing $(A \\cup B)\'$.',
    ],
    quickCheck: {
      id: 'qc-1.2',
      prompt: 'Given $n(\\mathscr{E}) = 40$, $n(A) = 24$, $n(B) = 19$, and $n(A \\cap B) = 7$, find $n((A \\cup B)\')$.',
      answer: '4',
      numericAnswer: 4,
      tolerance: 0,
      hint: 'First find $n(A \\cup B) = 24 + 19 - 7$, then subtract from $40$.',
      solution: '$n(A \\cup B) = 24 + 19 - 7 = 36$, so $n((A \\cup B)\') = 40 - 36 = 4$.',
    },
  },
  {
    id: '1.3',
    chapterId: 1,
    code: '1.3',
    title: 'Powers and roots',
    tier: 'Core & Extended',
    summary: 'Calculate squares, square roots, cubes, cube roots, and higher powers and roots of integers and decimals.',
    coreObjectives: [
      'Calculate with squares, square roots, cubes and cube roots.',
      'Calculate with other powers and roots of numbers without and with a calculator.',
    ],
    keyFormulas: [
      { label: 'Inverse operations', latex: '(\\sqrt{a})^2 = a, \\qquad (\\sqrt[3]{a})^3 = a' },
      { label: 'Product rule for roots', latex: '\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}' },
    ],
    studyNotes: [
      {
        heading: 'Non-calculator mental fluency (Papers 1 & 2)',
        body: 'Under the 2025–2027 syllabus, Papers 1 and 2 are strictly non-calculator. Know squares up to $15^2 = 225$ and cubes up to $10^3 = 1000$ by sight.',
        bullets: [
          'Every positive number has TWO square roots ($\\pm\\sqrt{a}$), though the radical symbol $\\sqrt{a}$ denotes the positive principal root.',
          'Cube roots of negative numbers are negative: $\\sqrt[3]{-27} = -3$ because $(-3)^3 = -27$.',
          'For decimals, count decimal places: $(0.3)^2 = 0.09$ and $(0.2)^3 = 0.008$.',
        ],
      },
    ],
    workedExamples: [
      {
        title: 'Evaluating roots without a calculator',
        question: 'Evaluate $\\sqrt{144} + \\sqrt[3]{-64} - 2^4$.',
        marks: 2,
        steps: [
          '$\\sqrt{144} = 12$.',
          '$\\sqrt[3]{-64} = -4$.',
          '$2^4 = 16$.',
          'Combine: $12 + (-4) - 16 = -8$.',
        ],
        answer: '$-8$',
        markSchemeNotes: 'B1 for two correct terms, A1 for $-8$.',
      },
    ],
    commonMistakes: [
      'Evaluating $2^4$ as $2 \\times 4 = 8$ instead of $2 \\times 2 \\times 2 \\times 2 = 16$.',
      'Assuming $\\sqrt{0.09} = 0.03$ instead of $0.3$.',
    ],
    quickCheck: {
      id: 'qc-1.3',
      prompt: 'Evaluate $\\sqrt{1.69} + 3^3$.',
      answer: '28.3',
      numericAnswer: 28.3,
      tolerance: 0.001,
      hint: '$13^2 = 169$, so $\\sqrt{1.69} = 1.3$.',
      solution: '$1.3 + 27 = 28.3$.',
    },
  },
  {
    id: '1.4',
    chapterId: 1,
    code: '1.4',
    title: 'Fractions, decimals and percentages',
    tier: 'Core & Extended',
    summary: 'Convert fluidly between fractions, terminating decimals, recurring decimals (Extended), and percentages.',
    coreObjectives: [
      'Use the language and notation of simple vulgar and decimal fractions and percentages in appropriate contexts.',
      'Recognise equivalence and convert between these forms.',
    ],
    extendedObjectives: [
      'Convert recurring decimals (e.g. $0.\\dot{3}\\dot{6}$, $0.1\\dot{7}$) into exact fractions in simplest form algebraically.',
    ],
    keyFormulas: [
      { label: 'Decimal to percentage', latex: '\\text{Percentage} = \\text{Decimal} \\times 100\\%' },
      { label: 'Recurring decimal method', latex: '10^k x - x = \\text{integer}', note: 'Multiply by $10^k$ where $k$ is the repeating block length.' },
    ],
    studyNotes: [
      {
        heading: 'Core equivalences for non-calculator papers',
        body: 'Memorise key equivalents to speed up arithmetic:',
        bullets: [
          '$\\frac{1}{8} = 0.125 = 12.5\\%$, $\\frac{3}{8} = 0.375 = 37.5\\%$, $\\frac{5}{8} = 0.625 = 62.5\\%$.',
          '$\\frac{1}{3} = 0.\\dot{3} \\approx 33.3\\%$, $\\frac{1}{6} = 0.1\\dot{6} \\approx 16.7\\%$.',
        ],
      },
      {
        heading: 'Extended: Converting recurring decimals to fractions',
        body: 'Let $x$ equal the recurring decimal. Multiply by powers of $10$ so that two equations have the exact same infinite tail after the decimal point, then subtract to eliminate the repeating digits.',
      },
    ],
    workedExamples: [
      {
        title: 'Recurring decimal to fraction (Extended)',
        question: 'Write $0.2\\dot{4}\\dot{5}$ as a fraction in its lowest terms.',
        marks: 3,
        steps: [
          'Let $x = 0.2454545\\dots$',
          'Multiply by $10$: $10x = 2.454545\\dots$',
          'Multiply by $1000$: $1000x = 245.454545\\dots$',
          'Subtract: $1000x - 10x = 245 - 2 \\implies 990x = 243$.',
          'Simplify: $x = \\frac{243}{990} = \\frac{27}{110}$.',
        ],
        answer: '$\\frac{27}{110}$',
        markSchemeNotes: 'M1 for $1000x - 10x$, A1 for $\\frac{243}{990}$, A1 for simplified $\\frac{27}{110}$.',
      },
    ],
    commonMistakes: [
      'Doing $100x - x$ on $0.2\\dot{4}\\dot{5}$ without aligning the recurring digits first.',
      'Forgetting to simplify the final fraction.',
    ],
    quickCheck: {
      id: 'qc-1.4',
      prompt: 'Express $0.\\dot{3}\\dot{6}$ as a fraction in its simplest form (type as a/b).',
      answer: '4/11',
      acceptedAnswers: ['4/11'],
      numericAnswer: 4 / 11,
      tolerance: 0.0001,
      hint: 'Let $x = 0.3636\\dots$ and calculate $100x - x$.',
      solution: '$100x - x = 36 \\implies 99x = 36 \\implies x = \\frac{36}{99} = \\frac{4}{11}$.',
    },
  },
  {
    id: '1.5',
    chapterId: 1,
    code: '1.5',
    title: 'Ordering',
    tier: 'Core & Extended',
    summary: 'Order quantities by magnitude using equality and inequality symbols ($=, \\neq, >, <, \\ge, \\le$).',
    coreObjectives: [
      'Order quantities by magnitude and demonstrate familiarity with the symbols $=, \\neq, >, <, \\ge, \\le$.',
    ],
    keyFormulas: [
      { label: 'Comparison strategy', latex: '\\text{Convert all values to decimals to 4 d.p. before ordering}' },
    ],
    studyNotes: [
      {
        heading: 'Comparing mixed formats',
        body: 'Exam questions mix fractions, decimals, percentages, standard form, and negative numbers. Convert every value into a decimal aligned to the same number of decimal places before sorting, then write your final answer using the ORIGINAL forms given in the question.',
      },
    ],
    workedExamples: [
      {
        title: 'Ordering mixed numbers',
        question: 'Write in order of size, smallest first: $\\frac{3}{8},\\ 38\\%,\\ 0.37,\\ \\frac{7}{20}$.',
        marks: 2,
        steps: [
          'Convert to decimals: $\\frac{3}{8} = 0.375$, $38\\% = 0.380$, $0.37 = 0.370$, $\\frac{7}{20} = 0.350$.',
          'Order decimals: $0.350 < 0.370 < 0.375 < 0.380$.',
          'Write in original format: $\\frac{7}{20},\\ 0.37,\\ \\frac{3}{8},\\ 38\\%$.',
        ],
        answer: '$\\frac{7}{20},\\ 0.37,\\ \\frac{3}{8},\\ 38\\%$',
        markSchemeNotes: 'M1 for converting at least two to comparable decimals/percentages, A1 for exact original order.',
      },
    ],
    commonMistakes: [
      'Ordering negative numbers backwards (remember $-0.8 < -0.5$).',
      'Forgetting to write the final list in the original notation from the question.',
    ],
    quickCheck: {
      id: 'qc-1.5',
      prompt: 'Which is largest: $0.62$, $\\frac{5}{8}$, or $63\\%$? Enter as written.',
      answer: '63%',
      acceptedAnswers: ['63%', '0.63'],
      numericAnswer: 63,
      hint: 'Compare $0.62$, $0.625$, and $0.63$.',
      solution: '$\\frac{5}{8} = 0.625$ and $63\\% = 0.63$, so $63\\%$ is largest.',
    },
  },
  {
    id: '1.6',
    chapterId: 1,
    code: '1.6',
    title: 'The four operations',
    tier: 'Core & Extended',
    summary: 'Apply BODMAS order of operations (grouping symbols first) and exact arithmetic with integers, decimals, directed numbers, and fractions without a calculator.',
    coreObjectives: [
      'Use the four operations for calculations with integers, decimals and fractions (including mixed numbers and improper fractions), including correct ordering of operations and use of grouping symbols (brackets, fraction bars, roots).',
    ],
    keyFormulas: [
      { label: 'Fraction division (Keep-Change-Flip)', latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}' },
      { label: 'BODMAS / Grouping symbols', latex: '\\text{Brackets (innermost first)} \\to \\text{Of / Indices} \\to \\text{Division \\& Multiplication (L to R)} \\to \\text{Addition \\& Subtraction (L to R)}' },
    ],
    studyNotes: [
      {
        heading: 'Mixed numbers in non-calculator papers',
        body: 'Always convert mixed numbers into improper fractions BEFORE multiplying, dividing, adding, or subtracting. Show every intermediate fraction step in Cambridge "show that" questions — skipping straight to the decimal loses method marks.',
      },
    ],
    workedExamples: [
      {
        title: 'Mixed number division',
        question: 'Work out $2\\frac{1}{4} \\div 1\\frac{1}{2}$, giving your answer as a mixed number.',
        marks: 3,
        steps: [
          'Convert to improper fractions: $2\\frac{1}{4} = \\frac{9}{4}$ and $1\\frac{1}{2} = \\frac{3}{2}$.',
          'Multiply by the reciprocal: $\\frac{9}{4} \\times \\frac{2}{3} = \\frac{18}{12}$.',
          'Simplify and write as mixed number: $\\frac{3}{2} = 1\\frac{1}{2}$.',
        ],
        answer: '$1\\frac{1}{2}$',
        markSchemeNotes: 'M1 for $\\frac{9}{4}$ and $\\frac{3}{2}$, M1 for $\\frac{9}{4} \\times \\frac{2}{3}$, A1 for $1\\frac{1}{2}$.',
      },
    ],
    commonMistakes: [
      'Dividing numerators and denominators directly or flipping the first fraction instead of the second.',
      'Adding before multiplying in expressions like $3 + 4 \\times 2$.',
    ],
    quickCheck: {
      id: 'qc-1.6',
      prompt: 'Evaluate $5 + 3 \\times (8 - 2)^2 \\div 6$.',
      answer: '23',
      numericAnswer: 23,
      tolerance: 0,
      hint: 'Brackets first ($8 - 2 = 6$), then square ($6^2 = 36$), then multiply and divide left-to-right.',
      solution: '$5 + 3 \\times 36 \\div 6 = 5 + 18 = 23$.',
    },
  },
  {
    id: '1.7',
    chapterId: 1,
    code: '1.7',
    title: 'Indices I',
    tier: 'Core & Extended',
    summary: 'Understand and apply positive, zero, negative, and fractional integer-base indices using the laws of indices.',
    coreObjectives: [
      'Understand and use indices (positive, zero and negative integers).',
      'Use the rules of indices with numerical bases.',
    ],
    extendedObjectives: [
      'Understand and use fractional indices such as $a^{1/n} = \\sqrt[n]{a}$ and $a^{m/n} = (\\sqrt[n]{a})^m$.',
    ],
    keyFormulas: [
      { label: 'Multiplication & Division', latex: 'a^m \\times a^n = a^{m+n}, \\qquad a^m \\div a^n = a^{m-n}' },
      { label: 'Zero & Negative Index', latex: 'a^0 = 1 \\ (a \\neq 0), \\qquad a^{-n} = \\frac{1}{a^n}' },
      { label: 'Fractional Index (Extended)', latex: 'a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m' },
    ],
    studyNotes: [
      {
        heading: 'Tackling negative fractional indices',
        body: 'Break $a^{-m/n}$ into three clean steps: (1) negative means reciprocal, (2) denominator $n$ means $n$th root, (3) numerator $m$ means raise to power $m$. Taking the root BEFORE raising to the power keeps numbers small on non-calculator papers!',
      },
    ],
    workedExamples: [
      {
        title: 'Negative fractional index (Extended)',
        question: 'Find the exact value of $27^{-\\frac{2}{3}}$.',
        marks: 2,
        steps: [
          'Apply negative power (reciprocal): $\\frac{1}{27^{2/3}}$.',
          'Take cube root first: $\\sqrt[3]{27} = 3$.',
          'Square the result: $3^2 = 9$, giving $\\frac{1}{9}$.',
        ],
        answer: '$\\frac{1}{9}$',
        markSchemeNotes: 'M1 for $\\sqrt[3]{27} = 3$ or $27^{2/3} = 9$, A1 for $\\frac{1}{9}$.',
      },
    ],
    commonMistakes: [
      'Writing $5^0 = 0$ instead of $1$.',
      'Thinking a negative index makes the value negative ($2^{-3} = -8$ is WRONG; it is $\\frac{1}{8}$).',
    ],
    quickCheck: {
      id: 'qc-1.7',
      prompt: 'Evaluate $16^{-\\frac{3}{4}}$ as a fraction (type as a/b).',
      answer: '1/8',
      acceptedAnswers: ['1/8', '0.125'],
      numericAnswer: 0.125,
      tolerance: 0.0001,
      hint: '$\\sqrt[4]{16} = 2$, then cube it and take the reciprocal.',
      solution: '$16^{3/4} = (\\sqrt[4]{16})^3 = 2^3 = 8$, so $16^{-3/4} = \\frac{1}{8}$.',
    },
  },
  {
    id: '1.8',
    chapterId: 1,
    code: '1.8',
    title: 'Standard form',
    tier: 'Core & Extended',
    summary: 'Express very large and very small numbers in standard form $A \\times 10^n$ and calculate with them.',
    coreObjectives: [
      'Use the standard form $A \\times 10^n$ where $n$ is a positive or negative integer and $1 \\le A < 10$.',
    ],
    keyFormulas: [
      { label: 'Standard form definition', latex: 'A \\times 10^n \\quad \\text{where } 1 \\le A < 10,\\ n \\in \\mathbb{Z}' },
      { label: 'Multiplication in standard form', latex: '(a \\times 10^m)(b \\times 10^n) = (a \\times b) \\times 10^{m+n}' },
    ],
    studyNotes: [
      {
        heading: 'Adjusting when $A$ falls outside $[1, 10)$',
        body: 'After multiplying or dividing coefficients, if $A \\ge 10$ (e.g. $24 \\times 10^5$), divide $A$ by $10$ and ADD $1$ to the exponent ($2.4 \\times 10^6$). If $A < 1$ (e.g. $0.45 \\times 10^{-3}$), multiply $A$ by $10$ and SUBTRACT $1$ from the exponent ($4.5 \\times 10^{-4}$).',
      },
    ],
    workedExamples: [
      {
        title: 'Adding numbers in standard form',
        question: 'Calculate $(4.2 \\times 10^5) + (7.5 \\times 10^4)$, giving your answer in standard form.',
        marks: 2,
        steps: [
          'Convert to ordinary numbers or match powers of $10$: $420\\,000 + 75\\,000 = 495\\,000$.',
          'Rewrite in standard form with $1 \\le A < 10$: $4.95 \\times 10^5$.',
        ],
        answer: '$4.95 \\times 10^5$',
        markSchemeNotes: 'M1 for $495\\,000$ or $42 \\times 10^4 + 7.5 \\times 10^4$, A1 for $4.95 \\times 10^5$.',
      },
    ],
    commonMistakes: [
      'Leaving $A = 12.4 \\times 10^3$ or $0.5 \\times 10^4$ — $A$ MUST satisfy $1 \\le A < 10$.',
      'Adding exponents directly when adding/subtracting standard form numbers (powers must match first).',
    ],
    quickCheck: {
      id: 'qc-1.8',
      prompt: 'Work out $(3 \\times 10^4) \\times (5 \\times 10^{-2})$ as an ordinary number.',
      answer: '1500',
      numericAnswer: 1500,
      tolerance: 0,
      hint: '$3 \\times 5 = 15$ and $10^{4 + (-2)} = 10^2$.',
      solution: '$15 \\times 10^2 = 1500$ (which is $1.5 \\times 10^3$ in standard form).',
    },
    sandbox: 'standard-form',
  },
  {
    id: '1.9',
    chapterId: 1,
    code: '1.9',
    title: 'Estimation',
    tier: 'Core & Extended',
    summary: 'Round values to decimal places or significant figures and estimate answers by rounding to 1 significant figure.',
    coreObjectives: [
      'Round values to a specified degree of accuracy (decimal places and significant figures).',
      'Make estimates for calculations involving numbers, quantities and measurements.',
      'Round answers to a reasonable degree of accuracy in the context of a given problem.',
    ],
    keyFormulas: [
      { label: 'Default IGCSE accuracy rule', latex: '\\text{Give non-exact answers to } 3\\text{ s.f. (angles to } 1\\text{ d.p.)}' },
    ],
    studyNotes: [
      {
        heading: 'Decimal places, significant figures & 1 s.f. estimation (Coursebook 1.7 & 5.6)',
        body: 'In Morrison & Hamshaw (Ch. 1.7 Rounding numbers), look at the digit to the right of your target place: round up if it is $5$ or greater, and leave unchanged if it is less than $5$. For significant figures, start counting from the FIRST non-zero digit reading left to right (every zero after that first non-zero digit counts; trailing zeros keep place value when rounding whole numbers). When estimating (Ch. 5.6), round every number to $1$ significant figure FIRST before computing—never round an exact answer at the end.',
      },
    ],
    workedExamples: [
      {
        title: 'Estimating a fraction calculation',
        question: 'By writing each number correct to $1$ significant figure, estimate $\\frac{41.8 \\times 19.3}{0.487}$.',
        marks: 2,
        steps: [
          'Round each value to 1 s.f.: $41.8 \\to 40$, $19.3 \\to 20$, $0.487 \\to 0.5$.',
          'Compute $\\frac{40 \\times 20}{0.5} = \\frac{800}{0.5} = 1600$.',
        ],
        answer: '$1600$',
        markSchemeNotes: 'M1 for $40, 20, 0.5$ seen, A1 for $1600$.',
      },
    ],
    commonMistakes: [
      'Counting leading zeros after a decimal point as significant (in $0.00407$, the first s.f. is $4$).',
      'Forgetting that dividing by $0.5$ doubles the numerator.',
    ],
    quickCheck: {
      id: 'qc-1.9',
      prompt: 'Round $0.04596$ correct to $2$ significant figures.',
      answer: '0.046',
      numericAnswer: 0.046,
      tolerance: 0.00001,
      hint: 'Start counting from the $4$; the third significant digit is $9$.',
      solution: 'The first two significant figures are $4$ and $5$; the next digit is $9 \\ge 5$, so $0.046$.',
    },
  },
  {
    id: '1.10',
    chapterId: 1,
    code: '1.10',
    title: 'Limits of accuracy',
    tier: 'Core & Extended',
    summary: 'Find upper and lower bounds of rounded measurements and propagate bounds through calculations (Extended).',
    coreObjectives: [
      'Give upper and lower bounds for data rounded to a specified accuracy.',
    ],
    extendedObjectives: [
      'Find upper and lower bounds of the results of calculations which have used data rounded to a specified accuracy (sums, differences, products, quotients).',
    ],
    keyFormulas: [
      { label: 'Bound interval', latex: '\\text{Lower} = x - \\frac{\\text{unit}}{2}, \\qquad \\text{Upper} = x + \\frac{\\text{unit}}{2}' },
      { label: 'Quotient bounds (Extended)', latex: '\\text{UB}\\left(\\frac{A}{B}\\right) = \\frac{A_{\\text{UB}}}{B_{\\text{LB}}}, \\qquad \\text{LB}\\left(\\frac{A}{B}\\right) = \\frac{A_{\\text{LB}}}{B_{\\text{UB}}}' },
      { label: 'Difference bounds (Extended)', latex: '\\text{UB}(A - B) = A_{\\text{UB}} - B_{\\text{LB}}, \\qquad \\text{LB}(A - B) = A_{\\text{LB}} - B_{\\text{UB}}' },
    ],
    studyNotes: [
      {
        heading: 'Choosing the right bound for division and subtraction',
        body: 'To maximise $A - B$ or $\\frac{A}{B}$, make the numerator/first term as LARGE as possible ($A_{\\text{UB}}$) and the subtracted/denominator term as SMALL as possible ($B_{\\text{LB}}$). Do NOT write $4.4999\\dots$ for an upper bound — always write the exact midpoint $4.5$.',
      },
    ],
    workedExamples: [
      {
        title: 'Upper bound of speed (Extended)',
        question: 'A car travels $d = 240\\text{ km}$ (correct to the nearest $10\\text{ km}$) in $t = 3.2\\text{ hours}$ (correct to $1$ d.p.). Calculate the upper bound for the average speed.',
        marks: 3,
        steps: [
          '$d_{\\text{UB}} = 240 + 5 = 245\\text{ km}$.',
          '$t_{\\text{LB}} = 3.2 - 0.05 = 3.15\\text{ hours}$.',
          '$v_{\\text{UB}} = \\frac{245}{3.15} = 77.777\\dots \\approx 77.8\\text{ km/h}$ (to 3 s.f.).',
        ],
        answer: '$77.8\\text{ km/h}$',
        markSchemeNotes: 'B1 for $245$ and $3.15$, M1 for $\\frac{245}{3.15}$, A1 for $77.8$.',
      },
    ],
    commonMistakes: [
      'Dividing $\\text{UB}$ by $\\text{UB}$ instead of $\\text{UB}$ by $\\text{LB}$.',
      'Using $\\pm 0.5$ when the rounding unit is $10$ (should be $\\pm 5$) or $0.1$ (should be $\\pm 0.05$).',
    ],
    quickCheck: {
      id: 'qc-1.10',
      prompt: 'A plank has length $12.4\\text{ m}$ measured to the nearest $0.1\\text{ m}$. What is its lower bound in metres?',
      answer: '12.35',
      numericAnswer: 12.35,
      tolerance: 0.0001,
      hint: 'Subtract half of $0.1\\text{ m}$ ($0.05\\text{ m}$).',
      solution: '$12.4 - 0.05 = 12.35\\text{ m}$.',
    },
  },
  {
    id: '1.11',
    chapterId: 1,
    code: '1.11',
    title: 'Ratio and proportion',
    tier: 'Core & Extended',
    summary: 'Simplify ratios, share quantities in a given ratio, solve map scale problems, and work with direct/inverse proportion.',
    coreObjectives: [
      'Understand and use ratio and proportion, to include dividing a quantity in a given ratio, proportional reasoning and map scales.',
    ],
    keyFormulas: [
      { label: 'Unit ratio form', latex: 'a : b = 1 : \\frac{b}{a}' },
      { label: 'Map scale area ratio', latex: '\\text{Length ratio } 1 : k \\implies \\text{Area ratio } 1 : k^2' },
    ],
    studyNotes: [
      {
        heading: 'Three classic ratio question types',
        body: 'Identify which part of the ratio the given number represents before dividing:',
        bullets: [
          'Total given: divide total by the sum of ratio parts.',
          'One person\'s share given: divide that share by their ratio part to find 1 part.',
          'Difference given ("Ali gets $40 more than Ben"): divide the difference by the difference in ratio parts.',
        ],
      },
    ],
    workedExamples: [
      {
        title: 'Difference in ratio shares',
        question: 'Money is shared between Maya and Leo in the ratio $7 : 4$. Maya receives $\\$24$ more than Leo. Calculate the total amount shared.',
        marks: 3,
        steps: [
          'Difference in parts: $7 - 4 = 3$ parts.',
          '$1$ part $= 24 \\div 3 = \\$8$.',
          'Total parts $= 7 + 4 = 11$, so total $= 11 \\times 8 = \\$88$.',
        ],
        answer: '$\\$88$',
        markSchemeNotes: 'M1 for $24 \\div (7 - 4)$, M1 for $\\times (7 + 4)$, A1 for $88$.',
      },
    ],
    commonMistakes: [
      'Dividing $\\$24$ by $7 + 4 = 11$ when the $\\$24$ is a difference rather than the total.',
      'Forgetting to square the scale factor when converting map lengths to real areas.',
    ],
    quickCheck: {
      id: 'qc-1.11',
      prompt: 'Divide $\\$180$ in the ratio $2 : 3 : 4$. What is the largest share in dollars?',
      answer: '80',
      numericAnswer: 80,
      tolerance: 0,
      hint: 'Total parts $= 2 + 3 + 4 = 9$.',
      solution: '$1$ part $= 180 \\div 9 = 20$. Largest share $= 4 \\times 20 = \\$80$.',
    },
  },
  {
    id: '1.12',
    chapterId: 1,
    code: '1.12',
    title: 'Rates',
    tier: 'Core & Extended',
    summary: 'Calculate speed, density, pressure, unit rates, and convert compound units such as km/h to m/s.',
    coreObjectives: [
      'Use common measures of rate (average speed, density, pressure, flow rates).',
      'Apply other measures of rate and solve problems involving average speed.',
    ],
    keyFormulas: [
      { label: 'Average speed', latex: '\\text{Average Speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}}' },
      { label: 'Density & Pressure', latex: '\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}}, \\qquad \\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}' },
      { label: 'Speed unit conversion', latex: '\\text{km/h} \\xrightarrow{\\div 3.6} \\text{m/s}, \\qquad \\text{m/s} \\xrightarrow{\\times 3.6} \\text{km/h}' },
    ],
    studyNotes: [
      {
        heading: 'Average speed over multi-stage journeys',
        body: 'NEVER take the arithmetic mean of two speeds! Calculate total distance and total time separately (converting minutes to hours by dividing by $60$), then divide $\\frac{\\text{Total Distance}}{\\text{Total Time}}$.',
      },
    ],
    workedExamples: [
      {
        title: 'Multi-stage average speed',
        question: 'A cyclist rides $18\\text{ km}$ in $45\\text{ minutes}$ and then $12\\text{ km}$ in $15\\text{ minutes}$. Find her average speed in $\\text{km/h}$.',
        marks: 3,
        steps: [
          'Total distance $= 18 + 12 = 30\\text{ km}$.',
          'Total time $= 45 + 15 = 60\\text{ minutes} = 1\\text{ hour}$.',
          'Average speed $= 30 \\div 1 = 30\\text{ km/h}$.',
        ],
        answer: '$30\\text{ km/h}$',
        markSchemeNotes: 'M1 for total distance $30$, M1 for converting $60\\text{ min}$ to $1\\text{ h}$, A1 for $30$.',
      },
    ],
    commonMistakes: [
      'Writing $1\\text{ hour } 45\\text{ minutes}$ as $1.45\\text{ hours}$ instead of $1.75\\text{ hours}$.',
      'Averaging two speeds directly instead of dividing total distance by total time.',
    ],
    quickCheck: {
      id: 'qc-1.12',
      prompt: 'Convert $72\\text{ km/h}$ into $\\text{m/s}$.',
      answer: '20',
      numericAnswer: 20,
      tolerance: 0,
      hint: 'Multiply by $1000$ and divide by $3600$ (or divide by $3.6$).',
      solution: '$72 \\div 3.6 = 20\\text{ m/s}$.',
    },
  },
  {
    id: '1.13',
    chapterId: 1,
    code: '1.13',
    title: 'Percentages',
    tier: 'Core & Extended',
    summary: 'Calculate percentage change, profit/loss, simple and compound interest, and reverse percentages.',
    coreObjectives: [
      'Calculate a given percentage of a quantity and express one quantity as a percentage of another.',
      'Calculate percentage increase or decrease, simple and compound interest.',
    ],
    extendedObjectives: [
      'Solve reverse percentage problems to find the original value before an increase or decrease.',
    ],
    keyFormulas: [
      { label: 'Percentage change', latex: '\\%\\text{ change} = \\frac{\\text{Change}}{\\text{Original}} \\times 100\\%' },
      { label: 'Simple interest', latex: 'I = \\frac{P \\times R \\times T}{100}' },
      { label: 'Compound interest', latex: 'A = P\\left(1 + \\frac{r}{100}\\right)^n' },
      { label: 'Reverse percentage (Extended)', latex: '\\text{Original} = \\frac{\\text{New Value}}{\\text{Multiplier}}' },
    ],
    studyNotes: [
      {
        heading: 'Multiplier method & Reverse percentages',
        body: 'For a $15\\%$ increase, the multiplier is $1.15$. For a $15\\%$ decrease, the multiplier is $0.85$. If you are given the price AFTER a $15\\%$ sale discount ($\\$68$), divide by $0.85$ to find the original price ($68 \\div 0.85 = \\$80$) — never add $15\\%$ of $\\$68$!',
      },
    ],
    workedExamples: [
      {
        title: 'Compound interest vs simple interest',
        question: 'Sam invests $\\$2000$ at $4\\%$ per year compound interest. Find the value of the investment after $3$ years.',
        marks: 2,
        steps: [
          'Multiplier for $4\\%$ increase is $1 + 0.04 = 1.04$.',
          'Value $= 2000 \\times 1.04^3 = 2000 \\times 1.124864 = \\$2249.73$.',
        ],
        answer: '$\\$2249.73$',
        markSchemeNotes: 'M1 for $2000 \\times 1.04^3$, A1 for $2249.73$ (accept $2250$ to 3 s.f. unless money rule specifies 2 d.p.).',
      },
    ],
    commonMistakes: [
      'Adding $15\\%$ back onto a discounted price instead of dividing by $0.85$.',
      'Using simple interest formula $P \\times r \\times n$ when the question asks for compound interest.',
    ],
    quickCheck: {
      id: 'qc-1.13',
      prompt: 'After a $20\\%$ discount, a jacket costs $\\$96$. What was its original price in dollars?',
      answer: '120',
      numericAnswer: 120,
      tolerance: 0.01,
      hint: 'After a $20\\%$ reduction, $\\$96$ represents $80\\%$ ($0.80$) of the original price.',
      solution: '$96 \\div 0.80 = \\$120$.',
    },
    sandbox: 'percentage-interest',
  },
  {
    id: '1.14',
    chapterId: 1,
    code: '1.14',
    title: 'Using a calculator',
    tier: 'Core & Extended',
    summary: 'Enter complex fractions, roots, powers, trigonometric functions, and time keys accurately on a scientific calculator (Papers 3 & 4).',
    coreObjectives: [
      'Use a calculator efficiently for powers, roots, fractions, brackets and degree/minute/second time inputs.',
      'Check the reasonableness of answers and apply appropriate rounding.',
    ],
    keyFormulas: [
      { label: 'Fraction grouping rule', latex: '\\frac{a + b}{c - d} \\implies (a + b) \\div (c - d)' },
    ],
    studyNotes: [
      {
        heading: '2025–2027 Syllabus Exam Rule',
        body: 'In the updated 2025–2027 0580 structure, Papers 1 (Core) and 2 (Extended) are NON-CALCULATOR, while Papers 3 (Core) and 4 (Extended) allow a scientific calculator. Always verify your calculator is set to DEGREE mode (`D`) before trigonometry questions!',
      },
    ],
    workedExamples: [
      {
        title: 'Evaluating nested radicals & fractions',
        question: 'Calculate $\\frac{\\sqrt{18.4^2 - 7.9^2}}{3.2 + 1.45}$, giving all digits on your display and then rounding to $3$ significant figures.',
        marks: 2,
        steps: [
          'Evaluate numerator: $\\sqrt{338.56 - 62.41} = \\sqrt{276.15} \\approx 16.61776\\dots$',
          'Divide by denominator $4.65$: $3.573712\\dots$',
          'Round to $3$ significant figures: $3.57$.',
        ],
        answer: '$3.57$',
        markSchemeNotes: 'B1 for $3.5737\\dots$, B1 for $3.57$.',
      },
    ],
    commonMistakes: [
      'Leaving the calculator in Radian (`R`) or Gradian (`G`) mode during trigonometry.',
      'Forgetting brackets around a multi-term denominator when using the $\\div$ key.',
    ],
    quickCheck: {
      id: 'qc-1.14',
      prompt: 'Evaluate $\\frac{4.5^2 + 1.75}{2.2}$ to $2$ decimal places.',
      answer: '10',
      acceptedAnswers: ['10', '10.0', '10.00'],
      numericAnswer: 10,
      tolerance: 0.01,
      hint: '$4.5^2 = 20.25$, add $1.75$ to get $22$, then divide by $2.2$.',
      solution: '$\\frac{20.25 + 1.75}{2.2} = \\frac{22}{2.2} = 10$.',
    },
  },
  {
    id: '1.15',
    chapterId: 1,
    code: '1.15',
    title: 'Time',
    tier: 'Core & Extended',
    summary: 'Calculate elapsed durations, read 12-hour and 24-hour clocks, read timetables, and convert decimal hours to hours and minutes.',
    coreObjectives: [
      'Calculate with time: seconds, minutes, hours, days, weeks, months, years, including the relationship between units.',
      'Calculate times in terms of the 24-hour and 12-hour clock and read clocks and timetables.',
    ],
    keyFormulas: [
      { label: 'Minutes to decimal hours', latex: '\\text{Hours} = \\frac{\\text{Minutes}}{60}' },
      { label: 'Decimal hours to minutes', latex: '\\text{Minutes} = (\\text{Decimal part}) \\times 60' },
    ],
    studyNotes: [
      {
        heading: 'Bridging to the next hour',
        body: 'To find the duration between $09:42$ and $13:15$, bridge through whole hours rather than subtracting vertically in base-10: $09:42 \\to 10:00$ is $18\\text{ min}$, $10:00 \\to 13:00$ is $3\\text{ h}$, $13:00 \\to 13:15$ is $15\\text{ min}$. Total $= 3\\text{ h } 33\\text{ min}$.',
      },
    ],
    workedExamples: [
      {
        title: 'Time zones and flight duration',
        question: 'A flight departs London at $21:35$ local time and arrives in Singapore $13\\text{ hours } 20\\text{ minutes}$ later. Singapore is $7\\text{ hours}$ ahead of London. What is the local arrival time in Singapore?',
        marks: 3,
        steps: [
          'London arrival time: $21:35 + 13\\text{ h } 20\\text{ min} = 10:55$ the next day.',
          'Add $7\\text{ hours}$ for Singapore time zone: $10:55 + 7\\text{ h} = 17:55$ the next day.',
        ],
        answer: '$17:55$ (next day)',
        markSchemeNotes: 'M1 for adding flight duration, M1 for $+7\\text{ h}$, A1 for $17:55$.',
      },
    ],
    commonMistakes: [
      'Writing $2.30\\text{ hours}$ to mean $2\\text{ hours } 30\\text{ minutes}$ (it is $2.5\\text{ hours}$).',
      'Using base-100 borrowing when subtracting times.',
    ],
    quickCheck: {
      id: 'qc-1.15',
      prompt: 'A train leaves at $14:48$ and arrives at $17:23$. How many minutes did the journey take?',
      answer: '155',
      numericAnswer: 155,
      tolerance: 0,
      hint: '$14:48 \\to 15:00$ ($12\\text{ min}$) $+ 2\\text{ h}$ ($120\\text{ min}$) $+ 23\\text{ min}$.',
      solution: '$12 + 120 + 23 = 155\\text{ minutes}$.',
    },
  },
  {
    id: '1.16',
    chapterId: 1,
    code: '1.16',
    title: 'Money',
    tier: 'Core & Extended',
    summary: 'Convert between currencies using exchange rates, handle bank commissions, and solve household bills, wages, and best-buy problems.',
    coreObjectives: [
      'Calculate with money and convert from one currency to another using given exchange rates.',
      'Solve contextual financial problems involving shopping bills, change, hourly wages, overtime, profit, loss, and commission.',
    ],
    keyFormulas: [
      { label: 'Home to Foreign currency', latex: '\\text{Foreign Amount} = \\text{Home Amount} \\times \\text{Exchange Rate}', note: 'When rate is given as $1\\text{ Home} = r\\text{ Foreign}$.' },
      { label: 'Foreign to Home currency', latex: '\\text{Home Amount} = \\frac{\\text{Foreign Amount}}{\\text{Exchange Rate}}' },
      { label: 'Unit price (Best buy)', latex: '\\text{Unit Cost} = \\frac{\\text{Total Price}}{\\text{Quantity}}' },
    ],
    studyNotes: [
      {
        heading: '1. Currency Conversion Direction Rule',
        body: 'Cambridge exchange rate questions always give a ratio like $1\\text{ USD} = 0.78\\text{ GBP}$ or $1\\text{ EUR} = 162.4\\text{ JPY}$. Always check whether you are moving FROM the "$1$" side TO the rate side (multiply) or FROM the rate side BACK TO the "$1$" side (divide).',
        bullets: [
          'From $1\\text{ unit} \\to \\text{rate}$: MULTIPLY by the exchange rate.',
          'From $\\text{rate} \\to 1\\text{ unit}$: DIVIDE by the exchange rate.',
          'Always round final money answers to $2$ decimal places (or nearest integer for currencies like Yen if instructed).',
        ],
      },
      {
        heading: '2. Bank Commission & Fees',
        body: 'Some exchange bureau problems charge a percentage commission (e.g. $2\\%$) or flat fee. Read carefully whether commission is deducted BEFORE converting or added AFTER converting:',
        bullets: [
          'If a traveller hands over $\\$500$ and the bank charges $2\\%$ commission first: net converted $= 500 \\times 0.98 = \\$490$, then multiply by exchange rate.',
          'If a bank sells currency and adds $2\\%$ to the bill: calculate converted cost, then multiply by $1.02$.',
        ],
      },
      {
        heading: '3. Comparing Value & Household Bills',
        body: 'For "which is better value?" questions, convert both packs to the SAME quantity (cost per $100\\text{ g}$, cost per litre, or grams per dollar) and explicitly state which option is cheaper in your conclusion sentence to earn the final communication mark (`A1`).',
      },
    ],
    workedExamples: [
      {
        title: 'Two-step currency conversion with commission',
        question: 'The exchange rate is $\\$1 = €0.92$. Ali changes $\\$650$ into euros. The bank charges a $2\\%$ commission on the dollars before converting. How many euros does Ali receive?',
        marks: 3,
        steps: [
          'Deduct $2\\%$ commission from $\\$650$: $650 \\times (1 - 0.02) = 650 \\times 0.98 = \\$637$.',
          'Convert $\\$637$ to euros: $637 \\times 0.92 = €586.04$.',
        ],
        answer: '$€586.04$',
        markSchemeNotes: 'M1 for $650 \\times 0.98$ (or $650 \\times 0.02 = 13$ subtracted), M1 for $\\times 0.92$, A1 for $586.04$.',
      },
      {
        title: 'Returning unused foreign currency',
        question: 'Priya converts $£400$ into Swiss francs at $£1 = 1.12\\text{ CHF}$. She spends $320\\text{ CHF}$ and converts the remaining francs back to pounds at $£1 = 1.15\\text{ CHF}$. Calculate the amount she receives in pounds, to the nearest penny.',
        marks: 4,
        steps: [
          'Convert $£400$ to CHF: $400 \\times 1.12 = 448\\text{ CHF}$.',
          'Remaining CHF after spending: $448 - 320 = 128\\text{ CHF}$.',
          'Convert back to GBP (divide by new rate): $128 \\div 1.15 = £111.3043\\dots$',
          'Round to 2 decimal places: $£111.30$.',
        ],
        answer: '$£111.30$',
        markSchemeNotes: 'M1 for $400 \\times 1.12$, M1 for $448 - 320$, M1 for $\\div 1.15$, A1 for $£111.30$.',
      },
    ],
    commonMistakes: [
      'Multiplying instead of dividing when converting back to the base "$1$" currency.',
      'Rounding intermediate currency values too early (keep full calculator precision until the very last step).',
      'Leaving a final money answer as $111.3$ instead of $111.30$ (always write 2 decimal places for dollars/pounds/euros).',
    ],
    quickCheck: {
      id: 'qc-1.16',
      prompt: 'The exchange rate is $\\$1 = 152\\text{ JPY}$. A camera costs $34\\,200\\text{ JPY}$. What is its price in dollars?',
      answer: '225',
      numericAnswer: 225,
      tolerance: 0.01,
      unit: '$',
      hint: 'You are converting from JPY back to USD (the "$1$" side), so divide by $152$.',
      solution: '$34\\,200 \\div 152 = \\$225$.',
    },
    sandbox: 'money-converter',
  },
  {
    id: '1.17',
    chapterId: 1,
    code: '1.17',
    title: 'Exponential growth and decay',
    tier: 'Extended',
    summary: 'Model population growth, radioactive decay, and asset depreciation using repeated percentage multipliers.',
    coreObjectives: [
      'Recognise repeated percentage change in financial and real-world contexts.',
    ],
    extendedObjectives: [
      'Use exponential growth and decay formulas $y = A \\cdot r^t$ to find future values or solve for the time $t$ by trial/logarithmic comparison.',
    ],
    keyFormulas: [
      { label: 'Exponential growth / decay', latex: 'V = V_0 \\left(1 \\pm \\frac{r}{100}\\right)^n', note: 'Use $+$ for growth and $-$ for depreciation/decay.' },
    ],
    studyNotes: [
      {
        heading: 'Finding the number of years $n$',
        body: 'In IGCSE 0580 (where logarithms are not required), when asked "after how many complete years does the car drop below $\\$8000$?", test integer values of $n$ systematically and show BOTH the value just above and the value just below the target threshold to earn full method marks.',
      },
    ],
    workedExamples: [
      {
        title: 'Depreciation over time (Extended)',
        question: 'A machine is bought for $\\$25\\,000$. Its value depreciates by $12\\%$ each year. After how many complete years is its value first below $\\$14\\,000$?',
        marks: 3,
        steps: [
          'Multiplier $= 1 - 0.12 = 0.88$.',
          'Test $n = 4$: $25000 \\times 0.88^4 = \\$14\\,992.38 > 14\\,000$.',
          'Test $n = 5$: $25000 \\times 0.88^5 = \\$13\\,193.30 < 14\\,000$.',
          'Therefore it first drops below $\\$14\\,000$ after $5$ years.',
        ],
        answer: '$5\\text{ years}$',
        markSchemeNotes: 'M1 for $25000 \\times 0.88^n$, M1 for evaluating both $n=4$ and $n=5$, A1 for $5$.',
      },
    ],
    commonMistakes: [
      'Subtracting $12\\%$ of the original value linearly each year instead of multiplying by $0.88^n$.',
    ],
    quickCheck: {
      id: 'qc-1.17',
      prompt: 'A bacteria culture starts at $500$ cells and increases by $20\\%$ every hour. How many cells are present after $3$ hours?',
      answer: '864',
      numericAnswer: 864,
      tolerance: 0,
      hint: 'Calculate $500 \\times 1.2^3$.',
      solution: '$500 \\times 1.2^3 = 500 \\times 1.728 = 864$.',
    },
    sandbox: 'percentage-interest',
  },
  {
    id: '1.18',
    chapterId: 1,
    code: '1.18',
    title: 'Surds',
    tier: 'Extended',
    summary: 'Simplify surds, expand brackets with surds, and rationalise denominators (new explicit 2025–2027 Extended topic).',
    coreObjectives: [
      'Recognise irrational square roots in exact calculations.',
    ],
    extendedObjectives: [
      'Simplify expressions containing surds using $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$.',
      'Rationalise denominators of the form $\\frac{a}{\\sqrt{b}}$ and $\\frac{a}{b + c\\sqrt{d}}$.',
    ],
    keyFormulas: [
      { label: 'Simplifying surds', latex: '\\sqrt{a^2 b} = a\\sqrt{b}' },
      { label: 'Rationalising single surd', latex: '\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}' },
      { label: 'Rationalising binomial denominator', latex: '\\frac{1}{p + q\\sqrt{r}} \\times \\frac{p - q\\sqrt{r}}{p - q\\sqrt{r}} = \\frac{p - q\\sqrt{r}}{p^2 - q^2 r}' },
    ],
    studyNotes: [
      {
        heading: 'Using the conjugate to clear surds from the denominator',
        body: 'Because $(p + q\\sqrt{r})(p - q\\sqrt{r}) = p^2 - q^2 r$, multiplying numerator and denominator by the conjugate (flip the sign between the two terms) always produces a rational integer denominator!',
      },
    ],
    workedExamples: [
      {
        title: 'Rationalising a binomial denominator (Extended)',
        question: 'Write $\\frac{10}{3 - \\sqrt{5}}$ in the form $a + b\\sqrt{5}$ where $a$ and $b$ are rational.',
        marks: 3,
        steps: [
          'Multiply top and bottom by the conjugate $3 + \\sqrt{5}$: $\\frac{10(3 + \\sqrt{5})}{(3 - \\sqrt{5})(3 + \\sqrt{5})}$.',
          'Denominator becomes $3^2 - (\\sqrt{5})^2 = 9 - 5 = 4$.',
          'Simplify $\\frac{30 + 10\\sqrt{5}}{4} = 7.5 + 2.5\\sqrt{5}$ (or $\\frac{15}{2} + \\frac{5}{2}\\sqrt{5}$).',
        ],
        answer: '$\\frac{15}{2} + \\frac{5}{2}\\sqrt{5}$',
        markSchemeNotes: 'M1 for multiplying by $\\frac{3 + \\sqrt{5}}{3 + \\sqrt{5}}$, M1 for denominator $4$, A1 for simplified form.',
      },
    ],
    commonMistakes: [
      'Thinking $\\sqrt{12} + \\sqrt{3} = \\sqrt{15}$ — only LIKE surds ($2\\sqrt{3} + \\sqrt{3} = 3\\sqrt{3}$) can be added.',
      'Forgetting to multiply the numerator by the conjugate as well as the denominator.',
    ],
    quickCheck: {
      id: 'qc-1.18',
      prompt: 'Simplify $\\sqrt{48} + \\sqrt{12}$ into the form $k\\sqrt{3}$. What is the integer value of $k$?',
      answer: '6',
      numericAnswer: 6,
      tolerance: 0,
      hint: '$\\sqrt{48} = 4\\sqrt{3}$ and $\\sqrt{12} = 2\\sqrt{3}$.',
      solution: '$4\\sqrt{3} + 2\\sqrt{3} = 6\\sqrt{3}$, so $k = 6$.',
    },
  },
];
