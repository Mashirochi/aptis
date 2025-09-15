// SEO utilities for dynamic meta tag management
export const generatePageTitle = (pageTitle: string): string => {
  return `${pageTitle} | Listening APTIS - English Listening Practice Platform`;
};

export const generatePageDescription = (description: string): string => {
  return description.length > 160 ? description.substring(0, 157) + '...' : description;
};

export const generateKeywords = (baseKeywords: string[], pageKeywords: string[]): string[] => {
  return [...new Set([...baseKeywords, ...pageKeywords])];
};

export const baseKeywords = [
  'APTIS listening',
  'English listening practice',
  'APTIS preparation',
  'English language learning',
  'listening comprehension',
  'audio exercises',
  'English test preparation',
  'APTIS test',
  'listening skills',
  'English proficiency'
];

export const generateStructuredData = (pageType: string, pageData: any) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': pageData.title,
    'description': pageData.description,
    'url': `https://listening-aptis.vercel.app${pageData.url}`,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Listening APTIS',
      'url': 'https://listening-aptis.vercel.app'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://listening-aptis.vercel.app'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': pageData.title,
          'item': `https://listening-aptis.vercel.app${pageData.url}`
        }
      ]
    }
  };

  if (pageType === 'practice') {
    return {
      ...baseStructuredData,
      '@type': 'LearningResource',
      'educationalUse': 'Practice',
      'learningResourceType': 'Exercise',
      'teaches': 'English Listening Skills',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student'
      }
    };
  }

  return baseStructuredData;
};

export const preloadCriticalResources = () => {
  // Preload critical fonts and resources
  const fontPreloads = [
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ];

  return fontPreloads;
};