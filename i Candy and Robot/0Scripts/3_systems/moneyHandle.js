const iMoney = {

    // the total available money the pc has
    // this will replace the V.money when save
    total : 0,

    /**
     * get the max limit of money the pc can have
     * @returns {number}
     */
    max() {
        const wallet = iManager.getEquip('wallet');
        const item = Items.get(wallet.id);
        const defaultVal = 250000 * iCandy.getConfig('moneyMod');

        return item ? item.moneylimit + defaultVal : defaultVal;
    },

    /**
     * on gain money event, and return the remaining money
     * @param {number} amount
     *
     */
    gain(amount) {
        const max = this.max();
        let remaining = 0;

        if (amount + V.money1 > max) {
            remaining = amount + V.money1 - max;
            V.money1 = max;
        }
        else {
            V.money1 += amount;
        }
        return remaining;
    },

    /**
     * on lose money event
     * if required amount is bigger than currency then return debt
     * @param {number} amount
     */
    lose(amount) {
        let debt = 0;
        if (amount > V.money1) {
            debt = amount - V.money1;
            V.money1 = 0;
        }
        else {
            V.money1 -= amount;
        }

        return debt;
    },

    /**
     * on use money event
     * @param {number} amount
     */
    use(amount) {
        V.money1 -= amount;
    },

    message : {
        lost : {
            EN : 'You lost {0}$.',
            CN : '你失去了{0}$。'
        },

        earn : {
            EN : 'You earned {0}£.',
            CN : '你获得了{0}£。'
        },

        send : {
            EN : 'You transfered {0}£ to {1}.',
            CN : '你给{1}转账了{0}£。'
        },

        transfer : {
            CN : '你的钱多得拿不下了， 于是你将{0}£存进了{1}。',
            EN : 'The money you have is more than you can carry; so you transfered {0}£ to the {1}.'
        },

        drop : {
            EN : 'The money you have is more than you can carry; helplessly you have to leave the extra {0}£ where it is.',
            CN : '你的钱多得拿不下了，你只好无奈地把{0}£扔在了原地。'
        }
    }

};
