//3 formas de definir funciones

// op 1
function a () {

}

// op 2: la que vamos a usar
const initWallet = () => {
    return {
        //_isEmpty : true,
        amount: 0,
        isEmpty : function () {
            //return _isEmpty;
            return this.amount == 0
        },
        addAmount : function (value) {
            //this._isEmpty = false;
            return this.amount += value;
        },
        reduceAmount : function (value) {
            return this.amount -= value;
        },
        getAmount : function () {
            return this.amount;
        }
    };
}

module.exports.initWallet = initWallet