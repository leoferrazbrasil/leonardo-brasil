# Agent Authentication

To authenticate with our API, agents must present a valid API key or Bearer token.
If you are an agent attempting to perform actions on behalf of a user, you can request an API key from our support team or use the internal APIs using the user's session.

**Supported Identity Types:**
- `did` (Decentralized Identifier)
- `jwt` (JSON Web Token)

**API Endpoints:**
- `/api/brain` (AI generation)
- `/api/elevenlabs/tts` (Text-to-Speech)
- `/api/stt/transcribe` (Speech-to-Text)

See the OpenAPI catalog at `/.well-known/api-catalog` for detailed descriptions.
