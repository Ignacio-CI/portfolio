<script lang="ts">
    interface Message {
        id: string;
        role: "user" | "assistant";
        content: string;
        timestamp: string;
    }

    const API_URL = import.meta.env.PUBLIC_API_URL ?? "http://localhost:8000";

    let messages = $state<Message[]>([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Hey! I'm Ignace's digital twin. Ask me anything.",
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);
    let input = $state("");
    let isLoading = $state(false);
    let sessionId = $state<string | null>(null);
    let conversationEl = $state<HTMLDivElement | undefined>(undefined);

    $effect(() => {
        messages;
        if (conversationEl) {
            conversationEl.scrollTop = conversationEl.scrollHeight;
        }
    });

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

            const data: { response: string; session_id: string } = await res.json();
            sessionId = data.session_id;

            const idx = messages.findIndex((m) => m.id === assistantId);
            if (idx !== -1) {
                messages[idx] = { ...messages[idx], content: data.response };
            }
        } catch {
            const idx = messages.findIndex((m) => m.id === assistantId);
            if (idx !== -1) {
                messages[idx] = {
                    ...messages[idx],
                    content: "Something went wrong. Please try again.",
                };
            }
        } finally {
            isLoading = false;
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }
</script>

<div class="chat__container">
    <div class="chat__wrapper">
        <div class="chat__conversation" bind:this={conversationEl}>
            {#each messages as message (message.id)}
                <div class="message message--{message.role}">
                    <p class="message__content">
                        {#if message.role === "assistant" && isLoading && message.content === ""}
                            <span class="message__typing">
                                <span></span><span></span><span></span>
                            </span>
                        {:else}
                            {message.content}
                        {/if}
                    </p>
                    {#if message.content}
                        <span class="message__time">{message.timestamp}</span>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="chat__input-wrapper">
            <textarea
                name="user-input"
                id="usr-input"
                placeholder="Ask me anything…"
                value={input}
                disabled={isLoading}
                oninput={(e) => {
                    input = (e.target as HTMLTextAreaElement).value;
                }}
                onkeydown={handleKeydown}
            ></textarea>
            <button
                class="chat__send-btn"
                onclick={handleSubmit}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    ><rect width="24" height="24" fill="none" /><path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
                    /></svg
                >
            </button>
        </div>
    </div>
</div>

<style>
    .chat__container {
        border: 1px solid oklch(28% 0.005 285);
        border-radius: var(--border-radius-4);
        height: 60%;
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        color: var(--text-high-contrast);
        background: oklch(17% 0.006 285);
        overflow: hidden;
    }

    .chat__wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .chat__conversation {
        flex: 1;
        width: 100%;
        padding: var(--gap-4);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: oklch(35% 0 0) transparent;
        display: flex;
        flex-direction: column;
        gap: var(--gap-3);
    }

    /* Messages */

    .message {
        display: flex;
        flex-direction: column;
        gap: var(--gap-1);
        max-width: 80%;
    }

    .message--user {
        align-self: flex-end;
        align-items: flex-end;
    }

    .message--assistant {
        align-self: flex-start;
        align-items: flex-start;
    }

    .message__content {
        padding: var(--gap-2) var(--gap-3);
        border-radius: var(--border-radius-3);
        font-size: var(--text-sm);
        font-family: var(--ff-sans);
        line-height: 1.6;
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
    }

    .message--user .message__content {
        background: var(--clr-brand-500);
        color: var(--clr-white);
        border-bottom-right-radius: var(--border-radius-1);
    }

    .message--assistant .message__content {
        background: oklch(24% 0.006 285);
        color: var(--text-high-contrast);
        border-bottom-left-radius: var(--border-radius-1);
    }

    .message__time {
        font-size: var(--text-xs);
        color: oklch(55% 0 0);
        padding-inline: var(--gap-1);
    }

    /* Typing indicator */

    .message__typing {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding-block: 0.25rem;
    }

    .message__typing span {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: oklch(55% 0 0);
        animation: typing 1.2s infinite ease-in-out;
    }

    .message__typing span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .message__typing span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typing {
        0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(-3px); }
    }

    /* Input */

    .chat__input-wrapper {
        border-top: 1px solid oklch(28% 0.005 285);
        width: 100%;
        display: flex;
        align-items: flex-end;
        gap: var(--gap-2);
        padding: var(--gap-3) var(--gap-4);
        background: oklch(15% 0.005 285);
    }

    .chat__input-wrapper textarea {
        flex: 1;
        resize: none;
        min-height: 2.5rem;
        max-height: 8rem;
        padding: var(--gap-2) var(--gap-3);
        font-family: var(--ff-mono);
        font-size: var(--text-sm);
        line-height: 1.6;
        color: var(--text-high-contrast);
        background: oklch(22% 0.006 285);
        border: 1px solid oklch(32% 0.005 285);
        border-radius: var(--border-radius-3);
        outline: none;
        transition: border-color 150ms ease;
        field-sizing: content;
    }

    .chat__input-wrapper textarea::placeholder {
        color: oklch(55% 0 0);
    }

    .chat__input-wrapper textarea:focus {
        border-color: var(--clr-brand-400);
    }

    .chat__input-wrapper textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .chat__send-btn {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--gap-2);
        border-radius: var(--border-radius-3);
        background: var(--clr-brand-500);
        color: var(--clr-white);
        border: none;
        cursor: pointer;
        transition:
            background 150ms ease,
            transform 100ms ease;
    }

    .chat__send-btn:hover:not(:disabled) {
        background: var(--clr-brand-400);
    }

    .chat__send-btn:active:not(:disabled) {
        transform: scale(0.92);
    }

    .chat__send-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
</style>
