import React, { useState, useEffect, useRef } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';

interface DateRangePickerProps {
  startDate: string | null;
  endDate: string | null;
  onChange: (start: string | null, end: string | null) => void;
}

const formatDateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const PRESETS = [
  { label: 'All Data', getValue: () => ({ start: null, end: null }) },
  { label: 'Today', getValue: () => {
      const d = new Date();
      const str = formatDateLocal(d);
      return { start: str, end: str };
  } },
  { label: 'Yesterday', getValue: () => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      const str = formatDateLocal(d);
      return { start: str, end: str };
  } },
  { label: 'Last 7 days', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { start: formatDateLocal(start), end: formatDateLocal(end) };
  } },
  { label: 'Last 30 days', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return { start: formatDateLocal(start), end: formatDateLocal(end) };
  } },
  { label: 'This month', getValue: () => {
      const d = new Date();
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      return { start: formatDateLocal(start), end: formatDateLocal(end) };
  } },
  { label: 'Last month', getValue: () => {
      const d = new Date();
      const start = new Date(d.getFullYear(), d.getMonth() - 1, 1);
      const end = new Date(d.getFullYear(), d.getMonth(), 0);
      return { start: formatDateLocal(start), end: formatDateLocal(end) };
  } },
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  
  const [tempStart, setTempStart] = useState<string | null>(startDate);
  const [tempEnd, setTempEnd] = useState<string | null>(endDate);
  
  const [viewDate, setViewDate] = useState(() => {
    return startDate ? new Date(startDate) : new Date();
  });
  
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTempStart(startDate);
      setTempEnd(endDate);
      const matchingPreset = PRESETS.find(p => {
        const v = p.getValue();
        return v.start === startDate && v.end === endDate;
      });
      if (matchingPreset) {
        setActivePreset(matchingPreset.label);
        setIsCustom(false);
      } else if (!startDate && !endDate) {
        setActivePreset(null);
        setIsCustom(false);
      } else {
        setActivePreset('Custom Range');
        setIsCustom(true);
      }
      
      if (startDate) {
        setViewDate(new Date(startDate));
      }
    }
  }, [isOpen, startDate, endDate]);

  const handlePresetClick = (label: string, getValue: () => { start: string | null, end: string | null }) => {
    setActivePreset(label);
    setIsCustom(false);
    const { start, end } = getValue();
    setTempStart(start);
    setTempEnd(end);
    onChange(start, end);
    setIsOpen(false);
  };

  const formatDateLabel = (start: string | null, end: string | null) => {
    if (!start && !end) return 'All Data';
    const s = start ? new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    const e = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    return `${s} ~ ${e}`;
  };

  const renderMonth = (monthOffset: number) => {
    const targetDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthName = targetDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    return (
      <div className="flex-1 min-w-[260px]">
        <div className="flex items-center justify-between mb-4 px-2">
          <button 
            type="button"
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} 
            className="p-1 hover:bg-zinc-100 rounded-full text-zinc-500"
          >
            <MdChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-zinc-700">{monthName}</span>
            <span className="font-medium text-sm text-zinc-700">{year}</span>
          </div>
          <button 
            type="button"
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} 
            className="p-1 hover:bg-zinc-100 rounded-full text-zinc-500"
          >
            <MdChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-y-2 text-center mb-2 border-b border-zinc-200 pb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-xs font-medium text-zinc-400">{d}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-y-1">
          {days.map((dateObj, i) => {
            if (!dateObj) return <div key={`empty-${i}`} className="p-2"></div>;
            
            const dateStr = formatDateLocal(dateObj);
            const isStart = tempStart === dateStr;
            const isEnd = tempEnd === dateStr;
            const isBetween = tempStart && tempEnd && dateStr > tempStart && dateStr < tempEnd;
            const isSelected = isStart || isEnd;
            
            let bgClass = "hover:bg-zinc-100 text-zinc-600";
            if (isStart && isEnd) {
              bgClass = "bg-[#1B2642] text-white rounded-full";
            } else if (isStart) {
              bgClass = "bg-[#1B2642] text-white rounded-l-full";
            } else if (isEnd) {
              bgClass = "bg-[#1B2642] text-white rounded-r-full";
            } else if (isBetween) {
              bgClass = "bg-slate-100 text-zinc-800";
            }

            return (
              <button
                type="button"
                key={dateStr}
                onClick={() => {
                  if (!tempStart || (tempStart && tempEnd)) {
                    setTempStart(dateStr);
                    setTempEnd(null);
                    setActivePreset('Custom Range');
                  } else {
                    if (dateStr < tempStart) {
                      setTempEnd(tempStart);
                      setTempStart(dateStr);
                    } else {
                      setTempEnd(dateStr);
                    }
                    onChange(tempStart > dateStr ? dateStr : tempStart, tempStart > dateStr ? tempStart : dateStr);
                    setIsOpen(false);
                  }
                }}
                className={`text-sm py-1.5 w-full flex items-center justify-center transition-colors ${bgClass}`}
              >
                <span className={`flex items-center justify-center w-8 h-8 ${isSelected ? 'rounded-full bg-[#1B2642] text-white' : 'rounded-full hover:bg-zinc-200'}`}>
                   {dateObj.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null, null);
    setTempStart(null);
    setTempEnd(null);
    setActivePreset(null);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full max-w-sm" ref={popoverRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-3 py-2 text-sm text-zinc-700 bg-white border ${isOpen || (startDate && endDate) ? 'border-[#1B2642] ring-1 ring-[#1B2642]' : 'border-zinc-300'} rounded-lg shadow-sm cursor-pointer hover:border-[#1B2642] transition-all duration-200`}
      >
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-[#1B2642]" />
          <span className="font-medium text-zinc-600">{formatDateLabel(startDate, endDate)}</span>
        </div>
        
        {((startDate || endDate) && activePreset === 'Custom Range') && (
          <button 
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-zinc-100 rounded-full text-[#1B2642] ml-2"
          >
            <MdClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 lg:right-0 lg:left-auto z-50 mt-2 bg-white rounded-xl shadow-xl border border-zinc-200 flex flex-col md:flex-row overflow-hidden min-w-max">
          
          <div className="w-full md:w-40 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col py-3">
            {PRESETS.map((preset) => {
              const isActive = activePreset === preset.label;
              return (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.label, preset.getValue)}
                  className={`px-4 py-2.5 text-sm text-left transition-colors relative ${isActive ? 'text-[#1B2642] bg-slate-100' : 'text-zinc-600 hover:bg-zinc-50'}`}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1B2642]"></div>}
                  {preset.label}
                </button>
              );
            })}
            
            {/* Custom Range Option */}
            <button
              type="button"
              onClick={() => {
                setActivePreset('Custom Range');
                setIsCustom(true);
              }}
              className={`px-4 py-2.5 text-sm text-left transition-colors relative ${isCustom || activePreset === 'Custom Range' ? 'text-[#1B2642] bg-slate-100' : 'text-zinc-600 hover:bg-zinc-50'}`}
            >
              {(isCustom || activePreset === 'Custom Range') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1B2642]"></div>}
              Custom Range
            </button>
          </div>

          {isCustom && (
            <div className="p-5 flex flex-col md:flex-row gap-8 bg-white">
              {renderMonth(0)}
              <div className="hidden md:block w-px bg-zinc-200"></div>
              {renderMonth(1)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
