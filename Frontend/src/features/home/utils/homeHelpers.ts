// src/features/home/utils/homeHelpers.ts

export const getImageUrl = (image: string): string => {
  if (!image) {
    return "/images/no-image.png";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `${import.meta.env.VITE_API_BASE_URL}/${image}`;
};

export const truncateText = (
  text: string,
  length = 100
): string => {
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)}...`;
};

export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};