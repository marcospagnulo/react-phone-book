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

export function areSameDay(d1, d2) {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
}