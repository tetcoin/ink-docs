---
title: "#[pro(storage)]"
slug: /macros-attributes/storage
---

Applicable on `struct` definitions. 

Applied on `struct` types in order to flag them for being
the contract's storage definition.
There can only be one pro! storage definition per contract.

There must be exactly one `#[pro(storage)]` struct.

This struct defines the layout of the storage that the pro! smart contract operates on.
The user is able to use a variety of built-in facilities, combine them in various ways
or even provide their own implementations of storage data structures.

For more information visit the `pro_storage` crate documentation.

## Example


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
        pub fn construct() -> Self { Flipper { value: false } }

        #[pro(message)]
        pub fn message(&self) {}
    }
}
```
