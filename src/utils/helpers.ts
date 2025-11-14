// export const formatDate = (dateString: string, locale: string = 'fr-FR') => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString(locale, {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// };

// export const calculateReadTime = (content: string, wordsPerMinute: number = 200) => {
//   const words = content.split(/\s+/).length;
//   return Math.ceil(words / wordsPerMinute);
// };

// export const debounce = <T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// export const classNames = (...classes: (string | undefined | null | false)[]): string => {
//   return classes.filter(Boolean).join(' ');
// };