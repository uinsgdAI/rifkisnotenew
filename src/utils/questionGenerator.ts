import type { PracticeQuestion } from '../types/syllabus';

export type MockPaperMode =
  | 'mock-core-p1'
  | 'mock-core-p3'
  | 'mock-ext-p2'
  | 'mock-ext-p4'
  | 'mock-full'
  | 'topical';

export interface MockGenerationOptions {
  mode: MockPaperMode;
  attemptNumber: number;
  chapterId?: number | 'all';
  topicId?: string;
  avoidSignatures?: Set<string>;
}

export interface GeneratedQuestionResult {
  questions: PracticeQuestion[];
  signatures: string[];
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function shuffle<T>(rng: () => number, items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function formatFraction(num: number, den: number): string {
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  return d === 1 ? String(n) : `${n}/${d}`;
}

function buildUniqueMcqOptions(
  rng: () => number,
  correct: string,
  candidates: string[]
): string[] {
  const unique: string[] = [correct];
  for (const c of candidates) {
    if (c && !unique.includes(c)) {
      unique.push(c);
    }
    if (unique.length === 4) break;
  }
  let guard = 1;
  while (unique.length < 4) {
    const fallback = `${correct} + ${guard}`;
    if (!unique.includes(fallback)) unique.push(fallback);
    guard += 1;
  }
  return shuffle(rng, unique);
}

interface GeneratedTemplateItem {
  signature: string;
  question: PracticeQuestion;
}

type TemplateFn = (rng: () => number, idSuffix: string) => GeneratedTemplateItem;

interface TemplateDef {
  key: string;
  chapterId: number;
  topicId: string;
  tier: 'Core' | 'Extended';
  paperType: 'Non-Calculator' | 'Calculator';
  build: TemplateFn;
}

const TEMPLATES: TemplateDef[] = [
  // 1.1 Types of Number (MCQ - Core Non-Calc)
  {
    key: 'ch1-hcf-lcm-mcq',
    chapterId: 1,
    topicId: '1.1',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const mode = rng() < 0.5 ? 'HCF' : 'LCM';
      const basePairs: Array<[number, number, number, number]> = [
        [2, 3, 5, 7],
        [2, 3, 5, 11],
        [2, 5, 3, 7],
        [3, 5, 2, 7],
        [2, 3, 7, 5],
      ];
      const [p, q, r, s] = pick(rng, basePairs);
      const aExp = randInt(rng, 1, 2);
      const bExp = randInt(rng, 1, 2);
      const num1 = p ** aExp * q * r;
      const num2 = p * q ** bExp * s;
      const hcf = gcd(num1, num2);
      const lcm = (num1 * num2) / hcf;
      const ans = mode === 'HCF' ? hcf : lcm;
      const distractors =
        mode === 'HCF'
          ? [String(p * q * r), String(hcf * 2), String(p), String(hcf * q)]
          : [String(hcf), String(num1 * num2), String(lcm / p), String(lcm * 2)];
      const options = buildUniqueMcqOptions(rng, String(ans), distractors);

      return {
        signature: `1.1-hcflcm:${mode}:${num1}:${num2}`,
        question: {
          id: `gen-1.1-${idSuffix}`,
          chapterId: 1,
          topicId: '1.1',
          topicTitle: 'Types of number',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 1 Non-Calc · Topic 1.1',
          question: `What is the ${
            mode === 'HCF' ? 'Highest Common Factor (HCF)' : 'Lowest Common Multiple (LCM)'
          } of $${num1}$ and $${num2}$?`,
          questionType: 'mcq',
          options,
          correctAnswer: String(ans),
          markScheme: [
            { code: 'M1', detail: `Prime factorise $${num1}$ and $${num2}$` },
            { code: 'A1', detail: `${mode} $= ${ans}$` },
          ],
          fullSolution: `Factorising gives $${num1}$ and $${num2}$. Taking ${
            mode === 'HCF'
              ? `the lowest power of common primes gives HCF $= ${ans}$.`
              : `the highest power of every prime appearing gives LCM $= ${ans}$.`
          }`,
        },
      };
    },
  },

  // 1.1 Prime vs Cube/Square number (MCQ - Core Non-Calc)
  {
    key: 'ch1-number-class-mcq',
    chapterId: 1,
    topicId: '1.1',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const targetKind = pick(rng, ['prime', 'cube', 'irrational'] as const);
      if (targetKind === 'prime') {
        const prime = pick(rng, [29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73]);
        const comps = shuffle(rng, [27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91]).slice(0, 3);
        const options = shuffle(rng, [String(prime), ...comps.map(String)]);
        return {
          signature: `1.1-prime:${prime}:${comps.join(',')}`,
          question: {
            id: `gen-1.1p-${idSuffix}`,
            chapterId: 1,
            topicId: '1.1',
            topicTitle: 'Types of number',
            tier: 'Core',
            paperType: 'Non-Calculator',
            marks: 1,
            sourceRef: 'Paper 1 Non-Calc · Topic 1.1',
            question: 'Which number in the list below is a prime number?',
            questionType: 'mcq',
            options,
            correctAnswer: String(prime),
            markScheme: [{ code: 'B1', detail: `$${prime}$ has exactly two factors: $1$ and $${prime}$` }],
            fullSolution: `Only $${prime}$ has no divisors other than $1$ and itself; the others factorise into smaller primes.`,
          },
        };
      }
      if (targetKind === 'cube') {
        const n = pick(rng, [3, 4, 5, 6, 7]);
        const cube = n ** 3;
        const fakes = shuffle(rng, [cube - 4, cube + 5, n * n + 2, n * 10]).slice(0, 3);
        const options = shuffle(rng, [String(cube), ...fakes.map(String)]);
        return {
          signature: `1.1-cube:${cube}:${fakes.join(',')}`,
          question: {
            id: `gen-1.1c-${idSuffix}`,
            chapterId: 1,
            topicId: '1.1',
            topicTitle: 'Types of number',
            tier: 'Core',
            paperType: 'Non-Calculator',
            marks: 1,
            sourceRef: 'Paper 1 Non-Calc · Topic 1.1',
            question: 'Which of these integers is a cube number?',
            questionType: 'mcq',
            options,
            correctAnswer: String(cube),
            markScheme: [{ code: 'B1', detail: `$${n}^3 = ${cube}$` }],
            fullSolution: `$${n} \\times ${n} \\times ${n} = ${cube}$, so $${cube}$ is the cube number.`,
          },
        };
      }

      const irrPool = ['\\sqrt{7}', '\\sqrt{11}', '\\sqrt{13}', '\\sqrt{19}', '\\pi'];
      const ratPool = ['\\sqrt{49}', '\\frac{22}{7}', '0.\\dot{3}', '\\sqrt{81}', '3.14'];
      const correctIrr = pick(rng, irrPool);
      const chosenRats = shuffle(rng, ratPool).slice(0, 3);
      const ans = `$${correctIrr}$`;
      const options = shuffle(rng, [ans, ...chosenRats.map((r) => `$${r}$`)]);
      return {
        signature: `1.1-irr:${correctIrr}:${chosenRats.join(',')}`,
        question: {
          id: `gen-1.1i-${idSuffix}`,
          chapterId: 1,
          topicId: '1.1',
          topicTitle: 'Types of number',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 1,
          sourceRef: 'Paper 1 Non-Calc · Topic 1.1',
          question: 'Which value is an irrational number?',
          questionType: 'mcq',
          options,
          correctAnswer: ans,
          markScheme: [{ code: 'B1', detail: `${ans} cannot be written as an exact fraction $\\frac{p}{q}$` }],
          fullSolution: `${ans} has a non-terminating, non-recurring decimal expansion, whereas all other choices simplify to exact fractions.`,
        },
      };
    },
  },

