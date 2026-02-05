import { useEditorStore } from "./useEditorStore";

const Sidebar = () => {

    const activeTool = useEditorStore((state) => state.activeTool);
    const setActiveTool = useEditorStore((state) => state.setActiveTool);

    return (
        <div style={{ width: 240, background: "#222", color: "#eee" }}>
            <button onClick={() => setActiveTool("pan")}>
                Pan {activeTool === "pan" && "✓"}
            </button>
            <button onClick={() => setActiveTool("paint")}>
                Paint {activeTool === "paint" && "✓"}
            </button>
        </div>
  );
}

export default Sidebar;