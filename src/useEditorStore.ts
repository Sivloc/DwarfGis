import { create } from 'zustand';

type Tool = "pan" | "paint" | "erase";

type EditorState = {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    activeTool: "pan",
    setActiveTool: (tool) => set({ activeTool: tool }),
}));