  // 1.7 Indices (Text fraction - Extended Non-Calc)
  {
    key: 'ch1-indices-text',
    chapterId: 1,
    topicId: '1.7',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const cases = [
        { base: 64, numExp: -2, denExp: 3, root: 4, pow: 16, ans: '1/16', dec: 1 / 16 },
        { base: 27, numExp: -2, denExp: 3, root: 3, pow: 9, ans: '1/9', dec: 1 / 9 },
        { base: 16, numExp: -3, denExp: 4, root: 2, pow: 8, ans: '1/8', dec: 1 / 8 },
        { base: 8, numExp: -2, denExp: 3, root: 2, pow: 4, ans: '1/4', dec: 0.25 },
        { base: 32, numExp: -2, denExp: 5, root: 2, pow: 4, ans: '1/4', dec: 0.25 },
        { base: 125, numExp: -2, denExp: 3, root: 5, pow: 25, ans: '1/25', dec: 0.04 },
        { base: 81, numExp: -3, denExp: 4, root: 3, pow: 27, ans: '1/27', dec: 1 / 27 },
      ];
      const item = pick(rng, cases);
      return {
        signature: `1.7-ind:${item.base}:${item.numExp}/${item.denExp}`,
        question: {
          id: `gen-1.7-${idSuffix}`,
          chapterId: 1,
          topicId: '1.7',
          topicTitle: 'Indices I',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 2 Non-Calc · Topic 1.7',
          question: `Work out the exact value of $${item.base}^{\\frac{${item.numExp}}{${item.denExp}}}$ as a simplified fraction (type as a/b).`,
          questionType: 'text',
          correctAnswer: item.ans,
          acceptedAnswers: [item.ans],
          numericAnswer: item.dec,
          tolerance: 0.0005,
          markScheme: [
            { code: 'M1', detail: `$\\sqrt[${item.denExp}]{${item.base}} = ${item.root}$ and $${item.root}^{${Math.abs(item.numExp)}} = ${item.pow}$` },
            { code: 'A1', detail: `$\\frac{1}{${item.pow}}$` },
          ],
          fullSolution: `Take the $${item.denExp}$th root of $${item.base}$ to get $${item.root}$. Raise to power $${Math.abs(item.numExp)}$ to get $${item.pow}$, then apply the negative reciprocal: $\\frac{1}{${item.pow}}$.`,
        },
      };
    },
  },

  // 1.18 Surds (Numeric - Extended Non-Calc)
  {
    key: 'ch1-surds-num',
    chapterId: 1,
    topicId: '1.18',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const prime = pick(rng, [2, 3, 5, 7]);
      const p = randInt(rng, 2, 5);
      const q = randInt(rng, 2, 4);
      const top = prime * p;
      const inside = q * q * prime;
      const ans = p + q;
      return {
        signature: `1.18-surds:${prime}:${p}:${q}`,
        question: {
          id: `gen-1.18-${idSuffix}`,
          chapterId: 1,
          topicId: '1.18',
          topicTitle: 'Surds',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 2 Non-Calc · Topic 1.18',
          question: `Simplify $\\frac{${top}}{\\sqrt{${prime}}} + \\sqrt{${inside}}$ into the form $k\\sqrt{${prime}}$. Enter the integer value of $k$.`,
          questionType: 'numeric',
          correctAnswer: String(ans),
          numericAnswer: ans,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `$\\frac{${top}\\sqrt{${prime}}}{${prime}} = ${p}\\sqrt{${prime}}$` },
            { code: 'B1', detail: `$\\sqrt{${inside}} = ${q}\\sqrt{${prime}}$` },
            { code: 'A1', detail: `$${ans}\\sqrt{${prime}} \\implies k = ${ans}$` },
          ],
          fullSolution: `Rationalise $\\frac{${top}}{\\sqrt{${prime}}}$ by multiplying top and bottom by $\\sqrt{${prime}}$ to obtain $${p}\\sqrt{${prime}}$. Simplify $\\sqrt{${inside}} = ${q}\\sqrt{${prime}}$. Add them: $${ans}\\sqrt{${prime}}$.`,
        },
      };
    },
  },

  // 1.16 Money commission (Numeric - Core Non-Calc)
  {
    key: 'ch1-money-commission',
    chapterId: 1,
    topicId: '1.16',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const dollars = pick(rng, [400, 600, 800, 1000, 1200]);
      const commPct = pick(rng, [2, 2.5, 5]);
      const rate = pick(rng, [120, 140, 150, 160]);
      const netDollars = dollars * (1 - commPct / 100);
      const yen = Math.round(netDollars * rate);
      return {
        signature: `1.16-comm:${dollars}:${commPct}:${rate}`,
        question: {
          id: `gen-1.16c-${idSuffix}`,
          chapterId: 1,
          topicId: '1.16',
          topicTitle: 'Money',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 1 Non-Calc · Topic 1.16',
          question: `A currency exchange changes $\\$${dollars}$ into Japanese Yen at a rate of $\\$1 = ${rate}\\text{ JPY}$, after charging a $${commPct}\\%$ commission on the dollars. How many Yen does the customer receive?`,
          questionType: 'numeric',
          correctAnswer: String(yen),
          numericAnswer: yen,
          tolerance: 1,
          unit: 'JPY',
          markScheme: [
            { code: 'M1', detail: `Remaining dollars $= ${dollars} \\times ${1 - commPct / 100} = \\$${netDollars}$` },
            { code: 'A1', detail: `$${netDollars} \\times ${rate} = ${yen}\\text{ JPY}$` },
          ],
          fullSolution: `Subtract $${commPct}\\%$ commission: $\\$${dollars} \\times ${(1 - commPct / 100).toFixed(3).replace(/0+$/, '')} = \\$${netDollars}$. Convert to Yen: $${netDollars} \\times ${rate} = ${yen}\\text{ JPY}$.`,
        },
      };
    },
  },

  // 1.16 Two-way currency conversion (Numeric - Core Calc)
  {
    key: 'ch1-currency-roundtrip',
    chapterId: 1,
    topicId: '1.16',
    tier: 'Core',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const rate = pick(rng, [0.85, 0.88, 0.92, 0.94]);
      const startUsd = pick(rng, [400, 450, 500, 600, 750]);
      const spendEur = pick(rng, [210, 240, 265, 285, 310]);
      const remEur = startUsd * rate - spendEur;
      const ans = Number((remEur / rate).toFixed(2));
      return {
        signature: `1.16-rt:${startUsd}:${rate}:${spendEur}`,
        question: {
          id: `gen-1.16r-${idSuffix}`,
          chapterId: 1,
          topicId: '1.16',
          topicTitle: 'Money',
          tier: 'Core',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 3 Calc · Topic 1.16',
          question: `The exchange rate is $\\$1 = €${rate}$. A traveller changes $\\$${startUsd}$ into euros, spends $€${spendEur}$, and changes the remaining euros back into dollars at the same rate. How many dollars do they receive to the nearest cent ($2$ d.p.)?`,
          questionType: 'numeric',
          correctAnswer: ans.toFixed(2),
          numericAnswer: ans,
          tolerance: 0.02,
          unit: '$',
          markScheme: [
            { code: 'M1', detail: `$${startUsd} \\times ${rate} = €${(startUsd * rate).toFixed(2)}$` },
            { code: 'M1', detail: `Remaining euros $= €${remEur.toFixed(2)}$, then $\\div ${rate}$` },
            { code: 'A1', detail: `$\\$${ans.toFixed(2)}$` },
          ],
          fullSolution: `Convert $\\$${startUsd}$ to euros: $${startUsd} \\times ${rate} = €${(startUsd * rate).toFixed(2)}$. Subtract $€${spendEur}$ leaving $€${remEur.toFixed(2)}$. Divide by $${rate}$ to convert back: $\\$${ans.toFixed(2)}$.`,
        },
      };
    },
  },

  // 1.12 Ratio sharing (Numeric - Core Calc)
  {
    key: 'ch1-ratio-share',
    chapterId: 1,
    topicId: '1.12',
    tier: 'Core',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const ratios: Array<[number, number, number]> = [
        [2, 3, 5],
        [3, 4, 5],
        [2, 5, 8],
        [1, 3, 6],
        [3, 5, 7],
      ];
      const [a, b, c] = pick(rng, ratios);
      const sumParts = a + b + c;
      const partValue = randInt(rng, 14, 35);
      const total = sumParts * partValue;
      const diff = (c - a) * partValue;
      return {
        signature: `1.12-ratio:${a}:${b}:${c}:${partValue}`,
        question: {
          id: `gen-1.12-${idSuffix}`,
          chapterId: 1,
          topicId: '1.12',
          topicTitle: 'Rates',
          tier: 'Core',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 3 Calc · Topic 1.12',
          question: `A prize of $\\$${total}$ is shared among three winners in the ratio $${a} : ${b} : ${c}$. Calculate the difference between the largest share and the smallest share in dollars.`,
          questionType: 'numeric',
          correctAnswer: String(diff),
          numericAnswer: diff,
          tolerance: 0,
          unit: '$',
          markScheme: [
            { code: 'M1', detail: `Total parts $= ${a} + ${b} + ${c} = ${sumParts}$` },
            { code: 'M1', detail: `$1$ part $= ${total} \\div ${sumParts} = \\$${partValue}$` },
            { code: 'A1', detail: `Difference $= (${c} - ${a}) \\times ${partValue} = \\$${diff}$` },
          ],
          fullSolution: `Sum the ratio parts: $${sumParts}$. Each part is $\\$${total} \\div ${sumParts} = \\$${partValue}$. The difference between largest and smallest shares is $${c - a}$ parts $= ${c - a} \\times ${partValue} = \\$${diff}$.`,
        },
      };
    },
  },

  // 1.10 Limits of accuracy (Numeric - Extended Calc)
  {
    key: 'ch1-bounds-calc',
    chapterId: 1,
    topicId: '1.10',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const length = randInt(rng, 12, 24);
      const width = randInt(rng, 7, 15);
      const boundType = rng() < 0.5 ? 'lower' : 'upper';
      const lBound = boundType === 'lower' ? length - 0.5 : length + 0.5;
      const wBound = boundType === 'lower' ? width - 0.5 : width + 0.5;
      const area = Number((lBound * wBound).toFixed(2));
      return {
        signature: `1.10-bounds:${boundType}:${length}:${width}`,
        question: {
          id: `gen-1.10-${idSuffix}`,
          chapterId: 1,
          topicId: '1.10',
          topicTitle: 'Limits of accuracy',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 4 Calc · Topic 1.10',
          question: `A rectangular card has length $${length}\\text{ cm}$ and width $${width}\\text{ cm}$, both measured to the nearest centimetre. Calculate the ${boundType} bound for its area in $\\text{cm}^2$.`,
          questionType: 'numeric',
          correctAnswer: String(area),
          numericAnswer: area,
          tolerance: 0.01,
          unit: 'cm²',
          markScheme: [
            { code: 'B1', detail: `Bounds used: $${lBound}\\text{ cm}$ and $${wBound}\\text{ cm}$` },
            { code: 'M1', detail: `$${lBound} \\times ${wBound}$` },
            { code: 'A1', detail: `$${area}\\text{ cm}^2$` },
          ],
          fullSolution: `Measurements to the nearest $1\\text{ cm}$ have bounds $\\pm 0.5\\text{ cm}$. Multiply the two ${boundType} bounds: $${lBound} \\times ${wBound} = ${area}\\text{ cm}^2$.`,
        },
      };
    },
  },

  // 1.13 Reverse percentages (Numeric & MCQ - Extended Calc)
  {
    key: 'ch1-reverse-pct',
    chapterId: 1,
    topicId: '1.13',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const pct = pick(rng, [12, 15, 18, 20, 25]);
      const original = pick(rng, [400, 500, 600, 750, 800, 900, 1200]);
      const sale = Math.round(original * (1 - pct / 100));
      const useMcq = rng() < 0.45;

      if (useMcq) {
        const wrongAdd = Math.round(sale * (1 + pct / 100));
        const options = buildUniqueMcqOptions(rng, `$${original}`, [
          `$${wrongAdd}`,
          `$${original - 50}`,
          `$${original + 100}`,
        ]);
        return {
          signature: `1.13-rev-mcq:${pct}:${original}`,
          question: {
            id: `gen-1.13m-${idSuffix}`,
            chapterId: 1,
            topicId: '1.13',
            topicTitle: 'Percentages',
            tier: 'Extended',
            paperType: 'Calculator',
            marks: 3,
            sourceRef: 'Paper 4 Calc · Topic 1.13',
            question: `In a sale, the price of a laptop is reduced by $${pct}\\%$ to $\\$${sale}$. What was the original price of the laptop?`,
            questionType: 'mcq',
            options,
            correctAnswer: `$${original}`,
            markScheme: [
              { code: 'M1', detail: `$\\$${sale} = ${100 - pct}\\%$ of original` },
              { code: 'A1', detail: `$${sale} \\div ${(1 - pct / 100).toFixed(2)} = \\$${original}$` },
            ],
            fullSolution: `A $${pct}\\%$ discount leaves $${100 - pct}\\% = ${(1 - pct / 100).toFixed(2)}$ of the original price. Divide: $${sale} \\div ${(1 - pct / 100).toFixed(2)} = \\$${original}$.`,
          },
        };
      }

      return {
        signature: `1.13-rev:${pct}:${original}`,
        question: {
          id: `gen-1.13-${idSuffix}`,
          chapterId: 1,
          topicId: '1.13',
          topicTitle: 'Percentages',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 4 Calc · Topic 1.13',
          question: `After a $${pct}\\%$ reduction, a tablet costs $\\$${sale}$. Calculate the original price of the tablet in dollars.`,
          questionType: 'numeric',
          correctAnswer: String(original),
          numericAnswer: original,
          tolerance: 0.01,
          unit: '$',
          markScheme: [
            { code: 'M1', detail: `$${100 - pct}\\%$ corresponds to $\\$${sale}$` },
            { code: 'M1', detail: `$${sale} \\div ${(1 - pct / 100).toFixed(2)}$` },
            { code: 'A1', detail: `$\\$${original}$` },
          ],
          fullSolution: `Divide the sale price by the multiplier ${(1 - pct / 100).toFixed(2)}: $${sale} \\div ${(1 - pct / 100).toFixed(2)} = \\$${original}$.`,
        },
      };
    },
  },

  // 2.5 Simultaneous equations (Numeric - Core Non-Calc)
  {
    key: 'ch2-simul-eq',
    chapterId: 2,
    topicId: '2.5',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const x = randInt(rng, 2, 8);
      const y = randInt(rng, 1, 6);
      const a = randInt(rng, 2, 4);
      const b = randInt(rng, 2, 5);
      const c = randInt(rng, 1, 3);
      const rhs1 = a * x + b * y;
      const rhs2 = c * x - b * y;
      return {
        signature: `2.5-sim:${a}:${b}:${c}:${x}:${y}`,
        question: {
          id: `gen-2.5-${idSuffix}`,
          chapterId: 2,
          topicId: '2.5',
          topicTitle: 'Equations',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 1 Non-Calc · Topic 2.5',
          question: `Solve the simultaneous equations $${a}x + ${b}y = ${rhs1}$ and $${c === 1 ? '' : c}x - ${b}y = ${rhs2}$. Enter the value of $x$.`,
          questionType: 'numeric',
          correctAnswer: String(x),
          numericAnswer: x,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `Add the two equations to eliminate $y$: $${a + c}x = ${rhs1 + rhs2}$` },
            { code: 'A1', detail: `$x = ${x}$` },
            { code: 'A1', detail: `$y = ${y}$` },
          ],
          fullSolution: `Adding the equations eliminates $\\pm ${b}y$: $${a + c}x = ${rhs1 + rhs2} \\implies x = ${x}$.`,
        },
      };
    },
  },

  // 2.7 Quadratic sequences (Numeric - Extended Non-Calc)
  {
    key: 'ch2-quad-seq',
    chapterId: 2,
    topicId: '2.7',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const a = pick(rng, [1, 2, 3]);
      const c = randInt(rng, 1, 7);
      const b = pick(rng, [0, 1, 2]);
      const term = (n: number) => a * n * n + b * n + c;
      const first4 = [term(1), term(2), term(3), term(4)].join(', ');
      const targetN = pick(rng, [8, 9, 10, 11, 12]);
      const ans = term(targetN);
      const aLabel = a === 1 ? '' : String(a);
      const bLabel = b === 0 ? '' : b === 1 ? ' + n' : ` + ${b}n`;
      return {
        signature: `2.7-seq:${a}:${b}:${c}:${targetN}`,
        question: {
          id: `gen-2.7-${idSuffix}`,
          chapterId: 2,
          topicId: '2.7',
          topicTitle: 'Sequences',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 2 Non-Calc · Topic 2.7',
          question: `A quadratic sequence begins $${first4}, \\dots$. Calculate the $${targetN}$th term of this sequence.`,
          questionType: 'numeric',
          correctAnswer: String(ans),
          numericAnswer: ans,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `Second difference $= ${2 * a} \\implies ${aLabel}n^2$ term` },
            { code: 'A1', detail: `$u_n = ${aLabel}n^2${bLabel} + ${c}$` },
            { code: 'A1', detail: `$u_{${targetN}} = ${ans}$` },
          ],
          fullSolution: `The constant second difference is $${2 * a}$, so the coefficient of $n^2$ is $${a}$. Subtracting $${aLabel}n^2$ leaves linear part $${b === 0 ? c : `${b === 1 ? 'n' : `${b}n`} + ${c}`}$. Evaluating at $n = ${targetN}$ gives $${ans}$.`,
        },
      };
    },
  },

  // 2.8 Inverse proportion (Numeric - Extended Calc)
  {
    key: 'ch2-inv-prop',
    chapterId: 2,
    topicId: '2.8',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const shift = randInt(rng, 1, 3);
      const x1 = randInt(rng, 1, 3);
      const d1 = x1 + shift;
      const d2 = d1 * 2;
      const x2 = d2 - shift;
      const y2 = pick(rng, [1, 2, 3, 4]);
      const y1 = y2 * 4;
      const k = y1 * d1 * d1;
      return {
        signature: `2.8-prop:${shift}:${x1}:${y2}`,
        question: {
          id: `gen-2.8-${idSuffix}`,
          chapterId: 2,
          topicId: '2.8',
          topicTitle: 'Proportion',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 4 Calc · Topic 2.8',
          question: `$y$ is inversely proportional to $(x + ${shift})^2$. When $x = ${x1}$, $y = ${y1}$. Find the value of $y$ when $x = ${x2}$.`,
          questionType: 'numeric',
          correctAnswer: String(y2),
          numericAnswer: y2,
          tolerance: 0.001,
          markScheme: [
            { code: 'M1', detail: `$y = \\frac{k}{(x + ${shift})^2}$` },
            { code: 'A1', detail: `$k = ${y1} \\times ${d1}^2 = ${k}$` },
            { code: 'A1', detail: `$y = \\frac{${k}}{${d2}^2} = ${y2}$` },
          ],
          fullSolution: `Write $y = \\frac{k}{(x + ${shift})^2}$. Substituting $(${x1}, ${y1})$ gives $k = ${k}$. Then at $x = ${x2}$, $y = \\frac{${k}}{${d2}^2} = ${y2}$.`,
        },
      };
    },
  },

  // 2.12 Differentiation stationary point (Numeric - Extended Non-Calc)
  {
    key: 'ch2-diff-stationary',
    chapterId: 2,
    topicId: '2.12',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const root = pick(rng, [2, 3, 4, 5, 6]);
      const linearCoeff = 3 * root * root;
      const constant = randInt(rng, 2, 15);
      return {
        signature: `2.12-stat:${root}:${constant}`,
        question: {
          id: `gen-2.12-${idSuffix}`,
          chapterId: 2,
          topicId: '2.12',
          topicTitle: 'Differentiation',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 2 Non-Calc · Topic 2.12',
          question: `A curve has equation $y = x^3 - ${linearCoeff}x + ${constant}$. Find the positive $x$-coordinate where the curve has a stationary point.`,
          questionType: 'numeric',
          correctAnswer: String(root),
          numericAnswer: root,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `$\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 3x^2 - ${linearCoeff}$` },
            { code: 'M1', detail: `$3x^2 - ${linearCoeff} = 0 \\implies x^2 = ${root * root}$` },
            { code: 'A1', detail: `$x = ${root}$` },
          ],
          fullSolution: `Differentiate to obtain $\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 3x^2 - ${linearCoeff}$. Set to $0$: $x^2 = ${root * root}$, so the positive stationary $x$-coordinate is $${root}$.`,
        },
      };
    },
  },

  // 2.13 Functions fg(k) (MCQ - Extended Non-Calc)
  {
    key: 'ch2-functions-mcq',
    chapterId: 2,
    topicId: '2.13',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const a = randInt(rng, 2, 5);
      const b = randInt(rng, 1, 7);
      const c = randInt(rng, 1, 5);
      const x = randInt(rng, 2, 4);
      const gx = x * x + c;
      const fgx = a * gx - b;
      const gfx = (a * x - b) * (a * x - b) + c;
      const wrong1 = a * (x * x - c) - b;
      const wrong2 = fgx + 4;
      const options = buildUniqueMcqOptions(rng, String(fgx), [
        String(gfx),
        String(wrong1),
        String(wrong2),
        String(fgx - 2),
      ]);
      return {
        signature: `2.13-fg:${a}:${b}:${c}:${x}`,
        question: {
          id: `gen-2.13-${idSuffix}`,
          chapterId: 2,
          topicId: '2.13',
          topicTitle: 'Functions',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 2 Non-Calc · Topic 2.13',
          question: `Given $\\mathrm{f}(x) = ${a}x - ${b}$ and $\\mathrm{g}(x) = x^2 + ${c}$, what is $\\mathrm{fg}(${x})$?`,
          questionType: 'mcq',
          options,
          correctAnswer: String(a * gx - b),
          markScheme: [
            { code: 'M1', detail: `$\\mathrm{g}(${x}) = ${x}^2 + ${c} = ${gx}$` },
            { code: 'A1', detail: `$\\mathrm{f}(${gx}) = ${a}(${gx}) - ${b} = ${a * gx - b}$` },
          ],
          fullSolution: `Evaluate inner function $\\mathrm{g}(${x}) = ${gx}$ first, then substitute into $\\mathrm{f}$: $${a}(${gx}) - ${b} = ${a * gx - b}$.`,
        },
      };
    },
  },

  // 3.4 Distance between points (Numeric - Extended Non-Calc)
  {
    key: 'ch3-distance',
    chapterId: 3,
    topicId: '3.4',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const triples: Array<[number, number, number]> = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 15, 17],
        [9, 12, 15],
      ];
      const [dx, dy, dist] = pick(rng, triples);
      const x1 = randInt(rng, -5, 4);
      const y1 = randInt(rng, -4, 5);
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      return {
        signature: `3.4-dist:${x1}:${y1}:${x2}:${y2}`,
        question: {
          id: `gen-3.4-${idSuffix}`,
          chapterId: 3,
          topicId: '3.4',
          topicTitle: 'Length and midpoint',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 2 Non-Calc · Topic 3.4',
          question: `Points $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$ lie in the Cartesian plane. Calculate the exact length $AB$.`,
          questionType: 'numeric',
          correctAnswer: String(dist),
          numericAnswer: dist,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `$\\sqrt{(${x2} - (${x1}))^2 + (${y2} - (${y1}))^2} = \\sqrt{${dx}^2 + ${dy}^2}$` },
            { code: 'A1', detail: `$${dist}$` },
          ],
          fullSolution: `Compute $\\Delta x = ${dx}$ and $\\Delta y = ${dy}$. Distance $= \\sqrt{${dx}^2 + ${dy}^2} = \\sqrt{${dist * dist}} = ${dist}$.`,
        },
      };
    },
  },

  // 3.7 Perpendicular gradient (Numeric/Text - Extended Non-Calc)
  {
    key: 'ch3-perp-gradient',
    chapterId: 3,
    topicId: '3.7',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const a = pick(rng, [1, 2, 3]);
      const k = pick(rng, [2, 3, 4, 5]);
      const b = a * k;
      const c = randInt(rng, 10, 25);
      return {
        signature: `3.7-perp:${a}:${b}:${c}`,
        question: {
          id: `gen-3.7-${idSuffix}`,
          chapterId: 3,
          topicId: '3.7',
          topicTitle: 'Perpendicular lines',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 2 Non-Calc · Topic 3.7',
          question: `Line $L$ has equation $${a === 1 ? '' : a}x + ${b}y = ${c}$. What is the gradient of any line perpendicular to $L$?`,
          questionType: 'numeric',
          correctAnswer: String(k),
          numericAnswer: k,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `Rearranging gives $m_L = -\\frac{${a}}{${b}} = -\\frac{1}{${k}}$` },
            { code: 'M1', detail: `Perpendicular rule $m_1 m_2 = -1$` },
            { code: 'A1', detail: `$${k}$` },
          ],
          fullSolution: `Rearranging into $y = mx + c$ gives gradient $m_L = -\\frac{1}{${k}}$. Taking the negative reciprocal gives $m_{\\perp} = ${k}$.`,
        },
      };
    },
  },

  // 4.3 Extended Bearings with Parallel North Lines & Cosine Rule (Numeric - Extended Calc)
  {
    key: 'ch4-bearings-extended',
    chapterId: 4,
    topicId: '4.3',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const bAB = pick(rng, [40, 50, 60, 70, 75]);
      const bBC = pick(rng, [125, 135, 145, 155, 165]);
      const dAB = randInt(rng, 8, 16);
      const dBC = randInt(rng, 7, 15);
      const coInterior = 180 - bAB;
      const angleABC = 360 - coInterior - bBC;
      const rad = (angleABC * Math.PI) / 180;
      const acRaw = Math.sqrt(dAB * dAB + dBC * dBC - 2 * dAB * dBC * Math.cos(rad));
      const acRounded = Number(acRaw.toPrecision(3));
      const padAB = String(bAB).padStart(3, '0');
      const padBC = String(bBC).padStart(3, '0');
      return {
        signature: `4.3-brg:${bAB}:${bBC}:${dAB}:${dBC}`,
        question: {
          id: `gen-4.3-${idSuffix}`,
          chapterId: 4,
          topicId: '4.3',
          topicTitle: 'Scale drawings and bearings',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 4,
          sourceRef: 'Paper 4 Calc · Topic 4.3',
          question: `A boat sails $${dAB}\\text{ km}$ from port $A$ to buoy $B$ on a bearing of $${padAB}^\\circ$, and then sails $${dBC}\\text{ km}$ from $B$ to port $C$ on a bearing of $${padBC}^\\circ$. Calculate the straight-line distance $AC$ in kilometres to $3$ significant figures.`,
          questionType: 'numeric',
          correctAnswer: String(acRounded),
          numericAnswer: acRounded,
          tolerance: Math.max(0.05, acRounded * 0.01),
          unit: 'km',
          markScheme: [
            { code: 'B1', detail: `Co-interior angle at $B$ (West of North line) $= 180^\\circ - ${bAB}^\\circ = ${coInterior}^\\circ$` },
            { code: 'M1', detail: `$\\angle ABC = 360^\\circ - (${coInterior}^\\circ + ${bBC}^\\circ) = ${angleABC}^\\circ$` },
            { code: 'M1', detail: `$AC^2 = ${dAB}^2 + ${dBC}^2 - 2(${dAB})(${dBC})\\cos ${angleABC}^\\circ$` },
            { code: 'A1', detail: `$${acRounded}\\text{ km}$` },
          ],
          fullSolution: `Parallel North lines at $A$ and $B$ give co-interior angle $180^\\circ - ${bAB}^\\circ = ${coInterior}^\\circ$. Around $B$, $\\angle ABC = 360^\\circ - ${coInterior}^\\circ - ${bBC}^\\circ = ${angleABC}^\\circ$. Applying the Cosine Rule gives $AC = ${acRaw.toFixed(3)}\\dots \\approx ${acRounded}\\text{ km}$.`,
        },
      };
    },
  },

  // 4.6 Regular polygon angles (MCQ - Core Non-Calc)
  {
    key: 'ch4-polygon-mcq',
    chapterId: 4,
    topicId: '4.6',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const n = pick(rng, [8, 9, 10, 12, 15, 18, 20, 24]);
      const ext = 360 / n;
      const askInterior = rng() < 0.45;
      if (askInterior) {
        const interior = 180 - ext;
        const options = buildUniqueMcqOptions(rng, `${interior}°`, [
          `${ext}°`,
          `${180 - ext * 2}°`,
          `${interior - 10}°`,
          `${interior + 12}°`,
        ]);
        return {
          signature: `4.6-int:${n}`,
          question: {
            id: `gen-4.6i-${idSuffix}`,
            chapterId: 4,
            topicId: '4.6',
            topicTitle: 'Angles',
            tier: 'Core',
            paperType: 'Non-Calculator',
            marks: 2,
            sourceRef: 'Paper 1 Non-Calc · Topic 4.6',
            question: `Calculate the size of one interior angle of a regular $${n}$-sided polygon.`,
            questionType: 'mcq',
            options,
            correctAnswer: `${interior}°`,
            markScheme: [
              { code: 'M1', detail: `Exterior angle $= \\frac{360^\\circ}{${n}} = ${ext}^\\circ$` },
              { code: 'A1', detail: `Interior angle $= 180^\\circ - ${ext}^\\circ = ${interior}^\\circ$` },
            ],
            fullSolution: `Each exterior angle is $360^\\circ \\div ${n} = ${ext}^\\circ$. Since interior and exterior angles are supplementary, each interior angle is $180^\\circ - ${ext}^\\circ = ${interior}^\\circ$.`,
          },
        };
      }

      const options = buildUniqueMcqOptions(rng, String(n), [
        String(n - 2),
        String(n + 4),
        String(Math.max(4, Math.round(180 / ext))),
      ]);
      return {
        signature: `4.6-ext:${n}`,
        question: {
          id: `gen-4.6e-${idSuffix}`,
          chapterId: 4,
          topicId: '4.6',
          topicTitle: 'Angles',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 1 Non-Calc · Topic 4.6',
          question: `Each exterior angle of a regular polygon is $${ext}^\\circ$. How many sides does the polygon have?`,
          questionType: 'mcq',
          options,
          correctAnswer: String(n),
          markScheme: [
            { code: 'M1', detail: `$n = 360 \\div ${ext}$` },
            { code: 'A1', detail: `$${n}$ sides` },
          ],
          fullSolution: `Exterior angles of any convex polygon sum to $360^\\circ$, so $n = \\frac{360}{${ext}} = ${n}$.`,
        },
      };
    },
  },

  // 4.6 Transversal Parallel Lines Algebra (Numeric - Extended Non-Calc)
  {
    key: 'ch4-transversal-angles',
    chapterId: 4,
    topicId: '4.6',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const a = pick(rng, [2, 3, 4]);
      const b = pick(rng, [1, 2, 3]);
      const x = randInt(rng, 16, 32);
      const sumCoeff = a + b;
      const c1 = randInt(rng, 8, 25);
      const c2 = 180 - sumCoeff * x - c1;
      const expr1 = `${a}x + ${c1}`;
      const expr2 = c2 >= 0 ? `${b === 1 ? '' : b}x + ${c2}` : `${b === 1 ? '' : b}x - ${Math.abs(c2)}`;
      return {
        signature: `4.6-trv:${a}:${b}:${x}:${c1}`,
        question: {
          id: `gen-4.6t-${idSuffix}`,
          chapterId: 4,
          topicId: '4.6',
          topicTitle: 'Angles',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 2 Non-Calc · Topic 4.6',
          question: `Two parallel straight lines are intersected by a transversal. A pair of co-interior (allied) angles measure $(${expr1})^\\circ$ and $(${expr2})^\\circ$. Find the value of $x$.`,
          questionType: 'numeric',
          correctAnswer: String(x),
          numericAnswer: x,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `Co-interior C-angles sum to $180^\\circ$: $(${expr1}) + (${expr2}) = 180$` },
            { code: 'M1', detail: `$${sumCoeff}x + ${c1 + c2} = 180 \\implies ${sumCoeff}x = ${sumCoeff * x}$` },
            { code: 'A1', detail: `$x = ${x}$` },
          ],
          fullSolution: `Co-interior angles between parallel lines are supplementary: $(${expr1}) + (${expr2}) = 180 \\implies ${sumCoeff}x = ${sumCoeff * x} \\implies x = ${x}$.`,
        },
      };
    },
  },

  // 4.8 Circle theorems (MCQ - Extended Non-Calc)
  {
    key: 'ch4-circle-mcq',
    chapterId: 4,
    topicId: '4.8',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const abc = pick(rng, [64, 68, 72, 74, 78, 82, 86, 94]);
      const adc = 180 - abc;
      const options = buildUniqueMcqOptions(rng, `${adc}°`, [
        `${abc}°`,
        `${90 - Math.floor(abc / 2)}°`,
        `${adc - 12}°`,
        `${180 - adc + 10}°`,
      ]);
      return {
        signature: `4.8-cyc:${abc}`,
        question: {
          id: `gen-4.8-${idSuffix}`,
          chapterId: 4,
          topicId: '4.8',
          topicTitle: 'Circle theorems II',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 2 Non-Calc · Topic 4.8',
          question: `Points $A, B, C, D$ lie on the circumference of a circle in order. If $\\angle ABC = ${abc}^\\circ$, find the size of $\\angle ADC$.`,
          questionType: 'mcq',
          options,
          correctAnswer: `${adc}°`,
          markScheme: [
            { code: 'M1', detail: 'Opposite angles in a cyclic quadrilateral sum to $180^\\circ$' },
            { code: 'A1', detail: `$180^\\circ - ${abc}^\\circ = ${adc}^\\circ$` },
          ],
          fullSolution: `$ABCD$ is a cyclic quadrilateral, so opposite angles add to $180^\\circ$: $\\angle ADC = 180^\\circ - ${abc}^\\circ = ${adc}^\\circ$.`,
        },
      };
    },
  },

  // 5.3 Sectors and arcs (Numeric - Core Calc)
  {
    key: 'ch5-sector-area',
    chapterId: 5,
    topicId: '5.3',
    tier: 'Core',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const r = pick(rng, [6, 8, 9, 10, 12, 14]);
      const angle = pick(rng, [45, 60, 72, 90, 120, 150]);
      const exactArea = (angle / 360) * Math.PI * r * r;
      const ans = Number(exactArea.toFixed(1));
      return {
        signature: `5.3-sec:${r}:${angle}`,
        question: {
          id: `gen-5.3-${idSuffix}`,
          chapterId: 5,
          topicId: '5.3',
          topicTitle: 'Circles, arcs and sectors',
          tier: 'Core',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 3 Calc · Topic 5.3',
          question: `A sector of a circle has radius $${r}\\text{ cm}$ and central angle $${angle}^\\circ$. Calculate the area of the sector to $1$ decimal place.`,
          questionType: 'numeric',
          correctAnswer: ans.toFixed(1),
          numericAnswer: ans,
          tolerance: 0.15,
          unit: 'cm²',
          markScheme: [
            { code: 'M1', detail: `$\\frac{${angle}}{360} \\times \\pi \\times ${r}^2$` },
            { code: 'A1', detail: `$${ans.toFixed(1)}\\text{ cm}^2$` },
          ],
          fullSolution: `Sector area $= \\frac{${angle}}{360} \\times \\pi \\times ${r}^2 \\approx ${ans.toFixed(1)}\\text{ cm}^2$.`,
        },
      };
    },
  },

  // 5.4 Cone Total Surface Area (Numeric - Extended Calc)
  {
    key: 'ch5-cone-sa',
    chapterId: 5,
    topicId: '5.4',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const triples: Array<[number, number, number]> = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [9, 12, 15],
        [8, 15, 17],
      ];
      const [r, h, l] = pick(rng, triples);
      const k = r * l + r * r;
      return {
        signature: `5.4-cone:${r}:${h}`,
        question: {
          id: `gen-5.4-${idSuffix}`,
          chapterId: 5,
          topicId: '5.4',
          topicTitle: 'Surface area and volume',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 4 Calc · Topic 5.4',
          question: `A solid cone has base radius $${r}\\text{ cm}$ and vertical height $${h}\\text{ cm}$. Its total surface area (curved surface + base) is $k\\pi\\text{ cm}^2$. Find the integer value of $k$.`,
          questionType: 'numeric',
          correctAnswer: String(k),
          numericAnswer: k,
          tolerance: 0,
          markScheme: [
            { code: 'B1', detail: `Slant height $l = \\sqrt{${r}^2 + ${h}^2} = ${l}\\text{ cm}$` },
            { code: 'M1', detail: `Total SA $= \\pi r l + \\pi r^2 = ${r * l}\\pi + ${r * r}\\pi$` },
            { code: 'A1', detail: `$k = ${k}$` },
          ],
          fullSolution: `By Pythagoras, slant height $l = \\sqrt{${r}^2 + ${h}^2} = ${l}\\text{ cm}$. Curved area $= ${r * l}\\pi$, base area $= ${r * r}\\pi$, so total SA $= ${k}\\pi \\implies k = ${k}$.`,
        },
      };
    },
  },

  // 6.2 Right-angled Pythagoras (Numeric - Core Calc)
  {
    key: 'ch6-pythagoras',
    chapterId: 6,
    topicId: '6.2',
    tier: 'Core',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const cases: Array<[number, number, number]> = [
        [2.5, 6, 6.5],
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [1.5, 2, 2.5],
        [7, 24, 25],
      ];
      const [base, height, ladder] = pick(rng, cases);
      return {
        signature: `6.2-pyth:${base}:${ladder}`,
        question: {
          id: `gen-6.2-${idSuffix}`,
          chapterId: 6,
          topicId: '6.2',
          topicTitle: 'Right-angled triangles',
          tier: 'Core',
          paperType: 'Calculator',
          marks: 2,
          sourceRef: 'Paper 3 Calc · Topic 6.2',
          question: `A ladder of length $${ladder}\\text{ m}$ leans against a vertical wall with its foot $${base}\\text{ m}$ from the base of the wall. How high up the wall does it reach (in metres)?`,
          questionType: 'numeric',
          correctAnswer: String(height),
          numericAnswer: height,
          tolerance: 0.01,
          unit: 'm',
          markScheme: [
            { code: 'M1', detail: `$\\sqrt{${ladder}^2 - ${base}^2}$` },
            { code: 'A1', detail: `$${height}\\text{ m}$` },
          ],
          fullSolution: `By Pythagoras' theorem, height $= \\sqrt{${ladder}^2 - ${base}^2} = \\sqrt{${(ladder * ladder - base * base).toFixed(2)}} = ${height}\\text{ m}$.`,
        },
      };
    },
  },

  // 6.5 Cosine rule (Numeric - Extended Calc)
  {
    key: 'ch6-cosine-rule',
    chapterId: 6,
    topicId: '6.5',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const a = randInt(rng, 5, 10);
      const b = randInt(rng, 7, 13);
      const cSq = a * a + b * b - a * b;
      const c = Number(Math.sqrt(cSq).toPrecision(3));
      return {
        signature: `6.5-cos:${a}:${b}`,
        question: {
          id: `gen-6.5-${idSuffix}`,
          chapterId: 6,
          topicId: '6.5',
          topicTitle: 'Non-right-angled triangles',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 4 Calc · Topic 6.5',
          question: `In $\\triangle ABC$, $a = ${a}\\text{ cm}$, $b = ${b}\\text{ cm}$, and $\\angle C = 60^\\circ$. Calculate side $c$ to $3$ significant figures.`,
          questionType: 'numeric',
          correctAnswer: String(c),
          numericAnswer: c,
          tolerance: 0.03,
          unit: 'cm',
          markScheme: [
            { code: 'M1', detail: `$c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})\\cos 60^\\circ$` },
            { code: 'A1', detail: `$c^2 = ${cSq}$` },
            { code: 'A1', detail: `$c = \\sqrt{${cSq}} \\approx ${c}\\text{ cm}$` },
          ],
          fullSolution: `Using the cosine rule with $\\cos 60^\\circ = 0.5$: $c^2 = ${a * a} + ${b * b} - ${a * b} = ${cSq}$, giving $c \\approx ${c}\\text{ cm}$.`,
        },
      };
    },
  },

  // 7.3 Vector magnitude (Numeric - Extended Non-Calc)
  {
    key: 'ch7-vector-mag',
    chapterId: 7,
    topicId: '7.3',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const triples: Array<[number, number, number]> = [
        [3, -4, 5],
        [-6, 8, 10],
        [9, -12, 15],
        [-5, 12, 13],
        [8, -15, 17],
        [12, -16, 20],
      ];
      const [vx, vy, mag] = pick(rng, triples);
      return {
        signature: `7.3-vec:${vx}:${vy}`,
        question: {
          id: `gen-7.3-${idSuffix}`,
          chapterId: 7,
          topicId: '7.3',
          topicTitle: 'Magnitude of a vector',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 2 Non-Calc · Topic 7.3',
          question: `Vector $\\mathbf{v} = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}$. Calculate $|\\mathbf{v}|$.`,
          questionType: 'numeric',
          correctAnswer: String(mag),
          numericAnswer: mag,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `$\\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${mag * mag}}$` },
            { code: 'A1', detail: `$${mag}$` },
          ],
          fullSolution: `Magnitude $|\\mathbf{v}| = \\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${vx * vx} + ${vy * vy}} = \\sqrt{${mag * mag}} = ${mag}$.`,
        },
      };
    },
  },

  // 8.3 Probability with replacement (Text fraction/decimal - Core Non-Calc)
  {
    key: 'ch8-prob-replace',
    chapterId: 8,
    topicId: '8.3',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const pairs: Array<[number, number]> = [
        [3, 7],
        [4, 6],
        [2, 8],
        [3, 5],
        [5, 5],
        [2, 3],
      ];
      const [green, yellow] = pick(rng, pairs);
      const total = green + yellow;
      const fracAns = formatFraction(green * green, total * total);
      const dec = Number(((green / total) ** 2).toFixed(4));
      return {
        signature: `8.3-rep:${green}:${yellow}`,
        question: {
          id: `gen-8.3-${idSuffix}`,
          chapterId: 8,
          topicId: '8.3',
          topicTitle: 'Probability of combined events',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 1 Non-Calc · Topic 8.3',
          question: `A bag contains $${green}$ green and $${yellow}$ yellow counters. Two counters are picked WITH replacement. What is the probability that BOTH are green? (Enter as a simplified fraction a/b or exact decimal)`,
          questionType: 'text',
          correctAnswer: fracAns,
          acceptedAnswers: [fracAns, String(dec)],
          numericAnswer: dec,
          tolerance: 0.001,
          markScheme: [
            { code: 'M1', detail: `$P(\\text{Green}) = \\frac{${green}}{${total}}$` },
            { code: 'M1', detail: `$\\frac{${green}}{${total}} \\times \\frac{${green}}{${total}}$` },
            { code: 'A1', detail: `$\\frac{${fracAns.split('/')[0]}}{${fracAns.split('/')[1] || 1}}$` },
          ],
          fullSolution: `Because the first counter is replaced, both draws have probability $\\frac{${green}}{${total}}$. Multiply: $\\left(\\frac{${green}}{${total}}\\right)^2 = ${fracAns}$.`,
        },
      };
    },
  },

  // 8.3 Exclusive vs Independent Events (MCQ - Extended Non-Calc)
  {
    key: 'ch8-exclusive-independent-mcq',
    chapterId: 8,
    topicId: '8.3',
    tier: 'Extended',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const pairs: Array<[number, number]> = [
        [0.3, 0.4],
        [0.4, 0.5],
        [0.2, 0.6],
        [0.5, 0.6],
        [0.3, 0.7],
        [0.4, 0.6],
      ];
      const [pA, pB] = pick(rng, pairs);
      const pBoth = Number((pA * pB).toFixed(2));
      const pUnion = Number((pA + pB - pBoth).toFixed(2));
      const pWrongSum = Number((pA + pB).toFixed(2));
      const pWrongComp = Number((1 - pBoth).toFixed(2));
      const formatDec = (v: number) => String(v);
      const options = buildUniqueMcqOptions(rng, formatDec(pUnion), [
        formatDec(pWrongSum),
        formatDec(pBoth),
        formatDec(pWrongComp),
        formatDec(Number(Math.max(0.05, pUnion - 0.1).toFixed(2))),
      ]);
      return {
        signature: `8.3-ind:${pA}:${pB}`,
        question: {
          id: `gen-8.3i-${idSuffix}`,
          chapterId: 8,
          topicId: '8.3',
          topicTitle: 'Probability of combined events',
          tier: 'Extended',
          paperType: 'Non-Calculator',
          marks: 3,
          sourceRef: 'Paper 2 Non-Calc · Topic 8.3',
          question: `Events $A$ and $B$ are independent, with $P(A) = ${pA}$ and $P(B) = ${pB}$. What is $P(A \\cup B)$?`,
          questionType: 'mcq',
          options,
          correctAnswer: formatDec(pUnion),
          markScheme: [
            { code: 'M1', detail: `Independent events: $P(A \\cap B) = ${pA} \\times ${pB} = ${pBoth}$` },
            { code: 'M1', detail: `$P(A \\cup B) = ${pA} + ${pB} - ${pBoth}$` },
            { code: 'A1', detail: `$${pUnion}$` },
          ],
          fullSolution: `Because $A$ and $B$ are independent, $P(A \\cap B) = ${pA} \\times ${pB} = ${pBoth}$. Using the general addition rule gives $P(A \\cup B) = ${pA} + ${pB} - ${pBoth} = ${pUnion}$.`,
        },
      };
    },
  },

  // 8.4 Conditional probability without replacement (Text - Extended Calc)
  {
    key: 'ch8-prob-conditional',
    chapterId: 8,
    topicId: '8.4',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const red = randInt(rng, 4, 7);
      const blue = randInt(rng, 3, 6);
      const total = red + blue;
      const ans = formatFraction(red * (red - 1), total * (total - 1));
      const dec = (red * (red - 1)) / (total * (total - 1));
      return {
        signature: `8.4-cond:${red}:${blue}`,
        question: {
          id: `gen-8.4-${idSuffix}`,
          chapterId: 8,
          topicId: '8.4',
          topicTitle: 'Conditional probability',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 3,
          sourceRef: 'Paper 4 Calc · Topic 8.4',
          question: `A box holds $${red}$ red and $${blue}$ blue beads. Two beads are taken at random WITHOUT replacement. Find the probability that both beads are red (enter as a simplified fraction a/b).`,
          questionType: 'text',
          correctAnswer: ans,
          acceptedAnswers: [ans],
          numericAnswer: dec,
          tolerance: 0.0005,
          markScheme: [
            { code: 'M1', detail: `$\\frac{${red}}{${total}} \\times \\frac{${red - 1}}{${total - 1}}$` },
            { code: 'A1', detail: `$${ans}$` },
          ],
          fullSolution: `On the first draw $P(\\text{Red}) = \\frac{${red}}{${total}}$. Without replacement, there are $${red - 1}$ red left out of $${total - 1}$: $\\frac{${red}}{${total}} \\times \\frac{${red - 1}}{${total - 1}} = ${ans}$.`,
        },
      };
    },
  },

  // 9.3 Reverse mean (Numeric - Core Non-Calc)
  {
    key: 'ch9-mean-reverse',
    chapterId: 9,
    topicId: '9.3',
    tier: 'Core',
    paperType: 'Non-Calculator',
    build: (rng, idSuffix) => {
      const mean = randInt(rng, 12, 22);
      const n1 = mean - randInt(rng, 2, 5);
      const n2 = mean - 1;
      const n3 = mean + randInt(rng, 2, 5);
      const missing = mean * 4 - (n1 + n2 + n3);
      return {
        signature: `9.3-mean:${mean}:${n1}:${n2}:${n3}`,
        question: {
          id: `gen-9.3-${idSuffix}`,
          chapterId: 9,
          topicId: '9.3',
          topicTitle: 'Averages and measures of spread',
          tier: 'Core',
          paperType: 'Non-Calculator',
          marks: 2,
          sourceRef: 'Paper 1 Non-Calc · Topic 9.3',
          question: `The mean of $4$ numbers is $${mean}$. Three of the numbers are $${n1}$, $${n2}$, and $${n3}$. What is the fourth number?`,
          questionType: 'numeric',
          correctAnswer: String(missing),
          numericAnswer: missing,
          tolerance: 0,
          markScheme: [
            { code: 'M1', detail: `Total sum $= 4 \\times ${mean} = ${4 * mean}$` },
            { code: 'A1', detail: `$${4 * mean} - (${n1} + ${n2} + ${n3}) = ${missing}$` },
          ],
          fullSolution: `The total of all $4$ numbers is $4 \\times ${mean} = ${4 * mean}$. Subtract the known three ($${n1 + n2 + n3}$) to obtain $${missing}$.`,
        },
      };
    },
  },

  // 9.4 Pie chart angle (MCQ - Core Calc)
  {
    key: 'ch9-pie-mcq',
    chapterId: 9,
    topicId: '9.4',
    tier: 'Core',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const totals: Array<[number, number]> = [
        [90, 4],
        [72, 5],
        [60, 6],
        [45, 8],
        [40, 9],
        [36, 10],
      ];
      const [total, degPerItem] = pick(rng, totals);
      const freq = randInt(rng, 7, Math.floor(total / 2));
      const angle = freq * degPerItem;
      const options = buildUniqueMcqOptions(rng, `${angle}°`, [
        `${Math.round((freq / total) * 100)}°`,
        `${angle + degPerItem * 2}°`,
        `${360 - angle}°`,
      ]);
      return {
        signature: `9.4-pie:${total}:${freq}`,
        question: {
          id: `gen-9.4-${idSuffix}`,
          chapterId: 9,
          topicId: '9.4',
          topicTitle: 'Statistical charts and diagrams',
          tier: 'Core',
          paperType: 'Calculator',
          marks: 2,
          sourceRef: 'Paper 3 Calc · Topic 9.4',
          question: `A survey records $${total}$ students in total, and $${freq}$ of them travel by bus. What sector angle represents bus travel on a pie chart?`,
          questionType: 'mcq',
          options,
          correctAnswer: `${angle}°`,
          markScheme: [
            { code: 'M1', detail: `$\\frac{${freq}}{${total}} \\times 360^\\circ$` },
            { code: 'A1', detail: `$${angle}^\\circ$` },
          ],
          fullSolution: `Each student corresponds to $\\frac{360^\\circ}{${total}} = ${degPerItem}^\\circ$. Multiply by $${freq}$ to get $${angle}^\\circ$.`,
        },
      };
    },
  },

  // 9.7 Histograms frequency density (Numeric - Extended Calc)
  {
    key: 'ch9-histogram-fd',
    chapterId: 9,
    topicId: '9.7',
    tier: 'Extended',
    paperType: 'Calculator',
    build: (rng, idSuffix) => {
      const start = pick(rng, [20, 30, 40, 50]);
      const width = pick(rng, [10, 15, 20, 25]);
      const end = start + width;
      const fd = pick(rng, [1.4, 1.6, 1.8, 2.2, 2.4, 2.8, 3.2, 3.6]);
      const freq = Math.round(fd * width);
      const exactFd = Number((freq / width).toFixed(2));
      return {
        signature: `9.7-fd:${start}:${width}:${freq}`,
        question: {
          id: `gen-9.7-${idSuffix}`,
          chapterId: 9,
          topicId: '9.7',
          topicTitle: 'Histograms',
          tier: 'Extended',
          paperType: 'Calculator',
          marks: 2,
          sourceRef: 'Paper 4 Calc · Topic 9.7',
          question: `In a histogram, the class interval $${start} < w \\le ${end}$ contains $${freq}$ items. Calculate the frequency density of this bar.`,
          questionType: 'numeric',
          correctAnswer: String(exactFd),
          numericAnswer: exactFd,
          tolerance: 0.01,
          markScheme: [
            { code: 'M1', detail: `Class width $= ${end} - ${start} = ${width}$; $\\text{FD} = ${freq} \\div ${width}$` },
            { code: 'A1', detail: `$${exactFd}$` },
          ],
          fullSolution: `Class width $= ${end} - ${start} = ${width}$. Frequency density $= \\frac{${freq}}{${width}} = ${exactFd}$.`,
        },
      };
    },
  },
];

