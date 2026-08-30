export function parseBoard(md) {
  const sections = [];
  let section = null;
  let person = null;

  for (const raw of md.replace(/^---[\s\S]*?---/, '').split('\n')) {
    const line = raw.trim();
    let m;
    if ((m = line.match(/^##\s+(.*)/))) {
      section = { name: m[1].trim(), people: [] };
      sections.push(section);
      person = null;
    } else if ((m = line.match(/^###\s+(.*)/))) {
      if (!section) { section = { name: '', people: [] }; sections.push(section); }
      person = { name: m[1].trim(), role: '', study: '', photo: '' };
      section.people.push(person);
    } else if (person && (m = line.match(/^-\s*(Role|Study|Photo):\s*(.*)/i))) {
      person[m[1].toLowerCase()] = m[2].trim();
    }
  }
  return sections.filter(s => s.people.length);
}
