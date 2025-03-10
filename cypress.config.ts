import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    setupNodeEvents(on, config) {
      // Add custom event listeners if needed
    }
  },
 
});
