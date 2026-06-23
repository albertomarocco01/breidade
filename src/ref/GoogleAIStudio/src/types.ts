export interface Project {
  id: string;
  title: string;          // Original Italian name
  category: string;       // e.g., "pack design", "identity ties" etc.
  descriptionIT: string;  // Detailed explanation in Italian
  descriptionEN: string;  // Detailed explanation in English
  client?: string;
  year: string;
  tags: string[];
  imageUrl: string;
  bgColor: string;        // Specific visual background color for presentation (Tomato, Blue, Cream, Green etc.)
  textColor: string;      // Contrasting text color
  chineseTitle?: string;  // Chinese translation / accent characters
}

export interface PhotographicStory {
  id: string;
  imageUrl: string;
  captionIT: string;      // Strictly hidden, only used for raw accessibility (under-the-hood alt text)
  captionEN: string;
  aspectClass: string;    // CSS size class (e.g. aspect-[3/4] or aspect-square)
  colsSpan: string;       // Grid col-span variations for asymmetric scattering
  alignSelf: string;      // Styling alignment
}
