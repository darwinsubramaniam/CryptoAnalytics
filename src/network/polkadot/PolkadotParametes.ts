/**
 * Parameter which is defines the Polkadot network.
 */
export const PolkadotParametes = {
  SLOT_DURATION_SECONDS: 6,
  PERCISSION: 10000000000, // 1 DOT = 10^10 Planks
  SLOT: 1,
  EPOCH: 2400,
  SESSION: 2400,
  ERA: 14400,
  /**
   * The total number of planks required for the account to be existential.
   * 1 DOT = 10^10 Planks
   */
  EXISTENTIAL_DEPOSIT: 10000000000, // 1 DOT

  /**
   * The smallest decimal number name that can be represented in the Polkadot chain.
   */
  SMALLEST_UNIT_SYMBOL: 'PLANKS',
  UNIT: 'DOT',

  /**
   * Staking related parameters.
   */
  STAKING_PARAMETERS: {
    /**
     * The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case that a validator misbehaves
     */
    TERM_DURATION: {
      SLOT: 14400,
      DAY: 1,
    },
    /**
     * How often a new validator set is elected according to Phragmén's method.
     */
    NOMINATION_PERIOD: {
      SLOT: 14400,
      DAY: 1,
    },
    /**
     * How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.
     */
    BONDING_DURATION_SLOT: {
      SLOT: 403200,
      DAY: 28,
    },

    /**
     * Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots.
     */
    SLASH_DEFER_DURATION_SLOT: {
      SLOT: 403200,
      DAY: 28,
    },
  },
};
