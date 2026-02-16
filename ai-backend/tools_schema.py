# Tools schema definition for Gemini (if using function calling API, otherwise system prompt checks this)
# Since we are using system prompt to enforce JSON structure, this might be used for validation or passed to Gemini if using tool config.

TOOLS_SCHEMA = [
    {
        "name": "scroll",
        "description": "Scroll to a specific element on the page.",
        "parameters": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "CSS selector of the element to scroll to."}
            },
            "required": ["target"]
        }
    },
    {
        "name": "navigate",
        "description": "Navigate to a different route.",
        "parameters": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "The route path to navigate to (e.g., '/projects')."}
            },
            "required": ["target"]
        }
    },
    {
        "name": "click",
        "description": "Click an element on the page.",
        "parameters": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "CSS selector of the element to click."}
            },
            "required": ["target"]
        }
    },
    {
        "name": "highlight",
        "description": "Highlight an element on the page to draw attention.",
        "parameters": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "CSS selector of the element to highlight."}
            },
            "required": ["target"]
        }
    },
     {
        "name": "input",
        "description": "Fill an input field with a value.",
        "parameters": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "CSS selector of the input element."},
                "value": {"type": "string", "description": "The value to input."}
            },
            "required": ["target", "value"]
        }
    },
    {
        "name": "focus",
        "description": "Focus on a section by scrolling and potentially zooming.",
        "parameters": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "CSS selector of the section to focus on."}
            },
            "required": ["target"]
        }
    }
]
