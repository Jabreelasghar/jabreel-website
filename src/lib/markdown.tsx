function inline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]\((.*?)\)/g, (_match, label, href) => {
      const safeExternal = /^https?:\/\//.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${safeExternal}>${label}</a>`;
    });
}

export function MarkdownBody({ body }: { body: string }) {
  const lines = body.split(/\r?\n/);
  const elements = [];
  let list: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    elements.push(
      <ul key={`list-${elements.length}`}>
        {list.map((item) => (
          <li key={item} dangerouslySetInnerHTML={{ __html: inline(item) }} />
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      list.push(trimmed.slice(2));
      continue;
    }

    flushList();

    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={trimmed}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={trimmed}>{trimmed.slice(4)}</h3>);
    } else {
      elements.push(<p key={trimmed} dangerouslySetInnerHTML={{ __html: inline(trimmed) }} />);
    }
  }

  flushList();

  return <div className="prose-custom">{elements}</div>;
}
