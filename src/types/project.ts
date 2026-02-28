export type ProjectStatus = 'production' | 'mvp' | 'development';

export interface Project {
    title: string;
    subtitle: string;
    content: string;
    company?: string;
    companyLink?: string;
    image: string;
    status: ProjectStatus;
    link: string;
    tags: string[];
}
