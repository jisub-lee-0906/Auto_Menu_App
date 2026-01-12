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
        <div className="w-full max-w-2xl mx-auto space-y-4">

            {/* Grid Layout - No Container, just floating cards */}
            <div className="space-y-3">

                {/* Top Row: Main Dish & Sides */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <MenuSlot
                        title="메인 반찬"
                        subtitle="MAIN"
                        menuItem={menu.main}
                        isLocked={lockedState.main}
                        onToggleLock={() => onToggleLock('main')}
                        onRefresh={() => onRefreshItem('main')}
                        className="lg:col-span-1 min-h-[140px]"
                    />
                    <MenuSlot
                        title="반찬 1"
                        subtitle="SIDE"
                        menuItem={menu.side1}
                        isLocked={lockedState.side1}
                        onToggleLock={() => onToggleLock('side1')}
                        onRefresh={() => onRefreshItem('side1')}
                        className="min-h-[140px]"
                    />
                    <MenuSlot
                        title="반찬 2"
                        subtitle="SIDE"
                        menuItem={menu.side2}
                        isLocked={lockedState.side2}
                        onToggleLock={() => onToggleLock('side2')}
                        onRefresh={() => onRefreshItem('side2')}
                        className="min-h-[140px]"
                    />
                    <MenuSlot
                        title="김치"
                        subtitle="KIMCHI"
                        menuItem={menu.kimchi}
                        isLocked={lockedState.kimchi}
                        onToggleLock={() => onToggleLock('kimchi')}
                        onRefresh={() => onRefreshItem('kimchi')}
                        className="min-h-[140px]"
                    />
                </div>

                {/* Bottom Row: Key Staples (Rice & Soup) */}
                <div className="grid grid-cols-2 gap-3">
                    <MenuSlot
                        title="밥"
                        subtitle="RICE"
                        menuItem={menu.rice}
                        isLocked={lockedState.rice}
                        onToggleLock={() => onToggleLock('rice')}
                        onRefresh={() => onRefreshItem('rice')}
                        className="min-h-[150px]"
                    />
                    <MenuSlot
                        title="국/찌개"
                        subtitle="SOUP"
                        menuItem={menu.soup}
                        isLocked={lockedState.soup}
                        onToggleLock={() => onToggleLock('soup')}
                        onRefresh={() => onRefreshItem('soup')}
                        className="min-h-[150px]"
                    />
                </div>
            </div>

            {/* Dessert - distinct subtle separation */}
            <div className="mx-auto max-w-sm pt-2">
                <MenuSlot
                    title="후식"
                    subtitle="DESSERT"
                    menuItem={menu.dessert}
                    isLocked={lockedState.dessert}
                    onToggleLock={() => onToggleLock('dessert')}
                    onRefresh={() => onRefreshItem('dessert')}
                    className="min-h-[100px] bg-gradient-to-br from-white to-[#F9FAFB]"
                />
            </div>
        </div>
    );
}
