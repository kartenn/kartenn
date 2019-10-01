export default (link, searchTerm) =>
   (typeof link.source === 'string' && link.source.indexOf(searchTerm) !== -1) ||
   (typeof link.source === 'object' && link.source.name.indexOf(searchTerm) !== -1) ||
   (typeof link.target === 'string' && link.target.indexOf(searchTerm) !== -1) ||
   (typeof link.target === 'object' && link.target.name.indexOf(searchTerm) !== -1);
