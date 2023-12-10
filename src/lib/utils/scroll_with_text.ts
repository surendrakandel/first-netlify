export function scrollToElementWithText(targetText: string, elementType: string) {
  // Get all elements of the specified type
  // @ts-expect-error
  const elements = document.getElementsByTagName(elementType);

  // Iterate through all elements
  for (let i = 0; i < elements.length; i++) {
    // Check if the element's text content matches the target text
    if (elements[i].textContent.trim() === targetText.trim()) {
      // Scroll to the element
      elements[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    }
  }
}
