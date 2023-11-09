function timeSince(unixTimestamp, shorten = false) {
  const currentTime = Math.floor(Date.now() / 1e3);
  const timeDifference = currentTime - unixTimestamp;
  if (shorten) {
    if (timeDifference < 60) {
      return `${timeDifference}s`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes}m`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours}h`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days}d`;
    }
  } else {
    if (timeDifference < 60) {
      return timeDifference === 1 ? "1 second ago" : `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  }
}
export {
  timeSince as t
};
