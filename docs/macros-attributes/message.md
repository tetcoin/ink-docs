---
title: "#[pro(message)]"
slug: /macros-attributes/message
---

Applicable to methods.
 
Flags a method for the pro! storage struct as message making it available to the API for calling the contract. 

Note that all public functions must use the `#[pro(message)]` attribute

There must be at least one `#[pro(message)]` defined method.

Methods flagged with `#[pro(message)]` are special in that they are dispatchable
upon contract invocation. The set of pro! messages defined for an pro! smart contract
define its API surface with which users are allowed to interact.

An pro! smart contract can have multiple such pro! messages defined.

An pro! message with a `&self` receiver may only read state whereas an pro! message
with a `&mut self` receiver may mutate the contract's storage.

```rust
#[pro(message)]
pub fn purely_reading(&self, from: AccountId) {
    // actual implementation
}

#[pro(message)]
pub fn mutates_storage(&mut self, from: AccountId) {
    // actual implementation
}
```


## Messages Return Value

The return value of a message needs to implement `scale::Encode`.

It is notable that the collections under `pro_storage` ‒ such as e.g. `Vec` or `HashMap` ‒
don't implement `scale::Encode`. This means you can't just return a `Vec` from an pro! message.
This restriction is intentional ‒ returning a complete data structure with a potentially unbounded
content is an anti-pattern for smart contracts. Just think about the unpredicatble gas costs.

If you _really really_ need to return a data structure in its entirety then use the ones from
`pro_prelude` (e.g. `pro_prelude::vec::Vec`). Those implement `scale::Encode`.


## Example

Given the `Flipper` contract definition above we add some `#[pro(message)]` definitions
as follows:

```rust
use pro_lang as pro;

#[pro::contract]
mod flipper {
    #[pro(storage)]
    pub struct Flipper {
        value: bool,
    }

    impl Flipper {

        #[pro(constructor)]
        pub fn new(initial_value: bool) -> Self {
            Flipper { value: false }
        }

        /// Flips the current value.
        #[pro(message)]
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        /// Returns the current value.
        #[pro(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
```
