/**
 * Strip markdown formatting to produce plain text suitable for TTS.
 */
export function markdownToPlainText(markdown: string): string {
  if (!markdown.trim()) return "";
  return (
    markdown
      .replace(/#{1,6}\s+/g, "") // Remove ATX headers
      .replace(/\*\*(.+?)\*\*/g, "$1") // Bold
      .replace(/\*(.+?)\*/g, "$1") // Italic
      .replace(/_(.+?)_/g, "$1") // Italic underscore
      .replace(/__(.+?)__/g, "$1") // Bold underscore
      .replace(/\[(.+?)\]\([^)]+\)/g, "$1") // Links: keep link text
      .replace(/`([^`]+)`/g, "$1") // Inline code
      .replace(/^[-*+]\s+/gm, "") // Unordered list bullets
      .replace(/^\d+\.\s+/gm, "") // Ordered list numbers
      .replace(/^\s*>\s*/gm, "") // Blockquote
      .replace(/\n{2,}/g, "\n\n") // Collapse excessive newlines
      .trim()
  );
}
