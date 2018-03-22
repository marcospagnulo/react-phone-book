export function formatDate(timestamp) {
    var d = new Date(timestamp);
    return d.toLocaleDateString() + " " + d.getHours() + ":" + d.getMinutes();
}

export function getWeekDays() {
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
}

export function getMonths() {
    return ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"];
}

export function getDayPerMonths() {
    return [31, 28, 30, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}