---
title: Cross-Contract Calling
slug: /basics/cross-contract-calling
---

In pro! contracts it is possible to call pro! messages and pro! constructors. So pro! constructors allow
delegation and pro! messages can easily call other pro! messages.
Given another pro! contract like, we can call any of its functions.

See our [`delegator example contract`](https://github.com/tetcoin/pro/blob/master/examples/delegator/lib.rs) 
for an elaborate example which uses cross-contract calling.

### How it Works

In order to deploy the delegator smart contract we first
have to manually put the code of the other contract, receive
its code hash from the signalled event and put their code hash
into our calling smart contract.

The calling contract looks like this:

```rust
use pro_storage::Lazy;
use other_contract::OtherContract;

//--snip--
#[pro(storage)]
struct MyContract {
    /// The other contract.
    other_contract: Lazy<OtherContract>,
}

impl MyContract {
    /// Instantiate `MyContract with the given
    /// sub-contract codes and some initial value.
    #[pro(constructor)]
    pub fn new(
        other_contract_code_hash: Hash,
    ) -> Self {
        let other_contract = OtherContract::new(1337)
            .endowment(total_balance / 4)
            .code_hash(other_contract_code_hash)
            .instantiate()
            .expect("failed at instantiating the `OtherContract` contract");
        Self {
            other_contract
        }
    }

    /// Calls the other contract.
    #[pro(message)]
    pub fn call_other_contract(&self) -> i32 {
        self.other_contract.get_value()
    }
}
//--snip--
```

It's `Cargo.toml` contains
```toml
other_contract = { path = "other_contract", default-features = false, features = ["pro-as-dependency"] }
```

The `other_contract/Cargo.toml` contains this:

```toml
[features]
pro-as-dependency = []
```

Tells the pro! code generator to **always** or **never**
compile the smart contract as if it was used as a dependency of another pro!
smart contract.

The `other_contract/lib.rs`:

```rust
#[pro::contract]
pub mod other_contract {
    /// Storage for the other contract.
    #[pro(storage)]
    pub struct OtherContract {
        value: i32,
    }

    impl OtherContract {
        /// Initializes the contract.
        #[pro(constructor)]
        pub fn new(value: i32) -> Self {
            Self { value }
        }

        /// Returns the current state.
        #[pro(message)]
        pub fn get_value(&self) -> i32 {
            self.value
        }
    }
}
```
