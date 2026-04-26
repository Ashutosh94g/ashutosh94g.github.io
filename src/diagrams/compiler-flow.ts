export const compilerFlowMermaid = `flowchart LR
    src["Source<br/>(.c / .y / .l / .focexec)"]
    lex["Lex<br/>tokenizer"]
    yacc["Yacc<br/>grammar + actions"]
    ast["Parse tree /<br/>AST"]
    emit["Emitter<br/>(per use case)"]
    out1["Prototype block<br/>(__protos.h)"]
    out2["XFocus Python<br/>(Pandas / NumPy)"]

    src --> lex --> yacc --> ast --> emit
    emit --> out1
    emit --> out2

    classDef src fill:#fef3c7,stroke:#f59e0b,color:#78350f;
    classDef pipe fill:#dcfce7,stroke:#10b981,color:#064e3b;
    classDef out fill:#e0e7ff,stroke:#6366f1,color:#312e81;

    class src src;
    class lex,yacc,ast,emit pipe;
    class out1,out2 out;
`;
