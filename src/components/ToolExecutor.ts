export interface ToolAction {
    action: 'scroll' | 'navigate' | 'click' | 'highlight' | 'input' | 'focus';
    target: string;
    value?: string;
}

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const executeTool = (tool: ToolAction, router?: AppRouterInstance) => {
    console.log('Executing tool:', tool);

    if (tool.action === 'navigate') {
        if (router) {
            router.push(tool.target);
        } else {
            window.location.href = tool.target;
        }
        return true;
    }

    const element = document.querySelector(tool.target) as HTMLElement;

    if (!element) {
        console.warn(`Element not found for selector: ${tool.target}`);
        return false;
    }

    switch (tool.action) {
        case 'scroll':
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;

        case 'click':
            element.click();
            break;

        case 'highlight':
            const originalTransition = element.style.transition;
            const originalBoxShadow = element.style.boxShadow;

            element.style.transition = 'box-shadow 0.3s ease';
            element.style.boxShadow = '0 0 0 4px rgba(255, 215, 0, 0.7)'; // Gold highlight

            setTimeout(() => {
                element.style.boxShadow = originalBoxShadow;
                setTimeout(() => {
                    element.style.transition = originalTransition;
                }, 300);
            }, 2000);

            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;

        case 'input':
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                // React tracks input values using property descriptors. 
                // Direct assignment (element.value = ...) doesn't trigger React's onChange.
                // We need to use the native setter to bypass React's tracking briefly.
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;

                if (element instanceof HTMLInputElement && nativeInputValueSetter) {
                    nativeInputValueSetter.call(element, tool.value || '');
                } else if (element instanceof HTMLTextAreaElement && nativeTextAreaValueSetter) {
                    nativeTextAreaValueSetter.call(element, tool.value || '');
                } else {
                    element.value = tool.value || '';
                }

                // Dispatch input event for React to pick up the change
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
            break;

        case 'focus':
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.focus();
            break;

        default:
            console.warn('Unknown tool action:', tool.action);
            return false;
    }

    return true;
};
