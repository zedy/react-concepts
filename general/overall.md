### Folder architecture
Concider writting a module based app instead of a classic presentational/functional component based one.

This will remove any overhead and keep the code as clean as you can make it. It will allow you to import any component you need as a module (`import { Input } '@module/common';`) instead of using absolute path to the components itself, regardless where or how deep in any component you are.

```
└── modules/
    ├── common/
    │   ├── Form/
    │   │   ├── Input.tsx
    │   │   └── Checkbox.tsx    
    │   └── Table/
    │       ├── Table.tsx
    │       ├── TableRow.tsx
    │       └── TableHeader.tsx      
    └── dashboard/
        ├── components/
        │   ├── Table.tsx [extended from common]
        ├── utils/
        │   ├── string-parser.ts
        │   └── address-formatter.ts
        ├── core/
        │   └── Layout.tsx
        ├── hooks/
        │   └── useDashboard.tsx
        └── index.tsx
```