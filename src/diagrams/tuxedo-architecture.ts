export const tuxedoArchitectureMermaid = `flowchart LR
    legacyClients["Legacy Tuxedo<br/>clients (C / PowerBuilder)"]
    shim["Protocol Shim<br/>flat buffer ↔ Protobuf"]
    haproxy["HAProxy<br/>front door"]
    grpcServices["gRPC Services<br/>any language"]
    consul["Consul<br/>service discovery"]
    consulTpl["Consul Template<br/>config sync"]
    nomad["Nomad<br/>orchestrator"]
    orchestrator["In-house Orchestrator<br/>Spring Boot brain"]
    kafka["Kafka<br/>events"]

    legacyClients -->|"flat buffer / TPCALL"| shim
    shim -->|"gRPC + Protobuf"| haproxy
    haproxy --> grpcServices
    grpcServices -->|register / heartbeat| consul
    consul -.->|health + addresses| consulTpl
    consulTpl -.->|writes| haproxy
    nomad -.->|deploy + scale| grpcServices
    orchestrator -.->|process management<br/>start / stop / restart| grpcServices
    grpcServices --> kafka

    classDef legacy fill:#fef3c7,stroke:#f59e0b,color:#78350f;
    classDef shimNode fill:#e0e7ff,stroke:#6366f1,color:#312e81;
    classDef infra fill:#f1f5f9,stroke:#94a3b8,color:#334155;

    class legacyClients legacy;
    class shim shimNode;
    class haproxy,consul,consulTpl,nomad,orchestrator infra;
`;
