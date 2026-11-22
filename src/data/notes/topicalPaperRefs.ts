export interface TopicalQuickCheckMeta {
  marks: number;
  paperType: 'Non-Calculator' | 'Calculator';
  paperCode?: string;
  questionNumber?: string;
}

/**
 * Honest mark weight and calculator-tier metadata for each subtopic's Concept Check.
 * Paper codes (`paperCode`, `questionNumber`) are omitted unless verified verbatim
 * against an exact Cambridge 0580 past paper question.
 */
export const TOPICAL_PAPER_REFS: Record<string, TopicalQuickCheckMeta> = {
  // Chapter 1: Number (1.1 – 1.18)
  '1.1': { marks: 2, paperType: 'Non-Calculator' },
  '1.2': { marks: 2, paperType: 'Non-Calculator' },
  '1.3': { marks: 2, paperType: 'Non-Calculator' },
  '1.4': { marks: 2, paperType: 'Non-Calculator' },
  '1.5': { marks: 1, paperType: 'Non-Calculator' },
  '1.6': { marks: 2, paperType: 'Non-Calculator' },
  '1.7': { marks: 2, paperType: 'Non-Calculator' },
  '1.8': { marks: 2, paperType: 'Non-Calculator' },
  '1.9': { marks: 1, paperType: 'Non-Calculator' },
  '1.10': { marks: 2, paperType: 'Calculator' },
  '1.11': { marks: 2, paperType: 'Non-Calculator' },
  '1.12': { marks: 2, paperType: 'Calculator' },
  '1.13': { marks: 3, paperType: 'Calculator' },
  '1.14': { marks: 2, paperType: 'Non-Calculator' },
  '1.15': { marks: 2, paperType: 'Non-Calculator' },
  '1.16': { marks: 2, paperType: 'Calculator' },
  '1.17': { marks: 3, paperType: 'Calculator' },
  '1.18': { marks: 2, paperType: 'Non-Calculator' },

  // Chapter 2: Algebra and Graphs (2.1 – 2.13)
  '2.1': { marks: 2, paperType: 'Non-Calculator' },
  '2.2': { marks: 2, paperType: 'Non-Calculator' },
  '2.3': { marks: 3, paperType: 'Non-Calculator' },
  '2.4': { marks: 2, paperType: 'Non-Calculator' },
  '2.5': { marks: 2, paperType: 'Non-Calculator' },
  '2.6': { marks: 2, paperType: 'Non-Calculator' },
  '2.7': { marks: 2, paperType: 'Non-Calculator' },
  '2.8': { marks: 3, paperType: 'Calculator' },
  '2.9': { marks: 2, paperType: 'Calculator' },
  '2.10': { marks: 2, paperType: 'Calculator' },
  '2.11': { marks: 2, paperType: 'Non-Calculator' },
  '2.12': { marks: 3, paperType: 'Non-Calculator' },
  '2.13': { marks: 2, paperType: 'Non-Calculator' },

  // Chapter 3: Coordinate Geometry (3.1 – 3.7)
  '3.1': { marks: 2, paperType: 'Non-Calculator' },
  '3.2': { marks: 2, paperType: 'Non-Calculator' },
  '3.3': { marks: 2, paperType: 'Non-Calculator' },
  '3.4': { marks: 2, paperType: 'Non-Calculator' },
  '3.5': { marks: 2, paperType: 'Non-Calculator' },
  '3.6': { marks: 2, paperType: 'Non-Calculator' },
  '3.7': { marks: 2, paperType: 'Non-Calculator' },

  // Chapter 4: Geometry (4.1 – 4.8)
  '4.1': { marks: 1, paperType: 'Non-Calculator' },
  '4.2': { marks: 1, paperType: 'Non-Calculator' },
  '4.3': { marks: 2, paperType: 'Non-Calculator' },
  '4.4': { marks: 3, paperType: 'Calculator' },
  '4.5': { marks: 1, paperType: 'Non-Calculator' },
  '4.6': { marks: 2, paperType: 'Non-Calculator' },
  '4.7': { marks: 2, paperType: 'Non-Calculator' },
  '4.8': { marks: 2, paperType: 'Non-Calculator' },

  // Chapter 5: Mensuration (5.1 – 5.5)
  '5.1': { marks: 2, paperType: 'Calculator' },
  '5.2': { marks: 2, paperType: 'Non-Calculator' },
  '5.3': { marks: 3, paperType: 'Calculator' },
  '5.4': { marks: 3, paperType: 'Calculator' },
  '5.5': { marks: 2, paperType: 'Calculator' },

  // Chapter 6: Trigonometry (6.1 – 6.6)
  '6.1': { marks: 2, paperType: 'Non-Calculator' },
  '6.2': { marks: 2, paperType: 'Calculator' },
  '6.3': { marks: 2, paperType: 'Non-Calculator' },
  '6.4': { marks: 2, paperType: 'Non-Calculator' },
  '6.5': { marks: 3, paperType: 'Calculator' },
  '6.6': { marks: 3, paperType: 'Calculator' },

  // Chapter 7: Transformations and Vectors (7.1 – 7.4)
  '7.1': { marks: 2, paperType: 'Non-Calculator' },
  '7.2': { marks: 2, paperType: 'Non-Calculator' },
  '7.3': { marks: 2, paperType: 'Non-Calculator' },
  '7.4': { marks: 2, paperType: 'Non-Calculator' },

  // Chapter 8: Probability (8.1 – 8.4)
  '8.1': { marks: 1, paperType: 'Non-Calculator' },
  '8.2': { marks: 2, paperType: 'Calculator' },
  '8.3': { marks: 2, paperType: 'Non-Calculator' },
  '8.4': { marks: 2, paperType: 'Calculator' },

  // Chapter 9: Statistics (9.1 – 9.7)
  '9.1': { marks: 1, paperType: 'Non-Calculator' },
  '9.2': { marks: 2, paperType: 'Non-Calculator' },
  '9.3': { marks: 2, paperType: 'Non-Calculator' },
  '9.4': { marks: 2, paperType: 'Non-Calculator' },
  '9.5': { marks: 1, paperType: 'Non-Calculator' },
  '9.6': { marks: 2, paperType: 'Non-Calculator' },
  '9.7': { marks: 2, paperType: 'Calculator' },
};
