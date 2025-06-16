# 🌸 Blue Perfumery MCP Server

[![npm version](https://badge.fury.io/js/%40blueperfumery%2Fmcp-server.svg)](https://www.npmjs.com/package/@blueperfumery/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server that provides seamless access to the Blue Perfumery perfume collection data, enabling AI assistants to help users discover and purchase their perfect fragrance.

## ✨ Overview

This MCP server exposes comprehensive perfume data from the Blue Perfumery website, allowing Claude and other MCP-compatible AI assistants to:

- 🔍 Search through 50+ premium perfumes
- 💰 Compare prices and get purchase links
- 🎯 Filter by gender, brand, and characteristics
- 📝 Access detailed fragrance notes and descriptions
- 🛒 Direct integration with Shopier for purchases

## 🛠️ Features

The server provides the following powerful tools:

- **`list_all_perfumes`** - Returns all perfumes in the collection with full details
- **`get_perfume_by_id`** - Retrieves a specific perfume by its unique ID
- **`search_perfumes`** - Intelligent search by perfume name or brand
- **`get_perfumes_by_category`** - Filter by category (men's, women's, or niche)
- **`get_purchase_link`** - Get direct Shopier purchase links for any perfume

## Installation

### Option 1: NPM Package (Recommended)

```bash
npm install -g @blueperfumery/mcp-server
```

### Option 2: From Source

```bash
git clone https://github.com/blueperfumery/mcp-server.git
cd mcp-server
npm install
npm run build
```

## Usage

### Using with Claude Desktop

Add the following to your Claude Desktop configuration file:

**For NPM installation:**
```json
{
  "mcpServers": {
    "blue-perfumery": {
      "command": "blue-perfumery-mcp"
    }
  }
}
```

**For source installation:**
```json
{
  "mcpServers": {
    "blue-perfumery": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/mcp-server"
    }
  }
}
```

### Configuration File Location

The Claude Desktop configuration file is located at:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

After updating the configuration, restart Claude Desktop.

## Data Structure

Each perfume object contains:

- `id`: Unique identifier
- `name`: Perfume name
- `brand`: Brand name
- `price`: Price in TL
- `ml`: Volume in milliliters (optional)
- `originalPrice`: Original price (optional)
- `gender`: "male", "female", or "unisex"
- `notes`: Array of scent notes
- `description`: Description text
- `ageRange`: Recommended age range (min/max)
- `characteristics`: Array of characteristic descriptors

## Example Usage

Once connected to an MCP client, you can use the tools like this:

```
// List all perfumes
list_all_perfumes()

// Get specific perfume
get_perfume_by_id({ id: "mfk-br540" })

// Search perfumes
search_perfumes({ query: "oud" })

// Get perfumes by category
get_perfumes_by_category({ category: "niche" })

// Get purchase link
get_purchase_link({ id: "mfk-br540" })
```

## 🎯 Real-World Usage Examples

Once connected to Claude Desktop, you can ask natural language questions like:

- *"Show me all the Tom Ford perfumes you have"*
- *"I want a sweet, oriental perfume for women under 1000 TL"*
- *"Give me the purchase link for Baccarat Rouge 540"*
- *"What are the most expensive perfumes in your collection?"*
- *"Find me a perfume with oud and vanilla notes"*

## 🏗️ Data Structure

Each perfume includes comprehensive information:

- **Basic Info**: ID, name, brand, price, volume
- **Fragrance Details**: Notes, characteristics, description
- **Demographics**: Gender target, age range recommendations
- **Purchase**: Direct Shopier shopping links
- **Pricing**: Current price and original price comparison

## Development

The server is built with:
- TypeScript
- @modelcontextprotocol/sdk
- Node.js

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Ideas for Contributions

- 🆕 Add new perfume brands and collections
- 🔧 Improve search algorithms
- 🌍 Add internationalization support
- 📊 Add analytics and usage metrics
- 🎨 Enhance data structure with images
- 🔗 Integrate with other e-commerce platforms

## 🐛 Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/recepgocmen/blue-perfumery-mcp/issues).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Blue Perfumery

Blue Perfumery is a premium fragrance retailer offering luxury and niche perfumes. Visit [Blue Perfumery](https://blueperfumery.com) to explore our full collection.

---

Made with ❤️ for the fragrance community