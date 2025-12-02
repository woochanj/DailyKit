export interface KeyData {
    code: string;
    label: string;
    width?: number; // Default 1 unit
    height?: number; // Default 1 unit
    type?: 'modifier' | 'function' | 'alpha' | 'numeric' | 'control';
}

export interface KeyState {
    pressed: boolean;
    count: number;
    lastPressed: number;
    chatteringDetected: boolean;
}

export const F_ROW_MAIN: KeyData[][] = [
    [
        { code: 'Escape', label: 'Esc', type: 'function', width: 1 },
        { code: 'GAP', label: '', width: 1, type: 'control' }, // Standard 1u gap
        { code: 'F1', label: 'F1', type: 'function' },
        { code: 'F2', label: 'F2', type: 'function' },
        { code: 'F3', label: 'F3', type: 'function' },
        { code: 'F4', label: 'F4', type: 'function' },
        { code: 'GAP', label: '', width: 0.5, type: 'control' }, // Gap
        { code: 'F5', label: 'F5', type: 'function' },
        { code: 'F6', label: 'F6', type: 'function' },
        { code: 'F7', label: 'F7', type: 'function' },
        { code: 'F8', label: 'F8', type: 'function' },
        { code: 'GAP', label: '', width: 0.5, type: 'control' }, // Gap
        { code: 'F9', label: 'F9', type: 'function' },
        { code: 'F10', label: 'F10', type: 'function' },
        { code: 'F11', label: 'F11', type: 'function' },
        { code: 'F12', label: 'F12', type: 'function' },
    ]
];

export const F_ROW_NAV: KeyData[][] = [
    [
        { code: 'PrintScreen', label: 'PrtSc', type: 'control' },
        { code: 'ScrollLock', label: 'ScrLk', type: 'control' },
        { code: 'Pause', label: 'Pause', type: 'control' },
    ]
];

export const MAIN_BLOCK: KeyData[][] = [
    [
        { code: 'Backquote', label: '`', type: 'alpha' },
        { code: 'Digit1', label: '1', type: 'numeric' },
        { code: 'Digit2', label: '2', type: 'numeric' },
        { code: 'Digit3', label: '3', type: 'numeric' },
        { code: 'Digit4', label: '4', type: 'numeric' },
        { code: 'Digit5', label: '5', type: 'numeric' },
        { code: 'Digit6', label: '6', type: 'numeric' },
        { code: 'Digit7', label: '7', type: 'numeric' },
        { code: 'Digit8', label: '8', type: 'numeric' },
        { code: 'Digit9', label: '9', type: 'numeric' },
        { code: 'Digit0', label: '0', type: 'numeric' },
        { code: 'Minus', label: '-', type: 'alpha' },
        { code: 'Equal', label: '=', type: 'alpha' },
        { code: 'Backspace', label: 'Backspace', width: 2, type: 'control' },
    ],
    [
        { code: 'Tab', label: 'Tab', width: 1.5, type: 'control' },
        { code: 'KeyQ', label: 'Q', type: 'alpha' },
        { code: 'KeyW', label: 'W', type: 'alpha' },
        { code: 'KeyE', label: 'E', type: 'alpha' },
        { code: 'KeyR', label: 'R', type: 'alpha' },
        { code: 'KeyT', label: 'T', type: 'alpha' },
        { code: 'KeyY', label: 'Y', type: 'alpha' },
        { code: 'KeyU', label: 'U', type: 'alpha' },
        { code: 'KeyI', label: 'I', type: 'alpha' },
        { code: 'KeyO', label: 'O', type: 'alpha' },
        { code: 'KeyP', label: 'P', type: 'alpha' },
        { code: 'BracketLeft', label: '[', type: 'alpha' },
        { code: 'BracketRight', label: ']', type: 'alpha' },
        { code: 'Backslash', label: '\\', width: 1.5, type: 'alpha' },
    ],
    [
        { code: 'CapsLock', label: 'Caps', width: 1.75, type: 'control' },
        { code: 'KeyA', label: 'A', type: 'alpha' },
        { code: 'KeyS', label: 'S', type: 'alpha' },
        { code: 'KeyD', label: 'D', type: 'alpha' },
        { code: 'KeyF', label: 'F', type: 'alpha' },
        { code: 'KeyG', label: 'G', type: 'alpha' },
        { code: 'KeyH', label: 'H', type: 'alpha' },
        { code: 'KeyJ', label: 'J', type: 'alpha' },
        { code: 'KeyK', label: 'K', type: 'alpha' },
        { code: 'KeyL', label: 'L', type: 'alpha' },
        { code: 'Semicolon', label: ';', type: 'alpha' },
        { code: 'Quote', label: "'", type: 'alpha' },
        { code: 'Enter', label: 'Enter', width: 2.25, type: 'control' },
    ],
    [
        { code: 'ShiftLeft', label: 'Shift', width: 2.25, type: 'modifier' },
        { code: 'KeyZ', label: 'Z', type: 'alpha' },
        { code: 'KeyX', label: 'X', type: 'alpha' },
        { code: 'KeyC', label: 'C', type: 'alpha' },
        { code: 'KeyV', label: 'V', type: 'alpha' },
        { code: 'KeyB', label: 'B', type: 'alpha' },
        { code: 'KeyN', label: 'N', type: 'alpha' },
        { code: 'KeyM', label: 'M', type: 'alpha' },
        { code: 'Comma', label: ',', type: 'alpha' },
        { code: 'Period', label: '.', type: 'alpha' },
        { code: 'Slash', label: '/', type: 'alpha' },
        { code: 'ShiftRight', label: 'Shift', width: 2.75, type: 'modifier' },
    ],
    [
        { code: 'ControlLeft', label: 'Ctrl', width: 1.25, type: 'modifier' },
        { code: 'MetaLeft', label: 'Win', width: 1.25, type: 'modifier' },
        { code: 'AltLeft', label: 'Alt', width: 1.25, type: 'modifier' },
        { code: 'Space', label: 'Space', width: 6.25, type: 'alpha' },
        { code: 'AltRight', label: 'Alt', width: 1.25, type: 'modifier' },
        { code: 'MetaRight', label: 'Win', width: 1.25, type: 'modifier' },
        { code: 'ContextMenu', label: 'Menu', width: 1.25, type: 'control' },
        { code: 'ControlRight', label: 'Ctrl', width: 1.25, type: 'modifier' },
    ]
];

