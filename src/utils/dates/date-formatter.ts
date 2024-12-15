import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatBlogDate = (createdAt: string) => {
  const now = dayjs();
  const date = dayjs(createdAt).isAfter(now) ? now : dayjs(createdAt);

  if (date.isSame(now, 'day')) {
    const fromNow = date.fromNow();
    if (fromNow === 'a few seconds ago') {
      return 'Just now';
    } else {
      return fromNow;
    }
  }

  if (date.isSame(now, 'year')) {
    return date.format('D MMMM [at] HH:mm'); // Format like "5 December at 14:16"
  }

  return date.format('DD/MM/YYYY [at] HH:mm'); // Format like "10/12/2023 at 14:16"
};
