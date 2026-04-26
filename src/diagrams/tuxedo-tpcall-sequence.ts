export const tuxedoTpcallSequenceMermaid = `sequenceDiagram
    autonumber
    participant Client as Legacy C client
    participant Shim as Protocol Shim
    participant LB as HAProxy + Consul
    participant Svc as gRPC Service

    Client->>Shim: tpcall("CUSTOMER.GET_MEMO", FBuffer)
    Note right of Shim: Lex/Yacc-generated codec<br/>flat buffer &rarr; Protobuf
    Shim->>Shim: Encode flat buffer to<br/>customer.GetMemoRequest
    Shim->>LB: gRPC unary call<br/>(routing key = service name)
    LB-->>Svc: forward to healthy<br/>backend (round-robin)
    Svc-->>LB: customer.GetMemoResponse
    LB-->>Shim: gRPC response
    Shim->>Shim: Decode Protobuf to<br/>flat buffer (preserve nulls)
    Shim-->>Client: TPSUCCESS, output FBuffer

    Note over Client,Svc: Conversational variant: HAProxy session<br/>stickiness keeps tpconnect/tpsend/tprecv on the<br/>same backend until tpdiscon.
`;
