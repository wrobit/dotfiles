import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Key, Text, matchesKey, visibleWidth, wrapTextWithAnsi } from "@earendil-works/pi-tui";
import { Type } from "typebox";

interface DecisionOption {
  label: string;
  description?: string;
}

interface DecisionDetails {
  question: string;
  options: DecisionOption[];
  recommendedIndex?: number;
  answer: string | null;
  wasCustom?: boolean;
}

const DecisionOptionSchema = Type.Object({
  label: Type.String({ description: "Short option label, e.g. 'React + TypeScript'" }),
  description: Type.Optional(Type.String({ description: "One-line explanation for this option" })),
});

const DecisionParams = Type.Object({
  question: Type.String({ description: "The decision question to ask the user" }),
  options: Type.Array(DecisionOptionSchema, {
    minItems: 2,
    maxItems: 5,
    description: "Concrete options the user can choose from",
  }),
  recommendedIndex: Type.Optional(Type.Integer({
    minimum: 1,
    description: "1-based index of the recommended/default option",
  })),
  allowCustom: Type.Optional(Type.Boolean({
    description: "Whether to allow the user to type a custom answer. Defaults to true.",
  })),
});

export default function decisionPrompt(pi: ExtensionAPI) {
  pi.registerTool({
    name: "ask_user",
    label: "Ask User",
    description:
      "Ask the user to choose between options. Use for blocking decisions. Include one recommended option when there is a safe default.",
    promptSnippet: "Ask the user an interactive multiple-choice decision question with an optional recommended choice",
    promptGuidelines: [
      "Use ask_user instead of plain-text numbered lists when a blocking user decision has 2-5 concrete options.",
      "When using ask_user, set recommendedIndex when one option is the safest or smallest reasonable default.",
    ],
    parameters: DecisionParams,
    executionMode: "sequential",

    async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
      const recommendedIndex =
        params.recommendedIndex &&
        params.recommendedIndex >= 1 &&
        params.recommendedIndex <= params.options.length
          ? params.recommendedIndex
          : undefined;
      const allowCustom = params.allowCustom !== false;

      if (params.options.length < 2) {
        return {
          content: [{ type: "text", text: "Error: ask_user needs at least two options." }],
          details: {
            question: params.question,
            options: params.options,
            recommendedIndex,
            answer: null,
          } satisfies DecisionDetails,
        };
      }

      if (ctx.mode !== "tui") {
        const recommended = recommendedIndex ? params.options[recommendedIndex - 1] : undefined;
        return {
          content: [{
            type: "text",
            text: recommended
              ? `UI unavailable. Safe default is ${recommendedIndex}. ${recommended.label}`
              : "UI unavailable. User decision still needed.",
          }],
          details: {
            question: params.question,
            options: params.options,
            recommendedIndex,
            answer: recommended?.label ?? null,
          } satisfies DecisionDetails,
        };
      }

      const customOption = { label: "Type something else", description: "Write a custom answer" };
      const options = allowCustom ? [...params.options, customOption] : params.options;
      const initialIndex = recommendedIndex ? recommendedIndex - 1 : 0;

      const result = await ctx.ui.custom<{ answer: string; wasCustom: boolean; index?: number } | null>(
        (tui, theme, _keybindings, done) => {
          let selectedIndex = Math.min(initialIndex, options.length - 1);
          let customMode = false;
          let customAnswer = "";
          let cachedLines: string[] | undefined;

          function refresh() {
            cachedLines = undefined;
            tui.requestRender();
          }

          function choose() {
            if (allowCustom && selectedIndex === options.length - 1) {
              customMode = true;
              refresh();
              return;
            }

            const selected = options[selectedIndex]!;
            done({ answer: selected.label, wasCustom: false, index: selectedIndex + 1 });
          }

          function submitCustom() {
            const trimmed = customAnswer.trim();
            if (trimmed) done({ answer: trimmed, wasCustom: true });
          }

          function handleInput(data: string) {
            if (customMode) {
              if (matchesKey(data, Key.escape)) {
                customMode = false;
                customAnswer = "";
                refresh();
                return;
              }
              if (matchesKey(data, Key.enter)) {
                submitCustom();
                return;
              }
              if (matchesKey(data, Key.backspace)) {
                customAnswer = customAnswer.slice(0, -1);
                refresh();
                return;
              }
              if (data.length === 1 && data >= " ") {
                customAnswer += data;
                refresh();
              }
              return;
            }

            if (matchesKey(data, Key.up)) {
              selectedIndex = Math.max(0, selectedIndex - 1);
              refresh();
              return;
            }
            if (matchesKey(data, Key.down)) {
              selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
              refresh();
              return;
            }
            if (matchesKey(data, Key.enter)) {
              choose();
              return;
            }
            if (matchesKey(data, Key.escape)) done(null);
          }

          function render(width: number) {
            if (cachedLines) return cachedLines;

            const renderWidth = Math.max(1, width);
            const lines: string[] = [];

            function addWrapped(text: string) {
              lines.push(...wrapTextWithAnsi(text, renderWidth));
            }

            function addWrappedWithPrefix(prefix: string, text: string) {
              const prefixWidth = visibleWidth(prefix);
              const wrapped = wrapTextWithAnsi(text, Math.max(1, renderWidth - prefixWidth));
              const continuationPrefix = " ".repeat(prefixWidth);
              wrapped.forEach((line, index) => {
                lines.push(`${index === 0 ? prefix : continuationPrefix}${line}`);
              });
            }

            lines.push(theme.fg("accent", "─".repeat(renderWidth)));
            addWrappedWithPrefix(" ", theme.fg("text", params.question));
            if (recommendedIndex) {
              const recommended = params.options[recommendedIndex - 1]!;
              addWrappedWithPrefix(
                " ",
                theme.fg("success", `Recommended: ${recommendedIndex}. ${recommended.label}`),
              );
            }
            lines.push("");

            options.forEach((option, index) => {
              const selected = index === selectedIndex;
              const isRecommended = recommendedIndex === index + 1;
              const prefix = selected ? theme.fg("accent", "> ") : "  ";
              const marker = isRecommended ? " ★" : "";
              const label = `${index + 1}. ${option.label}${marker}`;
              addWrappedWithPrefix(prefix, theme.fg(selected ? "accent" : "text", label));
              if (option.description) {
                addWrappedWithPrefix("     ", theme.fg("muted", option.description));
              }
            });

            if (customMode) {
              lines.push("");
              addWrappedWithPrefix(" ", theme.fg("muted", "Custom answer:"));
              addWrappedWithPrefix(" ", theme.fg("text", customAnswer || theme.fg("dim", "type here…")));
            }

            lines.push("");
            addWrapped(customMode
              ? theme.fg("dim", "Enter submit • Esc back")
              : theme.fg("dim", "↑↓ navigate • Enter select • Esc cancel"));
            lines.push(theme.fg("accent", "─".repeat(renderWidth)));

            cachedLines = lines;
            return lines;
          }

          return { render, invalidate: () => { cachedLines = undefined; }, handleInput };
        },
      );

      if (!result) {
        return {
          content: [{ type: "text", text: "User cancelled the decision prompt." }],
          details: {
            question: params.question,
            options: params.options,
            recommendedIndex,
            answer: null,
          } satisfies DecisionDetails,
        };
      }

      return {
        content: [{
          type: "text",
          text: result.wasCustom
            ? `User wrote: ${result.answer}`
            : `User selected: ${result.index}. ${result.answer}`,
        }],
        details: {
          question: params.question,
          options: params.options,
          recommendedIndex,
          answer: result.answer,
          wasCustom: result.wasCustom,
        } satisfies DecisionDetails,
      };
    },

    renderCall(args, theme) {
      const options = Array.isArray(args.options) ? args.options : [];
      const recommended = typeof args.recommendedIndex === "number" ? ` recommended=${args.recommendedIndex}` : "";
      return new Text(
        theme.fg("toolTitle", theme.bold("ask_user ")) +
          theme.fg("muted", `${args.question ?? ""}${recommended}`) +
          (options.length ? `\n${theme.fg("dim", `  ${options.map((option: DecisionOption, index: number) => `${index + 1}. ${option.label}`).join(", ")}`)}` : ""),
        0,
        0,
      );
    },

    renderResult(result, _options, theme) {
      const details = result.details as DecisionDetails | undefined;
      if (!details?.answer) return new Text(theme.fg("warning", "No selection"), 0, 0);
      const recommended = details.recommendedIndex
        ? details.options[details.recommendedIndex - 1]?.label
        : undefined;
      const prefix = details.answer === recommended ? "✓ recommended " : "✓ ";
      return new Text(theme.fg("success", prefix) + theme.fg("accent", details.answer), 0, 0);
    },
  });
}
