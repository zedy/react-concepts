### Ref Forwarding
Don't pass ref as a prop to custom components use `forwardRef`

    import { forwardRef } from 'react';

    const MyInput = forwardRef(function MyInput(props, ref) {
      // ...
    });

## Components
Here we'll talk about component specific practices.

### Abstraction, reusability and specialization.
Prefer writting deep specialized components instead of over extending shallow components. The reason behind this is so as to keep the code clean and concise (not because shallow components are an anti-pattern). Also reusability and readability. 

```
<Button
  icon={...}
  iconText={...}
  iconColor={...}
  text={...}
  isMain={...}
  isDisabled={...}
  primaryClass={...}
  secondaryClass={...}
  ...
/>
```

Create a specialized `IconButton` with only the bare minimum of exposed props so as not to overextend.

Also try to abstraction extend the functionallity as much as you can. This will give you a much more lean interface. (less is more)

```
<IconButton
  icon={<SaveIcon {...props} />}
  text={'...'}
  isDisabled={...}
/>
```

### Don't overuse `useState` (leverage `useReducer`)
Let's say we have a `Provider` which will keep track of several things regarding a complex signup process accross multiple steps. And you want to keep track of them using **useState** (which is perfectly fine, up until a certain point).

```
const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  address: '',
  eyeColor: '',
  sex: '',
  ...
};
export const SignUpContext = React.createContext({});

export const SignUpContextProvider = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  ...
  ...

  const provide = {
    name,
    setName,
    email,
    setEmail,
    .
    .
    .
  };

  return (
    <SignUpContextProvider.Provider value={provide}>
      {props.children}
    </SignUpContextProvider.Provider>
  );
};
```
This could get even more cluttered if we were to write the same component in typescript (interfaces/types/props...).

There is nothing wrong with using `useState` and it's perfectly valid to do so but only if you don't overextend. Imagine if we had 20+ props needed to be exposed via the provider pattern.

Now if we leverage the `useReducer` and split the logic into segments it will help us keep track of thing much easier, reduce overhead in the components, keep the clean cleaner and more manageable.

```
const INITIAL_STATE = {
  personal: {
    name: '',        
    eyeColor: '',
    sex: '',
    ...
  },
  contact: {
    email: '',
    phone: '',
    address: '',
    ...
  },
  ...
};
export const SignUpContext = React.createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'personal':
      return {
        ...state, // old state
        ...action.data, // new state
      };
    case 'contact':
    ...

    default:
      return state;
  }
};

export const SignUpContextProvider: FC = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const provide: ContextProps = {
    state,
    dispatch,
  };

  return (
    <SignUpContextProvider.Provider value={provide}>
      {props.children}
    </SignUpContextProvider.Provider>
  );
};
```
