export function openTab(links) {
    for(const link of Array.isArray(links)?links:[links])
        if (!link.startsWith('file'))
            window.open(link)
}