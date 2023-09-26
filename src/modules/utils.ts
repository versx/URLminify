export const substr = (text: string, maxChars: number = 30, addEllipsis: boolean = true) => {
  if (text.length <= maxChars) {
    return text;
  }
  const result = text.substring(0, Math.min(text.length, maxChars));
  return addEllipsis ? result + '...' : result;
};