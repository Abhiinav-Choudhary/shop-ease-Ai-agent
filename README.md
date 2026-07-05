# 🛍️ ShopEase AI Customer Support Agent

An AI-powered customer support backend built using **Node.js**, **Express.js**, and the **Groq API**. The agent uses Large Language Model (LLM) tool/function calling to answer customer queries about orders, refunds, company policies, and support while maintaining conversation history across a session.

---

# Features

* 🤖 AI-powered customer support using Groq LLM
* 💬 Session-based conversations
* 🧠 Conversation memory
* 🔧 Function/Tool Calling
* 📦 Order status lookup
* 💰 Refund eligibility checking
* 📚 FAQ / Knowledge Base search
* 👨‍💼 Human support escalation
* ✅ Input validation using Zod
* ⚠️ Centralized error handling
* 🚀 Retry & timeout support for AI requests
* 📜 Conversation history API

---

# Tech Stack

* Node.js
* Express.js
* Groq API
* JavaScript (ES Modules)
* UUID
* Zod
* dotenv

---

# Project Structure

```
shop-ease-agent
│
├── src
│   ├── config
│   │     groq.js
│   │
│   ├── controllers
│   │     chat.controller.js
│   │     session.controller.js
│   │
│   ├── data
│   │     orders.json
│   │     faqs.json
│   │
│   ├── middleware
│   │     errorHandler.js
│   │
│   ├── prompts
│   │     systemPrompt.js
│   │
│   ├── routes
│   │     session.routes.js
│   │
│   ├── services
│   │     agent.service.js
│   │
│   ├── storage
│   │     escalationStore.js
│   │     sessionStore.js
│   │
│   ├── tools
│   │     checkRefundEligibility.js
│   │     escalateToHuman.js
│   │     getOrderStatus.js
│   │     searchKnowledgeBase.js
│   │
│   ├── utils
│   │     groqRequest.js
│   │     toolRegistry.js
│   │     validators.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# Architecture

The application follows a modular architecture that separates API routing, AI orchestration, business logic, storage, and tool implementations.

### Request Flow

```text
Client
   │
   ▼
Express REST API
   │
   ▼
Session Management
   │
   ▼
AI Agent Service
   │
   ▼
Groq LLM
   │
   ▼
Tool Selection
   │
   ├── searchKnowledgeBase()
   ├── getOrderStatus()
   ├── checkRefundEligibility()
   └── escalateToHuman()
   │
   ▼
Tool Result
   │
   ▼
Groq LLM
   │
   ▼
Final Response
```

The AI agent receives the user message, sends the conversation history and available tools to the LLM, executes any requested tools, feeds the tool results back to the LLM, and finally returns a natural language response to the user while maintaining conversation history for future interactions.

# Installation

Clone the repository

```bash
git clone <repository-url>

cd shop-ease-agent
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MODEL=llama-3.3-70b-versatile

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run the project

```bash
npm run dev
```

Server

```
http://localhost:5000
```

---

# API Endpoints

## Health Check

```
GET /health
```

Response

```json
{
  "success": true,
  "message": "ShopEase AI Agent is running"
}
```

---

## Create Session

```
POST /api/sessions
```

Response

```json
{
    "success": true,
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

## Chat

```
POST /api/sessions/:id/chat
```

Request

```json
{
    "message":"Where is my order ORD-1003?"
}
```

Sample Response

```json
{
    "reply":"Your order ORD-1003 has been shipped via UPS and is expected to arrive on 2026-07-03."
}
```

---

## Conversation History

```
GET /api/sessions/:id/history
```



# AI Agent Workflow

```
Client

      │

      ▼

Express API

      │

      ▼

Conversation History

      │

      ▼

Groq LLM

      │

      ▼

Tool Selection

      │

 ┌────┼─────┬─────────┐
 │    │     │         │
 ▼    ▼     ▼         ▼

Order  FAQ  Refund  Escalation

      │

      ▼

Tool Result

      │

      ▼

Groq LLM

      │

      ▼

Natural Language Response
```

---

# Available Tools

### 1. Search Knowledge Base

Searches the FAQ database for company policies such as:

* Shipping
* Returns
* Refunds
* Warranty
* Payment Methods
* Promotions
* Customer Support

---

### 2. Get Order Status

Returns

* Order Status
* Carrier
* Tracking Number
* Estimated Delivery Date

---

### 3. Check Refund Eligibility

Business rules implemented

* Already refunded
* Cancelled orders
* Processing orders
* Shipped orders
* Delivered within 30 days
* Refund window expired

---

### 4. Escalate to Human

Creates a support ticket with

* Ticket ID
* Priority
* Timestamp
* Summary

---

# Conversation Memory

The application stores conversation history in memory using a session-based architecture.

Each session maintains

* User messages
* Assistant responses
* Tool calls
* Tool responses

This enables contextual follow-up questions such as

> Where is my order ORD-1003?

followed by

> Can I return it?

without requiring the customer to provide the order number again.

---

# What I Chose and Why

### Express.js

I chose Express.js because it is lightweight, easy to configure, and widely used for building REST APIs. Its middleware architecture helped keep the project modular by separating controllers, routes, services, and middleware.

### Groq API

I selected the Groq API with the Llama 3.3 70B Versatile model because it provides an OpenAI-compatible interface, excellent inference speed, free developer access, and built-in support for tool/function calling.

### In-Memory Storage

The assignment explicitly allowed in-memory storage. Therefore, JavaScript Maps were used to maintain conversation sessions and escalation tickets without introducing unnecessary database complexity.

### Tool-Based Design

Business logic was implemented as independent tools rather than embedding it inside the AI prompt. This separation improves maintainability and better represents how production AI agents interact with backend systems.

---

# Error Handling

The application handles

* Invalid request body
* Missing sessions
* Unknown orders
* Missing FAQ articles
* Tool execution failures
* AI request timeout
* AI request retry
* Internal server errors

---

# Future Improvements

* MongoDB / Redis session storage
* Vector database for semantic FAQ search
* Authentication & user accounts
* Streaming AI responses
* Rate limiting
* Docker deployment
* Unit & Integration testing
* OpenAPI / Swagger documentation

---

# Sample Queries

```
Where is my order ORD-1003?

Can I get a refund for ORD-1002?

What is your return policy?

Do you ship internationally?

Can I exchange my product?

I want to speak to a human agent.
```

---

# Design Decisions

* In-memory storage was used as required by the assignment.
* Tool calling was implemented instead of hardcoded business logic to simulate a real AI agent.
* Business logic was separated into independent tools to improve maintainability.
* Conversation history is preserved throughout a session for contextual responses.
* Retry and timeout mechanisms improve reliability when communicating with the LLM.

---

# What I Learned

This assignment was my first experience building an AI agent using LLM tool/function calling.

During development I learned:

- How modern LLMs perform function/tool calling.
- How to build an agent loop that executes tools and feeds results back to the model.
- How conversation history enables contextual follow-up questions.
- How prompt engineering influences tool selection and reduces hallucinations.
- How to design a modular backend architecture by separating controllers, services, tools, and storage.
- How retry logic and timeout handling improve the reliability of AI applications.

Overall, this project significantly improved my understanding of practical AI application development beyond traditional REST API development.

---

# Author

Abhinav Chaudhary

Built as part of the ShopEase AI Customer Support Agent assignment using Node.js, Express.js, and the Groq API.
