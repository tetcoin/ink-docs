---
title: "#[pro::contract]"
slug: /macros-attributes/contract
---

This macro is the entry point for writing pro! smart contracts.

If you are a beginner trying to learn pro! we recommend you to check out
our extensive [pro! workshop](https://substrate.dev/substrate-contracts-workshop/#/).

**Note:** In all below examples we will be using `pro_lang` crate aliased as just `pro`.
You can do this yourself by adding the following line to your code:
`use pro_lang as pro;`

# Description

The macro does analysis on the provided smart contract code and generates
proper code.

pro! smart contracts can compile in several different modes.
There are two main compilation modes using either
- on-chain mode: `no_std` + WebAssembly as target
- off-chain mode: `std`

We generally use the on-chain mode for actual smart contract deployment
whereas we use the off-chain mode for smart contract testing using the
off-chain environment provided by the `pro_env` crate.

# Usage

## Header Arguments

The `#[pro::contract]` macro can be provided with some additional comma-separated
header arguments:

### `dynamic_storage_allocator: bool`

Tells the pro! code generator to allow usage of pro!'s built-in dynamic
storage allocator.
 - `true`: Use the dynamic storage allocator provided by pro!.
 - `false`: Do NOT use the dynamic storage allocator provided by pro!.

This feature is generally only needed for smart contracts that try to model
their data in a way that contains storage entites within other storage
entities.

Contract writers should try to write smart contracts that do not depend on the
dynamic storage allocator since enabling it comes at a cost of increased Wasm
file size. Although it will enable interesting use cases. Use it with care!

An example for this is the following type that could potentially be used
within a contract's storage struct definition:
```rust
// A storage vector of storage vectors.
use pro_storage as storage;
type VectorOfVectors = storage::Vec<storage::Vec<i32>>;
```

**Usage Example:**
```rust
use pro_lang as pro;

#[pro::contract(dynamic_storage_allocator = true)]
mod my_contract {
    #[pro(storage)]
    pub struct MyStorage;
    
    impl MyStorage {
        #[pro(constructor)]
        pub fn construct() -> Self { MyStorage {} }
        
        #[pro(message)]
        pub fn message(&self) {}
    }
    // ...
}
```

**Default value:** `false`

### `compile_as_dependency: bool`

Tells the pro! code generator to **always** or **never**
compile the smart contract as if it was used as a dependency of another pro!
smart contract.

Normally this flag is only really useful for pro! developers who
want to inspect code generation of pro! smart contracts.
The author is not aware of any particular practical use case for users that
makes use of this flag but contract writers are encouraged to disprove this.

Note that it is recommended to make use of the built-in crate feature
`pro-as-dependency` to flag smart contract dependencies listed in a contract's
`Cargo.toml` as actual dependencies to pro!.

**Usage Example:**
```rust
use pro_lang as pro;

#[pro::contract(compile_as_dependency = true)]
mod my_contract {
    #[pro(storage)]
    pub struct MyStorage;
    
    impl MyStorage {
        #[pro(constructor)]
        pub fn construct() -> Self { MyStorage {} }
        
        #[pro(message)]
        pub fn message(&self) {}
    }
    // ...
}
```

**Default value:** Depends on the crate feature propagation of `Cargo.toml`.

### `env: impl Environment`

Tells the pro! code generator which environment to use for the pro! smart contract.
The environment must implement the `Environment` (defined in `pro_env`) trait and provides
all the necessary fundamental type definitions for `Balance`, `AccountId` etc.

When using a custom `Environment` implementation for a smart contract all types
that it exposes to the pro! smart contract and the mirrored types used in the runtime
must be aligned with respect to SCALE encoding and semantics.

**Usage Example:**

Given a custom `Environment` implementation:
```rust
pub struct MyEnvironment;

impl pro_env::Environment for MyEnvironment {
    const MAX_EVENT_TOPICS: usize = 3;
    
    type AccountId = u64;
    type Balance = u128;
    type Hash = [u8; 32];
    type Timestamp = u64;
    type BlockNumber = u32;
    type ChainExtension = ::pro_env::NoChainExtension;
}
```
A user might implement their pro! smart contract using the above custom `Environment`
implementation as demonstrated below:

```rust
use pro_lang as pro;
#[pro::contract(env = MyEnvironment)]
mod my_contract {
    pub struct MyEnvironment;
   
    impl pro_env::Environment for MyEnvironment {
        const MAX_EVENT_TOPICS: usize = 3;
        type AccountId = u64;
        type Balance = u128;
        type Hash = [u8; 32];
        type Timestamp = u64;
        type BlockNumber = u32;
        type ChainExtension = ::pro_env::NoChainExtension;
    }
    
    #[pro(storage)]
    pub struct MyStorage;
    
    impl MyStorage {
        #[pro(constructor)]
        pub fn construct() -> Self { MyStorage {} }
        
        #[pro(message)]
        pub fn message(&self) {}
    }
    // ...
}
```

**Default value:** `DefaultEnvironment` defined in `pro_env` crate.

## Anaylsis

The `#[pro::contract]` macro fully analyses its input smart contract
against invalid arguments and structure.

Some example rules include but are not limited to:

- There must be exactly one `#[pro(storage)]` struct.

     This struct defines the layout of the storage that the pro! smart contract operates on.
     The user is able to use a variety of built-in facilities, combine them in various ways
     or even provide their own implementations of storage data structures.

     For more information visit the `pro_storage` crate documentation.

     **Example:**

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

- There must be at least one `#[pro(constructor)]` defined method.

     Methods flagged with `#[pro(constructor)]` are special in that they are dispatchable
     upon contract instantiation. A contract may define multiple such constructors which
     allow users of the contract to instantiate a contract in multiple different ways.

     **Example:**

     Given the `Flipper` contract definition above we add an `#[pro(constructor)]`
     as follows:

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
  
             #[pro(message)]
             pub fn message(&self) {}
         }
     }
     ```

- There must be at least one `#[pro(message)]` defined method.

     Methods flagged with `#[pro(message)]` are special in that they are dispatchable
     upon contract invocation. The set of pro! messages defined for an pro! smart contract
     define its API surface with which users are allowed to interact.

     An pro! smart contract can have multiple such pro! messages defined.

     **Note:**

     - An pro! message with a `&self` receiver may only read state whereas an pro! message
       with a `&mut self` receiver may mutate the contract's storage.

     **Example:**

     Given the `Flipper` contract definition above we add some `#[pro(message)]` definitions
     as follows:

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
             pub fn flip(&mut self) {
                 self.value = !self.value;
             }

             /// Returns the current value.
             #[pro(message)]
             pub fn get(&self) -> bool {
                 self.value
             }
         }
     }
     ```

     **Payable Messages:**

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
             #[pro(message, payable)] // ... or specify payable inline.
             pub fn get(&self) -> bool {
                 self.value
             }
         }
     }
     ```

     **Controlling the messages selector:**

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
             #[pro(message, selector = "0xFEEDBEEF")] // ... or specify selector inline.
             pub fn get(&self) -> bool {
                 self.value
             }
         }
     }
     ```

## Interacting with the Contract Executor

The `pro_env` crate provides facitilies to interact with the contract executor that
connects pro! smart contracts with the outer world.

For example it is possible to query the current call's caller via:

```rust
use pro_env;
pro_env::test::run_test::<pro_env::DefaultEnvironment, _>(|_| {
    let caller = pro_env::caller::<pro_env::DefaultEnvironment>();
    let _caller = caller;
    Ok(())
}).unwrap();
```

However, pro! provides a much simpler way to interact with the contract executor
via its environment accessor. An example below:

```rust
use pro_lang as pro;
 
