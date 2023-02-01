import { compile, defineComponent, h } from "vue";

export default defineComponent({
  props: { html: String },
  render() {
    return h(compile(this.html!));
  }
});
