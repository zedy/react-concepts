### Ref Forwarding
Don't pass ref as a prop to custom components use `forwardRef`

    import { forwardRef } from 'react';

    const MyInput = forwardRef(function MyInput(props, ref) {
      // ...
    });

