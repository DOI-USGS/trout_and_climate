<template>
  <button :class="buttonClass" :style="computedStyle" @click="onClick" :disabled="isDisabled">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'RetroButton',
  props: {
    label: String,
    buttonClass: {
      type: String,
      default: 'default-button-class'
    },
    buttonStyle: Object,
    onClick: Function,
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    computedStyle() {
      if (this.isDisabled) {
        return {
          ...this.buttonStyle,
          backgroundColor: 'grey',
          cursor: 'not-allowed'
        };
      }
      return this.buttonStyle;
    }
  },
  setup(props, { emit }) {
    const onClick = () => {
      if (!props.isDisabled) {
        emit('click');
      }
    };

    return { onClick };
  }
};
</script>

<style scoped lang="scss">
button {
  color: white;
  align-items: center;
  border: 2px solid hsl(0, 0%, 7%);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 48px;
  justify-content: center;
  max-width: 100%;
  padding: 0 15px;
  position: relative;
  font-weight: 800;
  text-align: center;
  touch-action: manipulation;
  transition: transform 0.2s ease-out;
}

button:after {
  color: white;
  background-color: #111;
  border-radius: 8px;
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -5px;
  transform: translate(8px, 8px);
  transition: transform 0.2s ease-out;
  z-index: -1;
}

button:hover:after {
  transform: translate(20px, 20px);
}

button:hover {
  outline: 0;
}

button:active {
  transform: translate(4px, 4px);
  outline: 0;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  border-color: #999;
  color: #ccc;
}

button:disabled:after {
  background-color: #ccc;
}
</style>
