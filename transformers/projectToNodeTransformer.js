export default node => {
    const out = [];

    out.push({
        ...node,
        id: `repository-${node.name}`,
        kind: 'repository',
        size: node.diskUsage ? node.diskUsage : 1000,
    });

    return out;
}