export const NAV_BLOCK: KeyData[][] = [
    [
        { code: 'Insert', label: 'Ins', type: 'control' },
        { code: 'Home', label: 'Home', type: 'control' },
        { code: 'PageUp', label: 'PgUp', type: 'control' },
    ],
    [
        { code: 'Delete', label: 'Del', type: 'control' },
        { code: 'End', label: 'End', type: 'control' },
        { code: 'PageDown', label: 'PgDn', type: 'control' },
    ],
    [
        { code: 'GAP', label: '', type: 'control', width: 1 }, // Empty row for spacing
    ],
    [
        { code: 'GAP', label: '', type: 'control' },
        { code: 'ArrowUp', label: '↑', type: 'control' },
        { code: 'GAP', label: '', type: 'control' },
    ],
    [
        { code: 'ArrowLeft', label: '←', type: 'control' },
        { code: 'ArrowDown', label: '↓', type: 'control' },
        { code: 'ArrowRight', label: '→', type: 'control' },
    ]
];

export const NUM_BLOCK: KeyData[][] = [
    [
        { code: 'NumLock', label: 'Num', type: 'control' },
        { code: 'NumpadDivide', label: '/', type: 'numeric' },
        { code: 'NumpadMultiply', label: '*', type: 'numeric' },
        { code: 'NumpadSubtract', label: '-', type: 'numeric' },
    ],
    [
        { code: 'Numpad7', label: '7', type: 'numeric' },
        { code: 'Numpad8', label: '8', type: 'numeric' },
        { code: 'Numpad9', label: '9', type: 'numeric' },
        { code: 'NumpadAdd', label: '+', type: 'numeric', height: 2 },
    ],
    [
        { code: 'Numpad4', label: '4', type: 'numeric' },
        { code: 'Numpad5', label: '5', type: 'numeric' },
        { code: 'Numpad6', label: '6', type: 'numeric' },
        // + continues here
    ],
    [
        { code: 'Numpad1', label: '1', type: 'numeric' },
        { code: 'Numpad2', label: '2', type: 'numeric' },
        { code: 'Numpad3', label: '3', type: 'numeric' },
        { code: 'NumpadEnter', label: 'Ent', type: 'control', height: 2 },
    ],
    [
        { code: 'Numpad0', label: '0', type: 'numeric', width: 2 },
        { code: 'NumpadDecimal', label: '.', type: 'numeric' },
        // Ent continues here
    ]
];

