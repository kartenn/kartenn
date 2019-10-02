export default nodes => {
    const out = [];

    nodes.forEach(n => {
        out.push({
            ...n,
            id: `repository-${n.name}`,
            kind: 'repository',
            size: n.diskUsage ? n.diskUsage : 1000
        });
    });

    return out;
}
