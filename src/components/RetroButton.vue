<template>
    <button :class="buttonClass" :style="buttonStyle" @click="onClick">
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
      onClick: Function
    },
    emits: ['click'],
    setup(props, { emit }) {
      const onClick = () => {
        emit('click');
      };
  
      return { onClick };
    }
  };
  </script>
  
<style lang="scss">


button {
  color: white;
  align-items: center;
  background-color: #d66853;
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
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

button:hover:after {
  transform: translate(0, 0);
}

button:active {
  color: white;
  background-color: #d66853;
  outline: 0;
}

button:hover {
  outline: 0;
}
  </style>
  