// 75% Layout Blocks
export const F_BLOCK_75: KeyData[][] = [
    [
        { code: 'Escape', label: 'Esc', type: 'function', width: 1 },
        { code: 'F1', label: 'F1', type: 'function' },
        { code: 'F2', label: 'F2', type: 'function' },
        { code: 'F3', label: 'F3', type: 'function' },
        { code: 'F4', label: 'F4', type: 'function' },
        { code: 'F5', label: 'F5', type: 'function' },
        { code: 'F6', label: 'F6', type: 'function' },
        { code: 'F7', label: 'F7', type: 'function' },
        { code: 'F8', label: 'F8', type: 'function' },
        { code: 'F9', label: 'F9', type: 'function' },
        { code: 'F10', label: 'F10', type: 'function' },
        { code: 'F11', label: 'F11', type: 'function' },
        { code: 'F12', label: 'F12', type: 'function' },
        { code: 'PrintScreen', label: 'PrtSc', type: 'control' },
        { code: 'Pause', label: 'Pause', type: 'control' },
        { code: 'Delete', label: 'Del', type: 'control' }, // Often here in 75%
    ]
];

export const MAIN_BLOCK_75: KeyData[][] = [
    // Rows 1-3 are same as MAIN_BLOCK
    MAIN_BLOCK[0],
    MAIN_BLOCK[1],
    MAIN_BLOCK[2],
    // Row 4: Short Shift + Up Arrow
    [
        { code: 'ShiftLeft', label: 'Shift', width: 2.25, type: 'modifier' },
        { code: 'KeyZ', label: 'Z', type: 'alpha' },
        { code: 'KeyX', label: 'X', type: 'alpha' },
        { code: 'KeyC', label: 'C', type: 'alpha' },
        { code: 'KeyV', label: 'V', type: 'alpha' },
        { code: 'KeyB', label: 'B', type: 'alpha' },
        { code: 'KeyN', label: 'N', type: 'alpha' },
        { code: 'KeyM', label: 'M', type: 'alpha' },
        { code: 'Comma', label: ',', type: 'alpha' },
        { code: 'Period', label: '.', type: 'alpha' },
        { code: 'Slash', label: '/', type: 'alpha' },
        { code: 'ShiftRight', label: 'Shift', width: 1.75, type: 'modifier' },
        { code: 'ArrowUp', label: '↑', type: 'control' },
        { code: 'End', label: 'End', type: 'control' }, // Often here
    ],
    // Row 5: Short Mods + Arrows
    [
        { code: 'ControlLeft', label: 'Ctrl', width: 1.25, type: 'modifier' },
        { code: 'MetaLeft', label: 'Win', width: 1.25, type: 'modifier' },
        { code: 'AltLeft', label: 'Alt', width: 1.25, type: 'modifier' },
        { code: 'Space', label: 'Space', width: 6.25, type: 'alpha' },
        { code: 'AltRight', label: 'Alt', width: 1, type: 'modifier' }, // Smaller Alt
        { code: 'Function', label: 'Fn', width: 1, type: 'modifier' }, // Fn often here
        { code: 'ControlRight', label: 'Ctrl', width: 1, type: 'modifier' },
        { code: 'ArrowLeft', label: '←', type: 'control' },
        { code: 'ArrowDown', label: '↓', type: 'control' },
        { code: 'ArrowRight', label: '→', type: 'control' },
    ]
];

export const NAV_COLUMN_75: KeyData[][] = [
    [{ code: 'Home', label: 'Home', type: 'control' }],
    [{ code: 'PageUp', label: 'PgUp', type: 'control' }],
    [{ code: 'PageDown', label: 'PgDn', type: 'control' }],
    [{ code: 'ArrowRight', label: '→', type: 'control' }], // Placeholder or just empty if arrows are in main
];
