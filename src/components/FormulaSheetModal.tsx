import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { KaTeXFormula } from './MathText';

interface FormulaSheetModalProps {
  open: boolean;
  onClose: () => void;
}

const GIVEN_FORMULAS = [
  {
    title: 'Area of a trapezium',
    latex: 'A = \\frac{1}{2}(a + b)h',
    tier: 'Core & Extended',
  },
  {
    title: 'Curved surface area of a cylinder',
    latex: 'A = 2\\pi r h',
    tier: 'Core & Extended',
  },
  {
    title: 'Volume of a prism / cylinder',
    latex: 'V = A_{\\text{cross}} l \\qquad V_{\\text{cyl}} = \\pi r^2 h',
    tier: 'Core & Extended',
  },
  {
    title: 'Curved surface area & volume of a cone',
    latex: 'A = \\pi r l \\qquad V = \\frac{1}{3}\\pi r^2 h',
    tier: 'Core & Extended (2025+)',
  },
  {
    title: 'Surface area & volume of a sphere',
    latex: 'A = 4\\pi r^2 \\qquad V = \\frac{4}{3}\\pi r^3',
    tier: 'Core & Extended (2025+)',
  },
  {
    title: 'Volume of a pyramid',
    latex: 'V = \\frac{1}{3} \\times \\text{base area} \\times h',
    tier: 'Core & Extended (2025+)',
  },
  {
    title: 'Quadratic formula',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    tier: 'Extended (2025+)',
  },
  {
    title: 'Sine rule & Cosine rule',
    latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} \\qquad a^2 = b^2 + c^2 - 2bc\\cos A',
    tier: 'Extended (2025+)',
  },
  {
    title: 'Area of any triangle',
    latex: '\\text{Area} = \\frac{1}{2}ab\\sin C',
    tier: 'Extended (2025+)',
  },
];

const MEMORISED_FORMULAS = [
  {
    title: 'Compound Interest & Exponential Decay',
    latex: 'A = P\\left(1 \\pm \\frac{r}{100}\\right)^n',
  },
  {
    title: 'Pythagoras’ Theorem & 3D Diagonal',
    latex: 'a^2 + b^2 = c^2, \\qquad D_{\\text{cuboid}} = \\sqrt{l^2 + w^2 + h^2}',
  },
  {
    title: 'SOH CAH TOA',
    latex: '\\sin\\theta = \\frac{\\text{O}}{\\text{H}},\\quad \\cos\\theta = \\frac{\\text{A}}{\\text{H}},\\quad \\tan\\theta = \\frac{\\text{O}}{\\text{A}}',
  },
  {
    title: 'Back Bearings & Parallel Angles',
    latex: '\\text{Back Bearing} = \\theta \\pm 180^\\circ, \\qquad \\text{Co-interior } \\alpha + \\beta = 180^\\circ',
  },
  {
    title: 'Regular & Irregular Polygon Angles',
    latex: 'S = (n - 2) \\times 180^\\circ, \\qquad \\text{Ext}_{\\text{reg}} = \\frac{360^\\circ}{n}',
  },
  {
    title: 'Arc Length & Sector Area',
    latex: '\\text{Arc} = \\frac{\\theta}{360^\\circ}(2\\pi r), \\qquad A = \\frac{\\theta}{360^\\circ}(\\pi r^2)',
  },
  {
    title: 'Similarity Scaling (Extended)',
    latex: '\\text{Length } k \\implies \\text{Area } k^2, \\quad \\text{Volume } k^3',
  },
  {
    title: 'Straight-Line Gradient, Midpoint & Distance',
    latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}, \\quad m_1 m_2 = -1, \\quad d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
  },
  {
    title: 'Probability: Exclusive, Independent & Conditional (Extended)',
    latex: 'P(A \\cup B) = P(A)+P(B)-P(A\\cap B), \\quad P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)}',
  },
  {
    title: 'Independence Test (Extended)',
    latex: 'A, B \\text{ independent} \\iff P(A \\cap B) = P(A)\\times P(B)',
  },
  {
    title: 'Differentiation Power Rule (Extended)',
    latex: 'y = ax^n \\implies \\frac{\\mathrm{d}y}{\\mathrm{d}x} = anx^{n-1}',
  },
  {
    title: 'Frequency Density (Histograms, Extended)',
    latex: '\\text{Frequency Density} = \\frac{\\text{Frequency}}{\\text{Class Width}}',
  },
];

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="formula-sheet-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 id="formula-sheet-title" className="font-display text-lg font-bold text-slate-900">
              Cambridge IGCSE 0580 Formula Sheet (2025–2027)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Official formulae printed on Papers 1–4 compared with essential memorised formulae
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close formula sheet"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          <section>
            <div className="mb-3">
              <h3 className="font-display text-sm font-semibold text-slate-900">
                Provided on the 2025–2027 Examination Formula Page
              </h3>
              <p className="text-xs text-slate-500">
                Included inside Papers 1, 2, 3, and 4 for reference during the exam
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {GIVEN_FORMULAS.map((f) => (
                <div
                  key={f.title}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/70"
                >
                  <div className="flex items-baseline justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-medium text-slate-800">{f.title}</span>
                    <span className="shrink-0">{f.tier}</span>
                  </div>
                  <div className="overflow-x-auto text-slate-900">
                    <KaTeXFormula latex={f.latex} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3">
              <h3 className="font-display text-sm font-semibold text-slate-900">
                Must Be Memorised (Not Printed on the Exam Sheet)
              </h3>
              <p className="text-xs text-slate-500">
                Required by syllabus recall in both Core and Extended tiers
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {MEMORISED_FORMULAS.map((f) => (
                <div
                  key={f.title}
                  className="p-4 rounded-lg border border-slate-200 bg-white"
                >
                  <div className="text-xs font-medium text-slate-800 mb-2">{f.title}</div>
                  <div className="overflow-x-auto text-slate-900">
                    <KaTeXFormula latex={f.latex} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
