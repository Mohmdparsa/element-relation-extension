// This flag will be used to track whether the mode is active or not
if (!window.tagHoverScriptInjected) {
  window.tagHoverScriptInjected = true;
  window.isActiveMode = true; // Initially, the mode is active

  // Listen for messages to activate or deactivate the mode
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.mode === 'deactivate') {
      window.isActiveMode = false;
      // Optionally remove event listeners or any added elements here
    } else if (request.mode === 'activate') {
      window.isActiveMode = true;
    }
    sendResponse({ status: 'mode updated' });
  });

  document.addEventListener('mouseover', (event) => {
    if (!window.isActiveMode) return; // Exit if the mode is not active

    const targetElement = event.target;
    const tagName = targetElement.tagName;

    // Identifying relationships
    const parentElement = targetElement.parentElement ? targetElement.parentElement.tagName : 'None';
    const childElements = targetElement.children.length > 0 ? [...targetElement.children].map(child => child.tagName).join(', ') : 'None';
    const siblingElements = targetElement.parentElement && targetElement.parentElement.children.length > 1
      ? [...targetElement.parentElement.children].filter(sibling => sibling !== targetElement).map(sibling => sibling.tagName).join(', ')
      : 'None';

    // Tooltip Content
    const tooltipText = `
      Tag: ${tagName}
      Parent: ${parentElement}
      Children: ${childElements}
      Siblings: ${siblingElements}
    `;

    const rect = targetElement.getBoundingClientRect();

    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top}px`;
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.zIndex = '10000';
    tooltip.style.whiteSpace = 'pre-line';
    tooltip.innerText = tooltipText.trim();

    document.body.appendChild(tooltip);

    targetElement.addEventListener('mouseout', () => {
      document.body.removeChild(tooltip);
    }, { once: true });
  });
}