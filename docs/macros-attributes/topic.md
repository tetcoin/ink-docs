---
title: "#[pro(topic)]"
slug: /macros-attributes/topic
---

Applied on fields of pro! event types to indicate that they are topics.

Tells the pro! codegen to provide a topic hash for the given field. Every pro! event can only have a limited number of such topic field.
The semnatics are similar to indexed event arguments in Solidity. 

## Example

```rust
#[pro(event)]
pub struct Transferred {
    #[pro(topic)]
    from: Option<AccountId>,

    #[pro(topic)]
    to: Option<AccountId>,

    amount: Balance
}
```
