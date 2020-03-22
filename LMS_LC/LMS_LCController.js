({
    publishMC: function(cmp, event, helper) {
        var message = {
            message: cmp.get("v.sendMessage"),
            source: "Lightning"
        };
        cmp.find("demoMessageChannel").publish(message);
    },

    handleMessage: function(cmp, message, helper) { 
        // Read the message argument to get the values in the message payload
        if (message != null && message.getParam("message") != null) {
            cmp.set("v.message", JSON.stringify(message.getParams(), null, '\t'));
        }
    }
})