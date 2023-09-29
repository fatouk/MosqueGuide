export interface QuranResponse {
    code: number;
    status: string;
    data: {
      edition: {
        identifier: string;
        language: string;
        name: string;
        englishName: string;
        format: string;
        
      };
      surahs: any[]; // Vous pouvez spécifier le type approprié pour les objets dans le tableau surahs
    };
  }