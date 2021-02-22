---
title: "#[pro(namespace = \"…\")]"
slug: /macros-attributes/namespace
---

Applicable to pro! trait implementation blocks.

Applied on pro! trait implementation blocks to disambiguate other trait
implementation blocks with equal names.

## Example

```rust
#[pro(namespace = "my_namespace")]
impl MyTrait for MyStorage {
    #[pro(message)]
    fn my_message(&self) {}
}
```
    
This changes the resulting selectors of all the pro! messages and pro! constructors within the trait implementation.
Thus allowing disambiguation between trait implementations with overlapping message or constructor names.
