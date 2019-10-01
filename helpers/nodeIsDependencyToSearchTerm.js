export default (node, links) => typeof links.find(l =>
   typeof l.source === 'string' && l.source === node.id ||
   typeof l.source === 'object' && l.source.id === node.id ||
   typeof l.target === 'string' && l.target === node.id ||
   typeof l.target === 'object' && l.target.id === node.id
) !== 'undefined';
