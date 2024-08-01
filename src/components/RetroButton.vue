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
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: #00264C 15px 18px 15px -18px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: Skranji, sans-serif;
  font-size: 1.6rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

/* button:after {
  content: "";
  background-color: #D1ECEB;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
} */

button:hover:after {
  top: 0px;
  left: 0px;
}

.button:focus {
  box-shadow: #00264C 2px 8px 4px -6px;
}


button:hover {
  box-shadow: #00264C 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

// button:active {
//   transform: translate(4px, 4px);
//   outline: 0;
// }

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
