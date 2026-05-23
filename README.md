# 🚂 Train MCP Agent

A simple roject demonstrating how an AI Agent can discover and execute tools through an MCP (Model Context Protocol) server.

## Components

- **Express Backend** – Exposes train-related APIs
- **MCP Server** – Wraps backend APIs as AI-consumable tools
- **AI Agent** – Uses a local LLM (Ollama) to plan, invoke MCP tools, and respond to users

## Available APIs

- `GET /api/getTrains?query=<keyword>`
- `GET /api/runningStatus/:trainNo`

## Available MCP Tools

- `search_trains`
- `get_running_status`

---

## Prerequisites

### Install Dependencies

```bash
npm install
```

### Install and Start Ollama

```bash
ollama serve
```

Pull a model (example):

```bash
ollama pull qwen2.5:3b
```

---

## Run the Backend Server

```bash
npm run dev
```

Backend starts on:

```text
http://localhost:3000
```

---

## Run the MCP Server

```bash
npm run mcp
```

---

## Run the AI Agent

```bash
npm run agent
```

Agent starts on:

```text
http://localhost:4000
```

---

## Test the Agent

### Request

```http
POST http://localhost:4000/chat
Content-Type: application/json
```

```json
{
  "message": "Find rajdhani trains"
}
```

### Example Queries

```text
Find rajdhani trains

Search trains for duronto

What is the running status of train 12951?

Where is train 12002 currently?
```

---

## High-Level Flow

```text
User
 ↓
AI Agent
 ↓
MCP Client
 ↓
MCP Server
 ↓
Express APIs
 ↓
Train Data Provider
```

The agent discovers available tools from the MCP server, selects the appropriate tool based on the user request, executes it, and returns a user-friendly response.
