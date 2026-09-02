import { THEME_STORAGE_KEY } from "@/lib/theme";

function bootstrapScript() {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return (
    "(function(){try{var t=localStorage.getItem(" +
    key +
    ');if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();'
  );
}

// Runs before first paint, before the header renders, to avoid a theme flash.
export function ThemeInit() {
  return <script dangerouslySetInnerHTML={{ __html: bootstrapScript() }} />;
}
