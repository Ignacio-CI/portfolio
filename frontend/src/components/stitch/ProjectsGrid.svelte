<script lang="ts">
    interface Project {
        id: string;
        name: string;
        year: number;
        tags: string[];
        techs: { label: string; accent: 'primary' | 'secondary' }[];
        chipLabels: string[];
        accentColor: 'primary' | 'secondary';
        image: string;
        imageAlt: string;
        desc: string;
    }

    const {
        projects,
        filterLabels,
        viewCaseStudy,
    } = $props<{
        projects: Project[];
        filterLabels: { all: string; ai: string; web: string; viz: string; cloud: string };
        viewCaseStudy: string;
    }>();

    const filters = [
        { key: 'all', label: filterLabels.all },
        { key: 'ai', label: filterLabels.ai },
        { key: 'web', label: filterLabels.web },
        { key: 'viz', label: filterLabels.viz },
        { key: 'cloud', label: filterLabels.cloud },
    ];

    let activeFilter = $state('all');

    const filtered = $derived(
        activeFilter === 'all'
            ? projects
            : projects.filter((p) => p.tags.includes(activeFilter))
    );
</script>

<!-- Filter buttons -->
<div class="max-w-7xl mx-auto px-8 mb-12">
    <div class="flex flex-wrap items-center gap-4 py-4 border-y border-outline-variant/10">
        <span class="font-label text-[10px] uppercase tracking-widest text-zinc-500 mr-4">Filter By Architecture:</span>
        {#each filters as filter}
            <button
                class={filter.key === activeFilter
                    ? 'px-5 py-2 rounded-full border border-primary/40 text-primary font-label text-xs uppercase tracking-widest bg-primary/5'
                    : 'px-5 py-2 rounded-full border border-outline-variant/20 text-on-surface-variant hover:border-secondary hover:text-secondary transition-all font-label text-xs uppercase tracking-widest'}
                onclick={() => activeFilter = filter.key}
            >
                {filter.label}
            </button>
        {/each}
    </div>
</div>

<!-- Projects grid -->
<div class="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
    {#each filtered as project, i (project.id)}
        <article class={`group relative flex flex-col gap-6 ${i % 2 === 1 ? 'mt-0 md:mt-24' : ''}`}>
            <div class={`relative aspect-16/10 overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/10 transition-all duration-500 ${project.accentColor === 'primary' ? 'group-hover:border-primary/30' : 'group-hover:border-secondary/30'}`}>
                <img
                    alt={project.imageAlt}
                    class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    src={project.image}
                />
                <div class="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div class="flex gap-2">
                        {#each project.chipLabels as chip}
                            <span class="px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] font-label uppercase text-white">{chip}</span>
                        {/each}
                    </div>
                    <button class={`flex items-center gap-2 font-headline font-bold text-sm ${project.accentColor === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                        {viewCaseStudy} <span class="text-2xl">↗</span>
                    </button>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex items-center gap-3">
                    <h3 class="text-3xl font-headline font-bold tracking-tight text-white">{project.name}</h3>
                    <span class="font-label text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded">{project.year}</span>
                </div>
                <p class="text-on-surface-variant max-w-md">{project.desc}</p>
                <div class="flex gap-4 pt-4">
                    {#each project.techs as tech}
                        <span class={`font-label text-[10px] uppercase tracking-widest ${tech.accent === 'primary' ? 'text-primary' : 'text-secondary'}`}>{tech.label}</span>
                    {/each}
                </div>
            </div>
        </article>
    {/each}
</div>
