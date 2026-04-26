export const atlasAtomTaxonomyMermaid = `flowchart TB
    root["Reasoning Atom"]

    subgraph structural["Structural — what is wired"]
      TOD["TOD<br/>Table-of-Data"]
      CVD["CVD<br/>Caller-of"]
      VVC["VVC<br/>Variable-validates-Constant"]
    end

    subgraph behavioral["Behavioral — what runs"]
      OPR["OPR<br/>Operation"]
      STR["STR<br/>State-Transition"]
      SDR["SDR<br/>Side-effect / DB write"]
    end

    subgraph contextual["Contextual — where it lives"]
      BIA["BIA<br/>Business-Intent"]
      TDA["TDA<br/>Tribal-Domain"]
      ECA["ECA<br/>External-Contract"]
    end

    root --> structural
    root --> behavioral
    root --> contextual

    tags["Enrichment tags<br/>confidence &middot; provenance &middot; freshness<br/>blast-radius &middot; risk &middot; reviewer"]
    structural --- tags
    behavioral --- tags
    contextual --- tags

    classDef rootNode fill:#1e1b4b,stroke:#312e81,color:#e0e7ff;
    classDef structural fill:#dcfce7,stroke:#10b981,color:#064e3b;
    classDef behavioral fill:#dbeafe,stroke:#3b82f6,color:#1e3a8a;
    classDef contextual fill:#fef3c7,stroke:#f59e0b,color:#78350f;
    classDef tagsNode fill:#f3e8ff,stroke:#a855f7,color:#581c87;

    class root rootNode;
    class TOD,CVD,VVC structural;
    class OPR,STR,SDR behavioral;
    class BIA,TDA,ECA contextual;
    class tags tagsNode;
`;
