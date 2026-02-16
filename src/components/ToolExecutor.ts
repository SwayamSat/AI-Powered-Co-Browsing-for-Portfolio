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
                element.value = tool.value || '';
                // Trigger change event for React to pick up changes
                const event = new Event('input', { bubbles: true });
                element.dispatchEvent(event);
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
