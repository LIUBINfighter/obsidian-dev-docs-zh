// Remark plugin to ensure every markdown file has a sidebar frontmatter object
export default function ensureSidebar() {
  return function (_tree, file) {
    const frontmatter = file?.data?.astro?.frontmatter;
    if (frontmatter && frontmatter.sidebar === undefined) {
      frontmatter.sidebar = {};
    }
  };
}
