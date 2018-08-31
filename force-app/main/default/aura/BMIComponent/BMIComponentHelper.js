({
	getBmi : function(component) {
        var action = component.get("c.calculateBmi");
        action.setParams({ height : component.get("v.height"), weight: component.get("v.weight") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var bmi = response.getReturnValue();
                component.set("v.bmi", bmi);
                this.calculateRisk(component, bmi);
            }else if (state === "ERROR") {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }, 
    
    calculateRisk: function(component, bmi) {
        console.log(bmi);
        var riskAction = component.get("c.calculateRisk");
        riskAction.setParams({bmi: bmi});
        riskAction.setCallback(this, function(riskResponse) {
            var riskState = riskResponse.getState();
            if (riskState === "SUCCESS") {
                console.log(riskResponse.getReturnValue());
                var displayBox = component.find("display");
                if(riskResponse.getReturnValue()) {
                    $A.util.removeClass(displayBox, 'no-risk');
                    $A.util.addClass(displayBox, 'is-risk');
                }else {
                    $A.util.removeClass(displayBox, 'is-risk');
                    $A.util.addClass(displayBox, 'no-risk');
                }
            }else if (state === "ERROR") {
                console.log(riskResponse.getError());
            }
        });
        $A.enqueueAction(riskAction);
    },

    executeAction: function(action) {
        return new Promise(function(resolve, reject) {
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    resolve(response.getReturnValue());
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            reject(Error("Error message: " + errors[0].message));
                        }
                    }
                    else {
                        reject(Error("Unknown error"));
                    }
                }
            });
            $A.enqueueAction(action);
        });
    },

    promiseTest: function(component) {
        var action = component.get("c.calculateBmi");
        action.setParams({ height : component.get("v.height"), weight: component.get("v.weight") });
        var bmiPromise = this.executeAction(action);
        var self = this;

        bmiPromise.then(
            $A.getCallback(function(result){
                component.set("v.bmi", result);
                var riskAction = component.get("c.calculateRisk");
                riskAction.setParams({bmi: result});
                var riskPromise=self.executeAction(riskAction);
                return riskPromise;
            }),
            $A.getCallback(function(error){
                alert('An error occurred during BMI calculation : ' + error.message);
            })
         )
        .then(
            $A.getCallback(function(result){
                var displayBox = component.find("display");
                if(result) {
                    $A.util.removeClass(displayBox, 'no-risk');
                    $A.util.addClass(displayBox, 'is-risk');
                }else {
                    $A.util.removeClass(displayBox, 'is-risk');
                    $A.util.addClass(displayBox, 'no-risk');
                }
            }),
            $A.getCallback(function(error){
                // Something went wrong
                alert('An error occurred during risk calculation : ' + error.message);
            })
        );
    },

})