---
title: Storing Values
slug: /basics/storing-values
---

Here is how you store some simple values in storage:

```rust
#[pro(storage)]
pub struct MyContract {
    // Store a bool
    my_bool: bool,
    // Store some number
    my_number: u32,
}
/* --snip-- */
```

## Supported Types

Contracts may store types that are encodable and decodable with [Parity Codec](https://github.com/paritytech/parity-codec) which includes the most common types such as `bool`, `u{8,16,32,64,128}`, `i{8,16,32,64,128}`, `String`, tuples, and arrays.

pro! provides smart contracts Substrate specific types like `AccountId`, `Balance`, and `Hash` as if they were primitive types. Also pro! provides storage types for more elaborate storage interactions through the storage module:

```rust
use pro_storage::collections::{Vec, HashMap, Stash, Bitvec};
```

Here is an example of how you would store an `AccountId` and `Balance`:

```rust
// We are importing the default pro! types
use pro_lang as pro;

#[pro::contract]
mod MyContract {

    // Our struct will use those default pro! types
    #[pro(storage)]
    pub struct MyContract {
        // Store some AccountId
        my_account: AccountId,
        // Store some Balance
        my_balance: Balance,
    }
    /* --snip-- */
}
```

You can find all the supported Substrate types in [`crates/storage/src/lib.rs`](https://github.com/tetcoin/pro/blob/master/crates/storage/src/lib.rs).

## Initializing Storage in Constructors

Constructors are how values get initialized.
Every pro! smart contract must have a constructor which is run once when a contract is created. pro! smart contracts can have multiple constructors:

```rust
use pro_lang as pro;

#[pro::contract]
mod mycontract {

    #[pro(storage)]
    pub struct MyContract {
        number: u32,
    }

    impl MyContract {
        /// Constructor that initializes the `u32` value to the given `init_value`.
        #[pro(constructor)]
        pub fn new(init_value: u32) -> Self {
            Self {
                number: init_value,
            }
        }

        /// Constructor that initializes the `u32` value to the `u32` default.
        #[pro(constructor)]
        pub fn default() -> Self {
            Self {
                number: Default::default(),
            }
        }
    /* --snip-- */
    }
}
```
