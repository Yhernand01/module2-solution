(function(){
    'use strict';

    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService){
        var itemCheck = this;

        itemCheck.item_name = "";
        itemCheck.item_quantity = "";
        itemCheck.items = ShoppingListCheckOffService.getItems();
        
        itemCheck.boughtItem = function(item_index, item_name, item_quantity){
            ShoppingListCheckOffService.boughtItem(item_index, item_name, item_quantity);
            itemCheck.toBuyEmpty = ShoppingListCheckOffService.emptyToBuy();
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughtList = this;
        boughtList.items = ShoppingListCheckOffService.getBought();
        boughtList.boughtEmpty = ShoppingListCheckOffService.emptyBought();
    }

    function ShoppingListCheckOffService(){
        var service = this;

        // To buy items
        var toBuyIems = [{name: "Cookies", quantity: "2"},
                         {name: "Salt", quantity: "1"},
                         {name: "Sugar", quantity: "3"},
                         {name: "Ice cream", quantity: "2"},
                         {name: "Pencils", quantity: "4"},
                         {name: "Toothbrush", quantity: "1"},
                         {name: "Cookies", quantity: "5"},
                         {name: "Cereal", quantity: "1"},
                         {name: "Rice", quantity: "3"},
                         {name: "Beans", quantity: "2"}];
        // Already bought items
        var alReadyBought = [];

        service.boughtItem = function(item_index,item_name,item_quantity){
            var item = {
                name: item_name,
                quantity: item_quantity
            };

            alReadyBought.push(item);
            toBuyIems.splice(item_index,1);
        };

        service.getItems = function(){
            service.emptyBought();
            return toBuyIems;
        };

        service.getBought = function(){
            return alReadyBought;
        };

        service.emptyToBuy = function(){
            var text = "";
            if(toBuyIems.length === 0){
                text = "Everything is bought!";
            }
            return text;
        };

        service.emptyBought = function(){
            var text = "";
            if(alReadyBought.length === 0){
                text = "Nothing bought yet";
            }
            return text;
        };
    }

})();