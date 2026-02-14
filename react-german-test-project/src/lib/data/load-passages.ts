export async function loadPassage(passageId: string): Promise<string> {
  const response = await fetch(`/passages/${passageId}.md`);
  if (!response.ok) return "";
  return response.text();
}
