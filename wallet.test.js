const { describe } = require("mocha");
const assert = require("assert");

const { initWallet } = require('./wallet');

//generar un test
describe('wallet', function () {
    it('should be not null after created', function () {
        const wallet = initWallet();
        assert.notDeepEqual(wallet, null);
    });
    it('should be empty after inicialize it', function () {
        const wallet = initWallet();
        assert.notDeepEqual(wallet.isEmpty(), false);
    });
    it('should be empty after inicialize it and add amount of currency', function () {
        const wallet = initWallet();
        wallet.addAmount(1);
        assert.deepEqual(wallet.isEmpty(), false);
    });
    it('should be empty again after inicialize it and add amount of currency and remove the same amount', function () {
        const wallet = initWallet();
        wallet.addAmount(1);
        wallet.reduceAmount(1);
        assert.deepEqual(wallet.isEmpty(), true);
    });
    it('should be not empty again after inicialize it and add amount of currency and remove less amount', function () {
        const wallet = initWallet();
        wallet.addAmount(2);
        wallet.reduceAmount(1);
        assert.deepEqual(wallet.isEmpty(), false);
    });
    it('should be zero amount after initialize it', function () {
        const wallet = initWallet();
        assert.deepEqual(wallet.getAmount(), 0);
    });
    it('should have 1 amount after initialize it and add 2 amount of currency and remove 1 amount', function () {
        const wallet = initWallet();
        wallet.addAmount(2)
        wallet.reduceAmount(1)
        assert.deepEqual(wallet.getAmount(), 1);
    });
})

//Node json guarda las dependencias
//con npm install --save-dev assert se creo la carpeta node_modules