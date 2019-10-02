export default nodes => {
    const out = [];

    nodes.forEach(n => {
        out.push({
            ...n,
            id: `repository-${n.name}`,
            kind: 'repository',
            layer: n.type,
            size: n.diskUsage ? n.diskUsage : 100
        });
    });

    return out;
}
