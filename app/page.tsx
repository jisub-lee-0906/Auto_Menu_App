'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { generateMenu, Menu, LockedState } from '@/lib/menuGenerator';
import MenuTray from '@/components/MenuTray';
import html2canvas from 'html2canvas';

const INITIAL_LOCK_STATE: LockedState = {
  rice: false,
  soup: false,
  main: false,
  side1: false,
  side2: false,
  kimchi: false,
  dessert: false,
};

export default function Home() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [locked, setLocked] = useState<LockedState>(INITIAL_LOCK_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);

  // Initial generation
  useEffect(() => {
    setMenu(generateMenu());
  }, []);

  const handleGenerateValues = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setMenu((prev) => generateMenu(prev || undefined, locked));
      setIsGenerating(false);
    }, 300);
  }, [locked]);

  const handleToggleLock = (key: keyof Menu) => {
    setLocked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRefreshItem = (key: keyof Menu) => {
    setMenu((prev) => {
      if (!prev) return null;
      const tempLocked: LockedState = {
        rice: true,
        soup: true,
        main: true,
        side1: true,
        side2: true,
        kimchi: true,
        dessert: true,
        [key]: false,
      };
      return generateMenu(prev, tempLocked);
    });
  };

  const copyToClipboard = () => {
    if (!menu) return;
    const text = `[오늘의 점심] ${menu.rice}, ${menu.soup}, ${menu.main}, ${menu.side1}, ${menu.side2}, ${menu.kimchi}, ${menu.dessert}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('식단이 복사되었습니다! 📋');
    });
  };

  const saveAsImage = async () => {
    if (!trayRef.current || !menu) return;

    try {
      const canvas = await html2canvas(trayRef.current, {
        scale: 2, // High resolution
        backgroundColor: '#f1f5f9', // slate-100 logic
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `오늘의급식_${new Date().toLocaleDateString().replace(/\\./g, '').replace(/ /g, '-')}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to save image:', err);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-2">
          <span>🍱</span> 오늘의 급식
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 gap-8 mb-32">

        <div className="text-center space-y-2 mb-2">
          <p className="text-gray-500">
            오늘 뭐 먹지? 고민될 때 버튼 한 번으로 해결하세요! (v1.0)
          </p>
        </div>

        {/* The Tray */}
        {menu ? (
          <div ref={trayRef} className="p-4 rounded-3xl bg-slate-100">
            {/* Wrapper for capture to include background if needed, or just capture Tray directly */}
            <MenuTray
              menu={menu}
              lockedState={locked}
              onToggleLock={handleToggleLock}
              onRefreshItem={handleRefreshItem}
            />
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center text-gray-400">
            메뉴를 불러오는 중입니다...
          </div>
        )}

      </main>

      {/* Action Controls */}
      <div className="fixed bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-4 w-full pointer-events-none">
        {/* Blocks pointer events on container but allows on buttons */}

        {/* Main Generate Button */}
        <button
          onClick={handleGenerateValues}
          disabled={isGenerating}
          className={`
              pointer-events-auto
              shadow-2xl text-white text-xl font-bold py-4 px-12 rounded-full transform transition-all 
              ${isGenerating ? 'bg-gray-400 scale-95' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'}
              flex items-center gap-3 ring-4 ring-white/50
            `}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              생성 중...
            </>
          ) : (
            <>
              <span>🎲</span> 전체 다시 짜기
            </>
          )}
        </button>

        {/* Secondary Actions */}
        <div className="pointer-events-auto flex gap-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-100">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 font-medium"
          >
            📋 텍스트 복사
          </button>
          <div className="w-px bg-gray-300 my-1"></div>
          <button
            onClick={saveAsImage}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 font-medium"
          >
            📷 이미지 저장
          </button>
        </div>
      </div>

    </div>
  );
}
