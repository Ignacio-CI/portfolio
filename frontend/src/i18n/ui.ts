import { nav } from './sections/nav';
import { hero } from './sections/hero';
import { services } from './sections/services';
import { contact } from './sections/contact';
import { projects } from './sections/projects';
import { process } from './sections/process';
import { about } from './sections/about';

export const languages = {
    en: 'English',
    es: 'Español',
};

export const defaultLang = 'es';

export const showDefaultLang = false;

export const ui = {
    en: {
        ...nav.en,
        ...hero.en,
        ...services.en,
        ...contact.en,
        ...projects.en,
        ...process.en,
        ...about.en,
    },
    es: {
        ...nav.es,
        ...hero.es,
        ...services.es,
        ...contact.es,
        ...projects.es,
        ...process.es,
        ...about.es,
    },
} as const;
