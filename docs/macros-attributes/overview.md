---
title: Overview
slug: /macros-attributes
---

An pro! module is the module that is flagged by `#[pro::contract]` containing all the pro! definitions.
All pro! attributes are available to specify inside an pro! module.

## Merging Attributes

It is possible to merge attributes that share a common flagged entity.
The example below demonstrates this for a payable message with a custom selector.

```rust
#[pro(message)]
#[pro(payable)]
#[pro(selector = "0xCAFEBABE")]
pub fn transfer(&mut self, from: AccountId, to: AccountId, value: Balance) -> Result<(), Error> {
    // actual implementation
}
```
We can also write the above pro! message definition in the following way:
```rust
#[pro(message, payable, selector = "0xCAFEBABE")]
pub fn transfer(&mut self, from: AccountId, to: AccountId, value: Balance) -> Result<(), Error> {
    // actual implementation
}
```


