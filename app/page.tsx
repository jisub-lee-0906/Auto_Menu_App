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
    // Add a satisfying subtle delay for effect
    setTimeout(() => {
      setMenu((prev) => generateMenu(prev || undefined, locked));
      setIsGenerating(false);
    }, 400);
  }, [locked]);

  const handleToggleLock = (key: keyof Menu) => {
    setLocked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRefreshItem = (key: keyof Menu) => {
    setMenu((prev) => {
      if (!prev) return null;
      // Temporarily lock everything else to just refresh one item
      // Actually generateMenu respects locks passed in. 
      // To refresh ONE item, we conceptually want to "keep everything else".
      // So we construe a temporary lock state where everything is TRUE except the target.

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
    const text = `[오늘의 급식] 🍚${menu.rice} 🍲${menu.soup} 🍖${menu.main} 🥗${menu.side1}, ${menu.side2} 🥬${menu.kimchi} 🍪${menu.dessert}`;
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast here. For now alert is simple but let's try to avoid native alert if possible in future.
      // Keeping alert for simplicity request.
      alert('식단이 복사되었습니다! 📋');
    });
  };

  const saveAsImage = async () => {
    if (!trayRef.current || !menu) return;

    try {
      const canvas = await html2canvas(trayRef.current, {
        scale: 2, // High resolution
        backgroundColor: '#f5f5f4', // Match bg-stone-100/50 context
        logging: false,
        useCORS: true,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `오늘의급식_${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to save image:', err);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#3182F6] selection:text-white pb-32">

      {/* Header - Toss Style: Simple, Big, Bold */}
      <header className="pt-10 pb-4 px-6 max-w-2xl mx-auto w-full">
        <h1 className="text-[32px] font-bold tracking-tighter text-[#191F28] leading-tight">
          오늘의 급식
        </h1>
        <p className="text-[#8B95A1] text-lg mt-1 tracking-tight">
          영양은 든든하게, 식단은 똑똑하게.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-5 flex flex-col">
        {menu ? (
          <div ref={trayRef} className="w-full flex justify-center py-2">
            <MenuTray
              menu={menu}
              lockedState={locked}
              onToggleLock={handleToggleLock}
              onRefreshItem={handleRefreshItem}
            />
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-[#B0B8C1] space-y-4">
            {/* Simple Pulse Loader */}
            <div className="w-10 h-10 rounded-full bg-[#E5E8EB] animate-pulse"></div>
            <p className="font-medium">맛있는 메뉴를 준비하고 있어요</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <div className="inline-flex items-center justify-center gap-3 text-[12px] font-medium text-[#8B95A1] tracking-tight">
          <span className="flex items-center gap-1.5">
            <span className="uppercase text-[10px] font-bold text-[#B0B8C1] tracking-wider">Dev</span>
            <span className="text-[#4E5968]">이지섭</span>
          </span>
          <span className="w-0.5 h-2.5 bg-[#E5E8EB] rounded-full"></span>
          <span className="flex items-center gap-1.5">
            <span className="uppercase text-[10px] font-bold text-[#B0B8C1] tracking-wider">Data</span>
            <span className="text-[#4E5968]">문채영</span>
          </span>
        </div>
      </footer>

      {/* Floating Action Bar - Toss Style: Bottom Fixed, High Contrast */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <div className="max-w-md mx-auto flex items-stretch gap-3 pointer-events-auto transition-transform duration-500 ease-out transform translate-y-0">

          {/* Generate Button (Main) */}
          <button
            onClick={handleGenerateValues}
            disabled={isGenerating}
            className={`
                 flex-grow flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] 
                 text-white font-bold text-[17px] shadow-lg shadow-blue-500/30
                 transition-all active:scale-[0.96] duration-200
                 ${isGenerating ? 'bg-[#B0B8C1] cursor-not-allowed' : 'bg-[#3182F6] hover:bg-[#2C75DE]'}
              `}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white/90" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>생성 중</span>
              </span>
            ) : (
              <span>전체 다시 짜기</span>
            )}
          </button>

          {/* Secondary Actions (Icon Group) */}
          <div className="flex bg-white rounded-[20px] shadow-lg shadow-black/5 items-center p-1.5 gap-1">
            <button
              onClick={copyToClipboard}
              className="w-12 h-full flex items-center justify-center rounded-[16px] hover:bg-[#F2F4F6] text-[#4E5968] transition-colors"
              title="텍스트로 복사"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            </button>
            <div className="w-px h-4 bg-[#E5E8EB]"></div>
            <button
              onClick={saveAsImage}
              className="w-12 h-full flex items-center justify-center rounded-[16px] hover:bg-[#F2F4F6] text-[#4E5968] transition-colors"
              title="이미지로 저장"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
