# Kuroshiro Worker

A Cloudflare Worker that converts Japanese text into Hiragana, Katakana, or Romaji using the Kuroshiro library. Supports both a simple REST endpoint and an OpenAI-compatible Chat Completions API with optional streaming.

## Features

* Convert Japanese text to Hiragana, Katakana, or Romaji
* Two endpoints:

  * `POST /` : Simple JSON API
  * `POST /v1/chat/completions` : OpenAI Chat Completions-compatible, with optional SSE streaming via `stream: true`
* No sensitive information or external credentials required
* MIT-licensed and fully open-source

## Usage

1. Install dependencies:

   ```bash
   npm install
   ```
2. Deploy to Cloudflare Workers:

   ```bash
   wrangler deploy
   ```
3. Examples:

   * Simple API:

     ```bash
     curl -X POST https://<your-domain>/ \
       -H "Content-Type: application/json" \
       -d '{"text":"漢字を変換します","to":"romaji","mode":"furigana"}'
     ```

   * Chat Completions API (non-streaming):

     ```bash
     curl -X POST https://<your-domain>/v1/chat/completions \
       -H "Content-Type: application/json" \
       -d '{
         "model":"katakana-normal",
         "messages":[{"role":"user","content":"こんにちは"}]
       }'
     ```

   * Chat Completions API (streaming):

     ```bash
     curl -N -X POST https://<your-domain>/v1/chat/completions \
       -H "Content-Type: application/json" \
       -d '{
         "model":"katakana-normal",
         "stream": true,
         "messages":[{"role":"user","content":"こんにちは"}]
       }'
     ```
