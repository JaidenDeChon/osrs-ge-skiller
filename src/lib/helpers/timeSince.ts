export function timeSince(unixTimestamp: number, shorten = false) {
    // Get current time in seconds.
    const currentTime = Math.floor(Date.now() / 1000);
    // Calculate the difference in seconds.
    const timeDifference = currentTime - unixTimestamp;

    if (shorten) {
        if (timeDifference < 60) {
            return `${timeDifference}s`;
        } else if (timeDifference < 3600) { // 60 * 60 = 3600 seconds in an hour
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes}m`;
        } else if (timeDifference < 86400) { // 60 * 60 * 24 = 86400 seconds in a day
            const hours = Math.floor(timeDifference / 3600);
            return `${hours}h`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days}d`;
        }
    } else {
        if (timeDifference < 60) {
            return timeDifference === 1 ? "1 second ago" : `${timeDifference} seconds ago`;
        } else if (timeDifference < 3600) { // 60 * 60 = 3600 seconds in an hour
            const minutes = Math.floor(timeDifference / 60);
            return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
        } else if (timeDifference < 86400) { // 60 * 60 * 24 = 86400 seconds in a day
            const hours = Math.floor(timeDifference / 3600);
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return days === 1 ? "1 day ago" : `${days} days ago`;
        }
    }
}