---
title: "#[pro(constructor)]"
slug: /macros-attributes/constructor
---

Applicable to a method.

Flags a method (or multiple methods) for the pro! storage struct as constructor making it available to the API for instantiating the contract.

There must be at least one `#[pro(constructor)]` defined method.

Methods flagged with `#[pro(constructor)]` are special in that they are dispatchable
upon contract instantiation. A contract may define multiple such constructors which
allow users of the contract to instantiate a contract in multiple different ways.


## Example

```rust
use pro_lang as pro;

#[pro::contract]
mod erc20 {
    #[pro(storage)]
    pub struct Erc20 { ... }

    impl Erc20 {
        #[pro(constructor)]
        pub fn new(initial_supply: Balance) -> Self { .. }

        #[pro(constructor)]
        pub fn total_supply(&self) -> Balance { .. }

        // etc.
    }
}
```
