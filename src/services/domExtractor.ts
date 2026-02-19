export function getVisiblePageContent(): string {
    if (typeof document === 'undefined') return '';

    // Helper to check if element is visible
    const isVisible = (el: HTMLElement) => {
        const style = window.getComputedStyle(el);
        return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            el.offsetWidth > 0 &&
            el.offsetHeight > 0
        );
    };

    // Helper to extract structure and text
    const extractStructure = (el: HTMLElement, depth: number = 0): string => {
        if (depth > 25) return ''; // Increased depth limit
        if (!isVisible(el)) return '';

        let output = '';
        const tagName = el.tagName.toLowerCase();

        // Key attributes to identify elements
        const id = el.id ? ` id="${el.id}"` : '';
        const name = el.getAttribute('name') ? ` name="${el.getAttribute('name')}"` : '';
        const placeholder = el.getAttribute('placeholder') ? ` placeholder="${el.getAttribute('placeholder')}"` : '';
        const ariaLabel = el.getAttribute('aria-label') ? ` aria-label="${el.getAttribute('aria-label')}"` : '';
        const type = el.getAttribute('type') ? ` type="${el.getAttribute('type')}"` : '';
        const href = el.getAttribute('href') ? ` href="${el.getAttribute('href')}"` : '';

        // Priority elements that should always be included
        const isPriority = ['section', 'main', 'header', 'footer', 'nav', 'article', 'form'].includes(tagName);
        const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName);
        const isInteractive = ['a', 'button', 'input', 'textarea', 'select'].includes(tagName);

        // Include divs/spans only if they have meaningful attributes
        const isStructural = ['div', 'span', 'p', 'li', 'ul', 'ol', 'label'].includes(tagName);
        const hasIdentity = id || name || placeholder || ariaLabel;

        // Decide if we should include this tag
        const shouldInclude = isPriority || isHeading || isInteractive || (isStructural && hasIdentity);

        if (shouldInclude) {
            let attrs = id + name + placeholder + ariaLabel + type + href;
            output += `<${tagName}${attrs}>`;
        }

        // Content handling
        let textContent = '';

        // For interactive elements (buttons, links), always capture their full text content
        // even if they have children (like icons + text)
        if (isInteractive && el.textContent?.trim()) {
            // Get the full text content, stripping extra whitespace
            const fullText = el.textContent.trim().replace(/\s+/g, ' ');
            const maxLength = 100;
            textContent = fullText.slice(0, maxLength);

            // Still process children for nested structure, but we've captured the text
            if (el.children.length > 0) {
                for (const child of Array.from(el.children)) {
                    // Only recurse for non-text children to avoid duplication
                    const childTag = (child as HTMLElement).tagName?.toLowerCase();
                    if (childTag && !['svg', 'path', 'i', 'span'].includes(childTag)) {
                        textContent += extractStructure(child as HTMLElement, depth + 1);
                    }
                }
            }
        } else if (el.children.length === 0 && el.textContent?.trim()) {
            // For leaf nodes (no children), capture text
            const maxLength = (isHeading) ? 100 : 60;
            textContent = el.textContent.trim().slice(0, maxLength);
        } else {
            // For structural elements, recursively process children
            for (const child of Array.from(el.children)) {
                textContent += extractStructure(child as HTMLElement, depth + 1);
            }
        }

        output += textContent;

        // Close tag
        if (shouldInclude) {
            output += `</${tagName}>`;
        }

        return output;
    };

    const bodyContent = extractStructure(document.body);

    // Clean up and format
    let cleaned = bodyContent
        .replace(/\s+/g, ' ')  // Collapse whitespace
        .replace(/>\s+</g, '><')  // Remove spaces between tags
        .trim();

    // Limit to 20000 chars for better context
    return cleaned.slice(0, 20000);
}
