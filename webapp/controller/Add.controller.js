sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("nvid.xx.zsalesordxx.controller.Add", {

        onInit : function () {
            var oModel = new JSONModel();
            oModel.setData({
                orderdata: {
                    "BuyerId" : "100000005",
                    "BuyerName" : "TECUM",
                    "To_Items" : [
                        {
                          "ProductId" : "HT-1040",
                          "Note" : "Enter your text here",
                          "CurrencyCode" : "EUR",
                          "GrossAmount" : "0.00",
                          "Quantity" : "0",
                          "QuantityUnit" : "EA"
                        }                        
                      ]
                }
            });
            this.getView().setModel(oModel,"order");
            this.localModel = oModel;
        },
        itemData: {
            "ProductId" : "",
            "Note" : "",
            "CurrencyCode" : "USD",
            "GrossAmount" : "0.00",
            "Quantity" : "0",
            "QuantityUnit" : "EA"
        },
        onDeleteRow: function(oEvent){
            var oItem = oEvent.getSource().getParent();
            var oItemPath = oItem;
            var oTable = this.getView().byId("idOrdTable");
            oTable.removeItem(oItemPath);
        },
        onAddRow: function(){
            var items = this.localModel.getProperty("/orderdata/To_Items");
            items.push(this.itemData);
            this.localModel.setProperty("/orderdata/To_Items", items);
        }

    });
});