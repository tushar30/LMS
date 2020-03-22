import { LightningElement, track, wire } from 'lwc';
import { publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/demoMessage__c";

export default class Lms_LWC extends LightningElement {
    @wire(MessageContext)
    messageContext;
    @track subscription = null;
    @track myMessage = '';
    @track receivedMessage = '';
     
    constructor() {
        super();
    }

    handleChange(event) {
        this.myMessage = event.target.value;
    }

    publishMC() {
        const message = {
            message: this.myMessage,
            source: "LWC"
        };
        publish(this.messageContext, SAMPLEMC, message);
    }
       
    subscribeMC() {

        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, SAMPLEMC, (message) => {
                this.handleMessage(message);
            },
            {scope: APPLICATION_SCOPE});
    }
   
    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
 
    handleMessage(message) {
        this.receivedMessage = message ? JSON.stringify(message, null, '\t') : 'no message payload';
    }

    get subscribeStatus() {
        return this.subscription != null ? 'True' : 'False';
    }
}

