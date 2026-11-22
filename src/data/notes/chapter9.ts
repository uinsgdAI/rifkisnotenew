import type { SubtopicNote } from '../../types/syllabus';

export const CHAPTER_9_NOTES: SubtopicNote[] = [
  {
    id: '9.1',
    chapterId: 9,
    code: '9.1',
    title: 'Classifying statistical data',
    tier: 'Core & Extended',
    summary: 'Classify data as discrete, continuous, qualitative, or quantitative, and design tally/frequency tables.',
    coreObjectives: [
      'Classify and tabulate statistical data (discrete vs continuous; qualitative vs quantitative).',
    ],
    keyFormulas: [
      { label: 'Discrete vs Continuous', latex: '\\text{Discrete} = \\text{counted integers},\\qquad \\text{Continuous} = \\text{measured on a scale}' },
    ],
    studyNotes: [
      {
        heading: 'Distinguishing discrete and continuous data',
        body: 'Shoe sizes ($6, 6.5, 7$) and numbers of siblings are DISCRETE because only fixed separated values exist. Heights, masses, temperatures, and race times are CONTINUOUS because any intermediate decimal value is possible depending on measurement accuracy.',
      },
    ],
    workedExamples: [
      {
        title: 'Classifying variables',
        question: 'State whether each variable is discrete or continuous: (a) Number of cars passing a gate, (b) Mass of an apple in grams.',
        marks: 2,
        steps: [
          '(a) Number of cars can only take whole-number counts $\\to$ Discrete.',
          '(b) Mass is measured on a continuous scale $\\to$ Continuous.',
        ],
        answer: '(a) Discrete, (b) Continuous',
        markSchemeNotes: 'B1 for Discrete, B1 for Continuous.',
      },
    ],
    commonMistakes: [
      'Calling shoe size continuous simply because half-sizes ($7.5$) exist — it is still discrete.',
    ],
    quickCheck: {
      id: 'qc-9.1',
      prompt: 'Is "time taken to run 100 metres" discrete or continuous? (discrete / continuous)',
      answer: 'continuous',
      acceptedAnswers: ['continuous'],
      hint: 'Time is measured rather than counted.',
      solution: 'Time is measured on a continuous scale, so it is continuous.',
    },
  },
  {
    id: '9.2',
    chapterId: 9,
    code: '9.2',
    title: 'Interpreting statistical data',
    tier: 'Core & Extended',
    summary: 'Read and compare data presented in two-way tables, frequency tables, pictograms, and bar charts.',
    coreObjectives: [
      'Read, interpret and draw inferences from tables and statistical diagrams.',
      'Compare sets of data using tables, graphs and statistical measures.',
    ],
    keyFormulas: [
      { label: 'Data comparison checklist', latex: '\\text{Compare 1 average (mean/median) + 1 spread (range/IQR) in context}' },
    ],
    studyNotes: [
      {
        heading: 'Answering "Compare the two distributions" questions',
        body: 'For a 2-mark comparison question, you MUST make two distinct contextual statements: (1) compare a measure of central tendency ("Group A has a higher median score of $72$ than Group B\'s $65$, so Group A performed better on average") AND (2) compare a measure of spread ("Group B has a smaller IQR of $8$ vs $14$, so Group B is more consistent").',
      },
    ],
    workedExamples: [
      {
        title: 'Comparing two datasets',
        question: 'Class X has mean $68$ and range $14$. Class Y has mean $64$ and range $26$. Make two comparisons between the classes.',
        marks: 2,
        steps: [
          'Average comparison: Class X scored higher on average ($68 > 64$).',
          'Consistency comparison: Class X\'s marks are more consistent / less spread out ($14 < 26$).',
        ],
        answer: 'Class X has a higher average and smaller spread (more consistent).',
        markSchemeNotes: 'B1 for valid average comparison in context, B1 for valid spread/consistency comparison.',
      },
    ],
    commonMistakes: [
      'Saying "smaller range means higher scores" — range measures consistency/spread, NOT average performance.',
    ],
    quickCheck: {
      id: 'qc-9.2',
      prompt: 'A two-way table shows $60$ students total. $34$ are girls, $22$ boys play sport, and $38$ students in total play sport. How many girls do NOT play sport?',
      answer: '18',
      numericAnswer: 18,
      tolerance: 0,
      hint: 'Girls playing sport $= 38 - 22 = 16$. Subtract from $34$.',
      solution: 'Girls who play sport $= 38 - 22 = 16$, so girls who do not $= 34 - 16 = 18$.',
    },
  },
  {
    id: '9.3',
    chapterId: 9,
    code: '9.3',
    title: 'Averages and measures of spread',
    tier: 'Core & Extended',
    summary: 'Calculate mean, median, mode, and range for raw and frequency data, plus estimated mean from grouped intervals.',
    coreObjectives: [
      'Calculate the mean, median, mode and range for individual and discrete data and distinguish between the purposes for which they are used.',
    ],
    extendedObjectives: [
      'Calculate an estimate of the mean for grouped and continuous data and identify the modal class.',
    ],
    keyFormulas: [
      { label: 'Grouped estimated mean', latex: '\\bar{x} \\approx \\frac{\\sum (f \\times x_{\\text{mid}})}{\\sum f}' },
      { label: 'Median position', latex: '\\text{Position} = \\frac{n + 1}{2}' },
    ],
    studyNotes: [
      {
        heading: 'Estimated mean from grouped tables',
        body: '1. Find the MIDPOINT of each class interval (add endpoints and divide by $2$). 2. Multiply each midpoint by its frequency ($f \\times x_{\\text{mid}}$). 3. Divide the sum $\\sum fx$ by the TOTAL FREQUENCY $\\sum f$ — NEVER divide by the number of rows!',
      },
    ],
    workedExamples: [
      {
        title: 'Grouped estimated mean (Extended)',
        question: 'Heights ($h$ cm) of $20$ plants: $0 < h \\le 10$ ($f=4$), $10 < h \\le 20$ ($f=10$), $20 < h \\le 30$ ($f=6$). Estimate the mean height.',
        marks: 4,
        steps: [
          'Midpoints: $5, 15, 25$.',
          'Products $f \\times x_{\\text{mid}}$: $4(5) + 10(15) + 6(25) = 20 + 150 + 150 = 320$.',
          'Divide by total frequency $20$: $\\bar{x} = \\frac{320}{20} = 16\\text{ cm}$.',
        ],
        answer: '$16\\text{ cm}$',
        markSchemeNotes: 'B1 midpoints $5, 15, 25$, M1 $\\sum fx$, M1 $\\div 20$, A1 $16$.',
      },
    ],
    commonMistakes: [
      'Dividing $\\sum fx$ by the number of class intervals ($3$) instead of total frequency ($20$).',
      'Forgetting to sort numbers in ascending order before finding the median.',
    ],
    quickCheck: {
      id: 'qc-9.3',
      prompt: 'Five numbers have a mean of $14$. A sixth number $26$ is added. What is the new mean of all six numbers?',
      answer: '16',
      numericAnswer: 16,
      tolerance: 0,
      hint: 'Original sum $= 5 \\times 14 = 70$. Add $26$ and divide by $6$.',
      solution: 'New sum $= 70 + 26 = 96$. New mean $= 96 \\div 6 = 16$.',
    },
  },
  {
    id: '9.4',
    chapterId: 9,
    code: '9.4',
    title: 'Statistical charts and diagrams',
    tier: 'Core & Extended',
    summary: 'Draw and interpret bar charts, pie charts, stem-and-leaf diagrams, and frequency polygons.',
    coreObjectives: [
      'Construct and interpret bar charts, pie charts, pictograms, stem-and-leaf diagrams and simple frequency distributions.',
    ],
    keyFormulas: [
      { label: 'Pie chart sector angle', latex: '\\theta = \\frac{\\text{Category Frequency}}{\\text{Total Frequency}} \\times 360^\\circ' },
    ],
    studyNotes: [
      {
        heading: 'Stem-and-leaf diagrams require an ordered list and a KEY',
        body: 'Always draw a rough unordered stem-and-leaf first, then rewrite it neatly with leaves in ascending order AND include a clear Key (e.g. `Key: 3 | 4 means 34`). Missing the key always costs 1 mark!',
      },
    ],
    workedExamples: [
      {
        title: 'Finding frequency from a pie chart angle',
        question: 'In a survey of $180$ commuters, the sector for Cycling has angle $48^\\circ$. How many commuters cycle?',
        marks: 2,
        steps: [
          'Fraction of circle $= \\frac{48}{360} = \\frac{2}{15}$.',
          'Count $= \\frac{48}{360} \\times 180 = 24$ commuters.',
        ],
        answer: '$24$',
        markSchemeNotes: 'M1 for $\\frac{48}{360} \\times 180$, A1 for $24$.',
      },
    ],
    commonMistakes: [
      'Omitting the Key on a stem-and-leaf diagram.',
      'Plotting frequency against endpoints instead of class MIDPOINTS for a frequency polygon.',
    ],
    quickCheck: {
      id: 'qc-9.4',
      prompt: 'Out of $90$ students, $30$ chose Basketball. What angle represents Basketball on a pie chart (in degrees)?',
      answer: '120',
      numericAnswer: 120,
      tolerance: 0,
      unit: '°',
      hint: '$\\frac{30}{90} \\times 360^\\circ$.',
      solution: '$\\frac{1}{3} \\times 360^\\circ = 120^\\circ$.',
    },
  },
  {
    id: '9.5',
    chapterId: 9,
    code: '9.5',
    title: 'Scatter diagrams',
    tier: 'Core & Extended',
    summary: 'Plot scatter diagrams, identify positive, negative, or zero correlation, and draw/use a line of best fit passing through $(\\bar{x}, \\bar{y})$.',
    coreObjectives: [
      'Understand what is meant by positive, negative and zero correlation with reference to a scatter diagram.',
      'Draw, interpret and use lines of best fit by eye.',
    ],
    keyFormulas: [
      { label: 'Mean point anchor', latex: '\\text{Line of best fit should pass through } (\\bar{x}, \\bar{y})' },
    ],
    studyNotes: [
      {
        heading: 'Interpolation vs Extrapolation',
        body: 'Using a line of best fit within the range of the plotted data (interpolation) is reliable. Predicting far outside the plotted range (extrapolation) is unreliable because the linear relationship may not continue.',
      },
    ],
    workedExamples: [
      {
        title: 'Interpreting correlation',
        question: 'A scatter diagram plots car age (years) against resale value ($\\$$). State the type of correlation expected and explain what it means.',
        marks: 2,
        steps: [
          'As car age increases, resale value decreases $\\to$ Negative correlation.',
        ],
        answer: 'Negative correlation: older cars tend to have lower resale values.',
        markSchemeNotes: 'B1 for negative correlation, B1 for contextual interpretation.',
      },
    ],
    commonMistakes: [
      'Forcing a line of best fit through $(0, 0)$ when the data does not start at the origin.',
      'Ignoring outliers when judging the line of best fit.',
    ],
    quickCheck: {
      id: 'qc-9.5',
      prompt: 'If a scatter graph shows that as daily temperature rises, hot soup sales fall, what type of correlation is this? (positive / negative / zero)',
      answer: 'negative',
      acceptedAnswers: ['negative'],
      hint: 'One variable increases while the other decreases.',
      solution: 'Negative correlation.',
    },
  },
  {
    id: '9.6',
    chapterId: 9,
    code: '9.6',
    title: 'Cumulative frequency diagrams',
    tier: 'Extended',
    summary: 'Construct cumulative frequency tables and curves, read medians, quartiles, IQR, and percentiles, and compare distributions using box-and-whisker plots.',
    coreObjectives: [
      'Compute running totals from frequency tables.',
    ],
    extendedObjectives: [
      'Construct and use cumulative frequency diagrams to estimate and interpret the median, percentiles, quartiles and interquartile range.',
      'Draw and interpret box-and-whisker plots showing minimum, $Q_1$, median, $Q_3$, and maximum.',
    ],
    keyFormulas: [
      { label: 'Interquartile Range (IQR)', latex: '\\text{IQR} = Q_3 - Q_1' },
      { label: 'Reading positions (total $N$)', latex: 'Q_1 \\text{ at } \\frac{N}{4},\\qquad \\text{Median } Q_2 \\text{ at } \\frac{N}{2},\\qquad Q_3 \\text{ at } \\frac{3N}{4}' },
    ],
    studyNotes: [
      {
        heading: 'Plot at UPPER class boundaries, NOT midpoints!',
        body: 'Cumulative frequency answers "how many data values are $\\le x$?", so you MUST plot each cumulative frequency at the UPPER endpoint of its class interval and join with a smooth S-curve (ogive). A box-and-whisker plot summarises the five-number markers ($\\text{Min}, Q_1, Q_2, Q_3, \\text{Max}$) where the central box shows the middle $50\\%$ (IQR).',
      },
    ],
    workedExamples: [
      {
        title: 'Quartiles and "greater than" count (Extended)',
        question: 'From a cumulative frequency graph of $80$ students\' test scores, $Q_1 = 42$, Median $= 58$, $Q_3 = 71$, and $66$ students scored $\\le 75$. Find (a) the IQR and (b) how many students scored more than $75$.',
        marks: 3,
        steps: [
          '(a) $\\text{IQR} = Q_3 - Q_1 = 71 - 42 = 29$.',
          '(b) Students scoring $> 75$: $80 - 66 = 14$ students.',
        ],
        answer: '(a) $29$, (b) $14$ students',
        markSchemeNotes: 'B1 for $71 - 42 = 29$, M1 for $80 - 66$, A1 for $14$.',
      },
    ],
    commonMistakes: [
      'Plotting cumulative frequency at class midpoints instead of upper bounds.',
      'Reading $66$ off the vertical axis when asked for "more than $75$" instead of subtracting $80 - 66$.',
    ],
    quickCheck: {
      id: 'qc-9.6',
      prompt: 'For $120$ data items on a cumulative frequency curve, at what cumulative frequency value on the vertical axis do you read off the upper quartile $Q_3$?',
      answer: '90',
      numericAnswer: 90,
      tolerance: 0,
      hint: '$Q_3$ is at $\\frac{3}{4}$ of $120$.',
      solution: '$\\frac{3}{4} \\times 120 = 90$.',
    },
  },
  {
    id: '9.7',
    chapterId: 9,
    code: '9.7',
    title: 'Histograms',
    tier: 'Extended',
    summary: 'Construct and interpret histograms with unequal class widths using Frequency Density.',
    coreObjectives: [
      'Read grouped continuous class intervals.',
    ],
    extendedObjectives: [
      'Construct and interpret histograms with equal and unequal intervals, using frequency density.',
    ],
    keyFormulas: [
      { label: 'Frequency Density', latex: '\\text{Frequency Density} = \\frac{\\text{Frequency}}{\\text{Class Width}}' },
      { label: 'Frequency from bar area', latex: '\\text{Frequency} = \\text{Class Width} \\times \\text{Frequency Density}' },
    ],
    studyNotes: [
      {
        heading: 'Area = Frequency (NOT height!)',
        body: 'In a histogram with unequal class widths, the AREA of each bar represents frequency, and the vertical axis is Frequency Density ($\\text{frequency} \\div \\text{class width}$). If one bar\'s height and frequency are given, use them to calibrate the vertical frequency density scale!',
      },
    ],
    workedExamples: [
      {
        title: 'Calculating frequency density (Extended)',
        question: 'The interval $15 < t \\le 35$ has frequency $48$. Calculate the height of this bar on a histogram (frequency density).',
        marks: 2,
        steps: [
          'Class width $= 35 - 15 = 20$.',
          'Frequency density $= \\frac{48}{20} = 2.4$.',
        ],
        answer: '$2.4$',
        markSchemeNotes: 'M1 for dividing by $20$, A1 for $2.4$.',
      },
    ],
    commonMistakes: [
      'Plotting raw frequency on the $y$-axis when class widths are unequal.',
      'Leaving gaps between bars (histograms for continuous data have touching bars).',
    ],
    quickCheck: {
      id: 'qc-9.7',
      prompt: 'A bar on a histogram spans from $20$ to $50$ on the horizontal axis and has frequency density $1.8$. What frequency does this bar represent?',
      answer: '54',
      numericAnswer: 54,
      tolerance: 0,
      hint: 'Frequency $= \\text{Class Width} \\times \\text{Frequency Density}$.',
      solution: 'Class width $= 50 - 20 = 30$, so frequency $= 30 \\times 1.8 = 54$.',
    },
  },
];
