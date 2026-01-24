
  # Contactless Door Marketplace UI

  This is a code bundle for Contactless Door Marketplace UI. The original project is available at https://www.figma.com/design/tSiRl3da0NX72v8aZ3QiE2/Contactless-Door-Marketplace-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  ### Environment variables (ChatGPT API)

  The AI подбор uses the OpenAI Chat Completions API and requires `VITE_OPENAI_API_KEY`.

  1. For local development (`npm run dev`), create `.env` in the project root:

     ```bash
     cp .env.production.example .env
     ```

     Then replace the value with your real key.

  2. For production builds (`npm run build`), define the variable at build time. The simplest way is to create `.env.production` (do not commit real keys):

     ```bash
     cp .env.production.example .env.production
     ```

     Vite will embed this value into the built bundle during `npm run build`.

  Run `npm run dev` to start the development server.
  
