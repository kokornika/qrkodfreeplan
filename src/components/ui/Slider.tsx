import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/utils';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, min, max, step, onChange, ...props }, ref) => {
    return (
      <div className="relative pt-8 pb-8"> {/* Added padding for value display and markers */}
        {/* Current value display - now floating above thumb */}
        <div 
          className="absolute -top-2 transform -translate-x-1/2 z-30"
          style={{ 
            left: `${((value - min) / (max - min)) * 100}%`,
            transition: 'left 0.1s ease-out'
          }}
        >
          <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 shadow-sm whitespace-nowrap">
            {value}
          </div>
        </div>

        <SliderPrimitive.Root
          ref={ref}
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={([newValue]) => onChange(newValue)}
          {...props}
        >
          <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
            <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "block w-4 h-4 bg-white rounded-full border-2 border-blue-500", // Reduced thumb size
              "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
              "transition-colors duration-200 shadow-md z-20"
            )}
          />
        </SliderPrimitive.Root>

        {/* Value markers - only min and max */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-2 bg-gray-300" />
            <span className="text-xs text-gray-600 mt-1">{min}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-2 bg-gray-300" />
            <span className="text-xs text-gray-600 mt-1">{max}</span>
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };