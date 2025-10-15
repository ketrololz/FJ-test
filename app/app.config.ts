export default defineAppConfig({
  ui: {
    colors: {
      primary: "amber",
      secondary: "brand",
      neutral: "zinc",
    },
    container: {
      base: "w-full max-w-(--ui-container) mx-auto",
    },
    card: {
      variants: {
        variant: {
          solid: {
            root: "bg-neutral-900/50",
          },
          outline: {
            root: "bg-default ring ring-default divide-y divide-default",
          },
          soft: {
            root: "bg-elevated/50 divide-y divide-default",
          },
          subtle: {
            root: "bg-elevated/50 ring ring-default divide-y divide-default",
          },
        },
      },
    },
  },
});