function selectMatchingTemplates(options: MockGenerationOptions): TemplateDef[] {
  switch (options.mode) {
    case 'mock-core-p1':
      return TEMPLATES.filter((t) => t.tier === 'Core' && t.paperType === 'Non-Calculator');
    case 'mock-core-p3':
      return TEMPLATES.filter((t) => t.tier === 'Core' && t.paperType === 'Calculator');
    case 'mock-ext-p2':
      return TEMPLATES.filter((t) => t.paperType === 'Non-Calculator');
    case 'mock-ext-p4':
      return TEMPLATES.filter((t) => t.paperType === 'Calculator');
    case 'topical': {
      if (options.topicId) {
        const exact = TEMPLATES.filter((t) => t.topicId === options.topicId);
        if (exact.length > 0) return exact;
        const fallbackCh = Number(options.topicId.split('.')[0]) || 1;
        const chMatches = TEMPLATES.filter((t) => t.chapterId === fallbackCh);
        if (chMatches.length > 0) return chMatches;
      }
      if (typeof options.chapterId === 'number') {
        const chMatches = TEMPLATES.filter((t) => t.chapterId === options.chapterId);
        if (chMatches.length > 0) return chMatches;
      }
      return TEMPLATES;
    }
    case 'mock-full':
    default:
      return TEMPLATES;
  }
}

