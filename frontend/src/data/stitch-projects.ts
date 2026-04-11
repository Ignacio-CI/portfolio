export interface StitchProject {
    id: string;
    name: string;
    year: number;
    tags: string[];
    techs: { label: string; accent: 'primary' | 'secondary' }[];
    chipLabels: string[];
    accentColor: 'primary' | 'secondary';
    image: string;
    imageAlt: string;
    descKey: string;
}

export const stitchProjects: StitchProject[] = [
    {
        id: 'aether-os',
        name: 'Aether OS',
        year: 2026,
        tags: ['ai', 'viz'],
        techs: [
            { label: 'React', accent: 'secondary' },
            { label: 'TensorFlow', accent: 'secondary' },
            { label: 'WebGPU', accent: 'secondary' },
        ],
        chipLabels: ['Neural Engine', 'Spatial UI'],
        accentColor: 'primary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUdgFyGkWrJgXdO3iu_8EztVxSsksGKEuGLHRGcNsf3ZG-zQxRw9qKecX_-sOIboRAESJ0z5iu9r2WJ-stUixGJFG3yNWHDZS4mGZb7508eupl70CDnBzUxlAz8BeiH2o4ToENkwqSomwoZ3Af5P9R3g4pVo293dpuvQNJkSQtQWgPwz64ffNnQexQeIYePd4t-x13qrvNqpy0swdd9ooTmCyR1Ztkr5LDq17rs6bhyEegIJ7ivuq8Lmcrzh-A2xgrFK2pnvRJGEGd',
        imageAlt: 'Aether OS interface design',
        descKey: 'projects.p1.desc',
    },
    {
        id: 'lumina-protocol',
        name: 'Lumina Protocol',
        year: 2025,
        tags: ['web'],
        techs: [
            { label: 'Rust', accent: 'primary' },
            { label: 'Next.js', accent: 'primary' },
            { label: 'AWS Edge', accent: 'primary' },
        ],
        chipLabels: ['Web Arch', 'Protocol'],
        accentColor: 'secondary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK7TBuCCZYvhXtK3-yTCWVPil6LA6ru2Ts3MH9u4gFuaDxyX7vERSVj2J8lBEAEnnb27jrnlcw4VpvBIKn3h59yJBW6uq6PdGEDJ5iTxB5n2lPPSgKgZWu7SDyKeHD-P4RHJQ6mqn3sv6ni9nr3pHtWhZzWT7xrPGDmF__uI9_qDd1LodXusHXs3TUfee7fKvOhiPib0KnBO2fXI54-sp5RhtNkItCihERCIAsFd6GnxFuIsdgucbEakoFnJ19EUdkBVmPasA_3voH',
        imageAlt: 'Lumina Protocol data visualization',
        descKey: 'projects.p2.desc',
    },
    {
        id: 'synapse-v3',
        name: 'Synapse V3',
        year: 2025,
        tags: ['cloud'],
        techs: [
            { label: 'Kubernetes', accent: 'secondary' },
            { label: 'Go', accent: 'secondary' },
            { label: 'Prometheus', accent: 'secondary' },
        ],
        chipLabels: ['Cloud Architecture'],
        accentColor: 'primary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjzpE0SotKXRkGEQrYC1ruT_3coR1uX-J8Js9ectKvsNoqspaA7NZBMFASjZY-I3dyyghi1rfILYV8MIzBiVVimdPEiKcxGeJOXJv6A2YAmmJ4tIHf8vJckpDQbapqjM1HXdXQRpTOZ6Fl_dvujRD1Pm2b6iobgfxwgLayrwXTHDjXTPW64DFI8UCoK8HBs_L9WgVJW9kz9FnmTntq5RVxmXr55Gx09yD7h_5tqnSTvA9jLcJONdumviiM4m5kzhiXXsWFeWoh2tpz',
        imageAlt: 'Server room abstract tech',
        descKey: 'projects.p3.desc',
    },
    {
        id: 'void-mapper',
        name: 'Void Mapper',
        year: 2025,
        tags: ['viz'],
        techs: [
            { label: 'Three.js', accent: 'primary' },
            { label: 'Python', accent: 'primary' },
            { label: 'Unity', accent: 'primary' },
        ],
        chipLabels: ['Data Viz', 'Analytics'],
        accentColor: 'secondary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGC0MCfTMEdC-g8tUIa1BjWh2CrrHJ3NiavRfST2w4zscHoe6QBXjV0A8ggtWiAvw64rbVwXPiqouyeNyDJwnQiMiM_c3cgTIl72y0w77WWWoaW0xc2u6pBypcrz348GLDGGLO8J5jxz5EBkO1DN553__8r8pne3mAqJMKyWJ7zUXQm0GGek2LZTJUOkaHzS7ZBr8q756SZKGmR3jbxJwqolBllWeOxYFzVmSrmsbt8JVgdshONoIbIpP_HORyLOvNEPA3nm6AfTYQ',
        imageAlt: 'Abstract data map',
        descKey: 'projects.p4.desc',
    },
];
