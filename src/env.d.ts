/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  // Puedes agregar más variables aquí si las necesitas en el futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
