export function generateDummyArticles() {
  return Array.from({ length: 23 }, (_, i) => {
    return {
      id: i + 1,
      checked: false,
      heading: `Article ${i + 1}`,
      content: `This is the content of article ${i + 1}`,
    };
  });
}