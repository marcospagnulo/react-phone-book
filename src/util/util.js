export function formatDate(timestamp) {
    var d = new Date(timestamp);
    return d.toLocaleDateString() + " " + d.getHours() + ":" + d.getMinutes();
}