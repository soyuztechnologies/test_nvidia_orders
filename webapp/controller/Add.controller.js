sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("nvid.xx.zsalesordxx.controller.Add", {

        onInit : function () {
            this.getRouter().getRoute("add").attachPatternMatched(this._onObjectMatched, this);
            
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
        _onObjectMatched: function(){
            this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
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
            var sItemPath = oItem.getBindingContextPath();
            var sIndex = sItemPath.split("/")[sItemPath.split("/").length - 1];
            var items = this.localModel.getProperty("/orderdata/To_Items");
            items.splice(sIndex,1);
            this.localModel.setProperty("/orderdata/To_Items", items);

            // var oTable = this.getView().byId("idOrdTable");
            // oTable.removeItem(oItemPath);
        },
        onAddRow: function(){
            var items = this.localModel.getProperty("/orderdata/To_Items");
            items.push(this.itemData);
            this.localModel.setProperty("/orderdata/To_Items", items);
            
        }

    });
});