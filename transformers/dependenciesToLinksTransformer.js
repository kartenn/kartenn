export default (rootProject) => {
    const links = [];

    if (rootProject.calls) {
        rootProject.calls.forEach(c => {
            links.push({
                id: `dependency-${rootProject.name}-${c}`,
                source: `repository-${rootProject.name}`,
                target: `repository-${c}`,
                from: 'readme'
            });
        });

    }

    if (rootProject.called) {
        rootProject.called.forEach(c => {
            links.push({
                id: `dependency-${c}-${rootProject.name}`,
                target: `repository-${rootProject.name}`,
                source: `repository-${c}`,
                from: 'readme'
            });
        });
    }

    return links;
}