export function generateMockExamQuestions(
  options: MockGenerationOptions
): GeneratedQuestionResult {
  const pool = selectMatchingTemplates(options);
  const seedKey = `${options.mode}|${options.chapterId ?? 'all'}|${options.topicId ?? ''}|attempt:${options.attemptNumber}`;
  const rng = createRng(hashSeed(seedKey));

  // Target counts balanced by mode and diversity of question types
  const desiredCount =
    options.mode === 'mock-full'
      ? 12
      : options.mode === 'topical'
        ? Math.max(4, Math.min(8, pool.length * 2))
        : 8;

  const orderedTemplates: TemplateDef[] = [];
  let roundPool = shuffle(rng, pool);
  while (orderedTemplates.length < desiredCount) {
    if (roundPool.length === 0) {
      roundPool = shuffle(rng, pool);
    }
    const nextTpl = roundPool.shift();
    if (nextTpl) orderedTemplates.push(nextTpl);
  }

  // Ensure multi-type representation whenever pool supports MCQ + numeric/text
  const hasMcqInPool = pool.some((t) => t.key.includes('mcq'));
  if (hasMcqInPool && !orderedTemplates.some((t) => t.key.includes('mcq'))) {
    const mcqTpl = pool.find((t) => t.key.includes('mcq'));
    if (mcqTpl) orderedTemplates[orderedTemplates.length - 1] = mcqTpl;
  }

  const usedInPaper = new Set<string>();
  const questions: PracticeQuestion[] = [];
  const signatures: string[] = [];

  orderedTemplates.forEach((tpl, idx) => {
    let chosen: GeneratedTemplateItem | null = null;
    for (let retry = 0; retry < 25; retry += 1) {
      const subSeed = hashSeed(`${seedKey}|slot:${idx}|tpl:${tpl.key}|try:${retry}`);
      const subRng = createRng(subSeed);
      const candidate = tpl.build(subRng, `a${options.attemptNumber}-q${idx + 1}`);
      const alreadyAvoided = options.avoidSignatures?.has(candidate.signature);
      const dupInSamePaper = usedInPaper.has(candidate.signature);
      if (!alreadyAvoided && !dupInSamePaper) {
        chosen = candidate;
        break;
      }
      if (!dupInSamePaper && !chosen) {
        chosen = candidate;
      }
    }

    if (chosen) {
      usedInPaper.add(chosen.signature);
      signatures.push(chosen.signature);
      questions.push(chosen.question);
    }
  });

  return { questions, signatures };
}
