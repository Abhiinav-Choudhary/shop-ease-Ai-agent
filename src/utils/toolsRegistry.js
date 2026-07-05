import searchKnowledgeBase from "../tools/searchKnowledgeBase.js";
import getOrderStatus from "../tools/getOrderStatus.js";
import checkRefundEligibility from "../tools/checkRefundEligibility.js";
import escalateToHuman from "../tools/escalateToHuman.js";

export const availableTools = {

    searchKnowledgeBase,

    getOrderStatus,

    checkRefundEligibility,

    escalateToHuman

};

export const toolDefinitions = [

{
    type:"function",
    function:{
        name:"searchKnowledgeBase",
        description:"Search company FAQs and policies",
        parameters:{
            type:"object",
            properties:{
                query:{
                    type:"string"
                }
            },
            required:["query"]
        }
    }
},

{
    type:"function",
    function:{
        name:"getOrderStatus",
        description:"Get status of an order using order id",
        parameters:{
            type:"object",
            properties:{
                orderId:{
                    type:"string"
                }
            },
            required:["orderId"]
        }
    }
},

{
    type:"function",
    function:{
        name:"checkRefundEligibility",
        description:"Check refund eligibility of an order",
        parameters:{
            type:"object",
            properties:{
                orderId:{
                    type:"string"
                }
            },
            required:["orderId"]
        }
    }
},

{
    type:"function",
    function:{
        name:"escalateToHuman",
        description:"Escalate issue to human support",
        parameters:{
            type:"object",
            properties:{
                summary:{
                    type:"string"
                },
                priority:{
                    type:"string"
                }
            },
            required:["summary"]
        }
    }
}

];