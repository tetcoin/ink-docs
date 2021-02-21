---
title: "#[pro(selector = \"…\")]"
slug: /macros-attributes/selector
---

Applicable to pro! messages and pro! constructors.

By default pro! creates a selector for each message and constructor.
This is necessary since the contract is compiled to a Wasm blob and functions are invoked by invoking the
selector, which identifies a method ‒ method names are no longer available in these underlying layers.

Using this attribute it is possible to speficy a concrete dispatch selector for the flagged entity. This allows a contract author to precisely control the selectors of their APIs making it possible to rename their API without breakage.

A selector must consist of four bytes in hex (e.g. `selector = "0xCAFEBABE"`).

## Examples

```rust
impl MyStorage {
    #[pro(message, selector = "0xDEADBEEF")]
    fn my_message(&self) {}
}
```
… then the selector of `my_message` is simply `0xDEADBEEF` since it overrides
the composed selector.

## Controlling the messages selector

Every pro! message and pro! constructor has a unique selector with which the
message or constructor can be uniquely identified within the pro! smart contract.
These selectors are mainly used to drive the contract's dispatch upon calling it.

An pro! smart contract author can control the selector of an pro! message or pro!
constructor using the `selector` flag. An example is shown below:

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
        #[pro(selector = "0xDEADBEEF")] // Works on constructors as well.
        pub fn new(initial_value: bool) -> Self {
            Flipper { value: false }
        }

        /// Flips the current value.
        #[pro(message)]
        #[pro(selector = "0xCAFEBABE")] // You can either specify selector out-of-line.
        pub fn flip(&mut self) {
            self.value = !self.value;
        }
        
        /// Returns the current value.
        #[pro(message, selector = "0xFEEDBEEF")] // or specify selector inline.
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
```
