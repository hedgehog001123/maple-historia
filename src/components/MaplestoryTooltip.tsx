// src/components/MaplestoryTooltip.tsx
import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { entityDatabase } from '../data/db';

interface TooltipProps {
  id: string;
  children?: React.ReactNode;
}

export const MaplestoryTooltip: React.FC<TooltipProps> = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = entityDatabase[id];

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip({ fallbackPlacements: ['top', 'bottom'] }),
      shift({ padding: 10 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  if (!data) {
    return <span>{children || id}</span>;
  }

  return (
    <>
<a
  ref={refs.setReference}
  {...getReferenceProps()}
  href={data.link}
  className="text-orange-600 font-bold underline decoration-dotted underline-offset-4 hover:text-orange-500 transition-colors inline-block mx-1"
>
  {children || data.name}
</a>

{isOpen && (
  <FloatingPortal>
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
      className="z-50 w-72 bg-white/95 backdrop-blur border-2 border-orange-400 text-gray-800 p-3 rounded-xl shadow-xl text-sm"
    >
      <div className="flex items-start gap-3">
        <img
          src={data.image}
          alt={data.name}
          className="w-14 h-14 object-contain bg-orange-50 rounded-lg p-1 border border-orange-200 shrink-0"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-orange-600 text-base">
              {data.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-700 border border-orange-300 rounded font-bold uppercase">
              {data.type}
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  </FloatingPortal>
)}
    </>
  );
};