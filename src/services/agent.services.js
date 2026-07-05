import groq from "../config/groq.js";
import { groqRequest } from "../utils/groqRequest.js";
import systemPrompt from "../prompts/systemPrompt.js";
import {
  toolDefinitions,
  availableTools,
} from "../utils/toolsRegistry.js";
import {
  getSession,
 addConversationEntry,
} from "../storage/sessionStore.js";



// Helper function to remove 'timestamp' and other unexpected meta properties
function sanitizeMessages(messages) {
  return messages.map(msg => {
    const clean = { role: msg.role, content: msg.content };
    if (msg.tool_calls) clean.tool_calls = msg.tool_calls;
    if (msg.tool_call_id) clean.tool_call_id = msg.tool_call_id;
    return clean;
  });
}

export async function chatWithAgent(sessionId, userMessage) {
  try {

    addConversationEntry(sessionId, {
    role: "user",
    content: userMessage
});
  
  const history = getSession(sessionId);

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...history,
  ];

  // First LLM Call (Using sanitized messages)
 const response = await groqRequest(groq, {
    model: process.env.MODEL,
    messages: sanitizeMessages(messages),
    tools: toolDefinitions,
    tool_choice: "auto",
});

  const assistantMessage = response.choices[0].message;

  // If no tool is requested
 if (
    !assistantMessage.tool_calls ||
    assistantMessage.tool_calls.length === 0
) {

    addConversationEntry(sessionId, {
        role: "assistant",
        content: assistantMessage.content,
    });

    return assistantMessage.content;
}

  // Save assistant message to the local tracking array
  messages.push(assistantMessage);

  addConversationEntry(sessionId, assistantMessage);

  // Execute all requested tools
  for (const toolCall of assistantMessage.tool_calls) {
    const toolName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);
    const tool = availableTools[toolName];

if (!tool) {

    throw new Error(`Unknown tool: ${toolName}`);

}
    
    if (!tool) continue;

   let result;

try {

    result = await tool(...Object.values(args));

} catch (error) {

    result = {
        success: false,
        error: error.message
    };

}


   const toolResponse = {

    role: "tool",

    tool_call_id: toolCall.id,

    content: JSON.stringify(result)

};

messages.push(toolResponse);

addConversationEntry(sessionId, toolResponse);
  }

  // Second LLM Call (Using sanitized messages again)
 const finalResponse = await groqRequest(groq, {
    model: process.env.MODEL,
    messages: sanitizeMessages(messages),
});

  const finalMessage = finalResponse.choices[0].message.content;

  addConversationEntry(sessionId, {
    role: "assistant",
    content: finalMessage
});

  return finalMessage;

}
  
  catch(error){

   throw error;

}
}



