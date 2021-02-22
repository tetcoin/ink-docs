---
title: "#[pro(impl)]"
slug: /macros-attributes/impl
---

This attribute supports a niche case that is rarely needed.

Can be applied on pro! implementation blocks in order to make pro! aware
of them. This is useful if such an implementation block doesn't contain
any other pro! attributes, so it would be flagged by pro! as a Rust item.
Adding `#[pro(impl)]` on such implementation blocks makes them treated
as pro! implementation blocks thus allowing to access the environment
etc.

Note that pro! messages and constructors still need to be explicitly
flagged as such.

## Example

An implementation block can be defined as a trait implementation
for the pro! storage struct using the `#[pro(impl)]` annotation ‒ even
if none of its interior items have any pro! specific attributes on them:

```rust
use core::convert::TryFrom;
use pro_lang_ir as ir;

#[pro::contract]
mod my_module {
    #[pro(storage)]
    pub struct MyStorage {
        /* storage fields */
    }

    #[pro(impl)]
    impl MyStorage {
        fn my_method(&self) -> i32 {
            /* method implementation */
        }
    }

    impl MyStorage {
      #[pro(constructor)]
      pub fn my_constructor() -> Self {
          /* constructor implementation */
      }

      #[pro(message)]
      pub fn my_message(&self) {
          /* message implementation */
      }
    }
}
```
