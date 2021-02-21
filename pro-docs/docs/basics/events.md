---
title: Events
slug: /basics/events
---

An pro! smart contract may define events that it can emit during contract execution.
Emitting events can be used by third party tools to query information about a contract's
execution and state.

The following example pro! contract shows how an event `Transferred` is defined and
emitted in the `#[pro(constructor)]`.

```rust
use pro_lang as pro;

#[pro::contract]
mod erc20 {
    /// Defines an event that is emitted
    /// every time value is transferred.
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

See our [`ERC20 example contract`](https://github.com/tetcoin/pro/blob/master/examples/erc20/lib.rs) 
for an elaborate example which uses events.

## Event Definition

This is how an event definition looks:

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

Add the `#[pro(topic)]` attribute tag to each item in your event that you want to have indexed.
A good rule of thumb is to ask yourself if somebody might want to search for this topic.
For this reason the `amount` in the exemplary event above was not
made indexable ‒ there will most probably be a lot of different events with
differing amounts each.

The signature of the event is by default one of the topics of the event, except
if you annotate the event with `#[pro(anonymous)]`.
See [here](/macros-attributes/anonymous) for details on this attribute.


## Emitting Events in a Constructor

In a constructor events are emitted via `Self::env().emit_event()`.
See this example:

```rust
#[pro(constructor)]
pub fn new(initial_value: Balance) -> Self {
    let caller = Self::env().caller();
    let mut balances = HashMap::new();
    balances.insert(caller, initial_supply);

    Self::env().emit_event(Transferred {
        from: None,
        to: Some(caller),
        amount: initial_supply
    });

    Self { total_supply: initial_supply, balances }
}
```

## Emitting Events from Messages

In a message events are emitted via `self.env().emit_event()`:

```rust
#[pro(message)]
pub fn transfer(&mut self, to: AccountId, amount: Balance) -> Result {
    let from = self.env().caller();
    // implementation hidden
    self.env().emit_event(Transferred {
        from: Some(from),
        to: Some(to),
        amount
    });
    Ok(())
}
```
