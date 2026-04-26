export const atlasPipelineMermaid = `flowchart LR
    subgraph Phase1["Phase 1\n· Architecture ·"]
      arch["Map system into<br/>building blocks &amp; layers"]
    end
    subgraph Phase2["Phase 2\n· Raw extraction ·"]
      raw["Deterministic scripts<br/>(0 AI tokens)"]
    end
    subgraph Phase3["Phase 3\n· Layered knowledge ·"]
      L1["L1 — Manifest"]
      L4["L4 — Cross-cutting"]
      L7["L7 — Forensics"]
    end
    subgraph Phase4["Phase 4\n· Reasoning atoms ·"]
      atoms["1,200+ atoms<br/>9 types &middot; 6 tags"]
    end
    subgraph Phase5["Phase 5\n· CR pipeline ·"]
      cr["CR &rarr; HLD &rarr; LLD<br/>&rarr; impact &rarr; tests"]
    end

    src["Legacy backend<br/>~18M lines<br/>C / Pro*C / shell"] --> Phase1
    Phase1 --> Phase2 --> Phase3 --> Phase4 --> Phase5
    L1 --- L4 --- L7

    classDef phaseHead fill:#eef2ff,stroke:#6366f1,color:#312e81;
    classDef src fill:#fef3c7,stroke:#f59e0b,color:#78350f;
    class arch,raw,L1,L4,L7,atoms,cr phaseHead;
    class src src;
`;
