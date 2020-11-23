---
title: "#[ink(message)]"
slug: /ink-macros-attributes/message
---

Applicable to methods.
 
Flags a method for the ink! storage struct as message making it available to the API for calling the contract. 

Note that all public functions must use the `#[ink(message)]` attribute

There must be at least one `#[ink(message)]` defined method.

Methods flagged with `#[ink(message)]` are special in that they are dispatchable
upon contract invocation. The set of ink! messages defined for an ink! smart contract
define its API surface with which users are allowed to interact.

An ink! smart contract can have multiple such ink! messages defined.

An ink! message with a `&self` receiver may only read state whereas an ink! message
with a `&mut self` receiver may mutate the contract's storage.

```rust
#[ink(message)]
pub fn purely_reading(&self, from: AccountId) {
    // actual implementation
}

#[ink(message)]
pub fn mutates_storage(&mut self, from: AccountId) {
    // actual implementation
}
```

## Example

Given the `Flipper` contract definition above we add some `#[ink(message)]` definitions
as follows:

```rust
use ink_lang as ink;

#[ink::contract]
mod flipper {
    #[ink(storage)]
    pub struct Flipper {
        value: bool,
    }

    impl Flipper {

        #[ink(constructor)]
        pub fn new(initial_value: bool) -> Self {
            Flipper { value: false }
        }

        /// Flips the current value.
        #[ink(message)]
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        /// Returns the current value.
        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
```


## Messages Return Value

TODO