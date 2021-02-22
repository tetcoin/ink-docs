---
title: "#[pro(payable)]"
slug: /macros-attributes/payable
---

Applicable to pro! messages.

Allows receiving value as part of the call of the pro! message.
pro! constructors are implicitly payable, due to the initial endowment which a contract requires.

An pro! message by default will reject calls that additional fund the smart contract.
Authors of pro! smart contracts can make an pro! message payable by adding the `payable`
flag to it. An example below:

Note that pro! constructors are always implicitly payable and thus cannot be flagged
as such.

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
        #[pro(payable)] // You can either specify payable out-of-line.
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        /// Returns the current value.
        #[pro(message, payable)] // or specify payable inline.
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
```

## Example

```rust
#[pro(message, payable)]
pub fn pay_me(&self) {
    let _transferred = self.env().transferred_balance();
}
```

See the [`examples/contract-transfer`](https://github.com/tetcoin/pro/blob/master/examples/contract-transfer/lib.rs) contract for a more extensive example.
