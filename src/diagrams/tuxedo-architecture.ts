export const tuxedoArchitectureMermaid = `flowchart LR
    legacyClients["Legacy Tuxedo<br/>clients"]
    shim["Protocol Shim<br/>flat buffer to Protobuf"]
    haproxy["HAProxy<br/>front-door"]
    grpcServices["gRPC Services<br/>any language"]
    consul["Consul<br/>service discovery"]
    consulTpl["Consul Template<br/>config sync"]
    nomad["Nomad<br/>orchestrator"]
    kafka["Kafka<br/>events"]

    legacyClients -->|"flat buffer"| shim
    shim -->|"gRPC + Protobuf"| haproxy
    haproxy --> grpcServices
    grpcServices -->|register| consul
    consul -.->|health + addresses| consulTpl
    consulTpl -.->|writes| haproxy
    nomad -.->|deploy + scale| grpcServices
    grpcServices --> kafka
`;
