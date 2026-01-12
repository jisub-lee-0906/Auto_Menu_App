'use client';

import React from 'react';
import MenuSlot from './MenuSlot';
import { Menu, LockedState } from '@/lib/menuGenerator';

interface MenuTrayProps {
    menu: Menu;
    lockedState: LockedState;
    onToggleLock: (key: keyof Menu) => void;
    onRefreshItem: (key: keyof Menu) => void;
}

export default function MenuTray({
    menu,
    lockedState,
    onToggleLock,
    onRefreshItem
}: MenuTrayProps) {

    return (
        <div className="bg-slate-200 p-6 rounded-3xl shadow-xl border-4 border-slate-300/50 max-w-4xl w-full mx-auto">
            {/* 
        Tray Layout
        Let's assume a standard 2-row layout or a flexible grid appropriate for mobile 
        Row 1: Rice, Soup, Main
        Row 2: Side1, Side2, Kimchi
        Dessert can be separate or included?? 
        The PRD mentions 6 items + dessert = 7 items?
        PRD: Rice, Soup, Main, Side (1-2), Kimchi, Dessert.
        That's 6 or 7 slots.
        Let's do a responsive grid.
      */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                {/* Row 1 */}
                <MenuSlot
                    title="밥 (Rice)"
                    menuItem={menu.rice}
                    isLocked={lockedState.rice}
                    onToggleLock={() => onToggleLock('rice')}
                    onRefresh={() => onRefreshItem('rice')}
                    bgColor="bg-orange-50"
                />

                <MenuSlot
                    title="국 (Soup)"
                    menuItem={menu.soup}
                    isLocked={lockedState.soup}
                    onToggleLock={() => onToggleLock('soup')}
                    onRefresh={() => onRefreshItem('soup')}
                    bgColor="bg-yellow-50"
                />

                <MenuSlot
                    title="메인 (Main)"
                    menuItem={menu.main}
                    isLocked={lockedState.main}
                    onToggleLock={() => onToggleLock('main')}
                    onRefresh={() => onRefreshItem('main')}
                    bgColor="bg-red-50"
                />

                {/* Row 2 */}
                <MenuSlot
                    title="반찬 1"
                    menuItem={menu.side1}
                    isLocked={lockedState.side1}
                    onToggleLock={() => onToggleLock('side1')}
                    onRefresh={() => onRefreshItem('side1')}
                    bgColor="bg-green-50"
                />

                <MenuSlot
                    title="반찬 2"
                    menuItem={menu.side2}
                    isLocked={lockedState.side2}
                    onToggleLock={() => onToggleLock('side2')}
                    onRefresh={() => onRefreshItem('side2')}
                    bgColor="bg-green-50"
                />

                <MenuSlot
                    title="김치"
                    menuItem={menu.kimchi}
                    isLocked={lockedState.kimchi}
                    onToggleLock={() => onToggleLock('kimchi')}
                    onRefresh={() => onRefreshItem('kimchi')}
                    bgColor="bg-red-50/50"
                />

            </div>

            {/* Dessert Slot - Full Width or centered? */}
            <div className="mt-4 max-w-xs mx-auto">
                <MenuSlot
                    title="후식 (Dessert)"
                    menuItem={menu.dessert}
                    isLocked={lockedState.dessert}
                    onToggleLock={() => onToggleLock('dessert')}
                    onRefresh={() => onRefreshItem('dessert')}
                    bgColor="bg-purple-50"
                />
            </div>
        </div>
    );
}
