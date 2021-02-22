---
title: Trait Definitions
slug: /basics/trait-definitions
---

Through the `#[pro::trait_definition]` proc. macro it is now possible to define your very own trait definitions that are then implementable by pro! smart contracts.

This allows to define shared smart contract interfaces to different concrete implementations.
Note that this pro! trait definition can be defined anywhere, even in another crate!

See our [`ERC20-Trait example contract`](https://github.com/tetcoin/pro/blob/master/examples/trait-erc20/lib.rs) 
for an elaborate example which uses trait definitions.

### Example

Defined in the `base_erc20.rs` module.

```rust
use pro_lang as pro;

#[pro::trait_definition]
pub trait BaseErc20 {
    /// Creates a new ERC-20 contract and initializes it with the initial supply for the instantiator.
    #[pro(constructor)]
    fn new(initial_supply: Balance) -> Self;

    /// Returns the total supply.
    #[pro(message)]
    fn total_supply(&self) -> Balance;

    /// Transfers `amount` from caller to `to`.
    #[pro(message, payable)]
    fn transfer(&mut self, to: AccountId, amount: Balance);
}
```

An pro! smart contract definition can then implement this trait definition as follows:

```rust
use pro_lang as pro;

#[pro::contract]
mod erc20 {
    use base_erc20::BaseErc20;

    #[pro(storage)]
    pub struct Erc20 {
        total_supply: Balance,
        // more fields ...
    }

    impl BaseErc20 for Erc20 {
        #[pro(constructor)]
        fn new(initial_supply: Balance) -> Self {
            // implementation ...
        }

        #[pro(message)]
        fn total_supply(&self) -> Balance {
            // implementation ...
        }

        #[pro(message, payable)]
        fn transfer(&mut self, to: AccountId, amount: Balance) {
            // implementation ...
        }
    }
}
```

Calling the above `Erc20` explicitely through its trait implementation can be done just as if it was normal Rust code:

```rust
// --- Instantiating the ERC-20 contract:
//
let mut erc20 = <Erc20 as BaseErc20>::new(1000);
// --- Is just the same as:
use base_erc20::BaseErc20;
let mut erc20 = Erc20::new(1000);

// --- Retrieving the total supply:
//
assert_eq!(<Erc20 as BaseErc20>::total_supply(&erc20), 1000);
// --- Is just the same as:
use base_erc20::BaseErc20;
assert_eq!(erc20.total_supply(), 1000);
```

There are still many limitations to pro! trait definitions and trait implementations.
For example it is not possible to define associated constants or types or have default implemented methods.
These limitations exist because of technical intricacies, however, please expect that many of those will be tackled in future pro! releases.




Marks trait definitions to pro! as special pro! trait definitions.

There are some restrictions that apply to pro! trait definitions that
this macro checks. Also pro! trait definitions are required to have specialized
structure so that the main [`#[pro::contract]`](`macro@crate::contract`) macro can
properly generate code for its implementations.

# Example: Definition

```rust
use pro_lang as pro;
type Balance = <pro_env::DefaultEnvironment as pro_env::Environment>::Balance;

#[pro::trait_definition]
pub trait Erc20 {
    /// Constructs a new ERC-20 compliant smart contract using the initial supply.
    #[pro(constructor)]
    fn new(initial_supply: Balance) -> Self;

    /// Returns the total supply of the ERC-20 smart contract.
    #[pro(message)]
    fn total_supply(&self) -> Balance;

    // etc.
}
```

# Example: Implementation

Given the above trait definition you can implement it as shown below:

```rust
use pro_lang as pro;

#[pro::contract]
mod base_erc20 {
    /// We somehow cannot put the trait in the doc-test crate root due to bugs.
    #[pro_lang::trait_definition]
    pub trait Erc20 {
        Constructors a new ERC-20 compliant smart contract using the initial supply.
        #[pro(constructor)]
        fn new(initial_supply: Balance) -> Self;

        /// Returns the total supply of the ERC-20 smart contract.
        #[pro(message)]
        fn total_supply(&self) -> Balance;
    }

    #[pro(storage)]
    pub struct BaseErc20 {
        total_supply: Balance,
        // etc ..
    }

    impl Erc20 for BaseErc20 {
        #[pro(constructor)]
        fn new(initial_supply: Balance) -> Self {
            Self { total_supply: initial_supply }
        }

        /// Returns the total supply of the ERC-20 smart contract.
        #[pro(message)]
        fn total_supply(&self) -> Balance {
            self.total_supply
        }

        // etc ..
    }
}
```


