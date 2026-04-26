/**
 * Site-overview diagram for the homepage.
 *
 * Three columns: legacy backend on the left, the platform & knowledge layer
 * in the middle, modernised surface on the right. Deliberately abstract --
 * no client codenames, no internal service names -- so it can sit on the
 * landing page as a one-look summary of what I work on.
 */
export const overviewMermaid = `flowchart LR
  subgraph Legacy["Legacy backend"]
    L1["18M lines<br/>C / Pro*C / shell"]
    L2["Oracle Tuxedo<br/>conversational services"]
    L3["WebFOCUS<br/>analytics scripts"]
  end

  subgraph Platform["Platform & knowledge layer"]
    P1["Lex/Yacc<br/>transpiler"]
    P2["Atlas<br/>knowledge engine"]
    P3["In-house<br/>orchestrator"]
  end

  subgraph Modern["Modern surface"]
    M1["gRPC services<br/>HAProxy + Consul"]
    M2["Reasoning atoms<br/>1,200+ truth-grounded"]
    M3["XFocus / Pandas<br/>500+ scripts"]
  end

  L1 --> P2
  L2 --> P1 --> M1
  L3 --> P3 --> M3
  P2 --> M2
  P2 -.augments.-> P1
  P2 -.augments.-> P3

  classDef legacy fill:#fef3c7,stroke:#f59e0b,color:#78350f;
  classDef platform fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef modern fill:#dcfce7,stroke:#10b981,color:#064e3b;

  class L1,L2,L3 legacy;
  class P1,P2,P3 platform;
  class M1,M2,M3 modern;
`;
