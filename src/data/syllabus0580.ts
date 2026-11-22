import type { SubtopicNote, SyllabusChapter } from '../types/syllabus';
import { CHAPTER_1_NOTES } from './notes/chapter1';
import { CHAPTER_2_NOTES } from './notes/chapter2';
import { CHAPTER_3_NOTES } from './notes/chapter3';
import { CHAPTER_4_NOTES } from './notes/chapter4';
import { CHAPTER_5_NOTES } from './notes/chapter5';
import { CHAPTER_6_NOTES } from './notes/chapter6';
import { CHAPTER_7_NOTES } from './notes/chapter7';
import { CHAPTER_8_NOTES } from './notes/chapter8';
import { CHAPTER_9_NOTES } from './notes/chapter9';
import { COURSEBOOK_ALIGNMENT_0580 } from './notes/coursebookRefs';
import { TEXTBOOK_GUIDE_1_TO_4 } from './notes/textbookGuide1to4';
import { TEXTBOOK_GUIDE_5_TO_9 } from './notes/textbookGuide5to9';
import { TOPICAL_PAPER_REFS } from './notes/topicalPaperRefs';

const ALL_TEXTBOOK_GUIDES = {
  ...TEXTBOOK_GUIDE_1_TO_4,
  ...TEXTBOOK_GUIDE_5_TO_9,
};

function enrichChapterNotes(notes: SubtopicNote[]): SubtopicNote[] {
  return notes.map((note) => {
    const guide = ALL_TEXTBOOK_GUIDES[note.id];
    const paperRef = TOPICAL_PAPER_REFS[note.id];
    const alignment = COURSEBOOK_ALIGNMENT_0580[note.id];
    const quickCheck = paperRef
      ? {
          ...note.quickCheck,
          marks: paperRef.marks,
          paperType: paperRef.paperType,
          ...(paperRef.paperCode ? { paperCode: paperRef.paperCode } : {}),
          ...(paperRef.questionNumber ? { questionNumber: paperRef.questionNumber } : {}),
        }
      : note.quickCheck;

    const coursebookFields = alignment
      ? {
          coursebookRef: alignment.ref,
          coursebookTip: alignment.tip,
          fastForward: alignment.fastForward,
        }
      : {};

    if (!guide) {
      return { ...note, ...coursebookFields, quickCheck };
    }
    return {
      ...note,
      ...coursebookFields,
      bigIdea: guide.bigIdea,
      stepByStepMethod: guide.stepByStepMethod,
      comparisonTable: guide.comparisonTable,
      studyNotes: [...note.studyNotes, ...guide.extraStudyNotes],
      workedExamples: [...note.workedExamples, ...guide.extraWorkedExamples],
      rapidSummary: guide.rapidSummary,
      quickCheck,
    };
  });
}

export const SYLLABUS_0580: SyllabusChapter[] = [
  {
    id: 1,
    title: 'Number',
    description: 'Number properties, sets, indices, standard form, accuracy, ratio, percentages, money, exponential growth, and surds.',
    subtopics: enrichChapterNotes(CHAPTER_1_NOTES),
  },
  {
    id: 2,
    title: 'Algebra and Graphs',
    description: 'Expressions, algebraic manipulation, equations, inequalities, sequences, proportion, kinematics graphs, differentiation, and functions.',
    subtopics: enrichChapterNotes(CHAPTER_2_NOTES),
  },
  {
    id: 3,
    title: 'Coordinate Geometry',
    description: 'Cartesian coordinates, straight-line graphs, gradients, midpoint, distance, parallel and perpendicular lines.',
    subtopics: enrichChapterNotes(CHAPTER_3_NOTES),
  },
  {
    id: 4,
    title: 'Geometry',
    description: 'Geometrical vocabulary, compass constructions, bearings, similarity, symmetry, polygon angles, and circle theorems.',
    subtopics: enrichChapterNotes(CHAPTER_4_NOTES),
  },
  {
    id: 5,
    title: 'Mensuration',
    description: 'Metric unit conversions, 2D perimeter & area, circles, arcs & sectors, 3D surface area & volume, and compound solids.',
    subtopics: enrichChapterNotes(CHAPTER_5_NOTES),
  },
  {
    id: 6,
    title: 'Trigonometry',
    description: 'Pythagoras’ theorem, right-angled SOH CAH TOA, exact values, trig graphs, sine & cosine rules, and 3D trigonometry.',
    subtopics: enrichChapterNotes(CHAPTER_6_NOTES),
  },
  {
    id: 7,
    title: 'Transformations and Vectors',
    description: 'Reflections, rotations, translations, enlargements, 2D column vectors, magnitude, and vector geometry proofs.',
    subtopics: enrichChapterNotes(CHAPTER_7_NOTES),
  },
  {
    id: 8,
    title: 'Probability',
    description: 'Probability scale, relative & expected frequency, tree diagrams, combined events, and conditional probability.',
    subtopics: enrichChapterNotes(CHAPTER_8_NOTES),
  },
  {
    id: 9,
    title: 'Statistics',
    description: 'Data classification, statistical comparisons, averages & grouped mean, charts, scatter diagrams, cumulative frequency, and histograms.',
    subtopics: enrichChapterNotes(CHAPTER_9_NOTES),
  },
];

export const ALL_SUBTOPICS_0580: SubtopicNote[] = SYLLABUS_0580.flatMap((c) => c.subtopics);

export function findSubtopic(chapterId: number, topicId: string): SubtopicNote | undefined {
  const chapter = SYLLABUS_0580.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return chapter.subtopics.find((t) => t.id === topicId);
}

export function getAdjacentSubtopics(topicId: string): {
  prev: SubtopicNote | null;
  next: SubtopicNote | null;
} {
  const idx = ALL_SUBTOPICS_0580.findIndex((t) => t.id === topicId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ALL_SUBTOPICS_0580[idx - 1] : null,
    next: idx < ALL_SUBTOPICS_0580.length - 1 ? ALL_SUBTOPICS_0580[idx + 1] : null,
  };
}
