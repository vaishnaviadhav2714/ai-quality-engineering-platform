import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  const client = new Client({
    name: 'ai-quality-engineering-test-client',
    version: '1.0.0',
  });

  const transport = new StdioClientTransport({
    command: 'npx.cmd',
    args: ['tsx', '.\\mcp\\server.ts'],
  });

  await client.connect(transport);

  const tools = await client.listTools();

  console.log('Available MCP tools:');

  for (const tool of tools.tools) {
    console.log(`- ${tool.name}: ${tool.description}`);
  }

  const snapshotResult = await client.callTool({
    name: 'get_quality_snapshot',
    arguments: {},
  });

  console.log('\nQuality Snapshot:');
  console.log(snapshotResult.content);

  const risksResult = await client.callTool({
    name: 'get_quality_risks',
    arguments: {},
  });

  console.log('\nQuality Risks:');
  console.log(risksResult.content);

  const intelligenceResult = await client.callTool({
    name: 'get_quality_intelligence',
    arguments: {},
  });

  console.log('\nQuality Intelligence:');
  console.log(intelligenceResult.content);

  const areaResult = await client.callTool({
    name: 'get_quality_area',
    arguments: {
      area: 'accessibility',
    },
  });

  console.log('\nAccessibility Quality Area:');
  console.log(areaResult.content);

  await client.close();
}

main().catch((error) => {
  console.error('MCP test client failed:', error);
  process.exit(1);
});
