
# Path Alias Setup

To make importing from the shared UI package cleaner, you can add a path alias to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["./src/shared/*"]
    }
  }
}
```

Then you can import components like:

```tsx
import { Button } from '@shared/ui';
```

Since we can't modify the tsconfig.json file directly, you can continue using the existing import pattern:

```tsx
import { Button } from '@/shared/ui';
```