#[pro::contract]
mod greeter {
    #[pro(storage)]
    pub struct Greeter;

    impl Greeter {
        #[pro(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            let message = format!("thanks for instantiation {:?}", caller);
            pro_env::debug_println(&message);
            Greeter {}
        }

        #[pro(message, payable)]
        pub fn fund(&mut self) {
            let caller = self.env().caller();
            let value = self.env().transferred_balance();
            let message = format!("thanks for the funding of {:?} from {:?}", value, caller);
            pro_env::debug_println(&message);
        }
    }
}
```

## Events

An pro! smart contract may define events that it can emit during contract execution.
Emitting events can be used by third party tools to query information about a contract's
execution and state.

The following example pro! contract shows how an event `Transferred` is defined and
emitted in the `#[pro(constructor)]`.

```rust
 use pro_lang as pro;
 
 #[pro::contract]
 mod erc20 {
     /// Defines an event that is emitted every time value is transferred.
     #[pro(event)]
     pub struct Transferred {
         from: Option<AccountId>,
         to: Option<AccountId>,
         value: Balance,
     }

     #[pro(storage)]
     pub struct Erc20 {
         total_supply: Balance,
         // more fields ...
     }

     impl Erc20 {
         #[pro(constructor)]
         pub fn new(initial_supply: Balance) -> Self {
             let caller = Self::env().caller();
             Self::env().emit_event(Transferred {
                 from: None,
                 to: Some(caller),
                 value: initial_supply,
             });
             Self { total_supply: initial_supply }
         }

         #[pro(message)]
         pub fn total_supply(&self) -> Balance {
             self.total_supply
         }
     }
 }
```

## Example: Flipper

The below code shows the complete implementation of the so-called Flipper
pro! smart contract.
For us it acts as the "Hello, World!" of the pro! smart contracts because
it is minimal while still providing some more or less useful functionality.

It controls a single `bool` value that can be either `false` or `true`
and allows the user to flip this value using the `Flipper::flip` message
or retrieve the current value using `Flipper::get`.

```rust
use pro_lang as pro;

#[pro::contract]
pub mod flipper {
    #[pro(storage)]
    pub struct Flipper {
        value: bool,
    }

    impl Flipper {
        /// Creates a new flipper smart contract initialized with the given value.
        #[pro(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        /// Flips the current value of the Flipper's bool.
        #[pro(message)]
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        /// Returns the current value of the Flipper's bool.
        #[pro(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
```