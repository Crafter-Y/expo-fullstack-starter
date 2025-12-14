import{j as c,V as l,r as p}from"./iframe-hpTVAJXy.js";import{C as i}from"./CategorySelectorBadge-C9rQmhBQ.js";import"./preload-helper-Zf8nSx-t.js";const{expect:y,fn:m,userEvent:u,within:C}=__STORYBOOK_MODULE_TEST__,g={id:"1",name:"Personal",color:"#D00000",icon:"👤",_count:{todos:5}},b={title:"todos/CategorySelectorBadge",component:i,tags:["autodocs"],args:{category:g,selectedCategory:"2",setSelectedCategory:m(),displayCategorySize:!0,type:"base"},render:e=>{const[n,d]=p.useState(e.selectedCategory);return c.jsx(i,{...e,selectedCategory:n,setSelectedCategory:a=>{d(a),e.setSelectedCategory(a)}})},decorators:[e=>c.jsx(l,{className:"items-start",children:c.jsx(e,{})})]},t={args:{type:"base"},play:async({args:e,canvasElement:n})=>{const a=C(n).getByRole("radio");await u.click(a),await y(e.setSelectedCategory).toHaveBeenCalledWith(e.category.id)}},s={args:{type:"ghost"}},r={args:{type:"base",category:{...g,icon:null}}},o={args:{type:"base",displayCategorySize:!1}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: "base"
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole("radio");
    await userEvent.click(badge);
    await expect(args.setSelectedCategory).toHaveBeenCalledWith(args.category.id);
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "ghost"
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: "base",
    category: {
      ...MOCK_CATEGORY,
      icon: null
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: "base",
    displayCategorySize: false
  }
}`,...o.parameters?.docs?.source}}};const v=["Base","Ghost","NoIcon","NoSize"];export{t as Base,s as Ghost,r as NoIcon,o as NoSize,v as __namedExportsOrder,b as default};
