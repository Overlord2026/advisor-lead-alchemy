
# Shared UI Components

This directory contains shared UI components that can be used across the application.

## Usage

Import components from the shared UI package:

```tsx
import { Button, Label, Input } from '@/shared/ui';

// Use in your component
function MyForm() {
  return (
    <div>
      <Label htmlFor="name">Name</Label>
      <Input id="name" />
      <Button>Submit</Button>
    </div>
  );
}
```

## Adding New Components

1. Create a new file in the `components` directory
2. Export the component from the file
3. Add the export to the `components/index.ts` file
