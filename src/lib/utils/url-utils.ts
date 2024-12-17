/**
 * Formats a website URL to ensure it's valid and includes the protocol
 */
export function formatWebsiteUrl(url: string): string {
  if (!url) return '';
  
  // Remove leading/trailing whitespace
  let formattedUrl = url.trim();
  
  // Don't modify the input while user is typing
  if (!formattedUrl.includes('.')) {
    return formattedUrl;
  }
  
  // Only format if it looks like a valid domain
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }
  
  return formattedUrl;
}

/**
 * Formats a website URL for display (without protocol)
 */
export function formatWebsiteDisplay(url: string): string {
  if (!url) return '';
  
  return url.replace(/^https?:\/\//i, '');
}

/**
 * Validates if a string is a valid website URL
 */
export function isValidWebsite(url: string): boolean {
  if (!url) return false;
  
  try {
    // Add protocol if missing for URL constructor
    const urlToTest = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
}