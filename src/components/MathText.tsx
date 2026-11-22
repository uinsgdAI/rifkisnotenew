import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathInlineProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const KaTeXFormula: React.FC<MathInlineProps> = ({
  latex,
  displayMode = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      katex.render(latex, containerRef.current, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      if (containerRef.current) {
        containerRef.current.textContent = latex;
      }
    }
  }, [latex, displayMode]);

  return <span ref={containerRef} className={className} />;
};

interface Segment {
  type: 'text' | 'inline' | 'display' | 'code' | 'bold' | 'italic';
  content: string;
}

function tokenizeMathText(input: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;
  let textBuf = '';

  const flushText = () => {
    if (textBuf.length > 0) {
      segments.push({ type: 'text', content: textBuf });
      textBuf = '';
    }
  };

  while (i < input.length) {
    // Check inline code `...`
    if (input[i] === '`') {
      const end = input.indexOf('`', i + 1);
      if (end !== -1) {
        flushText();
        segments.push({ type: 'code', content: input.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    // Check bold **...**
    if (input[i] === '*' && input[i + 1] === '*') {
      const end = input.indexOf('**', i + 2);
      if (end !== -1) {
        const inner = input.slice(i + 2, end);
        if (inner.length > 0 && !inner.startsWith(' ') && !inner.endsWith(' ')) {
          flushText();
          segments.push({ type: 'bold', content: inner });
          i = end + 2;
          continue;
        }
      }
    }

    // Check italic *...*
    if (input[i] === '*' && input[i + 1] !== '*') {
      const end = input.indexOf('*', i + 1);
      if (end !== -1 && input[end + 1] !== '*') {
        const inner = input.slice(i + 1, end);
        if (inner.length > 0 && !inner.startsWith(' ') && !inner.endsWith(' ')) {
          flushText();
          segments.push({ type: 'italic', content: inner });
          i = end + 1;
          continue;
        }
      }
    }

    // Check display math $$...$$
    if (input[i] === '$' && input[i + 1] === '$') {
      const end = input.indexOf('$$', i + 2);
      if (end !== -1) {
        flushText();
        segments.push({ type: 'display', content: input.slice(i + 2, end).trim() });
        i = end + 2;
        continue;
      }
    }

    // Check inline math $...$
    if (input[i] === '$' && (i === 0 || input[i - 1] !== '\\')) {
      // Find matching unescaped $
      let end = -1;
      for (let j = i + 1; j < input.length; j++) {
        if (input[j] === '$' && input[j - 1] !== '\\') {
          end = j;
          break;
        }
      }
      if (end !== -1) {
        const inner = input.slice(i + 1, end);
        if (inner.length > 0 && !inner.startsWith(' ')) {
          flushText();
          segments.push({ type: 'inline', content: inner });
          i = end + 1;
          continue;
        }
      }
    }

    textBuf += input[i];
    i++;
  }

  flushText();
  return segments;
}

interface MathTextProps {
  text: string;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = tokenizeMathText(text);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'display') {
          return (
            <KaTeXFormula
              key={idx}
              latex={seg.content}
              displayMode={true}
              className="block my-2"
            />
          );
        }
        if (seg.type === 'inline') {
          return <KaTeXFormula key={idx} latex={seg.content} displayMode={false} />;
        }
        if (seg.type === 'bold') {
          return (
            <strong key={idx} className="font-semibold text-slate-900">
              <MathText text={seg.content} />
            </strong>
          );
        }
        if (seg.type === 'italic') {
          return (
            <em key={idx} className="italic">
              <MathText text={seg.content} />
            </em>
          );
        }
        if (seg.type === 'code') {
          return (
            <span
              key={idx}
              className="font-mono text-[0.9em] font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded"
            >
              {seg.content}
            </span>
          );
        }
        return <React.Fragment key={idx}>{seg.content}</React.Fragment>;
      })}
    </span>
  );
};
