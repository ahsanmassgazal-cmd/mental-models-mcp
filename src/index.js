#!/usr/bin/env node
// Mental Models MCP — local (stdio) mode. By SigmaMax AI Solutions (https://sigmamaxaisolutions.com)
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

await createServer().connect(new StdioServerTransport());
