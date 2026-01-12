'use client';

import React from 'react';

interface MenuSlotProps {
    title: string;
    menuItem: string;
    isLocked: boolean;
    onToggleLock: () => void;
    onRefresh: () => void;
    bgColor?: string; // Optional specific color for the slot category
}

export default function MenuSlot({
    title,
    menuItem,
    isLocked,
    onToggleLock,
    onRefresh,
    bgColor = 'bg-white',
}: MenuSlotProps) {
    return (
        <div className={`relative flex flex-col items-center justify-center p-4 rounded-xl shadow-md border-2 transition-all duration-300 ${isLocked ? 'border-red-400 bg-gray-50' : 'border-gray-200 ' + bgColor} hover:shadow-lg min-h-[160px]`}>

            {/* Category Title */}
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</h3>

            {/* Menu Item Name */}
            <p className={`text-xl font-extrabold text-gray-800 text-center break-keep transition-all ${isLocked ? 'text-gray-600' : ''}`}>
                {menuItem || '...'}
            </p>

            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-2">
                {/* Refresh Button (Only show if not locked) */}
                {!isLocked && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRefresh();
                        }}
                        className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-blue-500 transition-colors"
                        title="이 메뉴만 바꾸기"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
                        </svg>
                    </button>
                )}

                {/* Lock Toggle */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock();
                    }}
                    className={`p-1.5 rounded-full transition-colors ${isLocked ? 'text-red-500 bg-red-100 hover:bg-red-200' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'}`}
                    title={isLocked ? '잠금 해제' : '고정하기'}
                >
                    {isLocked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
