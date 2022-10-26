const assert = require("assert");

// Y se desea monitorear los cambios de valor de las monedas para detectar cambios.

// Específicamente se desea detectar cuando el valor de cada moneda, desde que se empieza a monitorear,
// si cae un 5% del valor máximo registrado, y en ese caso se desea vender una cantidad fija
// de esa moneda contra la moneda base.

//A partir de ese momento, se continua el monitorear pero ahora para registrar cuando el valor de la misma,
// si sube un 5% del valor mínimo registrado, y en ese caso se desea comprar nuevamente la moneda original en la misma cantidad.

const initMonitor = () => {
    return {
        currentValue: undefined,
        maxValue: 0,
        minValue: undefined,
        hasValue : function() {
            return this.currentValue !== undefined;
        },
        addNewValue : function(value) {
            this.currentValue = value;
            if(value > this.maxValue) {
                this.maxValue = value;
            }
            if((this.minValue == undefined) || (value < this.minValue))
                this.minValue = value;
        },
        getCurrentValue : function() {
            return this.currentValue;
        },
        getMaximumValue : function() {
            return this.maxValue;
        },
        getMinimumValue : function() {
            return this.minValue;
        },
        hasFallen5Percent : function () {
            return (this.currentValue <= this.maxValue*(0.95));
        },
        hasRisen5Percent : function () {
            return (this.currentValue >= this.minValue*(1.05));
        },
        shouldSell : function () {
            return this.hasFallen5Percent();
        },
        shouldBuy : function () {
            return this.hasRisen5Percent();
        },
    };
}

describe("monitor", function(){

    it ("should return a monitor when the monitor is initialized", function(){
        const monitor = initMonitor();
        assert.notDeepEqual(monitor, null);
    })

    it ("should return false as hasValue if the monitor has not values yet", function(){
        const monitor = initMonitor();        
        assert.deepEqual(monitor.hasValue(), false);
    })

    it ("should return false as hasValue if the monitor has not values yet", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19000);
        assert.deepEqual(monitor.hasValue(), true);
    })

    it ("should return 19000 as current value if the monitor has 19000 as unique value", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19000);
        assert.deepEqual(monitor.getCurrentValue(), 19000);
    })

    it ("should return 19001 as current value if the monitor has 19001 as unique value", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19001);
        assert.deepEqual(monitor.getCurrentValue(), 19001);
    })

    it ("should return 19001 as current value if the monitor has 19000 as first value then 19001", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19000);
        monitor.addNewValue(19001);
        assert.deepEqual(monitor.getCurrentValue(), 19001);
    })

    it ("Should register max values", function(){
        const monitor = initMonitor();
        monitor.addNewValue(50);
        monitor.addNewValue(100);
        monitor.addNewValue(1000);
        assert.deepEqual(monitor.getMaximumValue(), 1000);
    })

    it ("The current value has fallen 5% from the maximun value", function(){
        const monitor = initMonitor();
        monitor.addNewValue(100);
        monitor.addNewValue(99);
        assert.deepEqual(monitor.hasFallen5Percent(), false);
        monitor.addNewValue(95);
        assert.deepEqual(monitor.hasFallen5Percent(), true);
    })

    it ("Should register min values", function(){
        const monitor = initMonitor();
        monitor.addNewValue(50);
        monitor.addNewValue(100);
        monitor.addNewValue(1000);
        assert.deepEqual(monitor.getMinimumValue(), 50);
    })

    it ("The current value has risen 5% from the minimun value", function(){
        const monitor = initMonitor();
        monitor.addNewValue(100);
        monitor.addNewValue(99);
        monitor.addNewValue(105);
        assert.deepEqual(monitor.hasRisen5Percent(), true);
    })

    it ("Should sell when the value has fallen 5 percent", function(){
        const monitor = initMonitor();
        monitor.addNewValue(100);
        monitor.addNewValue(99);
        assert.deepEqual(monitor.hasFallen5Percent(), false);
        monitor.addNewValue(95);
        assert.deepEqual(monitor.hasFallen5Percent(), true);
        assert.deepEqual(monitor.shouldSell(), true);
    })

    it ("Should buy when the value has risen 5 percent", function(){
        const monitor = initMonitor();
        monitor.addNewValue(100);
        monitor.addNewValue(99);
        assert.deepEqual(monitor.hasRisen5Percent(), false);
        monitor.addNewValue(105);
        assert.deepEqual(monitor.hasRisen5Percent(), true);
        assert.deepEqual(monitor.shouldBuy(), true);
    })

})