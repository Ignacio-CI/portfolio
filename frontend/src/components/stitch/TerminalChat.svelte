<script lang="ts">
    import { untrack, tick } from "svelte";
    import DOMPurify from "dompurify";
    import { marked } from "marked";

    interface Message {
        id: string;
        role: "user" | "assistant";
        content: string;
        timestamp: string;
    }

    const {
        terminalHeader = "console v4.0.2 // ignace.dev",
        visitorLabel = "visitor@ignace:~$",
        aiPrefix = "[Querying swarm...]",
        aiInitialBody = "Our model is a Hybrid Intelligence Collective.",
    } = $props<{
        terminalHeader?: string;
        visitorLabel?: string;
        aiPrefix?: string;
        aiInitialBody?: string;
    }>();

    const API_URL = import.meta.env.PUBLIC_API_URL ?? "http://localhost:8000";

    let messages = $state<Message[]>(
        untrack(() => [
            {
                id: crypto.randomUUID(),
                role: "assistant",
                content: `<span class="text-primary-dim">${untrack(() => aiPrefix)}</span> ${untrack(() => aiInitialBody)}`,
                timestamp: new Date().toLocaleTimeString(),
            },
        ])
    );
    let input = $state("");
    let isLoading = $state(false);
    let sessionId = $state<string | null>(null);
    let conversationEl = $state<HTMLDivElement | undefined>(undefined);
    let inputEl = $state<HTMLInputElement | undefined>(undefined);

    // Auto-scroll to bottom
    $effect(() => {
        // Track array length and the last message's content to trigger scroll
        messages.length;
        if (messages.length > 0) messages[messages.length - 1].content;

        if (conversationEl) {
            conversationEl.scrollTop = conversationEl.scrollHeight;
        }
    });
    
    // Focus input strictly on click inside terminal if the target isn't already the input
    function handleTerminalClick() {
        if (inputEl) {
            inputEl.focus();
        }
    }

    async function handleSubmit() {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        messages.push({
            id: crypto.randomUUID(),
            role: "user",
            content: trimmed,
            timestamp: new Date().toLocaleTimeString(),
        });
        input = "";
        isLoading = true;

        const assistantId = crypto.randomUUID();
        messages.push({
            id: assistantId,
            role: "assistant",
            content: "",
            timestamp: new Date().toLocaleTimeString(),
        });

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    ...(sessionId && { session_id: sessionId }),
                }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data: { response: string; session_id: string } =
                await res.json();
            sessionId = data.session_id;

            const idx = messages.findIndex((m) => m.id === assistantId);
            if (idx !== -1) {
                const html = await marked.parse(data.response);
                const clean = DOMPurify.sanitize(html, {
                    ALLOWED_TAGS: ["span", "br", "strong", "em", "p", "ul", "ol", "li", "code", "pre", "a", "h1", "h2", "h3", "h4"],
                    ALLOWED_ATTR: ["class", "href", "target", "rel"],
                });
                messages[idx] = {
                    ...messages[idx],
                    content: `<span class="text-primary-dim">${aiPrefix}</span> ${clean}`,
                };
            }
        } catch {
            const idx = messages.findIndex((m) => m.id === assistantId);
            if (idx !== -1) {
                messages[idx] = {
                    ...messages[idx],
                    content: `<span class="text-error">Connection to swarm lost. Please try again later.</span>`,
                };
            }
        } finally {
            isLoading = false;
            await tick();
            if (inputEl) {
                inputEl.focus();
            }
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="glass-panel rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl flex flex-col h-[500px]"
    onclick={handleTerminalClick}
>
    <!-- Terminal Header -->
    <div
        class="bg-surface-container-highest px-6 py-3 flex items-center justify-between border-b border-outline-variant/10 shrink-0"
    >
        <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-error/40"></div>
            <div class="w-3 h-3 rounded-full bg-secondary-container/40"></div>
            <div class="w-3 h-3 rounded-full bg-primary/40"></div>
        </div>
        <div class="font-label text-[10px] text-on-surface-variant tracking-widest uppercase">
            {terminalHeader}
        </div>
        <div class="w-12"></div>
    </div>
    <!-- Terminal Body -->
    <div 
        class="p-8 font-label text-sm md:text-base flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-6"
        bind:this={conversationEl}
    >
        <div class="space-y-6">
            {#each messages as message (message.id)}
                {#if message.role === "user"}
                    <div class="flex gap-4">
                        <span class="text-secondary font-bold shrink-0">{visitorLabel}</span>
                        <span class="text-on-surface wrap-break-word whitespace-pre-wrap">{message.content}</span>
                    </div>
                {:else}
                    <div class="flex gap-4 group">
                        <span class="text-primary font-bold shrink-0">ignace_ai:</span>
                        <div class="text-on-surface-variant leading-relaxed max-w-2xl wrap-break-word whitespace-pre-wrap">
                            {#if isLoading && message.content === ""}
                                <span class="animate-pulse">_</span>
                            {:else}
                                {@html message.content}
                            {/if}
                        </div>
                    </div>
                {/if}
            {/each}

            <!-- Active Input Field -->
            <div class="flex gap-4 items-center">
                <span class="text-secondary font-bold shrink-0">{visitorLabel}</span>
                <input
                    class="bg-transparent border-none outline-none text-on-surface w-full focus:ring-0 p-0 font-label placeholder:text-on-surface-variant/30"
                    type="text"
                    bind:this={inputEl}
                    bind:value={input}
                    disabled={isLoading}
                    onkeydown={handleKeydown}
                    autocomplete="off"
                    spellcheck="false"
                />
            </div>
            {#if isLoading}
                <!-- Ensures the input field scrolls up smoothly when waiting for response -->
                <div class="h-6"></div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Add smooth scrolling to conversation wrapper */
    .overflow-y-auto {
        scrollbar-width: thin;
        scrollbar-color: var(--color-outline-variant) transparent;
        scroll-behavior: smooth;
    }
</style>
